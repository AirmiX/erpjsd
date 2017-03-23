package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.CompanyBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CompanyBeanDaoLocal.class)
public class CompanyBeanDao extends GenericDaoPagBean<CompanyBean, Long>
	implements CompanyBeanDaoLocal {

}
