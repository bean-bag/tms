package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.Project;
import com.jungle.tms.service.IProjectService.ProjectPage;
import com.jungle.tms.servlet.ProjectServlet.QueryParam;


public interface IProjectDao extends IDomainObjectDao<Project>{

	void deleteById(Integer id);
	
	List<Project> queryValid(Integer stage);
	
	ProjectPage findAll(QueryParam params);
}
