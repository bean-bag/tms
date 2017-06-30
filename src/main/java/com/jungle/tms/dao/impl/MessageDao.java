package com.jungle.tms.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IMessageDao;
import com.jungle.tms.model.Message;

public class MessageDao extends HibernateDomainObjectDao<Message> implements
		IMessageDao {
	@Override
	public List<Message> find(Integer groupID, Integer id) {
		Criteria criteria = getEntityCriteria(entityClass);

		criteria.add(Restrictions.eq("groupID", groupID));
		criteria.add(Restrictions.gt("id", id));
		return extracted(criteria);
	}

	@SuppressWarnings("unchecked")
	private List<Message> extracted(Criteria c) {
		return c.list();
	}

	@Override
	public int findHisCount(Integer groupID, Date date) {
		Criteria criteria = getEntityCriteria(entityClass);

		criteria.add(Restrictions.eq("groupID", groupID));
		if (date != null)
			criteria.add(Restrictions.gt("date", date));
		criteria.setProjection(Projections.rowCount());
		return (Integer) criteria.uniqueResult();
	}

	@Override
	public List<Message> findHis(Integer groupID, Date date, Integer start, Integer limit) {
		Criteria criteria = getEntityCriteria(entityClass);

		criteria.add(Restrictions.eq("groupID", groupID));
		if (date != null)
			criteria.add(Restrictions.gt("date", date));
		
		criteria.setFirstResult(start);
		criteria.setMaxResults(limit);
		return extracted(criteria);
	}

}
