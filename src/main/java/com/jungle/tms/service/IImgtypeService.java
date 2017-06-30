package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Imgtype;

public interface IImgtypeService {

	List<Imgtype> findAll();
	
	void save(Imgtype d);
	
	void delete(Integer id);
	
	void delete(Imgtype id);

	 
}
