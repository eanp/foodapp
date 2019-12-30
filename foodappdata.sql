-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5332
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for foodapp
CREATE DATABASE IF NOT EXISTS `foodapp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `foodapp`;

-- Dumping structure for table foodapp.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL DEFAULT '0',
  `id_item` int(11) NOT NULL DEFAULT '0',
  `item_quantity` int(11) NOT NULL DEFAULT '0',
  `is_active` int(11) NOT NULL DEFAULT '0',
  `rating` int(11) DEFAULT '0',
  `review` varchar(50) DEFAULT '0',
  `created_cart_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_cart_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_feedback_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.carts: ~2 rows (approximately)
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` (`id`, `id_user`, `id_item`, `item_quantity`, `is_active`, `rating`, `review`, `created_cart_on`, `updated_cart_on`, `created_feedback_on`) VALUES
	(1, 7, 1, 2, 1, 4, 'good', '2019-12-24 20:53:24', '2019-12-29 19:45:44', '2019-12-25 22:57:40'),
	(2, 7, 1, 5, 1, 2, 'no good', '2019-12-25 22:58:10', '2019-12-29 19:45:40', '2019-12-25 22:58:29');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;

-- Dumping structure for table foodapp.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.category: ~21 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `category`) VALUES
	(1, 'Drinks'),
	(2, 'Snack'),
	(3, 'Sweets'),
	(4, 'Various Rice'),
	(5, 'Chicken and Duck'),
	(6, 'Fastfood'),
	(7, 'Bread'),
	(8, 'Japan'),
	(9, 'Meatballs and Soup'),
	(10, 'Noodle'),
	(11, 'Korea'),
	(12, 'Coffee'),
	(13, 'Martabak'),
	(14, 'Pizza and Pasta'),
	(15, 'China'),
	(16, 'Satay'),
	(17, 'West'),
	(18, 'Seafood'),
	(19, 'Middle East'),
	(20, 'Thailand'),
	(21, 'India');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table foodapp.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemname` varchar(50) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `image` varchar(50) DEFAULT '0',
  `description` varchar(50) DEFAULT '0',
  `category` int(11) DEFAULT '0',
  `restaurant_id` int(11) DEFAULT '0',
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.items: ~21 rows (approximately)
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`id`, `itemname`, `price`, `image`, `description`, `category`, `restaurant_id`, `created_on`, `updated_on`) VALUES
	(1, 'Fried Chicken', 13000, '0', 'West Fried Chicken MCD', 5, 1, '2019-12-23 23:13:44', '2019-12-23 23:13:45'),
	(2, 'Fried Fries', 6000, '0', 'West Fried Fries MCD', 17, 1, '2019-12-23 23:13:45', '2019-12-23 23:13:51'),
	(3, 'Chess Burger', 12000, '0', 'West Berger with Chesse MCD', 17, 1, '2019-12-23 23:13:46', '2019-12-23 23:13:51'),
	(4, 'Mc Flurry', 5000, '0', 'Special Ice Cream', 1, 1, '2019-12-23 23:13:47', '2019-12-23 23:13:52'),
	(5, 'Beef Pizza', 20000, '0', 'Pizza with beef', 14, 2, '2019-12-23 23:13:48', '2019-12-23 23:13:57'),
	(6, 'Cheese Pizza', 15000, '0', 'Pizza with cheese', 14, 2, '2019-12-23 23:13:55', '2019-12-23 23:13:54'),
	(7, 'Personal Pizza', 10000, '0', 'small pizza', 14, 2, '2019-12-23 23:13:58', '2019-12-23 23:13:51'),
	(8, 'Coca Cola', 4000, '0', 'drink soda', 1, 2, '2019-12-23 23:13:54', '2019-12-23 23:13:51'),
	(9, 'Ayam Geprek Nasi', 21000, '0', 'Local chicken with rice', 5, 3, '2019-12-23 23:13:48', '2019-12-23 23:13:50'),
	(10, 'Ayam Geprek Mie', 22000, '0', 'Local chicken with noodle', 5, 3, '2019-12-23 23:13:52', '2019-12-23 23:13:46'),
	(11, 'Tempe Geprek', 7000, '0', 'Local food', 2, 3, '2019-12-23 23:13:50', '2019-12-23 23:13:44'),
	(12, 'Bensu Drink', 8000, '0', 'Local drink', 1, 3, '2019-12-23 23:13:53', '2019-12-23 23:13:43'),
	(13, 'Yakiniku', 16000, '0', 'Japan beef food', 8, 4, '2019-12-23 23:13:52', '2019-12-23 23:13:49'),
	(14, 'Teriyaki', 17000, '0', 'Japan chicken food', 8, 4, '2019-12-23 23:13:53', '2019-12-23 23:13:48'),
	(15, 'Hokben hemat', 14000, '0', 'Japan personal food', 8, 4, '2019-12-23 23:13:54', '2019-12-23 23:13:57'),
	(16, 'Macha tea', 11000, '0', 'Japan tea', 1, 4, '2019-12-23 23:13:39', '2019-12-23 23:13:57'),
	(17, 'Ice Latte', 9000, '0', 'Coffee latte', 12, 5, '2019-12-23 23:13:51', '2019-12-23 23:13:56'),
	(18, 'Ice Americano', 9500, '0', 'Coffe America', 12, 5, '2019-12-23 23:13:51', '2019-12-23 23:13:56'),
	(19, 'Hot Expresso', 10500, '0', 'Extreeme Coffee for Programmer Only', 12, 5, '2019-12-23 23:13:37', '2019-12-23 23:13:52'),
	(20, 'Coffe Regal', 11500, '0', 'Kids Coffee', 12, 5, '2019-12-23 23:13:33', '2019-12-23 23:13:56'),
	(21, 'Janji jiwa Toast', 12500, '0', 'Best Snack from janji jiwa', 2, 5, '2019-12-23 23:13:33', '2019-12-23 23:13:49');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Dumping structure for table foodapp.restaurants
CREATE TABLE IF NOT EXISTS `restaurants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `description` varchar(50) NOT NULL DEFAULT '0',
  `image` varchar(50) DEFAULT '0',
  `longtitude` varchar(50) DEFAULT '0',
  `latitude` varchar(50) DEFAULT '0',
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.restaurants: ~5 rows (approximately)
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` (`id`, `name`, `user_id`, `description`, `image`, `longtitude`, `latitude`, `created_on`, `updated_on`) VALUES
	(1, 'mcdonald', 2, 'west fast food', 'mekdi.jpg', '0', '0', '2019-12-25 13:24:36', '2019-12-25 13:32:29'),
	(2, 'pizza', 3, 'italian food', 'pizza.jpg', '0', '0', '2019-12-26 10:01:25', '2019-12-26 10:01:25'),
	(3, 'bensu', 4, 'local food', 'bensu.jpg', '0', '0', '2019-12-25 19:06:52', '2019-12-25 19:06:52'),
	(4, 'hokben', 5, 'japan food', 'hokben.jpg', '0', '0', '2019-12-25 19:07:31', '2019-12-25 19:07:31'),
	(5, 'janji jiwa', 6, 'Cofee cafe', 'janjijiwa.jpg', '0', '0', '2019-12-25 19:08:43', '2019-12-25 19:08:43');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;

-- Dumping structure for table foodapp.revoked_token
CREATE TABLE IF NOT EXISTS `revoked_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL DEFAULT '0',
  `is_revoked` int(11) NOT NULL DEFAULT '0',
  `created_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.revoked_token: ~3 rows (approximately)
/*!40000 ALTER TABLE `revoked_token` DISABLE KEYS */;
INSERT INTO `revoked_token` (`id`, `token`, `is_revoked`, `created_on`, `updated_on`) VALUES
	(1, '0', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc3NTQ1ODM0fQ.kuXf6LxLtCOR-7QK_lmRZMq4w_2XONNgXaB_pv8PZEg', 0, '2019-12-28 22:10:35', '2019-12-28 22:10:35'),
	(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE1Nzc2MjI4MDN9.pk9DugPRIOzaXVtUGcn4EeR7E2DvU6x0AeiyYHo2UqE', 0, '2019-12-29 19:33:24', '2019-12-29 19:33:24');
/*!40000 ALTER TABLE `revoked_token` ENABLE KEYS */;

-- Dumping structure for table foodapp.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.roles: ~3 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`role_id`, `role`) VALUES
	(1, 'admin'),
	(2, 'restaurant'),
	(3, 'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table foodapp.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table foodapp.users: ~7 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `role_id`, `created_on`, `updated_on`) VALUES
	(1, 'admin', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 1, '2019-12-23 23:13:43', '2019-12-23 23:13:43'),
	(2, 'mcdonald', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 2, '2019-12-23 23:37:03', '2019-12-23 23:37:03'),
	(3, 'pizza', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 2, '2019-12-24 07:02:50', '2019-12-24 07:02:50'),
	(4, 'bensu', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 2, '2019-12-25 13:43:38', '2019-12-25 13:43:38'),
	(5, 'hokben', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 2, '2019-12-25 13:43:38', '2019-12-25 13:43:38'),
	(6, 'janjijiwa', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 2, '2019-12-24 07:13:44', '2019-12-24 07:36:28'),
	(7, 'user', '$2a$10$qB6bg8Ba.MwHOPDdIM4Zs.kZpJWYANSGEI.GrPg7NRdzMFCaAqdz2', 3, '2019-12-23 23:13:43', '2019-12-23 23:13:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
