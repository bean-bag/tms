package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Subprj;

public interface ISubprjService {

	List<Subprj> findAll();
	
	void save(Subprj d);
	
	void delete(Integer id);
	
	void delete(Subprj id);

	 
}
