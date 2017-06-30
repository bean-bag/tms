package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Person;

public interface IPersonService {

	List<Person> findAll();
	
	void save(Person p);
	
	void delete(Integer id);
	
	void delete(Person id);
	/**
	 * 查询指定名称的用户
	 * @param userName
	 * @return
	 */
	List<Person> query(String userName);

	List<Person> findAllByPerson(Integer deptID);
	List<Person> findAllByPrj(Integer prjID);
	List<Person> findAll(Integer deptID);

	List<Person> findOfficers();
}
