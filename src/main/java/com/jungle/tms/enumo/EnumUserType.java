package com.jungle.tms.enumo;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import org.hibernate.HibernateException;
import org.hibernate.usertype.UserType;

public class EnumUserType<E extends Enum<E>> implements UserType {

	private Class<E> clazz;

	public EnumUserType(Class<E> clazz) {
		this.clazz = clazz;
	}

	@Override
	public int[] sqlTypes() {
		return new int[] { Types.VARCHAR };
	}

	@Override
	public Class<E> returnedClass() {
		return this.clazz;
	}

	@Override
	public boolean equals(Object x, Object y) throws HibernateException {
		if ((x == y) || (x == null && y == null)) {
			return true;
		}
		if ((x == null && y != null) || (x != null && y == null)) {
			return false;
		}
		return x.equals(y);
	}

	@Override
	public int hashCode(Object x) throws HibernateException {
		return x.hashCode();
	}

	@Override
	public Object nullSafeGet(ResultSet rs, String[] names, Object owner)
			throws HibernateException, SQLException {
		E result = null;
		String val;
		if (!rs.wasNull() && (val = rs.getString(names[0])) != null) {
			try {
				result = Enum.valueOf(clazz, val.toUpperCase());
			} catch (IllegalArgumentException e) {
			}
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void nullSafeSet(PreparedStatement st, Object value, int index)
			throws HibernateException, SQLException {
		if (value == null) {
			st.setNull(index, Types.VARCHAR);
		} else {
			st.setString(index, ((Enum<E>) value).name());
		}
	}

	@Override
	public Object deepCopy(Object value) throws HibernateException {
		return value;
	}

	@Override
	public boolean isMutable() {
		return false;
	}

	@Override
	public Serializable disassemble(Object value) throws HibernateException {
		return (Serializable) value;
	}

	@Override
	public Object assemble(Serializable cached, Object owner)
			throws HibernateException {
		return cached;
	}

	@Override
	public Object replace(Object original, Object target, Object owner)
			throws HibernateException {
		return original;
	}
}