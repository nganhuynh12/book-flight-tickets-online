-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 20, 2023 lúc 12:54 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `svo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flight`
--

CREATE TABLE `flight` (
  `startTime` datetime NOT NULL,
  `arriveTime` datetime NOT NULL,
  `startLocation` int(11) NOT NULL,
  `arriveLocation` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `flight`
--

INSERT INTO `flight` (`startTime`, `arriveTime`, `startLocation`, `arriveLocation`, `id`) VALUES
('2022-11-01 12:00:00', '2022-11-01 12:00:00', 3, 3, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `location`
--

INSERT INTO `location` (`id`, `value`) VALUES
(3, 'test');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `price` float NOT NULL,
  `flightId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ticket`
--

INSERT INTO `ticket` (`id`, `type`, `price`, `flightId`) VALUES
(3, 1, 100, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `id` int(11) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flight_location_start` (`startLocation`),
  ADD KEY `flight_locaition_arrive` (`arriveLocation`);

--
-- Chỉ mục cho bảng `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_flight` (`flightId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `flight`
--
ALTER TABLE `flight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `flight`
--
ALTER TABLE `flight`
  ADD CONSTRAINT `flight_locaition_arrive` FOREIGN KEY (`arriveLocation`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flight_location_start` FOREIGN KEY (`startLocation`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_flight` FOREIGN KEY (`flightId`) REFERENCES `flight` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
