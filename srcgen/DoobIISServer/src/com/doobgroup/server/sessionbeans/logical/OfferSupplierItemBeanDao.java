package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.OfferSupplierItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OfferSupplierItemBeanDaoLocal.class)
public class OfferSupplierItemBeanDao extends GenericDaoPagBean<OfferSupplierItemBean, Long>
	implements OfferSupplierItemBeanDaoLocal {

}
