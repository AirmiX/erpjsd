package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrganizationUnitBeanDaoLocal.class)
public class OrganizationUnitBeanDao extends GenericDaoPagBean<OrganizationUnitBean, Long>
	implements OrganizationUnitBeanDaoLocal {

}
