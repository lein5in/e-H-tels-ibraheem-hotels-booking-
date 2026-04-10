-- e-Hôtels - CSI2532 - Université d'Ottawa
-- Triggers


-- TRIGGER 1 : Remplissage automatique des snapshots
-- lors d'une insertion dans Reservation

CREATE OR REPLACE FUNCTION fill_reservation_snapshot()
RETURNS TRIGGER AS $$
DECLARE
    v_chambre_prix DECIMAL(10,2);
    v_hotel_nom VARCHAR(100);
    v_hotel_adresse VARCHAR(255);
BEGIN
    SELECT c.prix, h.nom, h.adresse
    INTO v_chambre_prix, v_hotel_nom, v_hotel_adresse
    FROM Chambre c
    JOIN Hotel h ON c.hotel_id = h.id
    WHERE c.id = NEW.chambre_id;

    NEW.chambre_prix_snapshot := v_chambre_prix;
    NEW.hotel_nom_snapshot := v_hotel_nom;
    NEW.hotel_adresse_snapshot := v_hotel_adresse;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_fill_reservation_snapshot
    BEFORE INSERT ON Reservation
    FOR EACH ROW
    EXECUTE FUNCTION fill_reservation_snapshot();


-- TRIGGER 2 : Lors de la conversion d'une réservation
-- en location, mettre à jour le statut de la réservation
-- automatiquement et remplir les snapshots de la location

CREATE OR REPLACE FUNCTION fill_location_snapshot()
RETURNS TRIGGER AS $$
DECLARE
    v_chambre_prix DECIMAL(10,2);
    v_hotel_nom VARCHAR(100);
    v_hotel_adresse VARCHAR(255);
BEGIN
    SELECT c.prix, h.nom, h.adresse
    INTO v_chambre_prix, v_hotel_nom, v_hotel_adresse
    FROM Chambre c
    JOIN Hotel h ON c.hotel_id = h.id
    WHERE c.id = NEW.chambre_id;

    NEW.chambre_prix_snapshot := v_chambre_prix;
    NEW.hotel_nom_snapshot := v_hotel_nom;
    NEW.hotel_adresse_snapshot := v_hotel_adresse;

    -- Si la location vient d'une réservation, on met à jour son statut
    IF NEW.reservation_id IS NOT NULL THEN
        UPDATE Reservation
        SET statut = 'convertie'
        WHERE id = NEW.reservation_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_fill_location_snapshot
    BEFORE INSERT ON Location
    FOR EACH ROW
    EXECUTE FUNCTION fill_location_snapshot();