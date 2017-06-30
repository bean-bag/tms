package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Imgsize;

public interface IImgsizeService {

	List<Imgsize> findAll();
	
	void save(Imgsize d);
	
	void delete(Integer id);
	
	void delete(Imgsize id);

	 
}
