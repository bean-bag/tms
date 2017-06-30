package com.jungle.tms.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IPersonDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Group;
import com.jungle.tms.model.Person;


public class PersonDao extends HibernateDomainObjectDao<Person> implements IPersonDao{

	@SuppressWarnings("unchecked")
	private List<Person> extracted(Criteria criteria) {
		return criteria.list();
	}
	
	public List<Person> findByCode(String code) {
		return this.findBy("userCode", code);
	}

	

	@Override
	public List<Person> findByDept(Integer deptID) {
		return this.findBy("depart.id", deptID);
	}

	@Override
	public List<Person> queryAll() {
		Criteria criteria = getEntityCriteria(entityClass);
		criteria.add(Restrictions.ne("id", 0));
		return extracted(criteria);		
	}

	@Override
	public List<Person> findOfficers() {
		Criteria criteria = getEntityCriteria(entityClass);
		criteria.add(
				Restrictions.and(
						Restrictions.eq("teamLeader", Boolean.TRUE),
						Restrictions.in("depart.id", new Integer[]{31,32,33,34,35})
						)
					);
		
		return extracted(criteria);
	}

	@Override
	public List<Person> findByPerson(Integer userID) {
		Person p = this.findById(userID);
		Integer deptID = null;
		if(p!=null){
			deptID = p.getDepart().getId();
		}
		return this.findByDept(deptID);		
	}

	@Override
	public List<Person> findByPrj(Integer prjID) {
		Criteria criteria = getEntityCriteria(entityClass);
		DetachedCriteria g = DetachedCriteria.forClass(Group.class, "group");
		g.add(Restrictions.eq("prjID", prjID))
		 .add(Restrictions.ne("sort", GroupSort.MAJORDEPART))
		 .add(Restrictions.ne("sort", GroupSort.MINORDEPART));
		g.setProjection(Projections.projectionList().add(Property.forName("memberID")));
		criteria.add(Property.forName("id").in(g));
		criteria.addOrder(Order.asc("depart.id"));
		return extracted(criteria);
	}
}
