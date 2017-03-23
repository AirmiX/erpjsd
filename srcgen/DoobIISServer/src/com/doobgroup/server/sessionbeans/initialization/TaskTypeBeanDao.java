package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.TaskTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TaskTypeBeanDaoLocal.class)
public class TaskTypeBeanDao extends GenericDaoPagBean<TaskTypeBean, Long>
	implements TaskTypeBeanDaoLocal {

}
