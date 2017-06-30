package com.jungle.tms.dao.impl;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;

import com.jungle.framework.core.dao.hibernate3.HibernateDomainObjectDao;
import com.jungle.tms.dao.IProjectDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Group;
import com.jungle.tms.model.Project;
import com.jungle.tms.service.IProjectService.ProjectPage;
import com.jungle.tms.servlet.ProjectServlet.QueryParam;


public class ProjectDao extends HibernateDomainObjectDao<Project> implements IProjectDao{

	@SuppressWarnings("unchecked")
	private List<Project> extracted(Criteria criteria) {
		return criteria.list();
	}
	/**
	 * ��ѯ����δɾ����δ���������
	 */
	@Override
	public List<Project> queryValid(Integer stage){
		Criteria c = getEntityCriteria(entityClass);
		c.add(Restrictions.eq("delFlag", Boolean.FALSE));
		if(null != stage){
			c.add(Restrictions.eq("prjStage", stage));
		}
		return extracted(c);		
	}

	@Override
	public void deleteById(Integer id) {		
		Project p = this.findById(id);
		p.setDelFlag(true);		
		this.getHibernateTemplate().saveOrUpdate(p);
	}

	@Override
	public ProjectPage findAll(QueryParam params){
		Criteria c = this.buildCriteria(params); 

		c.setProjection(Projections.rowCount());

		int total = (Integer) c.uniqueResult();// ���÷��������ļ�¼��
		if (total < 1) {
			return new ProjectPage(0,0,Collections.<Project>emptyList());			
		} else {
			c.setProjection(null);   
            c.setResultTransformer(Criteria.ROOT_ENTITY);
			// ��ѯָ����ҳ���ļ�¼
            if(total > params.getStart()){
            	c.setFirstResult(params.getStart());
            }else{
            	//�ӵ�һҳ��ʼ
            	c.setFirstResult(0);
            }
            int start = Math.min(total, params.getLimit());
            c.setMaxResults(start);	
			// ���µ���������
			c.addOrder(Order.desc("orderDate"));
			return new ProjectPage(total,start,this.extracted(c));
		}
	}
	
	/*private Integer findAllCount(QueryParam params){
		Criteria c = this.buildCriteria(params);
		
		c.setProjection(Projections.rowCount());
		return (Integer) c.uniqueResult();

	}*/

	/**
	 * ����Criteria
	 * @param qp
	 * @return
	 */
	private Criteria buildCriteria(QueryParam qp){
		Criteria c = this.getEntityCriteria(entityClass);
		//0.δɾ������Ŀ
		c.add(Restrictions.eq("delFlag", Boolean.FALSE));
		
		//1.��Ŀ����
		if(qp.getPrjType() != null){
			c.add(Restrictions.eq("prjType", qp.getPrjType()));
		}
		
		//2.����Ŀ��Ų�ѯ
		if(qp.getPrjNumber() != null){
			c.add(Restrictions.like("prjNumber", "%" + qp.getPrjNumber() + "%"));
		}
		
		//2.����Ŀ���Ʋ�ѯ
		if(qp.getPrjName() != null){
			c.add(Restrictions.like("prjName", "%" + qp.getPrjName() + "%"));
		}
		
		//3.�ų��ѹ�������
		if(qp.getOverdue() !=null){
			c.add(Restrictions.or(Restrictions.ge("endDate", qp.getOverdue()), Restrictions.isNull("endDate")));
		}
		
		//4-5.����ʱ�����
		Date startDate = qp.getStartDate();
		Date endDate = qp.getEndDate();
		if(startDate==null){
			if(endDate!=null){
				c.add(Restrictions.le("startDate", endDate));//3.1����ʼ����<=�˽�ֹ����
			}
		}else{
			if(endDate == null){
				c.add(Restrictions.or(
						Restrictions.isNull("endDate"),//�����������Ϊnull
						Restrictions.ge("endDate", startDate)));//3.2���������ʼ����>=��ѯ��ʼ����
			}else{
				c.add(
					Restrictions.or(
						Restrictions.or(
							Restrictions.and(Restrictions.isNull("endDate"), Restrictions.le("startDate", endDate)),//a.�����ֹ����Ϊnull,����ʼ����<=��ѯ��ֹ����
							Restrictions.and(Restrictions.ge("startDate", startDate), Restrictions.le("startDate", endDate))//b.��ѯ��ʼ����<=����ʼ����<=��ѯ��ֹ����
							),
						Restrictions.and(Restrictions.ge("endDate", startDate), Restrictions.le("endDate", endDate))//b.��ѯ��ʼ����<=�����ֹ����<=��ѯ��ֹ����
					)
				);				
			}
		}
		
		//6-7.��ɫ��ݹ�������
		Integer userID = qp.getUserID();
		Integer departID = qp.getDepartID();
		if(userID != null){
			//��ȡ������ݵ�����
			LogicalExpression userExp = Restrictions.and(
					Restrictions.eq("memberID", userID),
					Restrictions.and(
							Restrictions.ne("sort", GroupSort.MAJORDEPART),
							Restrictions.ne("sort", GroupSort.MINORDEPART)
							)
					);
			DetachedCriteria g = DetachedCriteria.forClass(Group.class,"group");

			if(departID != null){//��ȡ��������ݵ�����
				LogicalExpression departExp = Restrictions.and(
						Restrictions.eq("memberID", departID),
						Restrictions.or(
								Restrictions.eq("sort", GroupSort.MAJORDEPART),//��Ҫ������
								Restrictions.eq("sort", GroupSort.MINORDEPART)//��Ҫ������
								)								
						); 				
				g.add(Restrictions.or(userExp,departExp));
			}else{
				g.add(userExp);
			}
			g.setProjection(Projections.projectionList().add(Property.forName("prjID")));
			
			c.add(Property.forName("id").in(g));
			
		}
		
		if(qp.getPerson()==null){
			//8-9.�����š�������Ա����
			Integer mDepartID = qp.getMajorDept();
			Integer cPersonID = qp.getChiefPerson();
			Integer mBudgeteer = qp.getMajorBudgeteer();
			if(mDepartID!=null || cPersonID != null || mBudgeteer != null){
				DetachedCriteria g = DetachedCriteria.forClass(Group.class,"group");
				
				if(mDepartID != null){
					g.add(Restrictions.eq("memberID", mDepartID)).add(Restrictions.eq("sort", GroupSort.MAJORDEPART));				
				}
				if(cPersonID != null){
					g.add(Restrictions.eq("memberID", cPersonID)).add(Restrictions.eq("sort", GroupSort.OFFICER));				
				}
				if(mBudgeteer != null){
					g.add(Restrictions.eq("memberID", mBudgeteer)).add(Restrictions.eq("sort", GroupSort.MAJORBUDGETEER));				
				}
				g.setProjection(Projections.projectionList().add(Property.forName("prjID")));			
				c.add(Property.forName("id").in(g));			
			}
		}else{
			//����Ա��ѯ�������Ŀ
			DetachedCriteria g = DetachedCriteria.forClass(Group.class,"group");
			
			g.add(Restrictions.eq("memberID", qp.getPerson())).add(Restrictions.and(Restrictions.ne("sort", GroupSort.MAJORDEPART), Restrictions.ne("sort", GroupSort.MINORDEPART)));		
			
			g.setProjection(Projections.projectionList().add(Property.forName("prjID")));	
			c.add(Property.forName("id").in(g));		
		}

		//10.���տ���
		if(qp.getCollection() != null){
			c.add(Restrictions.eq("collection", qp.getCollection()));
		}
		
		//11.����ɱ��
		if(qp.getCompleted() != null){
			c.add(Restrictions.eq("complete", qp.getCompleted()));
		}
		
		//12.Ԥ����
		if(qp.getBudgetFlag() !=null){
			c.add(Restrictions.eq("budgetFlag", qp.getBudgetFlag()));
		}
		
		return c;
	}
}
