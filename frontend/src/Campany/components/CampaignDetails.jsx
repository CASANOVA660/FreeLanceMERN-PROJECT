import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCampaignDetails } from '../../api/api';
import styled from 'styled-components';

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
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
  max-width: 600px;
  width: 90%;
  text-align: center;

  h1 {
    color: #2b2d42;
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
    color: #4a4a4a;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  strong {
    color: #ff6f61;
  }

  .details-dates {
    font-style: italic;
    font-size: 14px;
    color: #6c757d;
  }
`;

// Bouton "Retour"
const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6f61;
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

const CampaignDetails = () => {
  const { id } = useParams();
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

  if (loading) {
    return (
      <DetailsContainer>
        <DetailsCard>
          <p>Chargement des détails...</p>
        </DetailsCard>
      </DetailsContainer>
    );
  }

  if (error) {
    return (
      <DetailsContainer>
        <DetailsCard>
          <p style={{ color: '#ff6f61' }}>{error}</p>
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
          <p>Aucune campagne trouvée.</p>
          <BackButton onClick={() => window.history.back()}>
            Retour à la liste
          </BackButton>
        </DetailsCard>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <DetailsCard>
        <h1>{campaign.name}</h1>
        <img src={campaign.bannerImage} alt={campaign.name} />
        <p>{campaign.description}</p>
        <p>
          <strong>Montant cible:</strong> {campaign.targetAmount} DT
          <p><strong>Montant currant:</strong> {campaign.currentAmount} DT</p>
        </p>
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
