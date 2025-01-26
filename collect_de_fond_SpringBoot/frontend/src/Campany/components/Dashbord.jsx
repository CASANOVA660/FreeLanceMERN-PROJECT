import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import axios from 'axios';
import { FaHandsHelping, FaDonate, FaUsers } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: radial-gradient(circle, #FF6F61 0%, #A09898 100%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: rgba(20, 26, 48, 0.95);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #FF6F61;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(255, 111, 97, 0.2);
  }
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: #FF6F61;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`;

const StatValue = styled.h2`
  font-size: 36px;
  color: #fff;
  margin: 10px 0;
  font-weight: bold;
`;

const StatDescription = styled.p`
  font-size: 18px;
  color: #fff;
  opacity: 0.9;
  text-align: center;
`;

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  padding: 20px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px 0;
`;

// Le reste du code JavaScript reste identique...

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalDonations: 0,
    activeUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: 'Statistiques',
        font: { size: 16 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)' }
      },
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' }
      }
    }
  };

  const lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [{
      label: 'Campagnes',
      data: [50, 100, 150, 200, 250, 300, 350],
      borderColor: '#FF6F61',
      backgroundColor: 'rgba(255, 111, 97, 0.2)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const barData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
    datasets: [{
      label: 'Dons',
      data: [20, 40, 60, 80, 100, 120, 140],
      backgroundColor: '#FF6F61',
      borderColor: '#141E30',
      borderWidth: 1,
      borderRadius: 5
    }]
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Requêtes individuelles
        const campaignsRes = await axios.get('http://localhost:8082/api/campaigns/total');
        const donationsRes = await axios.get('http://localhost:8082/api/donations/total');
        const usersRes = await axios.get('http://localhost:8082/api/auth/count');

        console.log('Réponses brutes:', {
          campaigns: campaignsRes.data,
          donations: donationsRes.data.total,
          users: usersRes.data
        });

        // Construction de l'objet avec la structure exacte des réponses
        const statsData = {
          totalCampaigns: Number(campaignsRes.data), // la réponse est directement le nombre
          totalDonations: Number(donationsRes.data.total), // la réponse est dans .total
          activeUsers: Number(usersRes.data) // la réponse est directement le nombre
        };

        console.log('Données formatées:', statsData);
        return statsData;

      } catch (error) {
        console.error('Erreur lors de la récupération:', error);
        throw error;
      }
    };

    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserStats();
        
        console.log('Données avant setState:', data);
        
        setStats({
          totalCampaigns: data.totalCampaigns,
          totalDonations: data.totalDonations,
          activeUsers: data.activeUsers
        });

      } catch (error) {
        console.error('Erreur de chargement:', error);
        setError('Impossible de charger les statistiques');
        toast.error('Erreur lors du chargement des statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  // Ajout d'un useEffect pour surveiller les changements de stats
  useEffect(() => {
    console.log('Stats actuelles:', stats);
  }, [stats]);

  return (
    <DashboardContainer>
      <Navbar />
      <ContentWrapper>
        <SideBar />
        <ContentArea>
          {isLoading ? (
            <LoadingSpinner>
              <div className="spinner"></div>
              Chargement des statistiques...
            </LoadingSpinner>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <>
              <StatsWrapper>
                <StatCard>
                  <IconWrapper>
                    <FaHandsHelping />
                  </IconWrapper>
                  <StatValue>{stats.totalCampaigns}</StatValue>
                  <StatDescription>Campagnes Actives</StatDescription>
                </StatCard>

                <StatCard>
                  <IconWrapper>
                    <FaDonate />
                  </IconWrapper>
                  <StatValue>{stats.totalDonations}</StatValue>
                  <StatDescription>Total des Dons</StatDescription>
                </StatCard>

                <StatCard>
                  <IconWrapper>
                    <FaUsers />
                  </IconWrapper>
                  <StatValue>{stats.activeUsers}</StatValue>
                  <StatDescription>Utilisateurs Actifs</StatDescription>
                </StatCard>
              </StatsWrapper>

              <ChartWrapper>
                <ChartContainer>
                  <Line 
                    data={lineData} 
                    options={chartOptions} 
                    height={300}
                  />
                </ChartContainer>
                <ChartContainer>
                  <Bar 
                    data={barData} 
                    options={chartOptions} 
                    height={300}
                  />
                </ChartContainer>
              </ChartWrapper>
            </>
          )}
        </ContentArea>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;