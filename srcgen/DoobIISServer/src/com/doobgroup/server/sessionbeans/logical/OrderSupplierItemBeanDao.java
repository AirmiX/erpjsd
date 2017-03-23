package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.OrderSupplierItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrderSupplierItemBeanDaoLocal.class)
public class OrderSupplierItemBeanDao extends GenericDaoPagBean<OrderSupplierItemBean, Long>
	implements OrderSupplierItemBeanDaoLocal {

}
