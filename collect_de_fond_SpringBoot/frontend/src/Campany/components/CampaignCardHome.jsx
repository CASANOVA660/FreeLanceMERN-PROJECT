import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Styles pour la carte
const CardWrapper = styled.div`
  background: #141E30;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #FF6F61;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  width: 300px;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const CampaignInfo = styled.div`
  text-align: center;
  color: #ffffff;
`;

const CampaignName = styled.h5`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
`;

const CampaignDescription = styled.p`
  font-size: 16px;
  color: #dcdcdc;
  margin-bottom: 15px;
`;

const CampaignDetails = styled.p`
  font-size: 16px;
  color: #dcdcdc;
  margin-bottom: 10px;

  strong {
    color: #FF6F61;
  }
`;

const StyledButton = styled(Button)`
  background-color: #FF6F61;
  border: none;
  &:hover {
    background-color: #e85b55;
  }
`;

const DonateButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 36px;
  color: #FF6F61;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const CampaignCardHome = ({ campaign, isLoggedIn }) => {
  const navigate = useNavigate();

  // Fonction pour rediriger l'utilisateur vers la page de login si non connecté
  const handleDonateClick = () => {
    if (!isLoggedIn) {
      toast.info('Veuillez vous connecter pour faire un don.');
      navigate('/login'); // Rediriger vers la page login si non connecté
    } else {
      navigate(`/donation/${campaign._id}`); // Sinon, permettre le don
    }
  };

  return (
    <CardWrapper>
      <BannerImage src={campaign.bannerImage} alt={campaign.name} />
      <CampaignInfo>
        <CampaignName>{campaign.name}</CampaignName>
        <CampaignDescription>{campaign.description}</CampaignDescription>
        <CampaignDetails>
          <strong>Montant cible:</strong> {campaign.targetAmount} DT
        </CampaignDetails>
        <CampaignDetails>
          <strong>Montant actuel:</strong> {campaign.currentAmount} DT
        </CampaignDetails>
        <StyledButton onClick={() => navigate(`/login`)}>
          Voir plus
        </StyledButton>
      </CampaignInfo>

      {/* L'icône de donation toujours visible */}
      <DonateButton onClick={handleDonateClick}>
        <FontAwesomeIcon icon={faDonate} />
      </DonateButton>
    </CardWrapper>
  );
};

export default CampaignCardHome;
