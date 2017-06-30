package com.jungle.tms.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.jungle.tms.Responder;
import com.jungle.tms.utils.FileInfo;

/**
 * Servlet implementation class UploadFileServlet
 */
public class UploadFileServlet extends HttpServlet {
	public static enum Category{
		design,
		budget
	}
	private static final long serialVersionUID = 6640607800846917450L;
	private final static Log log = LogFactory.getLog(UploadFileServlet.class);
	private static File docDir;

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		super.init(config);

		String abs = getInitParameter("absolute");
		String dir = getInitParameter("file_dir");
		String app = this.getServletContext().getRealPath("/");
		
		if(Boolean.parseBoolean(abs)){
			docDir = new File(dir);	
		}else{
			docDir = new File(app, dir);
		}
		
		if(docDir.exists()){
			if(docDir.isFile()){
				throw new ServletException("配置的上传文件目录指上一个文件的路径!");
			}
		}else{		
			docDir.mkdirs();
		}
		
		log.info(MessageFormat.format("上传文件存放目录 = {0}", docDir.getAbsolutePath()));
	}

	public static Map<String,String> getParameter(HttpServletRequest request) throws IOException{
		Map<String,String> params = new HashMap<String, String>();
		DiskFileItemFactory factory = new DiskFileItemFactory();
		//factory.setRepository(docDir);
		//factory.setSizeThreshold(1073741824);
		ServletFileUpload sfu = new ServletFileUpload(factory);
		sfu.setHeaderEncoding("GBK");
		//sfu.setSizeMax(1073741824L);
		try{
		FileItemIterator iter = sfu.getItemIterator(request);
		while (iter.hasNext()) {
			FileItemStream fis = iter.next();					
			if ((fis.isFormField())) {
				String value = stream2String(fis.openStream());
				params.put(fis.getFieldName(), value);
			}
		}
		}catch(FileUploadException e){};
		return params;
	}
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String method = request.getParameter("method");
		if("fileList".equals(method)){
			this.fileList(request, response);
		}else if("upload".equals(method)){
			this.upload(request, response);
		}else if("download".equals(method)){
			this.download(request, response);
		}else if("delFile".equals(method)){
			this.delFile(request, response);
		}else{
			Responder resp = new Responder(response);
			resp.setContentType("text/html");
			resp.outMessage(false, "none method");
		}
	}

	private static String contentType = "application/x-msdownload";

	protected void download(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String prjID = request.getParameter("prjID");
		String category = request.getParameter("category");
		String subID = request.getParameter("subID");
		File filePath = buildDir(prjID,category,subID);
		String file_name = request.getParameter("file_name");
		String fileName = new String(file_name.getBytes("iso-8859-1"),"GBK");

		File file = new File(filePath, fileName);

		if (file.exists()) {
			response.reset();
			response.setContentType(contentType);
			response.addHeader("Content-Disposition", "attachment; filename=\"" + file_name + "\"");
			int fileLength = (int) file.length();
			response.setContentLength(fileLength);
			if (fileLength != 0) {
				InputStream inStream = null;
				ServletOutputStream servletOS = null;
				try {
					inStream = new FileInputStream(file);
					byte[] buf = new byte[4096];
					servletOS = response.getOutputStream();
					int readLength;
					while (((readLength = inStream.read(buf)) != -1)) {
						servletOS.write(buf, 0, readLength);
					}
				} catch (Exception e) {
					log.error(e, e);
				} finally {
					try {
						inStream.close();
						servletOS.flush();
						servletOS.close();
					} catch (Exception e) {
						log.error(e, e);
					}
				}
			}
		}
	}
		
	protected void upload(HttpServletRequest request,
				HttpServletResponse response) throws ServletException, IOException {
		Responder resp = new Responder(response);
		resp.setContentType("text/html");

		if (ServletFileUpload.isMultipartContent(request)) {
			DiskFileItemFactory factory = new DiskFileItemFactory();
			factory.setRepository(docDir);
			factory.setSizeThreshold(1073741824);
			ServletFileUpload sfu = new ServletFileUpload(factory);
			sfu.setHeaderEncoding("GBK");
			sfu.setSizeMax(1073741824L);
			
			File tmp = File.createTempFile(String.valueOf(System.currentTimeMillis()), "bak");
			
			try {
				Map<String, String> param = new HashMap<String, String>();
				FileItemIterator iter = sfu.getItemIterator(request);
				while (iter.hasNext()) {
					FileItemStream fis = iter.next();
					if ((fis.isFormField())) {
						String value = stream2String(fis.openStream());
						param.put(fis.getFieldName(), value);
						
						log.debug(MessageFormat.format("{0}\t{1}",fis.getFieldName(),value));
						
					} else if (fis.getName()==null||fis.getName().length() <= 0) {
						continue;
					} else {
						int index = fis.getName().lastIndexOf("\\");
						String fileName = fis.getName().substring(index + 1);
						
						log.debug(MessageFormat.format("{0}\t{1}",fis.getFieldName(),fileName));
						param.put("_file_name", fileName);
						//File file = buildFile(prjID,category,sub,fileName);						
						
						BufferedInputStream in = null;
						BufferedOutputStream out = null;
						try {
							in = new BufferedInputStream(fis.openStream());
							out = new BufferedOutputStream(new FileOutputStream(tmp));
							Streams.copy(in, out, true);							
						} finally {
							if (out != null) {
								out.close();
							}
							if (in != null) {
								in.close();
							}
						}
					}
				}
				String prjID = param.get("prjID");
				if(prjID == null){//XXX bug
					prjID = param.get("id");
				}
				String category = param.get("category");
				String sub = null;
				if(Category.design.name().equals(category)){
					sub = param.get("id");
				}
				File file = new File(buildDir(prjID,category,sub),param.get("_file_name"));
				tmp.renameTo(file);
				
				resp.addExtra("fileInfo", new FileInfo(file,category));
				resp.render2Json(true, null, null);
			
			} catch (FileUploadException e) {
				resp.outMessage(false, e.getMessage());
			}
		} else {
			resp.outMessage(false, "not multipart form");
		}
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

	public void delFile(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		Responder out = new Responder(response);
		out.setContentType("text/html");
		
		String prjID = request.getParameter("prjID");
		String category = request.getParameter("category");
		String subID = request.getParameter("subID");
		String name = request.getParameter("name");
		if(prjID == null||category == null || name == null){
			out.outMessage(false, "false");
		}else{
			try{
				File dir = buildDir(prjID,category,subID);
				File file = new File(dir,name);
				file.delete();
				out.outMessage(true, "OK");
			}catch(Exception e){
				out.outMessage(false, e.getMessage());
			}			
		}
	}
	public void fileList(HttpServletRequest request,
				HttpServletResponse response) throws ServletException, IOException {
		String prjID = request.getParameter("prjID");
		String category = request.getParameter("category");
		String subID = request.getParameter("subID");
		File dir = buildDir(prjID,category,subID);
		List<FileInfo> list = new ArrayList<FileInfo>();
		
		if (Category.design.name().equals(category) && (subID == null || subID.trim().length() == 0)) {// 列出所有子图
			File[] files = dir.listFiles(new FileFilter(){
				@Override
				public boolean accept(File pathname) {
					return pathname.isDirectory();
				}});
			
			for(File tmp : files){
				File[] files2 = tmp.listFiles(new FileFilter(){
					@Override
					public boolean accept(File pathname) {
						return pathname.isFile();
					}});
				for(File tmp2 : files2){
					list.add(new FileInfo(tmp2,category));
				}
			}			
		}else{
			File[] files = dir.listFiles(new FileFilter(){
				@Override
				public boolean accept(File pathname) {
					return pathname.isFile();
				}});
			
			for(File tmp : files){
				list.add(new FileInfo(tmp,category));
			}
		}
		Responder out = new Responder(response);
		out.setContentType("text/html");
		
		out.render2Json(true, null, list);
	}
	
	public static String stream2String(java.io.InputStream stream) {
		StringBuffer sb = new StringBuffer();
		byte[] b = new byte[256];
		int len = 0;
		try {
			while ((len = stream.read(b)) > 0) {
				sb.append(new String(b, 0, len, "GBK"));
			}
		} catch (IOException e) {
			// e.printStackTrace();
		} finally {
			try {
				stream.close();
			} catch (IOException e) {
			}
		}
		return sb.toString();
	}
	
	public static File buildDir(String prjID,String category,String subID){
		File f = new File(docDir,"prj_"+prjID);
		f = new File(f,category);
		if(subID != null && subID.trim().length() > 0){
			f = new File(f,"sub_"+subID);
		}
		if(!f.exists()){
			f.mkdirs();
		}
		return f;
	}
	
	//public static File buildFile(String prjID,String category,String subID,String fileName){
	//	return new File(buildDir(prjID,category,subID),fileName);
	//}	
}
