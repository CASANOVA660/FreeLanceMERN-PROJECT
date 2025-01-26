import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as THREE from 'three';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1f1b24;
  position: relative;
  overflow: hidden;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 14px 14px 40px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background-color: #1f1b24;
  color: #ffffff;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #ff9a8b;
    box-shadow: 0 0 10px #ff6f61;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background-color: #1f1b24;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  resize: none;
  min-height: 100px;

  &:focus {
    border-color: #ff9a8b;
    box-shadow: 0 0 10px #ff6f61;
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
  background-color: #ff6f61;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 111, 97, 0.3);
  }
`;

const CanvasBackground = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const AssociationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

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
      vertices.push(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xff6f61, size: 0.05 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 3;

    const animate = () => {
      points.rotation.x += 0.01;
      points.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error('Veuillez saisir un email valide.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsOtpSent(true);
        toast.success('OTP envoyé avec succès !');
      } else {
        toast.error("Erreur lors de l'envoi de l'OTP.");
      }
    } catch {
      toast.error('Impossible de contacter le serveur.');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Veuillez entrer le code OTP.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        toast.success('Vérification réussie !');
        navigate('/login');
      } else {
        toast.error('Code OTP invalide.');
      }
    } catch {
      toast.error('Erreur lors de la vérification.');
    }
  };

  const handleSubmit = () => {
    if (!name || !description || !phone || !email) {
      toast.error('Tous les champs sont obligatoires.');
      return;
    }

    if (!isOtpSent) {
      handleSendOTP();
    } else {
      handleVerifyOTP();
    }
  };

  return (
    <Container>
      <CanvasBackground ref={canvasRef} />
      <ToastContainer />
      <FormWrapper>
        <InputWrapper>
          <IconWrapper>
            <AccountCircleIcon />
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
            <DescriptionIcon />
          </IconWrapper>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de l'association"
          />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <PhoneIcon />
          </IconWrapper>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Numéro de téléphone"
          />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <EmailIcon />
          </IconWrapper>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </InputWrapper>
        {isOtpSent && (
          <InputWrapper>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Code OTP"
            />
          </InputWrapper>
        )}
        <Button onClick={handleSubmit}>{isOtpSent ? 'Vérifier OTP' : 'Envoyer OTP'}</Button>
      </FormWrapper>
    </Container>
  );
};

export default AssociationForm;
