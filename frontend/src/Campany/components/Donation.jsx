import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { makeDonation, updateCampaign, fetchCampaignById } from '../../api/api';
import CryptoJS from 'crypto-js';

// Animations
const slideInUp = keyframes`
  0% { transform: translate(-50%, 100%); opacity: 0; }
  100% { transform: translate(-50%, -50%); opacity: 1; }
`;

const slideOutDown = keyframes`
  0% { transform: translate(-50%, -50%); opacity: 1; }
  100% { transform: translate(-50%, 100%); opacity: 0; }
`;

// Styles
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const DonationWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
  background: #1f1b24;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  ${({ animateIn }) =>
    animateIn &&
    css`
      animation: ${slideInUp} 0.8s ease forwards;
    `}

  ${({ animateOut }) =>
    animateOut &&
    css`
      animation: ${slideOutDown} 0.8s ease forwards;
    `}
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ff6f61;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background: #28242e;
  color: #d1d1d1;
  outline: none;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background: #28242e;
  color: #d1d1d1;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #ff6f61;
  border: none;
  color: white;
  border-radius: 8px;
`;

const Donation = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    amount: '',
    paymentMethod: '',
    cardNumber: '',
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) {
        toast.error('ID de campagne manquant');
        navigate('/company');
        return;
      }

      try {
        const campaignData = await fetchCampaignById(id);
        if (!campaignData) {
          toast.error('Campagne non trouvée');
          navigate('/company');
          return;
        }
        setCampaign(campaignData);

        // Set donor email if available
        const userEmail = localStorage.getItem('useremail');
        if (userEmail) {
          setFormData(prev => ({ ...prev, donorEmail: userEmail }));
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la campagne:', error);
        toast.error('Erreur lors du chargement de la campagne');
        navigate('/company');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaign) {
      toast.error('Données de la campagne non disponibles');
      return;
    }

    // Check if campaign is complete
    if (campaign.currentAmount >= campaign.targetAmount) {
      toast.error('Cette campagne a déjà atteint son objectif');
      navigate('/company');
      return;
    }

    // Check if donation would exceed target amount
    const amount = Number(formData.amount);
    if (amount + campaign.currentAmount > campaign.targetAmount) {
      toast.error(`Le don maximum possible pour cette campagne est de ${campaign.targetAmount - campaign.currentAmount} DT`);
      return;
    }

    // Validate form data
    if (!formData.amount || !formData.paymentMethod || !formData.donorName) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      toast.error('Le montant du don doit être supérieur à 0');
      return;
    }

    // Validate card number if payment method is credit card
    if (formData.paymentMethod === 'creditCard') {
      if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) {
        toast.error('Numéro de carte invalide. Veuillez entrer 16 chiffres.');
        return;
      }
    }

    try {
      // Check authentication
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expirée, veuillez vous reconnecter');
        navigate('/login');
        return;
      }

      const encryptedCardNumber = formData.cardNumber && formData.paymentMethod === 'creditCard'
        ? CryptoJS.AES.encrypt(formData.cardNumber, 'votre_cle_secrete').toString()
        : '';

      const donationData = {
        campaign: id,
        donorName: formData.donorName.trim(),
        donorEmail: formData.donorEmail?.trim(),
        amount: amount,
        paymentMethod: formData.paymentMethod,
        cardNumber: encryptedCardNumber
      };

      // Make the donation
      await makeDonation(donationData);

      // Update campaign amount
      const updatedCampaignData = {
        ...campaign,
        currentAmount: Number(campaign.currentAmount) + amount
      };

      await updateCampaign(id, updatedCampaignData);

      toast.success('Merci pour votre don !');
      navigate('/company');
    } catch (error) {
      console.error('Erreur lors du don:', error);

      // Handle specific error messages
      if (error.message === 'Session expirée, veuillez vous reconnecter') {
        navigate('/login');
      }

      toast.error(error.message || 'Une erreur est survenue lors du don');
    }
  };

  if (isLoading) {
    return (
      <DonationWrapper>
        <Title>Chargement...</Title>
      </DonationWrapper>
    );
  }

  if (!campaign) {
    return (
      <DonationWrapper>
        <Title>Campagne non trouvée</Title>
      </DonationWrapper>
    );
  }

  if (campaign.currentAmount >= campaign.targetAmount) {
    return (
      <DonationWrapper>
        <Title>Cette campagne a atteint son objectif</Title>
        <Button onClick={() => navigate('/company')}>Retour aux campagnes</Button>
      </DonationWrapper>
    );
  }

  return (
    <>
      <Overlay />
      <DonationWrapper>
        <Title>Faire un Don pour {campaign.name}</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <StyledInput
              type="text"
              name="donorName"
              placeholder="Nom du donateur"
              value={formData.donorName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <StyledInput
              type="number"
              name="amount"
              placeholder="Montant"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
            />
          </FormGroup>

          <FormGroup>
            <StyledSelect
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Méthode de paiement</option>
              <option value="creditCard">Carte de Crédit</option>
              <option value="paypal">Paypal</option>
            </StyledSelect>
          </FormGroup>

          {formData.paymentMethod === 'creditCard' && (
            <FormGroup>
              <StyledInput
                type="text"
                name="cardNumber"
                placeholder="Numéro de carte"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                pattern="\d{16}"
                maxLength="16"
              />
            </FormGroup>
          )}

          <Button type="submit">Soumettre</Button>
        </form>
      </DonationWrapper>
    </>
  );
};

export default Donation;
