package com.jungle.tms.model;

import com.jungle.framework.core.model.AbstractPersistentObject;
import com.jungle.tms.enumo.GroupSort;

public class Group extends AbstractPersistentObject implements java.io.Serializable{

	private static final long serialVersionUID = -7826140880433832074L;

	private Integer prjID;
	private GroupSort sort;
	private Integer memberID;
	public Group(){}
	
	public Group(Integer prjID, GroupSort groupSort, Integer memberID) {
		super();
		this.prjID = prjID;
		this.sort = groupSort;
		this.memberID = memberID;
	}

	public Integer getPrjID() {
		return prjID;
	}
	public void setPrjID(Integer prjID) {
		this.prjID = prjID;
	}
	public GroupSort getSort() {
		return sort;
	}
	/**
	 * 1：主要负责办公室
	 * 2：辅助负责办公室
	 * 3：项目负责人
	 * 4：专业负责人（三室才有的分类）
	 * 5：设计人员
	 * 6：校对人员
	 * 7：预算人员
	 * @param sort
	 */
	public void setSort(GroupSort sort) {
		this.sort = sort;
	}
	public Integer getMemberID() {
		return memberID;
	}
	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}
}
