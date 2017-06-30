package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.ILineStyleDao;
import com.jungle.tms.model.LineStyle;
import com.jungle.tms.service.ILineStyleService;

public class LineStyleService implements ILineStyleService {
	private ILineStyleDao dao;

	public void setDao(ILineStyleDao dao) {
		this.dao = dao;
	}

	/**
	 * 获取所有项目行样式
	 * 
	 * @param userID
	 * @return
	 */
	@Override
	public List<LineStyle> findByUser(Integer userID) {
		return this.dao.findBy("userID", userID);
	}

	/**
	 * 查找指项目行定样式
	 * 
	 * @param prjID
	 * @param userID
	 * @return
	 */
	@Override
	public LineStyle getLineStyle(Integer prjID, Integer userID) {
		List<LineStyle> list = this.dao.query(prjID, userID);

		if (list.size() == 0 || list.get(0) == null) {
			return new LineStyle(prjID,userID);
		}

		return list.get(0);
	}

	/**
	 * 保存项目行样式
	 * 
	 * @param o
	 */
	@Override
	public void saveLineStyle(LineStyle o) {
		this.dao.doSave(o);
	}

	/**
	 * 删除项目行样式
	 * 
	 * @param o
	 */
	@Override
	public void deleteLineStyle(LineStyle o) {
		this.dao.doDelete(o);
	}

}
