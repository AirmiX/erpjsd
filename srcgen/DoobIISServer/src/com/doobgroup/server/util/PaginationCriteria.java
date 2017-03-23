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



public class PaginationCriteria<T> implements Criteria {
	
	private Class<T> entityType;
	
	public static final int PAGE_SIZE = 10;
	
	private Criteria whereCriteria;

	private Criteria joinCriteria;

	private boolean fetched;

	private Map<String,String> aliases;
	
	/*
	 * this constructor creates two critera objects instead of using the criteria taken directly from the hibernate session so that
	 * the class can be used in other projects, not to hard-code it for this particular project
	 */
	public PaginationCriteria(Session session, Class<T> entityType){
		this.entityType = entityType;
		this.whereCriteria =  session.createCriteria(entityType);
		this.joinCriteria = session.createCriteria(entityType);
		this.fetched = false;
		this.aliases = new HashMap<String, String>();
	}
	
	//search values - filters for specific fields
	//each of these filters has to be satisfied (we add them with "AND" operator in the where clause of the SQL query)
	public PaginationCriteria(Session session, Class<T> entityType,
			int page, int pageSize, String searchParam, String sortParam, 
			boolean sortDirection, List<SearchParameter> searchParameters ) throws NoSuchFieldException {
		this(session, entityType, page, pageSize, searchParam, sortParam, sortDirection);		
		//set restrictions based on search values organized by fields
		List<Criterion> criterions = new ArrayList<Criterion>();
		int aliasCounter = 0;		
		if (searchParameters != null) {
			for (SearchParameter s: searchParameters) {
				if (s.getSearchValue() != null && !s.getSearchValue().equals("")) {
					aliasCounter = CriteriaUtil.addFieldRestriction(whereCriteria, s, 
							criterions, aliasCounter, entityType, aliases);
				}
			}
		}
		whereCriteria.add(Restrictions.and(criterions.toArray(new Criterion[criterions.size()])));		
	}

	
	public PaginationCriteria(Session session, Class<T> entityType,
			int page, int pageSize, String searchParam, String sortParam, boolean sortDirection) throws NoSuchFieldException{
		this(session, entityType);
		//set pagination on the criteria
		if (page!=0){			
			int ps;
			if(pageSize!=0){
				ps = pageSize;
			}
			else{
				ps = PAGE_SIZE;
			}
			whereCriteria.setFirstResult((page-1)*ps);
			whereCriteria.setMaxResults(ps);
		}
		
		//add search criteria	
		Criterion[] searchCriterions = getSearchCriterions(searchParam);
		whereCriteria.add(Restrictions.or(searchCriterions));
		
		//add ordering
		if(sortParam!=null && !sortParam.equals("")){
			String[] als = sortParam.split("\\.");//create all the aliases for ordering
			String path = "";
			String key = "";//similar situation as with the CriteriaUtils class with one difference: instead of having one criteria we have two of them (joinCriteria and whereCriteria)
			if(als.length>1){
			    String previousAlias = "";
				for (int i = 0; i < als.length - 1; i++) {
					if(i>0){
						previousAlias = als[i-1]+".";
						key+="."+als[i];
					}
					else{
						key+=als[i];
					}
					if (!aliases.containsKey(key)) {//if it is the first time to come across the key

						aliases.put(key, "al"+i);//we put the alias into the map under the key
						whereCriteria.createAlias(previousAlias+als[i],"al"+i, JoinType.LEFT_OUTER_JOIN);//and create the alias in whereCriteria and
						joinCriteria.createAlias(previousAlias+als[i],"al"+i, JoinType.LEFT_OUTER_JOIN);//joinCriteria as well					

					}
					else {
						joinCriteria.createAlias(previousAlias+als[i],aliases.get(key), JoinType.LEFT_OUTER_JOIN);//this is the main difference:
						//if there was the key in the map, we do not need to create the alias for the whereCriteria,
						//but, since CriteriaUtils created the alias only for the whereCriteria, we have to create the alias for the joinCriteria
					}
				}
				if(als.length>0){
					path = aliases.get(key)+"."+als[als.length-1];
				}
			}
			else{
				path = als[0];				
			}
			//add sort direction
			if(sortDirection){
			    whereCriteria.addOrder(Order.asc(path));
				joinCriteria.addOrder(Order.asc(path));
			}
			else{
				whereCriteria.addOrder(Order.desc(path));
				joinCriteria.addOrder(Order.desc(path));
			}
		} else { //add default sorting by id if no sortParam is specifed
			whereCriteria.addOrder(Order.asc("id"));
			joinCriteria.addOrder(Order.asc("id"));
		}
	}	

	//create a collection of criterions for searched parameters
	//all the related classes should be accessed to check their annotations
	protected Criterion[] getSearchCriterions(String searchParam) throws NoSuchFieldException{
		List<Criterion> criterions = new ArrayList<Criterion>();
		SearchBy searchClass = entityType.getAnnotation(SearchBy.class);
		int aliasCounter = 0;
		if (searchParam!=null && !searchParam.equals("")) {
			//search fields are defined within entity annotation
			String[] fields = searchClass.fields();
			for (String field : fields) {
				//add search operator depending on field type
				SearchParameter sp = new SearchParameter(field, searchParam, RestrictionType.LIKE); //TODO check LIKE. Do we need other comparison types				
				aliasCounter = CriteriaUtil.addFieldRestriction(whereCriteria, sp, 
						criterions, aliasCounter, entityType, aliases);
			} 			
		}
		return criterions.toArray(new Criterion[criterions.size()]);
	}
	
	@Override
	/**
	 * Add a criterion to the whereCriteria
	 */
	public Criteria add(Criterion arg0) {
		whereCriteria.add(arg0);
		return this;
	}

	@Override
	/**
	 * Add order to the whereCriteria
	 */
	public Criteria addOrder(Order arg0) {
		whereCriteria.addOrder(arg0);
		joinCriteria.addOrder(arg0); //TODO check this
		return this;
	}

	@Override
	/**
	 * Create an alias for the join criteria
	 */
	public Criteria createAlias(String arg0, String arg1)
			throws HibernateException {
		joinCriteria.createAlias(arg0, arg1);
		whereCriteria.createAlias(arg0, arg1);
		return this;
	}

	@Override
	/**
	 * Create an alias for the join criteria
	 */	
	public Criteria createAlias(String arg0, String arg1, JoinType arg2)
			throws HibernateException {
		joinCriteria.createAlias(arg0, arg1, arg2);
		whereCriteria.createAlias(arg0, arg1, arg2);
		return this;
	}

	@SuppressWarnings("deprecation")
	@Override
	/**
	 * Not implemented
	 */
	public Criteria createAlias(String arg0, String arg1, int arg2)
			throws HibernateException {
		joinCriteria.createAlias(arg0, arg1, arg2);
		whereCriteria.createAlias(arg0, arg1, arg2);
		return this;
	}

	@Override
	/**
	 * Create an alias for the join criteria
	 */
	public Criteria createAlias(String arg0, String arg1, JoinType arg2,
			Criterion arg3) throws HibernateException {
		joinCriteria.createAlias(arg0, arg1, arg2, arg3);	
		whereCriteria.createAlias(arg0, arg1, arg2, arg3);	
		return this;
	}

	@SuppressWarnings("deprecation")
	@Override
	/**
	 * Not implemented
	 */
	public Criteria createAlias(String arg0, String arg1, int arg2,
			Criterion arg3) throws HibernateException {
		joinCriteria.createAlias(arg0, arg1, arg2, arg3);	
		whereCriteria.createAlias(arg0, arg1, arg2, arg3);	
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
	 *  Should entities and proxies loaded by this Criteria be put in read-only mode? If the read-only/modifiable setting was not initialized, then the default read-only/modifiable setting for the persistence context is returned instead.
	 */
	public boolean isReadOnly() {
		return this.isReadOnly();
	}

	@Override
	/**
	 * Was the read-only/modifiable mode explicitly initialized?
	 */
	public boolean isReadOnlyInitialized() {
		return this.isReadOnlyInitialized();
	}

	@SuppressWarnings("rawtypes")
	@Override
	/**
	 * This method does the job. It first selects all the ids by using the whereCriteria. Then it fetches the objects with all 
	 * of their specified (joined) collections. That is how it avoids selecting all the entities with their child collections and
	 * limiting the number of selected entities in memory. For it to work, the database table must have row named 'id' and the row
	 * should be Long.
	 */
	public List list() throws HibernateException {
		//if there are fetched joins then the select will take two steps
		if(fetched){
			//select the ids
			whereCriteria.setProjection(Projections.property("id"));
			@SuppressWarnings("unchecked")
			List<Long> ids = whereCriteria.list();
			if (ids.size()==0) {
				return new ArrayList();
			}
			//then select all the objects with the selected ids
			joinCriteria.add(Restrictions.in("id", ids));
			joinCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			List retVal=joinCriteria.list();
			return retVal;
		}
		//if there are no fetched joins the select will take one step
		else{
			List retVal=whereCriteria.list();
			return retVal;
		}
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
	 * Specify an association fetching strategy for an association or a collection of values.
	 */
	public Criteria setFetchMode(String arg0, FetchMode arg1)
			throws HibernateException {
		fetched = true;
		joinCriteria.setFetchMode(arg0, arg1);
		return this;
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
	 * Set the starting position of the collection that is beign selected.
	 */
	public Criteria setFirstResult(int arg0) {
		whereCriteria.setFirstResult(arg0);
		return this;
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
	 * Set a limit upon the number of objects to be retrieved.
	 */
	public Criteria setMaxResults(int arg0) {
		whereCriteria.setMaxResults(arg0);
		return this;
	}

	@Override
	/**
	 * Used to specify that the query results will be a projection (scalar in nature).
	 */
	public Criteria setProjection(Projection arg0) {
		whereCriteria.setProjection(arg0);
		joinCriteria.setProjection(arg0);
		return this;
	}

	@Override
	/**
	 * Set the read-only/modifiable mode for entities and proxies loaded by this Criteria.
	 */
	public Criteria setReadOnly(boolean arg0) {
		this.setReadOnly(arg0);
		return this;
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
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "PaginationCriteria: [whereCriteria: "+this.whereCriteria.toString()+",joinCriteria: "+this.joinCriteria.toString()+"]";
	}

}
