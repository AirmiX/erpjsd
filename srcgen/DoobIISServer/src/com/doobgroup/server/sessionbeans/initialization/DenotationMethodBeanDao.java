package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.DenotationMethodBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DenotationMethodBeanDaoLocal.class)
public class DenotationMethodBeanDao extends GenericDaoPagBean<DenotationMethodBean, Long>
	implements DenotationMethodBeanDaoLocal {

}
