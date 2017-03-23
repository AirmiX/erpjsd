package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.MVStateBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MVStateBeanDaoLocal.class)
public class MVStateBeanDao extends GenericDaoPagBean<MVStateBean, Long>
	implements MVStateBeanDaoLocal {

}
