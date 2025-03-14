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
    console.log("Response data:", response.data); // Ajoutez ce log
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response.data); // Ajoutez ce log
    throw error.response.data;
  }
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
    // Validation des données
    if (!donationData.campaign || !donationData.amount || !donationData.donorName) {
      throw new Error('Tous les champs requis doivent être remplis');
    }

    // Structure exacte attendue par le backend
    const payload = {
      campaign_id: donationData.campaign, // Changé de campaignId à campaign_id
      donorName: donationData.donorName,
      donorEmail: donationData.donorEmail || '',
      amount: Number(donationData.amount),
      paymentMethod: donationData.paymentMethod.toUpperCase(), // Conversion en majuscules
      cardNumber: donationData.cardNumber || ''
    };

    console.log('Payload final:', payload);

    const response = await axios.post('http://localhost:5000/api/donations/donate', payload);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du don:", error);
    throw new Error(error.response?.data?.message || "Erreur lors de l'envoi du don");
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
    const response = await axios.get(`${API_URLL}/${id}`);
    return response.data; // Assurez-vous que la réponse contient { _id, name }
  } catch (error) {
    console.error('Erreur lors de la récupération de la campagne', error);
    throw error;
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
    // Correction de l'URL pour utiliser le bon endpoint avec le paramètre email
    const response = await axios.get(`http://localhost:5000/api/donations/by-email`, {
      params: {
        email: email
      }
    });

    console.log('Données des donations reçues:', response.data);

    // Vérifier si la réponse est vide ou contient un message
    if (response.data.message) {
      return []; // Retourner un tableau vide si aucune donation n'est trouvée
    }

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des donations:', error);

    // Gestion plus détaillée des erreurs
    if (error.response) {
      // La requête a été faite et le serveur a répondu avec un code d'état
      // qui ne fait pas partie de la plage 2xx
      throw error.response.data;
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      throw { error: "Aucune réponse du serveur" };
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      throw { error: "Erreur lors de la configuration de la requête" };
    }
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
