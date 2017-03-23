package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.WorkOrderBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkOrderBeanDaoLocal.class)
public class WorkOrderBeanDao extends GenericDaoPagBean<WorkOrderBean, Long>
	implements WorkOrderBeanDaoLocal {

}
