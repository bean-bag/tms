/*
Navicat MySQL Data Transfer
Source Host     : localhost:3306
Source Database : km_tms_new2
Target Host     : localhost:3306
Target Database : km_tms_new2
Date: 2011-12-30 20:18:38
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(32) NOT NULL,
  `profile` varchar(200) default NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

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
INSERT INTO `t_department` VALUES ('22', '计划部二', '', '2');
INSERT INTO `t_department` VALUES ('31', '设计一室', '工艺、电气', '3');
INSERT INTO `t_department` VALUES ('32', '设计二室', '水', '3');
INSERT INTO `t_department` VALUES ('33', '设计三室', '建筑结构', '3');
INSERT INTO `t_department` VALUES ('34', '设计四室', '工艺', '3');
INSERT INTO `t_department` VALUES ('9999', '系统维护部', '', '9999');

-- ----------------------------
-- Table structure for t_doc
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
-- Table structure for t_group
-- ----------------------------
DROP TABLE IF EXISTS `t_group`;
CREATE TABLE `t_group` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `sort` varchar(15) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

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

-- ----------------------------
-- Table structure for t_imgsize
-- ----------------------------
DROP TABLE IF EXISTS `t_imgsize`;
CREATE TABLE `t_imgsize` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_imgsize
-- ----------------------------
INSERT INTO `t_imgsize` VALUES ('1', '210*310', 'AA');
INSERT INTO `t_imgsize` VALUES ('2', '1189X841', 'A0');
INSERT INTO `t_imgsize` VALUES ('3', '841X594', 'A1');
INSERT INTO `t_imgsize` VALUES ('4', '594X420', 'A2');
INSERT INTO `t_imgsize` VALUES ('5', '420X297', 'A3');
INSERT INTO `t_imgsize` VALUES ('6', '297X210', 'A4');

-- ----------------------------
-- Table structure for t_imgtype
-- ----------------------------
DROP TABLE IF EXISTS `t_imgtype`;
CREATE TABLE `t_imgtype` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_imgtype
-- ----------------------------
INSERT INTO `t_imgtype` VALUES ('1', '建施', '枯');
INSERT INTO `t_imgtype` VALUES ('2', '电施', '1212');
INSERT INTO `t_imgtype` VALUES ('3', '水施', '');
INSERT INTO `t_imgtype` VALUES ('4', '结施', '');
INSERT INTO `t_imgtype` VALUES ('5', '水处', '');

-- ----------------------------
-- Table structure for t_message
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
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

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
INSERT INTO `t_message` VALUES ('75', '14', '1', '赵  珊', '2011-12-06 23:36:32', '赵  珊成功对‘宝象河水厂DN600管及原水管迁改设计’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('76', '71', '1', '赵  珊', '2011-12-12 23:01:25', '赵  珊成功创建项目：测试', '0');
INSERT INTO `t_message` VALUES ('77', '72', '1', '赵  珊', '2011-12-12 23:08:34', '赵  珊成功创建项目：sadf', '0');
INSERT INTO `t_message` VALUES ('78', '73', '1', '赵  珊', '2011-12-12 23:08:34', '赵  珊成功创建项目：sadf', '0');
INSERT INTO `t_message` VALUES ('79', '74', '1', '赵  珊', '2011-12-12 23:09:54', '赵  珊成功创建项目：sadf', '0');
INSERT INTO `t_message` VALUES ('80', '75', '1', '赵  珊', '2011-12-12 23:09:54', '赵  珊成功创建项目：sadf', '0');
INSERT INTO `t_message` VALUES ('81', '76', '1', '赵  珊', '2011-12-12 23:10:43', '赵  珊成功创建项目：sadfsadf', '0');
INSERT INTO `t_message` VALUES ('82', '77', '1', '赵  珊', '2011-12-12 23:10:43', '赵  珊成功创建项目：sadfsadf', '0');
INSERT INTO `t_message` VALUES ('83', '78', '1', '赵  珊', '2011-12-12 23:11:18', '赵  珊成功创建项目：asafsaf', '0');
INSERT INTO `t_message` VALUES ('84', '79', '1', '赵  珊', '2011-12-12 23:11:45', '赵  珊成功创建项目：eeeeeeeee', '0');
INSERT INTO `t_message` VALUES ('85', '80', '1', '赵  珊', '2011-12-12 23:11:46', '赵  珊成功创建项目：eeeeeeeee', '0');
INSERT INTO `t_message` VALUES ('86', '81', '1', '赵  珊', '2011-12-12 23:12:25', '赵  珊成功创建项目：dddd', '0');
INSERT INTO `t_message` VALUES ('87', '82', '1', '赵  珊', '2011-12-12 23:12:25', '赵  珊成功创建项目：dddd', '0');
INSERT INTO `t_message` VALUES ('88', '83', '1', '赵  珊', '2011-12-12 23:15:46', '赵  珊成功创建项目：xxx', '0');
INSERT INTO `t_message` VALUES ('89', '84', '1', '赵  珊', '2011-12-12 23:22:40', '赵  珊成功创建项目：zz', '0');
INSERT INTO `t_message` VALUES ('90', '85', '1', '赵  珊', '2011-12-12 23:22:40', '赵  珊成功创建项目：zz', '0');
INSERT INTO `t_message` VALUES ('91', '86', '1', '赵  珊', '2011-12-12 23:23:58', '赵  珊成功创建项目：fff', '0');
INSERT INTO `t_message` VALUES ('92', '87', '1', '赵  珊', '2011-12-12 23:23:58', '赵  珊成功创建项目：fff', '0');
INSERT INTO `t_message` VALUES ('93', '88', '1', '赵  珊', '2011-12-12 23:25:24', '赵  珊成功创建项目：hhh', '0');
INSERT INTO `t_message` VALUES ('94', '89', '1', '赵  珊', '2011-12-12 23:25:24', '赵  珊成功创建项目：hhh', '0');
INSERT INTO `t_message` VALUES ('95', '46', '1', '赵  珊', '2011-12-13 00:05:18', '赵  珊成功对‘清龙公司水井管网改造及住户改表设计’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('96', '90', '1', '赵  珊', '2011-12-13 00:12:47', '赵  珊成功创建项目：ss', '0');
INSERT INTO `t_message` VALUES ('97', '55', '1', '赵  珊', '2011-12-13 01:20:26', '赵  珊成功对‘五华区西翥片区给水工程’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('98', '56', '1', '赵  珊', '2011-12-13 01:20:37', '赵  珊成功对‘五腊宏仁地块DN800给水管改迁’项目发去预算任务', '0');
INSERT INTO `t_message` VALUES ('99', '70', '6', '朱家贵', '2011-12-26 23:03:32', '朱家贵成功修改项目：轻轨3号线东部客运站给水管改迁', '0');

-- ----------------------------
-- Table structure for t_message_seq
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
INSERT INTO `t_message_seq` VALUES ('14', '6', '75', '2011-12-26 22:51:31');
INSERT INTO `t_message_seq` VALUES ('14', '8', '6', '2011-10-20 00:37:34');
INSERT INTO `t_message_seq` VALUES ('14', '15', '33', '2011-10-31 17:53:46');
INSERT INTO `t_message_seq` VALUES ('14', '31', '7', '2011-10-20 00:36:14');
INSERT INTO `t_message_seq` VALUES ('14', '38', '14', '2011-10-23 19:14:58');
INSERT INTO `t_message_seq` VALUES ('21', '28', '8', '2011-10-20 22:33:59');
INSERT INTO `t_message_seq` VALUES ('23', '35', '9', '2011-10-20 22:26:46');
INSERT INTO `t_message_seq` VALUES ('25', '8', '10', '2011-10-21 00:09:10');
INSERT INTO `t_message_seq` VALUES ('26', '1', '31', '2011-10-23 22:53:34');
INSERT INTO `t_message_seq` VALUES ('26', '31', '31', '2011-10-23 22:58:14');
INSERT INTO `t_message_seq` VALUES ('26', '38', '31', '2011-10-24 00:42:30');
INSERT INTO `t_message_seq` VALUES ('35', '10', '74', '2011-12-05 13:50:53');
INSERT INTO `t_message_seq` VALUES ('35', '31', '32', '2011-11-09 17:46:54');
INSERT INTO `t_message_seq` VALUES ('49', '10', '73', '2011-12-05 13:50:47');
INSERT INTO `t_message_seq` VALUES ('70', '10', '72', '2011-12-05 13:35:00');

-- ----------------------------
-- Table structure for t_person
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
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

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
INSERT INTO `t_person` VALUES ('20', 'lixiang', ' 李  祥 ', '23', '34', '0', '6');
INSERT INTO `t_person` VALUES ('21', 'lijinping', ' 李金平 ', '24', '34', '0', '6');
INSERT INTO `t_person` VALUES ('22', 'zhaofengxian', '赵凤仙', '25', '4', '1', '3');
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
INSERT INTO `t_person` VALUES ('35', 'wanyu', '万  羽', '37', '32', '0', '6');
INSERT INTO `t_person` VALUES ('36', 'xujian', ' 徐  健 ', '38', '32', '0', '6');
INSERT INTO `t_person` VALUES ('37', 'duyishan', ' 杜怡杉 ', '39', '32', '0', '6');
INSERT INTO `t_person` VALUES ('38', 'liyan', ' 李  燕 ', '40', '32', '0', '6');
INSERT INTO `t_person` VALUES ('39', 'zhangyuzheng', ' 张偶正 ', '41', '32', '0', '6');
INSERT INTO `t_person` VALUES ('40', 'huajialin', ' 华佳琳 ', '41', '32', '0', '6');
INSERT INTO `t_person` VALUES ('41', 'wupengkun', ' 吴朋坤 ', '42', '32', '0', '6');
INSERT INTO `t_person` VALUES ('42', 'huangcan', ' 黄  灿 ', '0', '32', '0', '6');
INSERT INTO `t_person` VALUES ('43', 'chengyongwei', ' 程永伟 ', '0', '32', '0', '6');
INSERT INTO `t_person` VALUES ('44', 'maowenwu', ' 毛文武 ', '1', '33', '0', '6');
INSERT INTO `t_person` VALUES ('45', 'liushuo', ' 刘  硕 ', '1', '33', '0', '6');
INSERT INTO `t_person` VALUES ('46', 'helei', ' 何  蕾 ', '1', '33', '0', '6');
INSERT INTO `t_person` VALUES ('47', 'yangzhigui', ' 杨志贵 ', '1', '34', '0', '6');
INSERT INTO `t_person` VALUES ('48', 'yangyimei', '杨一梅', '1', '7', '0', '11');
INSERT INTO `t_person` VALUES ('49', 'wuhui', '吴辉', '1', '7', '0', '11');
INSERT INTO `t_person` VALUES ('9999', 'admin', '系统管理员', 'admin', '9999', '0', '9999');

-- ----------------------------
-- Table structure for t_project
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
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_project
-- ----------------------------
INSERT INTO `t_project` VALUES ('14', '2011-143', '宝象河水厂DN600管及原水管迁改设计', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-09-09', '2011-11-30', null, '', null, '\0', '\0', '32323', null);
INSERT INTO `t_project` VALUES ('28', null, '呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-24', '2011-10-28', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('29', null, '呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程', '1', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-24', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('30', null, '彩云北路综合管沟DN1000给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-24', '2011-10-28', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('31', null, '彩云北路综合管沟DN1000给水工程', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-24', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('32', '2011-166', '富民繁花山', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-25', '2011-11-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('33', '2011-166', '富民繁花山', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-25', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('34', '2011-167', '西山区19号规划路给水管改迁工程', '4', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-26', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('35', '2011-167', '西山区19号规划路给水管改迁工程', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-11-04', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('36', '2011-168', '昆明重型机械厂廉租房给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-11-10', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('37', '2011-168', '昆明重型机械厂廉租房给水工程', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-26', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('38', '2011-169', '北部汽车客运站生活泵房改迁', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-10-31', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('39', '2011-170', '桃花源居住宅小区给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-26', '2011-11-04', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('40', '2011-170', '桃花源居住宅小区给水工程', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-26', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('41', '2011-171', '溪谷雅苑住宅小区给水工程', '4', '\0', '', '\0', '\0', '\0', '2', null, '2011-10-27', '2011-11-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('42', '2011-171', '溪谷雅苑住宅小区给水工程', '5', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-27', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('43', '2011-172', '空港保供水北水厂备用水源方案', '4', '\0', '\0', '\0', '\0', '\0', null, null, '2011-10-28', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('44', '2011-173', '中国医学科学院医学生物学研究所庭院给水工程', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-28', '2011-11-10', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('45', '2011-174', '云南龙城中泰农产品物流中心庭院给水', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-28', '2011-11-15', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('46', '2011-175', '清龙公司水井管网改造及住户改表设计', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-28', '2011-11-18', null, '', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('47', '2011-176', '牟定县第二水厂及配套管网工程初步设计', '4', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-10-31', '2011-11-15', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('48', '2011-177', '文山县城南片区供水可研', '3', '\0', '\0', '\0', '\0', '\0', null, null, '2011-11-02', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('49', '2011-178', '五华区201#路、202#路给水管设计', '5', '\0', '\0', '\0', '\0', '\0', '2', null, '2011-11-02', '2011-11-10', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('55', '2011-179', '五华区西翥片区给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-10', null, '', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('56', '2011-180', '五腊宏仁地块DN800给水管改迁', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-16', null, '', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('57', '2011-181', '螺蛳湾国际商贸城创业园新册产业城给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-29', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('58', '2011-182', '昆明多宝电缆公司给水工程', '5', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-10', '2011-11-18', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('59', '2011-183', '经开区印象欣城B.C给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-02', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('60', '2011-184', '金星农贸市场给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-02', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('61', '2011-185', '经开区西南广物流中心项目给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-02', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('62', '2011-186', '奥宸新天地庭院给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('63', '2011-187', '昆明市中医院呈贡新区医院给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-15', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('64', '2011-188', '岗头村城中村改造项目给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-20', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('65', '2011-189', '东方首座写字楼给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-11-18', '2011-12-07', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('66', '2011-190', '云南省艺术家园给水工程', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-12-25', '2011-12-25', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('67', '2011-181', '云南省地震局宿舍改表', '5', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-12-22', '2011-12-01', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('68', '2011-191', '丽江水厂滤池改造', '5', '\0', '\0', '\0', '\0', '\0', null, '0', '2011-12-29', null, null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('69', '2011-192', '官渡13号路DN1200给水管改迁', '4', '\0', '\0', '\0', '\0', '\0', '2', '0', '2011-12-02', '2011-12-12', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('70', '2011-193', '轻轨3号线东部客运站给水管改迁', '5', '\0', '\0', '\0', '\0', '\0', '3', 'S1_DISTRIBUTE', '2011-12-02', '2011-12-09', null, '\0', null, '\0', '\0', '', null);
INSERT INTO `t_project` VALUES ('90', 'ss', 'ss', '4', '\0', '\0', '\0', '\0', '\0', null, 'S0_NEW', '2011-12-07', null, null, '\0', null, '\0', '\0', 'ss', '2011-12-13 00:12:46');

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

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
INSERT INTO `t_role` VALUES ('12', '总裁', '查看财务收款');
INSERT INTO `t_role` VALUES ('9999', '系统管理员', '');

-- ----------------------------
-- Table structure for t_style
-- ----------------------------
DROP TABLE IF EXISTS `t_style`;
CREATE TABLE `t_style` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `lineStyle` varchar(24) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_style
-- ----------------------------

-- ----------------------------
-- Table structure for t_subimg
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
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_subimg
-- ----------------------------
INSERT INTO `t_subimg` VALUES ('1', '21', '新建子图', '1', '1', '1', '88', '0', '2011-10-06', '0', null);
INSERT INTO `t_subimg` VALUES ('2', '21', 'sss', '1', '2', '1', '1', '0', '2011-10-06', '0', null);
INSERT INTO `t_subimg` VALUES ('3', '9', '11', '2', '2', '2', '1', '1', '2011-09-22', '0', null);
INSERT INTO `t_subimg` VALUES ('4', '21', '12', '2', '2', '2', '2', '1', '2011-10-06', '0', null);
INSERT INTO `t_subimg` VALUES ('5', '9', '232', '3', '1', '2', '12', '0', '2011-09-22', '0', null);
INSERT INTO `t_subimg` VALUES ('6', '9', 'qrw', '1', '2', '2', '4', '0', '2011-09-22', '0', null);
INSERT INTO `t_subimg` VALUES ('7', '14', 'asda', '3', '1', '1', '31', '1', '2011-11-23', '0', null);
INSERT INTO `t_subimg` VALUES ('8', '26', '多大', '1', '1', '2', '3', '2', '2011-10-29', '0', null);
INSERT INTO `t_subimg` VALUES ('9', '26', '新子图名字', '1', '1', '6', '3', '4', '2011-10-29', '0', null);
INSERT INTO `t_subimg` VALUES ('11', '30', '管道', '3', '3', '4', '25', '2', '2011-10-28', '0', null);
INSERT INTO `t_subimg` VALUES ('12', '30', '123', '3', '3', '4', '12', '3', '2011-10-28', '0', null);
INSERT INTO `t_subimg` VALUES ('13', '36', '泵房平面图', '3', '3', '3', '3', '1', '2011-11-10', '0', null);
INSERT INTO `t_subimg` VALUES ('14', '47', '自用水泵房', '2', '3', '4', '5', '2', '2011-11-15', '0', null);

-- ----------------------------
-- Table structure for t_subprj
-- ----------------------------
DROP TABLE IF EXISTS `t_subprj`;
CREATE TABLE `t_subprj` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_subprj
-- ----------------------------
INSERT INTO `t_subprj` VALUES ('1', '室内消防泵房', 'ss要');
INSERT INTO `t_subprj` VALUES ('2', '加压泵房', '加压');
INSERT INTO `t_subprj` VALUES ('3', '生活庭院', 'ttttkh工');
