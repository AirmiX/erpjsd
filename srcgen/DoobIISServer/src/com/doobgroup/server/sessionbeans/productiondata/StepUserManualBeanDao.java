package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.StepUserManualBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StepUserManualBeanDaoLocal.class)
public class StepUserManualBeanDao extends GenericDaoPagBean<StepUserManualBean, Long>
	implements StepUserManualBeanDaoLocal {

}
