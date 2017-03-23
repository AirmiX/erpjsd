package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.AlternativeWorkCenterStepsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AlternativeWorkCenterStepsBeanDaoLocal.class)
public class AlternativeWorkCenterStepsBeanDao extends GenericDaoPagBean<AlternativeWorkCenterStepsBean, Long>
	implements AlternativeWorkCenterStepsBeanDaoLocal {

}
