package com.jungle.tms.model;

import java.io.Serializable;
import java.util.Date;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Doc extends AbstractPersistentObject implements Serializable {

	private static final long serialVersionUID = 2332471580119617223L;
	
	private Integer prjID;
	private String docName;
	private String docPath;
	private String docType;
	private Integer uploader;
	private Date timestamp;
	
	public Integer getPrjID() {
		return prjID;
	}
	public void setPrjID(Integer prjID) {
		this.prjID = prjID;
	}
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	public String getDocPath() {
		return docPath;
	}
	public void setDocPath(String docPath) {
		this.docPath = docPath;
	}
	public String getDocType() {
		return docType;
	}
	public void setDocType(String docType) {
		this.docType = docType;
	}
	public Integer getUploader() {
		return uploader;
	}
	public void setUploader(Integer uploader) {
		this.uploader = uploader;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	
}
