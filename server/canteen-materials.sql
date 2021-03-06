/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : canteen-materials

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 23/04/2021 13:29:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dailymenu
-- ----------------------------
DROP TABLE IF EXISTS `dailymenu`;
CREATE TABLE `dailymenu`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dailymenu
-- ----------------------------
INSERT INTO `dailymenu` VALUES (00000006, '2021-04-21');
INSERT INTO `dailymenu` VALUES (00000007, '2021-04-22');
INSERT INTO `dailymenu` VALUES (00000008, '2021-04-20');
INSERT INTO `dailymenu` VALUES (00000009, '2021-04-19');
INSERT INTO `dailymenu` VALUES (00000010, '2021-02-01');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sort` int(2) UNSIGNED ZEROFILL NOT NULL,
  `state` int(1) UNSIGNED ZEROFILL NOT NULL DEFAULT 1,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (00000001, '开发', 01, 1, '2021-04-12 15:56:21');
INSERT INTO `department` VALUES (00000018, '一食堂', 01, 1, '2021-04-20 03:44:16');
INSERT INTO `department` VALUES (00000019, '二食堂', 01, 1, '2021-04-20 03:44:22');
INSERT INTO `department` VALUES (00000020, '三食堂', 01, 1, '2021-04-20 03:44:27');
INSERT INTO `department` VALUES (00000022, '测试', 01, 1, '2021-04-20 14:53:41');

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int(4) UNSIGNED ZEROFILL NOT NULL,
  `pre_count` int(4) UNSIGNED ZEROFILL NOT NULL,
  `introduce` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createtime` datetime(0) NOT NULL,
  `foodtype_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `state` int(1) NOT NULL,
  `mealtime_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `type_id`(`foodtype_id`) USING BTREE,
  INDEX `mealtime_id`(`mealtime_id`) USING BTREE,
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`foodtype_id`) REFERENCES `foodtype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `food_ibfk_2` FOREIGN KEY (`mealtime_id`) REFERENCES `mealtime` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES (00000003, '馒头', 0001, 1000, '馒头', 'http://qrldwoyz2.hn-bkt.clouddn.com/FvAoGLkEzx5W6XtSKw4MQpkYdr8m', '2021-04-16 02:55:08', 00000001, 1, 00000001);
INSERT INTO `food` VALUES (00000004, 'ces', 0012, 0000, '12121212', 'http://qrldwoyz2.hn-bkt.clouddn.com/Fu9WEIiyalXMFkhWMf_A4_Y3xUyK', '2021-04-19 06:15:41', 00000002, 1, 00000003);
INSERT INTO `food` VALUES (00000006, '测试', 0012, 0000, '123456789', 'http://qrldwoyz2.hn-bkt.clouddn.com/Fm9otFMN7UN9S81eE8GMUhS0QiT_', '2021-04-20 15:09:36', 00000002, 1, 00000004);

-- ----------------------------
-- Table structure for foodstock
-- ----------------------------
DROP TABLE IF EXISTS `foodstock`;
CREATE TABLE `foodstock`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `food_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `stock_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `food_id`(`food_id`) USING BTREE,
  INDEX `foodstock_ibfk_2`(`stock_id`) USING BTREE,
  CONSTRAINT `foodstock_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `foodstock_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of foodstock
-- ----------------------------
INSERT INTO `foodstock` VALUES (00000001, 00000006, 00000003);
INSERT INTO `foodstock` VALUES (00000002, 00000006, 00000004);
INSERT INTO `foodstock` VALUES (00000003, 00000006, 00000005);

-- ----------------------------
-- Table structure for foodtype
-- ----------------------------
DROP TABLE IF EXISTS `foodtype`;
CREATE TABLE `foodtype`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of foodtype
-- ----------------------------
INSERT INTO `foodtype` VALUES (00000001, '川菜', '2021-04-14 08:14:00');
INSERT INTO `foodtype` VALUES (00000002, '粤菜', '2021-04-14 08:22:20');
INSERT INTO `foodtype` VALUES (00000003, '鲁菜', '2021-04-14 08:23:00');
INSERT INTO `foodtype` VALUES (00000004, '苏菜', '2021-04-14 08:23:11');
INSERT INTO `foodtype` VALUES (00000005, '浙菜', '2021-04-14 08:23:18');
INSERT INTO `foodtype` VALUES (00000006, '闽菜', '2021-04-14 08:23:26');
INSERT INTO `foodtype` VALUES (00000007, '湘菜', '2021-04-14 08:23:44');
INSERT INTO `foodtype` VALUES (00000009, '徽菜', '2021-04-14 08:26:18');

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `count` int(4) UNSIGNED ZEROFILL NOT NULL,
  `price` double(8, 0) UNSIGNED ZEROFILL NOT NULL,
  `supplier_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `supplier_id`(`supplier_id`) USING BTREE,
  CONSTRAINT `material_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of material
-- ----------------------------
INSERT INTO `material` VALUES (00000003, '土豆', 0001, 00000001, 00000001, '2021-04-13 09:11:20');
INSERT INTO `material` VALUES (00000004, '大米', 0000, 00000020, 00000005, '2021-04-20 02:42:33');
INSERT INTO `material` VALUES (00000005, '面包', 0000, 00000012, 00000004, '2021-04-20 02:42:46');
INSERT INTO `material` VALUES (00000006, '1', 0000, 00000012, 00000004, '2021-04-20 14:30:15');
INSERT INTO `material` VALUES (00000007, '2', 0000, 00000012, 00000005, '2021-04-20 14:30:24');
INSERT INTO `material` VALUES (00000008, '3', 0000, 00000012, 00000004, '2021-04-20 14:30:33');
INSERT INTO `material` VALUES (00000009, '4', 0000, 00000012, 00000004, '2021-04-20 14:30:42');
INSERT INTO `material` VALUES (00000010, '5', 0000, 00000012, 00000005, '2021-04-20 14:30:55');
INSERT INTO `material` VALUES (00000011, '饭', 0000, 00000001, 00000005, '2021-04-23 03:13:27');

-- ----------------------------
-- Table structure for mealtime
-- ----------------------------
DROP TABLE IF EXISTS `mealtime`;
CREATE TABLE `mealtime`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `count` int(4) UNSIGNED ZEROFILL NOT NULL,
  `starttime` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `endtime` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mealtime
-- ----------------------------
INSERT INTO `mealtime` VALUES (00000001, '早餐', 1000, '07:00', '10:00', '2021-04-14 03:26:31');
INSERT INTO `mealtime` VALUES (00000002, '午餐', 5000, '11:00', '14:00', '2021-04-14 03:28:53');
INSERT INTO `mealtime` VALUES (00000003, '晚餐', 1000, '17:00', '19:00', '2021-04-14 03:29:14');
INSERT INTO `mealtime` VALUES (00000004, '夜宵', 0800, '20:00', '23:59', '2021-04-14 03:29:46');

-- ----------------------------
-- Table structure for menufood
-- ----------------------------
DROP TABLE IF EXISTS `menufood`;
CREATE TABLE `menufood`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `food_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `dailymenu_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `count` int(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `food_id`(`food_id`) USING BTREE,
  INDEX `dailymenu_id`(`dailymenu_id`) USING BTREE,
  CONSTRAINT `menufood_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `menufood_ibfk_2` FOREIGN KEY (`dailymenu_id`) REFERENCES `dailymenu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menufood
-- ----------------------------
INSERT INTO `menufood` VALUES (00000007, 00000003, 00000007, 12);
INSERT INTO `menufood` VALUES (00000008, 00000004, 00000007, 123);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` int(1) UNSIGNED ZEROFILL NOT NULL DEFAULT 0 COMMENT '0   未处理\r\n1   已查看\r\n2   已处理\r\n',
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (00000001, '饭、面包、大米', 0, '2021-04-15 12:39:18');
INSERT INTO `notice` VALUES (00000002, '饭、1、2', 0, '2021-04-23 11:39:39');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `material_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `count` int(4) NOT NULL DEFAULT 0,
  `total_price` double(10, 2) NOT NULL DEFAULT 0.00,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (00000002, '学院超市 - 面包', 00000005, 13, 156.00, '2021-04-20 03:08:20');
INSERT INTO `order` VALUES (00000003, '一食堂 - 大米', 00000004, 12, 240.00, '2021-04-20 03:08:29');
INSERT INTO `order` VALUES (00000004, '测试 - 土豆', 00000003, 123, 123.00, '2021-04-20 14:29:58');
INSERT INTO `order` VALUES (00000005, '学院超市 - 1', 00000006, 12, 144.00, '2021-04-20 14:31:09');
INSERT INTO `order` VALUES (00000006, '学院超市 - 3', 00000008, 12, 144.00, '2021-04-20 14:31:17');
INSERT INTO `order` VALUES (00000007, '学院超市 - 4', 00000009, 12, 144.00, '2021-04-20 14:31:20');
INSERT INTO `order` VALUES (00000008, '一食堂 - 5', 00000010, 12, 144.00, '2021-04-20 14:31:23');
INSERT INTO `order` VALUES (00000009, '一食堂 - 2', 00000007, 12, 144.00, '2021-04-20 14:31:33');
INSERT INTO `order` VALUES (00000010, '一食堂 - 饭', 00000011, 9, 9.00, '2021-04-23 03:13:45');

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sort` int(2) UNSIGNED ZEROFILL NOT NULL,
  `state` int(1) UNSIGNED ZEROFILL NOT NULL,
  `department_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `department_id`(`department_id`) USING BTREE,
  CONSTRAINT `position_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES (00000005, '清洁工', 01, 1, 00000018, '2021-04-20 03:44:43');
INSERT INTO `position` VALUES (00000006, '食堂大妈', 02, 1, 00000018, '2021-04-20 03:47:21');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `count` int(6) NOT NULL,
  `material_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `createtime` datetime(0) NOT NULL,
  `supplier` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `material_id`(`material_id`) USING BTREE,
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES (00000003, 13, 00000005, '2021-04-20 03:08:20', '学院超市');
INSERT INTO `stock` VALUES (00000004, 12, 00000004, '2021-04-20 03:08:29', '一食堂');
INSERT INTO `stock` VALUES (00000005, 123, 00000003, '2021-04-20 14:29:58', '测试');
INSERT INTO `stock` VALUES (00000006, 12, 00000006, '2021-04-20 14:31:09', '学院超市');
INSERT INTO `stock` VALUES (00000007, 12, 00000008, '2021-04-20 14:31:17', '学院超市');
INSERT INTO `stock` VALUES (00000008, 12, 00000009, '2021-04-20 14:31:20', '学院超市');
INSERT INTO `stock` VALUES (00000009, 12, 00000010, '2021-04-20 14:31:23', '一食堂');
INSERT INTO `stock` VALUES (00000010, 12, 00000007, '2021-04-20 14:31:33', '一食堂');
INSERT INTO `stock` VALUES (00000011, 9, 00000011, '2021-04-23 03:13:45', '一食堂');

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createtime` datetime(0) NOT NULL,
  `tel` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO `supplier` VALUES (00000001, '测试', '测试', '测试', '2021-04-13 08:14:47', '15182161727');
INSERT INTO `supplier` VALUES (00000003, 'ces', 'ces', 'ces', '2021-04-19 05:38:13', '15182161727');
INSERT INTO `supplier` VALUES (00000004, '学院超市', '测试地址', 'user', '2021-04-20 02:41:55', '15182161727');
INSERT INTO `supplier` VALUES (00000005, '一食堂', '一食堂', 'user', '2021-04-20 02:42:14', '15182161727');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` int(1) NOT NULL,
  `department_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  `createtime` datetime(0) NOT NULL,
  `position_id` int(8) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `department_id`(`department_id`) USING BTREE,
  INDEX `position_id`(`position_id`) USING BTREE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (00000001, 'admin', '555wt0825WT@#', '15182161727', 1, 00000001, '2021-04-20 14:00:51', 00000005);

SET FOREIGN_KEY_CHECKS = 1;
