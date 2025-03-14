import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import CardAssociation from './CardAssociation';

// Style du conteneur de la barre latérale
const SideBarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: radial-gradient(circle, rgba(20, 25, 40, 1) 0%, rgba(45, 65, 90, 1) 50%, rgba(25, 35, 50, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 35px;
  margin-left: -25px;
  margin-top: -24px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

// Style des éléments de la barre latérale
const SideBarItem = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? '#FF6F61' : 'white')};
  font-size: 18px;
  margin-bottom: 35px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;

  svg {
    margin-right: 10px;
    color: ${(props) => (props.active ? '#FF6F61' : 'white')};
  }

  &:hover {
    background-color: rgba(255, 111, 97, 0.2);
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(''); // Suivi de l'élément actif
  const [showForm, setShowForm] = useState(false); // État pour afficher le formulaire

  // Simulez la récupération du rôle utilisateur (ex. depuis le localStorage)
  const userRole = localStorage.getItem('userRole') || 'donor'; // Exemple : 'association' ou 'donor'

  // Fonction de navigation
  const navigateToPage = (itemName, path) => {
    setActiveItem(itemName); // Mettre à jour l'élément actif
    navigate(path); // Naviguer vers la page correspondante
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Nettoyer le token
    setActiveItem(''); // Réinitialiser l'état actif
    navigate('/login'); // Redirection vers la page de login
  };

  // Gestion de l'ouverture du formulaire
  const handleAddAssociationClick = () => setShowForm(true);

  // Gestion de la fermeture du formulaire
  const handleCloseForm = () => setShowForm(false);

  // Gestion de la soumission du formulaire
  const handleFormSubmit = () => {
    console.log('Campagne ajoutée'); // Action après soumission
    setShowForm(false);
  };

  return (
    <SideBarContainer>
      {/* Lien vers la page Company */}
      <SideBarItem
        active={activeItem === 'company'}
        onClick={() => navigateToPage('company', '/company')}
      >
        <HomeIcon />
        Company
      </SideBarItem>

      {userRole === 'donor' && (
        
          <SideBarItem
            active={activeItem === 'history'}
            onClick={() => navigateToPage('history', '/history')}
          >
            <HistoryIcon />
            Suivi Historique
          </SideBarItem>

          
        )}

          <SideBarItem
            active={activeItem === 'dashboard'}
            onClick={() => navigateToPage('dashboard', '/dashbord')}
          >
            <DashboardIcon />
            Dashboard
          </SideBarItem>
        

      <SideBarItem active={activeItem === 'logout'} onClick={handleLogout}>
        <LogoutIcon />
        LogOut
      </SideBarItem>

      {/* Affichage conditionnel du formulaire */}
      {showForm && (
        <CardAssociation onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}
    </SideBarContainer>
  );
};

export default SideBar;
