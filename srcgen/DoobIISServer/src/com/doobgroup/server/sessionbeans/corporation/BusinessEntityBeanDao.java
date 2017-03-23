package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.BusinessEntityBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BusinessEntityBeanDaoLocal.class)
public class BusinessEntityBeanDao extends GenericDaoPagBean<BusinessEntityBean, Long>
	implements BusinessEntityBeanDaoLocal {

}
