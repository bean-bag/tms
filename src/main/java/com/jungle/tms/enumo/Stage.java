package com.jungle.tms.enumo;
/**
 * ���������׶�
 * 0 ����ͬ�½�
 * 1 �����̷ַ�
 * 2 �������ֹ�
 * 3 ����ƹ���
 * 4 ��У�Թ���
 * 5 ����˹���
 * 6 : ��ͼ
 * 7 : �鵵
 */
public enum Stage {
	/** �½� */
	S0_NEW, 
	
	/** �ַ� */
	S1_DISTRIBUTE, 
	
	/** �ֹ� */
	S2_DIVISION, 
	
	/** ��� */
	S3_DESIGN, 
	
	/** У�� */
	S4_PROOF, 
	
	/** ��� */
	S5_CHECK, 
	
	/** ��ͼ */
	S6_OUTPRINT, 
	
	/** �鵵 */
	S7_DOC
}
