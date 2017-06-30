package com.jungle.tms.dao.impl;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IPrjInfoDao;
import com.jungle.tms.model.PrjInfo;

public class PrjInfoDao extends HibernateDomainObjectDao<PrjInfo> implements IPrjInfoDao {

	//@Override
//	public List<PrjInfo> queryAll() {
//		Criteria c = this.getEntityCriteria();
//		c.add(Restrictions.ne("id", 0));
//		return extracted(c);
//	}
//
//	@SuppressWarnings("unchecked")
//	private List<PrjInfo> extracted(Criteria c) {
//		return c.list();
//	}

}
