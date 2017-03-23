package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.WorkCalendarBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(WorkCalendarBeanDaoLocal.class)
public class WorkCalendarBeanDao extends GenericDaoPagBean<WorkCalendarBean, Long>
	implements WorkCalendarBeanDaoLocal {

}
