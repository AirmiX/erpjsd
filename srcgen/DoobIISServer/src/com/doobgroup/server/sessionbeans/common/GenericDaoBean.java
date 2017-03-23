package com.doobgroup.server.sessionbeans.common;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import com.doobgroup.server.util.KeyDB;
import com.doobgroup.server.util.PreSerializer;
import com.doobgroup.server.util.RestrictSoftDeleteException;

public abstract class GenericDaoBean<T, ID extends Serializable> implements
GenericDao<T, ID> {

	private static Logger log = Logger.getLogger(GenericDaoBean.class);

	private Class<T> entityType;

	@PersistenceContext(unitName = "doobjsd")
	protected EntityManager em;
	
	public enum DeleteStrategy {CASCADE, RESTRICT};

	@SuppressWarnings("unchecked")
	public GenericDaoBean() {
		entityType = (Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];
	}

	public Class<T> getEntityType() {
		return entityType;
	}

	public T findById(ID id) {
		T entity;
		entity = em.find(entityType, id);
		return entity;
	}
	
	public T validateKey(T newEntity) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		KeyDB searchClass = entityType.getAnnotation(KeyDB.class);
		String fields[] = searchClass.fields();
		
		HashMap<String, Object> queryParams = new HashMap<String, Object>();
		StringBuffer query = new StringBuffer("SELECT x FROM " + entityType.getSimpleName()
		+ " x where x.id is not null");
		
		for (String field : fields) {
			query.append(" and x." + field + "= :" + field);
			Method getter=null;
			getter = entityType.getMethod("get"+field );
			Object fieldInstance = getter.invoke(newEntity);
			queryParams.put(field, fieldInstance);
		}
		
		Query q = em.createQuery(query.toString());	
		//add query parameters previously added into temporary map
		for (String key: queryParams.keySet()) {
			q.setParameter(key, queryParams.get(key));
		}
		
		List<T> result = q.getResultList();
	
		if(result.size() == 1)
			return result.get(0);
		else
			return null;
	}

	public T findByIdConnectedEager(ID id) {
		T entity;
		entity = findByIdEager(id);
		try {
			for (Field f : entityType.getDeclaredFields()) {
				if (!java.lang.reflect.Modifier.isStatic(f.getModifiers())) {
					
					Method getter=null;
					getter = entityType.getMethod("get"+ PreSerializer.capitalizeFirstLetter(f.getName()));
					Object fieldInstance = getter.invoke(entity);

					if (f.getType().getCanonicalName().startsWith("java.util")) {
						log.warn("-------Collection");
						for (Object obj : (Iterable)fieldInstance) {
							initialize(obj);
						}
					} else if (f.getType().getCanonicalName().startsWith("java.doobgroup")){
						log.warn("-------Object");
						initialize(fieldInstance);
					}
					log.warn("######################");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;

		//		log.warn("######################");
		//		//
		//		Query q=em.createQuery("select t from TerritorialUnitTypeBean t left join fetch t.supertype left join fetch t.subtype "
		//				+ "left join fetch t.territorialUnits");
		//		return (T)q.getResultList().get(0);

		//		T entity;
		//		entity = findById(id);
		//		Hibernate.initialize(entity);
		//		try {
		//			for (Field f : entityType.getDeclaredFields()) {
		//				 if (!java.lang.reflect.Modifier.isStatic(f.getModifiers())) {
		//				        Method getter=null;
		//						try {
		//							getter = entityType.getMethod("get"+ PreSerializer.capitalizeFirstLetter(f.getName()));
		//							Object fieldInstance = getter.invoke(entity);
		//							if (!Hibernate.isInitialized(fieldInstance)) {
		//								Hibernate.initialize(fieldInstance);
		//							}
		//						} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException
		//								| InvocationTargetException | HibernateException e) {
		//							e.printStackTrace();
		//						}
		//				 }
		//			}
		//		} catch (Exception e) {
		//			e.printStackTrace();
		//		}
		//		return entity;
	}

	private void initialize(Object obj) throws Exception{
		log.warn("obj is of type " + obj.getClass());
		Hibernate.initialize(obj);

		for (Field fObj : obj.getClass().getDeclaredFields()) {
			if (!java.lang.reflect.Modifier.isStatic(fObj.getModifiers())) {
				Method gettero=null;
				gettero = obj.getClass().getMethod("get"+ PreSerializer.capitalizeFirstLetter(fObj.getName()));

				log.warn("obj has method " + gettero);									
				Object fieldInstanceObj = gettero.invoke(obj);
				log.warn("found instance");
				if (!Hibernate.isInitialized(fieldInstanceObj)) {
					log.warn("instance is not initialized");
					Hibernate.initialize(fieldInstanceObj);
				}
			}
		}

	}

	public T findByIdEager(ID id) {
		T entity;
		entity = findById(id);		
		Hibernate.initialize(entity);
		try {
			for (Field f : entityType.getDeclaredFields()) {
				if (!java.lang.reflect.Modifier.isStatic(f.getModifiers())) {
					Method getter=null;
					try {						
						getter = entityType.getMethod("get"+ PreSerializer.capitalizeFirstLetter(f.getName()));
						//if(getter != null && entity != null) {
							Object fieldInstance = getter.invoke(entity);
							if (!Hibernate.isInitialized(fieldInstance)) {
								Hibernate.initialize(fieldInstance);
							}
						//}
					} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException
							| InvocationTargetException | HibernateException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		Query q = em.createQuery("SELECT x FROM " + entityType.getSimpleName()
				+ " x");
		List<T> result = q.getResultList();
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<T> findBy(String query) {		
		Query q = em.createQuery(query);
		List<T> result = q.getResultList();
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<T> findByWithParameters(String query, Map<String, Object> parameters) {
		Query q = em.createQuery(query);
		for (String paramName: parameters.keySet()) {
			q.setParameter(paramName, parameters.get(paramName));
		}
		List<T> result = q.getResultList();
		return result;		
	}

	
	
	public T persist(T entity) {
		em.persist(entity);
		return entity;
	}

	public T merge(T entity) {
		entity = em.merge(entity);
		return entity;
	}
/*
	public void remove(T entity) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		try {
			// Logically deletes entities if 'deleted' field exist			
			Method setter = entity.getClass().getMethod("setDeleted", Boolean.class); 			
			setter.invoke(entity, true);
			log.warn("LOGICALY DELETING");
			em.merge(entity);
		} catch (NoSuchMethodException ex) {
			// Physically deletes entities otherwise
			log.warn("PHISICALLY DELETING ");
			ex.printStackTrace();
			log.warn("-------------------- ");
			entity = em.merge(entity);
			em.remove(entity);	
			
		}	
	}*/

	@Override
	public Long count() {
		Query query = em.createQuery("SELECT count(*) FROM " + entityType.getSimpleName() + " x");
		return (Long) query.getResultList().get(0);
	}

	protected Session getHibernateSession() {
		return em.unwrap(org.hibernate.Session.class);
	}

	public void flush() {
		em.flush();
	}

	public void clear() {
		em.clear();
	}

	/*@Override
	public T remove(ID id) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		T entity = findById(id);
		remove(entity);
		return entity;
	}*/
	
	@Override
	public void remove(ID id) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		//default delete strategy is RESTRICT
		remove(id, DeleteStrategy.RESTRICT);
	}
	
	@Override
	public void remove(T entity) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		//default delete strategy is RESTRICT
		remove(entity, DeleteStrategy.RESTRICT, null);
	}
	
	
	
	@Override
	/**
	 * @param entity
	 * 		entity to be deleted
	 * @param deleteStrategy 
	 * 		A strategy for related entities
	 */
	public void remove(T entity, DeleteStrategy deleteStrategy, List<String> escapeFields) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		try {
			//if strategy is RESTRICT, forbid deletion if there are any related entities
			if (deleteStrategy == DeleteStrategy.RESTRICT) {
				String field = hasNonEmptyChildren(entity, escapeFields);
				if (field != null)
					throw new RestrictSoftDeleteException(field);
			} else if (deleteStrategy == DeleteStrategy.CASCADE) {
				//if strategy is CASCADE, soft delete children too
				deleteChildrenCascade(entity);
			}
			// Logically deletes entities if 'deleted' field exist
			Method setter = entity.getClass().getMethod("setDeleted", boolean.class); 
			setter.invoke(entity, true);
			em.merge(entity);
		} catch (NoSuchMethodException ex) {
			// Physically deletes entities otherwise
			entity = em.merge(entity);
			em.remove(entity);	
		}	
	}
	
	@SuppressWarnings("rawtypes")
	private String hasNonEmptyChildren(Object object, List<String> escapeFields) throws NoSuchMethodException, SecurityException, 
		IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		if (object != null) {		
			Class type = object.getClass();
			do {
				String retVal = hasNonEmptyChildrenSingleType(type, object, escapeFields);
				
				if (retVal != null) //if this child collection is not empty, stop searching
					return retVal;
				
				type = type.getSuperclass();
			} while (type != null && !type.equals(Object.class));
		}
		return null;
	}
	
	/**
	 * 
	 * @param type
	 * @param object
	 * @return Child field name that is not empty
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private String hasNonEmptyChildrenSingleType(Class type, Object object, List<String> escapeFields) throws NoSuchMethodException, 
		SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException  {
		for (Field f : type.getDeclaredFields()) {
			//check are there any non-empty children
			log.info("BBBBBBBBBBBBB " + "CCCCCCCC " + f.getName());
			
			if(escapeFields == null || (escapeFields != null && !escapeFields.contains(f.getName())) ) {
				log.info("USAO " + f.getName());
				if (f.getType().equals(Set.class)) {
					Method getter = type.getMethod("get"
							+ capitalizeFirstLetter(f.getName())); // find get method
					Set fieldInstance = (Set) getter.invoke(object); //get child collection
					//log.info("BBBBBBBBBBBBB "  + "CCCCCCCC " + fieldInstance);
					if (fieldInstance != null && !isCollectionEmpty(fieldInstance)) //check is it empty 
						return f.getName();
				}
			}
		}
		return null;
	}
	
	/**
	 * Checks are there any non-deleted elements in the collection
	 * @param collection
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 */
	private boolean isCollectionEmpty(Collection<Object> collection) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		boolean isEmpty = true;
		//log.info("BBBBBBBBBBBBB" + collection);
		if(collection.size() != 0)
		for (Object element: collection) {
			Method isDeletedMethod = element.getClass().getMethod("getDeleted"); 
			//log.info("AAAAAAAAAAAAAAAA0" + isDeletedMethod);
			if(isDeletedMethod != null) {
				boolean deleted = (boolean) isDeletedMethod.invoke(element);
				if (!deleted) {
					isEmpty = false;
					break;
				}
			} else {
				isEmpty = false;
				break;
			}
		}
		return isEmpty;
			
	}
	
	@SuppressWarnings("rawtypes")
	private boolean deleteChildrenCascade(Object object) throws NoSuchMethodException, SecurityException, 
		IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		if (object != null) {
			Class type = object.getClass();
			do {
				boolean retVal = deleteChildrenCascadeSingleType(type, object);
				if (retVal) //if this child collection is not empty, stop searching
					return retVal;
				
				type = type.getSuperclass();
			} while (type != null && !type.equals(Object.class));
		}
		return false;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private boolean deleteChildrenCascadeSingleType(Class type, Object object) throws NoSuchMethodException, 
		SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException  {
		for (Field f : type.getDeclaredFields()) {
			//check are there any non-empty children
			if (f.getType().equals(Set.class)) {
				Method getter = type.getMethod("get"
						+ capitalizeFirstLetter(f.getName())); // find get method
				Set childCollection = (Set) getter.invoke(object); //get child collection
				if (childCollection != null) {
					Iterator it = childCollection.iterator();
					while (it.hasNext()) {
						//soft delete each child
						Object child = it.next();
						Method setter = child.getClass().getMethod("setDeleted", boolean.class); 
						setter.invoke(child, true);
						//recursively delete its children
						deleteChildrenCascade(child);						
					}
				}
			}
		}
		return false;
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
	
	
	
	@Override
	public void remove(ID id, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		T entity = findById(id);
		remove(entity, deleteStrategy, null);
	}
}
