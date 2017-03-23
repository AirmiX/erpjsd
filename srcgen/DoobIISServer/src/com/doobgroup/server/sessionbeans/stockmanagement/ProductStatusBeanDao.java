package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.ProductStatusBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductStatusBeanDaoLocal.class)
public class ProductStatusBeanDao extends GenericDaoPagBean<ProductStatusBean, Long>
	implements ProductStatusBeanDaoLocal {

}
