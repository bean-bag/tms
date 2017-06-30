package com.jungle.tms.model;

import java.io.Serializable;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Imgtype extends AbstractPersistentObject implements Serializable {

	private static final long serialVersionUID = 4510872305943911933L;
	
	private String imgtypeName;
	private String profile;

	public Imgtype(){}
	public Imgtype(Integer id){
		this.setId(id);
	}
	public String getImgtypeName() {
		return imgtypeName;
	}

	public void setImgtypeName(String roleName) {
		this.imgtypeName = roleName;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

}
