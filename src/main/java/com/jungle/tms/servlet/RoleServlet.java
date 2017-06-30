package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.model.Role;
import com.jungle.tms.service.IRoleService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class RoleServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041504L;

	private IRoleService service;

	public void setService(IRoleService roleService) {
		this.service = roleService;
	}

	/**
	 * 输出岗位角色列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void roleList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		outData(this.service.queryAll());		
	}
	
	public void roleSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		if(user.isAdmin()){
			Role dept = new Role();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				dept.setId(id);
			}
			String pn = request.getParameter("roleName");
			if (pn != null) {
				dept.setRoleName(pn);
			}
			String pf = request.getParameter("profile");
			if (pf != null) {
				dept.setProfile(pf);
			}
			this.service.save(dept);
			outMsg(true, null);
		}else{
			outMsg(false, "只有系统管理员可以维护岗位角色信息");
		}
	}
	
	/**
	 * 删除处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	/*public void deptDelete(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Responder res = responder;
		User user =(User)request.getSession().getAttribute(Constants.USER_IN_SESSON);
		if(user.isAdmin()){
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				this.roleService.delete(id);
				out(true, null);
			}else{
				out(false, "未知参数");
			}			
		}else{
			out(false, "只有系统管理员可以维护岗位角色信息");
		}
	}*/
	
}
