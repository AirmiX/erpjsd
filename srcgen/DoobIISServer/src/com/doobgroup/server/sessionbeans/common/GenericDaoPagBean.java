package com.doobgroup.server.sessionbeans.common;

import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.OneToMany;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.log4j.Logger;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import com.doobgroup.server.sessionbeans.common.GenericDaoBean.DeleteStrategy;
import com.doobgroup.server.util.CountCriteria;
import com.doobgroup.server.util.KeyDB;
import com.doobgroup.server.util.PaginationCriteria;
import com.doobgroup.server.util.PreSerializer;
import com.doobgroup.server.util.RestrictSoftDeleteException;
import com.doobgroup.server.util.SearchParameter;



public abstract class GenericDaoPagBean<T, ID extends Serializable> implements
GenericDaoPag<T, ID> {

	private static Logger log = Logger.getLogger(GenericDaoPagBean.class);

	public enum DeleteStrategy {CASCADE, RESTRICT};

	protected final int PAGE_SIZE = 10;

	protected Class<T> entityType;

	@PersistenceContext(unitName = "doobjsd")
	protected EntityManager em;

	@SuppressWarnings("unchecked")
	public GenericDaoPagBean() {
		entityType = (Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];
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

	@Override
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
						Object fieldInstance = getter.invoke(entity);
						if (!Hibernate.isInitialized(fieldInstance)) {
							Hibernate.initialize(fieldInstance);
						}
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

	@Override
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
	}

	public Class<T> getEntityType() {
		return entityType;	
	}

	@Override
	public T findById(ID id) {
		T entity;
		entity = em.find(entityType, id);
		return entity;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> findAll() {
		Query q = em.createQuery("SELECT x FROM " + entityType.getSimpleName()
				+ " x");
		List<T> result = q.getResultList();
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> findAll(int page, int pageSize, String searchParam,
			String sortParam, boolean sortDirection) throws NoSuchFieldException {
		Session session = getHibernateSession();
		PaginationCriteria<T> crit = new PaginationCriteria<T>(session, entityType, page, pageSize, searchParam, sortParam, sortDirection);
		return crit.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> findAll(int page, int pageSize, String searchParam,
			String sortParam, boolean sortDirection, List<SearchParameter> searchValues) throws NoSuchFieldException {
		Session session = getHibernateSession();
		PaginationCriteria<T> crit = new PaginationCriteria<T>(session, entityType, page, pageSize, searchParam, 
				sortParam, sortDirection, searchValues);
		return crit.list();
	}

	@Override
	public T findSingleEntity(List<SearchParameter> searchValues) throws NoSuchFieldException {
		List<T> list = findAll(1,0, null, null, true, searchValues);
		return list.size() > 0 ? list.get(0) : null;
	}

	protected Session getHibernateSession(){
		return em.unwrap(org.hibernate.Session.class);
	}

	@SuppressWarnings("rawtypes")
	@Override
	public long count(String searchParam) throws NoSuchFieldException {		
		Session session = getHibernateSession();
		CountCriteria crit = new CountCriteria<T>(session, entityType, searchParam);
		long retVal = crit.count();
		return retVal;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public long count(String searchParam, List<SearchParameter> searchValues) throws NoSuchFieldException {
		Session session = getHibernateSession();
		CountCriteria crit = new CountCriteria<T>(session, entityType, searchParam, searchValues);
		long retVal = crit.count();
		return retVal;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<T> findBy(String query) {		
		Query q = em.createQuery(query);
		List<T> result = q.getResultList();
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> findByWithParameters(String query, Map<String, Object> parameters) {
		Query q = em.createQuery(query);
		for (String paramName: parameters.keySet()) {
			q.setParameter(paramName, parameters.get(paramName));
		}
		List<T> result = q.getResultList();
		return result;		
	}	

	private String firstLower(String name) {
		return name.substring(0, 1).toLowerCase() + name.substring(1); 
	}

	private String firstUpper(String name) {
		return name.substring(0, 1).toUpperCase() + name.substring(1); 
	}

	private String lastSegment(String name) {
		return name.substring(name.lastIndexOf(".")+1); 
	}

	private void persistOneToMany(T entity) {
		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA " + entity.getClass());
		try {	
			for (Field field : entity.getClass().getDeclaredFields()) {				
				for (Annotation ann : field.getAnnotations()) {					
					if (ann.annotationType().equals(OneToMany.class)) {
						
						OneToMany annot = (OneToMany)ann;
						
						//getAccount();
						Method getter = null;
						for (Method s : entity.getClass().getMethods()) {
							if (s.getName().equals("get" + firstUpper(field.getName()))) {
								getter = s;
							}
						}		
						//Set<AccountBean>
						ParameterizedType retType = (ParameterizedType)getter.getGenericReturnType();
						//AccountBean
						Class concreteType = (Class) retType.getActualTypeArguments()[0];
						//getId on AccountBean
						Method getid = concreteType.getMethod("getId");

						for (Object acc : (Iterable)getter.invoke(entity)) {
							String update = "UPDATE " + lastSegment(concreteType.getName()) + " many "
									+ "SET many." + annot.mappedBy() + " = :one "
									+ "WHERE many.id = :idmany";
							Query query = em.createQuery(update); 

							int updateCount = query.setParameter("one", entity).setParameter("idmany", getid.invoke(acc)).executeUpdate();
						}
						em.flush();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void clearOneToMany(T entity) {
		try {	
			for (Field field : entity.getClass().getDeclaredFields()) {				
				for (Annotation ann : field.getAnnotations()) {					
					if (ann.annotationType().equals(OneToMany.class)) {

						OneToMany annot = (OneToMany)ann;
						
						//getAccount();
						Method getter = null;
						for (Method s : entity.getClass().getMethods()) {
							if (s.getName().equals("get" + firstUpper(field.getName()))) {
								getter = s;
							}
						}	
						//Set<AccountBean>
						ParameterizedType retType = (ParameterizedType)getter.getGenericReturnType();
						//AccountBean
						Class concreteType = (Class) retType.getActualTypeArguments()[0];
						//getId on AccountBean
						Method getid = concreteType.getMethod("getId");


						//get all accounts for this entity
						//TODO fox this error
						String select = "SELECT DISTINCT many FROM " + lastSegment(concreteType.getName()) + " many "
								+ "WHERE many." + annot.mappedBy() + " = :one";
						Query querySelect = em.createQuery(select);
						Iterable iterator = querySelect.setParameter("one", entity).getResultList();
						//clear all accounts

						for (Object acc : iterator) {
							String update = "UPDATE " + lastSegment(concreteType.getName()) + " many "
									+ "SET many." + annot.mappedBy() + " = :one "
									+ "WHERE many.id = :idmany";
							Query query = em.createQuery(update); 
							System.out.println("UPDATE " + update);

							int updateCount = query.setParameter("one", null).setParameter("idmany", getid.invoke(acc)).executeUpdate();
						}
						em.flush();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public T persist(T entity) throws NoSuchFieldException {
		em.persist(entity);
		em.flush();
		persistOneToMany(entity);
		return entity;
	}

	@Override
	public T merge(T entity) throws NoSuchFieldException {
		/*clearOneToMany(entity);
		persistOneToMany(entity);*/
		entity = em.merge(entity);
		/*clearOneToMany(entity);
		persistOneToMany(entity);*/
		return entity;
	}


	


	@Override
	public void remove(ID id) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		//default delete strategy is RESTRICT
		remove(id, DeleteStrategy.RESTRICT);
	}
	
	@Override
	/**
	 * @param entity
	 * 		entity to be deleted
	 * @param deleteStrategy 
	 * 		A strategy for related entities
	 */
	public void remove(T entity, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		try {
			//if strategy is RESTRICT, forbid deletion if there are any related entities
			if (deleteStrategy == DeleteStrategy.RESTRICT) {
				String field = hasNonEmptyChildren(entity);
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
	private String hasNonEmptyChildren(Object object) throws NoSuchMethodException, SecurityException, 
		IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		if (object != null) {
			Class type = object.getClass();
			do {
				String retVal = hasNonEmptyChildrenSingleType(type, object);
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
	private String hasNonEmptyChildrenSingleType(Class type, Object object) throws NoSuchMethodException, 
		SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException  {
		for (Field f : type.getDeclaredFields()) {
			//check are there any non-empty children
			if (f.getType().equals(Set.class)) {
				Method getter = type.getMethod("get"
						+ capitalizeFirstLetter(f.getName())); // find get method
				Set fieldInstance = (Set) getter.invoke(object); //get child collection
				if (fieldInstance != null && !isCollectionEmpty(fieldInstance)) //check is it empty 
					return f.getName();
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
		for (Object element: collection) {
			Method isDeletedMethod = element.getClass().getMethod("getDeleted"); 
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
		remove(entity, deleteStrategy);
	}
	
	@Override
	public void remove(T entity) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {
		//default delete strategy is RESTRICT
		remove(entity, DeleteStrategy.RESTRICT);
	}

	@Override
	public void removeAll() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException{
		Query q = em.createNativeQuery("DELETE FROM "+ entityType.getSimpleName());
		q.executeUpdate();
	}

	@Override
	public void flush() {
		em.flush();
	}

	@Override
	public void clear() {
		em.clear();
	}

	@SuppressWarnings("rawtypes")
	@Override
	public long count(){
		Session session = getHibernateSession();
		CountCriteria crit = new CountCriteria<T>(session, entityType);
		long result = crit.count();
		return result;
	}

}
