package com.jungle.tms.model;

import java.io.Serializable;

import com.jungle.framework.core.model.AbstractPersistentObject;
import com.jungle.tms.enumo.Oper;

public class Role extends AbstractPersistentObject implements Serializable {

	private static final long serialVersionUID = 4510872305943911932L;
	
	private String roleName;
	private String profile;

	public Role(){}
	public Role(Integer id){
		this.setId(id);
	}
	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}
	
	/**
	 * ����ͼ��
	 */
	private int[] actionIcon;
	/**
	 * ��������
	 */
	private int[] actionOper;
	/**
	 * ����ͼ��
	 */
	private int[] subActionIcon;
	/**
	 * ��������
	 */
	private int[] subActionOper;
	/**
	 * ��Ŀ״̬����
	 */
	private int[] stateActionOper;
	/**
	 * Ԥ�㶯��
	 */
	private int[] budgetActionOper;

	public int[] getActionIcon() {
		return actionIcon;
	}
	public void setActionIcon(Oper[] actionIcon) {
		this.actionIcon = new int[actionIcon.length];
		for(int i=0;i<actionIcon.length;i++)
		this.actionIcon[i]=actionIcon[i].ordinal();
	}
	public int[] getActionOper() {
		return actionOper;
	}
	public void setActionOper(int[] actionOper) {
		this.actionOper = actionOper;
	}
	public int[] getSubActionIcon() {
		return subActionIcon;
	}
	public void setSubActionIcon(int[] subActionIcon) {
		this.subActionIcon = subActionIcon;
	}
	public int[] getSubActionOper() {
		return subActionOper;
	}
	public void setSubActionOper(int[] subActionOper) {
		this.subActionOper = subActionOper;
	}
	public int[] getStateActionOper() {
		return stateActionOper;
	}
	public void setStateActionOper(int[] stateActionOper) {
		this.stateActionOper = stateActionOper;
	}
	public int[] getBudgetActionOper() {
		return budgetActionOper;
	}
	public void setBudgetActionOper(int[] budgetActionOper) {
		this.budgetActionOper = budgetActionOper;
	}
	
/**
 * ������Ա		����������(create4helper)���޸Ĺ���(update4helper)��ɾ������(delete)��
 * �ƻ���Ա		����������(create4planer)���޸Ĺ���(update4planer)��ɾ������(delete)�����ɹ���(update4officer)��
 * ������		��								���ɹ��̡�
 * ��Ŀ������	��								���ɹ��̡�������ͼ(create4designer)
 * ���ʦ		��										��������ͼ(create4designer)���޸���ͼ(update4designer)��У����ͼ
 * Ԥ����Ա		������Ԥ��(budgeteer)
 * �ܹ�			���������(assessor)
 * ��ͼ��Ա		�����̳�ͼ(outprint)
 * �鵵��Ա		�����̹鵵(archive)
 * ������Ա		���տ�ȷ��(account)
 */
}
