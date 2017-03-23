package com.doobgroup.server.sessionbeans.common;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import com.doobgroup.server.sessionbeans.common.GenericDaoBean.DeleteStrategy;
import com.doobgroup.server.util.RestrictSoftDeleteException;

public interface GenericDao<T, ID extends Serializable> {

	public Class<T> getEntityType();

	public T findById(ID id);
	
	public T findByIdConnectedEager(ID id);
	
	public T findByIdEager(ID id);

	public List<T> findAll();

	public List<T> findBy(String query);
	
	public List<T> findByWithParameters(String query, Map<String, Object> parameters);

	public T persist(T entity);

	public T merge(T entity);

	//public void remove(T entity) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException;

	public void flush();

	public void clear();
	
	public Long count();
	
	public void remove(ID id) throws IllegalAccessException, IllegalArgumentException, 
	InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;

	public void remove(T entity, DeleteStrategy deleteStrategy, List<String> escapeFields) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;
	
	public void remove(ID id, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;

	void remove(T entity) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException,
			NoSuchFieldException, RestrictSoftDeleteException;
	
	public T validateKey(T newEntity) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
}
