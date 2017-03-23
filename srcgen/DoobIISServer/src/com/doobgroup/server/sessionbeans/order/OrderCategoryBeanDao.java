package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.OrderCategoryBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrderCategoryBeanDaoLocal.class)
public class OrderCategoryBeanDao extends GenericDaoPagBean<OrderCategoryBean, Long>
	implements OrderCategoryBeanDaoLocal {

}
