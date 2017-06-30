package com.jungle.tms.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IVGroupDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.VGroup;

public class VGroupDao extends HibernateDomainObjectDao<VGroup> implements
		IVGroupDao {
	@SuppressWarnings("unchecked")
	private List<VGroup> extracted(Criteria criteria) {
		return criteria.list();
	}

	@Override
	public List<VGroup> findAll(Integer prjID) {
		Criteria criteria = getEntityCriteria(entityClass);
		criteria.add(Restrictions.eq("id.prjID", prjID));
		criteria.addOrder(Order.asc("id.sort"));
		return extracted(criteria);
	}

	@Override
	public List<VGroup> findAll(Integer prjID, GroupSort sort) {
		Criteria criteria = getEntityCriteria(entityClass);
		criteria.add(Restrictions.eq("id.prjID", prjID));
		criteria.add(Restrictions.eq("id.sort", sort));
		criteria.addOrder(Order.asc("id.sort"));
		return extracted(criteria);
	}

	@Override
	public List<VGroup> findAll(Integer prjID, Integer memberID, GroupSort sort) {
		Criteria criteria = getEntityCriteria(entityClass);
		criteria.add(Restrictions.eq("id.id", memberID));
		criteria.add(Restrictions.eq("id.prjID", prjID));
		criteria.add(Restrictions.eq("id.sort", sort));
		criteria.addOrder(Order.asc("id.sort"));
		return extracted(criteria);
	}
}
