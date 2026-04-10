import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET tous les hôtels
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT h.*, ch.nom AS chaine_nom,
                e.nom AS gestionnaire_nom, e.prenom AS gestionnaire_prenom
            FROM Hotel h
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            LEFT JOIN Employe e ON h.gestionnaire_id = e.id
            ORDER BY ch.nom, h.nom
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ⚠️ IMPORTANT : cette route doit être AVANT /:id
// GET hôtels par chaîne
router.get('/chaine/:chaine_id', async (req, res) => {
    try {
        const { chaine_id } = req.params;
        const result = await pool.query(`
            SELECT h.*, ch.nom AS chaine_nom
            FROM Hotel h
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            WHERE h.chaine_id = $1
            ORDER BY h.nom
        `, [chaine_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET un hôtel par id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await pool.query(`
            SELECT h.*, ch.nom AS chaine_nom,
                e.nom AS gestionnaire_nom, e.prenom AS gestionnaire_prenom
            FROM Hotel h
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            LEFT JOIN Employe e ON h.gestionnaire_id = e.id
            WHERE h.id = $1
        `, [id]);

        if (hotel.rows.length === 0)
            return res.status(404).json({ error: 'Hôtel non trouvé' });

        const emails = await pool.query(
            'SELECT email FROM Hotel_Email WHERE hotel_id = $1', [id]
        );
        const telephones = await pool.query(
            'SELECT telephone FROM Hotel_Telephone WHERE hotel_id = $1', [id]
        );

        res.json({
            ...hotel.rows[0],
            emails: emails.rows.map(r => r.email),
            telephones: telephones.rows.map(r => r.telephone)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST créer un hôtel
router.post('/', async (req, res) => {
    try {
        const { chaine_id, nom, categorie, adresse, emails, telephones } = req.body;
        const result = await pool.query(`
            INSERT INTO Hotel (chaine_id, nom, categorie, adresse)
            VALUES ($1, $2, $3, $4) RETURNING *
        `, [chaine_id, nom, categorie, adresse]);

        const hotel = result.rows[0];

        if (emails?.length) {
            for (const email of emails) {
                await pool.query(
                    'INSERT INTO Hotel_Email (hotel_id, email) VALUES ($1, $2)',
                    [hotel.id, email]
                );
            }
        }
        if (telephones?.length) {
            for (const telephone of telephones) {
                await pool.query(
                    'INSERT INTO Hotel_Telephone (hotel_id, telephone) VALUES ($1, $2)',
                    [hotel.id, telephone]
                );
            }
        }

        res.status(201).json(hotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT modifier un hôtel
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, categorie, adresse, gestionnaire_id } = req.body;
        const result = await pool.query(`
            UPDATE Hotel SET nom=$1, categorie=$2, adresse=$3, gestionnaire_id=$4
            WHERE id=$5 RETURNING *
        `, [nom, categorie, adresse, gestionnaire_id, id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Hôtel non trouvé' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE supprimer un hôtel
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM Hotel WHERE id=$1 RETURNING *', [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Hôtel non trouvé' });

        res.json({ message: 'Hôtel supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;