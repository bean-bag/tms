package com.jungle.tms.web;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.jungle.tms.Responder;
import com.jungle.tms.User;
import com.jungle.tms.utils.StringUtil;

public abstract class AbstractServlet extends HttpServlet {

	public AbstractServlet() {
		methods = new HashMap<String, Method>();
	}

	public void init() throws ServletException {
		super.init();
	}

	public void init(ServletConfig servletConfig) throws ServletException {
		super.init(servletConfig);
	}

	public void destroy() {
		super.destroy();
	}

	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		user = (User) request.getSession().getAttribute("USER_IN_SESSON");
		responder = new Responder(response);
		String method = request.getParameter("method");
		if (StringUtil.isEmpty(method)) {
			outException("\u672A\u8BBE\u7F6Emethod\u53C2\u6570\uFF01");
		} else {
			Method m = getMethod(method);
			if (m == null)
				outException((new StringBuilder("\u672A\u77E5\u7684")).append(method).append("\u53C2\u6570\uFF01").toString());
			else
				try {
					m.invoke(this, new Object[] { request, response });
				} catch (IllegalArgumentException e) {
					log.error("", e);
					outException(e.getMessage());
				} catch (IllegalAccessException e) {
					log.error("", e);
					outException(e.getMessage());
				} catch (InvocationTargetException e) {
					log.error("", e);
					outException(e.getMessage());
				} catch (Throwable e) {
					log.error("", e);
					outException(e.getMessage());
				}
		}
	}

	protected void outException(String msg) throws IOException {
		responder.outMessage(false, msg);
	}

	protected void outMsg(boolean flag, String msg) throws IOException {
		responder.outMessage(flag, msg);
	}

	protected void outData(Object data) throws IOException {
		responder.render2Json(true, null, data);
	}

	protected void outData4polling(Object data) throws IOException {
		responder.addExtra("type", "event");
		responder.addExtra("name", "refresh");
		responder.render2Json(true, null, data);
	}

	protected Method getMethod(final String name) {

		synchronized (methods) {
			if (!methods.containsKey(name)) {
				label0: for (Class<?> clazz = getClass(); clazz != AbstractServlet.class; clazz = clazz.getSuperclass()) {
					Method tempMethods[] = clazz.getDeclaredMethods();
					
					int j = tempMethods.length;
					for (int i = 0; i < j; i++) {
						Method tempMethod = tempMethods[i];
						if (Modifier.PUBLIC == tempMethod.getModifiers() && tempMethod.getName().equals(name)) {
							methods.put(name, tempMethod);
							break label0;
						}
					}
				}
			}
		}
		return (Method) methods.get(name);
	}

	private static final long serialVersionUID = 0xeab857d320b57435L;
	private static final Log log = LogFactory.getLog(AbstractServlet.class);
	protected User user;
	protected Responder responder;
	Map<String, Method> methods;

}