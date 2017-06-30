package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.service.IGroupService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class GroupServlet extends AbstractServlet {

	private static final long serialVersionUID = 8429032875831095042L;

	private IGroupService service;

	public void setService(IGroupService service) {
		this.service = service;
	}
	
	public void list(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
		GroupSort sort = null;
		try{
			String kind = request.getParameter("kind");
			if(kind != null)
			sort = GroupSort.valueOf(kind);		
		}catch(IllegalArgumentException e){
			//this.outException(e.getMessage());
		}
		this.outData(this.service.findAll(prjID, sort));
	}
	
	public void isMajorDepart(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
		Integer deptID = StringUtil.str2Int(request.getParameter("deptID"));
		if(prjID==null || deptID == null){
			this.outMsg(false, "������Ϣ�У�ȱ����Ŀ�����ű�ʶ��Ϣ");
		}else{
			boolean result = this.service.isGroupSort(prjID,deptID,GroupSort.MAJORDEPART);
			this.outMsg(true, String.valueOf(result));
		}
	}
	public void isMajorPerson(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
		Integer deptID = StringUtil.str2Int(request.getParameter("deptID"));
		if(prjID==null || deptID == null){
			this.outMsg(false, "������Ϣ�У�ȱ����Ŀ����Ա��ʶ��Ϣ");
		}else{		
			boolean result = this.service.isGroupSort(prjID,deptID,GroupSort.OFFICER);
			this.outMsg(true, String.valueOf(result));
		}
	}
	/**
	 * ����Ƿ�����Ƶ�Ȩ��
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void canDesign(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "δ֪��Ŀ��ʶ");
		} else {
			boolean res = this.service.canCheck(id, user.getId(), GroupSort.DESIGNER);
			if (res) {
				outMsg(true, null);
			} else {
				outMsg(false, "�Ը���Ŀ��û�����Ȩ��");
			}
		}
	}

	/**
	 * ����Ƿ���У��Ȩ��
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void canCheck(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "δ֪��Ŀ��ʶ");
		} else {
			boolean res = this.service.canCheck(id, user.getId(), GroupSort.PROOFREADER);
			if (res) {
				outMsg(true, null);
			} else {
				outMsg(false, "�Ը���Ŀ��û��У��Ȩ��");
			}
		}
	}
	/**
	 * ����Ƿ�������Ԥ���Ȩ��
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void canSubmitBudget(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "δ֪��Ŀ��ʶ");
		} else {			
			boolean res = user.isHelper()||user.isPlanner()||this.service.canCheck(id, user.getId(), GroupSort.OFFICER);
			if (res) {
				outMsg(true, null);
			} else {
				outMsg(false, "�Ը���Ŀ��û��Ԥ�������Ȩ��");
			}
		}
	}
	/**
	 * ����Ƿ���Ԥ��Ȩ��
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void canBudget(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "δ֪��Ŀ��ʶ");
		} else {
			boolean res = this.service.canCheck(id, user.getId(), GroupSort.MAJORBUDGETEER);
			if (res) {
				outMsg(true, null);
			} else {
				outMsg(false, "�Ը���Ŀ��û��Ԥ��Ȩ��");
			}
		}
	}
	/**
	 * �ж��ǲ���ָ����Ŀ�ĸ�����
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void isOfficer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "δ֪��Ŀ��ʶ");
		} else {
			boolean res = this.service.canCheck(id, user.getId(), GroupSort.OFFICER);
			if (res) {
				outMsg(true, null);
			} else {
				outMsg(false, "���Ǹ���Ŀ�ĸ�����");
			}
		}
	}	
}
