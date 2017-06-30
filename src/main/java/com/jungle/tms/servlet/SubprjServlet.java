package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.model.Subprj;
import com.jungle.tms.service.ISubprjService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class SubprjServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041505L;

	private ISubprjService service;

	public void setService(ISubprjService depService) {
		this.service = depService;
	}
	/**
	 * 输出部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void subprjList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		outData(this.service.findAll());
	}
	
	public void subprjSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		if(user.isAdmin()){
			Subprj dept = new Subprj();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				dept.setId(id);
			}
			String pn = request.getParameter("subprjName");
			if (pn != null) {
				dept.setSubprjName(pn);
			}
			String pf = request.getParameter("profile");
			if (pf != null) {
				dept.setProfile(pf);
			}
			this.service.save(dept);
			outMsg(true, null);
		}else{
			outMsg(false, "只有系统管理员可以维护子项目信息");
		}
	}
	
	/**
	 * 删除处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void subprjDelete(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if(user.isAdmin()){
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				this.service.delete(id);
				outMsg(true, null);
			}else{
				outMsg(false, "未知参数");
			}			
		}else{
			outMsg(false, "只有系统管理员可以维护子项目信息");
		}
	}
	
	
}
