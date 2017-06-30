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
	 * 1����Ҫ����칫��
	 * 2����������칫��
	 * 3����Ŀ������
	 * 4��רҵ�����ˣ����Ҳ��еķ��ࣩ
	 * 5�������Ա
	 * 6��У����Ա
	 * 7��Ԥ����Ա
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
