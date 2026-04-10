import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET tous les clients
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM Client ORDER BY nom, prenom'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET un client par id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM Client WHERE id = $1', [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Client non trouvé' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET historique des réservations d'un client
router.get('/:id/reservations', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT r.*, c.numero AS chambre_numero,
                h.nom AS hotel_nom, h.adresse AS hotel_adresse
            FROM Reservation r
            JOIN Chambre c ON r.chambre_id = c.id
            JOIN Hotel h ON c.hotel_id = h.id
            WHERE r.client_id = $1
            ORDER BY r.date_reservation DESC
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET historique des locations d'un client
router.get('/:id/locations', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT l.*, c.numero AS chambre_numero,
                h.nom AS hotel_nom, h.adresse AS hotel_adresse
            FROM Location l
            JOIN Chambre c ON l.chambre_id = c.id
            JOIN Hotel h ON c.hotel_id = h.id
            WHERE l.client_id = $1
            ORDER BY l.date_location DESC
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST créer un client
router.post('/', async (req, res) => {
    try {
        const { nom, prenom, adresse, nas } = req.body;
        const result = await pool.query(`
            INSERT INTO Client (nom, prenom, adresse, nas, date_inscription)
            VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *
        `, [nom, prenom, adresse, nas]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT modifier un client
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, adresse } = req.body;
        const result = await pool.query(`
            UPDATE Client SET nom=$1, prenom=$2, adresse=$3
            WHERE id=$4 RETURNING *
        `, [nom, prenom, adresse, id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Client non trouvé' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE supprimer un client
// On annule d'abord les réservations actives, puis on dissocie les locations
router.delete('/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const { id } = req.params;
        await client.query('BEGIN');

        // 1. Annuler les réservations actives du client
        await client.query(`
            UPDATE Reservation SET statut = 'annulee'
            WHERE client_id = $1 AND statut = 'active'
        `, [id]);

        // 2. Dissocier les locations (mettre client_id à null n'est pas possible à cause FK)
        //    On supprime les locations du client (l'historique chambre/hotel est dans les snapshots)
        await client.query(
            'DELETE FROM Location WHERE client_id = $1', [id]
        );

        // 3. Supprimer les réservations du client
        await client.query(
            'DELETE FROM Reservation WHERE client_id = $1', [id]
        );

        // 4. Supprimer le client
        const result = await client.query(
            'DELETE FROM Client WHERE id=$1 RETURNING *', [id]
        );

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Client non trouvé' });
        }

        await client.query('COMMIT');
        res.json({ message: 'Client supprimé avec succès' });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

export default router;