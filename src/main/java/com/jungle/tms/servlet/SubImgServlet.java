package com.jungle.tms.servlet;

import java.io.IOException;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.Constants;
import com.jungle.tms.model.Imgsize;
import com.jungle.tms.model.Imgtype;
import com.jungle.tms.model.Message;
import com.jungle.tms.model.Message.MsgType;
import com.jungle.tms.model.Project;
import com.jungle.tms.model.SubImg;
import com.jungle.tms.model.Subprj;
import com.jungle.tms.service.IImgsizeService;
import com.jungle.tms.service.IImgtypeService;
import com.jungle.tms.service.IMessageService;
import com.jungle.tms.service.ISubImgService;
import com.jungle.tms.service.ISubprjService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class SubImgServlet extends AbstractServlet {

	private static final long serialVersionUID = -9075048684338041506L;

	private ISubImgService service;
	private IMessageService messageService;	
	private ISubprjService spService;
	private IImgsizeService isService;
	private IImgtypeService itService;

	public void setService(ISubImgService service) {
		this.service = service;
	}
	
	public void setSpService(ISubprjService spService) {
		this.spService = spService;
	}

	public void setIsService(IImgsizeService isService) {
		this.isService = isService;
	}

	public void setItService(IImgtypeService itService) {
		this.itService = itService;
	}

	public void setMessageService(IMessageService messageService) {
		this.messageService = messageService;
	}

	public void create4designer(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if (user.isDesigner()) {
			Integer id = StringUtil.str2Int(request.getParameter("prjID"));
			String endDate = request.getParameter("endDate");
			Date eDate = null;
			try {
				eDate=Constants.SDF_S.parse(endDate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
			if (id == null) {
				outMsg(false, "缺少工程任务标识");
			} else if(eDate==null){
				outMsg(false,"截止日期数据不正确");
			} else {
				String subBluePrint = request.getParameter("subImgName");
				Integer subprj = StringUtil.str2Int(request.getParameter("subprj"));
				Integer imgtype = StringUtil.str2Int(request.getParameter("imgtype"));
				Integer imgsize = StringUtil.str2Int(request.getParameter("imgsize"));
				Integer imgnum = StringUtil.str2Int(request.getParameter("imgnum"));
				Integer accomplishment = StringUtil.str2Int(request.getParameter("accomplishment"));
				SubImg d = new SubImg();
				d.setProject(new Project(id));
				d.setEndDate(eDate);
				d.setImgnum(imgnum);
				d.setImgsize(imgsize);
				d.setImgtype(imgtype);
				d.setAccomplishment(accomplishment);
				d.setSubprj(subprj);
				d.setSubImgName(subBluePrint);
				
				this.service.save(d);
				Message msg = new Message();
				msg.setGroupID(id);
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}成功创建子项：{1}", user.getUserName(),subBluePrint));				
				this.messageService.save(msg);
				
				outMsg(true, "创建子项成功");
			}
		} else {
			outMsg(false, "只有设计师可以创建子项");
		}		
	}
	public void update4designer(HttpServletRequest request,
			HttpServletResponse response) throws IOException, FileUploadException {
		if (user.isDesigner()) {
			Map<String,String> params = getParamter(request);
			Integer id = StringUtil.str2Int(params.get("id"));
			Integer prjID = StringUtil.str2Int(params.get("prjID"));
			String endDate = params.get("endDate");
			Date eDate = null;
			try {
				eDate=Constants.SDF_S.parse(endDate);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
			if (id == null) {
				outMsg(false, "缺少子项标识");
			} else if(prjID==null){
				outMsg(false, "缺少工程任务标识");
			} else if(eDate==null){
				outMsg(false,"截止日期数据不正确");
			} else {
				String subBluePrint = params.get("subImgName");
				Integer subprj = StringUtil.str2Int(params.get("subprj"));
				Integer imgtype = StringUtil.str2Int(params.get("imgtype"));
				Integer imgsize = StringUtil.str2Int(params.get("imgsize"));
				Integer imgnum = StringUtil.str2Int(params.get("imgnum"));
				Integer accomplishment = StringUtil.str2Int(params.get("accomplishment"));
				SubImg d = new SubImg();
				d.setId(id);
				d.setProject(new Project(prjID));
				d.setEndDate(eDate);
				d.setImgnum(imgnum);
				d.setImgsize(imgsize);
				d.setImgtype(imgtype);
				d.setAccomplishment(accomplishment);
				d.setSubprj(subprj);
				d.setSubImgName(subBluePrint);
				
				this.service.save(d);
				Message msg = new Message();
				msg.setGroupID(id);
				msg.setUserID(user.getId());
				msg.setUserName(user.getUserName());
				msg.setType(MsgType.SYSTEM_MSG);
				msg.setDate(new Date());
				msg.setMessage(MessageFormat.format("{0}成功修改子项：{1}", user.getUserName(),subBluePrint));				
				this.messageService.save(msg);
				
				outMsg(true, "维护子项成功");
			}
		} else {
			outMsg(false, "只有设计师可以维护子项");
		}
	}
	/**
	 * 输出部门列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void subimgList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));		
		outData(this.toList(this.service.findAll(prjID)));
	}	
	
	public void subimgSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		if(user.isAdmin()){
			Imgsize dept = new Imgsize();
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				dept.setId(id);
			}
			String pn = request.getParameter("imgsizeName");
			if (pn != null) {
				dept.setImgsizeName(pn);
			}
			String pf = request.getParameter("profile");
			if (pf != null) {
				dept.setProfile(pf);
			}
			//this.service.save(dept);
			outMsg(true, null);
		}else{
			outMsg(false, "只有系统管理员可以维护子项目信息");
		}
	}
	
	/**
	 * 删除处理
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void subimgDelete(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		if(user.isAdmin()){
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id != null) {
				this.service.delete(id);
				outMsg(true, null);
			}else{
				outMsg(false, "未知参数");
			}			
		}else{
			outMsg(false, "只有系统管理员可以维护子项目信息");
		}
	}
	/**
	 * 校对
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws FileUploadException
	 */
	public void corrector(HttpServletRequest request, HttpServletResponse response) throws IOException, FileUploadException {
		if(user.isDesigner()){
			Integer id = StringUtil.str2Int(request.getParameter("id"));
			if (id == null) {
				outMsg(false, "缺少子项标识");
			}else{			
				Integer prjID = StringUtil.str2Int(request.getParameter("prjID"));
				String subBluePrint = request.getParameter("subImgName");
				String result = request.getParameter("proofed");
				String remark = request.getParameter("remark");
				if(result!=null && result.equals("1")){
					//SubImg d = new SubImg();
					//d.setId(id);
					//d.setProofed(1);
					//d.setProofreader(user.getId());
					this.service.update(id,1,user.getId());
					Message msg = new Message();
					msg.setGroupID(prjID);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					if(remark==null||remark.trim().length()==0){
						msg.setMessage(MessageFormat.format("校对子项：{0}<br>校对结果：通过", subBluePrint));
					}else{
						msg.setMessage(MessageFormat.format("校对子项：{0}<br>校对结果：通过<br>备注：{1}", subBluePrint,remark));
					}
					this.messageService.save(msg);					
				}else{
					Message msg = new Message();
					msg.setGroupID(prjID);
					msg.setUserID(user.getId());
					msg.setUserName(user.getUserName());
					msg.setType(MsgType.SYSTEM_MSG);
					msg.setDate(new Date());
					if(remark==null||remark.trim().length()==0){
						msg.setMessage(MessageFormat.format("校对子项：{0}<br>校对结果：不通过", subBluePrint));
					}else{
						msg.setMessage(MessageFormat.format("校对子项：{0}<br>校对结果：不通过<br>备注：{1}", subBluePrint,remark));
					}
					this.messageService.save(msg);					
				}
				outMsg(true, "校对子项成功");
			}
		}else{
			outMsg(false, "只有设计人员可以校对工作");
		}
	}
	/*=======================================================================================================*/
		
	/*public void evalElapsed(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String date = request.getParameter("date");
		if(date!=null){
			try {
				Date d = Constants.SDF_T.parse(date);
				responder.outMessage(true, String.valueOf(elapsedDate(d)));
			} catch (ParseException e) {
				responder.outMessage(false, "");
			}
		}else{
			responder.outMessage(false, "");
		}
	}
	private static long elapsedDate(Date d){
		return (d.getTime() - System.currentTimeMillis() )/1000/3600/24;
	}*/
	private final static List<String> am = Arrays.asList(new String[]{"0%","25%","50%","75%","100%"});
	
	/*public void accomplishmentList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		java.util.List<am> map = new java.util.ArrayList<am>();
		map.add(new am(0, "0%"));
		map.add(new am(1, "25%"));
		map.add(new am(2, "50%"));
		map.add(new am(3, "75%"));
		map.add(new am(4, "100%"));
		outData(map);
	}*/
	class am{
		public am(Integer id, String text) {
			this.id = id;
			this.text = text;
		}
		private Integer id;
		private String text;
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
	public void allTypeList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		responder.addExtra("imgsize", this.isService.findAll());
		responder.addExtra("imgtype", this.itService.findAll());
		responder.addExtra("subprj", this.spService.findAll());
		outData(null);
	}
	
	private List<SubImgVo> toList(List<SubImg> list){
		List<SubImgVo> re = new ArrayList<SubImgVo>();
		List<Subprj> sp = this.spService.findAll();
		List<Imgsize> is = this.isService.findAll();
		List<Imgtype> it = this.itService.findAll();
		for(SubImg si : list){			
			re.add(new SubImgVo(
					si.getId(),
					si.getProject().getId(),
					si.getSubImgName(),
					toName1(sp,si.getSubprj()),
					toName2(it,si.getImgtype()),
					toName3(is,si.getImgsize()),
					am.get(si.getAccomplishment()),
					si.getSubprj(),
					si.getImgtype(),
					si.getImgsize(),
					si.getImgnum(),
					si.getAccomplishment(),
					si.getCheckDate(),
					//elapsedDate(si.getEndDate()),
					si.getProofed()
					));
		}
		return re;
	}
	private static String toName1(List<Subprj> list,int i){
		for(Subprj sp : list){
			if(i == sp.getId()){
				return sp.getSubprjName();
			}
		}
		return "";
	}
	private static String toName3(List<Imgsize> list,int i){
		for(Imgsize sp : list){
			if(i == sp.getId()){
				return sp.getImgsizeName();
			}
		}
		return "";
	}
	private static String toName2(List<Imgtype> list,int i){
		for(Imgtype sp : list){
			if(i == sp.getId()){
				return sp.getImgtypeName();
			}
		}
		return "";
	}
	
	class SubImgVo{
		public SubImgVo(Integer id, Integer prjID, String subImgName,
				String strSubprj, String strImgtype, String strImgsize,String strAccomplishment,
				Integer subprj, Integer imgtype, Integer imgsize,
				Integer imgnum, Integer accomplishment, Integer checkDate, int proofed) {
			super();
			this.id = id;
			this.prjID = prjID;
			this.subImgName = subImgName;
			this.strSubprj = strSubprj;
			this.strImgtype = strImgtype;
			this.strImgsize = strImgsize;
			this.strAccomplishment = strAccomplishment;
			this.subprj = subprj;
			this.imgtype = imgtype;
			this.imgsize = imgsize;
			this.imgnum = imgnum;
			this.accomplishment = accomplishment;
			this.checkDate = checkDate;
			this.proofed = proofed;
		}
		Integer id;
		Integer prjID;
		String subImgName;
		String strSubprj;
		String strImgtype;
		String strImgsize;
		String strAccomplishment;
		Integer subprj;
		Integer imgtype;
		Integer imgsize;
		Integer imgnum;
		Integer accomplishment;
		Integer checkDate;
		int proofed;
	}
	private static Map<String, String> getParamter(HttpServletRequest request)
			throws FileUploadException, IOException {
		Map<String, String> param = new HashMap<String, String>();
		if (ServletFileUpload.isMultipartContent(request)) {
			DiskFileItemFactory factory = new DiskFileItemFactory();
			// factory.setRepository(docDir);
			factory.setSizeThreshold(1073741824);
			ServletFileUpload sfu = new ServletFileUpload(factory);
			sfu.setHeaderEncoding("GBK");
			sfu.setSizeMax(1073741824L);

			FileItemIterator iter = sfu.getItemIterator(request);
			while (iter.hasNext()) {
				FileItemStream fis = iter.next();
				if ((fis.isFormField())) {
					String value = UploadFileServlet.stream2String(fis.openStream());
					param.put(fis.getFieldName(), value);

				} else if (fis.getName() == null || fis.getName().length() <= 0) {
					continue;
				}
			}
		}
		return param;
	}
	
}
