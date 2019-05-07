/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:36
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
  `status` varchar(10) NOT NULL DEFAULT '1' COMMENT '0: 停用 1：启用 2：删除',
  `sale_num` tinyint(100) DEFAULT '0',
  `categories` varchar(100) NOT NULL,
  `taste` varchar(100) DEFAULT '正常',
  `score` varchar(10) DEFAULT '0' COMMENT '评分：0-5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of foods
-- ----------------------------
INSERT INTO `foods` VALUES ('1', '麻婆豆腐', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1547430784668_335x335.jpeg', '333', '1', '100', '2', '正常,微辣', '5');
INSERT INTO `foods` VALUES ('2', '鱼香肉丝2', '', '38', '1', '2', '2', '正常', '1');
INSERT INTO `foods` VALUES ('3', '鱼香肉丝3', '', '38', '1', '3', '1', '正常', '2');
INSERT INTO `foods` VALUES ('4', '鱼香肉丝4', '', '38', '1', '4', '1', '正常', '3');
INSERT INTO `foods` VALUES ('5', '雪碧', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1547453915593_560x280.jpeg', '38', '1', '5', '3', '正常', '2.5');
INSERT INTO `foods` VALUES ('6', '锅包肉', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1547454062891_650x325.jpeg', '68.8', '1', '0', '2', '正常', '5');
INSERT INTO `foods` VALUES ('7', '东坡肉', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1547776305149_750x750.jpeg', '20.5', '1', '0', '1', '正常,甜', '0');
INSERT INTO `foods` VALUES ('8', '1', '', '11', '1', '0', '1', '正常', '0');
INSERT INTO `foods` VALUES ('9', '2', '', '22', '1', '0', '5', '正常', '0');
INSERT INTO `foods` VALUES ('10', '3', '', '33', '1', '0', '1', '正常', '0');
INSERT INTO `foods` VALUES ('11', '4', '', '44', '1', '0', '5', '正常', '0');
INSERT INTO `foods` VALUES ('12', '龙井虾仁', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1548409110378_1.jpg', '66.6', '1', '0', '1', '正常', '0');
INSERT INTO `foods` VALUES ('13', '西湖醋鱼', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1548409130281_2.jpg', '66.6', '1', '0', '1', '正常', '0');
