package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Project;
import com.jungle.tms.servlet.ProjectServlet.QueryParam;

public interface IProjectService {

	void save(Project p);

	void delete(Integer id);
	void delete(Project id);

	Project getProject(Integer id);

	
	ProjectPage findAll(QueryParam params);

	class ProjectPage{
		private int total;
		private int start;
		private List<Project> list;
		
		public ProjectPage(int total, int start, List<Project> list) {
			this.total = total;
			this.start = start;
			this.list = list;
		}

		public int getTotal() {
			return total;
		}
		public int getStart() {
			return start;
		}

		public List<Project> getList() {
			return list;
		}
	}
}
