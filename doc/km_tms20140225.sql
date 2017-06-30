-- MySQL dump 10.11
--
-- Host: localhost    Database: km_tms
-- ------------------------------------------------------
-- Server version	5.0.67-community-nt

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_department`
--

DROP TABLE IF EXISTS `t_department`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_department` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(32) NOT NULL,
  `profile` varchar(200) default NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_department`
--

LOCK TABLES `t_department` WRITE;
/*!40000 ALTER TABLE `t_department` DISABLE KEYS */;
INSERT INTO `t_department` VALUES (0,'系统维护部','',0),(1,'合同部','',0),(2,'计划部','',0),(3,'设计部','',0),(4,'预算室','',0),(5,'出图室','',0),(6,'档案室','',0),(7,'财务部','',0),(8,'总工办','审核',0),(21,'计划部一','分发任务',2),(22,'计划部二','',2),(31,'设计一室','工艺、电气',3),(32,'设计二室','水',3),(33,'设计三室','建筑结构',3),(34,'设计四室','工艺',3);
/*!40000 ALTER TABLE `t_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_doc`
--

DROP TABLE IF EXISTS `t_doc`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
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
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_doc`
--

LOCK TABLES `t_doc` WRITE;
/*!40000 ALTER TABLE `t_doc` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_doc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_group`
--

DROP TABLE IF EXISTS `t_group`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_group` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `sort` int(1) default NULL,
  `memberID` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_group`
--

LOCK TABLES `t_group` WRITE;
/*!40000 ALTER TABLE `t_group` DISABLE KEYS */;
INSERT INTO `t_group` VALUES (1,9,1,8),(6,18,1,8),(8,17,1,8),(10,18,3,8),(11,18,5,15),(12,18,6,38),(13,16,1,8),(14,16,3,35),(15,17,3,8),(16,17,5,15),(17,17,6,36),(18,19,1,9),(19,19,3,18),(20,20,1,7),(21,20,3,12),(22,21,1,7),(60,21,3,7),(61,21,5,7),(62,21,5,26),(63,21,5,28),(64,21,5,32),(65,21,5,30),(66,21,6,14),(67,21,6,27),(68,21,6,33),(69,22,1,7),(70,22,3,27),(75,14,1,8),(91,12,1,8),(92,12,3,8),(93,14,3,8),(94,14,5,8),(95,14,5,38),(96,14,6,15),(116,9,3,8),(117,9,5,15),(118,9,5,8),(119,9,5,42),(120,9,6,36),(121,9,6,38),(122,9,6,35),(123,9,6,37),(124,23,1,8),(125,23,3,35),(126,25,1,8),(127,25,3,35),(128,24,1,8),(129,24,3,8),(130,26,1,8),(141,26,3,8),(142,26,5,38),(143,26,5,36),(144,26,6,34),(145,26,6,35),(146,27,1,8),(147,27,3,8),(148,28,1,8),(150,30,1,8),(151,30,3,8),(152,30,5,37),(153,30,6,8),(154,28,3,35),(155,28,5,38),(156,28,6,8),(157,32,1,8),(158,35,1,10),(159,36,1,8),(160,36,3,15),(161,38,1,8),(162,39,1,8),(163,41,1,8),(164,44,1,8),(165,44,3,35),(166,45,1,8),(167,45,3,35),(168,46,1,8),(169,46,3,35),(170,35,3,10),(171,35,5,10),(172,35,6,21),(173,47,1,7),(175,47,3,7),(176,47,5,14),(177,47,5,28),(178,47,6,7),(179,49,1,10),(180,54,1,7),(181,54,3,12),(182,55,1,7),(183,55,3,12),(184,56,1,8),(185,57,1,8),(186,58,1,8),(187,58,3,35),(188,59,1,8),(189,60,1,8),(190,61,1,8),(191,61,3,35),(192,62,1,8),(193,62,3,35),(194,63,1,8),(195,63,3,35),(196,64,1,8),(197,64,3,35),(198,65,1,8),(199,66,1,8),(200,67,1,8),(201,69,1,8),(202,70,1,10);
/*!40000 ALTER TABLE `t_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_imgsize`
--

DROP TABLE IF EXISTS `t_imgsize`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_imgsize` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_imgsize`
--

LOCK TABLES `t_imgsize` WRITE;
/*!40000 ALTER TABLE `t_imgsize` DISABLE KEYS */;
INSERT INTO `t_imgsize` VALUES (1,'210*310',''),(2,'1189X841','A0'),(3,'841X594','A1'),(4,'594X420','A2'),(5,'420X297','A3'),(6,'297X210','A4');
/*!40000 ALTER TABLE `t_imgsize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_imgtype`
--

DROP TABLE IF EXISTS `t_imgtype`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_imgtype` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_imgtype`
--

LOCK TABLES `t_imgtype` WRITE;
/*!40000 ALTER TABLE `t_imgtype` DISABLE KEYS */;
INSERT INTO `t_imgtype` VALUES (1,'建施',''),(2,'电施','1212'),(3,'水施',''),(4,'结施',''),(5,'水处','');
/*!40000 ALTER TABLE `t_imgtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_message`
--

DROP TABLE IF EXISTS `t_message`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_message` (
  `id` int(11) NOT NULL auto_increment,
  `groupID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `date` datetime NOT NULL,
  `message` longtext NOT NULL,
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_message`
--

LOCK TABLES `t_message` WRITE;
/*!40000 ALTER TABLE `t_message` DISABLE KEYS */;
INSERT INTO `t_message` VALUES (1,21,28,'朱新军','2011-10-20 00:13:11','abc',1),(2,21,28,'朱新军','2011-10-20 00:16:36','usr iith',1),(3,21,28,'朱新军','2011-10-20 00:16:48','旧消息',1),(4,14,31,'谢伟','2011-10-20 00:18:49','工作开始\n',1),(5,21,28,'朱新军','2011-10-20 00:19:03','新消息哟',1),(6,14,8,'陈越舫','2011-10-20 00:24:04','ok\r\n',1),(7,14,31,'谢伟','2011-10-20 00:26:11','?\n',1),(8,21,28,'朱新军','2011-10-20 21:48:51','测试发条消息',1),(9,23,35,'万  羽','2011-10-20 22:06:03','开工\r\n\r\n',1),(10,25,8,'陈越舫','2011-10-21 00:09:02','2121',1),(11,9,8,'陈越舫','2011-10-21 22:30:47','hello\r\n\r\n\r\n',1),(12,26,1,'赵  珊','2011-10-23 00:50:45','开工',1),(13,26,1,'赵  珊','2011-10-23 00:51:27','项目委托建立',1),(14,14,38,' 李  燕 ','2011-10-23 19:14:51','可以新建子图和修改子图了：）',1),(15,26,1,'赵  珊','2011-10-23 21:04:54','新建任务完成',1),(16,26,1,'赵  珊','2011-10-23 21:05:12','ok',1),(17,26,38,' 李  燕 ','2011-10-23 22:07:22','测试消息',1),(18,14,1,'赵  珊','2011-10-23 22:26:14','?',1),(19,14,1,'赵  珊','2011-10-23 22:33:48','看到了\r\n',1),(20,14,1,'赵  珊','2011-10-23 22:37:11','ok\r\n',1),(21,26,1,'赵  珊','2011-10-23 22:44:02','测试赵珊发条消息',1),(22,26,1,'赵  珊','2011-10-23 22:45:46','两人现时参与即时消息测试',1),(23,26,1,'赵  珊','2011-10-23 22:46:24','再来一次',1),(24,26,1,'赵  珊','2011-10-23 22:47:09','新消息，发一条看会不会重复',1),(25,26,1,'赵  珊','2011-10-23 22:47:52','在吗\r\n',1),(26,26,1,'赵  珊','2011-10-23 22:48:14','换个用户名试试',1),(27,26,31,'谢伟','2011-10-23 22:49:25','来了\r\n\r\n',1),(28,26,1,'赵  珊','2011-10-23 22:49:38','现在是几条，有没有重复的',1),(29,26,31,'谢伟','2011-10-23 22:49:41','现在对了\r\n\r\n\r\n',1),(30,26,1,'赵  珊','2011-10-23 22:50:48','我猜，可能是多次打开消息窗口，对新消息的监听没有清除，所以，多打开一次，就重复一条消息',1),(31,26,31,'谢伟','2011-10-23 22:51:59','l\r\n\r\n',1),(32,35,10,' 曹爱青 ','2011-10-31 17:15:13','缺资料',1),(33,14,15,'白  皓','2011-10-31 17:53:35','好',1),(34,49,10,' 曹爱青 ','2011-11-03 09:55:22','资料对接中',1),(35,50,1,'赵  珊','2011-11-08 15:22:21','赵  珊成功创建项目：五华区西翥片区给水工程',0),(36,51,1,'赵  珊','2011-11-08 15:23:29','赵  珊成功创建项目：五华区西翥片区给水工程',0),(37,52,1,'赵  珊','2011-11-08 15:30:48','赵  珊成功创建项目：五华区西翥片区给水工程',0),(38,53,1,'赵  珊','2011-11-08 21:55:18','赵  珊成功创建项目：yy',0),(39,54,1,'赵  珊','2011-11-09 09:06:01','赵  珊成功创建项目：西山区西翥片区给水工程',0),(40,54,31,'谢伟','2011-11-10 08:57:47','谢伟成功修改项目：西山区西翥片区给水工程',0),(41,55,1,'赵  珊','2011-11-10 09:07:32','赵  珊成功创建项目：五华区西翥片区给水工程',0),(42,56,1,'赵  珊','2011-11-10 09:08:43','赵  珊成功创建项目：五腊宏仁地块DN800给水管改迁',0),(43,57,1,'赵  珊','2011-11-10 09:10:06','赵  珊成功创建项目：螺蛳湾国际商贸城创业园新册产业城给水工程',0),(44,58,1,'赵  珊','2011-11-10 09:11:22','赵  珊成功创建项目：昆明多宝电缆公司给水工程',0),(45,55,31,'谢伟','2011-11-10 13:25:17','谢伟成功修改项目：五华区西翥片区给水工程',0),(46,56,31,'谢伟','2011-11-10 13:25:43','谢伟成功修改项目：五腊宏仁地块DN800给水管改迁',0),(47,57,31,'谢伟','2011-11-10 13:26:13','谢伟成功修改项目：螺蛳湾国际商贸城创业园新册产业城给水工程',0),(48,58,31,'谢伟','2011-11-10 13:26:48','谢伟成功修改项目：昆明多宝电缆公司给水工程',0),(49,59,1,'赵  珊','2011-11-18 11:02:08','赵  珊成功创建项目：经开区印象欣城B.C给水工程',0),(50,60,1,'赵  珊','2011-11-18 11:07:00','赵  珊成功创建项目：金星农贸市场给水工程',0),(51,61,1,'赵  珊','2011-11-18 11:08:17','赵  珊成功创建项目：经开区西南广物流中心项目给水工程',0),(52,62,1,'赵  珊','2011-11-18 11:09:29','赵  珊成功创建项目：奥宸新天地庭院给水工程',0),(53,63,1,'赵  珊','2011-11-18 11:10:10','赵  珊成功创建项目：昆明市中医院呈贡新区医院给水工程',0),(54,64,1,'赵  珊','2011-11-18 11:11:02','赵  珊成功创建项目：岗头村城中村改造项目给水工程',0),(55,65,1,'赵  珊','2011-11-18 11:14:02','赵  珊成功创建项目：东方首座写字楼给水工程',0),(56,59,31,'谢伟','2011-11-18 16:27:43','谢伟成功修改项目：经开区印象欣城B.C给水工程',0),(57,60,31,'谢伟','2011-11-18 16:28:07','谢伟成功修改项目：金星农贸市场给水工程',0),(58,61,31,'谢伟','2011-11-18 16:28:31','谢伟成功修改项目：经开区西南广物流中心项目给水工程',0),(59,62,31,'谢伟','2011-11-18 16:28:52','谢伟成功修改项目：奥宸新天地庭院给水工程',0),(60,63,31,'谢伟','2011-11-18 16:29:28','谢伟成功修改项目：昆明市中医院呈贡新区医院给水工程',0),(61,64,31,'谢伟','2011-11-18 16:30:01','谢伟成功修改项目：岗头村城中村改造项目给水工程',0),(62,65,31,'谢伟','2011-11-18 16:30:34','谢伟成功修改项目：东方首座写字楼给水工程',0),(63,66,1,'赵  珊','2011-12-01 10:15:02','赵  珊成功创建项目：云南省艺术家园给水工程',0),(64,67,1,'赵  珊','2011-12-01 10:16:30','赵  珊成功创建项目：云南省地震局宿舍改表',0),(65,68,1,'赵  珊','2011-12-01 10:17:45','赵  珊成功创建项目：丽江水厂滤池改造',0),(66,69,1,'赵  珊','2011-12-02 11:52:28','赵  珊成功创建项目：官渡13号路DN1200给水管改迁',0),(67,70,1,'赵  珊','2011-12-02 11:53:20','赵  珊成功创建项目：轻轨3号线东部客运站给水管改迁',0),(68,66,31,'谢伟','2011-12-05 10:30:55','谢伟成功修改项目：云南省艺术家园给水工程',0),(69,67,31,'谢伟','2011-12-05 10:31:58','谢伟成功修改项目：云南省地震局宿舍改表',0),(70,69,31,'谢伟','2011-12-05 10:32:24','谢伟成功修改项目：官渡13号路DN1200给水管改迁',0),(71,70,31,'谢伟','2011-12-05 10:32:41','谢伟成功修改项目：轻轨3号线东部客运站给水管改迁',0),(72,70,10,' 曹爱青 ','2011-12-05 13:34:15','已完成',1),(73,49,10,' 曹爱青 ','2011-12-05 13:34:33','已完成',1),(74,35,10,' 曹爱青 ','2011-12-05 13:34:50','已完成',1);
/*!40000 ALTER TABLE `t_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_message_seq`
--

DROP TABLE IF EXISTS `t_message_seq`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_message_seq` (
  `groupID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `maxNO` int(11) default NULL,
  `stamp` datetime default NULL,
  PRIMARY KEY  (`groupID`,`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_message_seq`
--

LOCK TABLES `t_message_seq` WRITE;
/*!40000 ALTER TABLE `t_message_seq` DISABLE KEYS */;
INSERT INTO `t_message_seq` VALUES (9,8,11,'2011-10-22 01:58:52'),(14,1,20,'2011-10-23 22:37:36'),(14,8,6,'2011-10-20 00:37:34'),(14,15,33,'2011-10-31 17:53:46'),(14,31,7,'2011-10-20 00:36:14'),(14,38,14,'2011-10-23 19:14:58'),(21,28,8,'2011-10-20 22:33:59'),(23,35,9,'2011-10-20 22:26:46'),(25,8,10,'2011-10-21 00:09:10'),(26,1,31,'2011-10-23 22:53:34'),(26,31,31,'2011-10-23 22:58:14'),(26,38,31,'2011-10-24 00:42:30'),(35,10,74,'2011-12-05 13:50:53'),(35,31,32,'2011-11-09 17:46:54'),(49,10,73,'2011-12-05 13:50:47'),(70,10,72,'2011-12-05 13:35:00');
/*!40000 ALTER TABLE `t_message_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_person`
--

DROP TABLE IF EXISTS `t_person`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_person` (
  `id` int(11) NOT NULL auto_increment,
  `userCode` varchar(12) NOT NULL,
  `userName` varchar(12) NOT NULL,
  `password` varchar(12) NOT NULL,
  `deptID` int(11) default NULL,
  `teamLeader` int(11) default NULL,
  `role` varchar(20) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_person`
--

LOCK TABLES `t_person` WRITE;
/*!40000 ALTER TABLE `t_person` DISABLE KEYS */;
INSERT INTO `t_person` VALUES (0,'admin','系统管理员','admin',0,0,'0'),(1,'zhaoshang','赵  珊','1',1,1,'1'),(6,'zhujiagui','朱家贵','3',22,1,'2'),(7,'yangjuelei','杨珏雷','4',31,1,'6'),(8,'chenyuefang','陈越舫','0',32,1,'6'),(9,'zhangyijuan','张诣涓','7',33,1,'6'),(10,'caoaiqing',' 曹爱青 ','6',34,1,'6'),(12,'wangjiajia','王佳佳','11',31,0,'6'),(14,'lipeiizhi','李培志','17',31,0,'6'),(15,'baihao','白  皓','18',32,0,'6'),(16,'yangjian','杨  坚','20',8,1,'7'),(17,'liucen','刘  琛','19',31,0,'6'),(18,'zhoumingyu','周明宇','21',33,0,'6'),(19,'wanghao',' 王  浩 ','22',33,0,'6'),(20,'lixiang',' 李  祥 ','23',34,0,'6'),(21,'lijinping',' 李金平 ','24',34,0,'6'),(22,'zhaofengxian','赵凤仙','25',4,1,'3'),(23,'yangruiling','杨芮粼','26',4,0,'8'),(24,'guoli','葛  立','27',5,1,'9'),(25,'liling','李  琳','28',6,0,'10'),(26,'linzhihua','林志华','29',31,0,'6'),(27,'huangmin','黄  敏','30',31,0,'6'),(28,'zhuxinjun','朱新军','31',31,0,'6'),(29,'zhangwei','张  伟','32',31,0,'6'),(30,'liwenlu','李文露','33',31,0,'6'),(31,'xiewei','谢伟','2',21,1,'2'),(32,'zhangtong','张  彤','34',31,0,'6'),(33,'xulinli','许伶俐','35',31,0,'6'),(34,'mengweiming','孟伟明','36',32,0,'6'),(35,'wanyu','万  羽','37',32,0,'6'),(36,'xujian',' 徐  健 ','38',32,0,'6'),(37,'duyishan',' 杜怡杉 ','39',32,0,'6'),(38,'liyan',' 李  燕 ','40',32,0,'6'),(39,'zhangyuzheng',' 张偶正 ','41',32,0,'6'),(40,'huajialin',' 华佳琳 ','41',32,0,'6'),(41,'wupengkun',' 吴朋坤 ','42',32,0,'6'),(42,'huangcan',' 黄  灿 ','0',32,0,'6'),(43,'chengyongwei',' 程永伟 ','0',32,0,'6'),(44,'maowenwu',' 毛文武 ','1',33,0,'6'),(45,'liushuo',' 刘  硕 ','1',33,0,'6'),(46,'helei',' 何  蕾 ','1',33,0,'6'),(47,'yangzhigui',' 杨志贵 ','1',34,0,'6'),(48,'yangyimei','杨一梅','1',7,0,'11'),(49,'wuhui','吴辉','1',7,0,'11');
/*!40000 ALTER TABLE `t_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_project`
--

DROP TABLE IF EXISTS `t_project`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_project` (
  `ID` int(11) NOT NULL auto_increment,
  `prjNumber` varchar(10) default NULL,
  `prjName` varchar(50) default NULL,
  `prjType` int(3) NOT NULL,
  `prjStage` int(3) default NULL,
  `prjState` varchar(10) default NULL,
  `prjPriority` int(3) default NULL,
  `chiefDept` int(3) default NULL,
  `chiefPerson` int(5) default NULL,
  `startDate` date NOT NULL,
  `endDate` date default NULL,
  `docNO` varchar(20) default NULL,
  `docSize` int(11) default NULL,
  `delFlag` bit(1) default NULL,
  `description` varchar(100) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_project`
--

LOCK TABLES `t_project` WRITE;
/*!40000 ALTER TABLE `t_project` DISABLE KEYS */;
INSERT INTO `t_project` VALUES (14,'2011-143','宝象河水厂DN600管及原水管迁改设计',4,NULL,'3',2,NULL,NULL,'2011-09-09','2011-11-30',NULL,NULL,'','32323'),(28,NULL,'呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程',5,NULL,NULL,2,NULL,NULL,'2011-10-24','2011-10-28',NULL,NULL,'\0',''),(29,NULL,'呈贡新区市政道路给水工程新北路B段北廊DN600给水管工程',1,NULL,NULL,NULL,NULL,NULL,'2011-10-24',NULL,NULL,NULL,'\0',''),(30,NULL,'彩云北路综合管沟DN1000给水工程',4,NULL,NULL,2,NULL,NULL,'2011-10-24','2011-10-28',NULL,NULL,'\0',''),(31,NULL,'彩云北路综合管沟DN1000给水工程',5,NULL,NULL,NULL,NULL,NULL,'2011-10-24',NULL,NULL,NULL,'\0',''),(32,'2011-166','富民繁花山',4,NULL,NULL,2,NULL,NULL,'2011-10-25','2011-11-07',NULL,NULL,'\0',''),(33,'2011-166','富民繁花山',5,NULL,NULL,NULL,NULL,NULL,'2011-10-25',NULL,NULL,NULL,'\0',''),(34,'2011-167','西山区19号规划路给水管改迁工程',4,NULL,NULL,NULL,NULL,NULL,'2011-10-26',NULL,NULL,NULL,'\0',''),(35,'2011-167','西山区19号规划路给水管改迁工程',5,NULL,NULL,2,NULL,NULL,'2011-10-26','2011-11-04',NULL,NULL,'\0',''),(36,'2011-168','昆明重型机械厂廉租房给水工程',4,NULL,NULL,2,NULL,NULL,'2011-10-26','2011-11-10',NULL,NULL,'\0',''),(37,'2011-168','昆明重型机械厂廉租房给水工程',5,NULL,NULL,NULL,NULL,NULL,'2011-10-26',NULL,NULL,NULL,'\0',''),(38,'2011-169','北部汽车客运站生活泵房改迁',5,NULL,NULL,2,NULL,NULL,'2011-10-26','2011-10-31',NULL,NULL,'\0',''),(39,'2011-170','桃花源居住宅小区给水工程',4,NULL,NULL,2,NULL,NULL,'2011-10-26','2011-11-04',NULL,NULL,'\0',''),(40,'2011-170','桃花源居住宅小区给水工程',5,NULL,NULL,NULL,NULL,NULL,'2011-10-26',NULL,NULL,NULL,'\0',''),(41,'2011-171','溪谷雅苑住宅小区给水工程',4,NULL,'3,5',2,NULL,NULL,'2011-10-27','2011-11-07',NULL,NULL,'\0',''),(42,'2011-171','溪谷雅苑住宅小区给水工程',5,NULL,NULL,NULL,NULL,NULL,'2011-10-27',NULL,NULL,NULL,'\0',''),(43,'2011-172','空港保供水北水厂备用水源方案',4,NULL,NULL,NULL,NULL,NULL,'2011-10-28',NULL,NULL,NULL,'\0',''),(44,'2011-173','中国医学科学院医学生物学研究所庭院给水工程',5,NULL,NULL,2,NULL,NULL,'2011-10-28','2011-11-10',NULL,NULL,'\0',''),(45,'2011-174','云南龙城中泰农产品物流中心庭院给水',5,NULL,NULL,2,NULL,NULL,'2011-10-28','2011-11-15',NULL,NULL,'\0',''),(46,'2011-175','清龙公司水井管网改造及住户改表设计',5,NULL,NULL,2,NULL,NULL,'2011-10-28','2011-11-18',NULL,NULL,'\0',''),(47,'2011-176','牟定县第二水厂及配套管网工程初步设计',4,NULL,NULL,2,NULL,NULL,'2011-10-31','2011-11-15',NULL,NULL,'\0',''),(48,'2011-177','文山县城南片区供水可研',3,NULL,NULL,NULL,NULL,NULL,'2011-11-02',NULL,NULL,NULL,'\0',''),(49,'2011-178','五华区201#路、202#路给水管设计',5,NULL,NULL,2,NULL,NULL,'2011-11-02','2011-11-10',NULL,NULL,'\0',''),(55,'2011-179','五华区西翥片区给水工程',4,0,NULL,2,NULL,NULL,'2011-11-10','2011-11-10',NULL,NULL,'\0',''),(56,'2011-180','五腊宏仁地块DN800给水管改迁',4,0,NULL,2,NULL,NULL,'2011-11-10','2011-11-16',NULL,NULL,'\0',''),(57,'2011-181','螺蛳湾国际商贸城创业园新册产业城给水工程',4,0,NULL,2,NULL,NULL,'2011-11-10','2011-11-29',NULL,NULL,'\0',''),(58,'2011-182','昆明多宝电缆公司给水工程',5,0,NULL,2,NULL,NULL,'2011-11-10','2011-11-18',NULL,NULL,'\0',''),(59,'2011-183','经开区印象欣城B.C给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-02',NULL,NULL,'\0',''),(60,'2011-184','金星农贸市场给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-02',NULL,NULL,'\0',''),(61,'2011-185','经开区西南广物流中心项目给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-02',NULL,NULL,'\0',''),(62,'2011-186','奥宸新天地庭院给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-07',NULL,NULL,'\0',''),(63,'2011-187','昆明市中医院呈贡新区医院给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-15',NULL,NULL,'\0',''),(64,'2011-188','岗头村城中村改造项目给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-20',NULL,NULL,'\0',''),(65,'2011-189','东方首座写字楼给水工程',4,0,NULL,2,NULL,NULL,'2011-11-18','2011-12-07',NULL,NULL,'\0',''),(66,'2011-190','云南省艺术家园给水工程',4,0,NULL,2,NULL,NULL,'2011-12-25','2011-12-25',NULL,NULL,'\0',''),(67,'2011-181','云南省地震局宿舍改表',5,0,NULL,2,NULL,NULL,'2011-12-22','2011-12-01',NULL,NULL,'\0',''),(68,'2011-191','丽江水厂滤池改造',5,0,NULL,NULL,NULL,NULL,'2011-12-29',NULL,NULL,NULL,'\0',''),(69,'2011-192','官渡13号路DN1200给水管改迁',4,0,NULL,2,NULL,NULL,'2011-12-02','2011-12-12',NULL,NULL,'\0',''),(70,'2011-193','轻轨3号线东部客运站给水管改迁',5,0,NULL,2,NULL,NULL,'2011-12-02','2011-12-09',NULL,NULL,'\0','');
/*!40000 ALTER TABLE `t_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_role`
--

DROP TABLE IF EXISTS `t_role`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_role`
--

LOCK TABLES `t_role` WRITE;
/*!40000 ALTER TABLE `t_role` DISABLE KEYS */;
INSERT INTO `t_role` VALUES (0,'系统管理员',''),(1,'合同','新建委托，编辑工程编号。对外收款。'),(2,'计划','分发工程项目到室主任及项目负责人。'),(3,'室主任','安排任务。专业负责人，校队，设计。'),(4,'项目主管','具体项目主管人。可能是室主任，或者设计人员。'),(5,'专业负责','项目设计上专业负责人。'),(6,'设计师','新建子图、设计。对其他设计图纸进行校队。'),(7,'总工','校队图纸，计划人员也是总工'),(8,'预算','接收项目主管、室主任、计划、合同安排的预算。'),(9,'出图','接收项目主管、室主任、计划、合同安排的出图。'),(10,'档案','接收计划、合同安排的图纸存档工作。'),(11,'财务','对外收款'),(12,'总裁','查看财务收款');
/*!40000 ALTER TABLE `t_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_subimg`
--

DROP TABLE IF EXISTS `t_subimg`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_subimg` (
  `id` int(11) NOT NULL auto_increment,
  `prjID` int(11) NOT NULL,
  `subImgName` varchar(255) NOT NULL,
  `subprj` int(11) NOT NULL,
  `imgtype` int(11) NOT NULL,
  `imgsize` int(11) NOT NULL,
  `imgnum` int(11) NOT NULL,
  `accomplishment` int(11) NOT NULL,
  `endDate` date NOT NULL,
  `proofed` tinyint(1) NOT NULL default '0',
  `proofreader` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_subimg`
--

LOCK TABLES `t_subimg` WRITE;
/*!40000 ALTER TABLE `t_subimg` DISABLE KEYS */;
INSERT INTO `t_subimg` VALUES (1,21,'新建子图',1,1,1,88,0,'2011-10-06',0,NULL),(2,21,'sss',1,2,1,1,0,'2011-10-06',0,NULL),(3,9,'11',2,2,2,1,1,'2011-09-22',0,NULL),(4,21,'12',2,2,2,2,1,'2011-10-06',0,NULL),(5,9,'232',3,1,2,12,0,'2011-09-22',0,NULL),(6,9,'qrw',1,2,2,4,0,'2011-09-22',0,NULL),(7,14,'asda',3,1,1,31,1,'2011-11-23',0,NULL),(8,26,'多大',1,1,2,3,2,'2011-10-29',0,NULL),(9,26,'新子图名字',1,1,6,3,4,'2011-10-29',0,NULL),(11,30,'管道',3,3,4,25,2,'2011-10-28',0,NULL),(12,30,'123',3,3,4,12,3,'2011-10-28',0,NULL),(13,36,'泵房平面图',3,3,3,3,1,'2011-11-10',0,NULL),(14,47,'自用水泵房',2,3,4,5,2,'2011-11-15',0,NULL);
/*!40000 ALTER TABLE `t_subimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_subprj`
--

DROP TABLE IF EXISTS `t_subprj`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `t_subprj` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `t_subprj`
--

LOCK TABLES `t_subprj` WRITE;
/*!40000 ALTER TABLE `t_subprj` DISABLE KEYS */;
INSERT INTO `t_subprj` VALUES (1,'室内消防泵房','ss要'),(2,'加压泵房',''),(3,'生活庭院','');
/*!40000 ALTER TABLE `t_subprj` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-25 14:21:51
