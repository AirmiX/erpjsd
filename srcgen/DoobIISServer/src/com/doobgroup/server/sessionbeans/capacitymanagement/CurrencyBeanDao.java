package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CurrencyBeanDaoLocal.class)
public class CurrencyBeanDao extends GenericDaoPagBean<CurrencyBean, Long>
	implements CurrencyBeanDaoLocal {

}
