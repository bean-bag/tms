package com.jungle.tms.service.impl;

import java.util.Date;
import java.util.List;

import com.jungle.tms.dao.IMessageDao;
import com.jungle.tms.dao.IMessageSeqDao;
import com.jungle.tms.model.Message;
import com.jungle.tms.model.MessageSeq;
import com.jungle.tms.model.MessageSeqPK;
import com.jungle.tms.service.IMessageService;

public class MessageService implements IMessageService {

	private IMessageDao dao;
	private IMessageSeqDao seqDao;

	public void setDao(IMessageDao dao) {
		this.dao = dao;
	}

	public void setSeqDao(IMessageSeqDao seqDao) {
		this.seqDao = seqDao;
	}

	@Override
	public void save(Message d) {
		dao.doSave(d);
	}

	@Override
	public int findHisCount(Integer groupID, Date date) {
		return dao.findHisCount(groupID, date);
	}
	@Override
	public List<Message> findHis(Integer groupID,java.util.Date date,Integer start,Integer limit) {
		return dao.findHis(groupID, date, start, limit);
	}

	@Override
	public List<Message> find(Integer groupID, int maxReadNO) {
		return dao.find(groupID, maxReadNO);
	}

	@Override
	public MessageSeq getSeq(Integer groupID, Integer userID){
		return seqDao.findById(new MessageSeqPK(groupID,userID));
	}
	/**
	 * 
	 * 保存已显示消息中记录最大顺序号及激活在线用户标记
	 */
	@Override
	public void stamp(Integer groupID, Integer userID, int maxReadNO){
		MessageSeq ms = new MessageSeq(groupID, userID, maxReadNO);
		ms.setStamp(new java.util.Date());
		seqDao.doSave(ms);		
	}
	@Override
	public int pollingMessage(Integer groupID, Integer userID, int maxReadNO){
		int res = 0;
		MessageSeq ms = seqDao.findById(new MessageSeqPK(groupID, userID));
		if(ms!=null&&maxReadNO>-1){
			res = ms.getMaxNO() - maxReadNO;
		}
		return res;
	}

}
