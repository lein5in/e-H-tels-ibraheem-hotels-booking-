-- e-Hôtels - CSI2532 - Université d'Ottawa
-- DDL - Création de la base de données

-- Suppression des tables si elles existent déjà (ordre inverse des dépendances)
DROP TABLE IF EXISTS Location CASCADE;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS Chambre CASCADE;
DROP TABLE IF EXISTS Employe CASCADE;
DROP TABLE IF EXISTS Hotel_Email CASCADE;
DROP TABLE IF EXISTS Hotel_Telephone CASCADE;
DROP TABLE IF EXISTS Hotel CASCADE;
DROP TABLE IF EXISTS Chaine_Email CASCADE;
DROP TABLE IF EXISTS Chaine_Telephone CASCADE;
DROP TABLE IF EXISTS ChaineHoteliere CASCADE;
DROP TABLE IF EXISTS Client CASCADE;

-- Table ChaineHoteliere
CREATE TABLE ChaineHoteliere (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse_siege VARCHAR(255) NOT NULL
);

-- Table Chaine_Email
CREATE TABLE Chaine_Email (
    id SERIAL PRIMARY KEY,
    chaine_id INTEGER NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT fk_chaine_email FOREIGN KEY (chaine_id) REFERENCES ChaineHoteliere(id) ON DELETE CASCADE
);

-- Table Chaine_Telephone
CREATE TABLE Chaine_Telephone (
    id SERIAL PRIMARY KEY,
    chaine_id INTEGER NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    CONSTRAINT fk_chaine_telephone FOREIGN KEY (chaine_id) REFERENCES ChaineHoteliere(id) ON DELETE CASCADE
);

-- Table Hotel
CREATE TABLE Hotel (
    id SERIAL PRIMARY KEY,
    chaine_id INTEGER NOT NULL,
    nom VARCHAR(100) NOT NULL,
    categorie INTEGER NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    gestionnaire_id INTEGER,
    CONSTRAINT fk_hotel_chaine FOREIGN KEY (chaine_id) REFERENCES ChaineHoteliere(id) ON DELETE CASCADE,
    CONSTRAINT check_categorie CHECK (categorie BETWEEN 1 AND 5)
);

-- Table Hotel_Email
CREATE TABLE Hotel_Email (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT fk_hotel_email FOREIGN KEY (hotel_id) REFERENCES Hotel(id) ON DELETE CASCADE
);

-- Table Hotel_Telephone
CREATE TABLE Hotel_Telephone (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    CONSTRAINT fk_hotel_telephone FOREIGN KEY (hotel_id) REFERENCES Hotel(id) ON DELETE CASCADE
);

-- Table Employe
CREATE TABLE Employe (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    nas VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT fk_employe_hotel FOREIGN KEY (hotel_id) REFERENCES Hotel(id) ON DELETE CASCADE
);

-- Ajout de la contrainte gestionnaire après création de Employe
ALTER TABLE Hotel
    ADD CONSTRAINT fk_hotel_gestionnaire FOREIGN KEY (gestionnaire_id) REFERENCES Employe(id) ON DELETE SET NULL;

-- Contrainte : le gestionnaire doit appartenir à l'hôtel
CREATE OR REPLACE FUNCTION check_gestionnaire_hotel()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.gestionnaire_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM Employe
            WHERE id = NEW.gestionnaire_id
            AND hotel_id = NEW.id
            AND role = 'gestionnaire'
        ) THEN
            RAISE EXCEPTION 'Le gestionnaire doit être un employé de cet hôtel avec le rôle gestionnaire';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_gestionnaire
    BEFORE INSERT OR UPDATE ON Hotel
    FOR EACH ROW
    EXECUTE FUNCTION check_gestionnaire_hotel();

-- Table Chambre
CREATE TABLE Chambre (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    numero VARCHAR(10) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    capacite INTEGER NOT NULL,
    vue VARCHAR(50),
    superficie DECIMAL(6,2),
    tv BOOLEAN DEFAULT FALSE,
    climatisation BOOLEAN DEFAULT FALSE,
    frigo BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    lit_extensible BOOLEAN DEFAULT FALSE,
    etat VARCHAR(50) DEFAULT 'bon état',
    CONSTRAINT fk_chambre_hotel FOREIGN KEY (hotel_id) REFERENCES Hotel(id) ON DELETE CASCADE,
    CONSTRAINT check_prix CHECK (prix > 0),
    CONSTRAINT check_capacite CHECK (capacite > 0),
    CONSTRAINT check_superficie CHECK (superficie IS NULL OR superficie > 0)
);

-- Table Client
CREATE TABLE Client (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    nas VARCHAR(20) UNIQUE NOT NULL,
    date_inscription DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Table Reservation
CREATE TABLE Reservation (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    chambre_id INTEGER NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    date_reservation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(20) NOT NULL DEFAULT 'active',
    chambre_prix_snapshot DECIMAL(10,2),
    hotel_nom_snapshot VARCHAR(100),
    hotel_adresse_snapshot VARCHAR(255),
    CONSTRAINT fk_reservation_client FOREIGN KEY (client_id) REFERENCES Client(id),
    CONSTRAINT fk_reservation_chambre FOREIGN KEY (chambre_id) REFERENCES Chambre(id),
    CONSTRAINT check_statut CHECK (statut IN ('active', 'annulee', 'convertie')),
    CONSTRAINT check_dates_reservation CHECK (date_fin > date_debut)
);

-- Table Location
CREATE TABLE Location (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    chambre_id INTEGER NOT NULL,
    employe_id INTEGER NOT NULL,
    reservation_id INTEGER,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    date_location TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    chambre_prix_snapshot DECIMAL(10,2),
    hotel_nom_snapshot VARCHAR(100),
    hotel_adresse_snapshot VARCHAR(255),
    CONSTRAINT fk_location_client FOREIGN KEY (client_id) REFERENCES Client(id),
    CONSTRAINT fk_location_chambre FOREIGN KEY (chambre_id) REFERENCES Chambre(id),
    CONSTRAINT fk_location_employe FOREIGN KEY (employe_id) REFERENCES Employe(id),
    CONSTRAINT fk_location_reservation FOREIGN KEY (reservation_id) REFERENCES Reservation(id) ON DELETE SET NULL,
    CONSTRAINT check_dates_location CHECK (date_fin > date_debut)
);