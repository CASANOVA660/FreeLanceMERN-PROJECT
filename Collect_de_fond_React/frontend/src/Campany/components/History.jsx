import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchDonations, fetchCampaignById } from '../../api/api';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(circle, #ff6f61 0%, #a09898 100%);
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledTable = styled.table`
  width: 90%;
  max-width: 1400px;
  border-collapse: collapse;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 20px auto;
`;

const TableHeader = styled.thead`
  background: #ff6f61;
  color: #fff;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }

  &:hover {
    background: rgba(255, 111, 97, 0.1);
    transition: background-color 0.3s ease;
  }
`;

const TableHeaderCell = styled.th`
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: 15px 20px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 20px;
  color: #fff;
  font-size: 18px;
`;

const DownloadButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ff6f61;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e85b55;
  }
`;

const History = () => {
  const [donations, setDonations] = useState([]);
  const [associationNames, setAssociationNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem('useremail');

  useEffect(() => {
    const getDonations = async () => {
      if (!userEmail) {
        toast.error('Aucun email utilisateur trouvé');
        setIsLoading(false);
        return;
      }

      try {
        const donationData = await fetchDonations(userEmail);
        console.log('Donations récupérées:', donationData);
        
        if (Array.isArray(donationData)) {
          setDonations(donationData);

          const uniqueAssociationIds = [...new Set(donationData.map(donation => donation.campaign_id))];
          
          const associationDetails = await Promise.all(
            uniqueAssociationIds.map(async (id) => {
              try {
                const association = await fetchCampaignById(id);
                return association;
              } catch (error) {
                console.warn(`Impossible de récupérer l'association ${id}:`, error);
                return null;
              }
            })
          );

          const associationNameMap = associationDetails.reduce((acc, association) => {
            if (association) {
              acc[association.id] = association.name;
            }
            return acc;
          }, {});

          setAssociationNames(associationNameMap);
        } else {
          toast.info('Aucune donation trouvée');
          setDonations([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des donations:', error);
        toast.error('Erreur lors de la récupération de l\'historique des donations');
        setDonations([]);
      } finally {
        setIsLoading(false);
      }
    };

    getDonations();
  }, [userEmail]);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Historique des Donations', 20, 10);
    doc.autoTable({
      head: [['Association', 'Nom du Donateur', 'Email', 'Montant', 'Méthode de Paiement', 'Numéro de Carte', 'Date']],
      body: donations.map(donation => [
        associationNames[donation.campaign_id] || 'Association inconnue',
        donation.donorName,
        donation.donorEmail,
        `${donation.amount} DT`,
        donation.paymentMethod,
        `****-****-****-${donation.cardNumber?.slice(-4) || '1245'}`,
        getCurrentDate() // Remplacé formatDate par getCurrentDate
      ])
    });
    doc.save('historique_donations.pdf');
  };

  if (isLoading) {
    return <LoadingSpinner>Chargement de l'historique...</LoadingSpinner>;
  }

  return (
    <TableContainer>
      <Title>Historique des Donations</Title>
      <DownloadButton onClick={downloadPDF}>Télécharger Votre Historique en PDF</DownloadButton>

      <StyledTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nom du Donateur</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Montant</TableHeaderCell>
            <TableHeaderCell>Méthode de Paiement</TableHeaderCell>
            <TableHeaderCell>Numéro de Carte</TableHeaderCell>
            <TableHeaderCell>Numéro de Carte</TableHeaderCell>

          </TableRow>
        </TableHeader>
        <tbody>
          {donations.length > 0 ? (
            donations.map((donation) => (
              <TableRow key={donation.id}>
             
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>{donation.donorEmail}</TableCell>
                <TableCell>{donation.amount} DT</TableCell>
                <TableCell>{donation.paymentMethod}</TableCell>
                <TableCell>****-****-****-1245</TableCell>
                <TableCell>{getCurrentDate()}</TableCell>
                              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6">
                <NoDataMessage>
                  Aucune donation trouvée dans l'historique
                </NoDataMessage>
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default History;