package com.jungle.tms.model;

import java.io.Serializable;
import java.util.Date;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class MessageSeq extends AbstractPersistentObject implements Serializable{

	private static final long serialVersionUID = -5008279270617845731L;
	private MessageSeqPK pk;
	
	private Integer maxNO;
	private Date stamp;
	
	public MessageSeq() {		
	}
	public MessageSeq(MessageSeqPK pk, Integer maxNO) {
		this.pk = pk;
		this.maxNO = maxNO;
		this.stamp = new Date();
	}
	public MessageSeq(Integer groupID, Integer userID, Integer maxNO) {
		this(new MessageSeqPK(groupID,userID),maxNO);
	}
	
	public MessageSeqPK getPk() {
		return pk;
	}
	public void setPk(MessageSeqPK pk) {
		this.pk = pk;
	}
	public Integer getMaxNO() {
		return maxNO;
	}
	public void setMaxNO(Integer maxNO) {
		this.maxNO = maxNO;
	}
	public Date getStamp() {
		return stamp;
	}
	public void setStamp(Date stamp) {
		this.stamp = stamp;
	}
	
}
