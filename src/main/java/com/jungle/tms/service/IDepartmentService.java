package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.Department;

public interface IDepartmentService {

	List<Department> queryAll();
	
	List<Department> findByParent(Integer deptId);
	
	void save(Department d);
	
	void delete(Integer id);
	
	void delete(Department id);

	/**
	 * 查询项目辅助部门列表
	 * @param prjID
	 * @return
	 */
	List<Department> queryMinorDepart(Integer prjID);

}
