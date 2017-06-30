package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.model.Imgsize;
import com.jungle.tms.service.IImgsizeService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class ImgsizeServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041506L;

	private IImgsizeService service;

	public void setService(IImgsizeService depService) {
		this.service = depService;
	}
	/**
	 * 输出部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void imgsizeList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		outData(this.service.findAll());
	}
	
	public void imgsizeSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		if(user.isAdmin()){
			Imgsize dept = new Imgsize();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				dept.setId(id);
			}
			String pn = request.getParameter("imgsizeName");
			if (pn != null) {
				dept.setImgsizeName(pn);
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
	public void imgsizeDelete(HttpServletRequest request,
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
