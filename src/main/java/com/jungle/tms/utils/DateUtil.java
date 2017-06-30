package com.jungle.tms.utils;

import java.util.Calendar;
import java.util.Date;

import com.jungle.tms.Constants;

public class DateUtil {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		print(getWeek(new Date()));
		System.out.println();
		print(getMonth(new Date()));
	}
	public static void print(Date[] date){
		System.out.println(Constants.SDF_L.format(date[0]));
		System.out.println(Constants.SDF_L.format(date[1]));
	}
	public static Date[] getWeek(Date date){
		Calendar cale = Calendar.getInstance();
		cale.setFirstDayOfWeek(Calendar.MONDAY);
		cale.setTime(date);
		cale.clear(Calendar.HOUR_OF_DAY);
		cale.clear(Calendar.MINUTE);
		cale.clear(Calendar.SECOND);
		cale.clear(Calendar.MILLISECOND);
		cale.set(Calendar.DAY_OF_WEEK, cale.getFirstDayOfWeek());
		Date sd = cale.getTime();
		cale.add(Calendar.DAY_OF_YEAR, 6);
		return new Date[]{sd,cale.getTime()};
	}
	public static Date[] getMonth(Date date){
		Calendar cale = Calendar.getInstance();
		cale.setTime(date);
		cale.clear(Calendar.HOUR_OF_DAY);
		cale.clear(Calendar.MINUTE);
		cale.clear(Calendar.SECOND);
		cale.clear(Calendar.MILLISECOND);
		
		cale.set(Calendar.DAY_OF_MONTH, 1);
		Date sd = cale.getTime();
		int num = cale.getActualMaximum(Calendar.DAY_OF_MONTH);
		cale.set(Calendar.DAY_OF_MONTH, num);
		return new Date[]{sd,cale.getTime()};
	}
}
