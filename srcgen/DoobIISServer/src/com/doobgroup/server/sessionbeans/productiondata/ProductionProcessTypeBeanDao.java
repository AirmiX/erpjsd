package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.ProductionProcessTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductionProcessTypeBeanDaoLocal.class)
public class ProductionProcessTypeBeanDao extends GenericDaoPagBean<ProductionProcessTypeBean, Long>
	implements ProductionProcessTypeBeanDaoLocal {

}
