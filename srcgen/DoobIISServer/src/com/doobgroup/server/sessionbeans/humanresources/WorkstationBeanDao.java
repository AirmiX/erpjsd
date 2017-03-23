package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.WorkstationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkstationBeanDaoLocal.class)
public class WorkstationBeanDao extends GenericDaoPagBean<WorkstationBean, Long>
	implements WorkstationBeanDaoLocal {

}
