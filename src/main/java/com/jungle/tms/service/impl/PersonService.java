package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IPersonDao;
import com.jungle.tms.model.Person;
import com.jungle.tms.service.IPersonService;

public class PersonService implements IPersonService {
	private IPersonDao dao;

	public void setDao(IPersonDao dao) {
		this.dao = dao;
		
	}

	public void delete(Integer id) {
		dao.doDeleteById(id);
	}

	public List<Person> query(String userName) {		
		return dao.findByCode(userName);
	}

	public void save(Person p) {
		dao.doSave(p);
	}

	public void delete(Person p) {
		dao.doDelete(p);
	}

	public List<Person> findAll() {
		return dao.queryAll();
	}

//	@Override
//	public List<Person> findAllTeam(Integer deptID) {
//		return dao.findAllTeam(deptID);
//	}

	@Override
	public List<Person> findAll(Integer deptID) {
		return dao.findByDept(deptID);
	}

	@Override
	public List<Person> findOfficers() {
		return this.dao.findOfficers();
	}

	@Override
	public List<Person> findAllByPerson(Integer userID) {
		return dao.findByPerson(userID);
	}

	@Override
	public List<Person> findAllByPrj(Integer prjID) {
		return dao.findByPrj(prjID);
	}

}
