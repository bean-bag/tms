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
		private Integer start;//ҳ��ʼ����
		private Integer limit;//ҳ��������
		
		private Integer prjType;//��������
		private String prjNumber;//��Ŀ���
		private String prjName;//��Ŀ����
		
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
	 * ��ѯ�����б�
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@Override
	public void projectList(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		QueryParam qp = new QueryParam();
		// ������
		qp.setMajorDept(StringUtil.str2Int(request.getParameter("chiefDept")));
		qp.setPerson(StringUtil.str2Int(request.getParameter("person")));
		// ��Ŀ���
		qp.setPrjType(StringUtil.str2Int(request.getParameter("prjType")));

		qp.setStart(StringUtil.str2Int(request.getParameter("start")));
		qp.setLimit(StringUtil.str2Int(request.getParameter("limit")));

		// ��ѯ����
		String dateType = request.getParameter("dateType");
		/*if ("0".equals(dateType)) {// �Զ���
		} else */if ("1".equals(dateType)) {// ����
			Date[] d = DateUtil.getWeek(new Date());
			qp.setStartDate(d[0]);
			qp.setEndDate(d[1]);
		} else if ("2".equals(dateType)) {// ����
			Date[] d = DateUtil.getMonth(new Date());
			qp.setStartDate(d[0]);
			qp.setEndDate(d[1]);
		}else{// �Զ���
			qp.setStartDate(StringUtil.str2Date(request.getParameter("startDate")));
			qp.setEndDate(StringUtil.str2Date(request.getParameter("endDate")));
		}

		// �ѹ��ڹ���
		String overdue = request.getParameter("overdue");
		if ("1".equals(overdue)) {
			qp.setOverdue(new Date());
		}

		// δ�տ����
		//String collection = request.getParameter("collection");// ���տ�
		if ("1".equals(request.getParameter("collection"))) { /* ��ʾ���տ�� */
			qp.setCollection(true);
		}

		// �����״̬����
		//String completed = request.getParameter("completed");// �����
		if ("1".equals(request.getParameter("completed"))) {/* ����ɵĲ���ʾ */
			qp.setCompleted(false);
		}

		// ����Ŀ��Ų�ѯ
		String prjNumber = request.getParameter("prjNumber");
		if (StringUtils.hasLength(prjNumber)) {
			qp.setPrjNumber(prjNumber);
		}

		// ����Ŀ���Ʋ�ѯ
		String prjName = request.getParameter("prjName");
		if (StringUtils.hasLength(prjName)) {
			qp.setPrjName(prjName);
		}		
		if (user.isDesigner()) {
			// �����
			// �鿴���ɵ�����
			if(qp.getMajorDept() == null){//�����Ų�ѯʱ�����üӴ˿���
				qp.setUserID(user.getId());
				if (user.isTeamLeader()) {// �ж��Ƿ�Ϊ���������
					qp.setDepartID(user.getDeptID());
					qp.setChiefPerson(StringUtil.str2Int(request.getParameter("chiefPerson")));
				}
			}
		} else if (user.isBudgeteer()) {
			if (user.isTeamLeader()) {
				// Ԥ��������
				qp.setBudgetFlag(true);
				// ������Ա
				qp.setMajorBudgeteer(StringUtil.str2Int(request.getParameter("chiefPerson")));
			} else {
				// Ԥ��
				qp.setUserID(user.getId());
			}
		}

		ProjectPage pp = this.service.findAll(qp);

		this.responder.addExtra("type", "event");
		this.responder.addExtra("name", "refresh");// Ext.Direct.Polling ����Ӧ����
		this.responder.render2Json(true, "", pp.getTotal(), pp.getStart(),pp.getList());
	}

	/**
	 * ɾ������
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
				outMsg(false, "ȱ��ί�б�ʶ");
			} else {
				this.service.delete(p);
				outMsg(true, "ɾ���ɹ�");
			}
		} else {
			outMsg(false, "ֻ�к�ͬ�ͼƻ���Ա����ɾ��ί�л�����Ϣ");
		}
	}

	@Override
	public void create4helper(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper()) {
			Project[] ps = buildProjects(request);
			// �½�����
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
					msg.setMessage(MessageFormat.format("{0}�ɹ�������Ŀ��{1}",
							user.getUserName(), tmp.getPrjName()));
					this.messageService.save(msg);
					s++;
				} else {
					f++;
					//outMsg(false, "��⵽�Ƿ���ʶ");
				}
			}
			outMsg(true, MessageFormat.format("������ƹ������񣬳ɹ�{0}����ʧ��{1}����",s,f));
		} else {
			outMsg(false, "ֻ�к�ͬ�ͼƻ���Ա���Դ���ί�л�����Ϣ");
		}
	}

	@Override
	public void update4helper(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper()) {
			Project p = buildProject(request);
			if (p.getId() == null) {
				outMsg(false, "ȱ��ί�б�ʶ");
			} else {
				this.service.save(p);

				Message msg = new Message();
				msg.setGroupID(p.getId());
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}�ɹ��޸���Ŀ��{1}",
						user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);

				outMsg(true, "�޸ĳɹ���");
			}
		} else {
			outMsg(false, "ֻ�к�ͬ��Ա����ά��ί�л�����Ϣ");
		}
	}

	/**
	 * ������Ŀ״̬
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void updatePrjState(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer id = StringUtil.str2Int(request.getParameter("id"));
		if (id == null) {
			outMsg(false, "ȱ�������ʶ");
		} else {		
			String state = request.getParameter("state");
			if("1".equals(state)){//���״̬������������ά��
				if(user.isDesigner() && user.isTeamLeader()){
					this.ups(id, state);
				}else{
					outMsg(false, "ֻ�������ο���ά����Ŀ���״̬");
				}
			}else if("2".equals(state)){//���״̬�����ܹ����߼ƻ���ά��
				if(user.isPlanner() || user.isAssessor()){
					this.ups(id, state);
				}else{
					outMsg(false, "ֻ���ܹ����߼ƻ���Ա����ά����Ŀ���״̬");
				}				
			}else if("6".equals(state)){//����ȷ���տ�״̬���ɲ�����ά��
				if(user.isAccountant()){
					this.ups(id, state);
				}else{
					outMsg(false, "ֻ�в�����Ա����ά����Ŀ���״̬");
				}				
			}else if (user.isHelper()) {
				this.ups(id, state);
			} else {
				outMsg(false, "ֻ�к�ͬ��Ա����ά����Ŀ״̬");
			}
		}
	}
	
	private void ups(Integer id,String state) throws IOException{
		Project p = this.service.getProject(id);
		if(p == null){					
			outMsg(false, "δ�ҵ�ָ����Ŀ����");
		}else{

			this.service.save(updateState(p,state));
			
			Message msg = new Message();
			msg.setGroupID(id);
			msg.setUserID(user.getId());
			msg.setUserName(user.getUserName());
			msg.setType(MsgType.SYSTEM_MSG);
			msg.setDate(new Date());
			msg.setMessage(MessageFormat.format("{0}�ɹ����¡�{1}����Ŀ״̬", user.getUserName(), p.getPrjName()));
			this.messageService.save(msg);
			
			outMsg(true, "״̬���³ɹ���");
		}		
	}
	private static Project updateState(Project p,String state){
		if("1".equals(state)){
			p.setComplete(true);//��ƹ������
		}else if("2".equals(state)){
			p.setAudit(true);//��Ŀ���
		}else if("3".equals(state)){
			p.setContract(true);//ǩ��ͬ
		}else if("4".equals(state)){
			p.setCollection(true);//��ͬȷ���տ�
		}else if("5".equals(state)){
			p.setDeposit(true);//�ն���
		}else if("6".equals(state)){
			p.setFeeFlag(true);//����ȷ���տ�
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
	 * ������ĿԤ����
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void updateBudgetFlag(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isHelper()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "ȱ�������ʶ");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "δ�ҵ�ָ����Ŀ����");
				}else{
					p.setBudgetFlag(true);
					this.service.save(p);
					
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}�ɹ��ԡ�{1}����Ŀ��ȥԤ������", user.getUserName(), p.getPrjName()));
					this.messageService.save(msg);
					
					outMsg(true, "�ɹ�����Ԥ������");
				}
			}
		} else {
			outMsg(false, "ֻ�к�ͬ��Ա��������Ԥ������");
		}		
	}
	@Override
	public void create4planner(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isPlanner()) {
			Project[] ps = buildProjects(request);
			// �½�����
			int s = 0;
			int f = 0;
			for (Project tmp : ps) {
				if (tmp.getId() == null) {
					tmp.setPrjNumber(null);//�ƻ���Ա�������ù��̱��
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
					msg.setMessage(MessageFormat.format("{0}�ɹ�������Ŀ��{1}",
							user.getUserName(), tmp.getPrjName()));
					this.messageService.save(msg);
					s++;
				} else {
					f++;
				}
			}
			outMsg(true, MessageFormat.format("������ƹ������񣬳ɹ�{0}����ʧ��{1}����",s,f));
		} else {
			outMsg(false, "ֻ�к�ͬ�ͼƻ���Ա����ά����Ŀ������Ϣ");
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
				outMsg(false, "ȱ��ί�б�ʶ");
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
				msg.setMessage(MessageFormat.format("{0}�ɹ��޸���Ŀ��{1}", user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);

				outMsg(true, "�޸ĳɹ���");
			}
		} else {
			outMsg(false, "ֻ�мƻ���Ա����ά����Ŀ�ƻ���Ϣ");
		}
	}

	@Override
	public void update4officer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isDesigner()&&user.isTeamLeader()) {
			//���������
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "ȱ�������ʶ");
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
				msg.setMessage(MessageFormat.format("{0}�ɹ�������Ŀ����{1}",
						user.getUserName(), ""/* p.getPrjName() */));
				this.messageService.save(msg);

				outMsg(true, "������ɳɹ�");
			}
		} else {
			outMsg(false, "ֻ�������ο��Է�����Ŀ����");
		}
	}

	/**
	 * ����������ί������
	 */
	@Override
	public void update4leader(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isDesigner()) {
			Project p = buildProject(request);
			if (p.getId() == null) {
				outMsg(false, "ȱ��ί�б�ʶ");
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
				msg.setMessage(MessageFormat.format("{0}�ɹ�ί����Ŀ��{1}", user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);

				outMsg(true, "�޸ĳɹ���");
			}
		} else {
			outMsg(false, "���ʦ��ɫ�Ǿ�����������ί��Ȩ�޵�ǰ��������");
		}
	}

	
	/**
	 * Ԥ�������η���Ԥ������
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void budgetOfficer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		//Ԥ��������
		if (user.isBudgeteer()&& user.isTeamLeader()) {			
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "ȱ�������ʶ");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "δ�ҵ�ָ����Ŀ����");
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
					msg.setMessage(MessageFormat.format("{0}��ɡ�{1}����ĿԤ������ķ��䡣", user.getUserName(), p.getPrjName()));
					this.messageService.save(msg);
					
					outMsg(true, "���Ԥ���������");
				}
			}			
			
			outMsg(true, "���Ԥ���������");
		} else {
			outMsg(false, "ֻ��Ԥ�������ο��Խ���Ԥ���������");
		}
	}
	/**
	 * Ԥ��
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
				outMsg(false, "ȱ�������ʶ");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "δ�ҵ�ָ����Ŀ����");
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
					msg.setMessage(MessageFormat.format("{0}�ԡ�{1}����ĿԤ�㡣<br>Ԥ���{2,number, currency}"/*<br>����˵��:{3}"*/, user.getUserName(), p.getPrjName(),budgetAmount/*,remark*/));
					this.messageService.save(msg);
					
					outMsg(true, "���Ԥ��");
				}
			}			
			
			outMsg(true, "���Ԥ��");
		} else {
			outMsg(false, "ֻ��Ԥ����Ա���Խ���Ԥ������");
		}
	}

	/**
	 * �ܹ����
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
				outMsg(false, "ȱ�������ʶ");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "δ�ҵ�ָ����Ŀ����");
				}else{
					String result = request.getParameter("result");
					String remark = request.getParameter("remark");
					boolean passed = "1".equals(result); 
					if(passed){
						p.setAudit(true);//������˱��
						p.setCheckDate(new Date());//�����������
						this.service.save(p);
					}
					Message msg = new Message();
					msg.setGroupID(id);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					msg.setMessage(MessageFormat.format("{0}�ԡ�{1}����Ŀ������ˡ�<br>��˽����{2}<br>����˵��:{3}", user.getUserName(), p.getPrjName(),passed?"ͨ��":"��ͨ��",remark));
					this.messageService.save(msg);
					
					outMsg(true, "��˽�����ύ");
				}
			}			
		} else {
			outMsg(false, "ֻ���ܹ��ͼƻ���Ա���������Ŀ");
		}
	}

	/**
	 * ��ͼ
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
				outMsg(false, "ȱ�������ʶ");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "δ�ҵ�ָ����Ŀ����");
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
					msg.setMessage(MessageFormat.format("{0}�ԡ�{1}����Ŀ��ͼ��<br>����˵��:{2}", user.getUserName(), p.getPrjName(),remark));
					this.messageService.save(msg);
					
					outMsg(true, "��ɳ�ͼ");
				}
			}			
		} else {
			outMsg(false, "ֻ�г�ͼ��Ա����ȷ���ѳ�ͼ");
		}
	}

	/**
	 * �鵵
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
				outMsg(false, "ȱ�������ʶ");
			} else {
				Project p = this.service.getProject(id);
				if(p == null){					
					outMsg(false, "δ�ҵ�ָ����Ŀ����");
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
					msg.setMessage(MessageFormat.format("{0}�ԡ�{1}����Ŀ�鵵��<BR>�鵵��ţ�{2}<br>����˵��:{3}", user.getUserName(), p.getPrjName(),docNO,remark));
					this.messageService.save(msg);
					
					outMsg(true, "��ɹ鵵");
				}
			}			
		} else {
			outMsg(false, "ֻ�й鵵��Ա���Խ��й鵵����");
		}
	}

	/**
	 * ����ȷ��
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
				outMsg(false, "ȱ�ٹ��̱�ʶ");
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
				msg.setMessage(MessageFormat.format("{0}ȷ�ϡ�{1}����Ŀ�տ���Ϣ", user.getUserName(), p.getPrjName()));
				this.messageService.save(msg);
				
				outMsg(true, "����տ�ȷ��");
			}
		} else {
			outMsg(false, "ֻ�в�����Ա����ȷ���տ�");
		}
	}

	/**
	 * �����������ݣ������¹�����Ϣ����
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
