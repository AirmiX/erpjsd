package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.ProductBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductBeanDaoLocal.class)
public class ProductBeanDao extends GenericDaoPagBean<ProductBean, Long>
	implements ProductBeanDaoLocal {

}
