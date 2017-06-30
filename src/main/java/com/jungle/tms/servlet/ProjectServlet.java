package com.jungle.tms.servlet;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.enumo.Stage;
import com.jungle.tms.model.Message;
import com.jungle.tms.model.Message.MsgType;
import com.jungle.tms.model.Project;
import com.jungle.tms.service.IGroupService;
import com.jungle.tms.service.IMessageService;
import com.jungle.tms.service.IProjectService;
import com.jungle.tms.service.IProjectService.ProjectPage;
import com.jungle.tms.utils.DateUtil;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class ProjectServlet extends AbstractServlet implements IProjectServlet {
	private static final long serialVersionUID = -3348408141687431894L;

	private IProjectService service;
	private IMessageService messageService;
	private IGroupService groupService;

	public void setService(IProjectService projectService) {
		this.service = projectService;
	}

	public void setMessageService(IMessageService messageService) {
		this.messageService = messageService;
	}

	public void setGroupService(IGroupService groupService) {
		this.groupService = groupService;
	}

	static class Priority {
		private Integer id;
		private String text;

		public Priority(Integer id, String text) {
			this.id = id;
			this.text = text;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getText() {
			return text;
		}

		public void setText(String text) {
			this.text = text;
		}

	}
	
	public static class QueryParam{
		private Integer start;//页开始索引
		private Integer limit;//页结束限制
		
		private Integer prjType;//任务类型
		private String prjNumber;//项目编号
		private String prjName;//项目名称
		
		@Deprecated		
		private Date overdue;
		private Date startDate;
		private Date endDate;
		
		private Integer majorDept;
		private Integer chiefPerson;
		private Integer person;
		private Integer majorBudgeteer;
		
		private Integer userID;
		private Integer departID;
		
		private Boolean completed;
		private Boolean collection;
		private Boolean budgetFlag;
		public Integer getStart() {
			return start;
		}
		public void setStart(Integer start) {
			this.start = start;
		}
		public Integer getLimit() {
			return limit;
		}
		public void setLimit(Integer limit) {
			this.limit = limit;
		}
		public Integer getPrjType() {
			return prjType;
		}
		public void setPrjType(Integer prjType) {
			this.prjType = prjType;
		}
		public String getPrjNumber() {
			return prjNumber;
		}
		public void setPrjNumber(String prjNumber) {
			this.prjNumber = prjNumber;
		}
		public String getPrjName() {
			return prjName;
		}
		public void setPrjName(String prjName) {
			this.prjName = prjName;
		}
		public Date getOverdue() {
			return overdue;
		}
		public void setOverdue(Date overdue) {
			this.overdue = overdue;
		}
		public Date getStartDate() {
			return startDate;
		}
		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}
		public Date getEndDate() {
			return endDate;
		}
		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}
		public Integer getMajorDept() {
			return majorDept;
		}
		public void setMajorDept(Integer majorDept) {
			this.majorDept = majorDept;
		}
		public Integer getChiefPerson() {
			return chiefPerson;
		}
		public void setChiefPerson(Integer chiefPerson) {
			this.chiefPerson = chiefPerson;
		}
		public Integer getPerson() {
			return person;
		}
		public void setPerson(Integer person) {
			this.person = person;
		}
		public Integer getMajorBudgeteer() {
			return majorBudgeteer;
		}
		public void setMajorBudgeteer(Integer majorBudgeteer) {
			this.majorBudgeteer = majorBudgeteer;
		}
		public Integer getUserID() {
			return userID;
		}
		public void setUserID(Integer userID) {
			this.userID = userID;
		}
		public Integer getDepartID() {
			return departID;
		}
		public void setDepartID(Integer departID) {
			this.departID = departID;
		}
		public Boolean getCompleted() {
			return completed;
		}
		public void setCompleted(Boolean completed) {
			this.completed = completed;
		}
		public Boolean getCollection() {
			return collection;
		}
		public void setCollection(Boolean collection) {
			this.collection = collection;
		}
		public Boolean getBudgetFlag() {
			return budgetFlag;
		}
		public void setBudgetFlag(Boolean budgetFlag) {
			this.budgetFlag = budgetFlag;
		}		
	}
	/**
	 * 查询任务列表
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@Override
	public void projectList(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		QueryParam qp = new QueryParam();
		// 负责部门
		qp.setMajorDept(StringUtil.str2Int(request.getParameter("chiefDept")));
		qp.setPerson(StringUtil.str2Int(request.getParameter("person")));
		// 项目类别
		qp.setPrjType(StringUtil.str2Int(request.getParameter("prjType")));

		qp.setStart(StringUtil.str2Int(request.getParameter("start")));
		qp.setLimit(StringUtil.str2Int(request.getParameter("limit")));

		// 查询区间
		String dateType = request.getParameter("dateType");
		/*if ("0".equals(dateType)) {// 自定义
		} else */if ("1".equals(dateType)) {// 本周
			Date[] d = DateUtil.getWeek(new Date());
			qp.setStartDate(d[0]);
			qp.setEndDate(d[1]);
		} else if ("2".equals(dateType)) {// 本月
			Date[] d = DateUtil.getMonth(new Date());
			qp.setStartDate(d[0]);
			qp.setEndDate(d[1]);
		}else{// 自定义
			qp.setStartDate(StringUtil.str2Date(request.getParameter("startDate")));
			qp.setEndDate(StringUtil.str2Date(request.getParameter("endDate")));
		}

		// 已过期过滤
		String overdue = request.getParameter("overdue");
		if ("1".equals(overdue)) {
			qp.setOverdue(new Date());
		}

		// 未收款过滤
		//String collection = request.getParameter("collection");// 已收款
		if ("1".equals(request.getParameter("collection"))) { /* 显示已收款的 */
			qp.setCollection(true);
		}

		// 已完成状态过滤
		//String completed = request.getParameter("completed");// 已完成
		if ("1".equals(request.getParameter("completed"))) {/* 已完成的不显示 */
			qp.setCompleted(false);
		}

		// 按项目编号查询
		String prjNumber = request.getParameter("prjNumber");
		if (StringUtils.hasLength(prjNumber)) {
			qp.setPrjNumber(prjNumber);
		}

		// 按项目名称查询
		String prjName = request.getParameter("prjName");
		if (StringUtils.hasLength(prjName)) {
			qp.setPrjName(prjName);
		}		
		if (user.isDesigner()) {
			// 设计室
			// 查看分派的任务
			if(qp.getMajorDept() == null){//按部门查询时，不用加此控制
				qp.setUserID(user.getId());
				if (user.isTeamLeader()) {// 判断是否为设计室主任
					qp.setDepartID(user.getDeptID());
					qp.setChiefPerson(StringUtil.str2Int(request.getParameter("chiefPerson")));
				}
			}
		} else if (user.isBudgeteer()) {
			if (user.isTeamLeader()) {
				// 预算室主任
				qp.setBudgetFlag(true);
				// 负责人员
				qp.setMajorBudgeteer(StringUtil.str2Int(request.getParameter("chiefPerson")));
			} else {
				// 预算
				qp.setUserID(user.getId());
			}
		}

		ProjectPage pp = this.service.findAll(qp);

		this.responder.addExtra("type", "event");
		this.responder.addExtra("name", "refresh");// Ext.Direct.Polling 的响应数据
		this.responder.render2Json(true, "", pp.getTotal(), pp.getStart(),pp.getList());
	}

	/**
	 * 删除处理
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void deleteProject(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper() || user.isPlanner()) {
			Project p = buildProject(request);
			if (p.getId() == null) {
				outMsg(false, "缺少委托标识");
			} else {
				this.service.delete(p);
				outMsg(true, "删除成功");
			}
		} else {
			outMsg(false, "只有合同和计划人员可以删除委托基本信息");
		}
	}

	@Override
	public void create4helper(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper()) {
			Project[] ps = buildProjects(request);
			// 新建工程
			int s = 0;
			int f = 0;
			for (Project tmp : ps) {
				if (tmp!=null&&tmp.getId() == null) {
					tmp.setPrjStage(Stage.S0_NEW);
					if (tmp.getStartDate() == null) {
						tmp.setStartDate(new Date());
					}
					
					this.service.save(tmp);					

					Message msg = new Message();
					msg.setGroupID(tmp.getId());
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}成功创建项目：{1}",
							user.getUserName(), tmp.getPrjName()));
					this.messageService.save(msg);
					s++;
				} else {
					f++;
					//outMsg(false, "检测到非法标识");
				}
			}
			outMsg(true, MessageFormat.format("创建设计工程任务，成功{0}条，失败{1}条！",s,f));
		} else {
			outMsg(false, "只有合同和计划人员可以创建委托基本信息");
		}
	}

	@Override
	public void update4helper(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper()) {
			Project p = buildProject(request);
			if (p.getId() == null) {
				outMsg(false, "缺少委托标识");
			} else {
				this.service.save(p);

				Message msg = new Message();
				msg.setGroupID(p.getId());
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}成功修改项目：{1}",
						user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);

				outMsg(true, "修改成功！");
			}
		} else {
			outMsg(false, "只有合同人员可以维护委托基本信息");
		}
	}

	/**
	 * 更新项目状态
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void updatePrjState(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "缺少任务标识");
		} else {		
			String state = request.getParameter("state");
			if("1".equals(state)){//完成状态，由室主任来维护
				if(user.isDesigner() && user.isTeamLeader()){
					this.ups(id, state);
				}else{
					outMsg(false, "只有室主任可以维护项目完成状态");
				}
			}else if("2".equals(state)){//审核状态，由总工或者计划来维护
				if(user.isPlanner() || user.isAssessor()){
					this.ups(id, state);
				}else{
					outMsg(false, "只有总工或者计划人员可以维护项目审核状态");
				}				
			}else if("6".equals(state)){//财务确认收款状态，由财务来维护
				if(user.isAccountant()){
					this.ups(id, state);
				}else{
					outMsg(false, "只有财务人员可以维护项目审核状态");
				}				
			}else if (user.isHelper()) {
				this.ups(id, state);
			} else {
				outMsg(false, "只有合同人员可以维护项目状态");
			}
		}
	}
	
	private void ups(Integer id,String state) throws IOException{
		Project p = this.service.getProject(id);
		if(p == null){					
			outMsg(false, "未找到指定项目任务！");
		}else{

			this.service.save(updateState(p,state));
			
			Message msg = new Message();
			msg.setGroupID(id);
			msg.setUserID(user.getId());
			msg.setUserName(user.getUserName());
			msg.setType(MsgType.SYSTEM_MSG);
			msg.setDate(new Date());
			msg.setMessage(MessageFormat.format("{0}成功更新‘{1}’项目状态", user.getUserName(), p.getPrjName()));
			this.messageService.save(msg);
			
			outMsg(true, "状态更新成功！");
		}		
	}
	private static Project updateState(Project p,String state){
		if("1".equals(state)){
			p.setComplete(true);//设计工作完成
		}else if("2".equals(state)){
			p.setAudit(true);//项目审核
		}else if("3".equals(state)){
			p.setContract(true);//签合同
		}else if("4".equals(state)){
			p.setCollection(true);//合同确认收款
		}else if("5".equals(state)){
			p.setDeposit(true);//收定金
		}else if("6".equals(state)){
			p.setFeeFlag(true);//财务确认收款
		}
		/*String prjState = p.getPrjState();
		if(prjState==null||prjState.length()==0){
			p.setPrjState(state);									
		}else if (prjState.indexOf(state) == -1) {
			p.setPrjState(prjState.length() == 0 ? state : new StringBuffer(prjState).append(",").append(state).toString());
		}*/
		return p;
	}
	/**
	 * 更新项目预算标记
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void updateBudgetFlag(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "未找到指定项目任务！");
				}else{
					p.setBudgetFlag(true);
					this.service.save(p);
					
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}成功对‘{1}’项目发去预算任务", user.getUserName(), p.getPrjName()));
					this.messageService.save(msg);
					
					outMsg(true, "成功申请预算任务！");
				}
			}
		} else {
			outMsg(false, "只有合同人员可以申请预算任务");
		}		
	}
	@Override
	public void create4planner(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isPlanner()) {
			Project[] ps = buildProjects(request);
			// 新建工程
			int s = 0;
			int f = 0;
			for (Project tmp : ps) {
				if (tmp.getId() == null) {
					tmp.setPrjNumber(null);//计划人员不能设置工程编号
					tmp.setPrjStage(Stage.S0_NEW);
					if (tmp.getStartDate() == null) {
						tmp.setStartDate(new Date());
					}
					
					this.service.save(tmp);					

					Message msg = new Message();
					msg.setGroupID(tmp.getId());
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}成功创建项目：{1}",
							user.getUserName(), tmp.getPrjName()));
					this.messageService.save(msg);
					s++;
				} else {
					f++;
				}
			}
			outMsg(true, MessageFormat.format("创建设计工程任务，成功{0}条，失败{1}条！",s,f));
		} else {
			outMsg(false, "只有合同和计划人员可以维护项目基本信息");
		}
	}
	public static List<Integer> str2Int(String[] s) {
		List<Integer> list = new ArrayList<Integer>();
		if (s != null){			
			for(String t :s){
				try {
					list.add(Integer.parseInt(t));
				} catch (NumberFormatException e) {			
				}
			}
		}
		return list;
	}

	@Override
	public void update4planner(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isPlanner()) {
			Project p = buildProject(request);
			if (p.getId() == null) {
				outMsg(false, "缺少委托标识");
			} else {
				p.setPrjStage(Stage.S1_DISTRIBUTE);
				Integer chiefDept = StringUtil.str2Int(request.getParameter("chiefDept"));
				Integer officer = StringUtil.str2Int(request.getParameter("chiefPerson"));
				this.service.save(p);
				this.groupService.saveSingle(p.getId(), GroupSort.MAJORDEPART, chiefDept);
				this.groupService.saveSingle(p.getId(), GroupSort.OFFICER, officer);
				

				Message msg = new Message();
				msg.setGroupID(p.getId());
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}成功修改项目：{1}", user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);

				outMsg(true, "修改成功！");
			}
		} else {
			outMsg(false, "只有计划人员可以维护项目计划信息");
		}
	}

	@Override
	public void update4officer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isDesigner()&&user.isTeamLeader()) {
			//设计室主任
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				//TODO bjw Stage.S2_DIVISION;
				Integer officers = StringUtil.str2Int(request.getParameter("chiefPerson"));
				if(officers != null){
					this.groupService.saveSingle(id, GroupSort.OFFICER, officers);					
				}
				
				Integer memberID = StringUtil.str2Int(request.getParameter("minorDepart"));
				if(memberID != null){
					this.groupService.saveSingle(id, GroupSort.MINORDEPART,memberID);
				}
				
				Integer minorPerson = StringUtil.str2Int(request.getParameter("minorPerson"));
				if(minorPerson != null){
					this.groupService.saveSingle(id, GroupSort.MINOROFFICER,minorPerson);
				}

				List<Integer> designers = str2Int(request.getParameterValues("designer"));
				List<Integer> correctors = str2Int(request.getParameterValues("corrector"));

				this.groupService.saveWithClear(id, GroupSort.DESIGNER, designers);
				this.groupService.saveWithClear(id, GroupSort.PROOFREADER, correctors);
				
				Message msg = new Message();
				msg.setGroupID(id);
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}成功分派项目任务：{1}",
						user.getUserName(), ""/* p.getPrjName() */));
				this.messageService.save(msg);

				outMsg(true, "任务分派成功");
			}
		} else {
			outMsg(false, "只有室主任可以分派项目任务");
		}
	}

	/**
	 * 负责人重新委派任务
	 */
	@Override
	public void update4leader(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isDesigner()) {
			Project p = buildProject(request);
			if (p.getId() == null) {
				outMsg(false, "缺少委托标识");
			} else {
				p.setPrjStage(Stage.S2_DIVISION);
				Integer memberID = StringUtil.str2Int(request.getParameter("minorDepart"));
				if(memberID != null){
					this.groupService.saveSingle(p.getId(), GroupSort.MINORDEPART,memberID);
				}
				Integer minorPerson = StringUtil.str2Int(request.getParameter("minorPerson"));
				if(minorPerson != null){
					this.groupService.saveSingle(p.getId(), GroupSort.MINOROFFICER,minorPerson);
				}
				Message msg = new Message();
				msg.setGroupID(p.getId());
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}成功委派项目：{1}", user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);

				outMsg(true, "修改成功！");
			}
		} else {
			outMsg(false, "设计师角色是具有任务重新委派权限的前提条件。");
		}
	}

	
	/**
	 * 预算室主任分派预算任务
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void budgetOfficer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		//预算室主任
		if (user.isBudgeteer()&& user.isTeamLeader()) {			
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "未找到指定项目任务！");
				}else{
					Integer majorBudgeteer = StringUtil.str2Int(request.getParameter("majorBudgeteer"));
					List<Integer> budgeteers = str2Int(request.getParameterValues("budgeteer"));

					this.groupService.saveSingle(id, GroupSort.MAJORBUDGETEER, majorBudgeteer);
					this.groupService.saveWithClear(id, GroupSort.BUDGETEER, budgeteers);
					
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}完成‘{1}’项目预算任务的分配。", user.getUserName(), p.getPrjName()));
					this.messageService.save(msg);
					
					outMsg(true, "完成预算任务分配");
				}
			}			
			
			outMsg(true, "完成预算任务分配");
		} else {
			outMsg(false, "只有预算室主任可以进行预算任务分配");
		}
	}
	/**
	 * 预算
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void budgeteer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isBudgeteer()) {
			Map<String, String> params = UploadFileServlet.getParameter(request);
			Integer id = StringUtil.str2Int(params.get("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "未找到指定项目任务！");
				}else{
					String ba = params.get("budgetAmount");
					float budgetAmount = Float.parseFloat(ba);
					p.setBudgetAmount(budgetAmount);
					this.service.save(p);
					
					//String remark = request.getParameter("remark");
					
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}对‘{1}’项目预算。<br>预算金额：{2,number, currency}"/*<br>补充说明:{3}"*/, user.getUserName(), p.getPrjName(),budgetAmount/*,remark*/));
					this.messageService.save(msg);
					
					outMsg(true, "完成预算");
				}
			}			
			
			outMsg(true, "完成预算");
		} else {
			outMsg(false, "只有预算人员可以进行预算设置");
		}
	}

	/**
	 * 总工审核
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void assessor(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isAssessor()||user.isPlanner()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "未找到指定项目任务！");
				}else{
					String result = request.getParameter("result");
					String remark = request.getParameter("remark");
					boolean passed = "1".equals(result); 
					if(passed){
						p.setAudit(true);//设置审核标记
						p.setCheckDate(new Date());//设置审核日期
						this.service.save(p);
					}
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}对‘{1}’项目进行审核。<br>审核结果：{2}<br>补充说明:{3}", user.getUserName(), p.getPrjName(),passed?"通过":"不通过",remark));
					this.messageService.save(msg);
					
					outMsg(true, "审核结果已提交");
				}
			}			
		} else {
			outMsg(false, "只有总工和计划人员可以审核项目");
		}
	}

	/**
	 * 出图
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void outprint(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isOutprint()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "未找到指定项目任务！");
				}else{
					//String result = request.getParameter("result");
					String remark = request.getParameter("remark");
					//boolean passed = "1".equals(result); 
					//if(passed){
					//TODO bjw this.service.save(updateState(p,"7"));
					//}
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}对‘{1}’项目出图。<br>补充说明:{2}", user.getUserName(), p.getPrjName(),remark));
					this.messageService.save(msg);
					
					outMsg(true, "完成出图");
				}
			}			
		} else {
			outMsg(false, "只有出图人员可以确认已出图");
		}
	}

	/**
	 * 归档
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void archive(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		if (user.isArchive()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少任务标识");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "未找到指定项目任务！");
				}else{
					String docNO = request.getParameter("docNO");
					String remark = request.getParameter("remark");
					p.setDocNO(docNO);
					this.service.save(p);
					
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}对‘{1}’项目归档。<BR>归档编号：{2}<br>补充说明:{3}", user.getUserName(), p.getPrjName(),docNO,remark));
					this.messageService.save(msg);
					
					outMsg(true, "完成归档");
				}
			}			
		} else {
			outMsg(false, "只有归档人员可以进行归档操作");
		}
	}

	/**
	 * 财务确认
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void account(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		if (user.isAccountant()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if(id==null){
				outMsg(false, "缺少工程标识");
			}else{
				Project p = this.service.getProject(id);
				p.setFeeFlag(true);
				this.service.save(p);
				
				Message msg = new Message();
				msg.setGroupID(id);
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}确认‘{1}’项目收款信息", user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);
				
				outMsg(true, "完成收款确认");
			}
		} else {
			outMsg(false, "只有财务人员可以确认收款");
		}
	}

	/**
	 * 根据请求数据，构建新工程信息对象
	 * @param request
	 * @return
	 */
	private Project[] buildProjects(HttpServletRequest request) {
		String[] types = request.getParameterValues("prjType");
		List<Project> ps = new ArrayList<Project>(types.length);
		for(int i=0;i<types.length;i++){
			Project tmp = new Project();
			Integer pt = StringUtil.str2Int(types[i]);
			if(pt == null){
				continue;
			}
			tmp.setPrjType(pt);
			tmp = buildProject2(request,tmp);
			ps.add(tmp);
		}
		return ps.toArray(new Project[ps.size()]);
	}
	
	private Project buildProject(HttpServletRequest request) {
		Integer id = StringUtil.str2Int(request.getParameter("id"));

		Project t = this.service.getProject(id);

		if (t == null) {
			t = new Project();
		}
		
		Integer pt = StringUtil.str2Int(request.getParameter("prjType"));
		if (pt != null) {
			t.setPrjType(pt);
		}
		return buildProject2(request,t);
	}
	private static Project buildProject2(HttpServletRequest request,Project t){
		
		String pn = request.getParameter("prjName");
		if (pn != null) {
			t.setPrjName(pn);
		}

		String pn1 = request.getParameter("prjNumber");
		if (pn1 != null) {
			t.setPrjNumber(pn1);
		}


		Integer pp = StringUtil.str2Int(request.getParameter("prjPriority"));
		if (pp != null)
			t.setPrjPriority(pp);

		//String[] ps = request.getParameterValues("prjState");
		//if (ps != null)
		//	t.setPrjState(StringUtil.ary2str(ps));

		Date sd = StringUtil.str2Date(request.getParameter("startDate"));
		if (sd != null)
			t.setStartDate(sd);

		Date ed = StringUtil.str2Date(request.getParameter("endDate"));
		if (ed != null)
			t.setEndDate(ed);

		String docNO = request.getParameter("docNO");
		if(docNO != null){
			t.setDocNO(docNO);
		}
		String de = request.getParameter("remark");
		if (de != null)
			t.setRemark(de);
		return t;
	}
}
