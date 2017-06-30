package com.jungle.tms.model;

import java.io.Serializable;
import java.util.Date;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class SubImg extends AbstractPersistentObject implements Serializable {
	private static final long serialVersionUID = 682415760925999238L;
	
	private Project project;
	private String subImgName;
	private Integer subprj;
	private Integer imgtype;
	private Integer imgsize;
	private Integer imgnum;
	private Integer accomplishment;
	private Date endDate;
	private int proofed;
	private Integer proofreader;
	
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Integer getCheckDate() {
		Date checkDate = project.getCheckDate();
		if(null == checkDate){
			checkDate = new Date();
		}		
		return (int)(endDate.getTime() - checkDate.getTime())/1000/3600/24;
	}	
	public Project getProject() {
		return project;
	}
	public void setProject(Project prject) {
		this.project = prject;
	}
	public String getSubImgName() {
		return subImgName;
	}
	public void setSubImgName(String subImgName) {
		this.subImgName = subImgName;
	}
	public Integer getSubprj() {
		return subprj;
	}
	public void setSubprj(Integer subprj) {
		this.subprj = subprj;
	}
	public Integer getImgtype() {
		return imgtype;
	}
	public void setImgtype(Integer imgtype) {
		this.imgtype = imgtype;
	}
	public Integer getImgsize() {
		return imgsize;
	}
	public void setImgsize(Integer imgsize) {
		this.imgsize = imgsize;
	}
	public Integer getImgnum() {
		return imgnum;
	}
	public void setImgnum(Integer imgnum) {
		this.imgnum = imgnum;
	}
	public Integer getAccomplishment() {
		return accomplishment;
	}
	public void setAccomplishment(Integer accomplishment) {
		this.accomplishment = accomplishment;
	}
	public int getProofed() {
		return proofed;
	}
	public void setProofed(int proofed) {
		this.proofed = proofed;
	}
	public Integer getProofreader() {
		return proofreader;
	}
	public void setProofreader(Integer proofreader) {
		this.proofreader = proofreader;
	}

}
