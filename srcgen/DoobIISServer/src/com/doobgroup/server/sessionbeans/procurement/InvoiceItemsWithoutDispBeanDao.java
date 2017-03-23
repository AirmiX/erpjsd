package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.InvoiceItemsWithoutDispBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(InvoiceItemsWithoutDispBeanDaoLocal.class)
public class InvoiceItemsWithoutDispBeanDao extends GenericDaoPagBean<InvoiceItemsWithoutDispBean, Long>
	implements InvoiceItemsWithoutDispBeanDaoLocal {

}
