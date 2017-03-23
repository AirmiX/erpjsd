package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.NationalityBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(NationalityBeanDaoLocal.class)
public class NationalityBeanDao extends GenericDaoPagBean<NationalityBean, Long>
	implements NationalityBeanDaoLocal {

}
