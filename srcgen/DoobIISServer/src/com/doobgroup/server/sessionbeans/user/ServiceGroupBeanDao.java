package com.doobgroup.server.sessionbeans.user;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.user.ServiceGroupBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ServiceGroupBeanDaoLocal.class)
public class ServiceGroupBeanDao extends GenericDaoPagBean<ServiceGroupBean, Long>
	implements ServiceGroupBeanDaoLocal {

}
