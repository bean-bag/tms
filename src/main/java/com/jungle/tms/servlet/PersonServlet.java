package com.jungle.tms.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.Responder;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Department;
import com.jungle.tms.model.Group;
import com.jungle.tms.model.Person;
import com.jungle.tms.model.Role;
import com.jungle.tms.model.VGroup;
import com.jungle.tms.service.IPersonService;
import com.jungle.tms.service.IVGroupService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class PersonServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041504L;

	private IPersonService service;
	private IVGroupService vgroupService;

	public void setService(IPersonService personService) {
		this.service = personService;
	}

	public void setVgroupService(IVGroupService vgroupService) {
		this.vgroupService = vgroupService;
	}

	/**
	 * 输出指定部门TL列表
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */

	public void personList(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer pid = StringUtil.str2Int(request.getParameter("personID"));
		if (pid != null) {
			outData(this.service.findAllByPerson(pid));
		} else {
			Integer did = StringUtil.str2Int(request.getParameter("deptID"));
			outData(this.service.findAll(did));
		}
	}

	public void personListByDept(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer did = StringUtil.str2Int(request.getParameter("deptID"));
		if (did == null) {
			this.responder.render2Json(true, "未知部门标识", null);
		} else {
			outData(this.service.findAll(did));
		}
	}

	public void personListByPrj(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));

		String jsonString = Responder.GSON.toJson(toNodeList(this.vgroupService
				.findAll(prjID)));
		// String jsonString =
		// Responder.GSON.toJson(toNodeList(this.service.findAllByPrj(prjID),this.vgroupService.findAll(prjID)));
		this.responder.outJsonString(jsonString);// 不包装，直接输出JSON串
	}

	static class Node {
		private String uiProvider = "col";
		private String iconCls;
		private boolean expanded = true;
		private boolean leaf;
		private String name;
		private Integer id;
		private List<Node> children;
		List<Person> member;

		public Node(Department d) {
			this(d.getId(), d.getDeptName(), false);
		}

		public Node(GroupSort s) {
			this(s.ordinal(), s.name(), true);
		}

		public Node(Person p, GroupSort s) {
			this(p.getDepart());
			this.addMember(p, s);
		}

		public Node(Integer id, String name, boolean leaf) {
			this.setId(id);
			this.setName(name);
			this.setLeaf(leaf);
			if (leaf) {
				this.member = new ArrayList<Person>();
			} else {
				this.children = new ArrayList<Node>();
			}
		}

		public String getUiProvider() {
			return uiProvider;
		}

		public void setUiProvider(String uiProvider) {
			this.uiProvider = uiProvider;
		}

		public String getIconCls() {
			return iconCls;
		}

		public void setIconCls(String iconCls) {
			this.iconCls = iconCls;
		}

		public boolean isExpanded() {
			return expanded;
		}

		public void setExpanded(boolean expanded) {
			this.expanded = expanded;
		}

		public boolean isLeaf() {
			return leaf;
		}

		public void setLeaf(boolean leaf) {
			this.leaf = leaf;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public List<Node> getChildren() {
			return children;
		}

		public List<Person> getMember() {
			return member;
		}

		public void addChildren(Node member) {
			if (this.children != null)
				this.children.add(member);
		}

		/**
		 * 给角色添加成员
		 * 
		 * @param member
		 */
		public void addMember(Person member) {
			if (this.member != null) {
				member.setDepart(null);
				member.setRole(null);
				member.setPassword(null);
				member.setProjects(null);
				this.member.add(member);
			}
		}

		/**
		 * 给部门添加成员
		 * 
		 * @param member
		 * @param s
		 */
		public void addMember(Person member, GroupSort s) {
			if (this.children != null) {
				boolean isNew = true;
				for (Node n : this.children) {
					if (n.getId() == s.ordinal()) {
						n.addMember(member);
						isNew = false;
					}
				}
				if (isNew) {
					Node sNode = new Node(s);
					sNode.addMember(member);
					this.addChildren(sNode);
				}
			}
		}
	}

	static class PrjMember {
		private String userName;
		private Integer id;

		public PrjMember(VGroup g) {
			this.setId(g.getId().getId());
			this.setUserName(g.getUserName());
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}
	}

	static abstract class PrjNode {
		private String name;
		private Integer id;
		private String uiProvider = "col";
		private String iconCls;
		private boolean expanded = true;
		private boolean leaf;

		public String getUiProvider() {
			return uiProvider;
		}

		public void setUiProvider(String uiProvider) {
			this.uiProvider = uiProvider;
		}

		public String getIconCls() {
			return iconCls;
		}

		public void setIconCls(String iconCls) {
			this.iconCls = iconCls;
		}

		public boolean isExpanded() {
			return expanded;
		}

		public void setExpanded(boolean expanded) {
			this.expanded = expanded;
		}

		public boolean isLeaf() {
			return leaf;
		}

		public void setLeaf(boolean leaf) {
			this.leaf = leaf;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}
	}

	static class PrjRole extends PrjNode {
		List<PrjMember> member;

		public PrjRole(VGroup g) {
			this.setId(g.getId().getSort().ordinal());
			this.setName(g.getId().getSort().name());
			this.setLeaf(true);
			this.member = new ArrayList<PrjMember>();
			this.member.add(new PrjMember(g));
		}

		public int size() {
			return this.member.size();
		}

		public void add(PrjMember pr) {
			this.member.add(pr);
		}
		public void add(VGroup pr) {
			this.member.add(new PrjMember(pr));
		}

	}

	static class PrjDepart extends PrjNode {
		List<PrjRole> children;

		public PrjDepart(VGroup g) {
			this.setId(g.getDepart().getId());
			this.setName(g.getDepart().getDeptName());
			this.setLeaf(false);
			this.children = new ArrayList<PrjRole>();
			this.children.add(new PrjRole(g));
		}

		public int size() {
			return this.children.size();
		}

		public void add(PrjRole pr) {
			this.children.add(pr);
		}
		public void add(VGroup g) {
			this.children.add(new PrjRole(g));
		}

		public PrjRole get(int i) {
			return this.children.get(i);
		}
	}

	private static List<PrjNode> toNodeList(List<VGroup> gList) {
		List<PrjNode> group = new ArrayList<PrjNode>();
		for (VGroup g : gList) {
			if(g ==null) continue;
			// 部门
			boolean newDepart = true;
			for (int i = 0; i < group.size(); i++) {
				PrjDepart depart = (PrjDepart) group.get(i);
				if (depart.getId() == g.getDepart().getId()) {// 指定部门已存在
					newDepart = false;
					// 角色
					boolean newRole = true;
					for (int j = 0; j < depart.size(); j++) {
						PrjRole role = (PrjRole) depart.get(j);
						if (role.getId().intValue() == g.getId().getSort().ordinal()) {// 指定角色已存在
							newRole = false;
							role.add(g);// 添加成员
							break;
						}
					}
					if (newRole) {// 角色不存在，创建新的
						depart.add(g);
					}
					break;
				}
			}
			if (newDepart) {// 部门不存在，创建新的
				group.add(new PrjDepart(g));
			}
		}
		return group;
	}

	static List<Node> toNodeList(List<Person> pList, List<Group> gList) {
		Map<Integer, GroupSort> pMap = new HashMap<Integer, GroupSort>();

		for (Group g : gList) {
			if (GroupSort.MINORDEPART.ordinal() < g.getSort().ordinal()) {
				pMap.put(g.getMemberID(), g.getSort());
			}
		}
		List<Node> res = new ArrayList<Node>();
		Map<Department, Integer> idx = new HashMap<Department, Integer>();
		for (Person p : pList) {
			Department d = p.getDepart();
			Integer i = idx.get(d);
			if (i == null) {
				i = idx.size();
				idx.put(d, i);

				res.add(new Node(p, pMap.get(p.getId())));
			} else {
				res.get(i).addMember(p, pMap.get(p.getId()));
			}
		}
		return res;
	}

	/**
	 * 设计室主任列表
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void officerList(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		outData(this.service.findOfficers());
	}

	public void personListAll(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		outData(this.service.findAll());
	}

	public void personSubmit(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isAdmin()) {
			Person person = new Person();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				person.setId(id);
				if (id == 0) {
					outMsg(false, "不能修改超级管理员");
				}
			}
			String pn = request.getParameter("userName");
			if (pn != null) {
				person.setUserName(pn);
			}
			String pf = request.getParameter("userCode");
			if (pf != null) {
				person.setUserCode(pf);
			}
			String pw = request.getParameter("password");
			if (pw != null) {
				person.setPassword(pw);
			}
			Integer deptid = StringUtil.str2Int(request.getParameter("deptID"));
			if (deptid != null) {
				person.setDepart(new Department(deptid));
			}
			Integer tl = StringUtil.str2Int(request.getParameter("teamLeader"));
			person.setTeamLeader(tl != null && tl.intValue() == 1);

			Integer role = StringUtil.str2Int(request.getParameter("role"));
			if (role != null) {
				person.setRole(new Role(role));
			}

			this.service.save(person);
			outMsg(true, null);
		} else {
			outMsg(false, "只有系统管理员可以维护部门信息");
		}
	}

	public void personDelete(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isAdmin()) {
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == 0) {
				outMsg(false, "不能删除超级管理员");
			} else if (id != null) {
				this.service.delete(id);
				outMsg(true, null);
			} else {
				outMsg(false, "未知参数");
			}
		} else {
			outMsg(false, "只有系统管理员可以维护部门信息");
		}

	}

}
