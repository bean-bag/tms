package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.ISubprjDao;
import com.jungle.tms.model.Subprj;
import com.jungle.tms.service.ISubprjService;

public class SubprjService implements ISubprjService {

	private ISubprjDao dao;

	public void setDao(ISubprjDao roleDao) {
		this.dao = roleDao;
	}

	@Override
	public List<Subprj> findAll() {
		return this.dao.findAll();
	}

	@Override
	public void delete(Integer id) {
		this.dao.doDeleteById(id);
	}

	@Override
	public void delete(Subprj id) {
		this.dao.doDelete(id);	
	}

	@Override
	public void save(Subprj d) {
		this.dao.doSave(d);
	}
}
