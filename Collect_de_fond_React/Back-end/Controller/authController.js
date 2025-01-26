const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../Models/User');

exports.getTotalUserCount = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    res.status(200).json({ totalUser });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre des users' });
  }
};




exports.register = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    // Vérifiez si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Utilisateur déjà enregistré' });

    // Vérification que tous les champs sont présents
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Définir le rôle en fonction du type d'utilisateur (userType)
    const role = userType?.toLowerCase() === 'donor' ? 'donor' : 'association';

    // Log des valeurs après la définition du rôle
    console.log("userType:", userType);
    console.log("role:", role);

    // Créer un nouvel utilisateur
    user = new User({ name, email, password, role });

    // Enregistrer l'utilisateur dans la base de données
    await user.save();

    // Génération du token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Réponse réussie avec le token et les informations utilisateur
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } 
  catch (err) {
    // Affichage des erreurs détaillées dans la console et en réponse JSON
    console.error("Erreur lors de l'enregistrement:", err); // Affiche l'erreur dans la console

    // Renvoyer l'erreur au format JSON
    res.status(500).json({
      message: 'Erreur lors de l’enregistrement de l’utilisateur.',
      error: err.message || 'Une erreur inconnue s\'est produite.',
      stack: err.stack || 'Pas de trace d\'erreur disponible',
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: {  id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



