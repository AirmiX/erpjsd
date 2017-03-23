package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.MVCityBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MVCityBeanDaoLocal.class)
public class MVCityBeanDao extends GenericDaoPagBean<MVCityBean, Long>
	implements MVCityBeanDaoLocal {

}
