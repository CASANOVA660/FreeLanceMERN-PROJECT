const Donation = require('../Models/Donation');
const Campaign = require('../Models/Campaign');



exports.getTotalDonationsCount = async (req, res) => {
  try {
    const totalCount = await Donation.countDocuments();
    res.status(200).json({
      totalDonationsCount: totalCount,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre total de donations :', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération du nombre total de donations.',
      error: error.message,
    });
  }
};



exports.donate = async (req, res) => {
  try {
    const { donorName, donorEmail, amount, campaign, paymentMethod, cardNumber } = req.body;
    if (!donorName || !donorEmail || !amount || !campaign || !paymentMethod) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
    }
    const newDonation = new Donation({
      donorName,
      donorEmail,
      amount,
      campaign,
      paymentMethod,
      cardNumber, 
    });
    await newDonation.save();
    const campaignToUpdate = await Campaign.findById(campaign);
    if (!campaignToUpdate) {
      return res.status(404).json({ message: 'Campagne non trouvée' });
    }

    // Incrémenter le montant actuel de la campagne
    campaignToUpdate.currentAmount += amount;
    await campaignToUpdate.save();

    // Vérifier si le montant actuel atteint ou dépasse le montant cible
    if (campaignToUpdate.currentAmount >= campaignToUpdate.targetAmount) {
      await Campaign.findByIdAndDelete(campaign);

      return res.status(200).json({
        message: 'Merci pour votre donation ! La campagne a atteint son objectif et a été supprimée.',
        donation: newDonation,
      });
    }

    // Retourner une réponse avec la donation et la campagne mise à jour
    res.status(201).json({
      message: 'Merci pour votre donation !',
      donation: newDonation,
      campaign: campaignToUpdate,
    });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la donation :', error);
    res.status(500).json({
      message: 'Erreur lors de l\'enregistrement de la donation.',
      error: error.message,
    });
  }
};

exports.getDonations = async (req, res) => {
  const { email } = req.params;

  // Validation de l'email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  try {
    const donations = await Donation.find({ donorEmail: email });

    if (donations.length === 0) {
      return res.status(404).json({ message: 'Aucune donation trouvée pour cet email.' });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error('Erreur lors de la récupération des donations :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des donations.', error });
  }
};

