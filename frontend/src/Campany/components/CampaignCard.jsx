import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faDonate, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteCampaign, updateCampaign } from "../../api/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ... (imports précédents)

// Styled Components de base
const CardWrapper = styled.div`
  background: #141E30;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #FF6F61;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  width: 300px;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  z-index: 2;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const CampaignInfo = styled.div`
  text-align: center;
  color: #ffffff;
  width: 100%;
`;

const CampaignName = styled.h5`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
`;

const CampaignDescription = styled.p`
  font-size: 16px;
  color: #dcdcdc;
  margin-bottom: 15px;
`;

const CampaignDetails = styled.p`
  font-size: 16px;
  color: #dcdcdc;
  margin-bottom: 10px;

  strong {
    color: #FF6F61;
  }
`;

const StyledButton = styled(Button)`
  background-color: #FF6F61;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e85b55;
    transform: translateY(-2px);
  }
`;

const DonateButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 36px;
  color: #FF6F61;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin: 10px 0;
  position: relative;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #FF6F61;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

// ... (autres styled components du modal)

// ... (le reste du composant CampaignCard)
const EditModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const EditForm = styled.form`
  background: #1f1f1f;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  color: white;
  border: 1px solid #FF6F61;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #FF6F61;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #FF6F61;
  border-radius: 8px;
  background: #2d2d2d;
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e85b55;
    box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #FF6F61;
  border-radius: 8px;
  background: #2d2d2d;
  color: white;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e85b55;
    box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const ModalButton = styled(Button)`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SaveButton = styled(ModalButton)`
  background: #FF6F61;
  border: none;
  
  &:hover {
    background: #e85b55;
  }
`;

const CancelButton = styled(ModalButton)`
  background: transparent;
  border: 1px solid #FF6F61;
  color: #FF6F61;
  
  &:hover {
    background: rgba(255, 111, 97, 0.1);
    border-color: #e85b55;
    color: #e85b55;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #FF6F61;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e85b55;
    transform: rotate(90deg);
  }
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DeleteForm = styled.div`
  background: #1f1f1f;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  color: white;
  border: 1px solid #FF6F61;
  position: relative;
  text-align: center;
`;

const DeleteInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #FF6F61;
  border-radius: 8px;
  background: #2d2d2d;
  color: white;
  font-size: 14px;
  margin: 20px 0;
  text-align: center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e85b55;
    box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.2);
  }
`;

const DeleteText = styled.p`
  color: #dcdcdc;
  margin: 20px 0;
  line-height: 1.5;
  font-size: 16px;

  strong {
    color: #FF6F61;
  }
`;

const WarningText = styled.p`
  color: #FF6F61;
  margin: 10px 0;
  font-size: 14px;
  font-style: italic;
`;

const CampaignStatus = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: ${props => props.isComplete ? '#4CAF50' : '#FF6F61'};
  color: white;
  font-size: 12px;
  z-index: 2;
`;

const CampaignCard = ({ campaign, onEdit, onUpdate }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: campaign.name,
    description: campaign.description,
    targetAmount: campaign.targetAmount,
    startDate: campaign.startDate.split('T')[0],
    endDate: campaign.endDate.split('T')[0],
    bannerImage: campaign.bannerImage,
    currentAmount: campaign.currentAmount
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    setUserId(id);
    setUserRole(role);
  }, []);

  const isCampaignComplete = campaign.currentAmount >= campaign.targetAmount;

  const handleDelete = async () => {
    try {
      if (!campaign._id) {
        toast.error("ID de campagne non valide");
        return;
      }

      // Check authentication before delete
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expirée, veuillez vous reconnecter');
        navigate('/login');
        return;
      }

      await deleteCampaign(campaign._id);
      toast.success("Campagne supprimée avec succès !");
      setShowDeleteModal(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      if (error.response?.status === 401) {
        toast.error('Session expirée, veuillez vous reconnecter');
        navigate('/login');
      } else {
        toast.error("Erreur lors de la suppression de la campagne");
      }
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...editFormData,
        targetAmount: Number(editFormData.targetAmount),
        currentAmount: Number(editFormData.currentAmount),
        association: {
          id: campaign._id  // Ajout de l'ID de l'association
        }
      };

      console.log('Données formatées:', formattedData); // Pour le débogage
      await updateCampaign(campaign._id, formattedData);  // Changé de _id à id
      toast.success("Campagne mise à jour avec succès !");
      setShowEditModal(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewMore = (e) => {
    e.stopPropagation();
    navigate(`/campaign/${campaign._id}`);
  };

  const handleDonateClick = (e) => {
    e.stopPropagation();
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'donor') {
      toast.error('Seuls les donateurs peuvent faire des dons');
      return;
    }

    navigate(`/donation/${campaign._id}`);
  };

  const currentAmount = campaign.currentAmount;
  const targetAmount = campaign.targetAmount;
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);
  return (
    <>
      <CardWrapper>
        <IconWrapper>
          {(userId === campaign.createdBy || userRole === 'association') && !isCampaignComplete && (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: '#4a90e2', cursor: 'pointer' }}
                onClick={handleEditClick}
              />
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: '#e74c3c', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                  setDeleteConfirmation('');
                }}
              />
            </>
          )}
        </IconWrapper>

        <CampaignStatus isComplete={isCampaignComplete}>
          {isCampaignComplete ? 'Objectif atteint' : 'En cours'}
        </CampaignStatus>

        <BannerImage src={campaign.bannerImage} alt={campaign.name} />
        <CampaignInfo>
          <CampaignName>{campaign.name}</CampaignName>
          <CampaignDescription>{campaign.description}</CampaignDescription>
          <CampaignDetails>
            <strong>Montant cible:</strong> {campaign.targetAmount} DT
          </CampaignDetails>
          <CampaignDetails>
            <strong>Montant actuel:</strong> {campaign.currentAmount} DT
          </CampaignDetails>

          <ProgressBar>
            <Progress width={progressPercentage} />
          </ProgressBar>

          <CampaignDetails>
            <strong>Dates:</strong>{' '}
            {new Date(campaign.startDate).toLocaleDateString()} -{' '}
            {new Date(campaign.endDate).toLocaleDateString()}
          </CampaignDetails>
          <StyledButton onClick={handleViewMore}>Voir plus</StyledButton>
        </CampaignInfo>

        {userRole === 'donor' && (
          <DonateButton onClick={handleDonateClick}>
            <FontAwesomeIcon icon={faDonate} />
          </DonateButton>
        )}
      </CardWrapper>

      {showEditModal && (
        <EditModal onClick={() => setShowEditModal(false)}>
          <EditForm onClick={e => e.stopPropagation()} onSubmit={handleEditSubmit}>
            <CloseButton onClick={() => setShowEditModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>

            <h2 style={{ marginBottom: '20px', color: '#FF6F61', textAlign: 'center' }}>
              Modifier la campagne
            </h2>

            <FormGroup>
              <Label>Nom de la campagne</Label>
              <Input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Montant cible (DT)</Label>
              <Input
                type="number"
                name="targetAmount"
                value={editFormData.targetAmount}
                onChange={handleInputChange}
                required
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <Label>Montant actuel (DT)</Label>
              <Input
                type="number"
                name="currentAmount"
                value={editFormData.currentAmount}
                onChange={handleInputChange}
                required
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <Label>Date de début</Label>
              <Input
                type="date"
                name="startDate"
                value={editFormData.startDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Date de fin</Label>
              <Input
                type="date"
                name="endDate"
                value={editFormData.endDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <ButtonGroup>
              <CancelButton type="button" onClick={() => setShowEditModal(false)}>
                Annuler
              </CancelButton>
              <SaveButton type="submit">
                Sauvegarder
              </SaveButton>
            </ButtonGroup>
          </EditForm>
        </EditModal>
      )}


      {showDeleteModal && (
        <DeleteModal onClick={() => setShowDeleteModal(false)}>
          <DeleteForm onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setShowDeleteModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>

            <h2 style={{ color: '#FF6F61', marginBottom: '20px' }}>
              Confirmer la suppression
            </h2>

            <DeleteText>
              Pour supprimer la campagne <strong>"{campaign.name}"</strong>,
              veuillez recopier son nom ci-dessous :
            </DeleteText>

            <DeleteInput
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Tapez le nom de la campagne"
            />

            <WarningText>
              Cette action est irréversible !
            </WarningText>

            <ButtonGroup>
              <CancelButton onClick={() => setShowDeleteModal(false)}>
                Annuler
              </CancelButton>
              <SaveButton
                onClick={() => handleDelete(campaign._id)}
                disabled={deleteConfirmation !== campaign.name}
                style={{
                  background: deleteConfirmation !== campaign.name ? '#666' : '#FF6F61',
                  cursor: deleteConfirmation !== campaign.name ? 'not-allowed' : 'pointer'
                }}
              >
                Supprimer
              </SaveButton>
            </ButtonGroup>
          </DeleteForm>
        </DeleteModal>
      )}
    </>

  );
};

export default CampaignCard;