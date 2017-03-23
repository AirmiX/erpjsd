package com.doobgroup.server.interceptors;


import javax.interceptor.AroundInvoke;
import javax.interceptor.InvocationContext;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;

import com.doobgroup.server.util.PreSerializer;


public class JsonizeInterceptor {

	private static Logger log = Logger.getLogger(JsonizeInterceptor.class);

	
	@PersistenceContext(unitName = "doobjsd")
	protected EntityManager em;

	@AroundInvoke
	public Object intercept(InvocationContext context) throws Exception {
		Object result = context.proceed(); //call rest service method
		
		//detach object from database session before nullification.
		//This is the EJB stateless bean interceptor, so at the end of the method,
		//persistence context will be flushed into database which 
		//would send nullified object to the database.
		//Using the next line, we detach object from the session, so 
		//persistence context doesn't know for the object anymore and 
		//the object will not be send back to the database
		
		em.flush(); //before detaching from database session, flush all changes to database
		
		em.clear(); //further changes (caused by nullification) will not be flushed to database, because our beans are now detached  		

		//log.info("AAAAAAAAA"+context);
		//log.info("FROM INTERCEPTOR BEFORE: "+result);		
		PreSerializer preSerializer = new PreSerializer();
		preSerializer.nullifyLazy(result); //before sending data to a client, nullify all non-fetched lazy-loading fields
		log.info("FROM INTERCEPTOR BEFORE: "+result);	//log.warn("FROM INTERCEPTOR: "+result);
		return result;
	}
}
