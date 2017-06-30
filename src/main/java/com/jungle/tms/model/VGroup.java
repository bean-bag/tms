package com.jungle.tms.model;

//import com.jungle.framework.core.model.AbstractPersistentObject;
import com.jungle.framework.core.model.IDomainObject;

public class VGroup /* extends AbstractPersistentObject */implements
		IDomainObject, java.io.Serializable {
	private static final long serialVersionUID = -298156797201892126L;
	private VGroupKey id;
	private String userCode;
	private String userName;
	private Boolean teamLeader;
	private Department depart;

	public VGroupKey getId() {
		return id;
	}

	public void setId(VGroupKey id) {
		this.id = id;
	}

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

	public Boolean getTeamLeader() {
		return teamLeader;
	}

	public void setTeamLeader(Boolean teamLeader) {
		this.teamLeader = teamLeader;
	}

	public Department getDepart() {
		return depart;
	}

	public void setDepart(Department depart) {
		this.depart = depart;
	}

}
