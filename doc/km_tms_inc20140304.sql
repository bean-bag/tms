ALTER TABLE `t_department`
ADD COLUMN `helper`  int(11) NULL AFTER `pid`;

CREATE TABLE `t_style` (
`id`  int(11) NOT NULL ,
`prjID`  int(11) NULL ,
`userID`  int(11) NULL ,
`lineStyle`  varchar(32) NULL ,
PRIMARY KEY (`id`)
);

ALTER TABLE `t_project`
ADD COLUMN `contract`  bit(1) NULL AFTER `prjType`,
ADD COLUMN `deposit`  bit(1) NULL AFTER `contract`,
ADD COLUMN `collection`  bit(1) NULL AFTER `deposit`,
ADD COLUMN `audit`  bit(1) NULL AFTER `collection`,
ADD COLUMN `complete`  bit(1) NULL AFTER `audit`,
ADD COLUMN `createDate`  date NULL AFTER `endDate`,
ADD COLUMN `orderDate`  date NULL AFTER `createDate`,
ADD COLUMN `checkDate`  date NULL AFTER `orderDate`,
ADD COLUMN `budgetFlag`  bit(1) NULL AFTER `delFlag`,
ADD COLUMN `budgetAmount`  float(11,2) NULL AFTER `budgetFlag`,
ADD COLUMN `feeFlag`  bit(1) NULL AFTER `budgetAmount`;


-- 20140305
CREATE TABLE `v_group` (
`id`  int(11) NOT NULL ,
`prjID`  int(11) NOT NULL ,
`sort`  int(11) NOT NULL ,
`userCode`  varchar(32) NULL ,
`userName`  varchar(50) NULL ,
`teamLeader`  bit(1) NULL ,
`depart`  int(11) NULL,
PRIMARY KEY (`id`)
);
