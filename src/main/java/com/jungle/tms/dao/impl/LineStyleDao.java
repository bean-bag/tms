package com.jungle.tms.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.ILineStyleDao;
import com.jungle.tms.model.LineStyle;

public class LineStyleDao extends HibernateDomainObjectDao<LineStyle> implements ILineStyleDao {
	
	@Override
	public List<LineStyle> query(Integer prjID,Integer userID) {
		Criteria c = this.getEntityCriteria();
		c.add(Restrictions.eq("prjID", prjID));
		c.add(Restrictions.eq("userID", userID));
		return extracted(c);
	}

	@SuppressWarnings("unchecked")
	private List<LineStyle> extracted(Criteria c) {
		return c.list();
	}

}
