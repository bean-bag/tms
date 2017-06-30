package com.jungle.tms.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Department extends AbstractPersistentObject implements
		Serializable {

	private static final long serialVersionUID = 3460770492091606497L;

	private String deptName;
	private String profile;
	private Integer pid;
	private Integer helper;
	private Set<Person> persons = new HashSet<Person>();

	public Department(){}
	public Department(Integer id){
		super.setId(id);
	}
	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getHelper() {
		return helper;
	}
	public void setHelper(Integer accepter) {
		this.helper = accepter;
	}
	public Set<Person> getPersons() {
		return persons;
	}

	public void setPersons(Set<Person> persons) {
		this.persons = persons;
	}
}
