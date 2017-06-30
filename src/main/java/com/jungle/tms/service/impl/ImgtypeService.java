package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IImgtypeDao;
import com.jungle.tms.model.Imgtype;
import com.jungle.tms.service.IImgtypeService;

public class ImgtypeService implements IImgtypeService {

	private IImgtypeDao dao;

	public void setDao(IImgtypeDao roleDao) {
		this.dao = roleDao;
	}

	@Override
	public List<Imgtype> findAll() {
		return this.dao.findAll();
	}

	@Override
	public void delete(Integer id) {
		this.dao.doDeleteById(id);
	}

	@Override
	public void delete(Imgtype id) {
		this.dao.doDelete(id);	
	}

	@Override
	public void save(Imgtype d) {
		this.dao.doSave(d);
	}
}
