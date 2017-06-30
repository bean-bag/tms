package com.jungle.tms;

import java.io.File;
import java.io.FileFilter;
import java.util.Date;

public class TestGSON {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//budgetOper[] src = new budgetOper[]{budgetOper.show};
		//System.out.println(Responder.GSON.toJson(src));
		updateDocDir("d://doc");
	}
	public static void updateDocDir(String path){
		
		File[] dirs = new File(path).listFiles(new FileFilter(){
			@Override
			public boolean accept(File pathname) {
				return pathname.isDirectory();//遍历项目目录
			}});		
		for(File dir : dirs){
			File[] dirs2 = dir.listFiles(new FileFilter(){
				@Override
				public boolean accept(File pathname) {
					return pathname.isDirectory()&& pathname.getName().startsWith("sub_");
				}}
			);
			for(File dir2 : dirs2){
				String name = dir2.getName();
				if("sub_budget".equals(name)){//修改预算目录
					dirMove(dir2, new File(dir2.getParentFile(),"budget"));
				}else{//修改设计文档目录
					File kk = new File(dir2.getParentFile(),"design");
					if(!kk.exists()){
						kk.mkdir();
					}
					dirMove(dir2, new File(kk,name));
				}
			}
		}
	}
	
	public static void dirMove(File src,File dest){
		if(dest.exists()&&dest.isDirectory()){
			File[] list = src.listFiles(new FileFilter(){
				@Override
				public boolean accept(File pathname) {
					return pathname.isFile();
				}});
			for(File file : list){
				file.renameTo(new File(dest,file.getName()));
				System.out.println(file.getAbsolutePath());
				System.out.println(dest.getAbsolutePath()+File.pathSeparatorChar+file.getName());
				System.out.println();
			}
			src.delete();
			System.out.println(src.getAbsolutePath());
		}else{
			src.renameTo(dest);
			System.out.println(src.getAbsolutePath());
			System.out.println(dest.getAbsolutePath());
			System.out.println();
		}
	}
	
	enum budgetOper{
		show
	}
	
	public static void aa(){
		Date a1 = new Date();
		Date a2  = new Date();
		Date b1  = new Date();
		Date b2  = new Date();
		
		boolean a = 
				   ((a1.getTime() < b1.getTime()) && a1.getTime() < b2.getTime())
				|| ((a1.getTime() > b1.getTime()) && a1.getTime() < b2.getTime())
				|| ((b1.getTime() > a1.getTime()) && b1.getTime() < a2.getTime())
				|| ((b1.getTime() > a1.getTime()) && b1.getTime() < a2.getTime());
		
		System.out.println(a);
	}
}
