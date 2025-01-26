const Campaign = require('../Models/Campaign.js');
const mongoose = require('mongoose');  // Ajoutez cette ligne en haut du fichier


exports.getTotalCampaigns = async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    res.status(200).json({ totalCampaigns });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre total de campagnes' });
  }
};


exports.createCampaign = async (req, res) => {
  const { name, description, targetAmount, currentAmount, startDate, endDate, bannerImage, association } = req.body;

  // Vérification des champs obligatoires
  if (!name || !startDate || !endDate) {
    return res.status(400).json({ message: "Les champs 'name', 'startDate' et 'endDate' sont obligatoires." });
  }

  // Création d'une nouvelle campagne
  const newCampaign = new Campaign({
    name,
    description,
    targetAmount,
    currentAmount: currentAmount || 0, // Ajout d'une valeur par défaut si currentAmount n'est pas fourni
    startDate,
    endDate,
    bannerImage,
    association,
  });

  try {
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des campagnes" });
  }
};


exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campagne non trouvée' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};




exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { name, description, targetAmount, startDate, endDate, bannerImage, status } = req.body;

  try {
    // Vérifiez que l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de campagne invalide' });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      {
        name,
        description,
        targetAmount,
        startDate,
        endDate,
        bannerImage,
        status
      },
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campagne non trouvée." });
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error('Erreur détaillée:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la campagne.' });
  }
};
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params; // ID de la campagne à supprimer

  try {
    // Tentative de suppression de la campagne
    const deletedCampaign = await Campaign.findByIdAndDelete(id);

    // Si aucune campagne n'a été trouvée, renvoyer une erreur 404
    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campagne non trouvée." });
    }

    // Retourner un message de succès
    res.status(200).json({ message: "Campagne supprimée avec succès." });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
};

