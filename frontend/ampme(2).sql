-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 05, 2023 at 10:57 PM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ampme`
--

--
-- Dumping data for table `Actifs`
--

INSERT INTO `Actifs` (`Id`, `Etiquette`, `Nom`, `Etat`, `DateChangement`, `NumBonCommande`, `Groupe`, `Fonction`, `MaintenanceEffectueLe`, `NumeroSerie`, `AssignedToId`, `ManagedById`, `OwnedById`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `ProduitId`, `FournisseurId`, `EmplacementId`, `Active`, `ProchaineMaintenance`, `FinGarantie`, `AssignedAt`, `InstalledAt`, `DateRecu`, `DateAchat`, `HeureUtilisation`) VALUES
(6, 'AM-1404', 'Macbook Air MB876777', 5, '2023-04-04 03:40:20.911364', 'PO35361', NULL, 'Laboratoire Pre Media', NULL, 'MB876777', 3, 2, 2, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 00:03:05.731598', 'e524e3e7-dbf5-441e-8eb2-c2d1defa7031', '2023-04-04 03:40:20.910322', 26, NULL, 1, 1, '2023-03-22 00:03:05.731598', '2024-04-04 00:00:00.000000', '2023-04-04 03:40:20.917819', '2023-04-04 03:40:20.916734', NULL, NULL, 0),
(8, 'AM-1234', 'XPS 15 XPS-1524730', 2, NULL, NULL, NULL, 'Bureau', NULL, 'XPS-1524729', 4, 2, 4, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:39:20.565269', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:18:30.877682', 27, NULL, 2, 1, '2023-04-12 06:39:20.565269', '2024-04-04 00:00:00.000000', '2023-04-04 04:18:30.885741', '2023-04-04 04:18:30.884535', NULL, NULL, 0),
(10, 'AM-1258', 'XPS 15 XPS-1524730', 0, '2023-04-04 03:39:08.106791', NULL, NULL, 'Bureau', NULL, 'XPS-1524730', 4, 3, 2, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:50:56.839183', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:18:30.903168', 27, NULL, 2, 1, '2023-04-12 06:50:56.839183', '2024-04-04 04:18:28.023382', '2023-04-04 04:18:30.911217', '2023-04-04 04:18:30.910091', '2023-04-04 04:18:30.903168', NULL, 0),
(11, 'AM-1397', 'XPS 15 XPS-1524735', 3, '2023-04-04 03:38:40.402500', 'PO35351', NULL, NULL, NULL, 'XPS-1524735', NULL, 3, 3, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:50:57.028580', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:18:30.915861', 27, NULL, 3, 1, '2023-04-12 06:50:57.028580', '2024-04-04 00:00:00.000000', NULL, '2023-04-04 04:18:30.922583', NULL, NULL, NULL),
(12, 'AM-1398', 'iPhone X 987666', 3, '2023-03-28 10:40:48.710811', 'PO35352', NULL, NULL, NULL, '987666', 4, 2, 5, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:52:50.941612', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-28 10:40:48.709852', 29, NULL, NULL, 1, '2023-03-22 10:52:50.941612', '2024-03-28 00:00:00.000000', '2023-03-28 10:40:48.724909', NULL, NULL, NULL, NULL),
(13, 'AM-1411', 'Dell UltraSharp U3415W 4445555', 0, '2023-04-04 03:42:39.000143', NULL, NULL, 'Bureau', NULL, '4445555', 5, 3, 2, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:56:02.030946', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 03:42:38.999214', 34, NULL, 1, 1, '2023-03-22 10:56:02.030946', '2024-04-04 03:42:38.990500', '2023-04-04 03:42:39.007790', '2023-04-04 03:42:39.006625', '2023-04-04 03:42:38.999214', NULL, 0),
(21, 'tag test', 'name test', 1, NULL, 'number or letter', 'support grp test', 'manuf test', NULL, 'test', 15, 15, 15, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-28 13:22:24.658720', NULL, '2023-03-28 13:22:24.428825', 32, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '2023-03-27 22:00:00.000000', NULL),
(34, 'AT_123', 'XPS 15', 0, '2023-04-04 02:00:34.730282', 'PO1233', NULL, NULL, NULL, '6547382', NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 00:35:06.418295', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 02:00:34.729333', 36, NULL, NULL, 1, NULL, '2024-04-04 02:00:34.722875', NULL, NULL, '2023-04-04 02:00:34.729333', '2019-04-17 04:00:00.000000', 0),
(36, NULL, 'Macbook Pro16 PO MVVJ2XX/a', 1, NULL, NULL, NULL, NULL, NULL, 'MB0099', NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 01:31:55.187817', NULL, '2023-04-04 01:31:55.184881', 41, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(40, NULL, 'Catalyst 9200 enhanced VN', 0, '2023-04-04 02:06:19.848368', 'PO9888', NULL, NULL, NULL, 'CAT_00999', NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 02:02:05.536851', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 02:06:19.847387', 24, NULL, NULL, 1, '2044-05-28 22:02:05.536851', '2856-07-04 02:06:19.840793', NULL, NULL, '2023-04-04 02:06:19.847387', NULL, 0),
(41, NULL, 'Dell_LAT', 0, '2023-04-04 03:46:36.658717', 'PO9990009', NULL, NULL, NULL, '098877', NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 03:46:08.854029', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 03:46:36.657657', 33, NULL, NULL, 1, '2023-04-04 03:46:08.854029', '2024-04-04 03:46:36.650610', NULL, NULL, '2023-04-04 03:46:36.657657', '2015-09-03 04:00:00.000000', 0),
(42, 'AT_0999', 'TEST', 1, NULL, 'PO123456', NULL, NULL, NULL, '987655', NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:11:41.170465', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:12:22.385810', 42, NULL, NULL, 1, '2023-06-26 12:11:41.170465', '2024-04-04 00:00:00.000000', NULL, NULL, NULL, '2023-04-04 04:00:00.000000', 0),
(43, 'AT_6754', 'XPS 15 - XPS-009933', 3, '2023-04-04 22:41:12.523574', 'PO987343', 'Test', 'Bureau', NULL, 'XPS-009933', 2, 6, 6, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 20:58:50.415902', 'e524e3e7-dbf5-441e-8eb2-c2d1defa7031', '2023-04-04 22:41:12.522397', 27, NULL, 1, 1, '2023-04-25 16:58:50.415902', '2024-04-04 00:00:00.000000', NULL, NULL, NULL, '2023-04-04 04:00:00.000000', NULL),
(44, 'PH_099', 'Pixel 3XL G_PIX 2019 - PIX1222', 0, NULL, 'PO1002', NULL, NULL, NULL, 'PIX1222', NULL, 2, NULL, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-04-05 13:39:03.132039', NULL, '2023-04-05 13:39:03.128974', 30, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2019-08-06 23:00:00.000000', NULL);

--
-- Dumping data for table `Emplacement`
--

INSERT INTO `Emplacement` (`Id`, `NomEmp`, `EmployeId`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `Active`) VALUES
(1, 'Laboratoire Pre Media', 3, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 00:02:15.573072', NULL, '2023-03-22 00:02:15.563263', 1),
(2, 'Batisse 1', 2, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:30:22.178520', NULL, '2023-03-22 10:30:22.170546', 1),
(3, 'Stock - Batisse 1', 5, 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:50:12.729268', NULL, '2023-03-22 10:50:12.726148', 1);

--
-- Dumping data for table `Employes`
--

INSERT INTO `Employes` (`Id`, `FullName`, `Email`, `Telephone`, `Poste`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `Active`) VALUES
(2, 'Yvon Day', 'y-day@hotmail.com', '514-293-0930', 'Propriétaire de l\'application', NULL, '2023-03-21 05:15:20.300674', NULL, '2023-03-21 05:15:20.300674', 1),
(3, 'Pierre Gérard', 'pierre.gérard@gmail.com', '555-555-555', 'Chef de Projet', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 00:02:09.537721', NULL, '2023-03-22 00:02:09.526204', 1),
(4, 'Sophie Dubois', 'sophie.dubois@gmail.com', '555-555-555', 'Employee', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 00:05:53.065812', NULL, '2023-03-22 00:05:53.062893', 1),
(5, 'Luc Samson', 'luc.samson@gmail.com', '555-555-555', 'Employee', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:29:40.933081', NULL, '2023-03-22 10:29:40.923655', 1),
(6, 'Pierre Gérard', 'pguerard@company1.ca', '514-557-0099', 'Chef de projet', NULL, '2023-03-27 22:42:41.368825', NULL, '2023-03-27 22:42:41.368877', 1),
(7, 'Luc Samson', 'lsamson@company1.ca', '514-987-8822', 'Chef d\'équipe', NULL, '2023-03-27 22:42:41.369944', NULL, '2023-03-27 22:42:41.369944', 1),
(8, 'Paul Larivière', 'plariviere@company1.ca', '438-777-9897', 'Employé', NULL, '2023-03-27 22:42:41.371076', NULL, '2023-03-27 22:42:41.371076', 1),
(9, 'Serge Beaulieu', 'sbeaulieu@company1.ca', '819-222-1278', 'Employé', NULL, '2023-03-27 22:42:41.371973', NULL, '2023-03-27 22:42:41.371973', 1),
(10, 'Martine Larrivée', 'mlarrivee@company1.ca', '514-354-1924', 'Employé', NULL, '2023-03-27 22:42:41.372871', NULL, '2023-03-27 22:42:41.372871', 1),
(11, 'Sophie Dubois', 'sdubois@company1.ca', '514-866-9663', 'Employé', NULL, '2023-03-27 22:42:41.373663', NULL, '2023-03-27 22:42:41.373663', 1),
(12, 'Bob L\'Éponge', 'bleponge@company1.ca', '438-954-6777', 'Employé', NULL, '2023-03-27 22:42:41.374476', NULL, '2023-03-27 22:42:41.374476', 1),
(13, 'Paul Desmarais', 'pdesmarais@company1.ca', '514-323-0032', 'Chef de projet', NULL, '2023-03-27 22:42:41.375267', NULL, '2023-03-27 22:42:41.375267', 1),
(14, 'Philippe Durand', 'pdurand@company1.ca', '438-654-0087', 'Employé', NULL, '2023-03-27 22:42:41.376162', NULL, '2023-03-27 22:42:41.376162', 1),
(15, 'John Doe', 'jdoe@company1.ca', '514-775-9638', 'Chef de production', NULL, '2023-03-27 22:42:41.377045', NULL, '2023-03-27 22:42:41.377045', 1),
(16, 'Pierre Qui Roule', 'pqroule@company1.ca', '438-881-0965', 'Employé', NULL, '2023-03-27 22:42:41.377888', NULL, '2023-03-27 22:42:41.377888', 1);

--
-- Dumping data for table `Fournisseurs`
--

INSERT INTO `Fournisseurs` (`Id`, `Name`, `Email`, `Telephone`, `Adresse`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `Active`) VALUES
(1, 'Bencharef Omar', 'bencharef98@gmail.com', '2335456676', 'Montreal', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:35:36.091830', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 10:53:43.910753', 1),
(2, 'Softchoice', 'softchoice@softc.com', '514-878-1927', '23 ru des palmiers', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 00:37:53.143995', NULL, '2023-04-04 00:37:53.134289', 1);

--
-- Dumping data for table `Produits`
--

INSERT INTO `Produits` (`Id`, `NomModele`, `Classe`, `NumeroModele`, `Manufacturier`, `CoutAcquisition`, `PeriodeGarantie`, `FinSupport`, `FinVie`, `MTBF`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `Active`) VALUES
(24, 'Catalyst 9200 enhanced VN', 'Networking', 'C9200-48PB ', 'Cisco', '9500.00', 9999, '2023-03-31 00:00:00.000000', NULL, '185420.00', NULL, '2023-03-21 23:27:18.844075', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 00:08:34.367990', 1),
(25, 'Latitude 5330', 'Personnal Computer', '5330', 'Dell', '3741.00', 12, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844192', NULL, '2023-03-21 23:27:18.844192', 1),
(26, 'MacBook Air', 'Laptop', 'M2_MacBook Air', 'Apple', '1750.00', 12, '2026-04-24 04:00:00.000000', '2025-04-25 04:00:00.000000', '0.00', NULL, '2023-03-21 23:27:18.844226', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 01:03:27.516112', 1),
(27, 'XPS 15', 'Laptop', '9510', 'Dell', '2550.00', 12, NULL, NULL, '500.00', NULL, '2023-03-21 23:27:18.844235', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:18:30.871648', 1),
(28, 'Lorex 4K (8 Camera Capable) 2TB Wired DVR System', 'Surveillance', 'D4K2AD-84-C883', 'Lorex', '440.00', 12, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844250', NULL, '2023-03-21 23:27:18.844250', 1),
(29, 'iPhone X', 'Cell Phone', 'Iphone X_2018', 'Apple', '850.00', 12, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844261', NULL, '2023-03-21 23:27:18.844261', 1),
(30, 'Pixel 3XL', 'Cell Phone', 'G_PIX 2019', 'Google', '799.00', 12, NULL, '2023-03-31 04:00:00.000000', '0.00', NULL, '2023-03-21 23:27:18.844277', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-22 01:07:13.290201', 1),
(31, 'Macbook Pro', 'Laptop', 'MB_PRO_M1', 'Apple', '2000.00', 12, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844288', NULL, '2023-03-21 23:27:18.844288', 1),
(32, 'Microsoft Surface', 'Surface', 'Surf_202211', 'Microsoft', '1500.00', 24, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844305', NULL, '2023-03-21 23:27:18.844305', 1),
(33, 'Dell Latitude 7490', 'Personnal Computer', 'LAT_7490', 'Dell', '1200.00', 12, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844317', NULL, '2023-03-21 23:27:18.844317', 1),
(34, 'Dell UltraSharp U3415W', 'Monitor', 'Dell_LIT_U3415W', 'Dell', '835.00', 12, NULL, NULL, '0.00', NULL, '2023-03-21 23:27:18.844335', NULL, '2023-03-21 23:27:18.844335', 1),
(36, 'XPS 15', 'Laptop', '9570', 'Dell', '2390.00', 12, NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 00:33:05.400813', NULL, '2023-04-04 00:33:05.388620', 1),
(37, 'HP ProBook', 'Laptop', 'HP ProBook 640 G5', 'HP', '950.00', 12, NULL, NULL, NULL, 'e524e3e7-dbf5-441e-8eb2-c2d1defa7031', '2023-04-04 01:08:01.498957', NULL, '2023-04-04 01:08:01.496224', 1),
(39, 'HP Pavilion', 'Laptop', 'HP Pavilion-eg0021nr', 'HP', '825.00', 12, NULL, NULL, NULL, 'e524e3e7-dbf5-441e-8eb2-c2d1defa7031', '2023-04-04 01:12:24.919968', NULL, '2023-04-04 01:12:24.917272', 1),
(41, 'MacBook Pro16 po', 'Laptop', 'MVVJ2xx/A', 'Apple', '3950.00', 12, NULL, NULL, NULL, '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 01:31:05.088827', NULL, '2023-04-04 01:31:04.876447', 1),
(42, 'TEST_YD', 'Laptop', 'TEST_1', 'YD', '200.00', 12, '2027-04-04 04:00:00.000000', '2023-04-04 08:00:00.000000', '2000.00', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:09:56.930550', '33338c07-653a-49e0-bf1c-9c0892140034', '2023-04-04 04:12:22.378142', 1);

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`Id`, `CreatedBy`, `CreatorId`, `CreatedAt`, `UpdatedBy`, `UpdaterId`, `UpdatedAt`, `Active`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('0c8d25ef-494c-471e-940f-e15c3e27be64', NULL, NULL, '0001-01-01 00:00:00.000000', NULL, NULL, '0001-01-01 00:00:00.000000', 1, 'Admin', NULL, '058f3d1f-bf27-4fe5-be38-b6a91aea8547'),
('3bda053a-814f-469c-9c22-8718e387c760', NULL, NULL, '0001-01-01 00:00:00.000000', NULL, NULL, '0001-01-01 00:00:00.000000', 1, 'Responsable', NULL, 'af669960-9d72-44b0-935d-10bbc76d6422');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `FullName`, `Active`, `RefreshToken`, `RefreshTokenExpiryTime`, `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('33338c07-653a-49e0-bf1c-9c0892140034', 'respo', 1, 'a17079c0-dcbc-48bc-80dd-ff3cb324b2ed', '0001-01-01 00:00:00.000000', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-28 04:13:23.295811', NULL, '2023-03-28 04:13:23.295811', 'respo@default.com', 'RESPO@DEFAULT.COM', 'respo@default.com', 'RESPO@DEFAULT.COM', 0, 'AQAAAAEAACcQAAAAEB7l08jamRJsXwr8auJCOkz+KNusmOA6mP/K3XcT7J/lY42Gji5wMSs0zEWLj8S6Vw==', 'JW4JKLFKIRJDCMIKV2A256FWK3GC2TCA', 'fff68bc5-c5de-406b-ac0e-5803804d2f25', NULL, 0, 0, NULL, 1, 0),
('562486a1-5318-4fc3-ae00-c0940bb8f078', 'membre', 1, '6c43344e-bf4e-4a3a-8d44-ba8c56f8488f', '0001-01-01 00:00:00.000000', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-28 04:13:51.865857', NULL, '2023-03-28 04:13:51.865857', 'membre@default.com', 'MEMBRE@DEFAULT.COM', 'membre@default.com', 'MEMBRE@DEFAULT.COM', 0, 'AQAAAAEAACcQAAAAENGVUELW55eCKUtKOKiB+rY9EX4mTts8ySH6sivDOb/aW37qE2uG+v3izXo9L8Z3cA==', 'S6YKBXGBLYEV5NPY6XNTD2MQGLH3FXGA', '675ade9c-5c60-49ea-8c4c-1109255b10ef', NULL, 0, 0, NULL, 1, 0),
('b5756e95-e1da-4963-90ad-a32da62ef8ac', 'DefaultAdmin', 1, '4dc98339-d2ba-469b-9207-cecb1152f7c1', '2023-04-19 14:07:41.330163', NULL, '2023-03-20 14:07:40.646966', NULL, '0001-01-01 00:00:00.000000', 'default', 'DEFAULT', 'admin@default.com', 'ADMIN@DEFAULT.COM', 1, 'AQAAAAEAACcQAAAAEEWCNOeVvC9m9TXEAwgtXxlC8GYi9eQxkwQKBT5o+goKo0ar0VejgOpkqQcQ8uQmPg==', 'KMJM4BAHFBAA3MBLAODE3EKWP52HE2HP', '813a2a26-bcf2-4330-88b1-d65401f76c8a', NULL, 0, 0, NULL, 1, 0),
('be87fe6e-6fa8-4b82-97eb-847ff76754c2', 'Omar Bencharef', 1, 'ed251cb9-92d4-4ef8-a17f-89496dd3e3e1', '0001-01-01 00:00:00.000000', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-27 22:36:57.397902', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-03-27 22:36:57.397902', 'omar.bencharef@gmail.com', 'OMAR.BENCHAREF@GMAIL.COM', 'omar.bencharef@gmail.com', 'OMAR.BENCHAREF@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAEFQyL1+vA6Iv9v04eUR2AVDY9HZXeLIblrpx5gC4NkKRFia3doAzb/ISsWKqhAGtUg==', 'DP42MAOFFU6PZMO5YRIVM3WCYQJXGDBB', 'ad97d6d1-fa34-4986-bc6f-cd32a60ef176', NULL, 0, 0, NULL, 1, 0),
('e524e3e7-dbf5-441e-8eb2-c2d1defa7031', 'Yvon Day', 1, 'e86c54f9-19d9-4bab-96ed-a72ce0c3508a', '0001-01-01 00:00:00.000000', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-04-03 20:49:41.698720', 'b5756e95-e1da-4963-90ad-a32da62ef8ac', '2023-04-03 20:49:41.698720', 'yvon.day@gmail.com', 'YVON.DAY@GMAIL.COM', 'yvon.day@gmail.com', 'YVON.DAY@GMAIL.COM', 0, 'AQAAAAEAACcQAAAAEMHBSCMlSyLgtGvdbyFgPeCms+EYUiR0Orq2T/FHFzqrMKFRxRGRp82xOA7s0+YWBw==', 'E4MKLVJA36KOUUZFDXNHAES27BBOBV4V', '8f150c73-eed4-4bc9-a3a5-b6fcb87faf38', NULL, 0, 0, NULL, 1, 0);

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`UserId`, `RoleId`) VALUES
('e524e3e7-dbf5-441e-8eb2-c2d1defa7031', '0c8d25ef-494c-471e-940f-e15c3e27be64'),
('b5756e95-e1da-4963-90ad-a32da62ef8ac', '1'),
('e524e3e7-dbf5-441e-8eb2-c2d1defa7031', '1'),
('33338c07-653a-49e0-bf1c-9c0892140034', '2'),
('be87fe6e-6fa8-4b82-97eb-847ff76754c2', '2'),
('562486a1-5318-4fc3-ae00-c0940bb8f078', '3'),
('be87fe6e-6fa8-4b82-97eb-847ff76754c2', '3bda053a-814f-469c-9c22-8718e387c760');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
