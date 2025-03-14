const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // 
app.use(express.json());


/*const nodemailer = require('nodemailer');*/

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Permet uniquement les requêtes depuis le frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



require('dotenv').config();
/*app.use(express.json());

let otpStorage = {};

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yyedwahda@gmail.com', 
    pass: 'VOTRE_MOT_DE_PASSE_APPLICATION', // Utiliser un mot de passe d'application
  },
});

// Route pour l'envoi de l'OTP
app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Adresse email manquante.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Génération d'un OTP à 6 chiffres

  otpStorage[email] = otp; // Stockage temporaire de l'OTP

  const mailOptions = {
    from: 'yyedwahda@gmail.com',
    to: email,
    subject: 'Vérification de votre email',
    text: `Votre code OTP est : ${otp}. Ce code est valable pendant 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email : ', error);
      return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'OTP' });
    }
    console.log('Email envoyé : ', info.response);
    res.status(200).json({ message: 'OTP envoyé avec succès !' });
  });
});*/



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conncté a database'))
  .catch((err) => console.error(err));


app.get('/', (req, res) => {
  res.send('Bienvenue dans l\'application de collecte de fonds');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupère le token dans l'en-tête Authorization

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });

    req.user = decoded; // Attache l'utilisateur décodé à la requête
    next(); // Passe au prochain middleware ou à la route
  });
};

module.exports = authenticateToken;



// Route pour générer un token (avec rôle)
app.post('/generate-token', (req, res) => {
  const user = { id: '1234', role: 'donor' }; // Exemple d'utilisateur
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  // Envoie du token et du rôle dans une seule réponse
  res.json({ token, role: user.role });
});



// Route pour obtenir le rôle de l'utilisateur à partir du token
app.get('/get-user-role', authenticateToken, (req, res) => {
  // Si le token est valide, on renvoie le rôle de l'utilisateur
  res.json({ role: req.user.role });
});


const donationRoutes = require('./routes/donateRoutes');
const authRoutes = require('./routes/authRoutes');
const associationRoutes = require('./routes/associationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/associations', associationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes); 
