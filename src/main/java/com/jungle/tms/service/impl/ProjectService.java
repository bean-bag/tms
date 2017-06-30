package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IProjectDao;
import com.jungle.tms.model.Project;
import com.jungle.tms.service.IProjectService;
import com.jungle.tms.servlet.ProjectServlet.QueryParam;

public class ProjectService implements IProjectService {
	
	private IProjectDao dao;

	public void setDao(IProjectDao dao) {
		this.dao = dao;		
	}

	public void delete(Integer id) {
		this.dao.deleteById(id);		
	}

	public void delete(Project p) {
		this.dao.deleteById(p.getId());
	}
	
	public List<Project> findAll() {
		return dao.queryValid(null);
	}
	
	@Override
	public Project getProject(Integer id){
		if(id == null){
			return new Project();
		}
		return dao.findById(id);
	}
	@Override
	public void save(Project p) {
		this.dao.doSave(p);
	}
	
	@Override
	public ProjectPage findAll(QueryParam params) {
		return dao.findAll(params);
	}
}
