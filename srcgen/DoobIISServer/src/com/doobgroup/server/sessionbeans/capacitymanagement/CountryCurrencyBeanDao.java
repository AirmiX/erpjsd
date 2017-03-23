package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.CountryCurrencyBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CountryCurrencyBeanDaoLocal.class)
public class CountryCurrencyBeanDao extends GenericDaoPagBean<CountryCurrencyBean, Long>
	implements CountryCurrencyBeanDaoLocal {

}
