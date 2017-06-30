package com.jungle.tms;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jungle.tms.utils.StringUtil;

public class SecureFilter implements Filter {
	private String errorPage;
	private List<String> freeMethods = new ArrayList<String>();

	public void destroy() {
		this.errorPage = null;
		this.freeMethods = null;
	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) arg0;

		String method = req.getParameter("method");

		if (this.freeMethods.contains(method)
				|| null != req.getSession().getAttribute(
						Constants.USER_IN_SESSON)) {
			// 有豁免权的方法，或者已登录，直接通过
			arg2.doFilter(arg0, arg1);
		} else {
			HttpServletResponse res = (HttpServletResponse) arg1;
			Responder res0 = new Responder(res);
			if (null == this.errorPage){				
				res0.render2Json(false, "302", req.getScheme()+"://"+req.getServerName()+":"+req.getServerPort()+req.getContextPath());
			}else
				res0.render2Json(false, "302", req.getScheme()+"://"+req.getServerName()+":"+req.getServerPort()+req.getContextPath() + this.errorPage);
		}
	}

	public void init(FilterConfig arg0) throws ServletException {
		this.errorPage = arg0.getInitParameter("error_page");
		String ms = arg0.getInitParameter("free_method");
		if (!StringUtil.isEmpty(ms)) {
			this.freeMethods = Arrays.asList(ms.split(","));
		}
	}
}
