package com.doobgroup.server.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

import javax.persistence.OneToMany;

public class PostDeserializer {	
	
	private static final String PACKAGE_PREFIX = "com.doobgroup";
	
	HashMap<String, Object> deserializedObjects = new HashMap<String, Object>();
	
	@SuppressWarnings("rawtypes")
	public void postDeserialization(Object object) throws Exception {
		//if the parameter is a collection, restore references for all its elements			
		if (object instanceof Collection) { 
			for (Object collectionItem : (Collection) object) {
				startRestoring(collectionItem);
			}
		} else {
			startRestoring(object); // if the object is java bean, restore its containing references
		}
	}

	private void startRestoring(Object o) throws NoSuchMethodException,
			SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		//we restore references only for the entities from our application model
		if (o != null && o.getClass().getPackage().getName()
						.startsWith(PACKAGE_PREFIX)) {			
			restoreReferences(o);
		}
	}

	@SuppressWarnings("rawtypes")
	private void restoreReferences(Object o) throws NoSuchMethodException,
			SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		
		//remember object to avoid serialization of the same object twice which leads to infinite recursion
		deserializedObjects.put(o.getClass().getSimpleName() + o.hashCode(), o);  
		
		//The object class may have ancestors. Using reflection, we are passing through all object class hierarchy
		if (o != null) {
			Class type = o.getClass();
			do {
				restore(type, o);
				type = type.getSuperclass();
			} while (type != null && !type.equals(Object.class));
		}
	}

	/**
	 * The method iterates through all child collections of passed object.
	 * Each element in the child collection will be set to point to the object as its parent.
	 * In this way, the method will establish bidirectional relations between object and its children.
	 *  
	 * @param type Object class
	 * @param object object whose relations with child objects should be reestablished 
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void restore(Class type, Object object)
			throws NoSuchMethodException, SecurityException,
			IllegalAccessException, IllegalArgumentException,
			InvocationTargetException {
		for (Field f : type.getDeclaredFields()) {
			//among all attributes in the object, we are interested in child collections which are defined as Set objects
			if (f.getType().equals(Set.class)) {
				
				//find getter method to obtain child collection
				Method getter = type.getMethod("get" + capitalizeFirstLetter(f.getName()));
				//get child collection
				Collection childCollection = (Collection) getter.invoke(object);
				// get the name of the method that sets parent
				OneToMany annotation = f.getAnnotation(OneToMany.class);
				if(annotation != null){
				// if the collection is mappedby to "person", then the method we need is "setPerson"				
					String setParentMethodName = "set" + capitalizeFirstLetter(annotation.mappedBy());
					// iterate through child collection to set reference to parent
					if (childCollection != null) {
						for (Object childElement : childCollection) {
							// call child.setXXX(parent);
							Method parentSetter = childElement.getClass().getMethod(
									setParentMethodName, type);
							parentSetter.invoke(childElement, object);
							// map recursively child collections of this child element
							if (!deserializedObjects.containsKey(childElement.getClass().getSimpleName() + childElement.hashCode()))
									restoreReferences(childElement);
						}
					}
				}
			} else if (f.getType().getPackage() != null 	
					&& f.getType().getPackage().getName().startsWith(PACKAGE_PREFIX)) {
				//for ManyToOne attributes, we do not restore reference to this object, but must 
				//recursively restore references between this attribute and its child collections
				
				//find getter method to obtain ManyToOne attribute
				Method getter = type.getMethod("get" + capitalizeFirstLetter(f.getName()));
				//get child collection
				Object referenceObject = getter.invoke(object);
				if (referenceObject != null && 
						!deserializedObjects.containsKey(referenceObject.getClass().getSimpleName() + referenceObject.hashCode())) {					
					restoreReferences(referenceObject);
				}
			}
		}
	}

	/**
	 * Converts first letter of the passed string value to UpperCase
	 * 
	 * @param value
	 *            A string which should be capitalized
	 * @return A string value with the capitalized first letter
	 */
	private String capitalizeFirstLetter(String value) {
		if (value != null && value.length() > 0)
			return value.substring(0, 1).toUpperCase() + value.substring(1);
		else
			return value;
	}

}
