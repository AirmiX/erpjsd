package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.OrderGroupBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrderGroupBeanDaoLocal.class)
public class OrderGroupBeanDao extends GenericDaoPagBean<OrderGroupBean, Long>
	implements OrderGroupBeanDaoLocal {

}
