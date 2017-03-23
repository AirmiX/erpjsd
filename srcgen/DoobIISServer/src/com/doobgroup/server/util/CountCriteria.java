package com.doobgroup.server.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.CacheMode;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.LockMode;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.ResultTransformer;

import com.doobgroup.server.util.SearchParameter.RestrictionType;

public class CountCriteria<T> implements Criteria {
	
	private Class<T> entityType;
		
	private Criteria criteria;
	
	private Map<String,String> aliases;
	
	/**
	 * 
	 */
	/*
	 * this constructor takes two critera objects instead of using the criteria taken directly from the hibernate session so that
	 * the class can be used in other projects, not to hard-code it for this particular project
	 */
	public CountCriteria(Session session, Class<T> entityType){
		this.entityType = entityType;
		this.criteria =  session.createCriteria(entityType);
		this.aliases = new HashMap<String,String>();

	}

	public CountCriteria(Session session, Class<T> entityType, String searchParam) throws NoSuchFieldException{
		this.aliases = new HashMap<String,String>();
		this.entityType = entityType;
		this.criteria =  session.createCriteria(entityType);
		
		//add search criteria	
		Criterion[] searchCriterions = getSearchCriterions(searchParam);
		criteria.add(Restrictions.or(searchCriterions));		
	}
	
	public CountCriteria(Session session, Class<T> entityType, String searchParam, List<SearchParameter> searchParameters) throws NoSuchFieldException {
		this(session, entityType, searchParam);
		this.aliases = new HashMap<String, String>();
		
		//set restrictions based on search values organized by fields
		List<Criterion> criterions = new ArrayList<Criterion>();
		int aliasCounter = 0;
		if (searchParameters != null) {
			for (SearchParameter s: searchParameters) {
				if (s.getSearchValue() != null && !s.getSearchValue().equals("")) {
					aliasCounter = CriteriaUtil.addFieldRestriction(criteria, s, 
							criterions, aliasCounter, entityType, aliases);
				}
			}		
		}
		criteria.add(Restrictions.and(criterions.toArray(new Criterion[criterions.size()])));		
	}
	
	//create a collection of criterions for searched parameters
		//all the related classes shoul be accessed to check their annotations
	protected Criterion[] getSearchCriterions(String searchParam) throws NoSuchFieldException{
		List<Criterion> criterions = new ArrayList<Criterion>();
		SearchBy searchClass = entityType.getAnnotation(SearchBy.class);
		int aliasCounter = 0;
		if (searchParam!=null && !searchParam.equals("")) {
			//search fields are defined within entity annotation
			String[] fields = searchClass.fields();
			for (String field : fields) {
				//add search operator depending on field type
				//add search operator depending on field type
				SearchParameter sp = new SearchParameter(field, searchParam, RestrictionType.LIKE); //TODO check LIKE. Do we need other comparison types				
				aliasCounter = CriteriaUtil.addFieldRestriction(criteria, sp, 
						criterions, aliasCounter, entityType, aliases);
			} 			
		}
		return criterions.toArray(new Criterion[criterions.size()]);
	}		
	
	@Override
	public Criteria add(Criterion arg0) {
		this.criteria.add(arg0);
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */public Criteria addOrder(Order arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Create an alias for the join criteria
	 */
	public Criteria createAlias(String arg0, String arg1)
			throws HibernateException {
		criteria.createAlias(arg0, arg1);
		return this;
	}

	@Override
	/**
	 * Create an alias for the join criteria
	 */	
	public Criteria createAlias(String arg0, String arg1, JoinType arg2)
			throws HibernateException {
		criteria.createAlias(arg0, arg1, arg2);
		return this;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createAlias(String arg0, String arg1, int arg2)
			throws HibernateException {
		criteria.createAlias(arg0, arg1, arg2);
		return this;
	}

	@Override
	/**
	 * Create an alias for the join criteria
	 */
	public Criteria createAlias(String arg0, String arg1, JoinType arg2,
			Criterion arg3) throws HibernateException {
		criteria.createAlias(arg0, arg1, arg2, arg3);	
		return this;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createAlias(String arg0, String arg1, int arg2,
			Criterion arg3) throws HibernateException {
		criteria.createAlias(arg0, arg1, arg2, arg3);	
		return this;
	}



	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0) throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, JoinType arg1)
			throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, int arg1)
			throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, String arg1)
			throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, String arg1, JoinType arg2)
			throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, String arg1, int arg2)
			throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, String arg1, JoinType arg2,
			Criterion arg3) throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria createCriteria(String arg0, String arg1, int arg2,
			Criterion arg3) throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public String getAlias() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public boolean isReadOnly() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	/**
	 * Not implemented
	 */
	public boolean isReadOnlyInitialized() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	/**
	 * Not implemented
	 */
	public List list() throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public ScrollableResults scroll() throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public ScrollableResults scroll(ScrollMode arg0) throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setCacheMode(CacheMode arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setCacheRegion(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setCacheable(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setComment(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setFetchMode(String arg0, FetchMode arg1)
			throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setFetchSize(int arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setFirstResult(int arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setFlushMode(FlushMode arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setLockMode(LockMode arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setLockMode(String arg0, LockMode arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setMaxResults(int arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setProjection(Projection arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setReadOnly(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setResultTransformer(ResultTransformer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Criteria setTimeout(int arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	/**
	 * Not implemented
	 */
	public Object uniqueResult() throws HibernateException {
		// TODO Auto-generated method stub
		return null;
	}
	
	public long count(){
		long totalResult = ((Number)criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
		return totalResult;
	}

}
