package com.jungle.tms.dao;

import java.util.Date;
import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.Message;

public interface IMessageDao extends IDomainObjectDao<Message> {

	List<Message> find(Integer groupID, Integer id);

	int findHisCount(Integer groupID, Date date);
	
	List<Message> findHis(Integer groupID,java.util.Date date,Integer start,Integer limit);

}
