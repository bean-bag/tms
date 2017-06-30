package com.jungle.tms.servlet;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.Constants;
import com.jungle.tms.User;
import com.jungle.tms.model.Group;
import com.jungle.tms.model.LineStyle;
import com.jungle.tms.model.Person;
import com.jungle.tms.service.IGroupService;
import com.jungle.tms.service.ILineStyleService;
import com.jungle.tms.service.IPersonService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.utils.ValidCodeUtil;
import com.jungle.tms.web.AbstractServlet;


public class LoginServlet extends AbstractServlet {
	private static final long serialVersionUID = -7777598889444865590L;
	private static String charset = "23456789bcdefhkmrstuwx";


	public void init() throws ServletException {
		super.init();
		ImageIO.setUseCache(false);
	}

	private IPersonService service;
	private ILineStyleService lineStyleService;
	private IGroupService groupService;

	public void setService(IPersonService personService) {
		this.service = personService;
	}

	public void setLineStyleService(ILineStyleService lineStyleService) {
		this.lineStyleService = lineStyleService;
	}

	public void setGroupService(IGroupService groupService) {
		this.groupService = groupService;
	}

	/**
	 * 生成校验码
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void verifyCode(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		StringBuilder sb = ValidCodeUtil.randomChar(charset, 1);
		BufferedImage bi = ValidCodeUtil.buildValidCode(sb, 70, 22);
		//BufferedImage bi = ValidCodeUtil.renderWord(sb.toString(), 70, 22);
		if (bi != null) {
			// Set to expire far in the past.
			response.setDateHeader("Expires", 0);
			// Set standard HTTP/1.1 no-cache headers.
			response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
			// Set IE extended HTTP/1.1 no-cache headers (use addHeader).
			response.addHeader("Cache-Control", "post-check=0, pre-check=0");
			// Set standard HTTP/1.0 no-cache header.
			response.setHeader("Pragma", "no-cache");

			// return a jpeg
			response.setContentType("image/jpeg");

			request.getSession().setAttribute(Constants.LOGIN_VALID_CODE, sb.toString());

			OutputStream os = response.getOutputStream();
			ImageIO.write(bi, "jpeg", os);
			os.flush();
			os.close();
		}
	}
	/**
	 * 登录处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void loginSys(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String vc = request.getParameter("verifyCode");
		if (StringUtil.isEmpty(vc)) {
			outMsg(false, "未输入校验码！");
		} else {
			String vc0 = (String) request.getSession().getAttribute(Constants.LOGIN_VALID_CODE);
			if (vc.equalsIgnoreCase(vc0)) {
				String un = request.getParameter("username");
				String pw = request.getParameter("password");
				
				List<Person> list = this.service.query(un);
				if (list != null && list.size() == 1) {
					Person p = list.get(0);
					if (p.getPassword().equals(pw)) {
						
						User user = new User(p.getId(),p.getUserCode(),p.getUserName(),p.getRole(),p.isTeamLeader());
						user.setDeptID(p.getDepart().getId());
						user.setDeptName(p.getDepart().getDeptName());
						
						List<Group> glist = this.groupService.findByUser(p.getId());
						user.setGroupList(glist);
						
						request.getSession().setAttribute(Constants.USER_IN_SESSON, user);
						List<LineStyle> lslist = this.lineStyleService.findByUser(user.getId());						
						
						this.responder.addExtra("user", user);
						this.responder.render2Json(true, null, lslist);						
					} else {
						outMsg(false, "密码输入有误！");
					}
				} else if (list == null || list.size() == 0) {
					outMsg(false, "不存在的用户名！");
				} else {
					// TODO bjw 同名用户有多个
				}
			} else {
				outMsg(false, "输入校验码不正确！");
			}
		}
		// 清除过期验证码
		request.getSession().removeAttribute(Constants.LOGIN_VALID_CODE);		
	}
	/**
	 * 判断是否已登录
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void isLogon(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		Object obj = request.getSession().getAttribute(Constants.USER_IN_SESSON);
		if(null != obj ){
			user = (User) obj; 
			List<LineStyle> lslist = this.lineStyleService.findByUser(user.getId());						
			
			this.responder.addExtra("user", user);
			this.responder.render2Json(true, null, lslist);						
		}else{
			this.outMsg(false, "未登录");
		}
	}
	/**
	 * 注销处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void logoutSys(HttpServletRequest request, HttpServletResponse response) throws IOException{
		//清除会话标识
		request.getSession().removeAttribute(Constants.USER_IN_SESSON);
		outMsg(true, request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath());
	}

	/**
	 * 登录处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void adminLoginSys(HttpServletRequest request, HttpServletResponse response) throws IOException{
		//Responder res = new Responder(response);
		String vc = request.getParameter("verifyCode");
		if (StringUtil.isEmpty(vc)) {
			outMsg(false, "未输入校验码！");
		} else {
			String vc0 = (String) request.getSession().getAttribute(Constants.LOGIN_VALID_CODE);
			if (vc.equalsIgnoreCase(vc0)) {
				String un = request.getParameter("username");
				String pw = request.getParameter("password");
				
				List<Person> list = this.service.query(un);
				if (list != null && list.size() == 1) {
					Person p = list.get(0);
					if (p.getPassword().equals(pw)) {
						//标记用户已登录
						if(p.getRole().getId() == 9999){
							User user = new User(p.getId(),p.getUserCode(),p.getUserName(),p.getRole(),p.isTeamLeader());
							request.getSession().setAttribute(Constants.USER_IN_SESSON, user);
							this.responder.render2Json(true, "", user);
						}else{							
							outMsg(false, "不是管理人员不能进行后台管理系统");
						}
					} else {
						outMsg(false, "密码输入有误！");
					}
				} else if (list == null || list.size() == 0) {
					outMsg(false, "不存在的用户名！");
				} else {
					// TODO bjw 同名用户有多个
				}
			} else {
				outMsg(false, "输入校验码不正确！");
			}
		}
		// 清除过期验证码
		request.getSession().removeAttribute(Constants.LOGIN_VALID_CODE);	
	}
	/**
	 * 注销处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void adminLogoutSys(HttpServletRequest request, HttpServletResponse response) throws IOException{
		//清除会话标识
		request.getSession().removeAttribute(Constants.USER_IN_SESSON);

		//Responder res = new Responder(response);
		outMsg(true, request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/admin.html");
	}
}
