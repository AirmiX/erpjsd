package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.InvoiceItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(InvoiceItemBeanDaoLocal.class)
public class InvoiceItemBeanDao extends GenericDaoPagBean<InvoiceItemBean, Long>
	implements InvoiceItemBeanDaoLocal {

}
