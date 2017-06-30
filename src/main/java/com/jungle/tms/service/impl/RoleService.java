package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IRoleDao;
import com.jungle.tms.model.Role;
import com.jungle.tms.service.IRoleService;

public class RoleService implements IRoleService {

	private IRoleDao dao;

	public void setDao(IRoleDao roleDao) {
		this.dao = roleDao;
	}

	@Override
	public List<Role> queryAll() {
		return this.dao.queryAll();
		//return this.dao.findAll();
	}

	/*@Override
	public void delete(Integer id) {
		this.roleDao.doDeleteById(id);
	}

	@Override
	public void delete(Department id) {
		this.roleDao.doDelete(id);	
	}*/

	@Override
	public void save(Role d) {
		this.dao.doSave(d);
	}

	/*@Override
	public Page pagedQuery(int pageNo, int pageSize) {
		return this.roleDao.pagedQuery(pageNo, pageSize, null);
	}*/


}
