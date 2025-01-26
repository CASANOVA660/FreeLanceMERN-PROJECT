import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import * as THREE from 'three';
import EmailRounded from '@mui/icons-material/EmailRounded';
import PasswordRounded from '@mui/icons-material/PasswordRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { signUp } from '../api/api';  
import { login } from '../api/api'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const slideInUp = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const slideOutUp = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
`;

const slideInDown = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const slideOutDown = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
`;

const FormWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ animateIn }) => animateIn && css`animation: ${slideInUp} 1s forwards;`}
  ${({ animateOut }) => animateOut && css`animation: ${slideOutUp} 1s forwards;`}
`;

const FormWrapperSignIn = styled(FormWrapper)`
  ${({ animateIn }) => animateIn && css`animation: ${slideInDown} 1s forwards;`}
  ${({ animateOut }) => animateOut && css`animation: ${slideOutDown} 1s forwards;`}
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 14px 14px 40px;
  border: 1px solid #FF6F61;
  border-radius: 8px;
  background-color: #1F1B24;
  color: #D1D1D1;
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
  color: #FF6F61;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  background-color: #FF6F61;
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

const SignUpLink = styled.p`
  font-size: 16px;
  color: #D1D1D1;
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
`;


const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const RadioLabel = styled.label`
  color: #D1D1D1;
  font-size: 14px;
  transform: scale(1.2);
  margin-right: 8px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const SignIn = () => {
  const [userType, setUserType] = useState('donor'); 

  const navigate = useNavigate(); 

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signInAutoFill, setSignInAutoFill] = useState({ email: '', password: '' });

  const handleSignUp = async () => {
    try {
      if (userType === 'donor') {
        await signUp(name, email, password, 'donor');
        
        toast.success('Inscription réussie !', {
          style: { backgroundColor: '#FF6F61', color: '#D1D1D1' },
          position: 'top-right',
          autoClose: 3000,
        });
  
        setSignInAutoFill({ email, password }); 
        setShowSignUp(false); 
      } 
      else if (userType === 'association') {
        navigate('/AssociationForm'); 
        await signUp(name, email, password, 'association');
        toast.success('Completer Ce Formulaire Pour Plus Des Details !', {
          style: { backgroundColor: '#FF6F61', color: '#D1D1D1' },
          position: 'top-right',
          autoClose: 3000,
        });
  
        setSignInAutoFill({ email, password }); 
        setShowSignUp(false);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  


  const handleSignIn = async () => {
    try {
      const data = await login(email, password); // Récupère toutes les données retournées par le login
      const { token, user } = data; // Assurez-vous que la réponse contient { token, user }
  
      // Enregistrez le token et le rôle dans le localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user.role); // Stockez le rôle utilisateur
      localStorage.setItem('userId', user.id); 
      localStorage.setItem('useremail', user.email); 

      console.log('User mail:', localStorage.getItem('useremail'));
      console.log('User Role:', localStorage.getItem('userRole'));
      console.log('User ID:', localStorage.getItem('userId'));
      console.log('Token in localStorage:', localStorage.getItem('authToken'));


  
      // Affichez un toast de succès
      toast.success('Connexion réussie !', {
        style: { backgroundColor: '#FF6F61', color: '#D1D1D1' },
        position: 'top-right',
        autoClose: 3000,
      });
  
      // Redirigez vers la page "company"
      navigate('/company');
    } catch (err) {
      // Affichez un toast en cas d'erreur
      toast.error(err.message || 'Erreur lors de la connexion.');
    }
  };
  

  

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!showSignUp) {
      setUserType('donor'); // Réinitialise à "donor" quand on passe à la page de connexion
    }
  }, [showSignUp]);
 


  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
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

    const material = new THREE.PointsMaterial({ color: 0xF16F61, size: 0.05 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.01;
      particles.rotation.y += 0.01;
      particles.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
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

  const handleToggle = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowSignUp(!showSignUp);
      setAnimateOut(false);
      setAnimateIn(true);
    }, 800); 
  };



  return (
    <Container>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
<ToastContainer
  
  toastStyle={{ backgroundColor: '#FF6F61', color: '#fff' }}
/>


      {showSignUp ? (
        <FormWrapper animateIn={animateIn} animateOut={animateOut}>

          <InputWrapper>
            <IconWrapper><AccountCircle /></IconWrapper>
            <Input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="Nom d'utilisateur" />
          </InputWrapper>
          <InputWrapper>
            <IconWrapper><EmailRounded /></IconWrapper>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse Email" />
          </InputWrapper>
          <InputWrapper>
            <IconWrapper><PasswordRounded /></IconWrapper>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
          </InputWrapper>
          <RadioWrapper>
            <div>
              <RadioInput
                type="radio"
                id="donor"
                name="userType"
                value="donor"
                checked={userType === 'donor'}
                onChange={(e) => setUserType('donor')}
              />
              <RadioLabel htmlFor="donor">Donateur</RadioLabel>
            </div>
            <div>
              <RadioInput
                type="radio"
                id="association"
                name="userType"
                value="association"
                checked={userType === 'association'}
                onChange={(e) => setUserType('association')}
              />
              <RadioLabel htmlFor="association">Association</RadioLabel>
            </div>
          </RadioWrapper>
          <Button onClick={() => { handleSignUp(); handleToggle(); }}>S'inscrire</Button>
          <SignUpLink onClick={handleToggle}>Déjà un compte ? Connectez-vous</SignUpLink>
        </FormWrapper>
      ) : (
        <FormWrapperSignIn animateIn={animateIn} animateOut={animateOut}>
          <InputWrapper>
            <IconWrapper><EmailRounded /></IconWrapper>
            <Input type="email" value={email|| signInAutoFill.email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse Email" />
          </InputWrapper>
          <InputWrapper>
            <IconWrapper><PasswordRounded /></IconWrapper>
            <Input type="password" value={password || signInAutoFill.password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
          </InputWrapper>
          <Button onClick={handleSignIn}>Connexion</Button>
          <SignUpLink onClick={handleToggle}>Pas encore un compte ? S'inscrire</SignUpLink>
        </FormWrapperSignIn>
      )}
      
    </Container>
  );
};

export default SignIn;
