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

 Date: 19/04/2021 14:18:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (00000001, '开发', 01, 1, '2021-04-12 15:56:21');
INSERT INTO `department` VALUES (00000005, '运营', 02, 1, '2021-04-13 02:27:11');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES (00000003, '馒头', 0001, 1000, '馒头', 'http://qrldwoyz2.hn-bkt.clouddn.com/FvAoGLkEzx5W6XtSKw4MQpkYdr8m', '2021-04-16 02:55:08', 00000001, 1, 00000001);
INSERT INTO `food` VALUES (00000004, 'ces', 0012, 0000, '12121212', 'http://qrldwoyz2.hn-bkt.clouddn.com/Fu9WEIiyalXMFkhWMf_A4_Y3xUyK', '2021-04-19 06:15:41', 00000002, 1, 00000003);

-- ----------------------------
-- Table structure for foodtype
-- ----------------------------
DROP TABLE IF EXISTS `foodtype`;
CREATE TABLE `foodtype`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createtime` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of material
-- ----------------------------
INSERT INTO `material` VALUES (00000003, '土豆', 0001, 00000001, 00000001, '2021-04-13 09:11:20');

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mealtime
-- ----------------------------
INSERT INTO `mealtime` VALUES (00000001, '早餐', 1000, '07:00', '10:00', '2021-04-14 03:26:31');
INSERT INTO `mealtime` VALUES (00000002, '午餐', 5000, '11:00', '14:00', '2021-04-14 03:28:53');
INSERT INTO `mealtime` VALUES (00000003, '晚餐', 1000, '17:00', '19:00', '2021-04-14 03:29:14');
INSERT INTO `mealtime` VALUES (00000004, '夜宵', 0800, '20:00', '23:59', '2021-04-14 03:29:46');

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES (00000001, '前端', 01, 1, 00000001, '2021-04-12 15:56:46');
INSERT INTO `position` VALUES (00000004, '经理', 02, 1, 00000005, '2021-04-13 06:25:14');

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO `supplier` VALUES (00000001, '测试', '测试', '测试', '2021-04-13 08:14:47', '15182161727');
INSERT INTO `supplier` VALUES (00000003, 'ces', 'ces', 'ces', '2021-04-19 05:38:13', '15182161727');

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
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `department_id`(`department_id`) USING BTREE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (00000001, 'admin', '555wt0825WT@#123', '15182161727', 1, 00000001, '2021-04-12 15:57:12');
INSERT INTO `user` VALUES (00000002, 'user', '555wt0825WT@#', '15182161727', 1, 00000001, '2021-04-18 13:28:37');

SET FOREIGN_KEY_CHECKS = 1;
