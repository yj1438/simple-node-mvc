# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 121.42.176.100 (MySQL 5.7.16)
# Database: wx_shoplist
# Generation Time: 2017-02-24 03:06:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table group_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_info`;

CREATE TABLE `group_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `creator_id` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(150) DEFAULT NULL,
  `create_ts` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table group_member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_member`;

CREATE TABLE `group_member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `openid` varchar(100) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `member_nickname` varchar(150) DEFAULT NULL,
  `create_ts` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table group_todos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_todos`;

CREATE TABLE `group_todos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `todo_cont` varchar(300) DEFAULT NULL,
  `presenter_id` int(11) DEFAULT NULL,
  `finisher_id` int(11) DEFAULT NULL,
  `present_ts` double DEFAULT NULL,
  `finish_ts` double DEFAULT NULL,
  `state` int(2) DEFAULT NULL COMMENT '0未完成，1正在进行，2已完成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `nickname` varchar(150) DEFAULT NULL,
  `avatar` varchar(600) DEFAULT NULL,
  `create_ts` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
