package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IVGroupDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.VGroup;
import com.jungle.tms.service.IVGroupService;

public class VGroupService implements IVGroupService {
	private IVGroupDao dao;
	

	public void setDao(IVGroupDao dao) {
		this.dao = dao;
	}

	@Override
	public List<VGroup> findAll(Integer prjID, GroupSort sort) {
		return dao.findAll(prjID, sort);
	}

	@Override
	public boolean isGroupSort(Integer prjID, Integer deptID, GroupSort sort) {
		return dao.findAll(prjID, deptID, sort).size()>0;
	}

	@Override
	public List<VGroup> findAll(Integer prjID) {
		return dao.findAll(prjID);
	}

	@Override
	public List<VGroup> findAll(Integer prjID, Integer memberID, GroupSort sort) {
		return dao.findAll(prjID, memberID, sort);
	}

}
