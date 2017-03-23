package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.WorkCenterBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkCenterBeanDaoLocal.class)
public class WorkCenterBeanDao extends GenericDaoPagBean<WorkCenterBean, Long>
	implements WorkCenterBeanDaoLocal {

}
