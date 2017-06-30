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
	 * ��ѯ��Ŀ���������б�
	 * @param prjID
	 * @return
	 */
	List<Department> queryMinorDepart(Integer prjID);

}
