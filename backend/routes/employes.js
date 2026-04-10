// backend/routes/employes.js
import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET tous les employés
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, h.nom AS hotel_nom, ch.nom AS chaine_nom
            FROM Employe e
            JOIN Hotel h ON e.hotel_id = h.id
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            ORDER BY h.nom, e.nom
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ⚠️ IMPORTANT : cette route doit être AVANT /:id sinon Express croit que "hotel" est un id
// GET employés par hôtel
router.get('/hotel/:hotel_id', async (req, res) => {
    try {
        const { hotel_id } = req.params;
        const result = await pool.query(`
            SELECT * FROM Employe
            WHERE hotel_id = $1
            ORDER BY role, nom
        `, [hotel_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET un employé par id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT e.*, h.nom AS hotel_nom, ch.nom AS chaine_nom
            FROM Employe e
            JOIN Hotel h ON e.hotel_id = h.id
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            WHERE e.id = $1
        `, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Employé non trouvé' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST créer un employé
router.post('/', async (req, res) => {
    try {
        const { hotel_id, nom, prenom, adresse, nas, role } = req.body;
        const result = await pool.query(`
            INSERT INTO Employe (hotel_id, nom, prenom, adresse, nas, role)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `, [hotel_id, nom, prenom, adresse, nas, role]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT modifier un employé
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, adresse, role } = req.body;
        const result = await pool.query(`
            UPDATE Employe SET nom=$1, prenom=$2, adresse=$3, role=$4
            WHERE id=$5 RETURNING *
        `, [nom, prenom, adresse, role, id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Employé non trouvé' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE supprimer un employé
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM Employe WHERE id=$1 RETURNING *', [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Employé non trouvé' });

        res.json({ message: 'Employé supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;