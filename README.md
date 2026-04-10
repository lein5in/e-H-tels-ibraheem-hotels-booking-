# Séjourly — Application de réservation hôtelière

**Cours** : CSI2532 — Bases de données I  
**Université** : Université d'Ottawa — Faculté de génie  
**Session** : Hiver 2026  
**Étudiant** : Habib Ibraheem Toure  
**Numéro étudiant** : 300439813  

---

## Mise en contexte

Séjourly est une application web de réservation hôtelière développée dans le cadre du projet de session du cours CSI2532. Elle simule un système permettant à cinq grandes chaînes hôtelières de gérer leurs établissements, leurs chambres, leurs clients et leurs réservations. L'application offre une interface complète pour la recherche de chambres disponibles, la création de réservations et de locations, ainsi que la gestion administrative des données.

---

## Technologies utilisées

- **Base de données** : PostgreSQL 18
- **Backend** : Node.js avec Express (ES Modules), port 3000
- **Frontend** : React avec Vite et React Router, port 5173
- **Client HTTP** : Axios

---

## Structure du projet

```
e-H-tels-ibraheem-hotels-booking-/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── chambres.js
│   │   ├── clients.js
│   │   ├── employes.js
│   │   ├── hotels.js
│   │   ├── locations.js
│   │   └── reservations.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── database/
│   ├── ddl.sql
│   ├── data.sql
│   ├── triggers.sql
│   ├── views.sql
│   ├── indexes.sql
│   └── queries.sql
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ChambreCard.jsx
│   │   │   ├── FiltresSidebar.jsx
│   │   │   ├── ReservationModal.jsx
│   │   │   └── LocationModal.jsx
│   │   ├── pages/
│   │   │   ├── Recherche.jsx
│   │   │   ├── DetailChambre.jsx
│   │   │   ├── Reservations.jsx
│   │   │   └── Gestion.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Fonctionnalités principales

**Recherche**
- Barre de recherche avec filtres combinés : dates, capacité, prix maximum, chaîne hôtelière, catégorie, vue, WiFi, télévision, climatisation
- Affichage des chambres disponibles avec mise à jour des résultats
- Page de détail par chambre avec image, commodités, et carte de réservation

**Réservations et locations**
- Création de réservations par un client
- Location directe sans réservation (par un employé)
- Conversion d'une réservation en location lors du check-in
- Annulation de réservation
- Tableau de bord avec compteurs par statut (actives, converties, annulées)

**Gestion administrative**
- CRUD complet pour les clients, employés, hôtels et chambres
- Gestion des rôles d'employés, dont le gestionnaire d'hôtel
- Archivage des réservations et locations même après suppression d'un client ou d'une chambre

---

## Base de données

**Contenu**
- 5 chaînes hôtelières
- 40 hôtels (8 par chaîne), catégories 2 à 5 étoiles
- 120 employés (3 par hôtel dont 1 gestionnaire)
- 200 chambres (5 par hôtel, capacités variées)
- Clients, réservations et locations de démonstration

**Objets SQL implémentés**
- 11 tables avec clés primaires, clés étrangères et contraintes de domaine
- 2 triggers : conversion automatique réservation vers location, snapshots automatiques
- 2 vues : nombre de chambres disponibles par zone, capacité totale par hôtel
- 3 index : sur hotel_id, disponibilité, chaîne et catégorie
- 4 requêtes SQL de démonstration dans `queries.sql`

---

## Guide d'installation

### Prérequis

- Node.js v18 ou supérieur
- PostgreSQL 18
- npm

### 1. Cloner le dépôt

```bash
git clone https://github.com/lein5in/e-H-tels-ibraheem-hotels-booking-.git
cd e-H-tels-ibraheem-hotels-booking-
```

### 2. Configurer la base de données

```bash
psql -U postgres -c "CREATE DATABASE ehotels ENCODING 'UTF8';"
psql -U postgres -d ehotels -f database/ddl.sql
psql -U postgres -d ehotels -f database/data.sql
psql -U postgres -d ehotels -f database/triggers.sql
psql -U postgres -d ehotels -f database/views.sql
psql -U postgres -d ehotels -f database/indexes.sql
```

### 3. Configurer le backend

```bash
cd backend
npm install
```

Créer le fichier `.env` dans le dossier `backend/` :

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ehotels
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
PORT=3000
```

Démarrer le serveur :

```bash
npm run dev
```

Le backend sera accessible sur `http://localhost:3000`.

### 4. Configurer le frontend

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

---

## Routes API

| Ressource       | Méthodes disponibles                                              |
|-----------------|-------------------------------------------------------------------|
| /api/hotels     | GET, GET /:id, GET /chaine/:id, POST, PUT /:id, DELETE /:id      |
| /api/chambres   | GET, GET /disponibles, GET /:id, POST, PUT /:id, DELETE /:id     |
| /api/clients    | GET, GET /:id, GET /:id/reservations, POST, PUT /:id, DELETE /:id|
| /api/employes   | GET, GET /hotel/:id, GET /:id, POST, PUT /:id, DELETE /:id       |
| /api/reservations | GET, GET /:id, POST, PUT /:id/convertir, PUT /:id/annuler, DELETE /:id |
| /api/locations  | GET, GET /:id, POST, DELETE /:id                                  |

---

## Dépôt GitHub

Le code source complet est disponible sur GitHub :  
[https://github.com/lein5in/e-H-tels-ibraheem-hotels-booking-]