package com.doobgroup.server.interceptors;

import java.util.Set;

import javax.ejb.EJB;
import javax.interceptor.AroundInvoke;
import javax.interceptor.InvocationContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;

import com.doobgroup.server.entities.user.AppUserBean;
import com.doobgroup.server.entities.user.ServiceBean;
import com.doobgroup.server.sessionbeans.user.AppUserBeanDaoLocal;
import com.doobgroup.server.sessionbeans.user.ServiceBeanDaoLocal;
import com.doobgroup.server.util.MessageConstants;
import com.doobgroup.server.util.ServiceException;


public class AuthenticationInterceptor {

	private static Logger log = Logger.getLogger(AuthenticationInterceptor.class);
	
	@Context
	private HttpServletRequest request;

    @EJB
	private AppUserBeanDaoLocal userDao;
    
    @EJB
    private ServiceBeanDaoLocal serviceDao;
	
    @AroundInvoke
	public Object intercept(InvocationContext context) throws Exception{
		AppUserBean user = (AppUserBean) request.getSession().getAttribute("user");
		if (user == null) {
			//Response.ResponseBuilder rb = Response.status(401).entity(MessageConstants.RSP_NOT_LOGED_IN);
			//return rb.build();
			throw new ServiceException(MessageConstants.RSP_NOT_LOGED_IN, Status.UNAUTHORIZED);
		}	
		
		String uri = getInvocedUri(context);
		String method = getInvocedMethod(context);
		ServiceBean service = serviceDao.findByUriAndMethod(uri, method);
		Set<ServiceBean> permittedServices = userDao.getPermittedServices(user.getId());
		
		//log.info("AAAAAAAA" + permittedServices );
		//log.info("BBBBB" + service.getServiceGroups());
		if (/*service.getServiceGroups().size() !=0 && */!permittedServices.contains(service)) {
			//Response.ResponseBuilder rb = Response.status(401).entity(MessageConstants.RSP_NO_PERMISSION);
			//return rb.build();
			log.error("UNAUTHORIZED ACCESS: "+service.getSMethod()+" "+service.getSUri());
			throw new ServiceException(MessageConstants.RSP_NO_PERMISSION, Status.UNAUTHORIZED);
		}
		
		Object result = context.proceed();
		return result;
	}
	
	private String getInvocedUri(InvocationContext context){
			String fullPath = "";
			for (int i = 0; i < context.getMethod().getDeclaringClass().getAnnotations().length; i++) {
				if(context.getMethod().getDeclaringClass().getAnnotations()[i] instanceof Path){
					Path path = (Path) context.getMethod().getDeclaringClass().getAnnotations()[i];
					fullPath += path.value();
				}
			}
			for (int i = 0; i < context.getMethod().getAnnotations().length; i++) {
				if(context.getMethod().getAnnotations()[i] instanceof Path){
					Path path = (Path) context.getMethod().getAnnotations()[i];
					fullPath += "/" + path.value();
				}
			}
			return fullPath;
	}

	private String getInvocedMethod(InvocationContext context){
		String method = "";
		for (int i = 0; i < context.getMethod().getAnnotations().length; i++) {
			if(context.getMethod().getAnnotations()[i] instanceof GET){
				method = "GET";
			}
			if(context.getMethod().getAnnotations()[i] instanceof POST){
				method = "POST";
			}
			if(context.getMethod().getAnnotations()[i] instanceof PUT){
				method = "PUT";
			}
			if(context.getMethod().getAnnotations()[i] instanceof DELETE){
				method = "DELETE";
			}
		}
		return method;
}
}
