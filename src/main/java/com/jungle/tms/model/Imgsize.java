package com.jungle.tms.model;

import java.io.Serializable;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Imgsize extends AbstractPersistentObject implements Serializable {

	private static final long serialVersionUID = 9070179163959037148L;
	
	private String imgsizeName;
	private String profile;

	public Imgsize(){}
	public Imgsize(Integer id){
		this.setId(id);
	}

	public String getImgsizeName() {
		return imgsizeName;
	}
	public void setImgsizeName(String imgsizeName) {
		this.imgsizeName = imgsizeName;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

}
