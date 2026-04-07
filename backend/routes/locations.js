// backend/routes/locations.js
import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET toutes les locations
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.*,
                cl.nom AS client_nom, cl.prenom AS client_prenom,
                c.numero AS chambre_numero,
                h.nom AS hotel_nom,
                e.nom AS employe_nom, e.prenom AS employe_prenom
            FROM Location l
            JOIN Client cl ON l.client_id = cl.id
            JOIN Chambre c ON l.chambre_id = c.id
            JOIN Hotel h ON c.hotel_id = h.id
            JOIN Employe e ON l.employe_id = e.id
            ORDER BY l.date_location DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET une location par id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT l.*,
                cl.nom AS client_nom, cl.prenom AS client_prenom,
                c.numero AS chambre_numero,
                h.nom AS hotel_nom, h.adresse AS hotel_adresse,
                e.nom AS employe_nom, e.prenom AS employe_prenom
            FROM Location l
            JOIN Client cl ON l.client_id = cl.id
            JOIN Chambre c ON l.chambre_id = c.id
            JOIN Hotel h ON c.hotel_id = h.id
            JOIN Employe e ON l.employe_id = e.id
            WHERE l.id = $1
        `, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Location non trouvée' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST créer une location directe (sans réservation)
router.post('/', async (req, res) => {
    try {
        const { client_id, chambre_id, employe_id, date_debut, date_fin } = req.body;

        // Vérifier disponibilité
        const conflit = await pool.query(`
            SELECT id FROM Location
            WHERE chambre_id = $1
            AND date_debut < $3
            AND date_fin > $2
        `, [chambre_id, date_debut, date_fin]);

        if (conflit.rows.length > 0)
            return res.status(400).json({ error: 'Chambre non disponible pour ces dates' });

        const result = await pool.query(`
            INSERT INTO Location (client_id, chambre_id, employe_id, date_debut, date_fin)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [client_id, chambre_id, employe_id, date_debut, date_fin]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE supprimer une location
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM Location WHERE id=$1 RETURNING *', [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Location non trouvée' });

        res.json({ message: 'Location supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;