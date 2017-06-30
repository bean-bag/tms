package com.jungle.tms;

import java.text.SimpleDateFormat;
import java.util.Locale;

public class Constants {
	public final static SimpleDateFormat SDF_S = new SimpleDateFormat("yyyy-MM-dd");
	public final static SimpleDateFormat SDF_L = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public static final SimpleDateFormat SDF_GMT = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss 'GMT'Z",Locale.ENGLISH);
	public static final SimpleDateFormat SDF_T = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");
	
	public final static String LOGIN_VALID_CODE = "LOGIN_VALID_CODE";
	public final static String USER_IN_SESSON = "USER_IN_SESSON";
}
