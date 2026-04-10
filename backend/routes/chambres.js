import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET chambres disponibles avec filtres
router.get('/disponibles', async (req, res) => {
    try {
        const {
            date_debut,
            date_fin,
            capacite,
            prix_max,
            chaine_id,
            categorie,
            vue,
            wifi,
            tv,
            climatisation
        } = req.query;

        let conditions = [];
        let params = [];
        let i = 1;

        // Filtre disponibilité par dates
        if (date_debut && date_fin) {
            conditions.push(`c.id NOT IN (
                SELECT chambre_id FROM Reservation
                WHERE statut = 'active'
                AND date_debut < $${i+1} AND date_fin > $${i}
            ) AND c.id NOT IN (
                SELECT chambre_id FROM Location
                WHERE date_debut < $${i+1} AND date_fin > $${i}
            )`);
            params.push(date_debut, date_fin);
            i += 2;
        }

        if (capacite) {
            conditions.push(`c.capacite >= $${i}`);
            params.push(parseInt(capacite));
            i++;
        }
        if (prix_max) {
            conditions.push(`c.prix <= $${i}`);
            params.push(parseFloat(prix_max));
            i++;
        }
        if (chaine_id) {
            conditions.push(`h.chaine_id = $${i}`);
            params.push(parseInt(chaine_id));
            i++;
        }
        if (categorie) {
            conditions.push(`h.categorie = $${i}`);
            params.push(parseInt(categorie));
            i++;
        }
        if (vue) {
            conditions.push(`c.vue = $${i}`);
            params.push(vue);
            i++;
        }
        if (wifi === 'true') { conditions.push(`c.wifi = true`); }
        if (tv === 'true') { conditions.push(`c.tv = true`); }
        if (climatisation === 'true') { conditions.push(`c.climatisation = true`); }

        const whereClause = conditions.length > 0
            ? 'WHERE ' + conditions.join(' AND ')
            : '';

        const result = await pool.query(`
            SELECT c.*, h.nom AS hotel_nom, h.categorie, h.adresse,
                ch.nom AS chaine_nom, ch.id AS chaine_id
            FROM Chambre c
            JOIN Hotel h ON c.hotel_id = h.id
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            ${whereClause}
            ORDER BY c.prix ASC
        `, params);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET toutes les chambres
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.*, h.nom AS hotel_nom, ch.nom AS chaine_nom
            FROM Chambre c
            JOIN Hotel h ON c.hotel_id = h.id
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            ORDER BY h.nom, c.numero
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET une chambre par id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT c.*, h.nom AS hotel_nom, h.adresse AS hotel_adresse,
                ch.nom AS chaine_nom
            FROM Chambre c
            JOIN Hotel h ON c.hotel_id = h.id
            JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
            WHERE c.id = $1
        `, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Chambre non trouvée' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST créer une chambre
router.post('/', async (req, res) => {
    try {
        const {
            hotel_id, numero, prix, capacite, vue,
            superficie, tv, climatisation, frigo,
            wifi, lit_extensible, etat
        } = req.body;

        const result = await pool.query(`
            INSERT INTO Chambre (hotel_id, numero, prix, capacite, vue,
                superficie, tv, climatisation, frigo, wifi, lit_extensible, etat)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *
        `, [hotel_id, numero, prix, capacite, vue,
            superficie, tv, climatisation, frigo, wifi, lit_extensible, etat]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT modifier une chambre
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            prix, capacite, vue, superficie, tv,
            climatisation, frigo, wifi, lit_extensible, etat
        } = req.body;

        const result = await pool.query(`
            UPDATE Chambre SET prix=$1, capacite=$2, vue=$3, superficie=$4,
                tv=$5, climatisation=$6, frigo=$7, wifi=$8,
                lit_extensible=$9, etat=$10
            WHERE id=$11 RETURNING *
        `, [prix, capacite, vue, superficie, tv,
            climatisation, frigo, wifi, lit_extensible, etat, id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Chambre non trouvée' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE supprimer une chambre
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM Chambre WHERE id=$1 RETURNING *', [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Chambre non trouvée' });

        res.json({ message: 'Chambre supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;