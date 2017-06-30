package com.jungle.tms.web;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class DelegatingServletrProxy extends GenericServletBean {

	public DelegatingServletrProxy() {
		targetServletLifecycle = false;
	}

	public void setContextAttribute(String contextAttribute) {
		this.contextAttribute = contextAttribute;
	}

	public String getContextAttribute() {
		return contextAttribute;
	}

	public void setTargetBeanName(String targetBeanName) {
		this.targetBeanName = targetBeanName;
	}

	protected String getTargetBeanName() {
		return targetBeanName;
	}

	public void setTargetServletLifecycle(boolean targetServletLifecycle) {
		this.targetServletLifecycle = targetServletLifecycle;
	}

	protected boolean isTargetServletLifecycle() {
		return targetServletLifecycle;
	}

	protected void initServletBean() throws ServletException {
		if (targetBeanName == null)
			targetBeanName = ServletConfig.getServletName();
		synchronized (delegateMonitor) {
			WebApplicationContext wac = findWebApplicationContext();
			if (wac != null)
				_flddelegate = initDelegate(wac);
		}
	}

	public void service(ServletRequest request, ServletResponse response) throws ServletException, IOException {
		Servlet delegateToUse = null;
		synchronized (delegateMonitor) {
			if (_flddelegate == null) {
				WebApplicationContext wac = findWebApplicationContext();
				if (wac == null)
					throw new IllegalStateException("No WebApplicationContext found: no ContextLoaderListener registered?");
				_flddelegate = initDelegate(wac);
			}
			delegateToUse = _flddelegate;
		}
		invokeDelegate(delegateToUse, request, response);
	}

	public void destroy() {
		Servlet delegateToUse = null;
		synchronized (delegateMonitor) {
			delegateToUse = _flddelegate;
		}
		if (delegateToUse != null)
			destroyDelegate(delegateToUse);
	}

	protected WebApplicationContext findWebApplicationContext() {
		String attrName = getContextAttribute();
		if (attrName != null)
			return WebApplicationContextUtils.getWebApplicationContext(ServletConfig.getServletContext(), attrName);
		else
			return WebApplicationContextUtils.getWebApplicationContext(ServletConfig.getServletContext());
	}

	protected Servlet initDelegate(WebApplicationContext wac) throws ServletException {
		Servlet delegate = (Servlet) wac.getBean(getTargetBeanName(), Servlet.class);
		if (isTargetServletLifecycle())
			delegate.init(getServletConfig());
		return delegate;
	}

	protected void invokeDelegate(Servlet delegate, ServletRequest request, ServletResponse response) throws ServletException, IOException {
		delegate.service(request, response);
	}

	protected void destroyDelegate(Servlet delegate) {
		if (isTargetServletLifecycle())
			delegate.destroy();
	}

	private static final long serialVersionUID = 0x3cbcbc0e14cd9f97L;
	private String contextAttribute;
	private String targetBeanName;
	private boolean targetServletLifecycle;
	private Servlet _flddelegate;
	private final Object delegateMonitor = new Object();
}