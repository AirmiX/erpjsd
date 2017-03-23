package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.OrganizationUnitTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrganizationUnitTypeBeanDaoLocal.class)
public class OrganizationUnitTypeBeanDao extends GenericDaoPagBean<OrganizationUnitTypeBean, Long>
	implements OrganizationUnitTypeBeanDaoLocal {

}
