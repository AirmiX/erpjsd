package com.doobgroup.server.services.initialization;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.interceptor.Interceptors;
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

import com.doobgroup.server.entities.initialization.ProcurementPlanItemHasOrderSupplierItemBean;
import com.doobgroup.server.sessionbeans.initialization.ProcurementPlanItemHasOrderSupplierItemBeanDaoLocal;

import com.doobgroup.server.interceptors.AuthenticationInterceptor;
import com.doobgroup.server.interceptors.JsonizeInterceptor;
import com.doobgroup.server.util.MessageConstants;
import com.doobgroup.server.util.ServiceException;

@Stateless
@Path("/initialization/procurementplanitemhasordersupplieritems")
public class ProcurementPlanItemHasOrderSupplierItemService {

	private static Logger log = Logger.getLogger(ProcurementPlanItemHasOrderSupplierItemService.class);

	@EJB
	private ProcurementPlanItemHasOrderSupplierItemBeanDaoLocal procurementPlanItemHasOrderSupplierItemBeanDao;

	@Context
	private HttpServletResponse response;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Interceptors({JsonizeInterceptor.class, AuthenticationInterceptor.class})
	public List<ProcurementPlanItemHasOrderSupplierItemBean> findAll() {
		List<ProcurementPlanItemHasOrderSupplierItemBean> retVal = null;
		try {
			retVal = procurementPlanItemHasOrderSupplierItemBeanDao.findAll();

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
    public ProcurementPlanItemHasOrderSupplierItemBean findById(@PathParam("id") String id) {
		ProcurementPlanItemHasOrderSupplierItemBean retVal = null;
		try {
			retVal = procurementPlanItemHasOrderSupplierItemBeanDao.findById(Long.parseLong(id));
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
	 public ProcurementPlanItemHasOrderSupplierItemBean getEager(@PathParam("id") String id) {
	 	ProcurementPlanItemHasOrderSupplierItemBean retVal = null;
	  	try {
	   		retVal = procurementPlanItemHasOrderSupplierItemBeanDao.findByIdEager(Long.parseLong(id));
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
	public ProcurementPlanItemHasOrderSupplierItemBean getConnectedEager(@PathParam("id") String id) {
	 	ProcurementPlanItemHasOrderSupplierItemBean retVal = null;
	  	try {
	   		retVal = procurementPlanItemHasOrderSupplierItemBeanDao.findByIdConnectedEager(Long.parseLong(id));
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
    public ProcurementPlanItemHasOrderSupplierItemBean create(ProcurementPlanItemHasOrderSupplierItemBean entity) {
		ProcurementPlanItemHasOrderSupplierItemBean retVal = null;
		try {
			retVal = procurementPlanItemHasOrderSupplierItemBeanDao.persist(entity);
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
    public ProcurementPlanItemHasOrderSupplierItemBean update(ProcurementPlanItemHasOrderSupplierItemBean entity) {
       ProcurementPlanItemHasOrderSupplierItemBean retVal = null;
        try {
        	retVal = procurementPlanItemHasOrderSupplierItemBeanDao.merge(entity);
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
        	procurementPlanItemHasOrderSupplierItemBeanDao.remove(id);
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
    		Long count = procurementPlanItemHasOrderSupplierItemBeanDao.count();
    		retVal = new HashMap<String, Long>();
    		retVal.put("count", count);
        } catch (Exception e) {
        	log.error(e.getMessage(), e);
			throw new ServiceException(MessageConstants.RSP_UNKNOWN_ERROR,
					Status.INTERNAL_SERVER_ERROR);
        }
    	return retVal;
    }
}