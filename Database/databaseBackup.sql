-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: CombinedCalendars
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `CombinedCalendars`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `CombinedCalendars` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `CombinedCalendars`;

--
-- Table structure for table `administrators`
--

DROP TABLE IF EXISTS `administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrators` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `user` (`user`),
  CONSTRAINT `administrators_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrators`
--

LOCK TABLES `administrators` WRITE;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar_settings`
--

DROP TABLE IF EXISTS `calendar_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(63) DEFAULT NULL,
  `url_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `calendar_settings_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_settings`
--

LOCK TABLES `calendar_settings` WRITE;
/*!40000 ALTER TABLE `calendar_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendar_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_notification_settings`
--

DROP TABLE IF EXISTS `email_notification_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_notification_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(63) DEFAULT NULL,
  `user_responses` tinyint(1) DEFAULT (0),
  `event_availabilities` tinyint(1) DEFAULT (0),
  `event_finalisations` tinyint(1) DEFAULT (0),
  `event_cancellations` tinyint(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `email_notification_settings_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_notification_settings`
--

LOCK TABLES `email_notification_settings` WRITE;
/*!40000 ALTER TABLE `email_notification_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_notification_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_invite`
--

DROP TABLE IF EXISTS `event_invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_invite` (
  `event_name` varchar(63) NOT NULL,
  `invited_guest` varchar(63) NOT NULL,
  `response` tinyint(1) DEFAULT (0),
  PRIMARY KEY (`event_name`,`invited_guest`),
  KEY `invited_guest` (`invited_guest`),
  CONSTRAINT `event_invite_ibfk_1` FOREIGN KEY (`event_name`) REFERENCES `events` (`event_name`) ON DELETE CASCADE,
  CONSTRAINT `event_invite_ibfk_2` FOREIGN KEY (`invited_guest`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_invite`
--

LOCK TABLES `event_invite` WRITE;
/*!40000 ALTER TABLE `event_invite` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_invite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `creator` varchar(63) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `event_description` varchar(1000) DEFAULT NULL,
  `event_date` varchar(100) DEFAULT NULL,
  `event_time` varchar(100) DEFAULT NULL,
  `street_number` int DEFAULT NULL,
  `street_name` varchar(100) DEFAULT NULL,
  `suburb` varchar(100) DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `event_state` varchar(100) DEFAULT NULL,
  `event_country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`event_name`),
  UNIQUE KEY `event_name` (`event_name`),
  KEY `creator` (`creator`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('SimSol123','Basketball Game','Come join us on the 16th of June for our debut match!','2022-06-10','16:00:00',15,'Bilyara Road','Tanunda',5033,'South Australia','Australia'),('Admin','Test','Description','2022-06-09','00:00:00',1,'Daphne','Morphett',5162,'SA','Australia'),('Admin','Testdfghj','description','2022-06-09','00:00:00',1,'test','Morphett',5282,'SA','Australua');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `external_account_links`
--

DROP TABLE IF EXISTS `external_account_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `external_account_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(63) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT (NULL),
  `instagram_url` varchar(255) DEFAULT (NULL),
  `twitter_url` varchar(255) DEFAULT (NULL),
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `external_account_links_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `external_account_links`
--

LOCK TABLES `external_account_links` WRITE;
/*!40000 ALTER TABLE `external_account_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `external_account_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `friend1` varchar(63) NOT NULL,
  `friend2` varchar(63) NOT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`friend1`,`friend2`),
  KEY `friend2` (`friend2`),
  CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`friend1`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`friend2`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(63) NOT NULL,
  `password` varchar(255) NOT NULL,
  `github_id` varchar(63) DEFAULT NULL,
  `given_name` varchar(63) DEFAULT NULL,
  `middle_name` varchar(63) DEFAULT NULL,
  `last_name` varchar(63) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f',NULL,'','','','csacasc',''),('Admin','5e3b7cf16b9d701dd4dd4536095731b1ccff0e9a5a00a68a7ec30f00',NULL,'Admin','Admin','Admin','Admin@Admin.com','1234567890'),('j','fcd074cdd4c6e02b5dbe28f33858f8ed6d3e9e5ca5ff873f07371f3f',NULL,'J','N','H','j@h.com','88888888'),('James','f8cdb04495ded47615258f9dc6a3f4707fd2405434fefc3cbf4ef4e6',NULL,'James','','Hutchins','jameshutchins64@gmail.com','0447135210'),('p','e22bd066f428b7a77a1b936f99c1f4c117b856705d8f90379579f1e9',NULL,'p','','k','p','0'),('SimSol123','489854666b057109a51aa1ad9f7c5dae26f10d4f36f9849ddf98a7eb',NULL,'Simeon','Vels','Solomou','wsupsimo@gmail.com','0422994516');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10  1:57:02
