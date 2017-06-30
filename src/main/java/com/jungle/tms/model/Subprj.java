package com.jungle.tms.model;

import java.io.Serializable;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Subprj extends AbstractPersistentObject implements Serializable {

	private static final long serialVersionUID = 4510872305943911934L;
	
	private String subprjName;
	private String profile;

	public Subprj(){}
	public Subprj(Integer id){
		this.setId(id);
	}
	public String getSubprjName() {
		return subprjName;
	}

	public void setSubprjName(String roleName) {
		this.subprjName = roleName;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

}
