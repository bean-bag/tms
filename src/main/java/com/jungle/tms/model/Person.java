package com.jungle.tms.model;

import java.util.HashSet;
import java.util.Set;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Person extends AbstractPersistentObject implements java.io.Serializable {
	private static final long serialVersionUID = -4787479894212064684L;

	private String userCode;
	private String userName;
	private String password;
	private Department depart;
	private Boolean teamLeader;
	private Role role;
	
	private Set<Project> projects = new HashSet<Project>();
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	
	public Department getDepart() {
		return depart;
	}
	public void setDepart(Department depart) {
		this.depart = depart;
	}
	public Boolean isTeamLeader() {
		return teamLeader;
	}
	public void setTeamLeader(Boolean teamLeader) {
		this.teamLeader = teamLeader;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Set<Project> getProjects() {
		return projects;
	}
	public void setProjects(Set<Project> projects) {
		this.projects = projects;
	}

	
}
