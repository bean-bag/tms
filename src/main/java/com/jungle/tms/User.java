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
	 * ��ͬ
	 * @return
	 */
	public boolean isHelper() {
		return this.perm.contains("1");
	}

	/**
	 * �ƻ�
	 * @return
	 */
	public boolean isPlanner() {
		return this.perm.contains("2");
	}

	/**
	 * ���������Σ�
	 * @return
	 */
	/*public boolean isOfficer() {
		return this.officer;
	}

	public void setOfficer(boolean officer) {
		this.officer = officer;
	}*/

	/**
	 * ������
	 * @return
	 */
	public boolean isDutyPerson() {
		return this.perm.contains("4");
	}

	/**
	 * ���ʦ
	 * @return
	 */
	public boolean isDesigner() {
		return this.perm.contains("6");
	}

	/**
	 * У��
	 * @return
	 */
	/*public boolean isCorrector() {
		return this.perm.contains("6");
	}*/

	/**
	 * Ԥ��
	 * @return
	 */
	public boolean isBudgeteer() {
		return this.perm.contains("8");
	}

	/**
	 * �ܹ�
	 * @return
	 */
	public boolean isAssessor() {
		return this.perm.contains("7");
	}

	/**
	 * ��ͼ
	 * @return
	 */
	public boolean isOutprint(){
		return this.perm.contains("9");
	}
	/**
	 * �鵵
	 * @return
	 */
	public boolean isArchive(){
		return this.perm.contains("10");
	}
	
	/**
	 * ����
	 * @return
	 */
	public boolean isAccountant() {
		return this.perm.contains("11");
	}

	/**
	 * �ܲ�
	 * @return
	 */
	public boolean isCeo() {
		return this.perm.contains("12");
	}

	/**
	 * ϵͳ����Ա
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
		Oper[] actionIcon= new Oper[0];//����ͼ��
		int[] actionOper= new int[0];//��������
		int[] subActionIcon= new int[0];
		int[] subActionOper= new int[0];
		int[] stateActionOper= new int[0];//״̬����
		int[] budgetActionOper= new int[0];//Ԥ�����
		
		switch (role.getId()){
		case 1 :{//��ͬ��Ա
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O1_EDIT_PRJ,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2,3,4};
			budgetActionOper = new int[]{0,1};
		};break;
		case 2 :{//�ƻ���Ա
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O1_EDIT_PRJ,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2,3,4};
			budgetActionOper = new int[]{0,1};
		};break;
		/*case 3 :{//������
			actionIcon = new int[]{0,1,3,12};
			//actionOper = new int[]{};
			subActionIcon = new int[]{0,1};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;*/
		case 4 :{//��Ŀ����
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			subActionIcon = new int[]{0,1};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;
		case 5 :{//רҵ����
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;
		case 6 :{//���ʦ
			//actionOper = new int[]{};
			subActionIcon = new int[]{0,1};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
			budgetActionOper = new int[]{0};
			if(isTL){//���������
				actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O1_EDIT_PRJ,Oper.O3_CREATE_PRJ,Oper.O10_PRJ_INFO,Oper.O11_ASSIGNED_TASK,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			}else{
				actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O3_CREATE_PRJ,Oper.O10_PRJ_INFO,Oper.O11_ASSIGNED_TASK,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			}
		};break;
		case 7 :{//�ܹ�
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O4_CHECK,Oper.O12_SHOW_MEMBER,Oper.O13_SUB_DOC};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
			budgetActionOper = new int[]{0,1};
		};break;
		case 8 :{//Ԥ��
			if(isTL){//Ԥ��������
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
		case 9 :{//��ͼ
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O7_PRJ_IMG,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1};
		};break;
		case 10 :{//����
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O8_PRJ_DOC,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{0,1,2};
		};break;
		case 11 :{//����
			actionIcon = new Oper[]{Oper.O0_SHOW_IM,Oper.O9_BACK_SECTION,Oper.O12_SHOW_MEMBER};
			//actionOper = new int[]{};
			//subActionIcon = new int[]{};
			//subActionOper = new int[]{};
			stateActionOper = new int[]{3,4};
		};break;
		case 12 :{//�ܲ�
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
