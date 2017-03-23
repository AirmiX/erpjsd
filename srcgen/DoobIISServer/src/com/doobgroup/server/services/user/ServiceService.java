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
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;

import com.doobgroup.server.entities.user.AppUserBean;
import com.doobgroup.server.entities.user.ServiceBean;
import com.doobgroup.server.interceptors.AuthenticationInterceptor;
import com.doobgroup.server.interceptors.JsonizeInterceptor;
import com.doobgroup.server.sessionbeans.user.AppUserBeanDaoLocal;
import com.doobgroup.server.sessionbeans.user.ServiceBeanDaoLocal;
import com.doobgroup.server.util.MessageConstants;
import com.doobgroup.server.util.ServiceException;
import com.doobgroup.server.util.ServiceGroup;

@Stateless
@Path("/user/services")
public class ServiceService {

	private static Logger log = Logger.getLogger(ServiceService.class);

	@EJB
	private ServiceBeanDaoLocal serviceBeanDao;
	
	@EJB
	private AppUserBeanDaoLocal appUserBeanDao;

	@Context
	private HttpServletResponse response;

	@Context
	private HttpServletRequest request;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
	public List<ServiceBean> findAll() {
		List<ServiceBean> retVal = null;
		try {
			retVal = serviceBeanDao.findAll();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
	}

	@GET
	@Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
    public ServiceBean findById(@PathParam("id") String id) {
		ServiceBean retVal = null;
		try {
			retVal = serviceBeanDao.findById(Long.parseLong(id));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
    }

     @GET
	 @Path("{id}/eager")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
	 public ServiceBean getEager(@PathParam("id") String id) {
	 	ServiceBean retVal = null;
	  	try {
	   		retVal = serviceBeanDao.findByIdEager(Long.parseLong(id));
	  	} catch (Exception e) {
	   		log.error(e.getMessage(), e);
	   		throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
	     		Status.INTERNAL_SERVER_ERROR);
	  	}
	  	return retVal;
    }

    @GET
	@Path("{id}/connectedEager")
	@Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
	public ServiceBean getConnectedEager(@PathParam("id") String id) {
	 	ServiceBean retVal = null;
	  	try {
	   		retVal = serviceBeanDao.findByIdConnectedEager(Long.parseLong(id));
	  	} catch (Exception e) {
	   		log.error(e.getMessage(), e);
	   		throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
	     		Status.INTERNAL_SERVER_ERROR);
	  	}
	  	return retVal;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
    public ServiceBean create(ServiceBean entity) {
		ServiceBean retVal = null;
		try {
			retVal = serviceBeanDao.persist(entity);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
    public ServiceBean update(ServiceBean entity) {
       ServiceBean retVal = null;
        try {
        	retVal = serviceBeanDao.merge(entity);
        } catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
		}
		return retVal;
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.TEXT_HTML)
    @Interceptors({AuthenticationInterceptor.class})
    public String remove(@PathParam("id") Long id) {
    	try {
        	serviceBeanDao.remove(id);
        } catch (Exception e) {
        	log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
        }
    	return MessageConstants.RSP_OK;
    }

    @GET
    @Path("count")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Long> count() {
    	Map<String, Long> retVal=null;
    	try {
    		Long count = serviceBeanDao.count();
    		retVal = new HashMap<String, Long>();
    		retVal.put("count", count);
        } catch (Exception e) {
        	log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
        }
    	return retVal;
    }
    
    @GET
    @Path("self")
    @ServiceGroup({"any", "customer", "doobia"})
    @Produces(MediaType.APPLICATION_JSON)
	@Interceptors(JsonizeInterceptor.class)
    public List<ServiceBean> getMyServiceGroups() {
    	AppUserBean user = (AppUserBean) request.getSession().getAttribute("user");
    	if(user == null) {
    		return new ArrayList<ServiceBean>();
    	}
		List<ServiceBean> retVal = null;
		try {
			retVal = new ArrayList<ServiceBean>(appUserBeanDao.getPermittedServices(user.getId()));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);			
		}
		return retVal;
    }


}