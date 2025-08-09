-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 26, 2024 at 06:12 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tour-booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` binary(16) NOT NULL,
  `content` text,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `admin_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_images`
--

CREATE TABLE `blog_images` (
  `blog_id` binary(16) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` binary(16) NOT NULL,
  `booking_date` datetime(6) DEFAULT NULL,
  `booking_status` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `discount_amount` int DEFAULT NULL,
  `final_price` int DEFAULT NULL,
  `num_people` int DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `promotion_id` binary(16) DEFAULT NULL,
  `tour_id` binary(16) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `qr_base64` varchar(255) DEFAULT NULL,
  `ztranstion_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `booking_date`, `booking_status`, `created_at`, `discount_amount`, `final_price`, `num_people`, `payment_method`, `payment_status`, `total_price`, `updated_at`, `promotion_id`, `tour_id`, `user_id`, `qr_base64`, `ztranstion_id`) VALUES
(0x06aef5a5adac4f679d41927c92da1138, '2024-10-16 20:14:02.860811', 'CREATED', '2024-11-21 20:14:02.860811', 0, 0, 1, 'VNPAY', 'UNPAID', 6610000, NULL, NULL, 0xcf171703059d415f9333245c9cd6478d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x07c9c476c5e944caaa7d9a4c45fd720b, '2024-11-26 19:15:47.943544', 'CANCELED', '2024-11-26 19:15:47.943544', 0, 0, 2, 'ZALO_PAY', 'NOT REFUNDED', 23680, '2024-11-26 19:16:42.295082', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732623373/vz0zowy6fgvofbuqdjgb.png', '241126000010402'),
(0x23a3c7345a0843ac8a85c16967d73d95, '2024-11-23 21:09:26.720556', 'CANCELED', '2024-11-23 21:09:26.720556', 0, 0, 1, 'ZALO_PAY', 'NOT REFUNDED', 16840, '2024-11-23 21:10:43.428023', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732371000/h5sb0vktazwmr7ldqiud.png', '241123000001522'),
(0x3342e30e5030402b843133b2be7f0c39, '1900-01-18 21:05:59.000000', 'PROCCESS', '2024-11-21 20:20:15.108169', 0, 0, 1, 'ZALO_PAY', 'PAIED', 16840, '2024-11-21 20:23:32.876641', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732195407/umiwbyeq7invf6v3bx0w.png', '241121000010373'),
(0x36ff8c987f314a2a99615152804ef20b, '2024-11-21 20:18:06.640757', 'CREATED', '2024-11-21 20:18:06.640757', 0, 0, 1, 'ZALOPAY', 'UNPAID', 6610000, NULL, NULL, 0xcf171703059d415f9333245c9cd6478d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x375c533b3ce64376b9f39640d3717037, '2024-11-26 15:17:58.924459', 'CANCELED', '2024-11-26 15:17:58.924459', 0, 0, 1, 'ZALO_PAY', 'NOT REFUNDED', 16840, '2024-11-26 15:19:33.526080', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732609107/sjkahsxe6t7t19qqk3aj.png', '241126000007075'),
(0x3a46fbadd8024d5891164ef0a65b1ead, '2024-11-21 18:34:49.167778', 'CREATED', '2024-11-21 18:34:49.167778', 0, 0, 1, 'UNPAID', 'UNPAID', 5360000, NULL, NULL, 0x38a799682d904a189c753d7ac9e930c4, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x3fe031b62b8f4663b0e48cf2fd057a05, '2024-11-22 22:16:26.334307', 'PROCCESS', '2024-11-22 22:16:26.334307', 0, 0, 1, 'ZALO_PAY', 'PAIED', 16840, '2024-11-22 22:17:01.554118', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732288615/kz1tvhyczstutbw2nnxr.png', '241122000011699'),
(0x49c3690cdcbd427aaf04f1188f1b877b, '2024-11-21 18:13:01.016116', 'PROCCESS', '2024-11-21 18:13:01.016116', 0, 0, 1, 'ZALO_PAY', 'PAIED', 3100000, '2024-11-21 18:13:30.495809', NULL, 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732187610/qtfazw3yag8b876b880o.png', '241121000009751'),
(0x5a9a95bd56de45318f4a5d3386bf9796, '2024-11-21 22:14:14.248712', 'PROCCESS', '2024-11-21 22:14:14.248712', 0, 0, 1, 'ZALO_PAY', 'PAIED', 16840, '2024-11-21 22:14:46.427247', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732202081/fqjvgohmd8rn6cqsdtea.png', '241121000010738'),
(0x5d8b002dab6b4da796a46817876f61ad, '2024-11-21 19:37:40.473764', 'CREATED', '2024-11-21 19:37:40.473764', 0, 0, 1, 'VNPAY', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x6927b9d3ae6945bca9a5e41a10ed6d39, '2024-11-21 20:08:14.445797', 'CREATED', '2024-11-21 20:08:14.445797', 0, 0, 1, 'VNPAY', 'UNPAID', 6610000, NULL, NULL, 0xcf171703059d415f9333245c9cd6478d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x788b7379a2914897a3aaf77ee71f1424, '2024-11-26 15:24:27.423162', 'PROCCESS', '2024-11-26 15:24:27.423162', 0, 0, 1, 'ZALO_PAY', 'PAIED', 16840, '2024-11-26 15:24:57.243720', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732609491/fzupo7p9uhcwifea2imv.png', '241126000007297'),
(0x79ef4f979b2f4153ae60c9b378de9e65, '2024-11-21 19:20:33.463017', 'CREATED', '2024-11-21 19:20:33.463017', 0, 0, 1, 'UNPAID', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x7ca67b801d9f44a2a7bd1d053592c475, '2024-11-21 22:05:26.757854', 'CANCELED', '2024-11-21 22:05:26.757854', 0, 0, 4, 'ZALO_PAY', 'NOT REFUNDED', 37360, '2024-11-21 22:07:16.555008', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732201556/qqgnxurirtsutcgdilda.png', '241121000010670'),
(0x89856df022934fb3b231366d8cf58ec1, '2024-11-24 19:02:02.282401', 'CREATED', '2024-11-24 19:02:02.282401', 0, 0, 3, 'ZALOPAY', 'UNPAID', 937000, NULL, NULL, 0x99634d465f4142b29ec88bde7fca9764, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x8987f5856d9c459199b8aab5e04ef333, '2024-11-21 20:18:36.238915', 'CREATED', '2024-11-21 20:18:36.238915', 0, 0, 1, 'ZALOPAY', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0x99c49208ef094892ab6a70acf7cb9595, '2024-11-21 18:26:54.393167', 'CREATED', '2024-11-21 18:26:54.393167', 0, 0, 1, 'UNPAID', 'UNPAID', 3100000, NULL, NULL, 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a, NULL, NULL),
(0x99f8747c849d4786a80057fd2b8109c9, '2024-11-21 18:28:37.821302', 'CANCELED', '2024-11-21 18:28:37.821302', 0, 0, 1, 'ZALO_PAY', 'NOT REFUNDED', 5360000, '2024-11-22 22:27:10.329601', NULL, 0x38a799682d904a189c753d7ac9e930c4, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732188866/amyyphctbvi4ctjdjoi4.png', '0'),
(0xa1dcbf0ff0374e4788b3ccce1293dfa8, '2024-11-21 19:38:19.171141', 'CREATED', '2024-11-21 19:38:19.171141', 0, 0, 1, 'ZALOPAY', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0xa471e22009da48ccb05de0488c34a6cb, '2024-11-21 19:39:24.185922', 'CREATED', '2024-11-21 19:39:24.185922', 0, 0, 1, 'ZALOPAY', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0xb12622b7329d4728a81cbd0421a13c5d, '2024-11-24 19:03:28.435049', 'PROCCESS', '2024-11-24 19:03:28.435049', 0, 0, 2, 'ZALO_PAY', 'PAIED', 23680, '2024-11-24 19:03:53.969831', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732449828/juvkaz6hgfzymcvryifn.png', '241124000001184'),
(0xba172a116f254ddeb4518065991962c1, '2024-11-24 19:02:46.270412', 'CREATED', '2024-11-24 19:02:46.270412', 0, 0, 1, 'ZALOPAY', 'UNPAID', 319000, NULL, NULL, 0x99634d465f4142b29ec88bde7fca9764, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0xba68628af88f43e49c7eb7a8be697bee, '2024-11-24 18:59:45.453445', 'PROCCESS', '2024-11-24 18:59:45.453445', 0, 0, 1, 'ZALO_PAY', 'PAIED', 3100000, '2024-11-24 19:00:20.570742', NULL, 0x99634d465f4142b29ec88bde7fca9764, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732449615/mnngeu0ghfcwxfugypdk.png', '0'),
(0xd11ef62a08c044d8ac9b2e1472e1049f, '2024-11-21 19:23:01.433746', 'CREATED', '2024-11-21 19:23:01.433746', 0, 0, 1, 'UNPAID', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0xd977e0720dc14e36a1e901f21e8ee1d5, '2024-11-21 19:36:44.848530', 'CREATED', '2024-11-21 19:36:44.848530', 0, 0, 1, 'vnpay', 'UNPAID', 16840, NULL, NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0xdb7f09e8514e4d8b8a01f593453f5230, '2024-11-22 22:25:56.496590', 'PROCCESS', '2024-11-22 22:25:56.496590', 0, 0, 1, 'ZALO_PAY', 'PAIED', 16840, '2024-11-22 22:26:30.038664', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732289184/u9onh9e1mzrnnjbvsevz.png', '241122000011814'),
(0xee6b9252c6a04a9d95d16f2b1a97e9cc, '2024-11-21 18:35:50.239818', 'CREATED', '2024-11-21 18:35:50.239818', 0, 0, 1, 'UNPAID', 'UNPAID', 3100000, NULL, NULL, 0x99634d465f4142b29ec88bde7fca9764, 0x5deb768ff97643ad84c658c23bbc90ee, NULL, NULL),
(0xf5e858d12c4d4ce29d20d5b5a77f33ee, '2024-11-26 15:25:33.900532', 'PROCCESS', '2024-11-26 15:25:33.900532', 0, 0, 3, 'ZALO_PAY', 'PAIED', 30520, '2024-11-26 15:25:59.862682', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732609553/fmkpjproudfq3sjv30sy.png', '241126000007355'),
(0xf843262e76344f9a8d5ac2003a8e4892, '2024-11-21 22:42:39.276793', 'PROCCESS', '2024-11-21 22:42:39.276793', 0, 0, 4, 'ZALO_PAY', 'PAIED', 26410000, '2024-11-22 18:44:39.179181', NULL, 0xcf171703059d415f9333245c9cd6478d, 0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732275872/w2bjiyktuiotftqypp27.png', '0'),
(0xfcfe8414be7043ea9323cc968272b44a, '2024-11-24 18:58:48.962903', 'PROCCESS', '2024-11-24 18:58:48.962903', 0, 0, 1, 'ZALO_PAY', 'PAIED', 16840, '2024-11-24 18:59:22.605802', NULL, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, 'http://res.cloudinary.com/dcc239rej/image/upload/v1732449557/ls5ladtgd1r0vtme5wql.png', '241124000001173');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` binary(16) NOT NULL,
  `description` text,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `description`, `name`) VALUES
(0x994d294fdc7e45f18f413c3abaa9b854, NULL, 'Tour HOT Trong Nước'),
(0xb343d8fc88094a90a0ca30ba28eef254, NULL, 'Tour HOT Nước Ngoài'),
(0xc24c3286a1964cb2a33fc99b8678db82, NULL, 'Tours Theo Chủ Đề');

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` binary(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tour_count` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `tour_count`) VALUES
(0x3dc5c01d556a478f94ecbebf2717914e, 'Trung Quốc', NULL),
(0x47422aa0261146f4b7cf162c0ecc9b1a, 'Buôn Mê Thuột', NULL),
(0xac2bdcf646614df3a06f5b95a2a76f40, 'Sapa', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` binary(16) NOT NULL,
  `saved_at` datetime(6) DEFAULT NULL,
  `tour_id` binary(16) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` binary(16) NOT NULL,
  `content` text,
  `is_read` bit(1) DEFAULT NULL,
  `sent_at` datetime(6) DEFAULT NULL,
  `receiver_id` binary(16) DEFAULT NULL,
  `sender_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` binary(16) NOT NULL,
  `content` text,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` binary(16) NOT NULL,
  `amount` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `booking_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `amount`, `created_at`, `payment_date`, `payment_method`, `status`, `transaction_id`, `booking_id`) VALUES
(0x00e22c939234438fb8c360ad14b9a41a, 23680, '2024-11-24 19:03:28.553097', '2024-11-24 19:03:28.553097', 'ZALO_PAY', 'PAIED', '241124_1732449808462', 0xb12622b7329d4728a81cbd0421a13c5d),
(0x079352c80c2d4b7aaaef75dc4ba5ac0a, 16840, '2024-11-26 15:17:59.184458', '2024-11-26 15:17:59.184458', 'ZALO_PAY', 'PAIED', '241126_1732609078973', 0x375c533b3ce64376b9f39640d3717037),
(0x0adb5fb6f14c4df98cc9f2c389fcf4f3, 16840, '2024-11-21 22:14:14.506575', '2024-11-21 22:14:14.506575', 'ZALO_PAY', 'PAIED', '241121_1732202054296', 0x5a9a95bd56de45318f4a5d3386bf9796),
(0x0fd345bc6fdb4db9928aa77593fc3636, 3100000, '2024-11-21 18:13:01.374545', '2024-11-21 18:13:01.374545', 'ZALO_PAY', 'PAIED', '241121_1732187581064', 0x49c3690cdcbd427aaf04f1188f1b877b),
(0x1e1f0de9abe048af9888eb80c791a9a1, 30520, '2024-11-26 15:25:34.017307', '2024-11-26 15:25:34.017307', 'ZALO_PAY', 'PAIED', '241126_1732609533932', 0xf5e858d12c4d4ce29d20d5b5a77f33ee),
(0x225f99cc14b24ec288bc7b183f60fe4d, 5360000, '2024-11-21 18:28:37.945482', '2024-11-21 18:28:37.945482', 'ZALO_PAY', 'PAIED', '241121_1732188517854', 0x99f8747c849d4786a80057fd2b8109c9),
(0x2598670c71094b7f9f1828e54cff1446, 3100000, '2024-11-21 18:35:50.350299', '2024-11-21 18:35:50.350299', 'ZALO_PAY', 'CREATED', '241121_1732188950266', 0xee6b9252c6a04a9d95d16f2b1a97e9cc),
(0x3dab1d39e82b47729742358b414a3853, 16840, '2024-11-21 19:22:53.106425', '2024-11-21 19:22:53.105418', 'ZALO_PAY', 'CREATED', '241121_1732191772635', 0x79ef4f979b2f4153ae60c9b378de9e65),
(0x4252ead0362d4621bef083571f52792e, 6610000, '2024-11-21 20:18:07.075761', '2024-11-21 20:18:07.075761', 'ZALO_PAY', 'CREATED', '241121_1732195086688', 0x36ff8c987f314a2a99615152804ef20b),
(0x42fb4b76062f44838247392950582bf6, 16840, '2024-11-21 19:23:01.584245', '2024-11-21 19:23:01.584245', 'ZALO_PAY', 'CREATED', '241121_1732191781486', 0xd11ef62a08c044d8ac9b2e1472e1049f),
(0x49a0691ffdbc452c9341eed6c98a9725, 16840, '2024-11-23 21:09:27.257007', '2024-11-23 21:09:27.257007', 'ZALO_PAY', 'PAIED', '241123_1732370966785', 0x23a3c7345a0843ac8a85c16967d73d95),
(0x4fa965bd665a4c629c656e42bb83d336, 319000, '2024-11-24 19:02:46.467894', '2024-11-24 19:02:46.467894', 'ZALO_PAY', 'CREATED', '241124_1732449766300', 0xba172a116f254ddeb4518065991962c1),
(0x5cfa1377e3be488d9df2e26e8b49eb7a, 3100000, '2024-11-24 18:59:45.569475', '2024-11-24 18:59:45.569475', 'ZALO_PAY', 'PAIED', '241124_1732449585487', 0xba68628af88f43e49c7eb7a8be697bee),
(0x715bef6cdec0457eae9c7d35fa19050b, 16840, '2024-11-22 22:16:26.842286', '2024-11-22 22:16:26.842286', 'ZALO_PAY', 'PAIED', '241122_1732288586449', 0x3fe031b62b8f4663b0e48cf2fd057a05),
(0x7abb3fbbcd6d4c459a4a57286e31a724, 16840, '2024-11-24 18:58:49.390976', '2024-11-24 18:58:49.390976', 'ZALO_PAY', 'PAIED', '241124_1732449529009', 0xfcfe8414be7043ea9323cc968272b44a),
(0x8064873a099e4d209ac6dde9ce08c31a, 16840, '2024-11-21 20:20:29.026287', '2024-11-21 20:20:29.026287', 'ZALO_PAY', 'PAIED', '241121_1732195226347', 0x3342e30e5030402b843133b2be7f0c39),
(0x85ea561f39724a5db94fab4b82c8e24a, 3100000, '2024-11-21 18:26:54.745888', '2024-11-21 18:26:54.745888', 'ZALO_PAY', 'CREATED', '241121_1732188414447', 0x99c49208ef094892ab6a70acf7cb9595),
(0x96ade81375c047128d102f56de8dfb51, 16840, '2024-11-21 19:39:24.347227', '2024-11-21 19:39:24.347227', 'ZALO_PAY', 'CREATED', '241121_1732192764212', 0xa471e22009da48ccb05de0488c34a6cb),
(0xa3321424f46e4c0aa1a8aa9736394d5e, 23680, '2024-11-26 19:15:48.224044', '2024-11-26 19:15:48.224044', 'ZALO_PAY', 'PAIED', '241126_1732623347984', 0x07c9c476c5e944caaa7d9a4c45fd720b),
(0xb9131493e2fb44cea5f171994b51b19a, 16840, '2024-11-21 20:18:36.384915', '2024-11-21 20:18:36.384915', 'ZALO_PAY', 'CREATED', '241121_1732195116273', 0x8987f5856d9c459199b8aab5e04ef333),
(0xbd2623243e9b4b518499e0dc8df8a932, 37360, '2024-11-21 22:05:27.144745', '2024-11-21 22:05:27.144745', 'ZALO_PAY', 'PAIED', '241121_1732201526820', 0x7ca67b801d9f44a2a7bd1d053592c475),
(0xdb566fbeb0df4db99effe87ffa6213ea, 937000, '2024-11-24 19:02:02.412476', '2024-11-24 19:02:02.412476', 'ZALO_PAY', 'CREATED', '241124_1732449722311', 0x89856df022934fb3b231366d8cf58ec1),
(0xe020498b622a44d88cf60ab377718578, 16840, '2024-11-22 22:25:56.652681', '2024-11-22 22:25:56.652681', 'ZALO_PAY', 'PAIED', '241122_1732289156527', 0xdb7f09e8514e4d8b8a01f593453f5230),
(0xe4ae3c8fb65e4fb9abab2a2c738d98a9, 26410000, '2024-11-21 22:42:39.452153', '2024-11-21 22:42:39.452153', 'ZALO_PAY', 'PAIED', '241121_1732203759323', 0xf843262e76344f9a8d5ac2003a8e4892),
(0xf3c53f3944c34368b2941959c68fa434, 16840, '2024-11-21 19:38:19.514971', '2024-11-21 19:38:19.514971', 'ZALO_PAY', 'CREATED', '241121_1732192699199', 0xa1dcbf0ff0374e4788b3ccce1293dfa8),
(0xf667bf246a504a94a3d8aa3a71b80d78, 16840, '2024-11-26 15:24:27.726901', '2024-11-26 15:24:27.726901', 'ZALO_PAY', 'PAIED', '241126_1732609467479', 0x788b7379a2914897a3aaf77ee71f1424),
(0xf9c4ccdcf1be4b0397491eb43f9e36d7, 5360000, '2024-11-21 18:34:49.281896', '2024-11-21 18:34:49.281896', 'ZALO_PAY', 'CREATED', '241121_1732188889198', 0x3a46fbadd8024d5891164ef0a65b1ead);

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` binary(16) NOT NULL,
  `code` varchar(255) NOT NULL,
  `conditions` text,
  `description` text,
  `discount_type` varchar(255) DEFAULT NULL,
  `discount_value` decimal(38,2) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `descriptionMismatch` bit(1) NOT NULL,
  `guideAttitude` bit(1) NOT NULL,
  `guideOther` bit(1) NOT NULL,
  `other` bit(1) NOT NULL,
  `otherReason` varchar(500) DEFAULT NULL,
  `overpricing` bit(1) NOT NULL,
  `scheduleMismatch` bit(1) NOT NULL,
  `tour_id` binary(16) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `created_at`, `descriptionMismatch`, `guideAttitude`, `guideOther`, `other`, `otherReason`, `overpricing`, `scheduleMismatch`, `tour_id`, `user_id`) VALUES
(0x2aaec0b186644da5a5238d6d82ade924, '2024-11-26 15:12:17.728480', b'0', b'0', b'0', b'1', 'nhân viên tệ ke giá khách hàng', b'1', b'0', 0x38a799682d904a189c753d7ac9e930c4, 0x660361a13e0744c38c7b2957bcb3d69a),
(0x5d2f883520ce4d3bae1d00e989325fa0, '2024-11-26 15:15:01.225131', b'0', b'0', b'0', b'1', 'quá tệ', b'1', b'0', 0x38a799682d904a189c753d7ac9e930c4, 0x660361a13e0744c38c7b2957bcb3d69a),
(0x6c7d140b65d4445186c3bb5a35ed7d00, '2024-11-26 15:10:18.790873', b'0', b'0', b'0', b'0', '', b'0', b'0', 0x38a799682d904a189c753d7ac9e930c4, 0x660361a13e0744c38c7b2957bcb3d69a),
(0x96d232bd416e4b4882f04d4906350de2, '2024-11-26 15:00:50.092178', b'1', b'0', b'0', b'1', 'đang test', b'1', b'1', 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xbb475f6003f14324997a3970aa2cfabb, '2024-11-26 19:14:40.952986', b'1', b'1', b'1', b'0', '', b'1', b'1', 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xbd63990cadac4c7d99a115a48d7c6974, '2024-11-26 15:06:03.108452', b'1', b'1', b'1', b'1', 'gửi mail', b'1', b'1', 0x38a799682d904a189c753d7ac9e930c4, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xd088987497cd42c59dfde9f4a14ce2b2, '2024-11-26 15:03:43.778496', b'1', b'0', b'0', b'1', 'đang test', b'1', b'1', 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xd1c35fe7c6cd4906a70c64a0015de813, '2024-11-26 15:03:48.479420', b'1', b'0', b'0', b'1', 'đang test', b'1', b'1', 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xd23453163ffa413296883c236cc671c7, '2024-11-26 15:09:45.847009', b'0', b'0', b'0', b'1', 'Test v2', b'1', b'0', 0x38a799682d904a189c753d7ac9e930c4, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xdc03334f7dff45428d4352fc6d93f008, '2024-11-26 15:16:53.378117', b'1', b'0', b'0', b'1', 'okasdsd', b'0', b'0', 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a),
(0xfcd2ebb1508a48e9b66b13c22d474ca0, '2024-11-26 20:42:28.741972', b'1', b'0', b'0', b'0', '', b'0', b'1', 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` binary(16) NOT NULL,
  `comment` text,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` int NOT NULL,
  `tour_id` binary(16) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `comment`, `created_at`, `rating`, `tour_id`, `user_id`, `fullname`) VALUES
(0x015c3c91f7e94c5690f18ff38e52c01c, 'ok', '2024-11-21 21:38:47.657421', 5, 0x619bb723b6e541f7941f5e1f2cd55f02, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x027d7d4bc6b7468db18808b1dfd078a0, 'quá tuyệt', '2024-11-23 21:09:01.780860', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x189f19cf867040e696b859357ed95a47, 'quá tuyệt', '2024-11-22 22:25:31.737775', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x1b39feb6baf041218cbd2c09ce16201f, 'ok', '2024-11-23 21:13:13.981151', 5, 0xcf171703059d415f9333245c9cd6478d, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x1e6a0055e95240949002ec7028b82584, 'ok000', '2024-11-21 21:41:40.655500', 5, 0x619bb723b6e541f7941f5e1f2cd55f02, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x2bf0a27ef7f94d08b58de6247f7b7373, 'quá tuyệt', '2024-11-22 22:25:44.967096', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x4172c5d6046040cbbb4206ef938a74c4, 'ok', '2024-11-24 18:58:30.000966', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0x4ff6e0e713504e6e95fec7236e065127, 'ok', '2024-11-21 22:08:52.589298', 2, 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan'),
(0x674cb47010074418b2e096afe29cbe41, 'quá tuyệt', '2024-11-26 15:16:18.843295', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan'),
(0x6ae0a4134d2f40b09079e6cfe6708066, 'Dữ vậy sao', '2024-11-21 22:39:13.940125', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 'Dương Thành'),
(0x70fb5c540f8744488b24079598df8b14, 'quá tuyệt', '2024-11-21 22:08:22.718766', 5, 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan'),
(0x86896e2f545f4840b25636827e3b1cda, 'teệ quá', '2024-11-21 22:08:37.897989', 1, 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan'),
(0xa5dc179c63d444e4a904e581e6cdcb6c, 'ok000', '2024-11-21 22:11:02.018035', 3, 0x99634d465f4142b29ec88bde7fca9764, 0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 'Dương Thành'),
(0xb0a412f20bae4a10bd2995f03b1b1036, 'quá tuyệt', '2024-11-23 21:13:27.887812', 1, 0xcf171703059d415f9333245c9cd6478d, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0xb97181f82163456fbdc2cc87b7f41b2d, 'ok', '2024-11-21 22:39:24.729033', 1, 0x6901aa7f294840f28b907abb8e2dc95d, 0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 'Dương Thành'),
(0xbe4efa8594c2485c9a279bcc52208eb9, 'tee', '2024-11-21 21:45:09.394887', 2, 0x619bb723b6e541f7941f5e1f2cd55f02, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0xcfd3a163813a43cda2e681e86bbbdf4b, 'ok', '2024-11-26 15:22:30.234375', 5, 0x38a799682d904a189c753d7ac9e930c4, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan'),
(0xe422c0242ad5435481b3d433f5f119e6, 'teệ quá', '2024-11-21 21:45:59.322969', 1, 0x619bb723b6e541f7941f5e1f2cd55f02, 0x5deb768ff97643ad84c658c23bbc90ee, '4870_Huỳnh Văn Chí Khan'),
(0xf5c5004112284454b812b6eecf9f6100, 'ok', '2024-11-21 21:58:47.195097', 3, 0x99634d465f4142b29ec88bde7fca9764, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan'),
(0xfa624fd324984085bf7464e00bb2dc85, 'ok', '2024-11-26 19:15:04.532529', 5, 0x6901aa7f294840f28b907abb8e2dc95d, 0x660361a13e0744c38c7b2957bcb3d69a, 'Huỳnh Văn Chí Khan');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` binary(16) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(0x120c57c6feaf4304b676203a462345e6, 'ROLE_USER'),
(0x1839f14c1ccf4102abc8192f553b32b9, 'ROLE_HOST'),
(0x9d06643a5e6942b9bee13b21d87bda15, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `description` text,
  `duration_days` int DEFAULT NULL,
  `featured` bit(1) DEFAULT NULL,
  `max_peole` int DEFAULT NULL,
  `price` int NOT NULL,
  `starting_location` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tickets_remaining` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `transportation` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_id` binary(16) DEFAULT NULL,
  `destination_id` binary(16) DEFAULT NULL,
  `host_id` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `created_at`, `departure_date`, `description`, `duration_days`, `featured`, `max_peole`, `price`, `starting_location`, `status`, `tickets_remaining`, `title`, `transportation`, `updated_at`, `category_id`, `destination_id`, `host_id`) VALUES
(0x1bf2dd6cda3c40f4a49be702a253d597, '2024-11-23 20:18:13.209839', '2024-12-05', 'test', 10, b'0', 10, 0, 'Trưởng đoàn đón Quý khách tại sân bay Tân Sơn Nhất', '', 10, 'test', 'Máy Bay', NULL, 0xb343d8fc88094a90a0ca30ba28eef254, 0x3dc5c01d556a478f94ecbebf2717914e, 0x198c0970c2d149c29533131bfbf0d8d1),
(0x38a799682d904a189c753d7ac9e930c4, '2024-11-17 22:56:38.920479', '2024-11-21', 'Khám phá vẻ đẹp hoang sơ của Tây Nguyên qua hành trình 3 ngày 2 đêm đầy ấn tượng. Chinh phục Măng Đen, vùng đất được mệnh danh là \'Đà Lạt thứ hai\' với khí hậu mát mẻ quanh năm và rừng thông bạt ngàn. Tiếp tục hành trình đến ngã ba Đông Dương, nơi giao điểm của ba nước Việt Nam, Lào, và Campuchia, mang đến cảm giác đặc biệt và độc đáo. Tham quan cửa khẩu Bờ Y, khám phá những nét văn hóa đặc sắc của vùng biên giới. Cuối cùng, tận hưởng cảnh sắc thiên nhiên hùng vĩ của Gia Lai với những thác nước và đồi chè xanh mướt. Cùng iVIVU khám phá ngay hôm nay!', 3, b'1', 20, 535000, 'Khởi hành từ sân bay Tân Sơn Nhất, du khách tham quan Nhà Thờ Gỗ Kon Tum, biểu tượng văn hóa hơn 100 tuổi của Tây Nguyên.', '', 18, 'Tour Tây Nguyên 3N2Đ: Măng Đen - Ngã 3 Đông Dương - Khẩu Bờ Y- Gia Lai', 'Máy Bay', '2024-11-22 22:27:10.340117', 0x994d294fdc7e45f18f413c3abaa9b854, 0x47422aa0261146f4b7cf162c0ecc9b1a, 0x5deb768ff97643ad84c658c23bbc90ee),
(0x619bb723b6e541f7941f5e1f2cd55f02, '2024-11-17 23:03:17.827855', '2024-11-27', '- Vạn Lý Trường Thành – Chinh phục kỳ quan nổi tiếng thế giới, biểu tượng lịch sử của Trung Quốc.\n\n- Tử Cấm Thành – Khám phá cung điện hoàng gia với kiến trúc cổ kính và lịch sử lâu đời tại Bắc Kinh.\n\n- Bến Thượng Hải – Thưởng ngoạn cảnh đẹp dọc bờ sông Hoàng Phố, nơi giao thoa giữa kiến trúc cổ và hiện đại.\n\n- Làng cổ Ô Trấn – Dạo bước qua ngôi làng cổ bên dòng kênh thơ mộng, đậm chất văn hóa Giang Nam.\n\n- Thưởng thức trà Long Tỉnh tại Hàng Châu – Trải nghiệm văn hóa trà nổi tiếng của Trung Quốc trong khung cảnh thanh bình.', 6, b'1', 20, 22990000, 'Trưởng đoàn đón Quý khách tại sân bay Tân Sơn Nhất', '', 20, 'Tour Trung Quốc 6N5Đ: Bắc Kinh - Thượng Hải - Hàng Châu - Ô Trấn', 'Máy Bay', NULL, 0xb343d8fc88094a90a0ca30ba28eef254, 0x3dc5c01d556a478f94ecbebf2717914e, 0x5deb768ff97643ad84c658c23bbc90ee),
(0x6901aa7f294840f28b907abb8e2dc95d, '2024-11-17 20:44:40.155489', '2024-11-17', 'Hành trình khám phá Hà Nội, Hạ Long và Sapa trong 5 ngày sẽ mang đến cho du khách những trải nghiệm đáng nhớ. Quý khách sẽ khám phá thủ đô Hà Nội với những nét văn hóa truyền thống đặc trưng, thăm vịnh Hạ Long và Lan Hạ trên du thuyền 5 sao sang trọng, chiêm ngưỡng những cảnh quan tuyệt đẹp như Ao Ếch, Hang Sáng – Tối. Tiếp tục hành trình đến Sapa, trải nghiệm cuộc sống tại bản Cát Cát và chinh phục đỉnh Fansipan – Nóc nhà Đông Dương bằng cáp treo. Chuyến đi đầy thú vị và hấp dẫn này hứa hẹn sẽ là kỷ niệm khó quên cho du khách.', 5, b'1', 22, 6840, 'Xe đón khách tại sân bay Nội Bà', '', 22, 'Tour Liên Tuyến Miền Bắc 5N4Đ: Hà Nội - Ngủ Đêm Du Thuyền Vịnh Lan Hạ - Sapa - Fansipan', 'Xe Du Lịch', '2024-11-26 19:16:42.300670', 0x994d294fdc7e45f18f413c3abaa9b854, 0xac2bdcf646614df3a06f5b95a2a76f40, 0x5deb768ff97643ad84c658c23bbc90ee),
(0x99634d465f4142b29ec88bde7fca9764, '2024-11-17 22:52:15.816385', '2024-11-18', 'Khám phá Sapa 2 ngày 3 đêm với những điểm đến nổi bật và trải nghiệm hấp dẫn. Chinh phục đỉnh Fansipan, nóc nhà Đông Dương, nơi bạn có thể ngắm nhìn toàn cảnh núi rừng hùng vĩ từ độ cao 3.143m. Tham quan bản Cát Cát, ngôi làng cổ đẹp như tranh vẽ, nơi bạn có thể tìm hiểu văn hóa độc đáo của người H\'Mông. Đặc biệt, đừng bỏ lỡ Moana Sapa với góc check-in sống ảo độc đáo, bao quát toàn cảnh núi non tuyệt đẹp. Cùng iVIVU khám phá ngay hôm nay!', 2, b'0', 30, 309000, '21:30: Xe và HDV đón khách tại 204 hoặc 160 Trần Quang Khải khởi hành đi Sapa bằng xe giường nằm từ điểm hẹn. Quý khách nghỉ đêm trên xe (Đối với quý khách có chuyến bay tối, xe đón tại sân bay với phí phát sinh 60.000đ/nhóm)', '', 19, 'Tour Sapa 2N3Đ: Hà Nội - Sapa - Fansipan - Cát Cát /Moana View', 'Xe Du Lịch', NULL, 0x994d294fdc7e45f18f413c3abaa9b854, 0xac2bdcf646614df3a06f5b95a2a76f40, 0x5deb768ff97643ad84c658c23bbc90ee),
(0xcf171703059d415f9333245c9cd6478d, '2024-11-17 22:49:10.460049', '2024-11-20', 'Khám phá vẻ đẹp hùng vĩ và lịch sử của miền Bắc Việt Nam qua hành trình 6 ngày 5 đêm, tham quan Hà Nội, Ninh Bình, Vịnh Hạ Long và Sapa. Khởi hành từ Hà Nội, du khách sẽ tham quan Văn Miếu, Hồ Hoàn Kiếm và khu phố cổ Hà Nội. Tiếp tục đến Ninh Bình, khám phá Tràng An với hệ thống hang động kỳ vĩ và chùa Bái Đính, ngôi chùa lớn nhất Việt Nam. Tại Vịnh Hạ Long, du khách sẽ du thuyền trên vịnh, ngắm nhìn cảnh quan thiên nhiên đẹp mê hồn với hàng nghìn đảo đá. Cuối cùng, hành trình đến Sapa, chiêm ngưỡng cảnh đẹp núi rừng Tây Bắc, thăm bản Cát Cát và chinh phục đỉnh Fansipan, \'nóc nhà Đông Dương\'. Cùng iVIVU khám phá ngay hôm nay!', 6, b'1', 20, 660000, 'Xe đón Quý Khách tại sân bay Nội Bài đưa về Khách sạn nhận phòng, nghỉ ngơi.', '', 13, 'Tour Miền Bắc 6N5Đ (Khởi hành từ Hà Nội): Hà Nội - Ninh Bình - Vịnh Hạ Long - Sapa', 'Xe Du Lịch', NULL, 0x994d294fdc7e45f18f413c3abaa9b854, 0xac2bdcf646614df3a06f5b95a2a76f40, 0x5deb768ff97643ad84c658c23bbc90ee);

-- --------------------------------------------------------

--
-- Table structure for table `tour_images`
--

CREATE TABLE `tour_images` (
  `tour_id` binary(16) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour_images`
--

INSERT INTO `tour_images` (`tour_id`, `image_url`) VALUES
(0x6901aa7f294840f28b907abb8e2dc95d, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731851072/wrlk8l4hy2qt6drcelti.gif'),
(0x6901aa7f294840f28b907abb8e2dc95d, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731851073/sqg6qjek1khnqx1wnxfu.jpg'),
(0x6901aa7f294840f28b907abb8e2dc95d, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731851072/n5n1paajkqaal89g1zgg.gif'),
(0x6901aa7f294840f28b907abb8e2dc95d, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731851072/dvauqzvxajcdraalbdq1.gif'),
(0xcf171703059d415f9333245c9cd6478d, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731858545/vvjf9aofcwfgkkwmdugx.jpg'),
(0x99634d465f4142b29ec88bde7fca9764, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731858727/nim7bjp3tbxctuiz9wsc.gif'),
(0x99634d465f4142b29ec88bde7fca9764, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731858726/os3meyy9ynlbr0ptbkl2.gif'),
(0x99634d465f4142b29ec88bde7fca9764, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731858726/dczt4tinbdei3pywlnbq.gif'),
(0x99634d465f4142b29ec88bde7fca9764, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731858727/dx3aco3nm1518zfr240g.gif'),
(0x38a799682d904a189c753d7ac9e930c4, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731858995/b4efwqxaxvdgu2osuqcq.gif'),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731859388/lvzvhdy3lzjld4oavzb2.gif'),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731859388/tfwnfazipdjrya1jl4ni.jpg'),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731859388/ippe651tlyntfwl1zmt7.gif'),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731859388/ewmbypgfpv9vronnnyms.jpg'),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'http://res.cloudinary.com/dcc239rej/image/upload/v1731859388/jbstqzasxtoxg0ydzwpz.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tour_itinerary`
--

CREATE TABLE `tour_itinerary` (
  `tour_id` binary(16) NOT NULL,
  `itinerary_step` text,
  `day_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour_itinerary`
--

INSERT INTO `tour_itinerary` (`tour_id`, `itinerary_step`, `day_order`) VALUES
(0x1bf2dd6cda3c40f4a49be702a253d597, 'lỏem', 0),
(0x38a799682d904a189c753d7ac9e930c4, 'Ngày 01: Pleiku - Kon Tum - Măng Đen (Ăn Trưa, Tối) Khởi hành từ sân bay Tân Sơn Nhất, du khách tham quan Nhà Thờ Gỗ Kon Tum, biểu tượng văn hóa hơn 100 tuổi của Tây Nguyên.', 0),
(0x38a799682d904a189c753d7ac9e930c4, 'Ngày 02: Măng Đen - Kon Tum - Cửa Khẩu Bờ Y (Ăn Sáng, Trưa, Tối)', 1),
(0x38a799682d904a189c753d7ac9e930c4, 'Ngày 03: Khám Phá Pleiku Và Gia Lai (Ăn Sáng, Trưa)', 2),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Ngày 1', 0),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Tp.Hcm - Bắc Kinh (Ăn Tối)', 1),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Trưởng đoàn đón Quý khách tại sân bay Tân Sơn Nhất để làm thủ tục đáp chuyến MU282 02:10 - 07:10 (ăn nhẹ trên máy bay), đoàn quá cảnh sân bay Thượng Hải nối chuyến MU5155 10:35 - 13:00 (ăn trưa trên máy bay). Đến sân bay Bắc Kinh HDV đón đoàn khởi hành tham quan:', 2),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Phố Cổ Hutong với những ngôi nhà truyền thống, sân rộng, giếng nước và các con ngõ nhỏ kết nối tạo thành mạng lưới như bàn cờ. Du khách có thể thuê xe đạp hoặc xích lô để khám phá, tận hưởng không gian cổ kính và bình yên (chi phí thuê xe tự túc).', 3),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Ngày 2', 4),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Bắc Kinh (Ăn Sáng, Trưa, Tối)', 5),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Ngày 3', 6),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Bắc Kinh (Sáng, Trưa, Tối)', 7),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Ngày 4', 8),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Bắc Kinh - Hàng Châu (Sáng, Trưa, Tối)', 9),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Ngày 5', 10),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Hàng Châu - ô Trấn - Thượng Hải (Sáng, Trưa, Tối)', 11),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Ngày 6', 12),
(0x619bb723b6e541f7941f5e1f2cd55f02, 'Thượng Hải - Hcm (Sáng, Trưa, Tối)', 13),
(0x6901aa7f294840f28b907abb8e2dc95d, 'Ngày 01: Đón Bay Nội Bài – Hà Nội: Xe đón khách tại sân bay Nội Bài: Xe đón Quý Khách về Khách sạn nhận phòng (Công ty sẽ bố trí xe đón theo lịch bay của Khách).', 0),
(0x6901aa7f294840f28b907abb8e2dc95d, 'Ngày 02: Hà Nội – Hạ Long – Vịnh Lan Hạ - Ngủ Đêm Trên Du Thuyền (Ăn Sáng, Trưa, Tối)', 1),
(0x6901aa7f294840f28b907abb8e2dc95d, 'Ngày 03: Vịnh Lan Hạ - Hạ Long – Hà Nội ( Ăn Sáng, Trưa)', 2),
(0x6901aa7f294840f28b907abb8e2dc95d, 'Ngày 04:Hà Nội – Sapa – Bản Cát Cát (Ăn Sáng, Trưa, Tối)', 3),
(0x6901aa7f294840f28b907abb8e2dc95d, 'Ngày 05: Sapa – Fansipan – Sân Bay Nội Bài/ Hà Nội ( Ăn Sáng, Trưa)', 4),
(0x99634d465f4142b29ec88bde7fca9764, 'Đêm 01: Hà Nội – Lào Cai – Sapa: 21:30: Xe và HDV đón khách tại 204 hoặc 160 Trần Quang Khải khởi hành đi Sapa bằng xe giường nằm từ điểm hẹn. Quý khách nghỉ đêm trên xe (Đối với quý khách có chuyến bay tối, xe đón tại sân bay với phí phát sinh 60.000đ/nhóm)', 0),
(0x99634d465f4142b29ec88bde7fca9764, 'Ngày 01: Sapa – Bản Cát Cát ( Ăn Sáng, Trưa, Tối)', 1),
(0x99634d465f4142b29ec88bde7fca9764, 'Ngày 02: Sapa – Chinh Phục Đỉnh Fansipan – Hà Nội ( Ăn Sáng, Trưa)', 2),
(0xcf171703059d415f9333245c9cd6478d, 'Ngày 01: Đón Bay Nội Bài – Hà Nội: Xe đón Quý Khách tại sân bay Nội Bài đưa về Khách sạn nhận phòng, nghỉ ngơi. Quý khách tự do khám phá thủ đô Hà Nội với 36 Phố Phường, tham quan tháp rùa, cầu Thê Húc, chùa Trấn Quốc, Lăng Bác, Văn Miếu Quốc Tử Giám,… Buổi tối Quý khách tự do thưởng thức ẩm thực đường phố mang nét văn hóa của Hà Nội xưa như chả cá Lã Vọng, bún Thang, phở Lý Quốc Sư, phở cuốn Ngũ Xá,…. Ngủ đêm tại Khách sạn 3 sao phố cổ Hà Nội.', 0),
(0xcf171703059d415f9333245c9cd6478d, 'Ngày 02: Hà Nội - Chùa Bái Đính – Kdl Tràng An (Ăn Sáng, Trưa)', 1),
(0xcf171703059d415f9333245c9cd6478d, 'Ngày 03: Hà Nội - Vịnh Hạ Long - Chèo Thuyền Kayak (Ăn Sáng, Trưa, Tối)', 2),
(0xcf171703059d415f9333245c9cd6478d, 'Ngày 04: Khám Phá Thành Phố Hạ Long – Hà Nội (Ăn Sáng, Trưa)', 3),
(0xcf171703059d415f9333245c9cd6478d, 'Ngày 05: Hà Nội - Sapa - Bản Cát Cát (Ăn Sáng, Trưa, Tối)', 4),
(0xcf171703059d415f9333245c9cd6478d, 'Ngày 06', 5),
(0xcf171703059d415f9333245c9cd6478d, 'Sapa – Hà Nội (Ăn Sáng, Trưa)', 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `verify_code` varchar(255) DEFAULT NULL,
  `cin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `address`, `email`, `is_active`, `last_login`, `password_hash`, `phone_number`, `username`, `verify_code`, `cin`) VALUES
(0x198c0970c2d149c29533131bfbf0d8d1, 'Hồ Chí Minh', 'huynhkhan59@gmail.com', b'1', '2024-11-05 16:47:19.431726', '$2a$10$t2r5XkEt9m8mQxTCEAcIHeGLl7pgj.rB8EirRnd49Xt8wEsln1.0G', '0971283333', 'CTY DL VIỆT NAM', '5785', NULL),
(0x253a330dbb9440838c7f2b43705f6c2b, 'Ho Chi Minh', 'noreply.hock.tour@gmail.com', b'1', '2024-11-26 15:31:27.429261', '$2a$10$0E1aWxgI3a6u.BPDzdZztOKJ5msp4d5l3dKV25k9.37yQHCcW0yy2', '0356544398', 'ADMIN', '6412', NULL),
(0x5deb768ff97643ad84c658c23bbc90ee, '97 DUONG 24 LONG THANH MY', 'huynhkhan91@gmail.com', b'1', '2024-11-26 19:20:14.107745', '$2a$10$SU2pbn9NRDHE7LJ76iYx7..ZajHFfiwzMWH0MeWN/jOS1hWRH4cjS', '333333333333', '4870_Huỳnh Văn Chí Khan', NULL, '33333333333'),
(0x660361a13e0744c38c7b2957bcb3d69a, 'Ben Tre', 'huynhkhan.server.ftp@gmail.com', b'1', '2024-11-26 19:20:24.167413', '$2a$10$uaM/buRstfELeHnAG.DAguTr.7MSHNdX.IIZbJBnPsmikiUnmnMO2', '0961800341', 'Huỳnh Văn Chí Khan', '3267', '3217677341'),
(0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 'Ho Chi Minh', 'huynhkhan406@gmail.com', b'1', '2024-11-21 22:10:10.167353', '$2a$10$lAO4ZnD6g.DVCJaAGWOiie/aDDpA6BQ73Cq8RrPPAY1qRIrbe3BbO', '096138472', 'Dương Thành', '4685', '3217677341');
INSERT INTO `users` (`id`, `address`, `email`, `is_active`, `last_login`, `password_hash`, `phone_number`, `username`, `verify_code`, `cin`) VALUES
(0x253a330dbb9440838c7f2b43705f6c2b, 'Ho Chi Minh', 'noreply.hock.tour@gmail.com', b'1', '2024-11-26 15:31:27.429261', '$2a$10$0E1aWxgI3a6u.BPDzdZztOKJ5msp4d5l3dKV25k9.37yQHCcW0yy2', '0356544398', 'ADMIN', '6412', '3217677341');
-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `user_id` binary(16) NOT NULL,
  `role_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(0x253A330DBB9440838C7F2B43705F6C2B, 0x9D06643A5E6942B9BEE13B21D87BDA15);
(0x91ee5f7d0bd147ea9bd9f9a3efbf16a1, 0x120c57c6feaf4304b676203a462345e6),
(0x198c0970c2d149c29533131bfbf0d8d1, 0x1839f14c1ccf4102abc8192f553b32b9),
(0x5deb768ff97643ad84c658c23bbc90ee, 0x1839f14c1ccf4102abc8192f553b32b9),
(0x253a330dbb9440838c7f2b43705f6c2b, 0x9d06643a5e6942b9bee13b21d87bda15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKsixidcmek17khqhpm1tm57qdv` (`admin_id`);

--
-- Indexes for table `blog_images`
--
ALTER TABLE `blog_images`
  ADD KEY `FKru2r3nu4hofhm9hu9rf7rm1i8` (`blog_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKk4byobgkjv3y3952wwpxyep7o` (`promotion_id`),
  ADD KEY `FKi21lisuytk5t7tlp7lv51ny2l` (`tour_id`),
  ADD KEY `FKeyog2oic85xg7hsu2je2lx3s6` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmmamfjvnw2qm9kb1ke6tq25lc` (`tour_id`),
  ADD KEY `FKk7du8b8ewipawnnpg76d55fus` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt05r0b6n0iis8u7dfna4xdh73` (`receiver_id`),
  ADD KEY `FK4ui4nnwntodh6wjvck53dbk9m` (`sender_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9y21adhxn0ayjhfocscqox7bh` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKnuscjm6x127hkb15kcb8n56wo` (`booking_id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKjdho73ymbyu46p2hh562dk4kk` (`code`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrvl2k1xx2jy0u70v0ck8a3t3p` (`tour_id`),
  ADD KEY `FK2o32rer9hfweeylg7x8ut8rj2` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKg95fdc12cdl5o06q6la9jh0dm` (`tour_id`),
  ADD KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4mwn5rnlqad3gi9lm0yddhoy4` (`category_id`),
  ADD KEY `FKnmqftag73fi1wok8f46cwc0dr` (`destination_id`),
  ADD KEY `FKp0mn2717v8my81c007b7eo2th` (`host_id`);

--
-- Indexes for table `tour_images`
--
ALTER TABLE `tour_images`
  ADD KEY `FKth1m2rd6q6ltp8kii2msvfi5d` (`tour_id`);

--
-- Indexes for table `tour_itinerary`
--
ALTER TABLE `tour_itinerary`
  ADD PRIMARY KEY (`tour_id`,`day_order`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD UNIQUE KEY `UK9q63snka3mdh91as4io72espi` (`phone_number`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKt7e7djp752sqn6w22i6ocqy6q` (`role_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `FKsixidcmek17khqhpm1tm57qdv` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `blog_images`
--
ALTER TABLE `blog_images`
  ADD CONSTRAINT `FKru2r3nu4hofhm9hu9rf7rm1i8` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`);

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FKeyog2oic85xg7hsu2je2lx3s6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKi21lisuytk5t7tlp7lv51ny2l` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  ADD CONSTRAINT `FKk4byobgkjv3y3952wwpxyep7o` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FKk7du8b8ewipawnnpg76d55fus` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKmmamfjvnw2qm9kb1ke6tq25lc` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `FK4ui4nnwntodh6wjvck53dbk9m` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKt05r0b6n0iis8u7dfna4xdh73` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK9y21adhxn0ayjhfocscqox7bh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FKc52o2b1jkxttngufqp3t7jr3h` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `FK2o32rer9hfweeylg7x8ut8rj2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKrvl2k1xx2jy0u70v0ck8a3t3p` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKg95fdc12cdl5o06q6la9jh0dm` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `FK4mwn5rnlqad3gi9lm0yddhoy4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FKnmqftag73fi1wok8f46cwc0dr` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`),
  ADD CONSTRAINT `FKp0mn2717v8my81c007b7eo2th` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tour_images`
--
ALTER TABLE `tour_images`
  ADD CONSTRAINT `FKth1m2rd6q6ltp8kii2msvfi5d` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `tour_itinerary`
--
ALTER TABLE `tour_itinerary`
  ADD CONSTRAINT `FKa0o5dgvvltgycaf2ompjtek8b` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKt7e7djp752sqn6w22i6ocqy6q` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
