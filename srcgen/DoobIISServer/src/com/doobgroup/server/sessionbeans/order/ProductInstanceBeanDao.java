package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.ProductInstanceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductInstanceBeanDaoLocal.class)
public class ProductInstanceBeanDao extends GenericDaoPagBean<ProductInstanceBean, Long>
	implements ProductInstanceBeanDaoLocal {

}
