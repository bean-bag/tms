package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IImgsizeDao;
import com.jungle.tms.model.Imgsize;
import com.jungle.tms.service.IImgsizeService;

public class ImgsizeService implements IImgsizeService {

	private IImgsizeDao dao;

	public void setDao(IImgsizeDao roleDao) {
		this.dao = roleDao;
	}

	@Override
	public List<Imgsize> findAll() {
		return this.dao.findAll();
	}

	@Override
	public void delete(Integer id) {
		this.dao.doDeleteById(id);
	}

	@Override
	public void delete(Imgsize id) {
		this.dao.doDelete(id);	
	}

	@Override
	public void save(Imgsize d) {
		this.dao.doSave(d);
	}
}
