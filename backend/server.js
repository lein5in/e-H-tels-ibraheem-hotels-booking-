// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import hotelsRouter from './routes/hotels.js';
import chambresRouter from './routes/chambres.js';
import clientsRouter from './routes/clients.js';
import employesRouter from './routes/employes.js';
import reservationsRouter from './routes/reservations.js';
import locationsRouter from './routes/locations.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hotels', hotelsRouter);
app.use('/api/chambres', chambresRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/employes', employesRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/locations', locationsRouter);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: '✅ API e-Hôtels opérationnelle' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});