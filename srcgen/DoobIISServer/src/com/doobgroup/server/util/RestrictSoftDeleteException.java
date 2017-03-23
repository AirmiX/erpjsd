package com.doobgroup.server.util;

public class RestrictSoftDeleteException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3205802526045824570L;
	
	String causeFieldName;
	
	public RestrictSoftDeleteException(String field) {
		super("SoftDeleteException caused by non empty field " + field);
		causeFieldName = field;
	}
}
