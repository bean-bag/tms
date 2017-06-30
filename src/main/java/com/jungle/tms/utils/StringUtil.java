package com.jungle.tms.utils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.jungle.tms.Constants;

public class StringUtil {
	public static boolean isEmpty(String str) {
		return str == null || str.trim().length() == 0;
	}

	public static String ary2str(String a[]) {
		return ary2str(a, ",");
	}

	public static String ary2str(String a[], String separator) {
		StringBuffer result = new StringBuffer();
		result.append(a[0]);
		if (a.length > 0) {
			for (int i = 1; i < a.length; i++) {
				result.append(separator);
				result.append(a[i]);
			}

		}
		return result.toString();
	}

	public static Integer str2Int(String s) {
		if (s == null)
			return null;
		try {
			return Integer.valueOf(Integer.parseInt(s));
		} catch (NumberFormatException e) {
			return null;
		}
	}

	public static Integer[] str2Int(String s[]) {
		if (s == null)
			return new Integer[0];
		List<Integer> list = new ArrayList<Integer>();
		try {
			int j = s.length;
			for (int i = 0; i < j; i++) {
				list.add(Integer.valueOf(Integer.parseInt(s[i])));
			}

		} catch (NumberFormatException numberformatexception) {
		}
		return (Integer[]) list.toArray(new Integer[0]);
	}

	public static Date str2Date(String a) {
		if (a == null)
			return null;
		try {
			return Constants.SDF_S.parse(a);
		} catch (ParseException e) {
			return null;
		}
	}
}