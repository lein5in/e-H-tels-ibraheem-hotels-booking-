import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET toutes les réservations
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*,
                cl.nom AS client_nom, cl.prenom AS client_prenom,
                c.numero AS chambre_numero,
                h.id AS hotel_id,
                h.nom AS hotel_nom
            FROM Reservation r
            JOIN Client cl ON r.client_id = cl.id
            JOIN Chambre c ON r.chambre_id = c.id
            JOIN Hotel h ON c.hotel_id = h.id
            ORDER BY r.date_reservation DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET une réservation par id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT r.*,
                cl.nom AS client_nom, cl.prenom AS client_prenom,
                c.numero AS chambre_numero,
                h.id AS hotel_id,
                h.nom AS hotel_nom, h.adresse AS hotel_adresse
            FROM Reservation r
            JOIN Client cl ON r.client_id = cl.id
            JOIN Chambre c ON r.chambre_id = c.id
            JOIN Hotel h ON c.hotel_id = h.id
            WHERE r.id = $1
        `, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Réservation non trouvée' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST créer une réservation
router.post('/', async (req, res) => {
    try {
        const { client_id, chambre_id, date_debut, date_fin } = req.body;

        // Vérifier disponibilité
        const conflit = await pool.query(`
            SELECT id FROM Reservation
            WHERE chambre_id = $1
            AND statut = 'active'
            AND date_debut < $3
            AND date_fin > $2
        `, [chambre_id, date_debut, date_fin]);

        if (conflit.rows.length > 0)
            return res.status(400).json({ error: 'Chambre non disponible pour ces dates' });

        const result = await pool.query(`
            INSERT INTO Reservation (client_id, chambre_id, date_debut, date_fin)
            VALUES ($1, $2, $3, $4) RETURNING *
        `, [client_id, chambre_id, date_debut, date_fin]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT convertir une réservation en location
router.put('/:id/convertir', async (req, res) => {
    try {
        const { id } = req.params;
        const { employe_id } = req.body;

        const reservation = await pool.query(
            'SELECT * FROM Reservation WHERE id = $1 AND statut = $2',
            [id, 'active']
        );

        if (reservation.rows.length === 0)
            return res.status(404).json({ error: 'Réservation active non trouvée' });

        const r = reservation.rows[0];

        // Créer la location (le trigger met à jour le statut automatiquement)
        const location = await pool.query(`
            INSERT INTO Location (client_id, chambre_id, employe_id, reservation_id, date_debut, date_fin)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `, [r.client_id, r.chambre_id, employe_id, r.id, r.date_debut, r.date_fin]);

        res.status(201).json({
            message: 'Réservation convertie en location avec succès',
            location: location.rows[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT annuler une réservation
router.put('/:id/annuler', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            UPDATE Reservation SET statut = 'annulee'
            WHERE id = $1 AND statut = 'active' RETURNING *
        `, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Réservation active non trouvée' });

        res.json({ message: 'Réservation annulée avec succès', reservation: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE supprimer une réservation
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM Reservation WHERE id=$1 RETURNING *', [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Réservation non trouvée' });

        res.json({ message: 'Réservation supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;