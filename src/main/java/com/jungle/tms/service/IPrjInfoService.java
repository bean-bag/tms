package com.jungle.tms.service;

import com.jungle.tms.model.PrjInfo;

public interface IPrjInfoService {

	void save(PrjInfo d);

	PrjInfo getPrjInfo(String prjName);	
}
