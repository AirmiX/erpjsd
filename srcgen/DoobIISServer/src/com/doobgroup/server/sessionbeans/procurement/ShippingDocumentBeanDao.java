package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.ShippingDocumentBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ShippingDocumentBeanDaoLocal.class)
public class ShippingDocumentBeanDao extends GenericDaoPagBean<ShippingDocumentBean, Long>
	implements ShippingDocumentBeanDaoLocal {

}
