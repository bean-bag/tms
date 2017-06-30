package com.jungle.tms.service;

import java.util.List;

import com.jungle.tms.model.LineStyle;

public interface ILineStyleService {
	void saveLineStyle(LineStyle o);
	void deleteLineStyle(LineStyle o);
	List<LineStyle> findByUser(Integer userID);
	LineStyle getLineStyle(Integer prjID, Integer userID);
}
