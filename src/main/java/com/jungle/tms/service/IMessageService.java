package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Message;
import com.jungle.tms.model.MessageSeq;

public interface IMessageService {
	void save(Message d);

	/**
	 * ��ȡ��ǰ�������������Ϣ
	 * @param groupID
	 * @return
	 */
	List<Message> findHis(Integer groupID,java.util.Date date,Integer start,Integer limit);
	int findHisCount(Integer groupID,java.util.Date date);
	/**
	 * ��ȡָ���û���ָ���������е�������Ϣ,
	 * ���seqֵΪδ���壬��seq���л�ȡ���ֵ��Ϊseq
	 * @param groupID
	 * @param userID
	 * @param seq
	 * @return
	 */
	List<Message> find(Integer groupID,int seq);

	/**
	 * ��ѯ����Ϣ����
	 * @param groupID
	 * @param userID
	 * @param seq
	 * @return
	 */
	int pollingMessage(Integer groupID, Integer userID, int seq);

	MessageSeq getSeq(Integer groupID, Integer userID);

	void stamp(Integer groupID, Integer userID, int maxReadNO);
}
