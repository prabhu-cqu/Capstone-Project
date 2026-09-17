-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: smartshop_ai
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Laptops','Portable computers for study and everyday work','active','2026-09-13 11:59:26'),(2,'Mobile Devices','Tablets and portable mobile technology','active','2026-09-13 11:59:26'),(3,'Accessories','Computer and study accessories','active','2026-09-13 11:59:26'),(4,'Audio','Headphones and audio equipment','active','2026-09-13 11:59:26');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'HP Pavilion 15','A versatile laptop suitable for university study, office work and everyday productivity.',999.00,12,'{\"ram\": \"16GB\", \"brand\": \"HP\", \"screen\": \"15.6 inch\", \"storage\": \"512GB SSD\"}','active','2026-09-13 11:59:26','2026-09-16 03:44:41','/images/products/hp-pavilion-15.png'),(2,2,'Samsung Galaxy Tab A9','A compact tablet suitable for study, streaming and everyday mobile use.',349.00,18,'{\"brand\": \"Samsung\", \"screen\": \"8.7 inch\", \"storage\": \"128GB\", \"connection\": \"Wi-Fi\"}','active','2026-09-13 11:59:26','2026-09-13 11:59:26',NULL),(3,3,'Logitech K380 Keyboard','Compact Bluetooth keyboard suitable for study and multi-device use.',69.95,25,'{\"brand\": \"Logitech\", \"feature\": \"Multi-device\", \"connection\": \"Bluetooth\"}','active','2026-09-13 11:59:26','2026-09-16 03:44:41','/images/products/logitech-k380-keyboard.jpg'),(4,3,'Anker 65W USB-C Charger','Fast USB-C charger suitable for compatible laptops, tablets and smartphones.',79.95,30,'{\"brand\": \"Anker\", \"power\": \"65W\", \"connection\": \"USB-C\"}','active','2026-09-13 11:59:26','2026-09-13 11:59:26',NULL),(5,3,'HP Adjustable Laptop Stand','Adjustable laptop stand designed to improve desk ergonomics and airflow.',54.95,20,'{\"brand\": \"HP\", \"feature\": \"Adjustable\", \"material\": \"Aluminium\"}','active','2026-09-13 11:59:26','2026-09-13 11:59:26',NULL),(6,4,'JBL Tune 520BT Headphones','Wireless Bluetooth headphones designed for study, music and online meetings.',89.00,22,'{\"brand\": \"JBL\", \"feature\": \"Wireless\", \"connection\": \"Bluetooth\"}','active','2026-09-13 11:59:26','2026-09-13 11:59:26',NULL),(7,3,'Belkin USB-C Hub','Multi-port USB-C hub for connecting displays, storage and other peripherals.',64.95,16,'{\"brand\": \"Belkin\", \"ports\": \"USB-C, USB-A, HDMI\", \"connection\": \"USB-C\"}','active','2026-09-13 11:59:26','2026-09-16 03:44:41','/images/products/belkin-usb-c-hub.jpg'),(8,3,'Microsoft Bluetooth Mouse','Compact wireless mouse suitable for study, work and travel.',39.95,35,'{\"brand\": \"Microsoft\", \"feature\": \"Portable\", \"connection\": \"Bluetooth\"}','active','2026-09-13 11:59:26','2026-09-16 03:43:04','/images/products/mouse.jpg'),(9,1,'Lenovo IdeaPad Slim 3','A lightweight laptop suitable for university study, everyday productivity and web browsing.',749.00,15,'{\"ram\": \"8GB\", \"brand\": \"Lenovo\", \"screen\": \"15.6 inch\", \"storage\": \"512GB SSD\"}','active','2026-09-16 03:46:31','2026-09-16 03:46:31',NULL),(10,1,'ASUS VivoBook 15','A versatile laptop designed for study, productivity and everyday computing.',1199.00,10,'{\"ram\": \"16GB\", \"brand\": \"ASUS\", \"screen\": \"15.6 inch\", \"storage\": \"512GB SSD\"}','active','2026-09-16 03:46:31','2026-09-16 03:46:31',NULL),(11,2,'Apple iPad 11-inch','A portable tablet suitable for study, note taking, entertainment and everyday mobile use.',599.00,14,'{\"brand\": \"Apple\", \"screen\": \"11 inch\", \"storage\": \"128GB\", \"connection\": \"Wi-Fi\"}','active','2026-09-16 03:46:31','2026-09-16 03:46:31',NULL),(12,2,'Lenovo Tab M11','An affordable tablet suitable for study, reading, streaming and everyday use.',299.00,20,'{\"brand\": \"Lenovo\", \"screen\": \"11 inch\", \"storage\": \"128GB\", \"connection\": \"Wi-Fi\"}','active','2026-09-16 03:46:31','2026-09-16 03:46:31',NULL),(13,4,'Sony WH-CH520 Headphones','Wireless Bluetooth headphones suitable for music, study and online meetings.',79.00,18,'{\"brand\": \"Sony\", \"feature\": \"Wireless\", \"connection\": \"Bluetooth\"}','active','2026-09-16 03:46:31','2026-09-16 03:46:31',NULL),(14,4,'Logitech H390 USB Headset','A wired USB headset with microphone suitable for online classes, meetings and study.',49.95,25,'{\"brand\": \"Logitech\", \"feature\": \"Built-in microphone\", \"connection\": \"USB\"}','active','2026-09-16 03:46:31','2026-09-16 03:46:31',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-17 15:26:19
