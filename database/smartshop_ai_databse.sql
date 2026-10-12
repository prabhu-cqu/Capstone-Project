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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  UNIQUE KEY `uq_cart_product` (`cart_id`,`product_id`),
  KEY `fk_cart_items_product` (`product_id`),
  CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_cart_items_quantity` CHECK ((`quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,1,4,1),(10,9,11,1),(11,11,10,2),(13,12,31,1);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `status` enum('active','completed','abandoned') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,5,'completed','2026-09-17 15:46:02','2026-09-26 03:35:27'),(9,3,'completed','2026-10-04 07:34:41','2026-10-05 05:07:48'),(10,11,'active','2026-10-04 08:25:37','2026-10-04 08:25:37'),(11,12,'completed','2026-10-07 03:41:40','2026-10-07 03:41:50'),(12,13,'completed','2026-10-07 04:44:40','2026-10-07 04:44:51');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Laptops','Portable computers for study and everyday work','active','2026-09-13 11:59:26'),(2,'Mobile Devices','Tablets and portable mobile technology','active','2026-09-13 11:59:26'),(3,'Accessories','Computer and study accessories','active','2026-09-13 11:59:26'),(4,'Audio','Headphones and audio equipment','active','2026-09-13 11:59:26'),(5,'gaming',NULL,'active','2026-09-28 02:58:58');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_order_items_order` (`order_id`),
  KEY `fk_order_items_product` (`product_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_order_items_quantity` CHECK ((`quantity` > 0)),
  CONSTRAINT `chk_order_items_subtotal` CHECK ((`subtotal` >= 0)),
  CONSTRAINT `chk_order_items_unit_price` CHECK ((`unit_price` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,4,1,79.95,79.95),(2,2,4,1,79.95,79.95),(3,3,4,1,79.95,79.95),(4,4,11,1,599.00,599.00),(5,5,11,1,599.00,599.00),(6,6,11,1,599.00,599.00),(7,7,10,2,1199.00,2398.00),(8,8,31,1,1999.00,1999.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','confirmed','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_user` (`user_id`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_orders_total` CHECK ((`total_amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,5,'2026-09-23 04:25:33','confirmed',79.95),(2,5,'2026-09-23 04:43:04','completed',79.95),(3,5,'2026-09-26 03:35:27','completed',79.95),(4,3,'2026-10-04 07:36:16','confirmed',599.00),(5,3,'2026-10-04 08:06:55','completed',599.00),(6,3,'2026-10-05 05:07:48','confirmed',599.00),(7,12,'2026-10-07 03:41:50','confirmed',2398.00),(8,13,'2026-10-07 04:44:51','confirmed',1999.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `specifications` json DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_products_category` (`category_id`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_products_price` CHECK ((`price` >= 0)),
  CONSTRAINT `chk_products_stock` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'HP Pavilion 15','A versatile laptop suitable for university study, office work and everyday productivity.',999.00,12,'{\"ram\": \"16GB\", \"brand\": \"HP\", \"screen\": \"15.6 inch\", \"storage\": \"512GB SSD\"}','active','2026-09-13 11:59:26','2026-09-16 03:44:41','/images/products/hp-pavilion-15.png'),(2,2,'Samsung Galaxy Tab A9','A compact tablet suitable for study, streaming and everyday mobile use.',349.00,18,'{\"brand\": \"Samsung\", \"screen\": \"8.7 inch\", \"storage\": \"128GB\", \"connection\": \"Wi-Fi\"}','active','2026-09-13 11:59:26','2026-10-04 08:57:27','/images/products/samsung-galaxy-tab-a9-1791104247897.jpg'),(3,3,'Logitech K380 Keyboard','Compact Bluetooth keyboard suitable for study and multi-device use.',69.95,25,'{\"brand\": \"Logitech\", \"feature\": \"Multi-device\", \"connection\": \"Bluetooth\"}','active','2026-09-13 11:59:26','2026-09-16 03:44:41','/images/products/logitech-k380-keyboard.jpg'),(4,3,'Anker 65W USB-C Charger','Fast USB-C charger suitable for compatible laptops, tablets and smartphones.',79.95,27,'{\"brand\": \"Anker\", \"power\": \"65W\", \"connection\": \"USB-C\"}','active','2026-09-13 11:59:26','2026-10-04 08:58:50','/images/products/anker-65w-usb-c-charger-1791104330247.jpeg'),(5,3,'HP Adjustable Laptop Stand','Adjustable laptop stand designed to improve desk ergonomics and airflow.',54.95,20,'{\"brand\": \"HP\", \"feature\": \"Adjustable\", \"material\": \"Aluminium\"}','active','2026-09-13 11:59:26','2026-10-07 02:07:04','/images/products/hp-adjustable-laptop-stand-1791338824871.jpeg'),(6,4,'JBL Tune 520BT Headphones','Wireless Bluetooth headphones designed for study, music and online meetings.',89.00,22,'{\"brand\": \"JBL\", \"feature\": \"Wireless\", \"connection\": \"Bluetooth\"}','active','2026-09-13 11:59:26','2026-10-04 08:59:16','/images/products/jbl-tune-520bt-headphones-1791104356755.png'),(7,3,'Belkin USB-C Hub','Multi-port USB-C hub for connecting displays, storage and other peripherals.',64.95,16,'{\"brand\": \"Belkin\", \"ports\": \"USB-C, USB-A, HDMI\", \"connection\": \"USB-C\"}','active','2026-09-13 11:59:26','2026-10-04 08:57:48','/images/products/belkin-usb-c-hub-1791104268270.jpg'),(8,3,'Microsoft Bluetooth Mouse','Compact wireless mouse suitable for study, work and travel.',39.95,35,'{\"brand\": \"Microsoft\", \"feature\": \"Portable\", \"connection\": \"Bluetooth\"}','active','2026-09-13 11:59:26','2026-10-04 08:57:36','/images/products/microsoft-bluetooth-mouse-1791104256943.png'),(9,1,'Lenovo IdeaPad Slim 3','A lightweight laptop suitable for university study, everyday productivity and web browsing.',749.00,15,'{\"ram\": \"8GB\", \"brand\": \"Lenovo\", \"screen\": \"15.6 inch\", \"storage\": \"512GB SSD\"}','active','2026-09-16 03:46:31','2026-10-04 09:01:09','/images/products/lenovo-ideapad-slim-3-1791104469830.jpeg'),(10,1,'ASUS VivoBook 15','A versatile laptop designed for study, productivity and everyday computing.',1199.00,8,'{\"ram\": \"16GB\", \"brand\": \"ASUS\", \"screen\": \"15.6 inch\", \"storage\": \"512GB SSD\"}','active','2026-09-16 03:46:31','2026-10-07 03:41:50','/images/products/hp-pavilion-15-1791104225256.png'),(11,2,'Apple iPad 11-inch','A portable tablet suitable for study, note taking, entertainment and everyday mobile use.',599.00,11,'{\"brand\": \"Apple\", \"screen\": \"11 inch\", \"storage\": \"128GB\", \"connection\": \"Wi-Fi\"}','active','2026-09-16 03:46:31','2026-10-05 05:07:48','/images/products/apple-ipad-11-inch-1791104280272.jpg'),(12,2,'Lenovo Tab M11','An affordable tablet suitable for study, reading, streaming and everyday use.',299.00,20,'{\"brand\": \"Lenovo\", \"screen\": \"11 inch\", \"storage\": \"128GB\", \"connection\": \"Wi-Fi\"}','active','2026-09-16 03:46:31','2026-10-04 09:01:25','/images/products/lenovo-tab-m11-1791104485364.jpeg'),(13,4,'Sony WH-CH520 Headphones','Wireless Bluetooth headphones suitable for music, study and online meetings.',79.00,18,'{\"brand\": \"Sony\", \"feature\": \"Wireless\", \"connection\": \"Bluetooth\"}','active','2026-09-16 03:46:31','2026-10-04 08:58:20','/images/products/sony-wh-ch520-headphones-1791104300794.jpg'),(14,4,'Logitech H390 USB Headset','A wired USB headset with microphone suitable for online classes, meetings and study.',49.95,25,'{\"brand\": \"Logitech\", \"feature\": \"Built-in microphone\", \"connection\": \"USB\"}','active','2026-09-16 03:46:31','2026-10-07 02:07:33','/images/products/logitech-h390-usb-headset-1791104319668-1791338853781.jpeg'),(31,2,'Apple iPhone 17 Pro','Premium Apple smartphone with a 6.3-inch Super Retina XDR display, A19 Pro chip, advanced 48MP Pro Fusion camera system and 5G connectivity.',1999.00,89,'{\"details\": \"Brand: Apple\\nModel: iPhone 17 Pro\\nColour: Blue\\nStorage: 256GB\\nDisplay: 6.3 inch\\nConnection: 5G\"}','active','2026-10-05 05:16:42','2026-10-07 04:44:51','/images/products/iphone-17-pro-1791255032281.jpeg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci,
  `review_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`review_id`),
  KEY `fk_reviews_product` (`product_id`),
  KEY `fk_reviews_user` (`user_id`),
  CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_reviews_rating` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,5,'Fast for everyday study tasks and the screen is clear.','2026-09-21 04:05:06','approved'),(2,1,2,4,'Good performance for university work and smooth multitasking.','2026-09-21 04:05:06','approved'),(3,1,3,2,'The laptop performs well but the battery life was shorter than I expected.','2026-09-21 04:05:06','approved'),(4,1,4,3,'The performance is good, but I found the laptop a little heavy to carry every day.','2026-09-21 04:05:06','approved'),(5,3,1,5,'The keyboard is compact and easy to carry for study.','2026-09-21 04:05:06','approved'),(6,3,2,5,'I like the compact size and it is convenient to carry in my bag.','2026-09-21 04:05:06','approved'),(7,4,5,4,'The charger works well and charges my device quickly.','2026-09-21 04:05:06','approved'),(8,6,1,2,'The headphones become uncomfortable after wearing them for a long time.','2026-09-21 04:22:58','approved'),(9,6,2,2,'The sound is acceptable, but the headphones feel uncomfortable during long study sessions.','2026-09-21 04:22:58','approved'),(10,6,3,1,'I found the headphones uncomfortable to wear for extended periods and the fit was too tight for me.','2026-09-21 04:22:58','approved'),(14,10,12,5,'Great laptop for university study. It is fast, easy to use and works well for everyday tasks.','2026-10-07 04:10:28','approved'),(15,31,13,4,'it was ggod but battery consumption is toomuch soimetime','2026-10-07 04:45:18','approved');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('customer','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `account_status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jack','jack11@gmail.com','$2b$12$1dXIjBpIGBXDwyHr7DXwDe22CWOLOiDwl9t2AuHf8tYM1v2WzKFba','customer','active','2026-09-16 04:13:10'),(2,'jame','jame11@gmail.com','$2b$12$gsq833KzNz0JBrxVwykYM.8qrKoTo8S35xvBHEQF/tf9/4dIFSD3W','customer','active','2026-09-16 04:14:38'),(3,'abc','abc12@gmail.com','$2b$12$9hZYDHiyS9FF.h216K1RzerF2LrW1MjDfjsY419d3ngvH/zwIc4Zi','customer','active','2026-09-16 04:20:21'),(4,'ran','ran12@gmail.com','$2b$12$DCHvyi5.nHLqmfgfwQ.swOWjFe2xBABqUS1qPi./9/AvUjuiqX1Du','customer','active','2026-09-16 04:32:33'),(5,'lages','lages@gmail.com','$2b$12$8MX3MDGMIedpLVSbFApTM.n.YOWKAd1b47b2SZfWuKJGV3SszKlNy','customer','active','2026-09-16 04:38:51'),(6,'admintest','admintest@gmail.com','$2b$12$7wYVyz/FkS5trOg6cYss1eoYDcfowoKLKm/iUph63gEYwCxG/PtXO','admin','active','2026-09-26 04:21:46'),(7,'New Admin','admin2@gmail.com','$2b$12$U6Gfpl0QPiEdonvwztCcl.YGdUZ7w0J4UY9cDi0VuL6bPtP/YDSQO','admin','active','2026-09-30 04:04:23'),(11,'patrick','patrick12345@gmail.com','$2b$12$x5.VjCWqtSZfdyi921NqeOqHPhm7pDQJzqcoPuH2MUoikf8xTl5/O','customer','active','2026-10-04 08:23:42'),(12,'tester1','tester1@gmail.com','$2b$12$JdfFDPpycn3abg1dmqI9C.osKmtpa0lmuhK1.0fnVH1F0KC2igo1i','customer','active','2026-10-07 03:40:06'),(13,'tester2','tester2@gmail.com','$2b$12$ARBc39N3ZgJothutrOY3L.aTQii2JnG6EUpIedJYpMs/3EueKYBuq','customer','active','2026-10-07 03:40:25'),(14,'tester3','tester3@gmail.com','$2b$12$r2rrd7P34jqDoQ7jPiX9j.3KFaOCHx.avTX/o6KZsxG8okCY03PYq','customer','active','2026-10-07 03:40:40'),(15,'tester4','tester4@gmail.com','$2b$12$OlGkTZFYDKh.0/kDLvl9e.iiLamUIZF4vMxWtL4ehOW6cMQ2r7oqi','customer','active','2026-10-07 03:40:54'),(16,'tester5','tester5@gmail.com','$2b$12$.hxXylYbuDCSyU7WhHE7luWkj6hDsB4LIVZPCb9WE.nn8bLot.opa','customer','active','2026-10-07 03:41:10');
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

-- Dump completed on 2026-10-09 21:36:32
