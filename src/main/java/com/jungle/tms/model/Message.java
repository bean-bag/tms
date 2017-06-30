package com.jungle.tms.model;

import java.io.Serializable;
import java.util.Date;

import com.jungle.framework.core.model.AbstractPersistentObject;

public class Message extends AbstractPersistentObject implements Serializable {

	private static final long serialVersionUID = -57535414407894721L;
	
	public enum MsgType{SYSTEM_MSG,USER_MSG };
	
	private int groupID;
	private int userID;
	private String userName;
	private Date date;
	private String message;
	private int type;
	public int getGroupID() {
		return groupID;
	}
	public void setGroupID(int groupID) {
		this.groupID = groupID;
	}
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public void setType(MsgType type) {
		this.type = type.ordinal();
	}
	
	

}
