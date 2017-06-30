package com.jungle.tms.model;

import com.jungle.tms.enumo.GroupSort;

public class VGroupKey implements java.io.Serializable{
	private static final long serialVersionUID = 6537335768265983369L;
	private Integer id;
	private Integer prjID;
	private GroupSort sort;
	public VGroupKey(){}
	public VGroupKey(Integer id, Integer prjID, GroupSort sort) {
		this.id = id;
		this.prjID = prjID;
		this.sort = sort;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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

}
