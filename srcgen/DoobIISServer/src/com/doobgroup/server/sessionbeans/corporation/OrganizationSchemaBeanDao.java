package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.OrganizationSchemaBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OrganizationSchemaBeanDaoLocal.class)
public class OrganizationSchemaBeanDao extends GenericDaoPagBean<OrganizationSchemaBean, Long>
	implements OrganizationSchemaBeanDaoLocal {

}
