/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-12-13 21:24:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` tinyint(100) NOT NULL,
  `order_num` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `checkout_persion_id` tinyint(100) NOT NULL,
  `checkout_persion_name` varchar(100) DEFAULT NULL,
  `desk_id` tinyint(100) NOT NULL,
  `desk_number` tinyint(100) DEFAULT NULL,
  `checkout_price` varchar(100) DEFAULT '0',
  `status` varchar(10) NOT NULL COMMENT '1：待支付 2：支付成功 3：未支付 4：支付失败',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
