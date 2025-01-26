const Association = require('../Models/Associatioins');






exports.createAssociation = async (req, res) => {
  try {
    const { name, description, email, phone, admin } = req.body;

    const newAssociation = new Association({
      name,
      description,
      email,
      phone,
    });
    await newAssociation.save();

    res.status(201).json({ message: 'Association créée avec succès', data: newAssociation });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'association', error: error.message });
  }
};


// Obtenir toutes les associations
exports.getAllAssociations = async (req, res) => {
  try {
    const associations = await Association.find().populate('association');
    res.status(200).json(associations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une association par ID
exports.getAssociationById = async (req, res) => {
  try {
    const association = await Association.findById(req.params.id);
    if (!association) {
      return res.status(404).json({ message: 'Association non trouvée' });
    }
    res.status(200).json(association);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une association
exports.updateAssociation = async (req, res) => {
  try {
    const updatedAssociation = await Association.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAssociation) {
      return res.status(404).json({ message: 'Association non trouvée' });
    }
    res.status(200).json(updatedAssociation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une association
exports.deleteAssociation = async (req, res) => {
  try {
    const deletedAssociation = await Association.findByIdAndDelete(req.params.id);
    if (!deletedAssociation) {
      return res.status(404).json({ message: 'Association non trouvée' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

