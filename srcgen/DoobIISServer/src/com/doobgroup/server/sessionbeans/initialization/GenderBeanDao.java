package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.GenderBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(GenderBeanDaoLocal.class)
public class GenderBeanDao extends GenericDaoPagBean<GenderBean, Long>
	implements GenderBeanDaoLocal {

}
