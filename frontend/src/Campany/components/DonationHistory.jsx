import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchDonations } from '../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DonationHistoryWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #FF6F61;
  margin-bottom: 20px;
  text-align: center;
`;

const DonationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DonationCard = styled.div`
  background: #1f1f1f;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #FF6F61;
  color: white;
`;

const DonationInfo = styled.p`
  margin: 5px 0;
  color: #dcdcdc;
  
  strong {
    color: #FF6F61;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #dcdcdc;
  font-style: italic;
  margin-top: 30px;
`;

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                // Check authentication first
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('useremail');
                const userRole = localStorage.getItem('userRole');

                if (!token || !email) {
                    console.log('Authentication required:', { token, email });
                    toast.error('Veuillez vous connecter pour voir votre historique');
                    navigate('/login');
                    return;
                }

                if (userRole !== 'donor') {
                    console.log('Invalid role:', userRole);
                    toast.error('Accès réservé aux donateurs');
                    navigate('/');
                    return;
                }

                console.log('Fetching donations for email:', email);
                const donationData = await fetchDonations(email);
                console.log('Received donation data:', donationData);

                if (Array.isArray(donationData)) {
                    setDonations(donationData);
                    setError(null);

                    if (donationData.length === 0) {
                        toast.info('Aucun don trouvé dans votre historique');
                    }
                } else {
                    console.error('Invalid donation data format:', donationData);
                    setError('Format de données invalide');
                }
            } catch (error) {
                console.error('Error in fetchDonationHistory:', error);
                setError(error.message || 'Erreur lors de la récupération de l\'historique');

                if (error.message === 'Session expirée, veuillez vous reconnecter') {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    toast.error(error.message || 'Erreur lors de la récupération de l\'historique');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonationHistory();
    }, [navigate]);

    if (isLoading) {
        return (
            <DonationHistoryWrapper>
                <Title>Chargement de l'historique...</Title>
            </DonationHistoryWrapper>
        );
    }

    if (error) {
        return (
            <DonationHistoryWrapper>
                <Title>Erreur</Title>
                <EmptyMessage>{error}</EmptyMessage>
            </DonationHistoryWrapper>
        );
    }

    return (
        <DonationHistoryWrapper>
            <Title>Historique des Dons</Title>
            {donations.length > 0 ? (
                <DonationList>
                    {donations.map((donation, index) => (
                        <DonationCard key={donation._id || index}>
                            <DonationInfo>
                                <strong>Campagne:</strong> {donation.campaign?.name || 'Campagne inconnue'}
                            </DonationInfo>
                            <DonationInfo>
                                <strong>Montant:</strong> {donation.amount} DT
                            </DonationInfo>
                            <DonationInfo>
                                <strong>Date:</strong> {new Date(donation.createdAt).toLocaleDateString()}
                            </DonationInfo>
                            <DonationInfo>
                                <strong>Méthode de paiement:</strong> {
                                    donation.paymentMethod === 'creditCard' ? 'Carte de Crédit' : 'PayPal'
                                }
                            </DonationInfo>
                        </DonationCard>
                    ))}
                </DonationList>
            ) : (
                <EmptyMessage>Aucun don effectué pour le moment.</EmptyMessage>
            )}
        </DonationHistoryWrapper>
    );
};

export default DonationHistory; 