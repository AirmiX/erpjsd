package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.UrgentStatusBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(UrgentStatusBeanDaoLocal.class)
public class UrgentStatusBeanDao extends GenericDaoPagBean<UrgentStatusBean, Long>
	implements UrgentStatusBeanDaoLocal {

}
