package com.jungle.tms.dao;

import java.util.List;

import com.jungle.framework.core.dao.IDomainObjectDao;
import com.jungle.tms.model.LineStyle;

public interface ILineStyleDao extends IDomainObjectDao<LineStyle>{

	List<LineStyle> query(Integer prjID, Integer userID);	
}
