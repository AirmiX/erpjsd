package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.StepToolBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StepToolBeanDaoLocal.class)
public class StepToolBeanDao extends GenericDaoPagBean<StepToolBean, Long>
	implements StepToolBeanDaoLocal {

}
