import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';
const API_URLL = 'http://localhost:5000/api/campaigns';



export const createAssociation = async (associationData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/associations/create', associationData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'association', error);
    throw error.response?.data || { error: "Une erreur est survenue lors de la création de l'association" };
  }
};



// Fonction pour l'inscription
export const signUp = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      name,
      email,
      password,
      userType: role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    console.log("Sending credentials:", email, password);
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    console.log("Response data:", response.data);

    // Store authentication data
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('useremail', email);

      // Set default authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response?.data);
    throw error.response?.data || error;
  }
};

// Add a function to check authentication
export const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
  return false;
};



export const addCampagain = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(`${API_URLL}/create`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Une erreur est survenue" };
  }
};


export const makeDonation = async (donationData) => {
  try {
    // Validate required fields
    if (!donationData.campaign || !donationData.amount || !donationData.donorName) {
      throw new Error('Tous les champs requis doivent être remplis');
    }

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    // Set authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Validate payment method
    if (!['creditCard', 'paypal'].includes(donationData.paymentMethod)) {
      throw new Error('Méthode de paiement non valide');
    }

    // Format the payload
    const payload = {
      campaign: donationData.campaign,
      donorName: donationData.donorName.trim(),
      donorEmail: donationData.donorEmail ? donationData.donorEmail.trim() : '',
      amount: Number(donationData.amount),
      paymentMethod: donationData.paymentMethod.toLowerCase(),
      cardNumber: donationData.cardNumber || ''
    };

    // Validate amount
    if (isNaN(payload.amount) || payload.amount <= 0) {
      throw new Error('Le montant du don doit être supérieur à 0');
    }

    console.log('Sending donation payload:', {
      ...payload,
      cardNumber: payload.cardNumber ? '****' : undefined
    });

    const response = await axios.post('http://localhost:5000/api/donations/donate', payload);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du don:", error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      localStorage.clear();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    if (error.response?.status === 500) {
      throw new Error('Erreur serveur lors du traitement du don. Veuillez réessayer.');
    }

    // Handle validation errors from the backend
    if (error.response?.data?.errors?.paymentMethod) {
      throw new Error('Méthode de paiement non valide');
    }

    throw error.response?.data?.message || error.message || "Une erreur est survenue lors du don";
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  console.log('Token in localStorage:', token);

  if (token) {
    try {
      // Décode le token JWT (en le divisant et en décodant la partie payload)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);

      // Vérifier la structure du token et ajuster l'accès à la clé
      // Vous pouvez remplacer 'RoleRole' par la bonne clé, selon la structure du payload
      return decodedToken.role; // Remplacer 'role' si la clé est différente
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  return null; // Si aucun token n'est trouvé, renvoyer null
};

export const getUsermail = () => {
  const token = localStorage.getItem('token');
  console.log('Token in localStorage:', token);

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);

      // Vous pouvez remplacer 'RoleRole' par la bonne clé, selon la structure du payload
      return decodedToken.email; // Remplacer 'role' si la clé est différente
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  return null; // Si aucun token n'est trouvé, renvoyer null
};










export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_URLL}/`);  // Remplacez par votre endpoint d'API
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes', error);
    throw error;
  }
};




export const fetchCampaignDetails = async (id) => {
  try {
    if (!id) {
      throw new Error('ID de campagne non spécifié');
    }
    const response = await axios.get(`${API_URLL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la campagne:', error);
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const fetchCampaignById = async (id) => {
  try {
    if (!id) {
      throw new Error('ID de campagne non spécifié');
    }

    // Check authentication
    checkAuth();

    const response = await axios.get(`${API_URLL}/${id}`);
    if (!response.data) {
      throw new Error('Campagne non trouvée');
    }
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la campagne', error);
    if (error.response?.status === 404) {
      throw new Error('Campagne non trouvée');
    }
    if (error.response?.status === 401) {
      // Clear invalid authentication
      localStorage.clear();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    throw error.response?.data?.message || error.message || 'Erreur lors de la récupération de la campagne';
  }
};

export const deleteCampaign = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la campagne', error);
    throw error.response?.data || { error: "Une erreur est survenue lors de la suppression" };
  }
};


// Ajoute cette fonction dans ton fichier src/api/api.js



// api.js
export const updateCampaign = async (id, campaignData) => {
  try {
    const response = await axios.put(`${API_URLL}/${id}`, campaignData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ... autres imports et fonctions ...

export const fetchDonations = async (email) => {
  try {
    if (!email) {
      console.warn('Email non spécifié pour la récupération des donations');
      return [];
    }

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    // Set authorization header explicitly for this request
    const response = await axios.get(`http://localhost:5000/api/donations/user/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Handle empty response
    if (!response.data) {
      console.log('Aucune donation trouvée');
      return [];
    }

    // Transform the data if needed
    const donations = Array.isArray(response.data) ? response.data : [response.data];

    // Log successful response
    console.log('Donations récupérées:', donations);

    return donations.map(donation => ({
      ...donation,
      campaign: donation.campaign || { name: 'Campagne inconnue' },
      createdAt: donation.createdAt || new Date().toISOString(),
      paymentMethod: donation.paymentMethod || 'Non spécifié'
    }));

  } catch (error) {
    console.error('Erreur lors de la récupération des donations:', error);

    // Handle specific error cases
    if (error.response?.status === 404) {
      console.log('Aucune donation trouvée (404)');
      return [];
    }

    if (error.response?.status === 401) {
      localStorage.clear();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    throw new Error(error.response?.data?.message || error.message || 'Erreur lors de la récupération des donations');
  }
};

// ... autres fonctions ...

// Exemple de fonction correcte
export const fetchChartData = async () => {
  const mockData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Dons mensuels',
        data: [120, 200, 150, 80, 70, 110],
        borderColor: '#FF6F61',
        backgroundColor: 'rgba(255, 111, 97, 0.2)',
      },
    ],
  };



  // Simule une requête réseau avec un délai
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500);
  });
};
