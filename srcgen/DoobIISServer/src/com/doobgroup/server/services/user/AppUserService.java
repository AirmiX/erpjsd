package com.doobgroup.server.services.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.interceptor.Interceptors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;
import org.mindrot.jbcrypt.BCrypt;

import com.doobgroup.server.entities.user.AppUserBean;
import com.doobgroup.server.interceptors.AuthenticationInterceptor;
import com.doobgroup.server.interceptors.JsonizeInterceptor;
import com.doobgroup.server.sessionbeans.user.AppUserBeanDaoLocal;
import com.doobgroup.server.util.MessageConstants;
import com.doobgroup.server.util.SearchParameter;
import com.doobgroup.server.util.SearchParameter.RestrictionType;
import com.doobgroup.server.util.ServiceException;
import com.doobgroup.server.util.ServiceGroup;

@Stateless
@Path("/user/appUsers")
public class AppUserService {
	private static Logger log = Logger.getLogger(AppUserService.class);
	
	@EJB
	private AppUserBeanDaoLocal appUserDao;

	@Context
	private HttpServletResponse response;	
	
	@Context
	private HttpServletRequest request;
	
	@GET 
	@Path("{id}/get")
	@ServiceGroup({"any", "customer", "doobia"})
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class})
    public AppUserBean findById(@PathParam("id") String id) {
		AppUserBean retVal = null;
		try {
			retVal = appUserDao.findById(Long.parseLong(id));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
	
     @GET 
	 @Path("{id}/eager")
     @ServiceGroup({"any", "customer", "doobia"})
	 @Produces(MediaType.APPLICATION_JSON)
	 @Interceptors({JsonizeInterceptor.class})
	 public AppUserBean getEager(@PathParam("id") String id) {
	 	AppUserBean retVal = null;
	  	try {
	   		retVal = appUserDao.findByIdEager(Long.parseLong(id));
	  	} catch (Exception e) {
	   		log.error(e.getMessage(), e);
	   		throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
	     		Status.INTERNAL_SERVER_ERROR);   
	  	}
	  	return retVal;
    }
    
    @GET 
	@Path("{id}/connectedEager")
    @ServiceGroup({"any", "customer", "doobia"})
	@Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class})
	public AppUserBean getConnectedEager(@PathParam("id") String id) {
	 	AppUserBean retVal = null;
	  	try {
	   		retVal = appUserDao.findByIdConnectedEager(Long.parseLong(id));
	  	} catch (Exception e) {
	   		log.error(e.getMessage(), e);
	   		throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
	     		Status.INTERNAL_SERVER_ERROR);   
	  	}
	  	return retVal;
    }
    
    @POST
    @ServiceGroup({"any", "customer", "doobia"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class})
    public AppUserBean create(AppUserBean entity) {
		AppUserBean retVal = null;
		try {
			retVal = appUserDao.persist(entity);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
    
    @PUT 
    @Path("{id}")
    @ServiceGroup({"any", "customer", "doobia"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class})
    public AppUserBean update(AppUserBean entity) {
       AppUserBean retVal = null;
        try {
        	retVal = appUserDao.merge(entity);
        } catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
 
    @DELETE 
    @Path("{id}")
    @ServiceGroup({"any", "customer", "doobia"})
    @Produces(MediaType.TEXT_HTML)   
    public String remove(@PathParam("id") Long id) {
    	try {
    		appUserDao.remove(appUserDao.findById(id));
        } catch (Exception e) {
        	log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);		
        }
    	return MessageConstants.RSP_OK;
    }
    
    @GET
    @Path("count")
    @ServiceGroup({"any", "customer", "doobia"})
    @Produces(MediaType.APPLICATION_JSON)    
    public Map<String, Long> count() {
    	Map<String, Long> retVal=null;
    	try {
    		Long count = appUserDao.count();
    		retVal = new HashMap<String, Long>();
    		retVal.put("count", count);
        } catch (Exception e) {
        	log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);		
        }
    	return retVal;
    }	
    
    @POST
    @Path("login")
    @ServiceGroup({"any", "customer", "doobia"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors(JsonizeInterceptor.class)
    public AppUserBean login(AppUserBean entity) throws ServiceException  {
    	AppUserBean user = null;
        try {
        	log.info(entity);
        	user = appUserDao.findByUsernameAndPasword(entity.getUUsername(), entity.getUPassword());
        	
			if(user != null){
				request.getSession().invalidate();
				request.getSession().setAttribute("user", user);
			}  
			
        	appUserDao.login(user);
        } catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_LOGIN_FAILED,
					Status.INTERNAL_SERVER_ERROR);			
		}
        if (user != null) {
        	return user;
        } else {
			throw new ServiceException(MessageConstants.RSP_LOGIN_FAILED,
						Status.FORBIDDEN);
        }
    }
    
    @GET
    @Path("logout")
    @ServiceGroup({"any", "customer", "doobia"})
    //@Produces(MediaType.APPLICATION_JSON)
    @Produces("text/plain")
	@Interceptors(JsonizeInterceptor.class)
    //@ServiceGroup("any")
    public String logout() {
		try {
			AppUserBean user = (AppUserBean) request.getSession().getAttribute("user");        	user.setULogged(true);
			appUserDao.logut(user);
			request.getSession().invalidate();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return MessageConstants.RSP_OK;
    }
    
    @GET
    @Path("self")
    @ServiceGroup({"any", "customer", "doobia"})
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class})
    public List<AppUserBean> whoami() {
    	List<AppUserBean> retVal = new ArrayList<AppUserBean>();
		try {
			AppUserBean user = (AppUserBean) request.getSession().getAttribute("user");
			if(user!=null){
				retVal.add(user);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }
    
    
}