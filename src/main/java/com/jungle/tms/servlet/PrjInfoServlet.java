package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.PrjInfo;
import com.jungle.tms.model.Project;
import com.jungle.tms.service.IGroupService;
import com.jungle.tms.service.IPrjInfoService;
import com.jungle.tms.service.IProjectService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class PrjInfoServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041504L;

	private IPrjInfoService service;
	private IProjectService projectService;
	private IGroupService groupService;

	public void setService(IPrjInfoService service) {
		this.service = service;
	}

	public void setProjectService(IProjectService projectService) {
		this.projectService = projectService;
	}

	public void setGroupService(IGroupService groupService) {
		this.groupService = groupService;
	}

	/**
	 * 输出岗位角色列表
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void getInfo(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		String prjName = request.getParameter("prjName");
		PrjInfo po = this.service.getPrjInfo(prjName);
		if (po == null) {
			po = new PrjInfo();
			po.setPrjName(prjName);
		}
		if(user.isArchive()){
			Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
			Project prj = this.projectService.getProject(prjID);
			po.setDocNo(prj.getDocNO());
		}
		outData(po);
	}

	public void update(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		if (user.isDesigner()) {
			Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
			boolean isOfficer = this.groupService.canCheck(prjID, user.getId(), GroupSort.OFFICER);
			if (isOfficer) {
				String prjName = request.getParameter("prjName");
				PrjInfo po = this.service.getPrjInfo(prjName);
				if (po == null) {
					po = new PrjInfo();
					po.setPrjName(prjName);
				}

				String builder = request.getParameter("builder");
				if (builder != null) {
					po.setBuilder(builder);
				}
				String construction = request.getParameter("construction");
				if (construction != null) {
					po.setConstruction(construction);
				}
				String contact = request.getParameter("contact");
				if (contact != null)
					po.setContact(contact);
				String electric = request.getParameter("electric");
				if (electric != null)
					po.setElectric(electric);
				String location = request.getParameter("location");
				if (location != null)
					po.setLocation(location);
				String pipeline = request.getParameter("pipeline");
				if (pipeline != null)
					po.setPipeline(pipeline);
				String scale = request.getParameter("scale");
				if (scale != null)
					po.setScale(scale);
				String watersupply = request.getParameter("watersupply");
				if (watersupply != null)
					po.setWatersupply(watersupply);
				this.service.save(po);
				outMsg(true, null);
			} else {
				outMsg(false, "项目负责人才可维护项目信息");
			}
		} else {
			outMsg(false, "项目负责人才可维护项目信息");
		}
	}
}
