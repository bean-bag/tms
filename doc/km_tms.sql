/*
Navicat MySQL Data Transfer
Source Database : km_tms
Target Database : km_tms
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
INSERT INTO `t_department` VALUES ('0', '系统维护部', '', '0');update `t_department` set id = 0 where id = 1;
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
  `sort` int(1) default NULL,
  `memberID` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_group
-- ----------------------------

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
INSERT INTO `t_person` VALUES ('0', 'admin', '系统管理员', 'admin', '0', '0', '0');update `t_person` set id = 0 where id = 1;
INSERT INTO `t_person` VALUES ('1', 'zhaoshang', '赵  珊', '1', '1', '1', '1');
INSERT INTO `t_person` VALUES ('6', 'zhujiagui', '朱家贵', '3', '22', '1', '2');
INSERT INTO `t_person` VALUES ('7', 'yangjuelei', '杨珏雷', '4', '31', '1', '3');
INSERT INTO `t_person` VALUES ('8', 'chengyuefang', '陈越舫', '0', '32', '1', '3');
INSERT INTO `t_person` VALUES ('9', 'zhangyijuan', '张诣涓', '7', '33', '1', '3');
INSERT INTO `t_person` VALUES ('10', 'caoaiqing', ' 曹爱青 ', '6', '34', '1', '3');
INSERT INTO `t_person` VALUES ('12', 'wangjiajia', '王佳佳', '11', '31', '0', '6');
INSERT INTO `t_person` VALUES ('14', 'lipeiizhi', '李培志', '17', '31', '0', '6');
INSERT INTO `t_person` VALUES ('15', 'baihao', '白  皓', '18', '32', '0', '6');
INSERT INTO `t_person` VALUES ('16', 'yangjian', '杨  坚', '20', '8', '1', '7');
INSERT INTO `t_person` VALUES ('17', 'liucen', '刘  琛', '19', '31', '0', '6');
INSERT INTO `t_person` VALUES ('18', 'zhoumingyu', '周明宇', '21', '33', '0', '6');
INSERT INTO `t_person` VALUES ('19', 'wanghao', ' 王  浩 ', '22', '33', '0', '6');
INSERT INTO `t_person` VALUES ('20', 'lixiang', ' 李  祥 ', '23', '34', '0', '6');
INSERT INTO `t_person` VALUES ('21', 'lijingping', ' 李金平 ', '24', '34', '0', '6');
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
INSERT INTO `t_person` VALUES ('35', 'wanyu', '万  羽', '37', '32', '0', '6');
INSERT INTO `t_person` VALUES ('36', 'xujian', ' 徐  健 ', '38', '32', '0', '6');
INSERT INTO `t_person` VALUES ('37', 'duyubing', ' 杜怡杉 ', '39', '32', '0', '6');
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

-- ----------------------------
-- Table structure for t_project
-- ----------------------------
DROP TABLE IF EXISTS `t_project`;
CREATE TABLE `t_project` (
  `ID` int(11) NOT NULL auto_increment,
  `prjNumber` varchar(10) default NULL,
  `prjName` varchar(50) default NULL,
  `prjType` int(3) default NULL,
  `prjStage` int(3) default NULL,
  `prjState` varchar(10) default NULL,
  `prjPriority` int(3) default NULL,
  `chiefDept` int(3) default NULL,
  `chiefPerson` int(5) default NULL,
  `startDate` date default NULL,
  `endDate` date default NULL,
  `docDir` varchar(255) default NULL,
  `docSize` int(11) default NULL,
  `delFlag` bit(1) default NULL,
  `description` varchar(100) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of t_project
-- ----------------------------
INSERT INTO `t_project` VALUES ('1', 'zs-110905', 'zs新建', '1', '1', null, '2', null, null, '2011-09-06', '2011-09-16', null, null, '\0', '新建');
INSERT INTO `t_project` VALUES ('2', 'zs-110905', 'zs新建', '2', null, null, null, null, null, '2011-09-06', null, null, null, '\0', '新建');
INSERT INTO `t_project` VALUES ('3', 'zs-110905', 'zs新建', '3', null, null, null, null, null, '2011-09-06', null, null, null, '\0', '新建');
INSERT INTO `t_project` VALUES ('4', 'zs-110905', 'zs新建', '4', null, null, null, null, null, '2011-09-06', null, null, null, '\0', '新建');
INSERT INTO `t_project` VALUES ('5', 'zs-110905', 'zs新建', '5', null, null, null, null, null, '2011-09-06', null, null, null, '', '新建');
INSERT INTO `t_project` VALUES ('6', null, 'zjg新建', '1', null, null, null, null, null, '2011-08-31', null, null, null, '\0', 'zjg新建');
INSERT INTO `t_project` VALUES ('7', null, 'zjg新建', '2', '1', null, '2', null, null, '2011-08-31', '2011-09-28', null, null, '\0', 'zjg新建');
INSERT INTO `t_project` VALUES ('8', null, 'zjg新建', '3', null, null, '1', null, null, '2011-08-31', null, null, null, '\0', null);
INSERT INTO `t_project` VALUES ('9', null, '昆明哈哈房地产公司', '1', null, null, '2', null, null, '2011-09-06', '2011-09-22', null, null, '\0', '轻武器');
INSERT INTO `t_project` VALUES ('10', 'N97—A', '昆明哈哈房地产公司', '2', null, null, null, null, null, '2011-09-06', null, null, null, '\0', '轻武器');
INSERT INTO `t_project` VALUES ('11', '2011-145', '源清社区水塔迁建工程', '5', null, null, null, null, null, '2011-09-13', null, null, null, '', '');
INSERT INTO `t_project` VALUES ('12', '2011-142', '洪发小区改表设计', '4', null, null, null, null, null, '2011-09-08', null, null, null, '\0', '');
INSERT INTO `t_project` VALUES ('13', '2011-142', '洪发小区改表设计', '5', null, null, null, null, null, '2011-09-08', null, null, null, '\0', '');
INSERT INTO `t_project` VALUES ('14', '2011-143', '宝象河水厂DN600管及原水管迁改设计', '4', null, null, null, null, null, '2011-09-09', null, null, null, '\0', '');
INSERT INTO `t_project` VALUES ('15', '2011-143', '宝象河水厂DN600管及原水管迁改设计', '5', null, null, null, null, null, '2011-09-09', null, null, null, '\0', '');
INSERT INTO `t_project` VALUES ('16', '2011-144', '亚广影视传媒中心建设项目事业核心区给水', '4', null, null, '2', null, null, '2011-09-13', '2011-09-29', null, null, '\0', '');
INSERT INTO `t_project` VALUES ('17', '2011-144', '亚广影视传媒中心建设项目事业核心区给水', '5', null, null, null, null, null, '2011-09-13', null, null, null, '\0', '');
INSERT INTO `t_project` VALUES ('18', '2011-145', '源清社区水塔迁建工程', '5', null, null, '2', null, null, '2011-09-13', '2011-09-30', null, null, '\0', '');

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
INSERT INTO `t_role` VALUES ('0', '系统管理员', '');update `t_role` set id = 0 where id = 1;
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

CREATE TRIGGER `fillOrderDate` BEFORE INSERT ON `t_project` FOR EACH ROW BEGIN
	declare vDate datetime;
	set vDate = NEW.createDate;
	select `t_project`.`createDate` into vDate from `t_project` where `t_project`.`prjName` = NEW.prjName order by `t_project`.`createDate` limit 1;
	set NEW.orderDate = vDate;
END;
