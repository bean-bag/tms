package com.jungle.tms.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import com.jungle.framework.core.web.AbstractServlet;
import com.jungle.tms.Constants;
import com.jungle.tms.model.Message;
import com.jungle.tms.model.MessageSeq;
import com.jungle.tms.model.Message.MsgType;
import com.jungle.tms.service.IMessageService;
import com.jungle.tms.utils.StringUtil;
import com.jungle.tms.web.AbstractServlet;

public class MessageServlet extends AbstractServlet {

	private static final long serialVersionUID = 8850630050418567737L;
	
	private IMessageService service;

	public IMessageService getService() {
		return service;
	}

	public void setService(IMessageService service) {
		this.service = service;
	}
	
	public void userOnline(HttpServletRequest request, HttpServletResponse response) throws IOException{
		this.outData(new java.util.ArrayList<Message>());
	}
	public void messageList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer groupID = StringUtil.str2Int(request.getParameter("groupID"));
		Integer maxno = StringUtil.str2Int(request.getParameter("mxno"));
		if(maxno==null){
			MessageSeq ms = this.service.getSeq(groupID, user.getId());
			maxno = (ms==null)?new Integer(0):ms.getMaxNO();
		}else{
			this.service.stamp(groupID, user.getId(), maxno);
		}
		
		outData4polling(this.service.find(groupID, maxno));
	}
	public void messageHisList(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		Integer groupID = StringUtil.str2Int(request.getParameter("groupID"));
		Integer start = StringUtil.str2Int(request.getParameter("page.start"));
		Integer limit = StringUtil.str2Int(request.getParameter("page.limit"));
		String strDate = request.getParameter("date");
		
		java.util.Date date = null;
		if(!(strDate == null || strDate.trim().length()==0)){
			date = Constants.SDF_S.parse(strDate);
		}
		
		this.responder.render2Json(true, "", this.service.findHisCount(groupID, date), this.service.findHis(groupID,date,start,limit));				
	}
	
	public void messageSubmit(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer groupID = StringUtil.str2Int(request.getParameter("groupID"));
		String message = request.getParameter("message");
		
		Message msg = new Message();
		msg.setDate(new java.util.Date());
		msg.setGroupID(groupID);
		msg.setUserID(user.getId());
		msg.setUserName(user.getUserName());
		msg.setMessage(message);
		msg.setType(MsgType.USER_MSG);
		
		this.service.save(msg);
		this.outMsg(true, "ok");
	}
	public void messagePolling(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Integer groupID = StringUtil.str2Int(request.getParameter("groupID"));
		Integer userID = StringUtil.str2Int(request.getParameter("userID"));
		Integer seq = StringUtil.str2Int(request.getParameter("mxno"));
		int num = service.pollingMessage(groupID, userID, seq);
		
		this.responder.addExtra("msgNum", num);
		this.responder.render2Json(true, null, null);
	}

}
