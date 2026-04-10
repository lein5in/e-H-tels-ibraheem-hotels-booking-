-- e-Hôtels - CSI2532 - Université d'Ottawa
-- Index


-- INDEX 1 : Sur Chambre(hotel_id)
-- Justification : La recherche de chambres par hôtel est
-- l'opération la plus fréquente de l'application. Cet index
-- accélère les jointures entre Chambre et Hotel.

CREATE INDEX idx_chambre_hotel_id ON Chambre(hotel_id);


-- INDEX 2 : Sur Reservation(chambre_id, statut, date_debut, date_fin)
-- Justification : La vérification de disponibilité d'une chambre
-- pour des dates données est critique. Cet index composite
-- couvre exactement cette requête fréquente.

CREATE INDEX idx_reservation_disponibilite ON Reservation(chambre_id, statut, date_debut, date_fin);


-- INDEX 3 : Sur Hotel(chaine_id, categorie)
-- Justification : Les filtres de recherche par chaîne et
-- catégorie d'étoiles sont très utilisés dans l'interface.
-- Cet index composite accélère ces recherches combinées.

CREATE INDEX idx_hotel_chaine_categorie ON Hotel(chaine_id, categorie);