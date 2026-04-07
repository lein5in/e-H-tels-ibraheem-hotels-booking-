-- e-Hôtels - CSI2532 - Université d'Ottawa
-- Requêtes SQL

-- ============================================================
-- REQUÊTE 1 : Recherche de chambres disponibles avec filtres
-- Trouve toutes les chambres disponibles pour des dates données,
-- avec filtre optionnel sur capacité, prix, chaîne et catégorie
-- ============================================================
SELECT
    ch.nom AS chaine,
    h.nom AS hotel,
    h.categorie,
    h.adresse AS zone,
    c.numero,
    c.prix,
    c.capacite,
    c.vue,
    c.superficie,
    c.tv,
    c.climatisation,
    c.wifi,
    c.lit_extensible
FROM Chambre c
JOIN Hotel h ON c.hotel_id = h.id
JOIN ChaineHoteliere ch ON h.chaine_id = ch.id
WHERE c.id NOT IN (
    SELECT chambre_id FROM Reservation
    WHERE statut = 'active'
    AND date_debut < '2026-04-20'
    AND date_fin > '2026-04-15'
)
AND c.id NOT IN (
    SELECT chambre_id FROM Location
    WHERE date_debut < '2026-04-20'
    AND date_fin > '2026-04-15'
)
AND c.capacite >= 2
AND c.prix <= 400.00
ORDER BY c.prix ASC;

-- ============================================================
-- REQUÊTE 2 : Nombre de chambres disponibles par zone
-- ============================================================
SELECT * FROM vue_chambres_disponibles_par_zone;

-- ============================================================
-- REQUÊTE 3 : Historique complet des locations d'un client
-- ============================================================
SELECT
    cl.prenom || ' ' || cl.nom AS client,
    h.nom AS hotel,
    h.adresse,
    c.numero AS chambre,
    l.date_debut,
    l.date_fin,
    l.date_fin - l.date_debut AS nb_nuits,
    l.chambre_prix_snapshot AS prix_par_nuit,
    (l.date_fin - l.date_debut) * l.chambre_prix_snapshot AS total,
    CASE WHEN l.reservation_id IS NOT NULL THEN 'Via réservation' ELSE 'Location directe' END AS type_location
FROM Location l
JOIN Client cl ON l.client_id = cl.id
JOIN Chambre c ON l.chambre_id = c.id
JOIN Hotel h ON c.hotel_id = h.id
WHERE cl.id = 4
ORDER BY l.date_debut DESC;

-- ============================================================
-- REQUÊTE 4 : Capacité totale par hôtel avec statistiques
-- ============================================================
SELECT * FROM vue_capacite_totale_par_hotel
WHERE categorie >= 3
ORDER BY prix_moyen DESC;