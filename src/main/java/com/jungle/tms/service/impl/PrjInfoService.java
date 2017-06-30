package com.jungle.tms.service.impl;

import com.jungle.tms.dao.IPrjInfoDao;
import com.jungle.tms.model.PrjInfo;
import com.jungle.tms.service.IPrjInfoService;

public class PrjInfoService implements IPrjInfoService {

	private IPrjInfoDao dao;

	public void setDao(IPrjInfoDao roleDao) {
		this.dao = roleDao;
	}

	@Override
	public void save(PrjInfo d) {
		this.dao.doSave(d);
	}

	@Override
	public PrjInfo getPrjInfo(String prjName) {
		return this.dao.findById(prjName);
	}
}
