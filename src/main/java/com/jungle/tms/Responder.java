package com.jungle.tms;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Responder {
	public static final String DEFAULT_CHARSET = "GBK";
	public static final Gson GSON = new GsonBuilder()
		.setExclusionStrategies(new ExclusionStrategy(){
		@Override
		public boolean shouldSkipField(FieldAttributes f) {
			return f.getDeclaredClass() == Set.class;
		}
		@Override
		public boolean shouldSkipClass(Class<?> clazz) {
			return false;
		}})
		//.serializeNulls()
		.setDateFormat("yyyy-MM-dd hh:mm:ss")
		.create();

	private HttpServletResponse response;
	
	private String charset = DEFAULT_CHARSET;
	//private String contentType = "application/json";
	private String contentType = "text/html";

	private Map<String,Object> extraMap = new HashMap<String,Object>();
	
	public Responder(HttpServletResponse response) {
		this.response = response;
	}

	public String getCharset() {
		return charset;
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}
	
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public void addExtraMap(Map<String, Object> extraMap) {
		if(extraMap != null)
			this.extraMap.putAll(extraMap);
	}
	
	public void addExtra(String key, Object value) {		
		this.extraMap.put(key, value);
	}
	
	
	public void doHtmlResponse() throws IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding(this.getCharset());

		PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the GET method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

	/**
	 * 输入已封装好的json串
	 * 
	 * @param jsonString
	 * @throws IOException
	 */
	public void outJsonString(String jsonString) throws IOException {
		response.setContentType(this.getContentType());
		response.setCharacterEncoding(this.getCharset());
		PrintWriter out = null;
		try {
			out = response.getWriter();
			out.write(jsonString);
			out.flush();
		} finally {
			if (out != null)
				out.close();
		}

	}

	/**
	 * 输出数据
	 * 
	 * @param data
	 * @throws IOException
	 */
	//public void outData(Object data) throws IOException {
	//	this.render2Json(true, null, data);
	//}

	/**
	 * 输入 操作成功与否标识、消息、数据集
	 * 
	 * @param flag
	 * @param message
	 * @param data
	 * @throws IOException
	 */
	public void render2Json(boolean flag, String message, Object data)
			throws IOException {
		response.setContentType(this.getContentType());
		response.setCharacterEncoding(this.getCharset());
		PrintWriter out = null;
		try {
			out = response.getWriter();
			out.write("{");

			writeSuccess(out,flag);
			writeMessage(out,message);
			writeData(out,data);
			writeMap(out,extraMap);
			
			out.write("}");
			out.flush();
		} finally {
			if (out != null)
				out.close();
		}
	}

	/**
	 * 输入 操作成功与否标识、消息
	 * 
	 * @param flag
	 * @param message
	 * @throws IOException
	 */
	public void outMessage(boolean flag, String message) throws IOException {
		response.setContentType(this.getContentType());
		response.setCharacterEncoding(this.getCharset());
		PrintWriter out = null;
		try {

			out = response.getWriter();
			out.write("{");

			writeSuccess(out,flag);
			writeMessage(out,message);

			out.write("}");
			out.flush();
		} finally {
			if (out != null)
				out.close();
		}
	}

	/**
	 * 输入 操作成功与否标识、消息、记录条数、数据集
	 * 
	 * @param flag
	 * @param message
	 * @param count
	 * @param data
	 * @throws IOException
	 */
	public void render2Json(boolean flag, String message, long count, Object data)
			throws IOException {
		response.setContentType(this.getContentType());
		response.setCharacterEncoding(this.getCharset());
		PrintWriter out = null;
		try {
			out = response.getWriter();
			out.write("{");

			writeSuccess(out,flag);
			writeMessage(out,message);
			writeCount(out,count);
			writeData(out,data);
			writeMap(out,extraMap);
			
			out.write("}");
			out.flush();
		} finally {
			if (out != null)
				out.close();
		}
	}
	public void render2Json(boolean flag, String message, long count, long start,Object data)
			throws IOException {
		response.setContentType(this.getContentType());
		response.setCharacterEncoding(this.getCharset());
		PrintWriter out = null;
		try {
			out = response.getWriter();
			out.write("{");

			writeSuccess(out,flag);
			writeMessage(out,message);
			writeCount(out,count);
			writeStart(out,start);
			writeData(out,data);
			writeMap(out,extraMap);
			
			out.write("}");
			out.flush();
		} finally {
			if (out != null)
				out.close();
		}
	}

	private static void writeSuccess(PrintWriter out, boolean flag) throws IOException {
		if (flag)
			out.write("\"success\":true");
		else
			out.write("\"success\":false");
	}

	private static void writeMessage(PrintWriter out, String msg) throws IOException {
		if (null != msg) {
			out.write(",\"message\":");
			out.write(GSON.toJson(msg));
		}
	}

	private static void writeCount(PrintWriter out, long count) throws IOException {
		out.write(",\"total\":");
		out.write(String.valueOf(count));
	}

	private static void writeStart(PrintWriter out, long count) throws IOException {
		out.write(",\"start\":");
		out.write(String.valueOf(count));
	}
	
	private static void writeData(PrintWriter out, Object data) throws IOException {
		if (null != data) {
			out.write(",\"data\":");
			out.write(GSON.toJson(data));
		}
	}

	private static void writeMap(PrintWriter out, Map<String, Object> map) throws IOException {
		if (null != map) {
			Iterator<Entry<String, Object>> ite = map.entrySet().iterator();
			while (ite.hasNext()) {
				Entry<String, Object> entry = ite.next();
				Object obj = entry.getValue();
				if (null != obj) {
					out.write(",\"");
					out.write(entry.getKey());
					out.write("\":");
					out.write(GSON.toJson(obj));
				}
			}
		}
	}
	
	public static void main(String[] arg){
		String a = "D:\\java\\workspace.indigo\\tms\\WebRoot\\META-INF\\MANIFEST.MF";
		System.out.println(toHref(a));
	}
	
	public static String toHref(String path){
		if(path == null || path.trim().length()<3){
			return null;
		}
		StringBuffer sb = new StringBuffer();
		sb.append("file:\\\\127.0.0.1\\");
		sb.append(path.charAt(0));
		sb.append("$");
		sb.append(path.substring(2,path.lastIndexOf("\\")));
		
		return sb.toString();
	}
}
