-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2025 at 07:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naawt_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2b$10$/v7PgzdZOiIleZvQV6LxGuNtVSgt54ehNuiUWcAK/28VHBLXeoFei', '2025-11-18 07:02:35', '2025-11-18 07:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `category_slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `category_slug`, `description`, `image_url`, `specifications`, `created_at`, `updated_at`) VALUES
(1, 'truck', 'New Wooden Pallets', 'new-wooden-pallets', 'new', 'http://localhost:5000/9fd9367f-9111-4c4a-9f14-03ed0e1a113b', '\"{\\\"dimensions\\\":\\\"12000\\\",\\\"material\\\":\\\"Wood\\\",\\\"loadCapacity\\\":\\\"522\\\",\\\"weight\\\":\\\"30\\\",\\\"treatment\\\":\\\"heat\\\",\\\"entryPoints\\\":\\\"4-way\\\",\\\"notes\\\":\\\"\\\"}\"', '2025-11-18 07:23:47', '2025-11-18 08:02:05'),
(2, 'wood', 'Pallet Collars & Cases', NULL, 'best', 'http://localhost:5000/0c81f841-2291-462e-86dd-7826b34ea68d', '\"{\\\"dimensions\\\":\\\"4444\\\",\\\"material\\\":\\\"Wood\\\",\\\"loadCapacity\\\":\\\"64\\\",\\\"weight\\\":\\\"3432\\\",\\\"treatment\\\":\\\"heat\\\",\\\"entryPoints\\\":\\\"4-way\\\",\\\"notes\\\":\\\"new\\\"}\"', '2025-11-19 05:08:48', '2025-11-19 05:08:48'),
(3, 'dsd', 'Pallet Collection Service', NULL, 'das', 'http://localhost:5000/cbb26a63-7bf9-4be5-bd0e-e3f73d4d296e', '\"{\\\"dimensions\\\":\\\"dassd\\\",\\\"material\\\":\\\"Wood\\\",\\\"loadCapacity\\\":\\\"dsad\\\",\\\"weight\\\":\\\"sds\\\",\\\"treatment\\\":\\\"sda\\\",\\\"entryPoints\\\":\\\"4-way\\\",\\\"notes\\\":\\\"sad\\\"}\"', '2025-11-19 06:17:33', '2025-11-19 06:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `product_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`product_ids`)),
  `details` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `customer_company` varchar(255) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `special_requirements` varchar(500) DEFAULT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `customer_name`, `customer_email`, `customer_phone`, `product_ids`, `details`, `status`, `created_at`, `updated_at`, `customer_company`, `delivery_date`, `special_requirements`, `address`) VALUES
(1, 'test', 'test@gmail.com', '032025566', NULL, NULL, 'pending', '2025-11-19 05:41:18', '2025-11-19 05:41:18', NULL, NULL, NULL, ''),
(2, 'Usman Zafar', 'usmanzafarofficial125@gmail.com', '03205665392', '[1]', 'new', 'pending', '2025-11-19 06:43:25', '2025-11-19 06:43:25', 'usmanzafarco', '2025-11-20', 'heat', 'Madni colony near saifullah mosque,Mirza Road,Attock Cantt'),
(3, 'jamshaid ali', 'jam@gmail', '265656', '[1]', 'saman chye', 'pending', '2025-11-19 06:44:43', '2025-11-19 06:44:43', 'millioner', '2025-11-20', 'new', 'madni colony ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
