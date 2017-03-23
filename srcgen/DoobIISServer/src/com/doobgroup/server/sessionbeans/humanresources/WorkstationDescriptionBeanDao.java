package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.WorkstationDescriptionBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkstationDescriptionBeanDaoLocal.class)
public class WorkstationDescriptionBeanDao extends GenericDaoPagBean<WorkstationDescriptionBean, Long>
	implements WorkstationDescriptionBeanDaoLocal {

}
