// Company.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import styled from 'styled-components';
import { fetchCampaigns, getUserRole } from '../api/api';
import CampaignCardHome from './components/CampaignCardHome';
import CampaignCard from '../Campany/components/CampaignCard';
import Dashboard from './components/Dashbord';
import History from './components/History';

const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: radial-gradient(circle, #FF6F61 0%, #A09898 100%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

const Company = () => {
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState('campaigns');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const campaignsData = await fetchCampaigns();
        setCampaigns(campaignsData);
        setFilteredCampaigns(campaignsData);

        const role = getUserRole();
        setUserRole(role);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  };

  const renderContent = () => {
    if (activePage === 'dashboard') {
      return <Dashboard />;
    }
    if (activePage === 'History') {
      return <History />;
    } else if (activePage === 'campaigns') {
      return loading ? (
        <p>Chargement des campagnes...</p>
      ) : (
        <CardsContainer>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) =>
              userRole === 'donor' ? (
                <CampaignCardHome
                  key={campaign._id}
                  campaign={campaign}
                  isLoggedIn={true}
                />
              ) : (
                <CampaignCard key={campaign._id} campaign={campaign} />
              )
            )
          ) : (
            <p>Aucune campagne trouvée pour votre recherche.</p>
          )}
        </CardsContainer>
      );
    }
  };

  return (
    <CompanyContainer>
      <Navbar onSearch={handleSearch} />
      <ContentWrapper>
        <SideBar setActivePage={setActivePage} />
        <div style={{ flex: 1 }}>{renderContent()}</div>
      </ContentWrapper>
    </CompanyContainer>
  );
};

export default Company;
