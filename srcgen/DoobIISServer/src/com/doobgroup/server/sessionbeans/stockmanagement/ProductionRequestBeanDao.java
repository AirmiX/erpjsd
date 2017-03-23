package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.ProductionRequestBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductionRequestBeanDaoLocal.class)
public class ProductionRequestBeanDao extends GenericDaoPagBean<ProductionRequestBean, Long>
	implements ProductionRequestBeanDaoLocal {

}
