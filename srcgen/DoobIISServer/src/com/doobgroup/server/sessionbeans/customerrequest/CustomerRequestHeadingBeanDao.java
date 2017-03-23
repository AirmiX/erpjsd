package com.doobgroup.server.sessionbeans.customerrequest;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CustomerRequestHeadingBeanDaoLocal.class)
public class CustomerRequestHeadingBeanDao extends GenericDaoPagBean<CustomerRequestHeadingBean, Long>
	implements CustomerRequestHeadingBeanDaoLocal {

}
