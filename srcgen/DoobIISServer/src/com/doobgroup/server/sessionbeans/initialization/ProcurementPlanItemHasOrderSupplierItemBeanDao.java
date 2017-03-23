package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.ProcurementPlanItemHasOrderSupplierItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProcurementPlanItemHasOrderSupplierItemBeanDaoLocal.class)
public class ProcurementPlanItemHasOrderSupplierItemBeanDao extends GenericDaoPagBean<ProcurementPlanItemHasOrderSupplierItemBean, Long>
	implements ProcurementPlanItemHasOrderSupplierItemBeanDaoLocal {

}
