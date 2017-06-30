package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.VGroup;

public interface IVGroupService {

	List<VGroup> findAll(Integer prjID);

	List<VGroup> findAll(Integer prjID, GroupSort sort);

	List<VGroup> findAll(Integer prjID, Integer memberID, GroupSort sort);

	boolean isGroupSort(Integer prjID, Integer deptID, GroupSort sort);

}
