package com.jungle.tms.model;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class PrjInfo extends AbstractPersistentObject implements java.io.Serializable{

	private static final long serialVersionUID = -2600833650809747155L;

	private String prjName;
	private String location;
	private String scale;
	private String watersupply;
	private String pipeline;
	private String construction;
	private String electric;
	private String contact;
	private String builder;
	private String docNo;
	
	public String getPrjName() {
		return prjName;
	}
	public void setPrjName(String prjName) {
		this.prjName = prjName;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getScale() {
		return scale;
	}
	public void setScale(String scale) {
		this.scale = scale;
	}
	public String getWatersupply() {
		return watersupply;
	}
	public void setWatersupply(String watersupply) {
		this.watersupply = watersupply;
	}
	public String getPipeline() {
		return pipeline;
	}
	public void setPipeline(String pipeline) {
		this.pipeline = pipeline;
	}
	public String getConstruction() {
		return construction;
	}
	public void setConstruction(String construction) {
		this.construction = construction;
	}
	public String getElectric() {
		return electric;
	}
	public void setElectric(String electric) {
		this.electric = electric;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getBuilder() {
		return builder;
	}
	public void setBuilder(String builder) {
		this.builder = builder;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	
}
