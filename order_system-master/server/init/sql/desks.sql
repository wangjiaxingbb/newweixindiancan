/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-12-13 21:24:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `desks`
-- ----------------------------
DROP TABLE IF EXISTS `desks`;
CREATE TABLE `desks` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `number` tinyint(100) DEFAULT NULL,
  `status` varchar(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of desks
-- ----------------------------
INSERT INTO `desks` VALUES ('1', '1', '1');
INSERT INTO `desks` VALUES ('2', '2', '1');
