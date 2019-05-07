/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `status` varchar(10) DEFAULT '1' COMMENT '1：未支付 2：已支付',
  `open_id` varchar(10) NOT NULL,
  `selected_food` varchar(100) DEFAULT NULL,
  `gender` varchar(5) DEFAULT NULL COMMENT '1: 男 2：女',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
