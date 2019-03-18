/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-12-13 21:24:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `foods`
-- ----------------------------
DROP TABLE IF EXISTS `foods`;
CREATE TABLE `foods` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT '0',
  `status` varchar(10) NOT NULL DEFAULT '1',
  `sale_num` tinyint(100) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES ('1', '鱼香肉丝1', 'a1sd23as456a4wa5d1s2ad1a3', '38', '0', '1');
INSERT INTO `foods` VALUES ('2', '鱼香肉丝2', 'a1sd23as456a4wa5d1s2ad1a3', '38', '1', '2');
INSERT INTO `foods` VALUES ('3', '鱼香肉丝3', 'a1sd23as456a4wa5d1s2ad1a3', '38', '0', '3');
INSERT INTO `foods` VALUES ('4', '鱼香肉丝4', 'a1sd23as456a4wa5d1s2ad1a3', '38', '1', '4');
INSERT INTO `foods` VALUES ('5', '鱼香肉丝5', 'a1sd23as456a4wa5d1s2ad1a3', '38', '1', '5');
