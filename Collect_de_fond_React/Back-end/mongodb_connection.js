require('dotenv').config();  // Charge les variables d'environnement

const { MongoClient } = require('mongodb');

async function main() {
    const uri = process.env.MONGO_URI; // Récupère l'URI de connexion depuis .env
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        // Ajoute ici ton code pour interagir avec la base de données
    } catch (err) {
        console.error("Connection error:", err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
