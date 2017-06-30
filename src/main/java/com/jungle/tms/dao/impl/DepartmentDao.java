package com.jungle.tms.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IDepartmentDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Department;
import com.jungle.tms.model.Group;

public class DepartmentDao extends HibernateDomainObjectDao<Department> implements
		IDepartmentDao {

	@SuppressWarnings("unchecked")
	private List<Department> extracted(Criteria c) {
		return c.list();
	}

	@Override
	public List<Department> queryAll() {
		Criteria c = this.getEntityCriteria();
		c.add(Restrictions.ne("id", 9999));
		c.add(Restrictions.ne("id", 2));
		c.add(Restrictions.ne("id", 3));
		return extracted(c);
	}

	@Override
	public List<Department> queryMinorDepart(Integer prjID) {
		Criteria c = this.getEntityCriteria();
		c.add(Restrictions.eq("helper", 1));//可接受辅助任务的部门
		if(prjID!=null){
			DetachedCriteria g = DetachedCriteria.forClass(Group.class,"group");
			g.add(Restrictions.eq("prjID", prjID));	
			g.add(Restrictions.or(Restrictions.eq("sort", GroupSort.MAJORDEPART),Restrictions.eq("sort", GroupSort.MINORDEPART)));
			g.setProjection(Projections.projectionList().add(Property.forName("memberID")));
			
			c.add(Property.forName("id").notIn(g));
		}
		return extracted(c);
	}
}
