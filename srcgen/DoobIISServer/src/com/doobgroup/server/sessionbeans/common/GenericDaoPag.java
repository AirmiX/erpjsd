package com.doobgroup.server.sessionbeans.common;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean.DeleteStrategy;
import com.doobgroup.server.util.RestrictSoftDeleteException;
import com.doobgroup.server.util.SearchParameter;



public interface GenericDaoPag<T, ID extends Serializable> {

	public Class<T> getEntityType();

	public T findById(ID id);
	
	public T findByIdEager(ID id);
	
	public T findByIdConnectedEager(ID id);
	
	public List<T> findAll();
	
	public List<T> findAll(int page, int pageSize, String searchParam, String sortParam, boolean sortDirection) throws NoSuchFieldException;
	
	List<T> findAll(int page, int pageSize, String searchParam,
			String sortParam, boolean sortDirection, List<SearchParameter> searchValues) throws NoSuchFieldException;
	
	T findSingleEntity(List<SearchParameter> searchValues) throws NoSuchFieldException;
	
	public long count(String searchParam) throws NoSuchFieldException;
	
	long count(String searchParam, List<SearchParameter> searchValues) throws NoSuchFieldException;
	
	public List<T> findBy(String query);
	
	public List<T> findByWithParameters(String query, Map<String, Object> parameters);
	
	public T persist(T entity) throws NoSuchFieldException;

	public T merge(T entity) throws NoSuchFieldException;
	
	public void remove(ID id) throws IllegalAccessException, IllegalArgumentException, 
	InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;

	public void remove(T entity, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;
	
	public void remove(ID id, DeleteStrategy deleteStrategy) throws IllegalAccessException, IllegalArgumentException, 
		InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;


	public void removeAll() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	
	public void flush();

	public void clear();
	
	public long count();

	void remove(T entity) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException,
			NoSuchFieldException, RestrictSoftDeleteException;

	public T validateKey(T newEntity) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
}
