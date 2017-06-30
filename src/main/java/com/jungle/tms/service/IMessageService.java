package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Message;
import com.jungle.tms.model.MessageSeq;

public interface IMessageService {
	void save(Message d);

	/**
	 * 获取当前工作组的所有消息
	 * @param groupID
	 * @return
	 */
	List<Message> findHis(Integer groupID,java.util.Date date,Integer start,Integer limit);
	int findHisCount(Integer groupID,java.util.Date date);
	/**
	 * 获取指定用户在指定工作组中的最新消息,
	 * 如果seq值为未定义，从seq库中获取最大值作为seq
	 * @param groupID
	 * @param userID
	 * @param seq
	 * @return
	 */
	List<Message> find(Integer groupID,int seq);

	/**
	 * 轮询新消息条数
	 * @param groupID
	 * @param userID
	 * @param seq
	 * @return
	 */
	int pollingMessage(Integer groupID, Integer userID, int seq);

	MessageSeq getSeq(Integer groupID, Integer userID);

	void stamp(Integer groupID, Integer userID, int maxReadNO);
}
