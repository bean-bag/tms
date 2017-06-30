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
	 * 操作图标
	 */
	private int[] actionIcon;
	/**
	 * 操作动作
	 */
	private int[] actionOper;
	/**
	 * 操作图标
	 */
	private int[] subActionIcon;
	/**
	 * 操作动作
	 */
	private int[] subActionOper;
	/**
	 * 项目状态动作
	 */
	private int[] stateActionOper;
	/**
	 * 预算动作
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
 * 助理人员		：创建工程(create4helper)、修改工程(update4helper)、删除工程(delete)、
 * 计划人员		：创建工程(create4planer)、修改工程(update4planer)、删除工程(delete)、分派工程(update4officer)、
 * 室主任		：								分派工程、
 * 项目负责人	：								分派工程、创建子图(create4designer)
 * 设计师		：										、创建子图(create4designer)、修改子图(update4designer)、校对子图
 * 预算人员		：工程预算(budgeteer)
 * 总工			：工程审核(assessor)
 * 出图人员		：工程出图(outprint)
 * 归档人员		：工程归档(archive)
 * 财务人员		：收款确认(account)
 */
}
