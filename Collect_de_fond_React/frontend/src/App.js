import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home'; // Main Home page
/*import AuthPage from './authPage/AuthPage';*/
import Login from './components/SignIn'; 
import { ToastContainer } from 'react-toastify';  // Importer ToastContainer
import Company from './Campany/Company';// AuthPage managing SignIn and SignUp
import CampaignDetails from '../src/Campany/components/CampaignDetails';
import Donation from './Campany/components/Donation';
import Dashbord from './Campany/components/Dashbord';
import AssociationForm from './components/AssociationForm';


import History from './Campany/components/History';




const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/company" element={<Company />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/donation/:id" element={<Donation />} />
          <Route path="/Dashbord" element={<Dashbord />} />
          <Route path="/AssociationForm" element={<AssociationForm />} />

          <Route path="/History" element={<History />} />





        </Routes>
      </div>
      <ToastContainer />

    </Router>
  );
};

export default App;
