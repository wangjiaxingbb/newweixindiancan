/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '1' COMMENT '0: 停用 1：启用 2：删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '热菜', '1');
INSERT INTO `categories` VALUES ('2', '凉菜', '1');
INSERT INTO `categories` VALUES ('3', '饮料', '1');
INSERT INTO `categories` VALUES ('4', '最爱吃的菜', '1');
INSERT INTO `categories` VALUES ('5', '冰爽一夏', '1');
