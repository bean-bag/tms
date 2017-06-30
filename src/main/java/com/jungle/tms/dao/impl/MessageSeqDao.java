package com.jungle.tms.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IMessageSeqDao;
import com.jungle.tms.model.MessageSeq;

public class MessageSeqDao extends HibernateDomainObjectDao<MessageSeq> implements
		IMessageSeqDao {

	@Override
	public MessageSeq findSeq(Integer groupId, Integer userId){
		Criteria criteria = getEntityCriteria(entityClass);
		
		criteria.add(Restrictions.eq("groupID", groupId));
		criteria.add(Restrictions.eq("userID", userId));
		
		java.util.List<?> list = criteria.list();
		if(list==null||list.size()==0){
			return null;
		}else{
			return (MessageSeq)list.get(list.size()-1);
		}
	}

}
