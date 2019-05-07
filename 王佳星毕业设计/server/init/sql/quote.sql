/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `quote`
-- ----------------------------
DROP TABLE IF EXISTS `quote`;
CREATE TABLE `quote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `quote_ch` varchar(250) DEFAULT NULL,
  `quote_en` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quote
-- ----------------------------
