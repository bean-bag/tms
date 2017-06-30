package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.ISubImgDao;
import com.jungle.tms.model.SubImg;
import com.jungle.tms.service.ISubImgService;

public class SubImgService implements ISubImgService {

	private ISubImgDao dao;

	public void setDao(ISubImgDao roleDao) {
		this.dao = roleDao;
	}

	@Override
	public List<SubImg> findAll() {
		return this.dao.findAll();
	}

	@Override
	public void delete(Integer id) {
		this.dao.doDeleteById(id);
	}

	@Override
	public void delete(SubImg id) {
		this.dao.doDelete(id);	
	}

	@Override
	public void save(SubImg d) {
		this.dao.doSave(d);
	}

	@Override
	public List<SubImg> findAll(Integer prjID) {
		return dao.findBy("project.id", prjID);
	}

	@Override
	public void update(Integer subImgId, int proofed, Integer proofreaderID) {
		SubImg si = dao.findById(subImgId);
		si.setProofed(proofed);
		si.setProofreader(proofreaderID);
		dao.doSave(si);
	}
}
