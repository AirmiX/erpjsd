package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.ProcurementPlanItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProcurementPlanItemBeanDaoLocal.class)
public class ProcurementPlanItemBeanDao extends GenericDaoPagBean<ProcurementPlanItemBean, Long>
	implements ProcurementPlanItemBeanDaoLocal {

}
