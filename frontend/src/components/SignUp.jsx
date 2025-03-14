// SignUp.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 36px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #FF6F61;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #FF6F61;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const ToggleLink = styled.p`
  color: #FF6F61;
  cursor: pointer;
  margin-top: 15px;
`;

const SignUp = ({ onToggle }) => (
  <Container>
    <Title></Title>
    <Input type="text" placeholder="Nom d'utilisateur" />
    <Input type="email" placeholder="Adresse Email" />
    <Input type="password" placeholder="Mot de passe" />
    <Button>S'inscrire</Button>
    <ToggleLink onClick={onToggle}>Déjà un compte ? Se connecter</ToggleLink>
  </Container>
);

export default SignUp;
