package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Group;

public interface IGroupService {

	List<Group> findAll(Integer prjID,GroupSort sort);
	
	List<Group> findByUser(Integer userID);

	List<Group> findAllByPrj(Integer prjID);
	
	boolean isGroupSort(Integer prjID, Integer deptID,GroupSort sort);

	void saveSingle(Integer prjID, GroupSort sort, Integer memberID);

	void saveWithClear(Integer prjID, GroupSort sort, List<Integer> memberID);

	boolean canCheck(Integer prjID, Integer memberID, GroupSort sort);	 
}
