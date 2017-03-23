package com.doobgroup.server.sessionbeans.user;

import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.Query;

import com.doobgroup.server.entities.user.ServiceBean;
import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ServiceBeanDaoLocal.class)
public class ServiceBeanDao extends GenericDaoPagBean<ServiceBean, Long> implements ServiceBeanDaoLocal {
	
	@Override
	public ServiceBean findByUriAndMethod(String uri, String method) {
		Query q = em
				.createQuery("select distinct s from ServiceBean s where s.SUri = :uri and s.SMethod = :method");
		q.setParameter("uri", uri);
		q.setParameter("method", method);
		List<ServiceBean> services = q.getResultList();
		ServiceBean service = null;
		if (services.size() == 1) {
			service = services.get(0);
		}
		return service;
	}
}