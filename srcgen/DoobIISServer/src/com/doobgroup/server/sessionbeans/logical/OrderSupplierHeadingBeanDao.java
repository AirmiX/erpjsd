package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrderSupplierHeadingBeanDaoLocal.class)
public class OrderSupplierHeadingBeanDao extends GenericDaoPagBean<OrderSupplierHeadingBean, Long>
	implements OrderSupplierHeadingBeanDaoLocal {

}
