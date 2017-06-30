package com.jungle.tms.dao;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.MessageSeq;

public interface IMessageSeqDao extends IDomainObjectDao<MessageSeq> {

	MessageSeq findSeq(Integer groupId, Integer userId);

}
