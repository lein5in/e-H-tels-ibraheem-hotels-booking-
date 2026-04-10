-- e-Hôtels - CSI2532 - Université d'Ottawa
-- Vues SQL


-- VUE 1 : Nombre de chambres disponibles par zone

CREATE OR REPLACE VIEW vue_chambres_disponibles_par_zone AS
SELECT
    h.adresse AS zone,
    h.nom AS hotel,
    COUNT(c.id) AS total_chambres,
    COUNT(c.id) - COUNT(r.id) AS chambres_disponibles
FROM Hotel h
JOIN Chambre c ON c.hotel_id = h.id
LEFT JOIN Reservation r ON r.chambre_id = c.id
    AND r.statut = 'active'
    AND r.date_debut <= CURRENT_DATE
    AND r.date_fin >= CURRENT_DATE
GROUP BY h.id, h.adresse, h.nom
ORDER BY h.adresse;


-- VUE 2 : Capacité totale des chambres d'un hôtel

CREATE OR REPLACE VIEW vue_capacite_totale_par_hotel AS
SELECT
    h.id AS hotel_id,
    h.nom AS hotel,
    ch.nom AS chaine,
    h.adresse,
    h.categorie,
    COUNT(c.id) AS nombre_chambres,
    SUM(c.capacite) AS capacite_totale_personnes,
    SUM(c.superficie) AS superficie_totale_m2,
    ROUND(AVG(c.prix), 2) AS prix_moyen
FROM Hotel h
JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
JOIN Chambre c ON c.hotel_id = h.id
GROUP BY h.id, h.nom, ch.nom, h.adresse, h.categorie
ORDER BY capacite_totale_personnes DESC;