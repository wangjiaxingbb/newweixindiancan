/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `desks`
-- ----------------------------
DROP TABLE IF EXISTS `desks`;
CREATE TABLE `desks` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `number` varchar(100) DEFAULT NULL,
  `status` varchar(10) DEFAULT '1' COMMENT '-1：删除 0: 停用 1：启用 2：正在使用',
  `seat_num` int(10) NOT NULL,
  `current_num` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of desks
-- ----------------------------
INSERT INTO `desks` VALUES ('1', '1', '2', '2', null);
INSERT INTO `desks` VALUES ('2', '2', '0', '5', null);
INSERT INTO `desks` VALUES ('3', '3', '-1', '3', null);
INSERT INTO `desks` VALUES ('5', '4', '0', '1', null);
INSERT INTO `desks` VALUES ('6', '5', '1', '5', null);
INSERT INTO `desks` VALUES ('7', '3', '1', '3', null);
