package com.jungle.tms.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.model.Department;
import com.jungle.tms.service.IDepartmentService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class DeptServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041504L;

	private IDepartmentService service;

	public void setService(IDepartmentService depService) {
		this.service = depService;
	}
	/**
	 * 输出部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void departList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer pid = StringUtil.str2Int(request.getParameter("pid"));
		if(pid !=null)
			outData(this.service.findByParent(pid));
		else 
			outData(this.service.queryAll());
	}
	/**
	 * 主要部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void majorDepartList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		List<Department> list = this.service.queryMinorDepart(null);
		outData(list);
	}
	/**
	 * 辅助部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void minorDepartList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
		if(prjID !=null){
			List<Department> list = this.service.queryMinorDepart(prjID);
			outData(list);
		}else {
			outData(java.util.Collections.EMPTY_LIST);
		}
	}
	
	public void deptSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		if(user.isAdmin()){
			Department dept = new Department();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				dept.setId(id);
			}
			String pn = request.getParameter("deptName");
			if (pn != null) {
				dept.setDeptName(pn);
			}
			String pf = request.getParameter("profile");
			if (pf != null) {
				dept.setProfile(pf);
			}
			Integer pid = StringUtil.str2Int(request.getParameter("pid"));
			if (pid == null) {
				dept.setPid(0);
			}else{
				dept.setPid(pid);
			}
			this.service.save(dept);
			outMsg(true, null);
		}else{
			outMsg(false, "只有系统管理员可以维护部门信息");
		}
	}
	
	/**
	 * 删除处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void deptDelete(HttpServletRequest request,
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
			outMsg(false, "只有系统管理员可以维护部门信息");
		}
	}
	
}
