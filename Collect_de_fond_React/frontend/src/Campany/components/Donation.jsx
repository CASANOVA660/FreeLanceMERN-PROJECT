import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { makeDonation ,updateCampaign,fetchCampaignById } from '../../api/api';
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


const Donation = ({ onClose }) => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Assurez-vous que cet état est bien déclaré



  console.log('ID de la campagne:', id);
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    amount: '',
    campaign:id,
    paymentMethod: '',
    cardNumber: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCampaign = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching campaign with ID:', id);
        const response = await fetchCampaignById(id);  // Changé ici aussi
        console.log('Campaign data received:', response);
        setCampaign(response);
      } catch (error) {
        console.error('Erreur lors du chargement de la campagne:', error);
        toast.error('Erreur lors du chargement de la campagne');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCampaign();
    }
  }, [id]);
  useEffect(() => {
    console.log('Avant de récupérer:', localStorage.getItem('email'));
    const userEmail = localStorage.getItem('useremail'); 
    console.log('Après récupération:', userEmail);
    if (userEmail) {
      setFormData((prev) => ({ ...prev, donorEmail: userEmail }));
    }
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Vérifiez que la campagne est chargée
    if (!campaign) {
      toast.error('Données de la campagne non disponibles');
      return;
    }
  
    if (!id || !formData.amount || !formData.paymentMethod || !formData.donorName) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }
  
    try {
      const encryptedCardNumber = formData.cardNumber 
        ? CryptoJS.AES.encrypt(formData.cardNumber, 'votre_cle_secrete').toString()
        : '';
  
      // Formatage des données pour la donation
      const donationData = {
        campaign: id,
        donorName: formData.donorName.trim(),
        donorEmail: formData.donorEmail.trim(),
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
        cardNumber: encryptedCardNumber
      };
  
      await makeDonation(donationData);
  
      // Mettre à jour le montant de la campagne
      const updatedCampaignData = {
        ...campaign,
        currentAmount: campaign.currentAmount + Number(formData.amount),
        association: {
          id: campaign.association.id
        }
      };
  
      await updateCampaign(id, updatedCampaignData);
  
      toast.success('Merci pour votre don !');
      navigate('/Company');
    } catch (error) {
      console.error('Erreur lors du don:', error);
      toast.error(error.response?.data?.message || 'Une erreur est survenue lors du don');
    }


  };  return (
    <>
      <Overlay onClick={onClose} />
      <DonationWrapper>
        <Title>Faire un Don</Title>
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
  <option value="CREDIT_CARD">Carte de Crédit</option>
  <option value="PAYPAL">Paypal</option>
</StyledSelect>
          </FormGroup>
            <FormGroup>
              <StyledInput
                type="text"
                name="cardNumber"
                placeholder="Numéro de carte"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </FormGroup>
          <Button type="submit">Soumettre</Button>
        </form>
      </DonationWrapper>
    </>
  );
};

export default Donation;
