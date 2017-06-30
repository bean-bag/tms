package com.jungle.tms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.jungle.tms.enumo.Oper;
import com.jungle.tms.model.Group;
import com.jungle.tms.model.Role;

public class User {

	private Integer id;
	private String userCode;
	private String userName;
	private Integer deptID;
	private String deptName;
	private boolean teamLeader;
	private List<String> perm = new ArrayList<String>();
	private List<Group> groupList = new ArrayList<Group>();
	private Role roleAction;
	public User(Integer id,String userCode,String userName,Role role,boolean teamLeader ){
		this.setId(id);
		this.setUserCode(userCode);
		this.setUserName(userName);
		this.setTeamLeader(teamLeader);
		this.setPerm(role.getId().toString());
		this.setRoleAction(buildRole(role,teamLeader));
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getDeptID() {
		return deptID;
	}

	public void setDeptID(Integer deptID) {
		this.deptID = deptID;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Role getRoleAction() {
		return roleAction;
	}
	
	public void setRoleAction(Role role) {
		this.roleAction = role;
	}
	
	public boolean isTeamLeader() {
		return teamLeader;
	}

	public void setTeamLeader(boolean teamLeader) {
		this.teamLeader = teamLeader;
	}

	public List<String> getPerm() {
		return perm;
	}

	public void setPerm(String perm) {
		this.perm = Arrays.asList(perm.split(","));
	}

	public List<Group> getGroupList() {
		return groupList;
	}

	public void setGroupList(List<Group> groupList) {
		this.groupList = groupList;
	}

	/**
	 * 合同
	 * @return
	 */
	public boolean isHelper() {
		return this.perm.contains("1");
	}

	/**
	 * 计划
	 * @return
	 */
	public boolean isPlanner() {
		return this.perm.contains("2");
	}

	/**
	 * 管理（室主任）
	 * @return
	 */
	/*public boolean isOfficer() {
		return this.officer;
	}

	public void setOfficer(boolean officer) {
		this.officer = officer;
	}*/

	/**
	 * 责任人
	 * @return
	 */
	public boolean isDutyPerson() {
		return this.perm.contains("4");
	}

	/**
	 * 设计师
	 * @return
	 */
	public boolean isDesigner() {
		return this.perm.contains("6");
	}

	/**
	 * 校对
	 * @return
	 */
	/*public boolean isCorrector() {
		return this.perm.contains("6");
	}*/

	/**
	 * 预算
	 * @return
	 */
	public boolean isBudgeteer() {
		return this.perm.contains("8");
	}

	/**
	 * 总工
	 * @return
	 */
	public boolean isAssessor() {
		return this.perm.contains("7");
	}

	/**
	 * 出图
	 * @return
	 */
	public boolean isOutprint(){
		return this.perm.contains("9");
	}
	/**
	 * 归档
	 * @return
	 */
	public boolean isArchive(){
		return this.perm.contains("10");
	}
	
	/**
	 * 财务
	 * @return
	 */
	public boolean isAccountant() {
		return this.perm.contains("11");
	}

	/**
	 * 总裁
	 * @return
	 */
	public boolean isCeo() {
		return this.perm.contains("12");
	}

	/**
	 * 系统管理员
	 * @return
	 */
	public boolean isAdmin(){
		return this.perm.contains("9999");
	}
	public static Role buildRole(Role _role,boolean isTL){
		Role role = new Role();
		role.setId(_role.getId());
		role.setRoleName(_role.getRoleName());
		role.setProfile(_role.getProfile());
		Oper[] actionIcon= new Oper[0];//动作图标
		int[] actionOper= new int[0];//动作操作
		int[] subActionIcon= new int[0];
		int[] subActionOper= new int[0];
		int[] stateActionOper= new int[0];//状态操作
		int[] budgetActionOper= new int[0];//预算操作
		
		switch (role.getId()){
		case 1 :{//合同人员
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O1_EDIT_PRJ,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2,3,4};
			budgetActionOper = new int[]{0,1};
		};break;
		case 2 :{//计划人员
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O1_EDIT_PRJ,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2,3,4};
			budgetActionOper = new int[]{0,1};
		};break;
		/*case 3 :{//室主任
			actionIcon = new int[]{0,1,3,12};
			//actionOper = new int[]{};
			subActionIcon = new int[]{0,1};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;*/
		case 4 :{//项目主管
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			subActionIcon = new int[]{0,1};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;
		case 5 :{//专业负责
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;
		case 6 :{//设计师
			//actionOper = new int[]{};
			subActionIcon = new int[]{0,1};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
			budgetActionOper = new int[]{0};
			if(isTL){//设计室主任
				actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O1_EDIT_PRJ,Oper.O3_CREATE_PRJ,Oper.O10_PRJ_INFO,Oper.O11_ASSIGNED_TASK,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			}else{
				actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O3_CREATE_PRJ,Oper.O10_PRJ_INFO,Oper.O11_ASSIGNED_TASK,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			}
		};break;
		case 7 :{//总工
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O4_CHECK,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
			budgetActionOper = new int[]{0,1};
		};break;
		case 8 :{//预算
			if(isTL){//预算室主任
				actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O5_ASSIGNED_BUDGET,Oper.O6_PRJ_BUDGET,Oper.O12_SHOW_MEMBER};
				//actionOper = new int[]{};
				//subActionIcon = new int[]{};
				//subActionOper = new int[]{};
				stateActionOper = new int[]{0,1};
				budgetActionOper = new int[]{0,1};
			}else{
				actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O6_PRJ_BUDGET,Oper.O12_SHOW_MEMBER};
				//actionOper = new int[]{};
				//subActionIcon = new int[]{};
				//subActionOper = new int[]{};
				stateActionOper = new int[]{0,1};
				budgetActionOper = new int[]{0,1};
			}
		};break;
		case 9 :{//出图
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O7_PRJ_IMG,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;
		case 10 :{//档案
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O8_PRJ_DOC,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2};
		};break;
		case 11 :{//财务
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O9_BACK_SECTION,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{3,4};
		};break;
		case 12 :{//总裁
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2,3,4};
		};break;
		}
		
		role.setActionIcon(actionIcon);
		role.setActionOper(actionOper);
		role.setSubActionIcon(subActionIcon);
		role.setSubActionOper(subActionOper);
		role.setStateActionOper(stateActionOper);
		role.setBudgetActionOper(budgetActionOper);
		
		return role;
	}
}
