package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.PackagingStatusBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PackagingStatusBeanDaoLocal.class)
public class PackagingStatusBeanDao extends GenericDaoPagBean<PackagingStatusBean, Long>
	implements PackagingStatusBeanDaoLocal {

}
