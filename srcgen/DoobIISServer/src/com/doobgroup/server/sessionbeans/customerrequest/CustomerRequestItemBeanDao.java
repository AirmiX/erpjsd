package com.doobgroup.server.sessionbeans.customerrequest;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CustomerRequestItemBeanDaoLocal.class)
public class CustomerRequestItemBeanDao extends GenericDaoPagBean<CustomerRequestItemBean, Long>
	implements CustomerRequestItemBeanDaoLocal {

}
