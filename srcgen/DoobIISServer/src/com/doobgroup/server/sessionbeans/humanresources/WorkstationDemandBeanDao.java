package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.WorkstationDemandBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkstationDemandBeanDaoLocal.class)
public class WorkstationDemandBeanDao extends GenericDaoPagBean<WorkstationDemandBean, Long>
	implements WorkstationDemandBeanDaoLocal {

}
