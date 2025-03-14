import React from 'react';
import styled from 'styled-components';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Diversity3Icon from '@mui/icons-material/Diversity3';

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
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.2);
    filter: blur(150px);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.1);
    filter: blur(200px);
    border-radius: 50%;
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

  &:hover {
    transform: scale(1.2) rotate(10deg);
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    font-size: 36px;
  }
`;

const FeaturesTitle = styled.div`
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
  font-size: 22px;
  line-height: 1.8;
  font-weight: 400;
  color: #f0f0f0;
  max-width: 800px;
  text-align: center;
  margin-bottom: 60px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;


const FeatureCard = ({ title, description, icon }) => (
  <Card>
    <div style={{ flex: 1 }}>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureCardDescription>{description}</FeatureCardDescription>
    </div>
    <FeatureIcon>{icon}</FeatureIcon>
  </Card>
);

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 15px;
  display: flex;
  align-items: center;
      border: 1px solid #FF6F61;

  justify-content: space-between;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const FeatureIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e76f51, #FF6F61);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #FF6F61, #e76f51);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const FeatureTitle = styled.div`
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
`;

const FeatureCardDescription = styled.div`
  font-size: 18px;
  color: #dcdcdc;
  line-height: 1.8;
`;



const Content = styled.div`
  position: relative;
`;

const featuresData = [
  { icon: <TrendingUpIcon />, title: 'Gestion de projets simplifiée', description: 'Créez et gérez des projets de collecte de fonds de manière intuitive, avec des outils efficaces pour suivre les progrès et respecter les délais.' },
  { icon: <ForumIcon />, title: 'Collaboration en équipe', description: 'Collaborez sans effort avec vos équipes et partenaires, partagez des informations et coordonnez les tâches pour atteindre vos objectifs.' },
  { icon: <CheckCircleOutlineIcon />, title: 'Suivi des objectifs', description: 'Fixez des objectifs clairs pour vos campagnes de collecte de fonds et suivez leur progression pour assurer le succès de chaque projet.' },
  { icon: <Diversity3Icon />, title: 'Développement du réseau', description: 'Connectez-vous avec d\'autres organisations et professionnels pour échanger des idées, partager des ressources et élargir votre impact.' }
];


const Benefits = () => {
  return (
    <FeaturesWrapper id="benefits">
      <Number>02</Number>
      <FeaturesTitle>Pourquoi choisir YED WA7DA</FeaturesTitle>
      <FeatureDescription>
       YED WA7DA  est la solution idéale pour gérer vos projets de collecte de fonds. Notre plateforme offre une gamme de fonctionnalités qui facilitent la création de projets, la gestion d'équipes, le suivi des objectifs et la collaboration avec des partenaires, tout en garantissant une gestion transparente et efficace pour maximiser vos résultats.
      </FeatureDescription>

      <Content>
        <FeaturesContainer>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </FeaturesContainer>
       
      </Content>
    </FeaturesWrapper>
  );
};

export default Benefits;