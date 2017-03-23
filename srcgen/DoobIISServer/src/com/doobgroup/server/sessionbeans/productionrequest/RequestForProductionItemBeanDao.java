package com.doobgroup.server.sessionbeans.productionrequest;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RequestForProductionItemBeanDaoLocal.class)
public class RequestForProductionItemBeanDao extends GenericDaoPagBean<RequestForProductionItemBean, Long>
	implements RequestForProductionItemBeanDaoLocal {

}
