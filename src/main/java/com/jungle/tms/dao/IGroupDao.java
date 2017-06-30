package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Group;

public interface IGroupDao extends IDomainObjectDao<Group>{
	List<Group> findAll(Integer prjID, Integer memberID, GroupSort sort);
}
