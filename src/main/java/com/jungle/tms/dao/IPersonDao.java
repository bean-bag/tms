package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.Person;


public interface IPersonDao extends IDomainObjectDao<Person>{

	List<Person> queryAll();
	List<Person> findOfficers();
	
	List<Person> findByCode(String userName);	
	List<Person> findByDept(Integer deptID);	
	List<Person> findByPerson(Integer userID);
	List<Person> findByPrj(Integer prjID);
}
