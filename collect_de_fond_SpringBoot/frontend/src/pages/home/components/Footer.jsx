import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled.footer`
  backgroud:black;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  padding: 2rem;
  background: radial-gradient( rgba(20, 30, 48, 1), rgba(36, 59, 85, 1) );
  color: #ecf0f1; 
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #FF6F61; /* Orange */
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    text-align: center;
    font-size: 14px;
  }
`;

const NavLink = styled.a`
  color: #ecf0f1; /* Gris clair */
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #FF6F61; /* Orange */
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  font-size: 2rem;
  color: #ecf0f1; /* Gris clair */
  transition: all 0.3s ease;
  &:hover {
    color: #e67e22; /* Orange */
    transform: scale(1.1);
  }
`;

const Copyright = styled.p`
  margin-top: 2rem;
  font-size: 1rem;
  color: #888888;
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <Logo>YEDWA7DA</Logo>
      <Nav>
        <NavLink href="#home">Accueil</NavLink>
        <NavLink href="#features">Fonctionnalités</NavLink>
        <NavLink href="#benefits">Avantages</NavLink>
        <NavLink href="#team">Équipe</NavLink>
      </Nav>
      <SocialMediaIcons>
        <SocialMediaIcon href="#"><FacebookIcon /></SocialMediaIcon>
        <SocialMediaIcon href="#"><TwitterIcon /></SocialMediaIcon>
        <SocialMediaIcon href="#"><LinkedInIcon /></SocialMediaIcon>
        <SocialMediaIcon href="#"><InstagramIcon /></SocialMediaIcon>
      </SocialMediaIcons>
      <Copyright>
        &copy; 2024 YEDWA7DA. Tous droits
        réservés.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;