package com.doobgroup.server.sessionbeans.productionrequest;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RequestForProductionBeanDaoLocal.class)
public class RequestForProductionBeanDao extends GenericDaoPagBean<RequestForProductionBean, Long>
	implements RequestForProductionBeanDaoLocal {

}
