package com.jungle.tms.model;

/**
 * TMessageSeqId entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class MessageSeqPK implements java.io.Serializable {

	private static final long serialVersionUID = 1543160456001704418L;
	private Integer groupId;
	private Integer userId;

	// Constructors

	/** default constructor */
	public MessageSeqPK() {
	}

	/** full constructor */
	public MessageSeqPK(Integer groupId, Integer userId) {
		this.groupId = groupId;
		this.userId = userId;
	}

	// Property accessors

	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof MessageSeqPK))
			return false;
		MessageSeqPK cast = (MessageSeqPK) other;

		return ((getGroupId() == cast.getGroupId()) || (getGroupId() != null
				&& cast.getGroupId() != null && getGroupId().equals(
				cast.getGroupId())))
				&& ((getUserId() == cast.getUserId()) || (getUserId() != null
						&& cast.getUserId() != null && getUserId().equals(
						cast.getUserId())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getGroupId() == null ? 0 : getGroupId().hashCode());
		result = 37 * result
				+ (getUserId() == null ? 0 : getUserId().hashCode());
		return result;
	}

}