package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.WorkOrderHasProductionRequestsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkOrderHasProductionRequestsBeanDaoLocal.class)
public class WorkOrderHasProductionRequestsBeanDao extends GenericDaoPagBean<WorkOrderHasProductionRequestsBean, Long>
	implements WorkOrderHasProductionRequestsBeanDaoLocal {

}
