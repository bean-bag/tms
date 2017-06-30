package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.model.LineStyle;
import com.jungle.tms.service.ILineStyleService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class LineStyleServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041504L;

	private ILineStyleService service;

	public void setService(ILineStyleService roleService) {
		this.service = roleService;
	}

	/**
	 * 维护项目行样式
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void update(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String[] prjIDs = request.getParameterValues("prjID");
		if (prjIDs.length == 0) {
			outMsg(false, "缺少工程标识");
		} else {
			String style = request.getParameter("style");
			if (style.trim().length() == 0) {
				for(String prjID : prjIDs){
					Integer id = StringUtil.str2Int(prjID);
					if(id == null){
						continue;
					}
					LineStyle ls = this.service.getLineStyle(id, user.getId());
					this.service.deleteLineStyle(ls);
				}
				outMsg(true, "delete");
			} else {
				for(String prjID : prjIDs){
					Integer id = StringUtil.str2Int(prjID);
					if(id == null){
						continue;
					}
					LineStyle ls = this.service.getLineStyle(id, user.getId());
					ls.setLineStyle(style);
					this.service.saveLineStyle(ls);
				}
				outMsg(true, "update");
			}
		}
	}

}
