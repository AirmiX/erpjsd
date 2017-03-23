package com.doobgroup.server.sessionbeans.procurementplan;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurementplan.PlanningPeriodBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PlanningPeriodBeanDaoLocal.class)
public class PlanningPeriodBeanDao extends GenericDaoPagBean<PlanningPeriodBean, Long>
	implements PlanningPeriodBeanDaoLocal {

}
