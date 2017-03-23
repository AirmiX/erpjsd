package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.PriceDesignationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PriceDesignationBeanDaoLocal.class)
public class PriceDesignationBeanDao extends GenericDaoPagBean<PriceDesignationBean, Long>
	implements PriceDesignationBeanDaoLocal {

}
