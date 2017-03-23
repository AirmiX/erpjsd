package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.ProcurementPlanHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProcurementPlanHeadingBeanDaoLocal.class)
public class ProcurementPlanHeadingBeanDao extends GenericDaoPagBean<ProcurementPlanHeadingBean, Long>
	implements ProcurementPlanHeadingBeanDaoLocal {

}
