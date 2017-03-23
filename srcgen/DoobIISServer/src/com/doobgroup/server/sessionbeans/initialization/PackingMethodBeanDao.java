package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.PackingMethodBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PackingMethodBeanDaoLocal.class)
public class PackingMethodBeanDao extends GenericDaoPagBean<PackingMethodBean, Long>
	implements PackingMethodBeanDaoLocal {

}
