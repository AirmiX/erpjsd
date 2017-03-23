package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.BalanceResourceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BalanceResourceBeanDaoLocal.class)
public class BalanceResourceBeanDao extends GenericDaoPagBean<BalanceResourceBean, Long>
	implements BalanceResourceBeanDaoLocal {

}
