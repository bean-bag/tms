package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Role;

public interface IRoleService {

	List<Role> queryAll();
	
	void save(Role d);
	
	//void delete(Integer id);
	
	//void delete(Department id);

	//public Page pagedQuery(int pageNo, int pageSize);
}
