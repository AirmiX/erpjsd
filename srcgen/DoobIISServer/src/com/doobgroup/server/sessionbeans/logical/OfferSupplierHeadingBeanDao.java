package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OfferSupplierHeadingBeanDaoLocal.class)
public class OfferSupplierHeadingBeanDao extends GenericDaoPagBean<OfferSupplierHeadingBean, Long>
	implements OfferSupplierHeadingBeanDaoLocal {

}
