package com.jungle.tms.model;

import java.io.Serializable;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class LineStyle extends AbstractPersistentObject implements Serializable{

	private static final long serialVersionUID = -4676263590084482387L;

	public LineStyle(){}
	public LineStyle(Integer prjID,Integer userID){
		this.prjID = prjID;
		this.userID = userID;
	}
	private Integer prjID;
	private Integer userID;
	private String lineStyle;
	public Integer getPrjID() {
		return prjID;
	}
	public void setPrjID(Integer prjID) {
		this.prjID = prjID;
	}
	public Integer getUserID() {
		return userID;
	}
	public void setUserID(Integer userID) {
		this.userID = userID;
	}
	public String getLineStyle() {
		return lineStyle;
	}
	public void setLineStyle(String lineStyle) {
		this.lineStyle = lineStyle;
	}
	
	
}
