package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.model.Imgtype;
import com.jungle.tms.service.IImgtypeService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class ImgtypeServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041507L;

	private IImgtypeService service;

	public void setService(IImgtypeService depService) {
		this.service = depService;
	}
	/**
	 * 输出部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void imgtypeList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		outData(this.service.findAll());
	}
	
	public void imgtypeSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		if(user.isAdmin()){
			Imgtype dept = new Imgtype();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				dept.setId(id);
			}
			String pn = request.getParameter("imgtypeName");
			if (pn != null) {
				dept.setImgtypeName(pn);
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
	public void imgtypeDelete(HttpServletRequest request,
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
