/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` int(10) NOT NULL DEFAULT '1' COMMENT '0: 停用 1：启用 2：删除',
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('7', '18847127075', '123456', '1544696719700', '李四', '1', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1547430784668_335x335.jpeg');
INSERT INTO `admin` VALUES ('8', '17601056863', '123456', '1547113572339', 'sad', '1', null);
INSERT INTO `admin` VALUES ('9', '18404713575', '123456', '1547113704252', 'asdas', '2', 'http://wuchengji.oss-cn-beijing.aliyuncs.com/1547113725542_avatar.png');
