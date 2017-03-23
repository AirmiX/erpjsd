package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.WorkCenterStepsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkCenterStepsBeanDaoLocal.class)
public class WorkCenterStepsBeanDao extends GenericDaoPagBean<WorkCenterStepsBean, Long>
	implements WorkCenterStepsBeanDaoLocal {

}
