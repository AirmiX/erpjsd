package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ShippingDocumentItemBeanDaoLocal.class)
public class ShippingDocumentItemBeanDao extends GenericDaoPagBean<ShippingDocumentItemBean, Long>
	implements ShippingDocumentItemBeanDaoLocal {

}
