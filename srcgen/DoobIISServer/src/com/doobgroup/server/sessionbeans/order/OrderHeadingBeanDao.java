package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.OrderHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrderHeadingBeanDaoLocal.class)
public class OrderHeadingBeanDao extends GenericDaoPagBean<OrderHeadingBean, Long>
	implements OrderHeadingBeanDaoLocal {

}
