package com.doobgroup.server.util;


public class SearchParameter {	
	public enum RestrictionType {EQUAL, LIKE, GREATER_THAN, LESS_THAN, NOT_EQUAL, CONTAINS};
	private String fieldName;
	private String searchValue;
	private RestrictionType comparisonOperator;
	
	public SearchParameter(String fieldName, String searchValue, RestrictionType comparisonOperator) {
		this.fieldName = fieldName;
		this.searchValue = searchValue;
		this.comparisonOperator = comparisonOperator;
	}

	public String getSearchValue() {
		return searchValue;
	}

	public RestrictionType getComparisonOperator() {
		return comparisonOperator;
	}

	public String getFieldName() {
		return fieldName;
	}
}