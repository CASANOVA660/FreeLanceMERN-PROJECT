import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import manquant
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Features from './components/Features';
import Benefits from './components/Benifits';
import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';
import Team from './components/Team';
import CampaignCard from '../../Campany/components/CampaignCardHome';
import { fetchCampaigns } from '../../api/api'; 

const Body = styled.div`
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    background: radial-gradient(circle, rgba(2, 3, 14, 1) 0%, rgba(36, 59, 85, 1) 100%);
`;

const Container = styled.div`
    width: 100%;
    background: radial-gradient(circle, rgba(2, 3, 14, 1) 0%, rgba(36, 59, 85, 1) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Top = styled.div`
    width: 100%;
    display: flex;
    padding-bottom: 50px;
    flex-direction: column;
    align-items: center;
    background: radial-gradient(circle, rgba(2, 3, 14, 1) 0%, rgba(36, 59, 85, 1) 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%);
    @media (max-width: 768px) {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 98%, 0 100%);
        padding-bottom: 0px;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: #1F1B24;
    display: flex;
    flex-direction: column;
`;

const StyledFooter = styled.div`
    background: black;    
`;

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Vérifier si l'utilisateur est authentifié
  const [campaigns, setCampaigns] = useState([]);  // État pour stocker les campagnes
  const [SignInOpen, setSignInOpen] = useState(false);
  const [SignUpOpen, setSignUpOpen] = useState(false);

  const navigate = useNavigate();

  // Vérification de l'authentification de l'utilisateur
  useEffect(() => {
    const user = localStorage.getItem('user'); // Vérifier si l'utilisateur est connecté (via un token ou un user)
    setIsAuthenticated(!!user);
  }, []);

  // Fonction pour gérer le clic sur le bouton de don
  const handleDonateClick = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Si non authentifié, redirige vers la page de login
    } 
  };

  // Chargement des campagnes depuis l'API
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetchCampaigns();  // Appel à l'API pour récupérer les campagnes
        setCampaigns(response);  // Mise à jour des campagnes dans l'état
      } catch (error) {
        console.error("Erreur lors du chargement des campagnes:", error);
      }
    };
    fetchCampaignData();
  }, []);

  return (
    <Body>
      <Container>
        <Top>
          <Navbar setSignInOpen={setSignInOpen} />
        </Top>
        <Content>
          <Features />
          <Benefits />
          
          {/* Affichage des cartes de campagne */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {campaigns.map((campaign) => (
              <CampaignCard id="Campagnes"
                key={campaign._id} 
                campaign={campaign} 
                isAuthenticated={isAuthenticated} 
                onDonate={handleDonateClick} // Passe la fonction de donation à la carte
              />
            ))}
          </div>

          <Team />
        </Content>
        <StyledFooter>
          <Footer />
        </StyledFooter>
        {SignUpOpen && (
          <SignUp setSignUpOpen={setSignUpOpen} setSignInOpen={setSignInOpen} />
        )}
        {SignInOpen && (
          <SignIn setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
        )}
      </Container>
    </Body>
  );
};

export default Home;
