import React from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate dans v6



const Container = styled.div`
  width: 90%;
  max-width: 1320px;
  height: 60px;
  margin: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 8px;
  @media (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #FF6F61;
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  color: #ecf0f1;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #FF6F61;
  }
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: #FF6F61;
  border: none;
  color: #fff;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #FF6F69;
  }
`;

const Navbar = ({ setSignInOpen }) => {
  const navigate = useNavigate(); // Utilisation du hook pour naviguer

  const handleLoginClick = () => {
    console.log('xyz'); // Affiche 'xyz' dans la console
    navigate('/login'); // Redirige vers la page de connexion
  };
  return (
    <Container>
      <Logo>YED_WA7DA</Logo>
      <Menu>
        <MenuItem to="home" smooth={true} duration={1000}>
          Accueil
        </MenuItem>
        <MenuItem to="features" smooth={true} duration={1000}>
          Fonctionnalités
        </MenuItem>
        <MenuItem to="benefits" smooth={true} duration={1000}>
          Avantages
        </MenuItem>
        <MenuItem to="Campagnes" smooth={true} duration={1000}>
          Campagnes
        </MenuItem>
        <MenuItem to="equipe" smooth={true} duration={1000}>
          Équipe
        </MenuItem>
      </Menu>
      <Button onClick={handleLoginClick}>
        <AccountCircleOutlinedIcon style={{ color: '#fff' }} /> Connexion
      </Button>


    </Container>
  );
};

export default Navbar;
