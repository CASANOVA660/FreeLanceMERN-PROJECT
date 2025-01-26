import React from 'react';
import styled from 'styled-components';
import Groups3Icon from '@mui/icons-material/Groups3';
import TimelineIcon from '@mui/icons-material/Timeline';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PublicIcon from '@mui/icons-material/Public';

const FeaturesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141E30;
  padding-bottom: 180px;
  padding-top: 60px;
  background: radial-gradient(circle, rgba(2, 3, 14, 1) 0%, rgba(36, 59, 85, 1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
  @media (max-width: 768px) {
    padding-bottom: 100px;
    clip-path: polygon(0 0, 100% 0, 100% 95%, 50% 100%, 0 95%);
  }
`;

const Number = styled.div`
  width: 80px;
  height: 80px;
  font-size: 36px;
  font-weight: 800;
  color: #FF6F61;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 4px solid #FF6F61;
  background-color: rgba(255, 111, 97, 0.1);
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }
`;

const FeaturesTitle = styled.h2`
  font-size: 46px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: #FF6F61;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const FeatureDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  font-weight: 500;
  max-width: 700px;
  text-align: center;
  color: #D1D1D1;
  margin-bottom: 70px;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 50px;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  z-index: 1;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled.div`
  background-color: #242D40;
  border: 1px solid #FF6F61;
  border-radius: 12px;
  padding: 30px;
  box-shadow: rgba(255, 111, 97, 0.2) 0px 5px 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(255, 111, 97, 0.4) 0px 10px 30px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  color: #FF6F61;
  margin-bottom: 10px;
  font-weight: 600;
`;

const FeatureCardDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #C4C4C4;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  color: #FF6F61;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: rgba(255, 111, 97, 0.2);
  border-radius: 50%;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 15px rgba(255, 111, 97, 0.6);
  }
`;

const BgImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    display: none;
  }
`;

const featuresData = [
  {
    icon: <ElectricBoltIcon fontSize="large" />,
    title: 'Gestion de Projets de Collecte de Fonds',
    description: 'Gérez efficacement vos projets de collecte de fonds, assignez des tâches et suivez les progrès en temps réel pour garantir la réussite des campagnes.',
  },
  {
    icon: <Groups3Icon fontSize="large" />,
    title: 'Collaboration avec l\'Équipe',
    description: 'Collaborez sans effort avec votre équipe, assignez des tâches spécifiques, et suivez les progrès pour assurer une gestion fluide des campagnes de collecte.',
  },
  {
    icon: <PublicIcon fontSize="large" />,
    title: 'Création de Communauté',
    description: 'Connectez-vous avec d\'autres organisations et personnes partageant des objectifs similaires, développez des partenariats et étendez votre réseau de soutien.',
  },
  {
    icon: <TimelineIcon fontSize="large" />,
    title: 'Suivi des Objectifs et Temps',
    description: 'Fixez des objectifs clairs pour chaque campagne, suivez le temps consacré aux tâches et optimisez la productivité pour atteindre vos objectifs de collecte.',
  },
];

const Features = () => {
  return (
    <FeaturesWrapper id="features">
      <Number>01</Number>
<FeaturesTitle>Fonctionnalités Clés</FeaturesTitle>
<FeatureDescription>
  Découvrez comment Collecte de Fond simplifie la gestion de vos projets de collecte de fonds, facilite la collaboration avec vos équipes et partenaires, et vous aide à atteindre vos objectifs financiers avec efficacité.
</FeatureDescription>

      <FeaturesContainer>
        {featuresData.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureCardDescription>{feature.description}</FeatureCardDescription>
            <FeatureIcon>{feature.icon}</FeatureIcon>
          </FeatureCard>
        ))}
      </FeaturesContainer>
      <BgImage>
      </BgImage>
    </FeaturesWrapper>
  );
};

export default Features;