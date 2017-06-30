package com.jungle.tms.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IRoleDao;
import com.jungle.tms.model.Role;

public class RoleDao extends HibernateDomainObjectDao<Role> implements IRoleDao {

	@Override
	public List<Role> queryAll() {
		Criteria c = this.getEntityCriteria();
		c.add(Restrictions.ne("id", 0));
		return extracted(c);
	}

	@SuppressWarnings("unchecked")
	private List<Role> extracted(Criteria c) {
		return c.list();
	}

}
