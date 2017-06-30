package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IDepartmentDao;
import com.jungle.tms.model.Department;
import com.jungle.tms.service.IDepartmentService;

public class DepartmentService implements IDepartmentService {

	private IDepartmentDao dao;

	public void setDao(IDepartmentDao departDao) {
		this.dao = departDao;
	}

	@Override
	public List<Department> queryAll() {
		return this.dao.queryAll();
	}

	@Override
	public void delete(Integer id) {
		this.dao.doDeleteById(id);
	}

	@Override
	public void delete(Department id) {
		this.dao.doDelete(id);	
	}

	@Override
	public void save(Department d) {
		this.dao.doSave(d);
	}

	@Override
	public List<Department> findByParent(Integer deptId) {
		return this.dao.findBy("pid", deptId);
	}

	@Override
	public List<Department> queryMinorDepart(Integer prjID) {
		return this.dao.queryMinorDepart(prjID);
	}
}
