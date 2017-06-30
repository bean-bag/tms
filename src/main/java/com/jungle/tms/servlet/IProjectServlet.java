package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IProjectServlet {
	/**
	 * ��ȡ��Ŀ�б�
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void projectList(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * ��ͬ������ί��
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void create4helper(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * ��ͬ�����޸�ί��
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4helper(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * �ƻ���Ա����ί��
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void create4planner(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * �ƻ���Ա�޸�ί��
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4planner(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * �����η�������
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4officer(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	/**
	 * ����������ί������
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	void update4leader(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
