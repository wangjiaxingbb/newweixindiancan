/*
Navicat MySQL Data Transfer

Source Server         : node_demo
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-01-29 15:30:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` tinyint(100) NOT NULL AUTO_INCREMENT,
  `order_num` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `checkout_persion_id` tinyint(100) DEFAULT NULL,
  `checkout_persion_name` varchar(100) DEFAULT NULL,
  `desk_id` tinyint(100) NOT NULL,
  `desk_number` varchar(100) NOT NULL,
  `checkout_price` varchar(100) DEFAULT '0',
  `status` varchar(10) NOT NULL DEFAULT '1' COMMENT '1：待支付 2：支付成功 3：支付失败 -1: 取消订单',
  `food_ids` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '201901140001', '2019-01-14 17:26:28', '1', '张三', '1', '1', '600', '1', '1,2,3');
INSERT INTO `orders` VALUES ('3', 'N15475174558712', '2019-01-15 09:57:36', null, null, '1', '2', null, '1', null);
INSERT INTO `orders` VALUES ('4', 'N15475186285163', '2019-01-15 10:17:09', null, null, '2', '3', null, '1', null);
