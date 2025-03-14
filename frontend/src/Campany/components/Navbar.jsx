import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardAssociation from "./CardAssociation";

// Style du composant Navbar
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle, rgba(20, 25, 40, 1) 0%, rgba(45, 65, 90, 1) 50%, rgba(25, 35, 50, 1) 100%);
  padding: 20px;
  color: white;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const ProjectName = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #FF6F61;
  letter-spacing: 2px;
  margin: 0;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s ease;
  &:hover {
    color: #FF3E30;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #000000;
  border-radius: 50px;
  width: 50%;
  max-width: 550px;
  padding: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease-in-out;
  &:hover {
    width: 55%;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 50px;
    input {
      padding: 10px 15px;
      color: #ffffff;
      font-size: 14px;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .Mui-focused {
    border-color: transparent;
  }
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #000000;
  padding: 10px;
  border-radius: 8px;
  width: 150px;
  display: ${({ open }) => (open ? 'block' : 'none')};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userRole, setUserRole] = useState(''); // Rôle de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');  // Récupère le rôle du localStorage
    console.log("User Role:", role);  // Affiche le rôle pour déboguer
    setUserRole(role);  // Met à jour l'état avec le rôle
  }, []);
  
  
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleAddAssociationClick = () => setShowForm(true);

  const handleCloseForm = () => setShowForm(false);

  const handleFormSubmit = () => {
    toast.success('Association ajoutée avec succès.', { position: 'top-right', autoClose: 5000 });
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    toast.success('Vous êtes maintenant déconnecté.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleHome = () => {
    navigate('/');
    toast.success('Vous êtes sur la page d\'accueil.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <NavbarContainer>
      <ProjectName>Yed Wa7da</ProjectName>

      <SearchWrapper>
        <StyledTextField
          variant="outlined"
          size="small"
          placeholder="Rechercher des campagnes"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: '100%', height: '40px' }}
        />
        <IconButton sx={{ color: "#FF6F61" }}>
          <SearchIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#FF6F61", '&:hover': { backgroundColor: '#FF6F61', color: '#fff' } }}
          onClick={handleDropdownToggle}
        >
          <ArrowDropDownIcon />
          <DropDownMenu open={dropdownOpen}>
          <IconButton
            sx={{ color: "#FF6F61", marginBottom: '10px' }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#FF6F61" }}
            onClick={handleHome}
          >
            <HomeIcon />
          </IconButton>
        </DropDownMenu>
        </IconButton>
        
      </SearchWrapper>

      {userRole === 'association' && (
        <Button
          onClick={handleAddAssociationClick}
          startIcon={<AddIcon />}
          sx={{
            marginRight: '120px',
            backgroundColor: '#FF6F61',
            color: 'white',
            '&:hover': { backgroundColor: '#FF3E30' },
            fontWeight: 'bold',
            textTransform: 'none',
            padding: '8px 15px',
            borderRadius: '8px',
          }}
        >
          Ajouter une Campagne
        </Button>
      )}

      {showForm && (
        <CardAssociation onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}
    </NavbarContainer>
  );
};

export default Navbar;
