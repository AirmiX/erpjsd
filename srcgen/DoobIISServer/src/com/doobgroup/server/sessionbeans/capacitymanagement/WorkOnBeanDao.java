package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.WorkOnBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkOnBeanDaoLocal.class)
public class WorkOnBeanDao extends GenericDaoPagBean<WorkOnBean, Long>
	implements WorkOnBeanDaoLocal {

}
