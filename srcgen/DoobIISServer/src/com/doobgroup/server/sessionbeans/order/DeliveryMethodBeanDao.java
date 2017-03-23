package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.DeliveryMethodBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DeliveryMethodBeanDaoLocal.class)
public class DeliveryMethodBeanDao extends GenericDaoPagBean<DeliveryMethodBean, Long>
	implements DeliveryMethodBeanDaoLocal {

}
