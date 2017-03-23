package com.doobgroup.server.util;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;

import com.doobgroup.server.util.SearchParameter.RestrictionType;

public class CriteriaUtil {
	@SuppressWarnings("rawtypes")
	public static int addFieldRestriction(Criteria criteria, SearchParameter searchParameter, 
			List<Criterion> criterions, int aliasCounter, 
			Class entityType, Map<String, String> aliases) throws NoSuchFieldException {		
		String key = null;
		
		if (searchParameter.getSearchValue() == null || searchParameter.getSearchValue().equals("")) {
			return aliasCounter;
		}
		
		try {
			Criterion criterion = null;
			Class fieldType = getFieldType(entityType, searchParameter.getFieldName());
			
			if (!searchParameter.getFieldName().contains(".")) {
				criterion = createRestriction(fieldType, searchParameter.getFieldName(), 
						searchParameter.getSearchValue(), searchParameter.getComparisonOperator());
			} else{//there is a proper path, something like province.country.name
				String[] als = searchParameter.getFieldName().split("\\.");//create all the aliases for ordering
				String path = "";
			    String previousAlias = "";
				key = "";//this will be the key under which we keep the alias in the map
			    for (int i = 0; i < als.length - 1; i++) {
					if(i>0){
						previousAlias = als[i-1]+".";
						key+="."+als[i];//key is essential full path, something like "province.country.name"
					}
					else{
						key+=als[i];
					}
					if (!aliases.containsKey(key)) {//if the map does not contain the key, it means that we came across the key for the first time
						criteria.createAlias(previousAlias+als[i],"sal"+aliasCounter, JoinType.LEFT_OUTER_JOIN);//therefore create an alias
						aliases.put(key, "sal"+aliasCounter);//and put the alias name into the map under the key that is a full path
						aliasCounter+=1;

					}
				}
				if(key != null){//if there was a key, meaning if the path was proper
				    //path = "al"+(aliasCounter-1)+"."+als[als.length-1];
					path = aliases.get(key)+"."+als[als.length-1];
					criterion = createRestriction(fieldType, path, 
							searchParameter.getSearchValue(), searchParameter.getComparisonOperator());	 
				}
			}								
			criterions.add(criterion);
		} catch (NoSuchFieldException e) {
			throw e;
		} catch (SecurityException e) {
			throw e;
		} catch (ParseException e) {
			//do nothing if the Date value cannot be parsed
		}
		return aliasCounter;
	}
	
	@SuppressWarnings("rawtypes")
	private static Class getFieldType(Class type, String path) throws NoSuchFieldException {
		Class retVal = type;
		String[] nestedFields = path.split("\\.");
		for (String s: nestedFields) {
			Field field = getField(retVal, s); //get next nested field
			retVal = field.getType(); 
		}
		
		return retVal;
	}
	
	/**
	 * Finds field by name in the class or its superclass
	 * @param type
	 * @param fieldName
	 * @return
	 * @throws NoSuchFieldException
	 */
	@SuppressWarnings("rawtypes")
	private static Field getField(Class type, String fieldName) throws NoSuchFieldException {		
		Field retVal = null;
		try {
			retVal = type.getDeclaredField(fieldName);
		} catch (NoSuchFieldException e) {
			//check for field in the supperclass
			if (type.getSuperclass() != null) {
				retVal = getField(type.getSuperclass(), fieldName);
			} else {				
				throw new NoSuchFieldException();
			}
		} catch (SecurityException e) {
			throw e;
		}
		return retVal;
	}
	
	@SuppressWarnings("rawtypes")
	private static Criterion createRestriction(Class fieldType, String fieldName, 
			String searchValue, RestrictionType comparisonOperator) throws ParseException {
		Object value;
		System.out.println(fieldType+" "+fieldName+" "+searchValue+" "+comparisonOperator);
		//convert field
		if (fieldType.equals(Date.class)) { //for dates use equality operator			
			SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy"); //convert string to date
			Date date = sdf.parse(searchValue);
			
			if (comparisonOperator == RestrictionType.EQUAL) {
				//we ignore time when comparing dates
				//date EQUAL is implemented by checking is the passed value
				//between dd.MM.yyyy 00:00:00 and dd.MM.yyyy 23:59:59 
				
				Calendar calendarFrom = Calendar.getInstance();
				calendarFrom.setTime(date);
				calendarFrom.set(Calendar.HOUR_OF_DAY, 0);
				calendarFrom.set(Calendar.MINUTE, 0);
				calendarFrom.set(Calendar.SECOND, 0);
				
				Calendar calendarTo = Calendar.getInstance();
				calendarTo.setTime(date);
				calendarTo.set(Calendar.HOUR_OF_DAY, 23);
				calendarTo.set(Calendar.MINUTE, 59);
				calendarTo.set(Calendar.SECOND, 59);			
				return Restrictions.between(fieldName, calendarFrom.getTime(), calendarTo.getTime());
			} else {
				value = date;
			}
		} else if (fieldType.equals(Integer.class)) {	//we currently support only search by int numeric field
			value = Integer.valueOf(searchValue);						
		} else if (fieldType.equals(Boolean.class)) {
			value = Boolean.valueOf(searchValue);	
		} else if (fieldType.equals(Long.class)) {
			value = Long.valueOf(searchValue);
		} else if (fieldType.equals(Double.class)) {
			value = Double.valueOf(searchValue);
		} else { //default type is string
			value = searchValue;
		} 		
		
		//create restriction by applying appropriate comparison operator
		switch (comparisonOperator) {
			case EQUAL:	return Restrictions.eq(fieldName, value);
			case GREATER_THAN: return Restrictions.ge(fieldName, value);
			case LESS_THAN: return Restrictions.le(fieldName, value);
			case LIKE: return Restrictions.like(fieldName, value + "%");
			case CONTAINS: return Restrictions.like(fieldName, "%" + value + "%");
			case NOT_EQUAL: return Restrictions.ne(fieldName, value);
			default: return Restrictions.like(fieldName, value + "%");
		}
	}
}
