package com.jungle.tms.utils;

import java.io.File;

import com.jungle.tms.servlet.UploadFileServlet;

public class FileInfo {

	private String path;
	private String category;
	private String subID;
	private String name;
	private String type;
	private long size;

	public FileInfo(File file,String category) {
		this.setPath(file.getPath());
		this.setCategory(category);
		if(UploadFileServlet.Category.design.name().equals(category)){			
			this.setSubID(file.getParentFile().getName().substring(4));
		}
		this.setName(file.getName());
		this.setSize(file.length());
		this.setType(getExtension(file.getName(), ""));
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSubID() {
		return subID;
	}

	public void setSubID(String subID) {
		this.subID = subID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public static String getExtension(String filename, String defExt) {
		if ((filename != null) && (filename.length() > 0)) {
			int i = filename.lastIndexOf('.');

			if ((i > -1) && (i < (filename.length() - 1))) {
				return filename.substring(i + 1);
			}
		}
		return defExt;
	}
}
