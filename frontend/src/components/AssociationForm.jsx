import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailRounded from '@mui/icons-material/EmailRounded';
import { ToastContainer, toast } from 'react-toastify';
import Description from '@mui/icons-material/Description';
import Phone from '@mui/icons-material/Phone';

import { createAssociation } from '../../src/api/api'; // Importez la fonction API



import * as THREE from 'three';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1f1b24;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 14px 14px 40px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background-color: #1f1b24;
  color: #d1d1d1;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #ff6f61;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  background-color: #ff6f61;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: rgba(255, 111, 97, 0.4) 0px 5px 15px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  border: 1px solid #FF6F61;
  border-radius: 8px;
  background-color: #1F1B24;
  color: #D1D1D1;
  font-size: 16px;
  outline: none;
  min-height: 80px; /* Plus grand que les autres champs */
  resize: none;
  transition: border 0.3s ease;

  &:focus {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }
`;


const AssociationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 700; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      vertices.push(x, y, z);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xf16f61, size: 0.05 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 3;

    const animate = () => {
      particles.rotation.x += 0.01;
      particles.rotation.y += 0.01;
      particles.rotation.z += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleSubmit = async () => {
    const phoneRegex = /^\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    toast.error('Le numéro de téléphone doit comporter exactement 8 chiffres.');
    return;
  }

  // Validation de l'email : doit correspondre au format standard d'un email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error('Veuillez saisir une adresse email valide.');
    return;
  }
    if (!name || !email || !description || !phoneNumber) {
      toast.error('Tous les champs sont obligatoires !');
      return;
    }

    try {
      // Appeler l'API pour créer une association
      await createAssociation({ name, email, description, phone: phoneNumber });
      navigate('/login'); 
      toast.success('Association créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création de l\'association :', error);
      toast.error(error.error || 'Une erreur est survenue.');
    }
  };


  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Veuillez saisir un email valide.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        toast.success('OTP envoyé à votre email !');
      } else {
        toast.error('Erreur lors de l\'envoi de l\'OTP.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      toast.error('Impossible de contacter le serveur.');
    }
  };
  

  return (
    <Container>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <ToastContainer />
      <FormWrapper>
        <InputWrapper>
          <IconWrapper>
            <AccountCircle />
          </IconWrapper>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de l'association"
          />
        </InputWrapper>
        <InputWrapper>
  <IconWrapper>
    <Description />
  </IconWrapper>
  <TextArea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="   Description de l'association"
  />
</InputWrapper>

<InputWrapper>
  <IconWrapper>
    <Phone />
  </IconWrapper>
  <Input
    type="tel"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    placeholder="Numéro de téléphone"
  />
</InputWrapper>


        <InputWrapper>
          <IconWrapper>
            <EmailRounded />
          </IconWrapper>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email de l'association"
          />
        </InputWrapper>
        

       

        <Button onClick={handleSubmit}>Soumettre</Button>
      </FormWrapper>
    </Container>
  );
};

export default AssociationForm;
