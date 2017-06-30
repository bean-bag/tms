package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.Department;

public interface IDepartmentDao extends IDomainObjectDao<Department>{
	List<Department> queryAll();

	List<Department> queryMinorDepart(Integer prjID);
}
