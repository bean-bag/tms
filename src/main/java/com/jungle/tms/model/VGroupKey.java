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

}
