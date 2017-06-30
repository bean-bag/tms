package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.Role;

public interface IRoleDao extends IDomainObjectDao<Role>{
	List<Role> queryAll();
}
