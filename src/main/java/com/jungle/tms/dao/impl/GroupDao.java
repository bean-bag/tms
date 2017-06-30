package com.jungle.tms.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IGroupDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Group;

public class GroupDao extends HibernateDomainObjectDao<Group> implements IGroupDao {

	@SuppressWarnings("unchecked")
	private List<Group> extracted(Criteria criteria) {
		return criteria.list();
	}
	
	/**
	 * 查询指定对人对指定项目的指定权限记录
	 * @param prjID
	 * @param memberID
	 * @param sort
	 * @return
	 */
	@Override
	public List<Group> findAll(Integer prjID, Integer memberID,GroupSort sort){
		Criteria criteria = getEntityCriteria(entityClass);
			if(null != prjID)
				criteria.add(Restrictions.eq("prjID", prjID));
			
			if(null != memberID)
				criteria.add(Restrictions.eq("memberID", memberID));
			
			if(null != sort)
				criteria.add(Restrictions.eq("sort", sort));
		return extracted(criteria);			
	}

	

	
}
