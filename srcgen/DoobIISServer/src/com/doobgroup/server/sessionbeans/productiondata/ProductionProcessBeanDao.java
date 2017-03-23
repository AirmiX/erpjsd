package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.ProductionProcessBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductionProcessBeanDaoLocal.class)
public class ProductionProcessBeanDao extends GenericDaoPagBean<ProductionProcessBean, Long>
	implements ProductionProcessBeanDaoLocal {

}
