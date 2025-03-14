import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import { addCampagain } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, Send, Close } from '@mui/icons-material';

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    135deg,
    rgba(28, 42, 59, 0.95) 0%,
    rgba(28, 42, 59, 0.98) 100%
  );
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 10;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* Styles pour la scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #FF6F61;
    border-radius: 4px;
  }

  /* Animation d'entrée */
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 5;
`;

const Title = styled(motion.h2)`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #FF6F61, #FFA07A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #FF6F61, #FFA07A);
    border-radius: 2px;
  }
`;

const FormWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 30px;
`;

const Column = styled.div`
  flex: 1 1 calc(50% - 15px);
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 15px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    & fieldset {
      border-color: rgba(255, 111, 97, 0.3);
    }

    &.Mui-focused fieldset {
      border-color: #FF6F61;
      border-width: 2px;
    }
  }

  & .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    font-weight: 500;

    &.Mui-focused {
      color: #FF6F61;
    }
  }

  & .MuiOutlinedInput-input {
    color: #fff;
    
    &[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
      cursor: pointer;
    }
  }
`;

const ImageUploadContainer = styled(motion.div)`
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 2px dashed rgba(255, 111, 97, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #FF6F61;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const UploadIcon = styled(CloudUpload)`
  color: #FF6F61;
  font-size: 48px !important;
  margin-bottom: 10px;
`;

const UploadText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 1.1rem;
`;

const UploadInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-height: 200px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  && {
    padding: 12px 35px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &.submit-btn {
      background: linear-gradient(45deg, #FF6F61, #FFA07A);
      color: white;
      
      &:hover {
        background: linear-gradient(45deg, #FF6F61, #FF8E53);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 111, 97, 0.4);
      }
    }
    
    &.cancel-btn {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
      }
    }
  }
`;

const CardAssociation = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [status] = useState("pending");
  const [currentAmount, setCurrentAmount] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setBannerImage(URL.createObjectURL(file));
    } else {
      toast.error("Veuillez sélectionner une image valide (jpg, png).");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description || !targetAmount || !startDate || !endDate || !bannerImage) {
      toast.error("Veuillez remplir tous les champs avant de soumettre.");
      return;
    }

    const formData = {
      name,
      description,
      targetAmount,
      currentAmount,
      startDate,
      endDate,
      bannerImage,
      status,
    };

    try {
      await addCampagain(formData);
      toast.success("Association ajoutée avec succès !");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Une erreur est survenue.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <FormContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Title>Créer une nouvelle campagne</Title>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Column>
              <StyledTextField
                variant="outlined"
                label="Nom de l'association"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <StyledTextField
                variant="outlined"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
              />
            </Column>
            <Column>
              <StyledTextField
                variant="outlined"
                label="Montant Cible (DT)"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
                fullWidth
              />
              <StyledTextField
                variant="outlined"
                label="Montant Actuel (DT)"
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                required
                fullWidth
              />
              <Row>
                <StyledTextField
                  variant="outlined"
                  label="Date de Début"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  fullWidth
                />
                <StyledTextField
                  variant="outlined"
                  label="Date de Fin"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  fullWidth
                />
              </Row>
            </Column>
          </FormWrapper>

          <ImageUploadContainer>
            <UploadInput
              type="file"
              id="image-upload"
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleImageChange}
            />
            {bannerImage ? (
              <ImagePreviewContainer>
                <PreviewImage src={bannerImage} alt="Prévisualisation" />
              </ImagePreviewContainer>
            ) : (
              <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                <UploadIcon />
                <UploadText>Cliquez ou glissez une image ici</UploadText>
              </label>
            )}
          </ImageUploadContainer>

          <ButtonContainer>
            <StyledButton
              type="submit"
              className="submit-btn"
              endIcon={<Send />}
            >
              Soumettre
            </StyledButton>
            <StyledButton
              type="button"
              onClick={onClose}
              className="cancel-btn"
              endIcon={<Close />}
            >
              Annuler
            </StyledButton>
          </ButtonContainer>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </FormContainer>
    </AnimatePresence>
  );
};

export default CardAssociation;