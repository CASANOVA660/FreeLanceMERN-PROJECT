import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCampaignDetails } from '../../api/api';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate } from '@fortawesome/free-solid-svg-icons';

// Conteneur principal
const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #141E30;
`;

// Carte pour afficher les détails
const DetailsCard = styled.div`
  background: #1f1f1f;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  position: relative;

  h1 {
    color: #FF6F61;
    font-size: 24px;
    margin-bottom: 15px;
  }

  img {
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  p {
    color: #dcdcdc;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  strong {
    color: #FF6F61;
  }

  .details-dates {
    font-style: italic;
    font-size: 14px;
    color: #dcdcdc;
  }
`;

// Bouton "Retour"
const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #FF6F61;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e85a50;
  }
`;

const DonateButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 36px;
  color: #FF6F61;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin: 10px 0;
  position: relative;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #FF6F61;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCampaignDetails = async () => {
      if (!id) {
        setError('ID de campagne non spécifié');
        setLoading(false);
        return;
      }

      try {
        const details = await fetchCampaignDetails(id);
        if (!details) {
          setError('Campagne non trouvée');
        } else {
          setCampaign(details);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des détails de la campagne:', error);
        setError('Erreur lors du chargement des détails de la campagne');
      } finally {
        setLoading(false);
      }
    };

    loadCampaignDetails();
  }, [id]);

  const handleDonateClick = () => {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'donor') {
      toast.error('Seuls les donateurs peuvent faire des dons');
      return;
    }

    if (campaign.currentAmount >= campaign.targetAmount) {
      toast.error('Cette campagne a déjà atteint son objectif');
      return;
    }

    navigate(`/donation/${id}`);
  };

  if (loading) {
    return (
      <DetailsContainer>
        <DetailsCard>
          <p style={{ color: '#dcdcdc' }}>Chargement des détails...</p>
        </DetailsCard>
      </DetailsContainer>
    );
  }

  if (error) {
    return (
      <DetailsContainer>
        <DetailsCard>
          <p style={{ color: '#FF6F61' }}>{error}</p>
          <BackButton onClick={() => window.history.back()}>
            Retour à la liste
          </BackButton>
        </DetailsCard>
      </DetailsContainer>
    );
  }

  if (!campaign) {
    return (
      <DetailsContainer>
        <DetailsCard>
          <p style={{ color: '#dcdcdc' }}>Aucune campagne trouvée.</p>
          <BackButton onClick={() => window.history.back()}>
            Retour à la liste
          </BackButton>
        </DetailsCard>
      </DetailsContainer>
    );
  }

  const progressPercentage = Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100);

  return (
    <DetailsContainer>
      <DetailsCard>
        <h1>{campaign.name}</h1>
        {localStorage.getItem('userRole') === 'donor' && (
          <DonateButton onClick={handleDonateClick}>
            <FontAwesomeIcon icon={faDonate} />
          </DonateButton>
        )}
        <img src={campaign.bannerImage} alt={campaign.name} />
        <p>{campaign.description}</p>
        <p>
          <strong>Montant cible:</strong> {campaign.targetAmount} DT
        </p>
        <p>
          <strong>Montant actuel:</strong> {campaign.currentAmount} DT
        </p>
        <ProgressBar>
          <Progress width={progressPercentage} />
        </ProgressBar>
        <p className="details-dates">
          <strong>Dates:</strong>{' '}
          {new Date(campaign.startDate).toLocaleDateString()} -{' '}
          {new Date(campaign.endDate).toLocaleDateString()}
        </p>
        <BackButton onClick={() => window.history.back()}>
          Retour à la liste
        </BackButton>
      </DetailsCard>
    </DetailsContainer>
  );
};

export default CampaignDetails;
