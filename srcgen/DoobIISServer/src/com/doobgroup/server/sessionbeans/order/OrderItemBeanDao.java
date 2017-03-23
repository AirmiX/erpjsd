package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.OrderItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrderItemBeanDaoLocal.class)
public class OrderItemBeanDao extends GenericDaoPagBean<OrderItemBean, Long>
	implements OrderItemBeanDaoLocal {

}
