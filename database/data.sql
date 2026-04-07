-- e-Hôtels - CSI2532 - Université d'Ottawa
-- Insertion des données

-- Désactiver le trigger temporairement pour l'insertion initiale
SET session_replication_role = replica;

-- ============================================================
-- CHAÎNES HÔTELIÈRES
-- ============================================================
INSERT INTO ChaineHoteliere (nom, adresse_siege) VALUES
('Marriott International', '7750 Wisconsin Ave, Bethesda, MD, États-Unis'),
('Hilton Worldwide', '7930 Jones Branch Dr, McLean, VA, États-Unis'),
('InterContinental Hotels Group', '3 Ravinia Dr, Atlanta, GA, États-Unis'),
('Wyndham Hotels & Resorts', '22 Sylvan Way, Parsippany, NJ, États-Unis'),
('Best Western Hotels', '6201 N 24th Pkwy, Phoenix, AZ, États-Unis');

-- ============================================================
-- EMAILS ET TÉLÉPHONES DES CHAÎNES
-- ============================================================
INSERT INTO Chaine_Email (chaine_id, email) VALUES
(1, 'contact@marriott.com'), (1, 'support@marriott.com'),
(2, 'contact@hilton.com'), (2, 'support@hilton.com'),
(3, 'contact@ihg.com'), (3, 'support@ihg.com'),
(4, 'contact@wyndham.com'), (4, 'support@wyndham.com'),
(5, 'contact@bestwestern.com'), (5, 'support@bestwestern.com');

INSERT INTO Chaine_Telephone (chaine_id, telephone) VALUES
(1, '+1-800-627-7468'), (1, '+1-301-380-3000'),
(2, '+1-800-445-8667'), (2, '+1-703-883-1000'),
(3, '+1-800-439-4745'), (3, '+1-770-604-2000'),
(4, '+1-800-466-1589'), (4, '+1-973-753-6000'),
(5, '+1-800-780-7234'), (5, '+1-602-957-4200');

-- ============================================================
-- HÔTELS (8 par chaîne = 40 hôtels)
-- ============================================================
INSERT INTO Hotel (chaine_id, nom, categorie, adresse) VALUES
-- Marriott (chaine_id = 1)
(1, 'Marriott Toronto Downtown', 5, '525 Bay St, Toronto, ON, Canada'),
(1, 'Marriott Ottawa Centre', 4, '100 Kent St, Ottawa, ON, Canada'),
(1, 'Marriott Montreal Airport', 4, '9000 Côte-de-Liesse, Montréal, QC, Canada'),
(1, 'Marriott Vancouver Pinnacle', 5, '1128 W Hastings St, Vancouver, BC, Canada'),
(1, 'Marriott Calgary', 3, '110 9th Ave SE, Calgary, AB, Canada'),
(1, 'Marriott Quebec City', 4, '850 Place d Youville, Québec, QC, Canada'),
(1, 'Marriott Ottawa West', 3, '1199 Joseph Cyr St, Ottawa, ON, Canada'),
(1, 'Marriott Edmonton', 3, '10135 100th St, Edmonton, AB, Canada'),
-- Hilton (chaine_id = 2)
(2, 'Hilton Toronto', 5, '145 Richmond St W, Toronto, ON, Canada'),
(2, 'Hilton Ottawa Airport', 4, '1000 Airport Pkwy, Ottawa, ON, Canada'),
(2, 'Hilton Montreal Bonaventure', 4, '900 De la Gauchetière W, Montréal, QC, Canada'),
(2, 'Hilton Vancouver Metrotown', 3, '6083 McKay Ave, Burnaby, BC, Canada'),
(2, 'Hilton Calgary Airport', 4, '2001 Airport Rd NE, Calgary, AB, Canada'),
(2, 'Hilton Quebec', 5, '1100 René-Lévesque Blvd E, Québec, QC, Canada'),
(2, 'Hilton Ottawa Downtown', 4, '150 Albert St, Ottawa, ON, Canada'),
(2, 'Hilton Winnipeg Airport', 3, '1800 Wellington Ave, Winnipeg, MB, Canada'),
-- IHG (chaine_id = 3)
(3, 'InterContinental Toronto', 5, '220 Bloor St W, Toronto, ON, Canada'),
(3, 'Holiday Inn Ottawa East', 3, '1199 Joseph Cyr St, Ottawa, ON, Canada'),
(3, 'InterContinental Montreal', 5, '360 Saint-Antoine St W, Montréal, QC, Canada'),
(3, 'Holiday Inn Vancouver', 3, '711 W Broadway, Vancouver, BC, Canada'),
(3, 'Holiday Inn Calgary', 3, '1020 8th Ave SW, Calgary, AB, Canada'),
(3, 'InterContinental Quebec', 4, '2700 Laurier Blvd, Québec, QC, Canada'),
(3, 'Holiday Inn Ottawa West', 2, '1151 Colonel By Dr, Ottawa, ON, Canada'),
(3, 'Holiday Inn Edmonton', 2, '4235 Gateway Blvd, Edmonton, AB, Canada'),
-- Wyndham (chaine_id = 4)
(4, 'Wyndham Toronto', 4, '89 Chestnut St, Toronto, ON, Canada'),
(4, 'Wyndham Ottawa', 3, '350 Dalhousie St, Ottawa, ON, Canada'),
(4, 'Wyndham Montreal', 4, '3625 Avenue du Parc, Montréal, QC, Canada'),
(4, 'Wyndham Vancouver', 3, '898 W Broadway, Vancouver, BC, Canada'),
(4, 'Wyndham Calgary Downtown', 4, '320 4th Ave SW, Calgary, AB, Canada'),
(4, 'Wyndham Quebec City', 3, '3031 Laurier Blvd, Québec, QC, Canada'),
(4, 'Wyndham Ottawa East', 2, '200 Coventry Rd, Ottawa, ON, Canada'),
(4, 'Wyndham Halifax', 3, '1990 Barrington St, Halifax, NS, Canada'),
-- Best Western (chaine_id = 5)
(5, 'Best Western Toronto', 3, '111 Lombard St, Toronto, ON, Canada'),
(5, 'Best Western Ottawa', 2, '1815 Rideau St, Ottawa, ON, Canada'),
(5, 'Best Western Montreal', 3, '3440 Avenue du Parc, Montréal, QC, Canada'),
(5, 'Best Western Vancouver', 2, '2075 Kingsway, Vancouver, BC, Canada'),
(5, 'Best Western Calgary', 3, '1330 8th St SW, Calgary, AB, Canada'),
(5, 'Best Western Quebec', 2, '3245 Hamel Blvd, Québec, QC, Canada'),
(5, 'Best Western Ottawa East', 2, '1274 Carling Ave, Ottawa, ON, Canada'),
(5, 'Best Western Edmonton', 2, '10209 100th Ave, Edmonton, AB, Canada');

-- ============================================================
-- EMAILS ET TÉLÉPHONES DES HÔTELS
-- ============================================================
INSERT INTO Hotel_Email (hotel_id, email) VALUES
(1, 'toronto@marriott.com'), (2, 'ottawa@marriott.com'),
(3, 'montreal@marriott.com'), (4, 'vancouver@marriott.com'),
(5, 'calgary@marriott.com'), (6, 'quebec@marriott.com'),
(7, 'ottawawest@marriott.com'), (8, 'edmonton@marriott.com'),
(9, 'toronto@hilton.com'), (10, 'ottawa@hilton.com'),
(11, 'montreal@hilton.com'), (12, 'vancouver@hilton.com'),
(13, 'calgary@hilton.com'), (14, 'quebec@hilton.com'),
(15, 'ottawadown@hilton.com'), (16, 'winnipeg@hilton.com'),
(17, 'toronto@ihg.com'), (18, 'ottawa@ihg.com'),
(19, 'montreal@ihg.com'), (20, 'vancouver@ihg.com'),
(21, 'calgary@ihg.com'), (22, 'quebec@ihg.com'),
(23, 'ottawawest@ihg.com'), (24, 'edmonton@ihg.com'),
(25, 'toronto@wyndham.com'), (26, 'ottawa@wyndham.com'),
(27, 'montreal@wyndham.com'), (28, 'vancouver@wyndham.com'),
(29, 'calgary@wyndham.com'), (30, 'quebec@wyndham.com'),
(31, 'ottawaeast@wyndham.com'), (32, 'halifax@wyndham.com'),
(33, 'toronto@bestwestern.com'), (34, 'ottawa@bestwestern.com'),
(35, 'montreal@bestwestern.com'), (36, 'vancouver@bestwestern.com'),
(37, 'calgary@bestwestern.com'), (38, 'quebec@bestwestern.com'),
(39, 'ottawaeast@bestwestern.com'), (40, 'edmonton@bestwestern.com');

INSERT INTO Hotel_Telephone (hotel_id, telephone) VALUES
(1, '+1-416-597-9200'), (2, '+1-613-238-1122'),
(3, '+1-514-875-4333'), (4, '+1-604-684-1128'),
(5, '+1-403-266-7331'), (6, '+1-418-694-4004'),
(7, '+1-613-726-1717'), (8, '+1-780-428-6611'),
(9, '+1-416-869-3456'), (10, '+1-613-523-5757'),
(11, '+1-514-878-2332'), (12, '+1-604-438-1200'),
(13, '+1-403-250-5000'), (14, '+1-418-647-2411'),
(15, '+1-613-238-6000'), (16, '+1-204-783-4500'),
(17, '+1-416-960-5200'), (18, '+1-613-234-3333'),
(19, '+1-514-987-9900'), (20, '+1-604-879-0511'),
(21, '+1-403-263-7600'), (22, '+1-418-653-4901'),
(23, '+1-613-722-7600'), (24, '+1-780-465-7931'),
(25, '+1-416-977-0707'), (26, '+1-613-789-7511'),
(27, '+1-514-849-1234'), (28, '+1-604-872-8661'),
(29, '+1-403-266-1101'), (30, '+1-418-658-8788'),
(31, '+1-613-744-2900'), (32, '+1-902-422-1391'),
(33, '+1-416-367-5555'), (34, '+1-613-789-1700'),
(35, '+1-514-849-6666'), (36, '+1-604-430-2828'),
(37, '+1-403-228-5000'), (38, '+1-418-872-5900'),
(39, '+1-613-728-1400'), (40, '+1-780-423-1650');

-- ============================================================
-- EMPLOYÉS (3 par hôtel dont 1 gestionnaire)
-- ============================================================
INSERT INTO Employe (hotel_id, nom, prenom, adresse, nas, role) VALUES
-- Hotel 1
(1,'Tremblay','Jean','100 Rue Maple, Toronto, ON','100-000-001','gestionnaire'),
(1,'Martin','Sophie','200 Rue Oak, Toronto, ON','100-000-002','réceptionniste'),
(1,'Bouchard','Marc','300 Rue Pine, Toronto, ON','100-000-003','réceptionniste'),
-- Hotel 2
(2,'Gagnon','Marie','100 Rue Elm, Ottawa, ON','100-000-004','gestionnaire'),
(2,'Roy','Pierre','200 Rue Cedar, Ottawa, ON','100-000-005','réceptionniste'),
(2,'Côté','Anne','300 Rue Birch, Ottawa, ON','100-000-006','réceptionniste'),
-- Hotel 3
(3,'Lavoie','Robert','100 Rue St-Denis, Montréal, QC','100-000-007','gestionnaire'),
(3,'Fortin','Julie','200 Rue St-Laurent, Montréal, QC','100-000-008','réceptionniste'),
(3,'Gagné','Michel','300 Rue Notre-Dame, Montréal, QC','100-000-009','réceptionniste'),
-- Hotel 4
(4,'Morin','Isabelle','100 Granville St, Vancouver, BC','100-000-010','gestionnaire'),
(4,'Lévesque','François','200 Robson St, Vancouver, BC','100-000-011','réceptionniste'),
(4,'Ouellet','Christine','300 Burrard St, Vancouver, BC','100-000-012','réceptionniste'),
-- Hotel 5
(5,'Bergeron','Daniel','100 Centre St, Calgary, AB','100-000-013','gestionnaire'),
(5,'Pelletier','Nathalie','200 MacLeod Trail, Calgary, AB','100-000-014','réceptionniste'),
(5,'Gosselin','Éric','300 Elbow Dr, Calgary, AB','100-000-015','réceptionniste'),
-- Hotel 6
(6,'Girard','Sylvie','100 Grande Allée, Québec, QC','100-000-016','gestionnaire'),
(6,'Gauthier','Patrick','200 Rue St-Jean, Québec, QC','100-000-017','réceptionniste'),
(6,'Bélanger','Lucie','300 Rue St-Joseph, Québec, QC','100-000-018','réceptionniste'),
-- Hotel 7
(7,'Simard','Claude','100 Carling Ave, Ottawa, ON','100-000-019','gestionnaire'),
(7,'Leblanc','Monique','200 Merivale Rd, Ottawa, ON','100-000-020','réceptionniste'),
(7,'Pouliot','Alain','300 Richmond Rd, Ottawa, ON','100-000-021','réceptionniste'),
-- Hotel 8
(8,'Demers','Hélène','100 Jasper Ave, Edmonton, AB','100-000-022','gestionnaire'),
(8,'Chartier','Bruno','200 Whyte Ave, Edmonton, AB','100-000-023','réceptionniste'),
(8,'Picard','Diane','300 Gateway Blvd, Edmonton, AB','100-000-024','réceptionniste'),
-- Hotel 9
(9,'Lefebvre','André','100 King St, Toronto, ON','100-000-025','gestionnaire'),
(9,'Beaulieu','Josée','200 Queen St, Toronto, ON','100-000-026','réceptionniste'),
(9,'Poirier','Serge','300 Yonge St, Toronto, ON','100-000-027','réceptionniste'),
-- Hotel 10
(10,'Lacroix','Manon','100 Bank St, Ottawa, ON','100-000-028','gestionnaire'),
(10,'Thibault','Gilles','200 Elgin St, Ottawa, ON','100-000-029','réceptionniste'),
(10,'Arsenault','Céline','300 Bronson Ave, Ottawa, ON','100-000-030','réceptionniste'),
-- Hotel 11
(11,'Perron','Yves','100 Rue Peel, Montréal, QC','100-000-031','gestionnaire'),
(11,'Mercier','Lise','200 Rue Sherbrooke, Montréal, QC','100-000-032','réceptionniste'),
(11,'Beauchamp','René','300 Rue Maisonneuve, Montréal, QC','100-000-033','réceptionniste'),
-- Hotel 12
(12,'Turgeon','France','100 Kingsway, Burnaby, BC','100-000-034','gestionnaire'),
(12,'Lachance','Mario','200 Canada Way, Burnaby, BC','100-000-035','réceptionniste'),
(12,'Desrochers','Guylaine','300 Hastings St, Burnaby, BC','100-000-036','réceptionniste'),
-- Hotel 13
(13,'Paradis','Normand','100 Airport Rd, Calgary, AB','100-000-037','gestionnaire'),
(13,'Grenier','Chantal','200 Barlow Trail, Calgary, AB','100-000-038','réceptionniste'),
(13,'Leclerc','Denis','300 36th St NE, Calgary, AB','100-000-039','réceptionniste'),
-- Hotel 14
(14,'Champagne','Réjean','100 Grande Allée E, Québec, QC','100-000-040','gestionnaire'),
(14,'Vachon','Andrée','200 Rue Cartier, Québec, QC','100-000-041','réceptionniste'),
(14,'Savard','Normand','300 Rue St-Cyrille, Québec, QC','100-000-042','réceptionniste'),
-- Hotel 15
(15,'Corriveau','Martine','100 Sparks St, Ottawa, ON','100-000-043','gestionnaire'),
(15,'Blouin','Charles','200 Wellington St, Ottawa, ON','100-000-044','réceptionniste'),
(15,'Couture','Francine','300 Queen St, Ottawa, ON','100-000-045','réceptionniste'),
-- Hotel 16
(16,'Desaulniers','Jacques','100 Portage Ave, Winnipeg, MB','100-000-046','gestionnaire'),
(16,'Côté','Stéphane','200 Main St, Winnipeg, MB','100-000-047','réceptionniste'),
(16,'Lebrun','Johanne','300 Pembina Hwy, Winnipeg, MB','100-000-048','réceptionniste'),
-- Hotel 17
(17,'Masse','Colette','100 Bloor St, Toronto, ON','100-000-049','gestionnaire'),
(17,'Langlois','Benoît','200 Spadina Ave, Toronto, ON','100-000-050','réceptionniste'),
(17,'Lapointe','Sylvain','300 Avenue Rd, Toronto, ON','100-000-051','réceptionniste'),
-- Hotel 18
(18,'Boivin','Kathleen','100 Colonel By Dr, Ottawa, ON','100-000-052','gestionnaire'),
(18,'Nadeau','Patrice','200 Sussex Dr, Ottawa, ON','100-000-053','réceptionniste'),
(18,'Martel','Ghislaine','300 Rideau St, Ottawa, ON','100-000-054','réceptionniste'),
-- Hotel 19
(19,'Caron','Louis','100 Rue McGill, Montréal, QC','100-000-055','gestionnaire'),
(19,'Dion','Carole','200 Rue de la Commune, Montréal, QC','100-000-056','réceptionniste'),
(19,'Fontaine','Guy','300 Rue William, Montréal, QC','100-000-057','réceptionniste'),
-- Hotel 20
(20,'Giguère','Madeleine','100 Broadway, Vancouver, BC','100-000-058','gestionnaire'),
(20,'Hamel','Stéphanie','200 Oak St, Vancouver, BC','100-000-059','réceptionniste'),
(20,'Hébert','Conrad','300 Cambie St, Vancouver, BC','100-000-060','réceptionniste'),
-- Hotel 21
(21,'Jalbert','Micheline','100 8th Ave SW, Calgary, AB','100-000-061','gestionnaire'),
(21,'Labbé','Roger','200 9th Ave SW, Calgary, AB','100-000-062','réceptionniste'),
(21,'Lafleur','Suzanne','300 10th Ave SW, Calgary, AB','100-000-063','réceptionniste'),
-- Hotel 22
(22,'Lamarche','Victor','100 Laurier Blvd, Québec, QC','100-000-064','gestionnaire'),
(22,'Lamontagne','Denise','200 Rue de la Capitale, Québec, QC','100-000-065','réceptionniste'),
(22,'Landry','Émile','300 Rue Duplessis, Québec, QC','100-000-066','réceptionniste'),
-- Hotel 23
(23,'Lapierre','Thérèse','100 Colonel By Dr, Ottawa, ON','100-000-067','gestionnaire'),
(23,'Laroche','Gérard','200 Heron Rd, Ottawa, ON','100-000-068','réceptionniste'),
(23,'Larrivée','Nicole','300 Prince of Wales Dr, Ottawa, ON','100-000-069','réceptionniste'),
-- Hotel 24
(24,'Laurin','Fernand','100 Gateway Blvd, Edmonton, AB','100-000-070','gestionnaire'),
(24,'Lavallée','Pierrette','200 137th Ave, Edmonton, AB','100-000-071','réceptionniste'),
(24,'Lavertu','Réal','300 Fort Rd, Edmonton, AB','100-000-072','réceptionniste'),
-- Hotel 25
(25,'Lavigne','Estelle','100 Chestnut St, Toronto, ON','100-000-073','gestionnaire'),
(25,'Lebeau','Fernand','200 Dundas St, Toronto, ON','100-000-074','réceptionniste'),
(25,'Lecours','Pauline','300 College St, Toronto, ON','100-000-075','réceptionniste'),
-- Hotel 26
(26,'Leduc','Rosaire','100 Dalhousie St, Ottawa, ON','100-000-076','gestionnaire'),
(26,'Lefebvre','Rachelle','200 Murray St, Ottawa, ON','100-000-077','réceptionniste'),
(26,'Légaré','Wilfrid','300 George St, Ottawa, ON','100-000-078','réceptionniste'),
-- Hotel 27
(27,'Lemay','Adrienne','100 Avenue du Parc, Montréal, QC','100-000-079','gestionnaire'),
(27,'Lemieux','Lionel','200 Rue Hutchison, Montréal, QC','100-000-080','réceptionniste'),
(27,'Lemire','Cécile','300 Rue Milton, Montréal, QC','100-000-081','réceptionniste'),
-- Hotel 28
(28,'Léonard','Réginald','100 W Broadway, Vancouver, BC','100-000-082','gestionnaire'),
(28,'Lepage','Louisette','200 Granville St, Vancouver, BC','100-000-083','réceptionniste'),
(28,'Lessard','Gérald','300 Fir St, Vancouver, BC','100-000-084','réceptionniste'),
-- Hotel 29
(29,'Létourneau','Hermance','100 4th Ave SW, Calgary, AB','100-000-085','gestionnaire'),
(29,'Lévesque','Yvon','200 5th Ave SW, Calgary, AB','100-000-086','réceptionniste'),
(29,'Lirette','Aline','300 6th Ave SW, Calgary, AB','100-000-087','réceptionniste'),
-- Hotel 30
(30,'Lizotte','Armand','100 Laurier Blvd, Québec, QC','100-000-088','gestionnaire'),
(30,'Longpré','Aurore','200 Rue des Érables, Québec, QC','100-000-089','réceptionniste'),
(30,'Lord','Alphonse','300 Rue Cartier, Québec, QC','100-000-090','réceptionniste'),
-- Hotel 31
(31,'Lussier','Blanche','100 Coventry Rd, Ottawa, ON','100-000-091','gestionnaire'),
(31,'Maheux','Edmond','200 Montreal Rd, Ottawa, ON','100-000-092','réceptionniste'),
(31,'Mailhot','Flore','300 St-Laurent Blvd, Ottawa, ON','100-000-093','réceptionniste'),
-- Hotel 32
(32,'Mailloux','Hormidas','100 Barrington St, Halifax, NS','100-000-094','gestionnaire'),
(32,'Maltais','Irène','200 Spring Garden Rd, Halifax, NS','100-000-095','réceptionniste'),
(32,'Marchand','Joseph','300 Quinpool Rd, Halifax, NS','100-000-096','réceptionniste'),
-- Hotel 33
(33,'Marcotte','Léa','100 Lombard St, Toronto, ON','100-000-097','gestionnaire'),
(33,'Marion','Maurice','200 Adelaide St, Toronto, ON','100-000-098','réceptionniste'),
(33,'Marquis','Noëlla','300 Front St, Toronto, ON','100-000-099','réceptionniste'),
-- Hotel 34
(34,'Martel','Octave','100 Rideau St, Ottawa, ON','100-000-100','gestionnaire'),
(34,'Martin','Philomène','200 Somerset St, Ottawa, ON','100-000-101','réceptionniste'),
(34,'Massé','Québec','300 Gladstone Ave, Ottawa, ON','100-000-102','réceptionniste'),
-- Hotel 35
(35,'Ménard','Roland','100 Avenue du Parc, Montréal, QC','100-000-103','gestionnaire'),
(35,'Mercier','Simone','200 Rue Bernard, Montréal, QC','100-000-104','réceptionniste'),
(35,'Michaud','Théodore','300 Rue Fairmount, Montréal, QC','100-000-105','réceptionniste'),
-- Hotel 36
(36,'Milot','Ursule','100 Kingsway, Vancouver, BC','100-000-106','gestionnaire'),
(36,'Miron','Valère','200 Joyce St, Vancouver, BC','100-000-107','réceptionniste'),
(36,'Moisan','Wilhelmine','300 Nanaimo St, Vancouver, BC','100-000-108','réceptionniste'),
-- Hotel 37
(37,'Morel','Xavier','100 8th St SW, Calgary, AB','100-000-109','gestionnaire'),
(37,'Moreau','Yvette','200 14th St SW, Calgary, AB','100-000-110','réceptionniste'),
(37,'Morin','Zacharie','300 17th Ave SW, Calgary, AB','100-000-111','réceptionniste'),
-- Hotel 38
(38,'Mouton','Alberte','100 Hamel Blvd, Québec, QC','100-000-112','gestionnaire'),
(38,'Naud','Barnabé','200 Rue Chauveau, Québec, QC','100-000-113','réceptionniste'),
(38,'Nolin','Candide','300 Rue Lebourgneuf, Québec, QC','100-000-114','réceptionniste'),
-- Hotel 39
(39,'Normandin','Doris','100 Carling Ave, Ottawa, ON','100-000-115','gestionnaire'),
(39,'Ouellette','Ephrem','200 Merivale Rd, Ottawa, ON','100-000-116','réceptionniste'),
(39,'Pagé','Flavia','300 Baseline Rd, Ottawa, ON','100-000-117','réceptionniste'),
-- Hotel 40
(40,'Paquet','Gontran','100 100th Ave, Edmonton, AB','100-000-118','gestionnaire'),
(40,'Paradis','Hermine','200 Stony Plain Rd, Edmonton, AB','100-000-119','réceptionniste'),
(40,'Parent','Isidore','300 118th Ave, Edmonton, AB','100-000-120','réceptionniste');

-- ============================================================
-- MISE À JOUR DES GESTIONNAIRES
-- ============================================================
UPDATE Hotel SET gestionnaire_id = 1 WHERE id = 1;
UPDATE Hotel SET gestionnaire_id = 4 WHERE id = 2;
UPDATE Hotel SET gestionnaire_id = 7 WHERE id = 3;
UPDATE Hotel SET gestionnaire_id = 10 WHERE id = 4;
UPDATE Hotel SET gestionnaire_id = 13 WHERE id = 5;
UPDATE Hotel SET gestionnaire_id = 16 WHERE id = 6;
UPDATE Hotel SET gestionnaire_id = 19 WHERE id = 7;
UPDATE Hotel SET gestionnaire_id = 22 WHERE id = 8;
UPDATE Hotel SET gestionnaire_id = 25 WHERE id = 9;
UPDATE Hotel SET gestionnaire_id = 28 WHERE id = 10;
UPDATE Hotel SET gestionnaire_id = 31 WHERE id = 11;
UPDATE Hotel SET gestionnaire_id = 34 WHERE id = 12;
UPDATE Hotel SET gestionnaire_id = 37 WHERE id = 13;
UPDATE Hotel SET gestionnaire_id = 40 WHERE id = 14;
UPDATE Hotel SET gestionnaire_id = 43 WHERE id = 15;
UPDATE Hotel SET gestionnaire_id = 46 WHERE id = 16;
UPDATE Hotel SET gestionnaire_id = 49 WHERE id = 17;
UPDATE Hotel SET gestionnaire_id = 52 WHERE id = 18;
UPDATE Hotel SET gestionnaire_id = 55 WHERE id = 19;
UPDATE Hotel SET gestionnaire_id = 58 WHERE id = 20;
UPDATE Hotel SET gestionnaire_id = 61 WHERE id = 21;
UPDATE Hotel SET gestionnaire_id = 64 WHERE id = 22;
UPDATE Hotel SET gestionnaire_id = 67 WHERE id = 23;
UPDATE Hotel SET gestionnaire_id = 70 WHERE id = 24;
UPDATE Hotel SET gestionnaire_id = 73 WHERE id = 25;
UPDATE Hotel SET gestionnaire_id = 76 WHERE id = 26;
UPDATE Hotel SET gestionnaire_id = 79 WHERE id = 27;
UPDATE Hotel SET gestionnaire_id = 82 WHERE id = 28;
UPDATE Hotel SET gestionnaire_id = 85 WHERE id = 29;
UPDATE Hotel SET gestionnaire_id = 88 WHERE id = 30;
UPDATE Hotel SET gestionnaire_id = 91 WHERE id = 31;
UPDATE Hotel SET gestionnaire_id = 94 WHERE id = 32;
UPDATE Hotel SET gestionnaire_id = 97 WHERE id = 33;
UPDATE Hotel SET gestionnaire_id = 100 WHERE id = 34;
UPDATE Hotel SET gestionnaire_id = 103 WHERE id = 35;
UPDATE Hotel SET gestionnaire_id = 106 WHERE id = 36;
UPDATE Hotel SET gestionnaire_id = 109 WHERE id = 37;
UPDATE Hotel SET gestionnaire_id = 112 WHERE id = 38;
UPDATE Hotel SET gestionnaire_id = 115 WHERE id = 39;
UPDATE Hotel SET gestionnaire_id = 118 WHERE id = 40;

-- Réactiver les triggers
SET session_replication_role = DEFAULT;

-- ============================================================
-- CHAMBRES (5 par hôtel = 200 chambres)
-- ============================================================
INSERT INTO Chambre (hotel_id, numero, prix, capacite, vue, superficie, tv, climatisation, frigo, wifi, lit_extensible, etat) VALUES
-- Hotel 1 (Marriott Toronto Downtown - 5 étoiles)
(1,'101',350.00,1,'ville',30.00,true,true,true,true,false,'bon état'),
(1,'102',420.00,2,'ville',45.00,true,true,true,true,true,'bon état'),
(1,'201',550.00,2,'lac',50.00,true,true,true,true,false,'bon état'),
(1,'202',650.00,3,'lac',65.00,true,true,true,true,true,'bon état'),
(1,'301',900.00,4,'panoramique',90.00,true,true,true,true,true,'bon état'),
-- Hotel 2 (Marriott Ottawa Centre - 4 étoiles)
(2,'101',200.00,1,'ville',28.00,true,true,false,true,false,'bon état'),
(2,'102',250.00,2,'ville',40.00,true,true,true,true,false,'bon état'),
(2,'201',320.00,2,'parc',45.00,true,true,true,true,true,'bon état'),
(2,'202',380.00,3,'parc',55.00,true,true,true,true,true,'bon état'),
(2,'301',480.00,4,'panoramique',70.00,true,true,true,true,true,'bon état'),
-- Hotel 3 (Marriott Montreal Airport - 4 étoiles)
(3,'101',190.00,1,'ville',27.00,true,true,false,true,false,'bon état'),
(3,'102',240.00,2,'ville',38.00,true,true,true,true,false,'bon état'),
(3,'201',300.00,2,'jardin',42.00,true,true,true,true,false,'bon état'),
(3,'202',360.00,3,'jardin',52.00,true,true,true,true,true,'bon état'),
(3,'301',460.00,4,'panoramique',68.00,true,true,true,true,true,'bon état'),
-- Hotel 4 (Marriott Vancouver Pinnacle - 5 étoiles)
(4,'101',380.00,1,'mer',32.00,true,true,true,true,false,'bon état'),
(4,'102',460.00,2,'mer',48.00,true,true,true,true,true,'bon état'),
(4,'201',580.00,2,'montagne',52.00,true,true,true,true,false,'bon état'),
(4,'202',700.00,3,'montagne',68.00,true,true,true,true,true,'bon état'),
(4,'301',950.00,4,'panoramique',95.00,true,true,true,true,true,'bon état'),
-- Hotel 5 (Marriott Calgary - 3 étoiles)
(5,'101',150.00,1,'ville',25.00,true,true,false,true,false,'bon état'),
(5,'102',190.00,2,'ville',35.00,true,true,false,true,false,'bon état'),
(5,'201',240.00,2,'parc',40.00,true,true,true,true,false,'bon état'),
(5,'202',290.00,3,'parc',50.00,true,true,true,true,true,'bon état'),
(5,'301',380.00,4,'panoramique',65.00,true,true,true,true,true,'bon état'),
-- Hotel 6 (Marriott Quebec City - 4 étoiles)
(6,'101',210.00,1,'ville',28.00,true,true,false,true,false,'bon état'),
(6,'102',260.00,2,'ville',42.00,true,true,true,true,false,'bon état'),
(6,'201',330.00,2,'fleuve',47.00,true,true,true,true,true,'bon état'),
(6,'202',400.00,3,'fleuve',58.00,true,true,true,true,true,'bon état'),
(6,'301',500.00,4,'panoramique',72.00,true,true,true,true,true,'bon état'),
-- Hotel 7 (Marriott Ottawa West - 3 étoiles)
(7,'101',140.00,1,'ville',24.00,true,false,false,true,false,'bon état'),
(7,'102',180.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(7,'201',220.00,2,'parc',38.00,true,true,false,true,true,'bon état'),
(7,'202',270.00,3,'parc',48.00,true,true,true,true,false,'bon état'),
(7,'301',350.00,4,'panoramique',62.00,true,true,true,true,true,'bon état'),
-- Hotel 8 (Marriott Edmonton - 3 étoiles)
(8,'101',145.00,1,'ville',24.00,true,false,false,true,false,'bon état'),
(8,'102',185.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(8,'201',230.00,2,'rivière',39.00,true,true,true,true,false,'bon état'),
(8,'202',275.00,3,'rivière',49.00,true,true,true,true,true,'bon état'),
(8,'301',360.00,4,'panoramique',63.00,true,true,true,true,true,'bon état'),
-- Hotel 9 (Hilton Toronto - 5 étoiles)
(9,'101',360.00,1,'ville',31.00,true,true,true,true,false,'bon état'),
(9,'102',440.00,2,'ville',46.00,true,true,true,true,true,'bon état'),
(9,'201',560.00,2,'lac',51.00,true,true,true,true,false,'bon état'),
(9,'202',670.00,3,'lac',66.00,true,true,true,true,true,'bon état'),
(9,'301',920.00,4,'panoramique',92.00,true,true,true,true,true,'bon état'),
-- Hotel 10 (Hilton Ottawa Airport - 4 étoiles)
(10,'101',205.00,1,'piste',29.00,true,true,false,true,false,'bon état'),
(10,'102',255.00,2,'piste',41.00,true,true,true,true,false,'bon état'),
(10,'201',325.00,2,'ville',46.00,true,true,true,true,true,'bon état'),
(10,'202',385.00,3,'ville',56.00,true,true,true,true,true,'bon état'),
(10,'301',490.00,4,'panoramique',71.00,true,true,true,true,true,'bon état'),
-- Hotel 11 (Hilton Montreal Bonaventure - 4 étoiles)
(11,'101',195.00,1,'ville',27.00,true,true,false,true,false,'bon état'),
(11,'102',245.00,2,'ville',39.00,true,true,true,true,false,'bon état'),
(11,'201',310.00,2,'jardin',44.00,true,true,true,true,false,'bon état'),
(11,'202',370.00,3,'jardin',54.00,true,true,true,true,true,'bon état'),
(11,'301',470.00,4,'panoramique',69.00,true,true,true,true,true,'bon état'),
-- Hotel 12 (Hilton Vancouver Metrotown - 3 étoiles)
(12,'101',155.00,1,'ville',25.00,true,true,false,true,false,'bon état'),
(12,'102',195.00,2,'ville',36.00,true,true,false,true,false,'bon état'),
(12,'201',245.00,2,'parc',41.00,true,true,true,true,false,'bon état'),
(12,'202',295.00,3,'parc',51.00,true,true,true,true,true,'bon état'),
(12,'301',385.00,4,'panoramique',66.00,true,true,true,true,true,'bon état'),
-- Hotel 13 (Hilton Calgary Airport - 4 étoiles)
(13,'101',215.00,1,'piste',29.00,true,true,false,true,false,'bon état'),
(13,'102',265.00,2,'piste',42.00,true,true,true,true,false,'bon état'),
(13,'201',335.00,2,'ville',47.00,true,true,true,true,true,'bon état'),
(13,'202',395.00,3,'ville',57.00,true,true,true,true,true,'bon état'),
(13,'301',495.00,4,'panoramique',72.00,true,true,true,true,true,'bon état'),
-- Hotel 14 (Hilton Quebec - 5 étoiles)
(14,'101',370.00,1,'fleuve',32.00,true,true,true,true,false,'bon état'),
(14,'102',450.00,2,'fleuve',47.00,true,true,true,true,true,'bon état'),
(14,'201',570.00,2,'ville',52.00,true,true,true,true,false,'bon état'),
(14,'202',680.00,3,'ville',67.00,true,true,true,true,true,'bon état'),
(14,'301',930.00,4,'panoramique',93.00,true,true,true,true,true,'bon état'),
-- Hotel 15 (Hilton Ottawa Downtown - 4 étoiles)
(15,'101',208.00,1,'ville',28.00,true,true,false,true,false,'bon état'),
(15,'102',258.00,2,'ville',41.00,true,true,true,true,false,'bon état'),
(15,'201',328.00,2,'rivière',46.00,true,true,true,true,true,'bon état'),
(15,'202',388.00,3,'rivière',56.00,true,true,true,true,true,'bon état'),
(15,'301',488.00,4,'panoramique',71.00,true,true,true,true,true,'bon état'),
-- Hotel 16 (Hilton Winnipeg Airport - 3 étoiles)
(16,'101',148.00,1,'ville',24.00,true,false,false,true,false,'bon état'),
(16,'102',188.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(16,'201',235.00,2,'parc',39.00,true,true,false,true,true,'bon état'),
(16,'202',280.00,3,'parc',49.00,true,true,true,true,false,'bon état'),
(16,'301',365.00,4,'panoramique',63.00,true,true,true,true,true,'bon état'),
-- Hotel 17 (InterContinental Toronto - 5 étoiles)
(17,'101',370.00,1,'ville',32.00,true,true,true,true,false,'bon état'),
(17,'102',450.00,2,'ville',47.00,true,true,true,true,true,'bon état'),
(17,'201',570.00,2,'lac',52.00,true,true,true,true,false,'bon état'),
(17,'202',680.00,3,'lac',67.00,true,true,true,true,true,'bon état'),
(17,'301',930.00,4,'panoramique',93.00,true,true,true,true,true,'bon état'),
-- Hotel 18 (Holiday Inn Ottawa East - 3 étoiles)
(18,'101',135.00,1,'ville',23.00,true,false,false,true,false,'bon état'),
(18,'102',175.00,2,'ville',33.00,true,true,false,true,false,'bon état'),
(18,'201',215.00,2,'parc',37.00,true,true,false,true,true,'bon état'),
(18,'202',260.00,3,'parc',47.00,true,true,true,true,false,'bon état'),
(18,'301',340.00,4,'panoramique',60.00,true,true,true,true,true,'bon état'),
-- Hotel 19 (InterContinental Montreal - 5 étoiles)
(19,'101',375.00,1,'ville',32.00,true,true,true,true,false,'bon état'),
(19,'102',455.00,2,'ville',47.00,true,true,true,true,true,'bon état'),
(19,'201',575.00,2,'fleuve',52.00,true,true,true,true,false,'bon état'),
(19,'202',685.00,3,'fleuve',67.00,true,true,true,true,true,'bon état'),
(19,'301',935.00,4,'panoramique',93.00,true,true,true,true,true,'bon état'),
-- Hotel 20 (Holiday Inn Vancouver - 3 étoiles)
(20,'101',152.00,1,'ville',25.00,true,true,false,true,false,'bon état'),
(20,'102',192.00,2,'ville',35.00,true,true,false,true,false,'bon état'),
(20,'201',242.00,2,'montagne',40.00,true,true,true,true,false,'bon état'),
(20,'202',292.00,3,'montagne',50.00,true,true,true,true,true,'bon état'),
(20,'301',382.00,4,'panoramique',65.00,true,true,true,true,true,'bon état'),
-- Hotel 21 (Holiday Inn Calgary - 3 étoiles)
(21,'101',142.00,1,'ville',24.00,true,false,false,true,false,'bon état'),
(21,'102',182.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(21,'201',228.00,2,'parc',38.00,true,true,false,true,true,'bon état'),
(21,'202',275.00,3,'parc',48.00,true,true,true,true,false,'bon état'),
(21,'301',358.00,4,'panoramique',62.00,true,true,true,true,true,'bon état'),
-- Hotel 22 (InterContinental Quebec - 4 étoiles)
(22,'101',212.00,1,'ville',28.00,true,true,false,true,false,'bon état'),
(22,'102',262.00,2,'ville',42.00,true,true,true,true,false,'bon état'),
(22,'201',332.00,2,'fleuve',47.00,true,true,true,true,true,'bon état'),
(22,'202',395.00,3,'fleuve',57.00,true,true,true,true,true,'bon état'),
(22,'301',498.00,4,'panoramique',72.00,true,true,true,true,true,'bon état'),
-- Hotel 23 (Holiday Inn Ottawa West - 2 étoiles)
(23,'101',110.00,1,'ville',22.00,true,false,false,true,false,'bon état'),
(23,'102',145.00,2,'ville',32.00,true,false,false,true,false,'bon état'),
(23,'201',180.00,2,'parc',36.00,true,true,false,true,false,'bon état'),
(23,'202',220.00,3,'parc',46.00,true,true,false,true,true,'bon état'),
(23,'301',290.00,4,'panoramique',58.00,true,true,true,true,false,'bon état'),
-- Hotel 24 (Holiday Inn Edmonton - 2 étoiles)
(24,'101',112.00,1,'ville',22.00,true,false,false,true,false,'bon état'),
(24,'102',148.00,2,'ville',32.00,true,false,false,true,false,'bon état'),
(24,'201',185.00,2,'rivière',36.00,true,true,false,true,false,'bon état'),
(24,'202',225.00,3,'rivière',46.00,true,true,false,true,true,'bon état'),
(24,'301',295.00,4,'panoramique',58.00,true,true,true,true,false,'bon état'),
-- Hotel 25 (Wyndham Toronto - 4 étoiles)
(25,'101',220.00,1,'ville',29.00,true,true,false,true,false,'bon état'),
(25,'102',270.00,2,'ville',43.00,true,true,true,true,false,'bon état'),
(25,'201',340.00,2,'parc',48.00,true,true,true,true,true,'bon état'),
(25,'202',405.00,3,'parc',59.00,true,true,true,true,true,'bon état'),
(25,'301',510.00,4,'panoramique',74.00,true,true,true,true,true,'bon état'),
-- Hotel 26 (Wyndham Ottawa - 3 étoiles)
(26,'101',158.00,1,'ville',25.00,true,true,false,true,false,'bon état'),
(26,'102',198.00,2,'ville',36.00,true,true,false,true,false,'bon état'),
(26,'201',248.00,2,'rivière',41.00,true,true,true,true,false,'bon état'),
(26,'202',298.00,3,'rivière',51.00,true,true,true,true,true,'bon état'),
(26,'301',390.00,4,'panoramique',66.00,true,true,true,true,true,'bon état'),
-- Hotel 27 (Wyndham Montreal - 4 étoiles)
(27,'101',218.00,1,'ville',29.00,true,true,false,true,false,'bon état'),
(27,'102',268.00,2,'ville',43.00,true,true,true,true,false,'bon état'),
(27,'201',338.00,2,'parc',48.00,true,true,true,true,true,'bon état'),
(27,'202',402.00,3,'parc',59.00,true,true,true,true,true,'bon état'),
(27,'301',508.00,4,'panoramique',74.00,true,true,true,true,true,'bon état'),
-- Hotel 28 (Wyndham Vancouver - 3 étoiles)
(28,'101',162.00,1,'ville',25.00,true,true,false,true,false,'bon état'),
(28,'102',202.00,2,'ville',36.00,true,true,false,true,false,'bon état'),
(28,'201',252.00,2,'montagne',41.00,true,true,true,true,false,'bon état'),
(28,'202',302.00,3,'montagne',51.00,true,true,true,true,true,'bon état'),
(28,'301',395.00,4,'panoramique',66.00,true,true,true,true,true,'bon état'),
-- Hotel 29 (Wyndham Calgary Downtown - 4 étoiles)
(29,'101',222.00,1,'ville',29.00,true,true,false,true,false,'bon état'),
(29,'102',272.00,2,'ville',43.00,true,true,true,true,false,'bon état'),
(29,'201',342.00,2,'rivière',48.00,true,true,true,true,true,'bon état'),
(29,'202',408.00,3,'rivière',59.00,true,true,true,true,true,'bon état'),
(29,'301',515.00,4,'panoramique',74.00,true,true,true,true,true,'bon état'),
-- Hotel 30 (Wyndham Quebec City - 3 étoiles)
(30,'101',160.00,1,'ville',25.00,true,true,false,true,false,'bon état'),
(30,'102',200.00,2,'ville',36.00,true,true,false,true,false,'bon état'),
(30,'201',250.00,2,'fleuve',41.00,true,true,true,true,false,'bon état'),
(30,'202',300.00,3,'fleuve',51.00,true,true,true,true,true,'bon état'),
(30,'301',392.00,4,'panoramique',66.00,true,true,true,true,true,'bon état'),
-- Hotel 31 (Wyndham Ottawa East - 2 étoiles)
(31,'101',115.00,1,'ville',22.00,true,false,false,true,false,'bon état'),
(31,'102',150.00,2,'ville',32.00,true,false,false,true,false,'bon état'),
(31,'201',188.00,2,'parc',36.00,true,true,false,true,false,'bon état'),
(31,'202',228.00,3,'parc',46.00,true,true,false,true,true,'bon état'),
(31,'301',298.00,4,'panoramique',58.00,true,true,true,true,false,'bon état'),
-- Hotel 32 (Wyndham Halifax - 3 étoiles)
(32,'101',155.00,1,'mer',25.00,true,true,false,true,false,'bon état'),
(32,'102',195.00,2,'mer',36.00,true,true,false,true,false,'bon état'),
(32,'201',245.00,2,'port',41.00,true,true,true,true,false,'bon état'),
(32,'202',295.00,3,'port',51.00,true,true,true,true,true,'bon état'),
(32,'301',388.00,4,'panoramique',66.00,true,true,true,true,true,'bon état'),
-- Hotel 33 (Best Western Toronto - 3 étoiles)
(33,'101',148.00,1,'ville',24.00,true,true,false,true,false,'bon état'),
(33,'102',188.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(33,'201',235.00,2,'parc',39.00,true,true,true,true,false,'bon état'),
(33,'202',282.00,3,'parc',49.00,true,true,true,true,true,'bon état'),
(33,'301',368.00,4,'panoramique',63.00,true,true,true,true,true,'bon état'),
-- Hotel 34 (Best Western Ottawa - 2 étoiles)
(34,'101',108.00,1,'ville',21.00,true,false,false,true,false,'bon état'),
(34,'102',142.00,2,'ville',31.00,true,false,false,true,false,'bon état'),
(34,'201',178.00,2,'parc',35.00,true,true,false,true,false,'bon état'),
(34,'202',218.00,3,'parc',45.00,true,true,false,true,true,'bon état'),
(34,'301',288.00,4,'panoramique',57.00,true,true,true,true,false,'bon état'),
-- Hotel 35 (Best Western Montreal - 3 étoiles)
(35,'101',150.00,1,'ville',24.00,true,true,false,true,false,'bon état'),
(35,'102',190.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(35,'201',238.00,2,'parc',39.00,true,true,true,true,false,'bon état'),
(35,'202',285.00,3,'parc',49.00,true,true,true,true,true,'bon état'),
(35,'301',372.00,4,'panoramique',63.00,true,true,true,true,true,'bon état'),
-- Hotel 36 (Best Western Vancouver - 2 étoiles)
(36,'101',118.00,1,'ville',22.00,true,false,false,true,false,'bon état'),
(36,'102',152.00,2,'ville',32.00,true,false,false,true,false,'bon état'),
(36,'201',190.00,2,'montagne',36.00,true,true,false,true,false,'bon état'),
(36,'202',230.00,3,'montagne',46.00,true,true,false,true,true,'bon état'),
(36,'301',302.00,4,'panoramique',59.00,true,true,true,true,false,'bon état'),
-- Hotel 37 (Best Western Calgary - 3 étoiles)
(37,'101',145.00,1,'ville',24.00,true,true,false,true,false,'bon état'),
(37,'102',185.00,2,'ville',34.00,true,true,false,true,false,'bon état'),
(37,'201',232.00,2,'parc',39.00,true,true,true,true,false,'bon état'),
(37,'202',278.00,3,'parc',49.00,true,true,true,true,true,'bon état'),
(37,'301',362.00,4,'panoramique',63.00,true,true,true,true,true,'bon état'),
-- Hotel 38 (Best Western Quebec - 2 étoiles)
(38,'101',105.00,1,'ville',21.00,true,false,false,true,false,'bon état'),
(38,'102',138.00,2,'ville',31.00,true,false,false,true,false,'bon état'),
(38,'201',172.00,2,'parc',35.00,true,true,false,true,false,'bon état'),
(38,'202',212.00,3,'parc',45.00,true,true,false,true,true,'bon état'),
(38,'301',282.00,4,'panoramique',57.00,true,true,true,true,false,'bon état'),
-- Hotel 39 (Best Western Ottawa East - 2 étoiles)
(39,'101',112.00,1,'ville',22.00,true,false,false,true,false,'bon état'),
(39,'102',148.00,2,'ville',32.00,true,false,false,true,false,'bon état'),
(39,'201',185.00,2,'parc',36.00,true,true,false,true,false,'bon état'),
(39,'202',225.00,3,'parc',46.00,true,true,false,true,true,'bon état'),
(39,'301',295.00,4,'panoramique',58.00,true,true,true,true,false,'bon état'),
-- Hotel 40 (Best Western Edmonton - 2 étoiles)
(40,'101',110.00,1,'ville',22.00,true,false,false,true,false,'bon état'),
(40,'102',145.00,2,'ville',32.00,true,false,false,true,false,'bon état'),
(40,'201',182.00,2,'rivière',36.00,true,true,false,true,false,'bon état'),
(40,'202',222.00,3,'rivière',46.00,true,true,false,true,true,'bon état'),
(40,'301',292.00,4,'panoramique',58.00,true,true,true,true,false,'bon état');

-- ============================================================
-- CLIENTS
-- ============================================================
INSERT INTO Client (nom, prenom, adresse, nas, date_inscription) VALUES
('Dupont','Alice','123 Rue Main, Toronto, ON','200-000-001','2024-01-15'),
('Durand','Bob','456 Rue Oak, Ottawa, ON','200-000-002','2024-02-20'),
('Lambert','Claire','789 Rue Pine, Montréal, QC','200-000-003','2024-03-10'),
('Girard','David','321 Rue Elm, Vancouver, BC','200-000-004','2024-04-05'),
('Bonnet','Emma','654 Rue Cedar, Calgary, AB','200-000-005','2024-05-12'),
('Moreau','Félix','987 Rue Birch, Québec, QC','200-000-006','2024-06-18'),
('Simon','Grace','111 Rue Maple, Toronto, ON','200-000-007','2024-07-22'),
('Michel','Hugo','222 Rue Willow, Ottawa, ON','200-000-008','2024-08-30'),
('Leroy','Iris','333 Rue Spruce, Montréal, QC','200-000-009','2024-09-14'),
('Roux','Jules','444 Rue Poplar, Vancouver, BC','200-000-010','2024-10-01');

-- ============================================================
-- RÉSERVATIONS
-- ============================================================
INSERT INTO Reservation (client_id, chambre_id, date_debut, date_fin, statut, chambre_prix_snapshot, hotel_nom_snapshot, hotel_adresse_snapshot) VALUES
(1, 1, '2026-04-10', '2026-04-15', 'active', 350.00, 'Marriott Toronto Downtown', '525 Bay St, Toronto, ON, Canada'),
(2, 6, '2026-04-12', '2026-04-14', 'active', 200.00, 'Marriott Ottawa Centre', '100 Kent St, Ottawa, ON, Canada'),
(3, 11, '2026-04-20', '2026-04-25', 'active', 190.00, 'Marriott Montreal Airport', '9000 Côte-de-Liesse, Montréal, QC, Canada'),
(4, 16, '2026-04-08', '2026-04-10', 'convertie', 380.00, 'Marriott Vancouver Pinnacle', '1128 W Hastings St, Vancouver, BC, Canada'),
(5, 21, '2026-05-01', '2026-05-05', 'active', 150.00, 'Marriott Calgary', '110 9th Ave SE, Calgary, AB, Canada');

-- ============================================================
-- LOCATIONS
-- ============================================================
INSERT INTO Location (client_id, chambre_id, employe_id, reservation_id, date_debut, date_fin, chambre_prix_snapshot, hotel_nom_snapshot, hotel_adresse_snapshot) VALUES
(4, 16, 10, 4, '2026-04-08', '2026-04-10', 380.00, 'Marriott Vancouver Pinnacle', '1128 W Hastings St, Vancouver, BC, Canada'),
(6, 26, 16, NULL, '2026-04-05', '2026-04-08', 210.00, 'Marriott Quebec City', '850 Place d Youville, Québec, QC, Canada'),
(7, 31, 19, NULL, '2026-04-03', '2026-04-07', 140.00, 'Marriott Ottawa West', '1199 Joseph Cyr St, Ottawa, ON, Canada');