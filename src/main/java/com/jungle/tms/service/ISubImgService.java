package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.SubImg;

public interface ISubImgService {

	List<SubImg> findAll();
	
	List<SubImg> findAll(Integer prjID);
	
	void save(SubImg d);
	
	void delete(Integer id);
	
	void delete(SubImg id);

	void update(Integer subImgId, int proofed, Integer proofreaderID);
}
