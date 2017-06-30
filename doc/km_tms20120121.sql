/*
Navicat MySQL Data Transfer

Source Server         : 221.213.37.59
Source Server Version : 50067
Source Host           : 221.213.37.59:3306
Source Database       : km_tms20111206

Target Server Type    : MYSQL
Target Server Version : 50067
File Encoding         : 65001

Date: 2012-01-21 10:40:53
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `t_department`
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(32) NOT NULL,
  `profile` varchar(200) default NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_department
-- ----------------------------
INSERT INTO `t_department` VALUES ('1', '合同部', '', '0');
INSERT INTO `t_department` VALUES ('2', '计划部', '', '0');
INSERT INTO `t_department` VALUES ('3', '设计部', '', '0');
INSERT INTO `t_department` VALUES ('4', '预算室', '', '0');
INSERT INTO `t_department` VALUES ('5', '出图室', '', '0');
INSERT INTO `t_department` VALUES ('6', '档案室', '', '0');
INSERT INTO `t_department` VALUES ('7', '财务部', '', '0');
INSERT INTO `t_department` VALUES ('8', '总工办', '审核', '0');
INSERT INTO `t_department` VALUES ('21', '计划部一', '分发任务', '2');
INSERT INTO `t_department` VALUES ('22', '计划部二', '计划部子部门', '2');
INSERT INTO `t_department` VALUES ('31', '设计一室', '工艺', '3');
INSERT INTO `t_department` VALUES ('32', '设计二室', '水', '3');
INSERT INTO `t_department` VALUES ('33', '设计三室', '建筑结构', '3');
INSERT INTO `t_department` VALUES ('34', '设计四室', '工艺', '3');
INSERT INTO `t_department` VALUES ('35', '万羽', '一个不是设计室的设计室', '3');
INSERT INTO `t_department` VALUES ('36', '电气组', '一个人设计 一个校队的电气室', '3');
INSERT INTO `t_department` VALUES ('9999', '系统维护部', '', '0');

-- ----------------------------
-- Table structure for `t_doc`
-- ----------------------------
DROP TABLE IF EXISTS `t_doc`;
CREATE TABLE `t_doc` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `docName` varchar(20) default NULL,
  `docPath` varchar(100) default NULL,
  `docType` varchar(10) default NULL,
  `uploader` int(3) default NULL,
  `timestamp` timestamp NULL default NULL on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  KEY `prj_doc` (`prjID`),
  CONSTRAINT `prj_doc` FOREIGN KEY (`prjID`) REFERENCES `t_project` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_doc
-- ----------------------------

-- ----------------------------
-- Table structure for `t_group`
-- ----------------------------
DROP TABLE IF EXISTS `t_group`;
CREATE TABLE `t_group` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `sort` varchar(15) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=352 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_group
-- ----------------------------
INSERT INTO `t_group` VALUES ('1', '9', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('6', '18', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('8', '17', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('10', '18', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('11', '18', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('12', '18', '38', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('13', '16', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('14', '16', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('15', '17', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('16', '17', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('17', '17', '36', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('18', '19', '9', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('19', '19', '18', 'OFFICER');
INSERT INTO `t_group` VALUES ('20', '20', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('21', '20', '12', 'OFFICER');
INSERT INTO `t_group` VALUES ('22', '21', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('60', '21', '7', 'OFFICER');
INSERT INTO `t_group` VALUES ('61', '21', '7', 'DESIGNER');
INSERT INTO `t_group` VALUES ('62', '21', '26', 'DESIGNER');
INSERT INTO `t_group` VALUES ('63', '21', '28', 'DESIGNER');
INSERT INTO `t_group` VALUES ('64', '21', '32', 'DESIGNER');
INSERT INTO `t_group` VALUES ('65', '21', '30', 'DESIGNER');
INSERT INTO `t_group` VALUES ('66', '21', '14', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('67', '21', '27', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('68', '21', '33', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('69', '22', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('70', '22', '27', 'OFFICER');
INSERT INTO `t_group` VALUES ('75', '14', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('91', '12', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('92', '12', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('93', '14', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('94', '14', '8', 'DESIGNER');
INSERT INTO `t_group` VALUES ('95', '14', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('96', '14', '15', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('116', '9', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('117', '9', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('118', '9', '8', 'DESIGNER');
INSERT INTO `t_group` VALUES ('119', '9', '42', 'DESIGNER');
INSERT INTO `t_group` VALUES ('120', '9', '36', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('121', '9', '38', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('122', '9', '35', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('123', '9', '37', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('124', '23', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('125', '23', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('126', '25', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('127', '25', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('128', '24', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('129', '24', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('130', '26', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('141', '26', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('142', '26', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('143', '26', '36', 'DESIGNER');
INSERT INTO `t_group` VALUES ('144', '26', '34', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('145', '26', '35', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('146', '27', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('147', '27', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('148', '28', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('150', '30', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('151', '30', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('152', '30', '37', 'DESIGNER');
INSERT INTO `t_group` VALUES ('153', '30', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('154', '28', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('155', '28', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('156', '28', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('157', '32', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('158', '35', '10', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('159', '36', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('160', '36', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('161', '38', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('162', '39', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('163', '41', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('164', '44', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('165', '44', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('166', '45', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('167', '45', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('168', '46', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('169', '46', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('170', '35', '10', 'OFFICER');
INSERT INTO `t_group` VALUES ('171', '35', '10', 'DESIGNER');
INSERT INTO `t_group` VALUES ('172', '35', '21', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('173', '47', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('175', '47', '7', 'OFFICER');
INSERT INTO `t_group` VALUES ('176', '47', '14', 'DESIGNER');
INSERT INTO `t_group` VALUES ('177', '47', '28', 'DESIGNER');
INSERT INTO `t_group` VALUES ('178', '47', '7', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('179', '49', '10', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('180', '54', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('181', '54', '12', 'OFFICER');
INSERT INTO `t_group` VALUES ('182', '55', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('183', '55', '12', 'OFFICER');
INSERT INTO `t_group` VALUES ('184', '56', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('185', '57', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('186', '58', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('187', '58', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('188', '59', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('189', '60', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('190', '61', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('191', '61', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('192', '62', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('193', '62', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('194', '63', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('195', '63', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('196', '64', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('197', '64', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('198', '65', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('199', '66', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('200', '67', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('201', '69', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('202', '70', '10', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('203', '28', '22', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('204', '28', '23', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('205', '14', '10000', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('206', '14', '23', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('207', '57', '22', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('208', '77', '22', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('209', '57', '22', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('210', '77', '10001', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('211', '14', '10001', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('212', '77', '10000', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('213', '36', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('214', '36', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('215', '36', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('216', '39', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('217', '39', '41', 'DESIGNER');
INSERT INTO `t_group` VALUES ('218', '39', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('219', '69', '36', 'OFFICER');
INSERT INTO `t_group` VALUES ('220', '69', '36', 'DESIGNER');
INSERT INTO `t_group` VALUES ('221', '69', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('222', '67', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('223', '67', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('224', '67', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('225', '66', '38', 'OFFICER');
INSERT INTO `t_group` VALUES ('226', '66', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('227', '66', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('228', '65', '38', 'OFFICER');
INSERT INTO `t_group` VALUES ('229', '65', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('230', '65', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('231', '60', '36', 'OFFICER');
INSERT INTO `t_group` VALUES ('232', '60', '36', 'DESIGNER');
INSERT INTO `t_group` VALUES ('233', '60', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('234', '59', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('235', '59', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('236', '59', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('237', '57', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('238', '57', '41', 'DESIGNER');
INSERT INTO `t_group` VALUES ('239', '57', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('240', '32', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('241', '32', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('242', '32', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('243', '56', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('244', '56', '37', 'DESIGNER');
INSERT INTO `t_group` VALUES ('245', '56', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('246', '41', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('247', '41', '37', 'DESIGNER');
INSERT INTO `t_group` VALUES ('248', '41', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('249', '38', '38', 'OFFICER');
INSERT INTO `t_group` VALUES ('250', '38', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('251', '38', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('252', '71', '35', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('253', '71', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('254', '73', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('255', '74', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('256', '74', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('257', '75', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('258', '76', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('259', '78', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('260', '79', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('261', '80', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('262', '81', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('263', '82', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('264', '83', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('265', '84', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('266', '88', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('267', '89', '35', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('268', '89', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('269', '88', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('270', '88', '37', 'DESIGNER');
INSERT INTO `t_group` VALUES ('271', '88', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('272', '84', '38', 'OFFICER');
INSERT INTO `t_group` VALUES ('273', '84', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('274', '84', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('275', '83', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('276', '83', '37', 'DESIGNER');
INSERT INTO `t_group` VALUES ('277', '83', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('278', '83', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('279', '83', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('280', '83', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('281', '82', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('282', '82', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('283', '82', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('284', '81', '34', 'OFFICER');
INSERT INTO `t_group` VALUES ('285', '81', '34', 'DESIGNER');
INSERT INTO `t_group` VALUES ('286', '81', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('287', '80', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('288', '80', '37', 'DESIGNER');
INSERT INTO `t_group` VALUES ('289', '80', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('290', '79', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('291', '79', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('292', '79', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('293', '83', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('294', '83', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('295', '83', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('296', '83', '8', 'OFFICER');
INSERT INTO `t_group` VALUES ('297', '83', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('298', '83', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('299', '76', '34', 'OFFICER');
INSERT INTO `t_group` VALUES ('300', '76', '34', 'DESIGNER');
INSERT INTO `t_group` VALUES ('301', '76', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('302', '75', '36', 'OFFICER');
INSERT INTO `t_group` VALUES ('303', '75', '36', 'DESIGNER');
INSERT INTO `t_group` VALUES ('304', '75', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('305', '73', '36', 'OFFICER');
INSERT INTO `t_group` VALUES ('306', '73', '36', 'DESIGNER');
INSERT INTO `t_group` VALUES ('307', '73', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('308', '69', '36', 'OFFICER');
INSERT INTO `t_group` VALUES ('309', '69', '36', 'DESIGNER');
INSERT INTO `t_group` VALUES ('310', '69', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('311', '66', '38', 'OFFICER');
INSERT INTO `t_group` VALUES ('312', '66', '38', 'DESIGNER');
INSERT INTO `t_group` VALUES ('313', '66', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('314', '87', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('315', '87', '14', 'OFFICER');
INSERT INTO `t_group` VALUES ('316', '89', '35', 'OFFICER');
INSERT INTO `t_group` VALUES ('317', '89', '35', 'DESIGNER');
INSERT INTO `t_group` VALUES ('318', '89', '40', 'DESIGNER');
INSERT INTO `t_group` VALUES ('319', '89', '39', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('320', '86', '7', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('321', '86', '7', 'OFFICER');
INSERT INTO `t_group` VALUES ('322', '87', '14', 'OFFICER');
INSERT INTO `t_group` VALUES ('323', '87', '14', 'DESIGNER');
INSERT INTO `t_group` VALUES ('324', '87', '7', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('325', '47', '7', 'OFFICER');
INSERT INTO `t_group` VALUES ('326', '47', '14', 'DESIGNER');
INSERT INTO `t_group` VALUES ('327', '47', '28', 'DESIGNER');
INSERT INTO `t_group` VALUES ('328', '47', '7', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('329', '87', '14', 'OFFICER');
INSERT INTO `t_group` VALUES ('330', '87', '14', 'DESIGNER');
INSERT INTO `t_group` VALUES ('331', '87', '7', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('332', '87', '14', 'OFFICER');
INSERT INTO `t_group` VALUES ('333', '87', '14', 'DESIGNER');
INSERT INTO `t_group` VALUES ('334', '87', '7', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('335', '91', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('336', '90', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('337', '90', '41', 'OFFICER');
INSERT INTO `t_group` VALUES ('338', '90', '41', 'DESIGNER');
INSERT INTO `t_group` VALUES ('339', '90', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('340', '91', '15', 'OFFICER');
INSERT INTO `t_group` VALUES ('341', '91', '15', 'DESIGNER');
INSERT INTO `t_group` VALUES ('342', '91', '8', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('343', '77', '10000', 'BUDGETEER');
INSERT INTO `t_group` VALUES ('344', '92', '10', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('345', '92', '10', 'OFFICER');
INSERT INTO `t_group` VALUES ('346', '92', '20', 'DESIGNER');
INSERT INTO `t_group` VALUES ('347', '92', '21', 'PROOFREADER');
INSERT INTO `t_group` VALUES ('348', '93', '8', 'MAJORDEPART');
INSERT INTO `t_group` VALUES ('349', '93', '34', 'OFFICER');
INSERT INTO `t_group` VALUES ('350', '93', '34', 'DESIGNER');
INSERT INTO `t_group` VALUES ('351', '93', '8', 'PROOFREADER');

-- ----------------------------
-- Table structure for `t_imgsize`
-- ----------------------------
DROP TABLE IF EXISTS `t_imgsize`;
CREATE TABLE `t_imgsize` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_imgsize
-- ----------------------------
INSERT INTO `t_imgsize` VALUES ('1', '210*310', '');
INSERT INTO `t_imgsize` VALUES ('2', 'A0:1189X841', 'A0');
INSERT INTO `t_imgsize` VALUES ('3', 'A1:841X594', 'A1');
INSERT INTO `t_imgsize` VALUES ('4', 'A2:594X420', 'A2');
INSERT INTO `t_imgsize` VALUES ('5', 'A3:420X297', 'A3');
INSERT INTO `t_imgsize` VALUES ('6', 'A4:297X210', 'A4');

-- ----------------------------
-- Table structure for `t_imgtype`
-- ----------------------------
DROP TABLE IF EXISTS `t_imgtype`;
CREATE TABLE `t_imgtype` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_imgtype
-- ----------------------------
INSERT INTO `t_imgtype` VALUES ('1', '建施', '');
INSERT INTO `t_imgtype` VALUES ('2', '电施', '1212');
INSERT INTO `t_imgtype` VALUES ('3', '水施', '');
INSERT INTO `t_imgtype` VALUES ('4', '结施', '');
INSERT INTO `t_imgtype` VALUES ('5', '水处', '');

-- ----------------------------
-- Table structure for `t_message`
-- ----------------------------
DROP TABLE IF EXISTS `t_message`;
CREATE TABLE `t_message` (
  `id` int(11) NOT NULL auto_increment,
  `groupID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `date` datetime NOT NULL,
  `message` longtext NOT NULL,
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_message
-- ----------------------------
INSERT INTO `t_message` VALUES ('1', '21', '28', '朱新军', '2011-10-20 00:13:11', 'abc', '1');
INSERT INTO `t_message` VALUES ('2', '21', '28', '朱新军', '2011-10-20 00:16:36', 'usr iith', '1');
INSERT INTO `t_message` VALUES ('3', '21', '28', '朱新军', '2011-10-20 00:16:48', '旧消息', '1');
INSERT INTO `t_message` VALUES ('4', '14', '31', '谢伟', '2011-10-20 00:18:49', '工作开始\n', '1');
INSERT INTO `t_message` VALUES ('5', '21', '28', '朱新军', '2011-10-20 00:19:03', '新消息哟', '1');
INSERT INTO `t_message` VALUES ('6', '14', '8', '陈越舫', '2011-10-20 00:24:04', 'ok\r\n', '1');
INSERT INTO `t_message` VALUES ('7', '14', '31', '谢伟', '2011-10-20 00:26:11', '?\n', '1');
INSERT INTO `t_message` VALUES ('8', '21', '28', '朱新军', '2011-10-20 21:48:51', '测试发条消息', '1');
INSERT INTO `t_message` VALUES ('9', '23', '35', '万  羽', '2011-10-20 22:06:03', '开工\r\n\r\n', '1');
INSERT INTO `t_message` VALUES ('10', '25', '8', '陈越舫', '2011-10-21 00:09:02', '2121', '1');
INSERT INTO `t_message` VALUES ('11', '9', '8', '陈越舫', '2011-10-21 22:30:47', 'hello\r\n\r\n\r\n', '1');
INSERT INTO `t_message` VALUES ('12', '26', '1', '赵  珊', '2011-10-23 00:50:45', '开工', '1');
INSERT INTO `t_message` VALUES ('13', '26', '1', '赵  珊', '2011-10-23 00:51:27', '项目委托建立', '1');
INSERT INTO `t_message` VALUES ('14', '14', '38', ' 李  燕 ', '2011-10-23 19:14:51', '可以新建子图和修改子图了：）', '1');
INSERT INTO `t_message` VALUES ('15', '26', '1', '赵  珊', '2011-10-23 21:04:54', '新建任务完成', '1');
INSERT INTO `t_message` VALUES ('16', '26', '1', '赵  珊', '2011-10-23 21:05:12', 'ok', '1');
INSERT INTO `t_message` VALUES ('17', '26', '38', ' 李  燕 ', '2011-10-23 22:07:22', '测试消息', '1');
INSERT INTO `t_message` VALUES ('18', '14', '1', '赵  珊', '2011-10-23 22:26:14', '?', '1');
INSERT INTO `t_message` VALUES ('19', '14', '1', '赵  珊', '2011-10-23 22:33:48', '看到了\r\n', '1');
INSERT INTO `t_message` VALUES ('20', '14', '1', '赵  珊', '2011-10-23 22:37:11', 'ok\r\n', '1');
INSERT INTO `t_message` VALUES ('21', '26', '1', '赵  珊', '2011-10-23 22:44:02', '测试赵珊发条消息', '1');
INSERT INTO `t_message` VALUES ('22', '26', '1', '赵  珊', '2011-10-23 22:45:46', '两人现时参与即时消息测试', '1');
INSERT INTO `t_message` VALUES ('23', '26', '1', '赵  珊', '2011-10-23 22:46:24', '再来一次', '1');
INSERT INTO `t_message` VALUES ('24', '26', '1', '赵  珊', '2011-10-23 22:47:09', '新消息，发一条看会不会重复', '1');
INSERT INTO `t_message` VALUES ('25', '26', '1', '赵  珊', '2011-10-23 22:47:52', '在吗\r\n', '1');
INSERT INTO `t_message` VALUES ('26', '26', '1', '赵  珊', '2011-10-23 22:48:14', '换个用户名试试', '1');
INSERT INTO `t_message` VALUES ('27', '26', '31', '谢伟', '2011-10-23 22:49:25', '来了\r\n\r\n', '1');
INSERT INTO `t_message` VALUES ('28', '26', '1', '赵  珊', '2011-10-23 22:49:38', '现在是几条，有没有重复的', '1');
INSERT INTO `t_message` VALUES ('29', '26', '31', '谢伟', '2011-10-23 22:49:41', '现在对了\r\n\r\n\r\n', '1');
INSERT INTO `t_message` VALUES ('30', '26', '1', '赵  珊', '2011-10-23 22:50:48', '我猜，可能是多次打开消息窗口，对新消息的监听没有清除，所以，多打开一次，就重复一条消息', '1');
INSERT INTO `t_message` VALUES ('31', '26', '31', '谢伟', '2011-10-23 22:51:59', 'l\r\n\r\n', '1');
INSERT INTO `t_message` VALUES ('32', '35', '10', ' 曹爱青 ', '2011-10-31 17:15:13', '缺资料', '1');
INSERT INTO `t_message` VALUES ('33', '14', '15', '白  皓', '2011-10-31 17:53:35', '好', '1');
INSERT INTO `t_message` VALUES ('34', '49', '10', ' 曹爱青 ', '2011-11-03 09:55:22', '资料对接中', '1');
INSERT INTO `t_message` VALUES ('35', '50', '1', '赵  珊', '2011-11-08 15:22:21', '赵  珊成功创建项目：五华区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('36', '51', '1', '赵  珊', '2011-11-08 15:23:29', '赵  珊成功创建项目：五华区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('37', '52', '1', '赵  珊', '2011-11-08 15:30:48', '赵  珊成功创建项目：五华区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('38', '53', '1', '赵  珊', '2011-11-08 21:55:18', '赵  珊成功创建项目：yy', '0');
INSERT INTO `t_message` VALUES ('39', '54', '1', '赵  珊', '2011-11-09 09:06:01', '赵  珊成功创建项目：西山区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('40', '54', '31', '谢伟', '2011-11-10 08:57:47', '谢伟成功修改项目：西山区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('41', '55', '1', '赵  珊', '2011-11-10 09:07:32', '赵  珊成功创建项目：五华区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('42', '56', '1', '赵  珊', '2011-11-10 09:08:43', '赵  珊成功创建项目：五腊宏仁地块DN800给水管改迁', '0');
INSERT INTO `t_message` VALUES ('43', '57', '1', '赵  珊', '2011-11-10 09:10:06', '赵  珊成功创建项目：螺蛳湾国际商贸城创业园新册产业城给水工程', '0');
INSERT INTO `t_message` VALUES ('44', '58', '1', '赵  珊', '2011-11-10 09:11:22', '赵  珊成功创建项目：昆明多宝电缆公司给水工程', '0');
INSERT INTO `t_message` VALUES ('45', '55', '31', '谢伟', '2011-11-10 13:25:17', '谢伟成功修改项目：五华区西翥片区给水工程', '0');
INSERT INTO `t_message` VALUES ('46', '56', '31', '谢伟', '2011-11-10 13:25:43', '谢伟成功修改项目：五腊宏仁地块DN800给水管改迁', '0');
INSERT INTO `t_message` VALUES ('47', '57', '31', '谢伟', '2011-11-10 13:26:13', '谢伟成功修改项目：螺蛳湾国际商贸城创业园新册产业城给水工程', '0');
INSERT INTO `t_message` VALUES ('48', '58', '31', '谢伟', '2011-11-10 13:26:48', '谢伟成功修改项目：昆明多宝电缆公司给水工程', '0');
INSERT INTO `t_message` VALUES ('49', '59', '1', '赵  珊', '2011-11-18 11:02:08', '赵  珊成功创建项目：经开区印象欣城B.C给水工程', '0');
INSERT INTO `t_message` VALUES ('50', '60', '1', '赵  珊', '2011-11-18 11:07:00', '赵  珊成功创建项目：金星农贸市场给水工程', '0');
INSERT INTO `t_message` VALUES ('51', '61', '1', '赵  珊', '2011-11-18 11:08:17', '赵  珊成功创建项目：经开区西南广物流中心项目给水工程', '0');
INSERT INTO `t_message` VALUES ('52', '62', '1', '赵  珊', '2011-11-18 11:09:29', '赵  珊成功创建项目：奥宸新天地庭院给水工程', '0');
INSERT INTO `t_message` VALUES ('53', '63', '1', '赵  珊', '2011-11-18 11:10:10', '赵  珊成功创建项目：昆明市中医院呈贡新区医院给水工程', '0');
INSERT INTO `t_message` VALUES ('54', '64', '1', '赵  珊', '2011-11-18 11:11:02', '赵  珊成功创建项目：岗头村城中村改造项目给水工程', '0');
INSERT INTO `t_message` VALUES ('55', '65', '1', '赵  珊', '2011-11-18 11:14:02', '赵  珊成功创建项目：东方首座写字楼给水工程', '0');
INSERT INTO `t_message` VALUES ('56', '59', '31', '谢伟', '2011-11-18 16:27:43', '谢伟成功修改项目：经开区印象欣城B.C给水工程', '0');
INSERT INTO `t_message` VALUES ('57', '60', '31', '谢伟', '2011-11-18 16:28:07', '谢伟成功修改项目：金星农贸市场给水工程', '0');
INSERT INTO `t_message` VALUES ('58', '61', '31', '谢伟', '2011-11-18 16:28:31', '谢伟成功修改项目：经开区西南广物流中心项目给水工程', '0');
INSERT INTO `t_message` VALUES ('59', '62', '31', '谢伟', '2011-11-18 16:28:52', '谢伟成功修改项目：奥宸新天地庭院给水工程', '0');
INSERT INTO `t_message` VALUES ('60', '63', '31', '谢伟', '2011-11-18 16:29:28', '谢伟成功修改项目：昆明市中医院呈贡新区医院给水工程', '0');
INSERT INTO `t_message` VALUES ('61', '64', '31', '谢伟', '2011-11-18 16:30:01', '谢伟成功修改项目：岗头村城中村改造项目给水工程', '0');
INSERT INTO `t_message` VALUES ('62', '65', '31', '谢伟', '2011-11-18 16:30:34', '谢伟成功修改项目：东方首座写字楼给水工程', '0');
INSERT INTO `t_message` VALUES ('63', '66', '1', '赵  珊', '2011-12-01 10:15:02', '赵  珊成功创建项目：云南省艺术家园给水工程', '0');
INSERT INTO `t_message` VALUES ('64', '67', '1', '赵  珊', '2011-12-01 10:16:30', '赵  珊成功创建项目：云南省地震局宿舍改表', '0');
INSERT INTO `t_message` VALUES ('65', '68', '1', '赵  珊', '2011-12-01 10:17:45', '赵  珊成功创建项目：丽江水厂滤池改造', '0');
INSERT INTO `t_message` VALUES ('66', '69', '1', '赵  珊', '2011-12-02 11:52:28', '赵  珊成功创建项目：官渡13号路DN1200给水管改迁', '0');
INSERT INTO `t_message` VALUES ('67', '70', '1', '赵  珊', '2011-12-02 11:53:20', '赵  珊成功创建项目：轻轨3号线东部客运站给水管改迁', '0');
INSERT INTO `t_message` VALUES ('68', '66', '31', '谢伟', '2011-12-05 10:30:55', '谢伟成功修改项目：云南省艺术家园给水工程', '0');
INSERT INTO `t_message` VALUES ('69', '67', '31', '谢伟', '2011-12-05 10:31:58', '谢伟成功修改项目：云南省地震局宿舍改表', '0');
INSERT INTO `t_message` VALUES ('70', '69', '31', '谢伟', '2011-12-05 10:32:24', '谢伟成功修改项目：官渡13号路DN1200给水管改迁', '0');
INSERT INTO `t_message` VALUES ('71', '70', '31', '谢伟', '2011-12-05 10:32:41', '谢伟成功修改项目：轻轨3号线东部客运站给水管改迁', '0');
INSERT INTO `t_message` VALUES ('72', '70', '10', ' 曹爱青 ', '2011-12-05 13:34:15', '已完成', '1');
INSERT INTO `t_message` VALUES ('73', '49', '10', ' 曹爱青 ', '2011-12-05 13:34:33', '已完成', '1');
INSERT INTO `t_message` VALUES ('74', '35', '10', ' 曹爱青 ', '2011-12-05 13:34:50', '已完成', '1');
INSERT INTO `t_message` VALUES ('75', '14', '1', '赵  珊', '2011-12-06 23:36:40', '赵  珊成功对‘宝象河水厂DN600管及原水管迁改设计’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('76', '14', '1', '赵  珊', '2011-12-13 23:59:30', '赵  珊成功对‘宝象河水厂DN600管及原水管迁改设计’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('77', '28', '1', '赵  珊', '2011-12-14 22:58:40', '赵  珊成功对‘呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('78', '28', '22', '赵凤仙', '2011-12-15 00:35:31', '赵凤仙完成‘呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('79', '28', '22', '赵凤仙', '2011-12-15 00:38:13', '赵凤仙对‘呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程’项目预算。<br>预算金额：￥238,970.00', '0');
INSERT INTO `t_message` VALUES ('80', '71', '1', '赵  珊', '2011-12-15 10:14:41', '赵  珊成功创建项目：五华区北仓城中村改造给水工程', '0');
INSERT INTO `t_message` VALUES ('81', '72', '1', '赵  珊', '2011-12-15 10:22:07', '赵  珊成功创建项目：同心闸调水工程方案设计', '0');
INSERT INTO `t_message` VALUES ('82', '73', '1', '赵  珊', '2011-12-15 10:23:17', '赵  珊成功创建项目：羊肠小村城中村改造DN900原水管改迁', '0');
INSERT INTO `t_message` VALUES ('83', '74', '1', '赵  珊', '2011-12-15 10:25:21', '赵  珊成功创建项目：昆明市气象局呈贡新区给水工程', '0');
INSERT INTO `t_message` VALUES ('84', '75', '1', '赵  珊', '2011-12-15 10:26:32', '赵  珊成功创建项目：教场东路给水管改迁工程', '0');
INSERT INTO `t_message` VALUES ('85', '76', '1', '赵  珊', '2011-12-15 10:28:16', '赵  珊成功创建项目：瀚文云鼎商务大厦给水工程', '0');
INSERT INTO `t_message` VALUES ('86', '77', '1', '赵  珊', '2011-12-15 10:30:45', '赵  珊成功创建项目：芒市轩岗乡集镇给水工程', '0');
INSERT INTO `t_message` VALUES ('87', '78', '1', '赵  珊', '2011-12-15 10:32:25', '赵  珊成功创建项目：云波第三股份合作社青龙园地下水置换工程', '0');
INSERT INTO `t_message` VALUES ('88', '28', '22', '赵凤仙', '2011-12-15 16:27:39', '赵凤仙完成‘呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('89', '28', '22', '赵凤仙', '2011-12-15 16:28:07', '赵凤仙对‘呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程’项目预算。<br>预算金额：￥233,003.00', '0');
INSERT INTO `t_message` VALUES ('90', '14', '22', '赵凤仙', '2011-12-15 16:28:52', '赵凤仙完成‘宝象河水厂DN600管及原水管迁改设计’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('91', '14', '22', '赵凤仙', '2011-12-15 16:29:05', '赵凤仙完成‘宝象河水厂DN600管及原水管迁改设计’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('92', '77', '1', '赵  珊', '2011-12-15 16:31:21', '赵  珊成功对‘芒市轩岗乡集镇给水工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('93', '57', '1', '赵  珊', '2011-12-15 16:33:46', '赵  珊成功对‘螺蛳湾国际商贸城创业园新册产业城给水工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('94', '57', '22', '赵凤仙', '2011-12-15 16:35:15', '赵凤仙完成‘螺蛳湾国际商贸城创业园新册产业城给水工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('95', '57', '22', '赵凤仙', '2011-12-15 16:36:01', '赵凤仙对‘螺蛳湾国际商贸城创业园新册产业城给水工程’项目预算。<br>预算金额：￥856.38', '0');
INSERT INTO `t_message` VALUES ('96', '57', '22', '赵凤仙', '2011-12-15 16:36:31', '赵凤仙对‘螺蛳湾国际商贸城创业园新册产业城给水工程’项目预算。<br>预算金额：￥856.38', '0');
INSERT INTO `t_message` VALUES ('97', '77', '22', '赵凤仙', '2011-12-15 16:37:04', '赵凤仙完成‘芒市轩岗乡集镇给水工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('98', '57', '22', '赵凤仙', '2011-12-15 16:38:29', '赵凤仙对‘螺蛳湾国际商贸城创业园新册产业城给水工程’项目预算。<br>预算金额：￥856.38', '0');
INSERT INTO `t_message` VALUES ('99', '77', '22', '赵凤仙', '2011-12-15 16:47:01', '正在进行中', '1');
INSERT INTO `t_message` VALUES ('100', '57', '22', '赵凤仙', '2011-12-15 16:50:20', '赵凤仙完成‘螺蛳湾国际商贸城创业园新册产业城给水工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('101', '77', '22', '赵凤仙', '2011-12-15 16:55:20', '赵凤仙完成‘芒市轩岗乡集镇给水工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('102', '14', '10000', '朱讌棋', '2011-12-15 17:22:31', '朱讌棋对‘宝象河水厂DN600管及原水管迁改设计’项目预算。<br>预算金额：￥120.00', '0');
INSERT INTO `t_message` VALUES ('103', '14', '22', '赵凤仙', '2011-12-15 17:24:51', '赵凤仙完成‘宝象河水厂DN600管及原水管迁改设计’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('104', '14', '10001', '钟  原', '2011-12-15 17:26:10', '钟  原对‘宝象河水厂DN600管及原水管迁改设计’项目预算。<br>预算金额：￥128.00', '0');
INSERT INTO `t_message` VALUES ('105', '77', '22', '赵凤仙', '2011-12-15 17:34:00', '赵凤仙完成‘芒市轩岗乡集镇给水工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('106', '14', '10000', '朱讌棋', '2011-12-15 17:34:54', '朱讌棋对‘宝象河水厂DN600管及原水管迁改设计’项目预算。<br>预算金额：￥230.00', '0');
INSERT INTO `t_message` VALUES ('107', '28', '23', '杨芮粼', '2011-12-15 17:40:34', '杨芮粼对‘呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程’项目预算。<br>预算金额：￥1,125.00', '0');
INSERT INTO `t_message` VALUES ('108', '36', '8', '陈越舫', '2011-12-19 17:09:55', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('109', '39', '8', '陈越舫', '2011-12-19 17:13:54', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('110', '39', '8', '陈越舫', '2011-12-19 17:15:09', '初设于2011-11-7完成', '1');
INSERT INTO `t_message` VALUES ('111', '36', '8', '陈越舫', '2011-12-19 17:16:04', '2011-12-19工艺施工图完成', '1');
INSERT INTO `t_message` VALUES ('112', '69', '8', '陈越舫', '2011-12-20 16:18:37', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('113', '69', '8', '陈越舫', '2011-12-20 16:20:09', '2011-12-14初设完成', '1');
INSERT INTO `t_message` VALUES ('114', '67', '8', '陈越舫', '2011-12-20 16:21:06', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('115', '67', '8', '陈越舫', '2011-12-20 16:21:47', '2011-11-24施工图完成', '1');
INSERT INTO `t_message` VALUES ('116', '66', '8', '陈越舫', '2011-12-20 16:22:41', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('117', '65', '8', '陈越舫', '2011-12-20 16:23:52', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('118', '60', '8', '陈越舫', '2011-12-20 16:24:58', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('119', '60', '8', '陈越舫', '2011-12-20 16:25:37', '2011-12-9初设完成', '1');
INSERT INTO `t_message` VALUES ('120', '59', '8', '陈越舫', '2011-12-20 16:26:35', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('121', '59', '8', '陈越舫', '2011-12-20 16:27:23', '2011-12-13B区初设完成', '1');
INSERT INTO `t_message` VALUES ('122', '57', '8', '陈越舫', '2011-12-20 16:28:20', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('123', '66', '38', ' 李  燕 ', '2011-12-20 16:30:52', '甲方未提供资料', '1');
INSERT INTO `t_message` VALUES ('124', '32', '8', '陈越舫', '2011-12-20 16:31:01', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('125', '32', '8', '陈越舫', '2011-12-20 16:31:57', '2011-10-18，12-19方案完成', '1');
INSERT INTO `t_message` VALUES ('126', '30', '8', '陈越舫', '2011-12-20 16:32:41', '2011-11-18施工图完成', '1');
INSERT INTO `t_message` VALUES ('127', '65', '38', ' 李  燕 ', '2011-12-20 16:33:24', ' 李  燕 成功创建子图：东方首座写字楼给水工程  ', '0');
INSERT INTO `t_message` VALUES ('128', '57', '8', '陈越舫', '2011-12-20 16:33:30', '2011-12-13初设完成', '1');
INSERT INTO `t_message` VALUES ('129', '56', '8', '陈越舫', '2011-12-20 16:34:49', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('130', '56', '8', '陈越舫', '2011-12-20 16:35:34', '2011-11-19施工图完成', '1');
INSERT INTO `t_message` VALUES ('131', '41', '8', '陈越舫', '2011-12-20 16:36:42', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('132', '41', '8', '陈越舫', '2011-12-20 16:37:25', '2011-11-8初设完成', '1');
INSERT INTO `t_message` VALUES ('133', '39', '8', '陈越舫', '2011-12-20 16:38:49', '2011-11-7完成初设', '1');
INSERT INTO `t_message` VALUES ('134', '38', '8', '陈越舫', '2011-12-20 16:39:50', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('135', '38', '8', '陈越舫', '2011-12-20 16:40:42', '2011-10-31完成施工图', '1');
INSERT INTO `t_message` VALUES ('136', '36', '8', '陈越舫', '2011-12-20 16:42:53', '2011-12-19完成工艺施工图', '1');
INSERT INTO `t_message` VALUES ('137', '57', '41', ' 吴朋坤 ', '2011-12-20 17:19:36', ' 吴朋坤 成功创建子图：螺蛳湾国际商贸城创业园新册产业城给水工程  ', '0');
INSERT INTO `t_message` VALUES ('138', '57', '41', ' 吴朋坤 ', '2011-12-20 17:21:04', '初设未审\r\n', '1');
INSERT INTO `t_message` VALUES ('139', '57', '41', ' 吴朋坤 ', '2011-12-20 17:21:13', '', '1');
INSERT INTO `t_message` VALUES ('140', '69', '36', ' 徐  健 ', '2011-12-20 17:26:41', '初设完成', '1');
INSERT INTO `t_message` VALUES ('141', '67', '1', '赵  珊', '2011-12-23 15:55:34', '赵  珊成功更新‘云南省地震局宿舍改表’项目状态', '0');
INSERT INTO `t_message` VALUES ('142', '78', '31', '谢伟', '2011-12-26 10:04:29', '今天汇报工作 甲方未停工资料', '1');
INSERT INTO `t_message` VALUES ('143', '70', '10', ' 曹爱青 ', '2011-12-26 11:00:48', '已完成', '1');
INSERT INTO `t_message` VALUES ('144', '49', '10', ' 曹爱青 ', '2011-12-26 11:01:11', '已完成', '1');
INSERT INTO `t_message` VALUES ('145', '35', '10', ' 曹爱青 ', '2011-12-26 11:01:30', '已完成', '1');
INSERT INTO `t_message` VALUES ('146', '79', '1', '赵  珊', '2011-12-26 11:25:25', '赵  珊成功创建项目：螺蛳湾中央商务二级CBD项目给水工程', '0');
INSERT INTO `t_message` VALUES ('147', '80', '1', '赵  珊', '2011-12-26 11:26:34', '赵  珊成功创建项目：晨农商务中心给水工程', '0');
INSERT INTO `t_message` VALUES ('148', '81', '1', '赵  珊', '2011-12-26 11:27:43', '赵  珊成功创建项目：云波社区第五、第六居民小组改表工程', '0');
INSERT INTO `t_message` VALUES ('149', '82', '1', '赵  珊', '2011-12-26 11:28:59', '赵  珊成功创建项目：春城慧谷一期（二）A2地块给水工程', '0');
INSERT INTO `t_message` VALUES ('150', '83', '1', '赵  珊', '2011-12-26 11:30:05', '赵  珊成功创建项目：平和花园住宅小区给水工程', '0');
INSERT INTO `t_message` VALUES ('151', '84', '1', '赵  珊', '2011-12-26 11:32:14', '赵  珊成功创建项目：万和花园住宅小区给水工程', '0');
INSERT INTO `t_message` VALUES ('152', '85', '1', '赵  珊', '2011-12-26 11:36:52', '赵  珊成功创建项目：老挝DONGMAKA水厂设计工程', '0');
INSERT INTO `t_message` VALUES ('153', '86', '1', '赵  珊', '2011-12-26 11:36:52', '赵  珊成功创建项目：老挝DONGMAKA水厂设计工程', '0');
INSERT INTO `t_message` VALUES ('154', '87', '1', '赵  珊', '2011-12-26 11:37:53', '赵  珊成功创建项目：澄江供水工程', '0');
INSERT INTO `t_message` VALUES ('155', '88', '1', '赵  珊', '2011-12-26 11:38:53', '赵  珊成功创建项目：五华区观音寺村片区城中村改造给水工程', '0');
INSERT INTO `t_message` VALUES ('156', '89', '1', '赵  珊', '2011-12-26 11:40:54', '赵  珊成功创建项目：宾川县乔甸镇给水工程', '0');
INSERT INTO `t_message` VALUES ('157', '71', '31', '谢伟', '2011-12-26 14:54:49', '谢伟成功修改项目：五华区北仓城中村改造给水工程', '0');
INSERT INTO `t_message` VALUES ('158', '73', '31', '谢伟', '2011-12-26 14:55:37', '谢伟成功修改项目：羊肠小村城中村改造DN900原水管改迁', '0');
INSERT INTO `t_message` VALUES ('159', '74', '31', '谢伟', '2011-12-26 14:56:17', '谢伟成功修改项目：昆明市气象局呈贡新区给水工程', '0');
INSERT INTO `t_message` VALUES ('160', '75', '31', '谢伟', '2011-12-26 14:56:54', '谢伟成功修改项目：教场东路给水管改迁工程', '0');
INSERT INTO `t_message` VALUES ('161', '76', '31', '谢伟', '2011-12-26 14:57:31', '谢伟成功修改项目：瀚文云鼎商务大厦给水工程', '0');
INSERT INTO `t_message` VALUES ('162', '78', '31', '谢伟', '2011-12-26 14:58:42', '谢伟成功修改项目：云波第三股份合作社青龙园地下水置换工程', '0');
INSERT INTO `t_message` VALUES ('163', '79', '31', '谢伟', '2011-12-26 14:59:15', '谢伟成功修改项目：螺蛳湾中央商务二级CBD项目给水工程', '0');
INSERT INTO `t_message` VALUES ('164', '80', '31', '谢伟', '2011-12-26 14:59:47', '谢伟成功修改项目：晨农商务中心给水工程', '0');
INSERT INTO `t_message` VALUES ('165', '81', '31', '谢伟', '2011-12-26 15:00:27', '谢伟成功修改项目：云波社区第五、第六居民小组改表工程', '0');
INSERT INTO `t_message` VALUES ('166', '82', '31', '谢伟', '2011-12-26 15:00:52', '谢伟成功修改项目：春城慧谷一期（二）A2地块给水工程', '0');
INSERT INTO `t_message` VALUES ('167', '83', '31', '谢伟', '2011-12-26 15:01:10', '谢伟成功修改项目：平和花园住宅小区给水工程', '0');
INSERT INTO `t_message` VALUES ('168', '84', '31', '谢伟', '2011-12-26 15:01:28', '谢伟成功修改项目：万和花园住宅小区给水工程', '0');
INSERT INTO `t_message` VALUES ('169', '88', '31', '谢伟', '2011-12-26 15:01:56', '谢伟成功修改项目：五华区观音寺村片区城中村改造给水工程', '0');
INSERT INTO `t_message` VALUES ('170', '67', '1', '赵  珊', '2011-12-26 15:03:57', '赵  珊成功更新‘云南省地震局宿舍改表’项目状态', '0');
INSERT INTO `t_message` VALUES ('171', '56', '1', '赵  珊', '2011-12-26 15:04:18', '赵  珊成功更新‘五腊宏仁地块DN800给水管改迁’项目状态', '0');
INSERT INTO `t_message` VALUES ('172', '56', '1', '赵  珊', '2011-12-26 15:04:26', '赵  珊成功更新‘五腊宏仁地块DN800给水管改迁’项目状态', '0');
INSERT INTO `t_message` VALUES ('173', '67', '1', '赵  珊', '2011-12-26 15:06:21', '赵  珊成功修改项目：云南省地震局宿舍改表', '0');
INSERT INTO `t_message` VALUES ('174', '68', '1', '赵  珊', '2011-12-26 15:09:16', '赵  珊成功修改项目：丽江水厂滤池改造', '0');
INSERT INTO `t_message` VALUES ('175', '67', '1', '赵  珊', '2011-12-26 15:09:41', '赵  珊成功修改项目：云南省地震局宿舍改表', '0');
INSERT INTO `t_message` VALUES ('176', '66', '1', '赵  珊', '2011-12-26 15:11:37', '赵  珊成功修改项目：云南省艺术家园给水工程', '0');
INSERT INTO `t_message` VALUES ('177', '56', '1', '赵  珊', '2011-12-26 15:11:55', '赵  珊成功更新‘五腊宏仁地块DN800给水管改迁’项目状态', '0');
INSERT INTO `t_message` VALUES ('178', '89', '6', '朱家贵', '2011-12-26 15:37:05', '朱家贵成功修改项目：宾川县乔甸镇给水工程', '0');
INSERT INTO `t_message` VALUES ('179', '28', '35', '万  羽', '2011-12-26 18:23:59', '已经于2011.10.28完成设计任务', '1');
INSERT INTO `t_message` VALUES ('180', '46', '35', '万  羽', '2011-12-26 18:28:33', '已经于2011.11.25完成设计任务\r\n', '1');
INSERT INTO `t_message` VALUES ('181', '58', '35', '万  羽', '2011-12-26 18:31:59', '已经于2011.12.26完成设计任务,\r\n正在校对', '1');
INSERT INTO `t_message` VALUES ('182', '87', '1', '赵  珊', '2011-12-27 11:00:21', '赵  珊成功修改项目：澄江县抚仙湖东岸水厂可研', '0');
INSERT INTO `t_message` VALUES ('183', '88', '8', '陈越舫', '2011-12-27 17:27:12', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('184', '84', '8', '陈越舫', '2011-12-27 17:27:44', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('185', '83', '8', '陈越舫', '2011-12-27 17:28:26', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('186', '88', '37', ' 杜怡杉 ', '2011-12-27 17:30:27', '2011年12月27，资料齐全，开始初设', '1');
INSERT INTO `t_message` VALUES ('187', '83', '8', '陈越舫', '2011-12-27 17:31:46', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('188', '82', '8', '陈越舫', '2011-12-27 17:32:23', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('189', '81', '8', '陈越舫', '2011-12-27 17:32:47', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('190', '80', '8', '陈越舫', '2011-12-27 17:33:14', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('191', '79', '8', '陈越舫', '2011-12-27 17:33:50', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('192', '83', '8', '陈越舫', '2011-12-27 17:34:04', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('193', '83', '8', '陈越舫', '2011-12-27 17:34:23', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('194', '76', '8', '陈越舫', '2011-12-27 17:34:46', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('195', '75', '8', '陈越舫', '2011-12-27 17:35:10', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('196', '73', '8', '陈越舫', '2011-12-27 17:35:34', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('197', '69', '8', '陈越舫', '2011-12-27 17:35:45', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('198', '66', '8', '陈越舫', '2011-12-27 17:35:56', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('199', '84', '38', ' 李  燕 ', '2011-12-27 17:37:31', '甲方未提齐资料。', '1');
INSERT INTO `t_message` VALUES ('200', '83', '38', ' 李  燕 ', '2011-12-27 17:37:56', '甲方未提齐资料。', '1');
INSERT INTO `t_message` VALUES ('201', '66', '38', ' 李  燕 ', '2011-12-27 17:38:52', '无资料。', '1');
INSERT INTO `t_message` VALUES ('202', '65', '38', ' 李  燕 ', '2011-12-27 17:39:20', '正在与甲方对接泵房位置。', '1');
INSERT INTO `t_message` VALUES ('203', '14', '38', ' 李  燕 ', '2011-12-27 22:57:26', ' 李  燕 成功创建子图：12', '0');
INSERT INTO `t_message` VALUES ('204', '14', '31', '谢伟', '2011-12-27 23:27:22', '谢伟成功修改项目：宝象河水厂DN600管及原水管迁改设计', '0');
INSERT INTO `t_message` VALUES ('205', '83', '31', '谢伟', '2011-12-28 09:10:58', '谢伟成功修改项目：平和花园住宅小区给水工程', '0');
INSERT INTO `t_message` VALUES ('206', '66', '38', ' 李  燕 ', '2011-12-28 09:17:30', '2011.11.25.接到委托后立即与建设方联系，建设方内部设计未完，至今未提供资料。', '1');
INSERT INTO `t_message` VALUES ('207', '89', '35', '万  羽', '2011-12-28 09:38:54', '我于2011年12月27日收到甲方提供“宾川县乔甸镇城镇总体规划”，该规划与原甲方提供的项目建议书差别较大，因此，我需对原完成的可行性研究报告做出较大调整。不能于2011年12月31日前按时完成，申请延期，请领导批示', '1');
INSERT INTO `t_message` VALUES ('208', '58', '35', '万  羽', '2011-12-28 09:41:41', '于12月27日完成设计并完成校对、专业负责的签字。\r\n', '1');
INSERT INTO `t_message` VALUES ('209', '71', '35', '万  羽', '2011-12-28 09:43:51', '正在进行资料收集。', '1');
INSERT INTO `t_message` VALUES ('210', '64', '35', '万  羽', '2011-12-28 09:45:11', '正在进行1、7号地块的给水初步设计。\r\n', '1');
INSERT INTO `t_message` VALUES ('211', '63', '35', '万  羽', '2011-12-28 09:45:54', '正在进行资料收集。', '1');
INSERT INTO `t_message` VALUES ('212', '62', '35', '万  羽', '2011-12-28 09:55:44', '正在进行1、2、7地块的初步设计，需要与清源公司对接外管开口方案。', '1');
INSERT INTO `t_message` VALUES ('213', '61', '35', '万  羽', '2011-12-28 09:56:29', '正在进行资料收集。', '1');
INSERT INTO `t_message` VALUES ('214', '74', '35', '万  羽', '2011-12-28 10:20:27', '于12月16日完成方案，并发工作联系函给清源公司和甲方。现等待回复。', '1');
INSERT INTO `t_message` VALUES ('215', '45', '35', '万  羽', '2011-12-28 10:24:29', '于12月12日完成初步设计，等待初设会审。', '1');
INSERT INTO `t_message` VALUES ('216', '44', '35', '万  羽', '2011-12-28 10:25:46', '于12月26日完成施工图设计。', '1');
INSERT INTO `t_message` VALUES ('217', '28', '35', '万  羽', '2011-12-28 10:27:27', '于10月28日完成施工图设计。', '1');
INSERT INTO `t_message` VALUES ('218', '57', '41', ' 吴朋坤 ', '2011-12-29 09:25:04', '2011年12月13日初设完成，未进行初设会审。', '1');
INSERT INTO `t_message` VALUES ('219', '39', '41', ' 吴朋坤 ', '2011-12-29 09:26:59', '2011年11月7日初设完成，未进行初设会审。', '1');
INSERT INTO `t_message` VALUES ('220', '84', '38', ' 李  燕 ', '2011-12-30 09:25:39', '2011.12.22日与甲方联系，请甲方提供资料，至今未提供。', '1');
INSERT INTO `t_message` VALUES ('221', '83', '38', ' 李  燕 ', '2011-12-30 09:25:55', '2011.12.22日与甲方联系，请甲方提供资料，至今未提供。', '1');
INSERT INTO `t_message` VALUES ('222', '65', '38', ' 李  燕 ', '2011-12-30 09:27:21', '甲方未确定泵房位置。', '1');
INSERT INTO `t_message` VALUES ('223', '87', '6', '朱家贵', '2011-12-30 18:05:59', '朱家贵成功修改项目：澄江县抚仙湖东岸水厂可研', '0');
INSERT INTO `t_message` VALUES ('224', '89', '31', '谢伟', '2011-12-30 23:35:21', '谢伟成功修改项目：宾川县乔甸镇给水工程', '0');
INSERT INTO `t_message` VALUES ('225', '89', '6', '朱家贵', '2011-12-30 23:39:34', '朱家贵成功修改项目：宾川县乔甸镇给水工程', '0');
INSERT INTO `t_message` VALUES ('226', '71', '31', '谢伟', '2011-12-31 00:06:07', '谢伟成功修改项目：五华区北仓城中村改造给水工程', '0');
INSERT INTO `t_message` VALUES ('227', '66', '38', ' 李  燕 ', '2011-12-31 10:26:55', '2011.12.30.甲方提供内部四个地块的部分资料，我核算了生活泵房的大概规模，与2011.12.31.给甲方，请甲方提供泵房位置。\r\n外管部分：道路施工图未出，仍无法进行外管设计。', '1');
INSERT INTO `t_message` VALUES ('228', '89', '35', '万  羽', '2011-12-31 15:07:50', '万  羽成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('229', '86', '6', '朱家贵', '2011-12-31 15:45:27', '朱家贵成功修改项目：老挝DONGMAKA水厂设计工程', '0');
INSERT INTO `t_message` VALUES ('230', '89', '6', '朱家贵', '2011-12-31 15:48:23', '请和甲方联系。给出具体时间。', '1');
INSERT INTO `t_message` VALUES ('231', '88', '37', ' 杜怡杉 ', '2012-01-05 16:29:46', '2012年1月4日，初设完成', '1');
INSERT INTO `t_message` VALUES ('232', '80', '37', ' 杜怡杉 ', '2012-01-05 16:34:50', '2012年1月4日，资料齐全，开始初设', '1');
INSERT INTO `t_message` VALUES ('233', '82', '8', '陈越舫', '2012-01-06 14:16:32', '2012-1-5初设完成\r\n', '1');
INSERT INTO `t_message` VALUES ('234', '73', '8', '陈越舫', '2012-01-06 14:16:59', '2011-12-28初设完成', '1');
INSERT INTO `t_message` VALUES ('235', '87', '7', '杨珏雷', '2012-01-06 14:41:30', '杨珏雷成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('236', '47', '7', '杨珏雷', '2012-01-09 08:47:49', '杨珏雷成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('237', '87', '7', '杨珏雷', '2012-01-09 08:50:09', '杨珏雷成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('238', '87', '7', '杨珏雷', '2012-01-09 08:50:51', '杨珏雷成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('239', '61', '35', '万  羽', '2012-01-09 08:53:41', '资料收集完成，正在进行初步设计。', '1');
INSERT INTO `t_message` VALUES ('240', '37', '1', '赵  珊', '2012-01-09 09:51:16', '赵  珊成功更新‘昆明重型机械厂廉租房给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('241', '37', '1', '赵  珊', '2012-01-09 09:54:21', '赵  珊成功更新‘昆明重型机械厂廉租房给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('242', '77', '22', '赵凤仙', '2012-01-09 10:07:48', '赵凤仙对‘芒市轩岗乡集镇给水工程’项目预算。<br>预算金额：￥4,565.00', '0');
INSERT INTO `t_message` VALUES ('243', '72', '1', '赵  珊', '2012-01-09 10:44:43', '赵  珊成功更新‘同心闸调水工程方案设计’项目状态', '0');
INSERT INTO `t_message` VALUES ('244', '55', '1', '赵  珊', '2012-01-09 10:45:49', '赵  珊成功更新‘五华区西翥片区给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('245', '44', '1', '赵  珊', '2012-01-09 10:46:14', '赵  珊成功更新‘中国医学科学院医学生物学研究所庭院给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('246', '34', '1', '赵  珊', '2012-01-09 10:46:51', '赵  珊成功更新‘西山区19号规划路给水管改迁工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('247', '34', '1', '赵  珊', '2012-01-09 10:47:16', '赵  珊成功更新‘西山区19号规划路给水管改迁工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('248', '35', '1', '赵  珊', '2012-01-09 10:47:24', '赵  珊成功更新‘西山区19号规划路给水管改迁工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('249', '36', '1', '赵  珊', '2012-01-09 10:47:44', '赵  珊成功更新‘昆明重型机械厂廉租房给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('250', '37', '1', '赵  珊', '2012-01-09 10:47:52', '赵  珊成功更新‘昆明重型机械厂廉租房给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('251', '77', '22', '赵凤仙', '2012-01-09 11:28:31', '赵凤仙对‘芒市轩岗乡集镇给水工程’项目预算。<br>预算金额：￥969.47', '0');
INSERT INTO `t_message` VALUES ('252', '77', '22', '赵凤仙', '2012-01-09 11:29:10', '赵凤仙对‘芒市轩岗乡集镇给水工程’项目预算。<br>预算金额：￥969.47', '0');
INSERT INTO `t_message` VALUES ('253', '60', '1', '赵  珊', '2012-01-09 17:22:21', '赵  珊成功更新‘金星农贸市场给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('254', '60', '1', '赵  珊', '2012-01-09 17:22:28', '赵  珊成功更新‘金星农贸市场给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('255', '90', '1', '赵  珊', '2012-01-10 10:19:39', '赵  珊成功创建项目：西山区10地块严家地城中村改造项目', '0');
INSERT INTO `t_message` VALUES ('256', '90', '1', '赵  珊', '2012-01-10 10:21:11', '赵  珊成功修改项目：西山区10地块严家地城中村改造项目', '0');
INSERT INTO `t_message` VALUES ('257', '91', '1', '赵  珊', '2012-01-10 10:22:44', '赵  珊成功创建项目：昆明力神重工经济适用房给水工程', '0');
INSERT INTO `t_message` VALUES ('258', '91', '31', '谢伟', '2012-01-10 10:24:36', '谢伟成功修改项目：昆明力神重工经济适用房给水工程', '0');
INSERT INTO `t_message` VALUES ('259', '90', '31', '谢伟', '2012-01-10 10:25:01', '谢伟成功修改项目：西山区10地块严家地城中村改造项目', '0');
INSERT INTO `t_message` VALUES ('260', '91', '1', '赵  珊', '2012-01-10 10:28:45', '赵  珊成功修改项目：昆明力神重工经济适用房给水工程', '0');
INSERT INTO `t_message` VALUES ('261', '91', '1', '赵  珊', '2012-01-10 10:29:17', '赵  珊成功修改项目：昆明力神重工经济适用房给水工程', '0');
INSERT INTO `t_message` VALUES ('262', '88', '1', '赵  珊', '2012-01-10 10:44:59', '赵  珊成功更新‘五华区观音寺村片区城中村改造给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('263', '90', '8', '陈越舫', '2012-01-10 17:13:11', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('264', '91', '8', '陈越舫', '2012-01-10 17:13:52', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('265', '90', '41', ' 吴朋坤 ', '2012-01-12 14:21:28', '1.10日与甲方联系，目前正在收集资料中。', '1');
INSERT INTO `t_message` VALUES ('266', '84', '38', ' 李  燕 ', '2012-01-12 14:30:27', '2012.1.12.看现场，已请建设方实测开口处的管网压力。针对现场设计人员与甲方协商的问题，甲方需内部讨论后才能答复我院，目前暂不能进一步设计。', '1');
INSERT INTO `t_message` VALUES ('267', '83', '38', ' 李  燕 ', '2012-01-12 14:33:19', '2012.1.12.看现场，外管不能确定，甲方改日请通用一起确定外管。设计人员与甲方协商的其它问题，甲方需内部讨论后答复设计人员，目前暂不能进一步设计。', '1');
INSERT INTO `t_message` VALUES ('268', '44', '1', '赵  珊', '2012-01-13 09:40:28', '赵  珊成功对‘中国医学科学院医学生物学研究所庭院给水工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('269', '56', '37', ' 杜怡杉 ', '2012-01-13 10:05:57', '2011年12月6日，现场交底', '1');
INSERT INTO `t_message` VALUES ('270', '41', '37', ' 杜怡杉 ', '2012-01-13 10:09:26', '2012年12月19日，完成泵房工艺施工图，资料提交电气\r\n2012年1月5日，完成庭院管网施工图，资料提交土建', '1');
INSERT INTO `t_message` VALUES ('271', '72', '1', '赵  珊', '2012-01-13 10:37:14', '赵  珊成功对‘同心闸调水工程方案设计’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('272', '44', '1', '赵  珊', '2012-01-13 10:38:05', '赵  珊成功更新‘中国医学科学院医学生物学研究所庭院给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('273', '42', '1', '赵  珊', '2012-01-13 10:39:39', '赵  珊成功更新‘溪谷雅苑住宅小区给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('274', '41', '1', '赵  珊', '2012-01-13 10:39:52', '赵  珊成功更新‘溪谷雅苑住宅小区给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('275', '42', '1', '赵  珊', '2012-01-13 10:41:01', '赵  珊成功更新‘溪谷雅苑住宅小区给水工程’项目状态', '0');
INSERT INTO `t_message` VALUES ('276', '78', '1', '赵  珊', '2012-01-13 10:47:40', '赵  珊成功对‘云波第三股份合作社青龙园地下水置换工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('277', '32', '15', '白  皓', '2012-01-13 15:39:27', '2012.1.5日 赴现场对方案进行会审，建设方根据富民县自来水公司要求，提出部分修改性意见，供水方式及用水人数均以改变。根据建设方提供资料深度，需对该项目进行二次方案设计，预计2012.2.4日出图。', '1');
INSERT INTO `t_message` VALUES ('278', '91', '15', '白  皓', '2012-01-13 15:42:04', '2012.1.11下午，经和建设方联系，图纸等资料由建设方发送，至2012.1.13日未收到资料，还在和建设方资料对接中。', '1');
INSERT INTO `t_message` VALUES ('279', '82', '15', '白  皓', '2012-01-13 15:48:34', '2012.1.9日交由总工校对。', '1');
INSERT INTO `t_message` VALUES ('280', '79', '15', '白  皓', '2012-01-13 15:50:35', '预计2012.1.19日前完成外部管网方案设计。', '1');
INSERT INTO `t_message` VALUES ('281', '67', '15', '白  皓', '2012-01-13 15:51:19', '施工图纸一完成。完成时间2011.11.10', '1');
INSERT INTO `t_message` VALUES ('282', '59', '15', '白  皓', '2012-01-13 15:51:55', '初设已完成 等待中心通知初设会审。', '1');
INSERT INTO `t_message` VALUES ('283', '36', '15', '白  皓', '2012-01-13 15:52:26', '施工图纸已于2011年底完成。', '1');
INSERT INTO `t_message` VALUES ('284', '77', '22', '赵凤仙', '2012-01-13 16:20:44', '赵凤仙完成‘芒市轩岗乡集镇给水工程’项目预算任务的分配。', '0');
INSERT INTO `t_message` VALUES ('285', '92', '1', '赵  珊', '2012-01-13 17:10:40', '赵  珊成功创建项目：信息产业基地北入口道路DN800管改迁工程', '0');
INSERT INTO `t_message` VALUES ('286', '87', '7', '杨珏雷', '2012-01-16 08:43:32', '根据专家意见文本修改中', '1');
INSERT INTO `t_message` VALUES ('287', '87', '7', '杨珏雷', '2012-01-16 08:44:30', '配合甲方土地报批多次修改建筑总图，星期六再次提交甲方', '1');
INSERT INTO `t_message` VALUES ('288', '47', '7', '杨珏雷', '2012-01-16 08:47:03', '再次优化厂区平面，大量减少一期实施挡土墙及挖方量。本周计划提交全部终版构筑物', '1');
INSERT INTO `t_message` VALUES ('289', '64', '35', '万  羽', '2012-01-16 08:49:01', '正在校对1、7号地块的给水初步设计。 \r\n', '1');
INSERT INTO `t_message` VALUES ('290', '86', '7', '杨珏雷', '2012-01-16 08:49:13', '已提交大部分构筑物工艺图，今天提交泵房工艺图，管道收到地形图，今天可开始工作', '1');
INSERT INTO `t_message` VALUES ('291', '86', '7', '杨珏雷', '2012-01-16 08:50:18', '同时等待甲方回复', '1');
INSERT INTO `t_message` VALUES ('292', '61', '35', '万  羽', '2012-01-16 08:50:18', '正在校对给水初步设计。 \r\n', '1');
INSERT INTO `t_message` VALUES ('293', '62', '35', '万  羽', '2012-01-16 08:51:17', '正在校对1、2、3号地块的给水初步设计。', '1');
INSERT INTO `t_message` VALUES ('294', '67', '1', '赵  珊', '2012-01-16 08:54:04', '赵  珊成功更新‘云南省地震局宿舍改表’项目状态', '0');
INSERT INTO `t_message` VALUES ('295', '58', '1', '赵  珊', '2012-01-16 08:55:02', '赵  珊成功对‘昆明多宝电缆公司给水工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('296', '80', '37', ' 杜怡杉 ', '2012-01-16 10:45:04', '初设基本完成，挂表方式不确定，暂不能出图', '1');
INSERT INTO `t_message` VALUES ('297', '92', '31', '谢伟', '2012-01-16 10:58:01', '谢伟成功修改项目：信息产业基地北入口道路DN800管改迁工程', '0');
INSERT INTO `t_message` VALUES ('298', '88', '37', ' 杜怡杉 ', '2012-01-16 10:59:17', ' 杜怡杉 成功创建子图：五华区观音寺村片区城中村改造给水工程初步设计', '0');
INSERT INTO `t_message` VALUES ('299', '41', '37', ' 杜怡杉 ', '2012-01-16 11:01:31', ' 杜怡杉 成功创建子图：庭院生活管网及室外消防给水管道施工设计图', '0');
INSERT INTO `t_message` VALUES ('300', '41', '37', ' 杜怡杉 ', '2012-01-16 11:02:26', ' 杜怡杉 成功创建子图：生活加压泵房', '0');
INSERT INTO `t_message` VALUES ('301', '41', '37', ' 杜怡杉 ', '2012-01-16 11:06:15', ' 杜怡杉 成功创建子图：室外消防泵房', '0');
INSERT INTO `t_message` VALUES ('302', '92', '10', ' 曹爱青 ', '2012-01-16 15:29:07', ' 曹爱青 成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('303', '7', '38', ' 李  燕 ', '2012-01-17 00:14:54', ' 李  燕 成功修改子图：asda', '0');
INSERT INTO `t_message` VALUES ('304', '92', '20', ' 李  祥 ', '2012-01-17 16:00:27', '已提交土建条件图', '1');
INSERT INTO `t_message` VALUES ('305', '72', '1', '赵  珊', '2012-01-18 09:10:54', '赵  珊成功更新‘同心闸调水工程方案设计’项目状态', '0');
INSERT INTO `t_message` VALUES ('306', '93', '1', '赵  珊', '2012-01-18 14:40:55', '赵  珊成功创建项目：志诚家园小区一户一表改造庭院管工程', '0');
INSERT INTO `t_message` VALUES ('307', '93', '1', '赵  珊', '2012-01-18 14:54:04', '赵  珊成功修改项目：志诚家园小区一户一表改造庭院管工程', '0');
INSERT INTO `t_message` VALUES ('308', '93', '31', '谢伟', '2012-01-18 15:50:21', '谢伟成功修改项目：志诚家园小区一户一表改造庭院管工程', '0');
INSERT INTO `t_message` VALUES ('309', '79', '15', '白  皓', '2012-01-19 14:34:41', '2012.1.18日 外部管网方案完成 提交主任校对', '1');
INSERT INTO `t_message` VALUES ('310', '93', '8', '陈越舫', '2012-01-19 15:19:10', '陈越舫成功分派项目任务：', '0');
INSERT INTO `t_message` VALUES ('311', '79', '8', '陈越舫', '2012-01-19 15:34:40', '1.19,完成校对', '1');

-- ----------------------------
-- Table structure for `t_message_seq`
-- ----------------------------
DROP TABLE IF EXISTS `t_message_seq`;
CREATE TABLE `t_message_seq` (
  `groupID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `maxNO` int(11) default NULL,
  `stamp` datetime default NULL,
  PRIMARY KEY  (`groupID`,`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_message_seq
-- ----------------------------
INSERT INTO `t_message_seq` VALUES ('9', '8', '11', '2011-10-22 01:58:52');
INSERT INTO `t_message_seq` VALUES ('14', '1', '20', '2011-10-23 22:37:36');
INSERT INTO `t_message_seq` VALUES ('14', '8', '6', '2011-10-20 00:37:34');
INSERT INTO `t_message_seq` VALUES ('14', '15', '204', '2012-01-13 15:54:23');
INSERT INTO `t_message_seq` VALUES ('14', '31', '7', '2011-10-20 00:36:14');
INSERT INTO `t_message_seq` VALUES ('14', '38', '204', '2011-12-28 10:08:28');
INSERT INTO `t_message_seq` VALUES ('14', '10000', '102', '2011-12-15 17:22:57');
INSERT INTO `t_message_seq` VALUES ('14', '10001', '104', '2011-12-15 17:26:30');
INSERT INTO `t_message_seq` VALUES ('21', '28', '8', '2011-10-20 22:33:59');
INSERT INTO `t_message_seq` VALUES ('23', '35', '9', '2011-10-20 22:26:46');
INSERT INTO `t_message_seq` VALUES ('25', '8', '10', '2011-10-21 00:09:10');
INSERT INTO `t_message_seq` VALUES ('26', '1', '31', '2011-10-23 22:53:34');
INSERT INTO `t_message_seq` VALUES ('26', '31', '31', '2011-10-23 22:58:14');
INSERT INTO `t_message_seq` VALUES ('26', '38', '31', '2011-10-24 00:42:30');
INSERT INTO `t_message_seq` VALUES ('28', '22', '217', '2012-01-09 10:06:41');
INSERT INTO `t_message_seq` VALUES ('28', '35', '217', '2012-01-05 08:39:07');
INSERT INTO `t_message_seq` VALUES ('28', '38', '217', '2012-01-09 23:55:57');
INSERT INTO `t_message_seq` VALUES ('30', '8', '126', '2012-01-13 09:36:16');
INSERT INTO `t_message_seq` VALUES ('30', '37', '126', '2011-12-27 17:31:29');
INSERT INTO `t_message_seq` VALUES ('32', '8', '124', '2011-12-20 16:31:58');
INSERT INTO `t_message_seq` VALUES ('32', '15', '277', '2012-01-13 15:39:34');
INSERT INTO `t_message_seq` VALUES ('35', '10', '74', '2011-12-05 13:50:53');
INSERT INTO `t_message_seq` VALUES ('35', '31', '32', '2011-11-09 17:46:54');
INSERT INTO `t_message_seq` VALUES ('36', '8', '111', '2011-12-20 13:30:47');
INSERT INTO `t_message_seq` VALUES ('36', '15', '283', '2012-01-13 15:52:30');
INSERT INTO `t_message_seq` VALUES ('38', '8', '134', '2011-12-20 16:40:44');
INSERT INTO `t_message_seq` VALUES ('38', '38', '135', '2011-12-27 17:39:42');
INSERT INTO `t_message_seq` VALUES ('39', '8', '133', '2011-12-20 16:38:56');
INSERT INTO `t_message_seq` VALUES ('39', '41', '219', '2011-12-29 09:27:10');
INSERT INTO `t_message_seq` VALUES ('41', '8', '132', '2012-01-13 10:05:41');
INSERT INTO `t_message_seq` VALUES ('41', '37', '274', '2012-01-16 10:45:52');
INSERT INTO `t_message_seq` VALUES ('44', '31', '216', '2012-01-09 09:24:29');
INSERT INTO `t_message_seq` VALUES ('44', '35', '216', '2011-12-28 10:25:51');
INSERT INTO `t_message_seq` VALUES ('45', '35', '215', '2012-01-09 08:55:20');
INSERT INTO `t_message_seq` VALUES ('46', '35', '180', '2012-01-09 08:55:22');
INSERT INTO `t_message_seq` VALUES ('47', '7', '288', '2012-01-16 08:47:11');
INSERT INTO `t_message_seq` VALUES ('49', '10', '144', '2012-01-17 17:12:14');
INSERT INTO `t_message_seq` VALUES ('56', '8', '177', '2011-12-30 17:23:01');
INSERT INTO `t_message_seq` VALUES ('56', '37', '269', '2012-01-16 10:45:15');
INSERT INTO `t_message_seq` VALUES ('57', '1', '139', '2011-12-23 16:06:27');
INSERT INTO `t_message_seq` VALUES ('57', '8', '218', '2012-01-09 11:02:22');
INSERT INTO `t_message_seq` VALUES ('57', '22', '98', '2011-12-15 16:45:51');
INSERT INTO `t_message_seq` VALUES ('57', '31', '218', '2012-01-16 09:20:50');
INSERT INTO `t_message_seq` VALUES ('57', '41', '218', '2011-12-29 09:25:25');
INSERT INTO `t_message_seq` VALUES ('58', '35', '208', '2011-12-28 09:41:51');
INSERT INTO `t_message_seq` VALUES ('59', '8', '121', '2011-12-30 17:22:48');
INSERT INTO `t_message_seq` VALUES ('59', '15', '121', '2012-01-13 15:51:59');
INSERT INTO `t_message_seq` VALUES ('60', '8', '254', '2012-01-13 09:56:30');
INSERT INTO `t_message_seq` VALUES ('60', '36', '254', '2012-01-10 17:12:36');
INSERT INTO `t_message_seq` VALUES ('61', '35', '239', '2012-01-09 09:22:26');
INSERT INTO `t_message_seq` VALUES ('62', '35', '212', '2011-12-28 09:55:52');
INSERT INTO `t_message_seq` VALUES ('63', '8', '60', '2011-12-15 17:44:07');
INSERT INTO `t_message_seq` VALUES ('63', '35', '211', '2011-12-28 09:46:01');
INSERT INTO `t_message_seq` VALUES ('64', '35', '289', '2012-01-16 08:50:00');
INSERT INTO `t_message_seq` VALUES ('65', '38', '222', '2011-12-30 09:50:27');
INSERT INTO `t_message_seq` VALUES ('66', '1', '68', '2011-12-07 00:17:42');
INSERT INTO `t_message_seq` VALUES ('66', '38', '227', '2011-12-31 10:27:13');
INSERT INTO `t_message_seq` VALUES ('67', '1', '69', '2011-12-07 00:19:41');
INSERT INTO `t_message_seq` VALUES ('67', '8', '141', '2011-12-26 09:17:12');
INSERT INTO `t_message_seq` VALUES ('67', '15', '175', '2011-12-27 17:29:54');
INSERT INTO `t_message_seq` VALUES ('69', '8', '112', '2011-12-20 16:20:11');
INSERT INTO `t_message_seq` VALUES ('69', '31', '70', '2011-12-06 23:23:06');
INSERT INTO `t_message_seq` VALUES ('69', '36', '197', '2012-01-10 17:12:47');
INSERT INTO `t_message_seq` VALUES ('70', '1', '72', '2011-12-06 22:48:31');
INSERT INTO `t_message_seq` VALUES ('70', '10', '72', '2011-12-05 13:35:00');
INSERT INTO `t_message_seq` VALUES ('71', '35', '226', '2012-01-09 08:47:54');
INSERT INTO `t_message_seq` VALUES ('72', '6', '81', '2011-12-31 15:46:44');
INSERT INTO `t_message_seq` VALUES ('73', '8', '234', '2012-01-06 14:29:16');
INSERT INTO `t_message_seq` VALUES ('73', '36', '234', '2012-01-10 17:13:09');
INSERT INTO `t_message_seq` VALUES ('74', '8', '214', '2012-01-12 09:53:24');
INSERT INTO `t_message_seq` VALUES ('74', '31', '83', '2011-12-20 14:20:59');
INSERT INTO `t_message_seq` VALUES ('74', '35', '214', '2011-12-28 10:20:33');
INSERT INTO `t_message_seq` VALUES ('75', '36', '195', '2012-01-10 17:12:22');
INSERT INTO `t_message_seq` VALUES ('76', '8', '161', '2011-12-26 22:09:36');
INSERT INTO `t_message_seq` VALUES ('77', '1', '105', '2011-12-15 17:36:14');
INSERT INTO `t_message_seq` VALUES ('77', '22', '252', '2012-01-12 10:05:16');
INSERT INTO `t_message_seq` VALUES ('77', '31', '105', '2011-12-20 14:02:06');
INSERT INTO `t_message_seq` VALUES ('78', '1', '87', '2011-12-20 00:03:04');
INSERT INTO `t_message_seq` VALUES ('78', '8', '162', '2011-12-31 01:13:16');
INSERT INTO `t_message_seq` VALUES ('78', '31', '142', '2011-12-26 10:05:49');
INSERT INTO `t_message_seq` VALUES ('79', '8', '309', '2012-01-19 15:34:44');
INSERT INTO `t_message_seq` VALUES ('79', '15', '309', '2012-01-19 14:34:48');
INSERT INTO `t_message_seq` VALUES ('79', '31', '191', '2012-01-09 10:29:10');
INSERT INTO `t_message_seq` VALUES ('80', '8', '232', '2012-01-09 09:10:25');
INSERT INTO `t_message_seq` VALUES ('80', '31', '232', '2012-01-16 09:18:45');
INSERT INTO `t_message_seq` VALUES ('80', '37', '296', '2012-01-16 10:54:18');
INSERT INTO `t_message_seq` VALUES ('82', '8', '233', '2012-01-09 09:08:34');
INSERT INTO `t_message_seq` VALUES ('82', '15', '279', '2012-01-13 15:48:40');
INSERT INTO `t_message_seq` VALUES ('82', '31', '233', '2012-01-09 23:13:41');
INSERT INTO `t_message_seq` VALUES ('83', '8', '267', '2012-01-16 09:22:47');
INSERT INTO `t_message_seq` VALUES ('83', '31', '221', '2012-01-09 23:16:22');
INSERT INTO `t_message_seq` VALUES ('83', '37', '267', '2012-01-16 10:43:33');
INSERT INTO `t_message_seq` VALUES ('83', '38', '221', '2011-12-30 09:26:01');
INSERT INTO `t_message_seq` VALUES ('84', '8', '266', '2012-01-16 09:22:27');
INSERT INTO `t_message_seq` VALUES ('84', '31', '266', '2012-01-16 09:22:59');
INSERT INTO `t_message_seq` VALUES ('84', '38', '220', '2011-12-31 10:27:24');
INSERT INTO `t_message_seq` VALUES ('86', '7', '290', '2012-01-16 08:50:20');
INSERT INTO `t_message_seq` VALUES ('86', '31', '229', '2012-01-09 23:12:57');
INSERT INTO `t_message_seq` VALUES ('87', '1', '154', '2011-12-26 22:50:11');
INSERT INTO `t_message_seq` VALUES ('87', '7', '287', '2012-01-16 08:44:37');
INSERT INTO `t_message_seq` VALUES ('87', '31', '238', '2012-01-09 10:28:33');
INSERT INTO `t_message_seq` VALUES ('88', '8', '231', '2012-01-09 09:08:59');
INSERT INTO `t_message_seq` VALUES ('88', '31', '231', '2012-01-09 10:26:51');
INSERT INTO `t_message_seq` VALUES ('88', '37', '262', '2012-01-13 10:12:39');
INSERT INTO `t_message_seq` VALUES ('89', '1', '207', '2011-12-28 10:02:02');
INSERT INTO `t_message_seq` VALUES ('89', '6', '230', '2011-12-31 15:48:58');
INSERT INTO `t_message_seq` VALUES ('89', '31', '230', '2012-01-09 10:18:44');
INSERT INTO `t_message_seq` VALUES ('89', '35', '230', '2011-12-31 16:44:29');
INSERT INTO `t_message_seq` VALUES ('89', '39', '228', '2011-12-31 15:38:02');
INSERT INTO `t_message_seq` VALUES ('89', '40', '230', '2011-12-31 15:57:53');
INSERT INTO `t_message_seq` VALUES ('90', '8', '265', '2012-01-13 09:19:05');
INSERT INTO `t_message_seq` VALUES ('90', '31', '265', '2012-01-13 15:51:03');
INSERT INTO `t_message_seq` VALUES ('90', '41', '265', '2012-01-12 14:21:42');
INSERT INTO `t_message_seq` VALUES ('91', '8', '278', '2012-01-16 08:52:00');
INSERT INTO `t_message_seq` VALUES ('91', '15', '278', '2012-01-13 15:42:31');
INSERT INTO `t_message_seq` VALUES ('91', '31', '278', '2012-01-13 15:50:54');
INSERT INTO `t_message_seq` VALUES ('92', '10', '304', '2012-01-17 17:11:32');
INSERT INTO `t_message_seq` VALUES ('92', '20', '304', '2012-01-17 16:02:10');
INSERT INTO `t_message_seq` VALUES ('93', '8', '310', '2012-01-19 17:12:41');

-- ----------------------------
-- Table structure for `t_person`
-- ----------------------------
DROP TABLE IF EXISTS `t_person`;
CREATE TABLE `t_person` (
  `id` int(11) NOT NULL auto_increment,
  `userCode` varchar(12) NOT NULL,
  `userName` varchar(12) NOT NULL,
  `password` varchar(12) NOT NULL,
  `deptID` int(11) default NULL,
  `teamLeader` int(11) default NULL,
  `role` varchar(20) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_person
-- ----------------------------
INSERT INTO `t_person` VALUES ('1', 'zhaoshang', '赵  珊', '1', '1', '1', '1');
INSERT INTO `t_person` VALUES ('6', 'zhujiagui', '朱家贵', '3', '22', '1', '2');
INSERT INTO `t_person` VALUES ('7', 'yangjuelei', '杨珏雷', '4', '31', '1', '6');
INSERT INTO `t_person` VALUES ('8', 'chenyuefang', '陈越舫', '0', '32', '1', '6');
INSERT INTO `t_person` VALUES ('9', 'zhangyijuan', '张诣涓', '7', '33', '1', '6');
INSERT INTO `t_person` VALUES ('10', 'caoaiqing', ' 曹爱青 ', '6', '34', '1', '6');
INSERT INTO `t_person` VALUES ('12', 'wangjiajia', '王佳佳', '11', '31', '0', '6');
INSERT INTO `t_person` VALUES ('14', 'lipeiizhi', '李培志', '17', '31', '0', '6');
INSERT INTO `t_person` VALUES ('15', 'baihao', '白  皓', '18', '32', '0', '6');
INSERT INTO `t_person` VALUES ('16', 'yangjian', '杨  坚', '20', '8', '1', '7');
INSERT INTO `t_person` VALUES ('17', 'liucen', '刘  琛', '19', '31', '0', '6');
INSERT INTO `t_person` VALUES ('18', 'zhoumingyu', '周明宇', '21', '33', '0', '6');
INSERT INTO `t_person` VALUES ('19', 'wanghao', ' 王  浩 ', '22', '33', '0', '6');
INSERT INTO `t_person` VALUES ('20', 'lix', ' 李  祥 ', '222', '34', '0', '6');
INSERT INTO `t_person` VALUES ('21', 'lijinping', ' 李金平 ', '24', '34', '0', '6');
INSERT INTO `t_person` VALUES ('22', 'zhaofengxian', '赵凤仙', '25', '4', '1', '8');
INSERT INTO `t_person` VALUES ('23', 'yangruiling', '杨芮粼', '26', '4', '0', '8');
INSERT INTO `t_person` VALUES ('24', 'guoli', '葛  立', '27', '5', '1', '9');
INSERT INTO `t_person` VALUES ('25', 'liling', '李  琳', '28', '6', '0', '10');
INSERT INTO `t_person` VALUES ('26', 'linzhihua', '林志华', '29', '31', '0', '6');
INSERT INTO `t_person` VALUES ('27', 'huangmin', '黄  敏', '30', '31', '0', '6');
INSERT INTO `t_person` VALUES ('28', 'zhuxinjun', '朱新军', '31', '31', '0', '6');
INSERT INTO `t_person` VALUES ('29', 'zhangwei', '张  伟', '32', '31', '0', '6');
INSERT INTO `t_person` VALUES ('30', 'liwenlu', '李文露', '33', '31', '0', '6');
INSERT INTO `t_person` VALUES ('31', 'xiewei', '谢伟', '2', '21', '1', '2');
INSERT INTO `t_person` VALUES ('32', 'zhangtong', '张  彤', '34', '31', '0', '6');
INSERT INTO `t_person` VALUES ('33', 'xulinli', '许伶俐', '35', '31', '0', '6');
INSERT INTO `t_person` VALUES ('34', 'mengweiming', '孟伟明', '36', '32', '0', '6');
INSERT INTO `t_person` VALUES ('35', 'wy', '万  羽', '37', '35', '1', '6');
INSERT INTO `t_person` VALUES ('36', 'xujian', ' 徐  健 ', '38', '32', '0', '6');
INSERT INTO `t_person` VALUES ('37', 'duyishan', ' 杜怡杉 ', '39', '32', '0', '6');
INSERT INTO `t_person` VALUES ('38', 'liyan', ' 李  燕 ', '40', '32', '0', '6');
INSERT INTO `t_person` VALUES ('39', 'zoz', ' 张偶正 ', '123', '35', '0', '6');
INSERT INTO `t_person` VALUES ('40', 'hjl', ' 华佳琳 ', '219', '35', '0', '6');
INSERT INTO `t_person` VALUES ('41', 'wupengkun', ' 吴朋坤 ', '42', '32', '0', '6');
INSERT INTO `t_person` VALUES ('42', 'hcan', ' 黄  灿 ', '0', '35', '0', '6');
INSERT INTO `t_person` VALUES ('43', 'cyw', ' 程永伟 ', '0', '35', '0', '6');
INSERT INTO `t_person` VALUES ('44', 'maowenwu', ' 毛文武 ', '1', '33', '0', '6');
INSERT INTO `t_person` VALUES ('45', 'liushuo', ' 刘  硕 ', '1', '33', '0', '6');
INSERT INTO `t_person` VALUES ('46', 'helei', ' 何  蕾 ', '1', '33', '0', '6');
INSERT INTO `t_person` VALUES ('48', 'yangyimei', '杨一梅', '1', '7', '0', '11');
INSERT INTO `t_person` VALUES ('49', 'wuhui', '吴辉', '1', '7', '0', '11');
INSERT INTO `t_person` VALUES ('9999', 'admin', '系统管理员', 'admin', '9999', '0', '9999');
INSERT INTO `t_person` VALUES ('10000', 'zhuyuanqi', '朱讌棋', '1', '4', '0', '8');
INSERT INTO `t_person` VALUES ('10001', 'zhongyuan', '钟  原', '2', '4', '0', '8');

-- ----------------------------
-- Table structure for `t_project`
-- ----------------------------
DROP TABLE IF EXISTS `t_project`;
CREATE TABLE `t_project` (
  `ID` int(11) NOT NULL auto_increment,
  `prjNumber` varchar(10) default NULL COMMENT '工程编号',
  `prjName` varchar(50) default NULL COMMENT '工程名称',
  `prjType` int(3) NOT NULL COMMENT '工程类型',
  `contract` bit(1) NOT NULL default '\0',
  `deposit` bit(1) NOT NULL default '\0',
  `collection` bit(1) NOT NULL default '\0',
  `audit` bit(1) NOT NULL default '\0',
  `complete` bit(1) NOT NULL default '\0',
  `prjPriority` int(3) default NULL COMMENT '项目优先级',
  `prjStage` varchar(15) default NULL COMMENT '项目所处阶段',
  `startDate` date NOT NULL COMMENT '开始日期',
  `endDate` date default NULL COMMENT '结止日期',
  `docNO` varchar(20) default NULL COMMENT '工程归档编号',
  `budgetFlag` bit(1) NOT NULL default '\0' COMMENT '预算标记',
  `budgetAmount` float(8,2) default NULL COMMENT '算预金额',
  `feeFlag` bit(1) NOT NULL default '\0' COMMENT '收费标记',
  `delFlag` bit(1) NOT NULL default '\0' COMMENT '删除标记',
  `description` varchar(200) default NULL,
  `createDate` datetime default NULL COMMENT '创建日期',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_project
-- ----------------------------
INSERT INTO `t_project` VALUES ('14', '2011-143', '宝象河水厂DN600管及原水管迁改设计', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-09-09', '2011-11-30', null, '', '230.00', '\0', '\0', '这个是我的记事本', '2011-09-29 23:43:29');
INSERT INTO `t_project` VALUES ('28', null, '呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-24', '2011-10-28', null, '', '1125.00', '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('29', null, '呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程', '1', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-24', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('30', null, '彩云北路综合管沟DN1000给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-24', '2011-10-28', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('31', null, '彩云北路综合管沟DN1000给水工程', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-24', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('32', '2011-166', '富民繁花山', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-25', '2011-11-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('33', '2011-166', '富民繁花山', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-25', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('34', '2011-167', '西山区19号规划路给水管改迁工程', '4', '', '', '\0', '\0', '\0', null, null, '2011-10-26', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('35', '2011-167', '西山区19号规划路给水管改迁工程', '5', '', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-11-04', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('36', '2011-168', '昆明重型机械厂廉租房给水工程', '4', '', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-11-10', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('37', '2011-168', '昆明重型机械厂廉租房给水工程', '5', '', '', '', '\0', '\0', null, null, '2011-10-26', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('38', '2011-169', '北部汽车客运站生活泵房改迁', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-10-31', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('39', '2011-170', '桃花源居住宅小区给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-11-04', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('40', '2011-170', '桃花源居住宅小区给水工程', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-26', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('41', '2011-171', '溪谷雅苑住宅小区给水工程', '4', '', '', '\0', '\0', '\0', '2', null, '2011-10-27', '2011-11-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('42', '2011-171', '溪谷雅苑住宅小区给水工程', '5', '', '', '\0', '\0', '\0', null, null, '2011-10-27', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('43', '2011-172', '空港保供水北水厂备用水源方案', '4', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-28', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('44', '2011-173', '中国医学科学院医学生物学研究所庭院给水工程', '5', '', '', '\0', '\0', '\0', '2', null, '2011-10-28', '2011-11-10', null, '', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('45', '2011-174', '云南龙城中泰农产品物流中心庭院给水', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-28', '2011-11-15', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('46', '2011-175', '清龙公司水井管网改造及住户改表设计', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-28', '2011-11-18', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('47', '2011-176', '牟定县第二水厂及配套管网工程初步设计', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-31', '2011-11-15', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('48', '2011-177', '文山县城南片区供水可研', '3', '\0', '\0', '\0', '\0', '\0', null, null, '2011-11-02', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('49', '2011-178', '五华区201#路、202#路给水管设计', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-11-02', '2011-11-10', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('55', '2011-179', '五华区西翥片区给水工程', '4', '', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-10', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('56', '2011-180', '五腊宏仁地块DN800给水管改迁', '4', '', '', '', '\0', '\0', '2', '0', '2011-11-10', '2011-11-16', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('57', '2011-181', '螺蛳湾国际商贸城创业园新册产业城给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-29', null, '', '856.38', '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('58', '2011-182', '昆明多宝电缆公司给水工程', '5', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-18', null, '', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('59', '2011-183', '经开区印象欣城B.C给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-02', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('60', '2011-184', '金星农贸市场给水工程', '4', '', '\0', '', '\0', '\0', '2', '0', '2011-11-18', '2011-12-02', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('61', '2011-185', '经开区西南广物流中心项目给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-02', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('62', '2011-186', '奥宸新天地庭院给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('63', '2011-187', '昆明市中医院呈贡新区医院给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-15', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('64', '2011-188', '岗头村城中村改造项目给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-20', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('65', '2011-189', '东方首座写字楼给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('66', '2011-190', '云南省艺术家园给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-25', '2011-12-25', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('67', '2011-181', '云南省地震局宿舍改表', '5', '', '', '', '\0', '\0', '2', '0', '2011-11-22', '2011-12-01', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('68', '2011-191', '丽江水厂滤池改造', '5', '\0', '\0', '\0', '\0', '\0', null, '0', '2011-11-29', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('69', '2011-192', '官渡13号路DN1200给水管改迁', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-12-02', '2011-12-12', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('70', '2011-193', '轻轨3号线东部客运站给水管改迁', '5', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-12-02', '2011-12-09', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('71', '2011-194', '五华区北仓城中村改造给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-07', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-15 10:14:41');
INSERT INTO `t_project` VALUES ('72', '2011-195', '同心闸调水工程方案设计', '4', '', '', '\0', '\0', '\0', null, 'S0_NEW', '2011-12-08', null, null, '', null, '\0', '\0', '', '2011-12-15 10:22:07');
INSERT INTO `t_project` VALUES ('73', '2011-196', '羊肠小村城中村改造DN900原水管改迁', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-08', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-15 10:23:17');
INSERT INTO `t_project` VALUES ('74', '2011-197', '昆明市气象局呈贡新区给水工程', '5', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-12', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-15 10:25:20');
INSERT INTO `t_project` VALUES ('75', '2011-198', '教场东路给水管改迁工程', '5', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-13', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-15 10:26:32');
INSERT INTO `t_project` VALUES ('76', '2011-199', '瀚文云鼎商务大厦给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-13', '2012-01-10', null, '\0', null, '\0', '\0', '', '2011-12-15 10:28:16');
INSERT INTO `t_project` VALUES ('77', '2011-200', '芒市轩岗乡集镇给水工程', '4', '\0', '\0', '\0', '\0', '\0', null, 'S0_NEW', '2011-12-13', null, null, '', '969.47', '\0', '\0', '', '2011-12-15 10:30:45');
INSERT INTO `t_project` VALUES ('78', '2011-201', '云波第三股份合作社青龙园地下水置换工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-14', '2011-12-26', null, '', null, '\0', '\0', '', '2011-12-15 10:32:25');
INSERT INTO `t_project` VALUES ('79', '2011-202', '螺蛳湾中央商务二级CBD项目给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-15', '2012-01-20', null, '\0', null, '\0', '\0', '', '2011-12-26 11:25:25');
INSERT INTO `t_project` VALUES ('80', '2011-203', '晨农商务中心给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-19', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-26 11:26:34');
INSERT INTO `t_project` VALUES ('81', '2011-204', '云波社区第五、第六居民小组改表工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-21', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-26 11:27:43');
INSERT INTO `t_project` VALUES ('82', '2011-205', '春城慧谷一期（二）A2地块给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-22', '2012-01-10', null, '\0', null, '\0', '\0', '', '2011-12-26 11:28:59');
INSERT INTO `t_project` VALUES ('83', '2011-206', '平和花园住宅小区给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-22', '2012-01-20', null, '\0', null, '\0', '\0', '', '2011-12-26 11:30:05');
INSERT INTO `t_project` VALUES ('84', '2011-207', '万和花园住宅小区给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-22', '2012-01-20', null, '\0', null, '\0', '\0', '', '2011-12-26 11:32:14');
INSERT INTO `t_project` VALUES ('85', '2011-208', '老挝DONGMAKA水厂设计工程', '3', '\0', '\0', '\0', '\0', '\0', null, 'S0_NEW', '2011-12-26', null, null, '\0', null, '\0', '\0', '', '2011-12-26 11:36:52');
INSERT INTO `t_project` VALUES ('86', '2011-208', '老挝DONGMAKA水厂设计工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-26', '2012-02-10', null, '\0', null, '\0', '\0', '', '2011-12-26 11:36:52');
INSERT INTO `t_project` VALUES ('87', '2011-209', '澄江县抚仙湖东岸水厂可研', '3', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-26', '2012-12-20', null, '\0', null, '\0', '\0', '', '2011-12-26 11:37:53');
INSERT INTO `t_project` VALUES ('88', '2011-210', '五华区观音寺村片区城中村改造给水工程', '4', '\0', '', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-26', '2011-12-15', null, '\0', null, '\0', '\0', '', '2011-12-26 11:38:53');
INSERT INTO `t_project` VALUES ('89', '2011-211', '宾川县乔甸镇给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2011-12-26', '2011-12-30', null, '\0', null, '\0', '\0', '', '2011-12-26 11:40:54');
INSERT INTO `t_project` VALUES ('90', '2012B-001', '西山区10地块严家地城中村改造项目', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2012-01-10', '2012-01-30', null, '\0', null, '\0', '\0', 'A1地块A2地块', '2012-01-10 10:19:39');
INSERT INTO `t_project` VALUES ('91', '2012B-002', '昆明力神重工经济适用房给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2012-01-10', '2012-01-30', null, '\0', null, '\0', '\0', '', '2012-01-10 10:22:44');
INSERT INTO `t_project` VALUES ('92', '2012B-003', '信息产业基地北入口道路DN800管改迁工程', '5', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2012-01-13', '2012-02-08', null, '\0', null, '\0', '\0', '', '2012-01-13 17:10:40');
INSERT INTO `t_project` VALUES ('93', '2012B-004', '志诚家园小区一户一表改造庭院管工程', '5', '\0', '\0', '\0', '\0', '\0', '2', 'S1_DISTRIBUTE', '2012-01-18', '2012-02-15', null, '\0', null, '\0', '\0', '', '2012-01-18 14:40:55');

-- ----------------------------
-- Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('1', '合同', '新建委托，编辑工程编号。对外收款。');
INSERT INTO `t_role` VALUES ('2', '计划', '分发工程项目到室主任及项目负责人。');
INSERT INTO `t_role` VALUES ('3', '室主任', '安排任务。专业负责人，校队，设计。');
INSERT INTO `t_role` VALUES ('4', '项目主管', '具体项目主管人。可能是室主任，或者设计人员。');
INSERT INTO `t_role` VALUES ('5', '专业负责', '项目设计上专业负责人。');
INSERT INTO `t_role` VALUES ('6', '设计师', '新建子图、设计。对其他设计图纸进行校队。');
INSERT INTO `t_role` VALUES ('7', '总工', '校队图纸，计划人员也是总工');
INSERT INTO `t_role` VALUES ('8', '预算', '接收项目主管、室主任、计划、合同安排的预算。');
INSERT INTO `t_role` VALUES ('9', '出图', '接收项目主管、室主任、计划、合同安排的出图。');
INSERT INTO `t_role` VALUES ('10', '档案', '接收计划、合同安排的图纸存档工作。');
INSERT INTO `t_role` VALUES ('11', '财务', '对外收款');
INSERT INTO `t_role` VALUES ('12', '财务2', '查看财务收款');
INSERT INTO `t_role` VALUES ('9999', '系统管理员', '');

-- ----------------------------
-- Table structure for `t_style`
-- ----------------------------
DROP TABLE IF EXISTS `t_style`;
CREATE TABLE `t_style` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `lineStyle` varchar(24) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_style
-- ----------------------------
INSERT INTO `t_style` VALUES ('26', '78', '1', 'line_style_red');
INSERT INTO `t_style` VALUES ('27', '88', '6', 'line_style_blue');

-- ----------------------------
-- Table structure for `t_subimg`
-- ----------------------------
DROP TABLE IF EXISTS `t_subimg`;
CREATE TABLE `t_subimg` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) default NULL,
  `subImgName` varchar(255) default NULL,
  `subprj` int(11) NOT NULL,
  `imgtype` int(11) NOT NULL,
  `imgsize` int(11) NOT NULL,
  `imgnum` int(11) NOT NULL,
  `accomplishment` int(11) NOT NULL,
  `endDate` date NOT NULL,
  `proofed` tinyint(1) NOT NULL default '0',
  `proofreader` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_subimg
-- ----------------------------
INSERT INTO `t_subimg` VALUES ('1', '21', '新建子图', '1', '1', '1', '88', '0', '2011-10-06', '0', null);
INSERT INTO `t_subimg` VALUES ('2', '21', 'sss', '1', '2', '1', '1', '0', '2011-10-06', '0', null);
INSERT INTO `t_subimg` VALUES ('3', '9', '11', '2', '2', '2', '1', '1', '2011-09-22', '0', null);
INSERT INTO `t_subimg` VALUES ('4', '21', '12', '2', '2', '2', '2', '1', '2011-10-06', '0', null);
INSERT INTO `t_subimg` VALUES ('5', '9', '232', '3', '1', '2', '12', '0', '2011-09-22', '0', null);
INSERT INTO `t_subimg` VALUES ('6', '9', 'qrw', '1', '2', '2', '4', '0', '2011-09-22', '0', null);
INSERT INTO `t_subimg` VALUES ('7', '14', 'asda', '3', '1', '2', '31', '1', '2011-11-30', '0', null);
INSERT INTO `t_subimg` VALUES ('8', '26', '多大', '1', '1', '2', '3', '2', '2011-10-29', '0', null);
INSERT INTO `t_subimg` VALUES ('9', '26', '新子图名字', '1', '1', '6', '3', '4', '2011-10-29', '0', null);
INSERT INTO `t_subimg` VALUES ('11', '30', '管道', '3', '3', '4', '25', '2', '2011-10-28', '0', null);
INSERT INTO `t_subimg` VALUES ('12', '30', '123', '3', '3', '4', '12', '3', '2011-10-28', '0', null);
INSERT INTO `t_subimg` VALUES ('13', '36', '泵房平面图', '3', '3', '3', '3', '1', '2011-11-10', '0', null);
INSERT INTO `t_subimg` VALUES ('14', '47', '自用水泵房', '2', '3', '4', '5', '2', '2011-11-15', '0', null);
INSERT INTO `t_subimg` VALUES ('15', '65', '东方首座写字楼给水工程  ', '3', '3', '4', '3', '1', '2011-12-07', '0', null);
INSERT INTO `t_subimg` VALUES ('16', '57', '螺蛳湾国际商贸城创业园新册产业城给水工程  ', '3', '3', '3', '5', '4', '2011-11-29', '0', null);
INSERT INTO `t_subimg` VALUES ('17', '14', '12', '2', '3', '2', '12', '0', '2011-11-30', '0', null);
INSERT INTO `t_subimg` VALUES ('18', '88', '五华区观音寺村片区城中村改造给水工程初步设计', '7', '5', '4', '4', '4', '2011-12-15', '0', null);
INSERT INTO `t_subimg` VALUES ('19', '41', '庭院生活管网及室外消防给水管道施工设计图', '3', '3', '3', '4', '4', '2011-11-07', '0', null);
INSERT INTO `t_subimg` VALUES ('20', '41', '生活加压泵房', '2', '3', '3', '3', '4', '2011-11-07', '0', null);
INSERT INTO `t_subimg` VALUES ('21', '41', '室外消防泵房', '1', '3', '3', '2', '4', '2011-11-07', '0', null);

-- ----------------------------
-- Table structure for `t_subprj`
-- ----------------------------
DROP TABLE IF EXISTS `t_subprj`;
CREATE TABLE `t_subprj` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_subprj
-- ----------------------------
INSERT INTO `t_subprj` VALUES ('1', '室内消防加压泵房', '');
INSERT INTO `t_subprj` VALUES ('2', '生活加压泵房', '');
INSERT INTO `t_subprj` VALUES ('3', '生活庭院管网', '');
INSERT INTO `t_subprj` VALUES ('4', '室内消防庭院管网', '');
INSERT INTO `t_subprj` VALUES ('5', '加压泵房', '');
INSERT INTO `t_subprj` VALUES ('6', '庭院管网', '');
INSERT INTO `t_subprj` VALUES ('7', '庭院管网及加压泵房', '');
INSERT INTO `t_subprj` VALUES ('8', '自动喷淋系统庭院管网', '');
INSERT INTO `t_subprj` VALUES ('9', '室内消火栓系统庭院管网', '');
INSERT INTO `t_subprj` VALUES ('10', '生活庭院管网及生活加压泵房', '');
