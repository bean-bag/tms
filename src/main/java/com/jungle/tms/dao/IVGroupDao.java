package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.VGroup;

public interface IVGroupDao extends IDomainObjectDao<VGroup> {

	List<VGroup> findAll(Integer prjID);

	List<VGroup> findAll(Integer prjID, GroupSort sort);

	List<VGroup> findAll(Integer prjID, Integer memberID, GroupSort sort);

}
