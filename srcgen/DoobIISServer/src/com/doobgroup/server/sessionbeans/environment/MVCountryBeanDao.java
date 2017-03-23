package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.MVCountryBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MVCountryBeanDaoLocal.class)
public class MVCountryBeanDao extends GenericDaoPagBean<MVCountryBean, Long>
	implements MVCountryBeanDaoLocal {

}
