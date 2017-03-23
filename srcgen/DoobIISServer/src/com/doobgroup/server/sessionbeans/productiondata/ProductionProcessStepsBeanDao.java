package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.ProductionProcessStepsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProductionProcessStepsBeanDaoLocal.class)
public class ProductionProcessStepsBeanDao extends GenericDaoPagBean<ProductionProcessStepsBean, Long>
	implements ProductionProcessStepsBeanDaoLocal {

}
