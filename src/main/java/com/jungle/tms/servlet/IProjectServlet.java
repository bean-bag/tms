package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IProjectServlet {
	/**
	 * 获取项目列表
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void projectList(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * 合同助理创建委托
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void create4helper(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * 合同助理修改委托
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4helper(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * 计划人员创建委托
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void create4planner(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * 计划人员修改委托
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4planner(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * 室主任分派任务
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4officer(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * 负责人重新委派任务
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4leader(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
