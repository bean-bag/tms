package com.jungle.tms.model;

import java.util.Date;

public class Task {

	private String prjName;
	private String prjType;
	private String prjNumber;
	private Date startDate;
	private Date endDate;
	private String state;
	private String dir;
	
	
	public String getPrjName() {
		return prjName;
	}
	public void setPrjName(String prjName) {
		this.prjName = prjName;
	}
	public String getPrjType() {
		return prjType;
	}
	public void setPrjType(String prjType) {
		this.prjType = prjType;
	}

	public String getPrjNumber() {
		return prjNumber;
	}
	public void setPrjNumber(String prjNumber) {
		this.prjNumber = prjNumber;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	
}
