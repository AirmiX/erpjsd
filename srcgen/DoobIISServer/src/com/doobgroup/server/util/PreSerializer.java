package com.doobgroup.server.util;


import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

import org.hibernate.Hibernate;

public class PreSerializer {

	private static final String PACKAGE_PREFIX = "com.doobgroup.server";

	//Stack prevent recursive dead loop by holding objects nullified in single entity-graph branch
	private Stack<Object> stack = new Stack<Object>(); 
	
	/**
	 * For the specified object, nullify all lazy-loading fields that are not
	 * initialized (fetched from a database)
	 * 
	 * @param object
	 *            An object that should be nullified
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 */
	@SuppressWarnings("rawtypes")
	public void nullifyLazy(Object object) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
		 //prior to the nullification process all object should be marked as not visited
		if (object instanceof Map) { // if the object is a map, nullify each map value
			for (Object mapValue : ((Map)object).values()) {
				nullifySingleObjectRecursively(mapValue);				
			}
		}
		else if (object instanceof Collection) { // if object is a collection,
											// nullify each collection item
			for (Object collectionItem : (Collection) object) {
				nullifySingleObjectRecursively(collectionItem);
			}
		} else
			nullifySingleObjectRecursively(object); // if object is java bean, nullify its fields
	}

	/**
	 * Nullify non-fetched lazy-loading fields defined in the object class and
	 * its ancestors
	 * 
	 * @param object
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 */
	@SuppressWarnings("rawtypes")
	private void nullifySingleObjectRecursively(Object object)
			throws IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, NoSuchMethodException, SecurityException {
		if (object != null) {
			stack.push(object); //remember we nullify this object to prevent recursion
			Class type = object.getClass();
			do {
				//System.out.println("tip: "+type.getCanonicalName());
				nullifySingleObject(type, object);
				type = type.getSuperclass();
			} while (type != null && !type.equals(Object.class));
			stack.pop(); //all the fields of this object have been nullified, so we don't need this object on the stack anymore for this branch
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void nullifySingleObject(Class type, Object object)
			throws IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, NoSuchMethodException, SecurityException {
		for (Field f : type.getDeclaredFields()) {
			//nulify sets and beans from our entity model
			if (f.getType().equals(Set.class)
				|| (f.getType().getPackage() != null 
				&& f.getType().getPackage().getName()
					.startsWith(PACKAGE_PREFIX))) {
				Method getter = type.getMethod("get"
						+ capitalizeFirstLetter(f.getName())); // find get method
				Object fieldInstance;
				//System.out.println("Getter: " + getter.getName() + " u objektu klase " + type);
				if (!Hibernate.isInitialized(fieldInstance = getter.invoke(object)) 
						|| isRecursion(fieldInstance)) { // call get method to check whether a field has been fetched
					//System.out.println("Nije inicijalizovano ili je rekurzija");
					Method setter = type.getMethod("set" + capitalizeFirstLetter(f.getName()), f.getType());
					setter.invoke(object, new Object[] { null }); // call set method to nullify non-fetched lazy-loading field
				} else { // if the field has been fetched, nullify its non  fetched fields
					//System.out.println("Jeste inicijalizovano");//jeste inic i nije rek
					//System.out.println("Vrednost: "+fieldInstance);
					nullifyLazy(fieldInstance);
				}
			}
			/*else{
				if (object instanceof CountryBean) {
					System.out.println("Polje drzave:" + f.getName());	
				}
				
				if (object instanceof PlaceBean) {
					System.out.println("Polje mesta:" + f.getName());	
				}
				
			}*/
		}
	}

	/**
	 * Converts first letter of the passed string value to UpperCase
	 * 
	 * @param value
	 *            A string which should be capitalized
	 * @return A string value with the capitalized first letter
	 */
	public static String capitalizeFirstLetter(String value) {
		if (value != null && value.length() > 0)
			return value.substring(0, 1).toUpperCase() + value.substring(1);
		else
			return value;
	}
	
	/**
	 * The method gives the information whether the nullification goes into recursion 
	 * @param o
	 * @return
	 */
	private boolean isRecursion(Object o) {
		return stack.search(o) != -1; //if the object is already on the stack, we are entering recursion
	}
}
