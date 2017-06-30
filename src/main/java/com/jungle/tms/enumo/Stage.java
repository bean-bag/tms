package com.jungle.tms.enumo;
/**
 * 工程所处阶段
 * 0 ：合同新建
 * 1 ：工程分发
 * 2 ：工作分工
 * 3 ：设计过程
 * 4 ：校对过程
 * 5 ：审核过程
 * 6 : 出图
 * 7 : 归档
 */
public enum Stage {
	/** 新建 */
	S0_NEW, 
	
	/** 分发 */
	S1_DISTRIBUTE, 
	
	/** 分工 */
	S2_DIVISION, 
	
	/** 设计 */
	S3_DESIGN, 
	
	/** 校对 */
	S4_PROOF, 
	
	/** 审核 */
	S5_CHECK, 
	
	/** 出图 */
	S6_OUTPRINT, 
	
	/** 归档 */
	S7_DOC
}
