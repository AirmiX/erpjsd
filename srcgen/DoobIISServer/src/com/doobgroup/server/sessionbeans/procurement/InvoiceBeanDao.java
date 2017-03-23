package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.InvoiceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(InvoiceBeanDaoLocal.class)
public class InvoiceBeanDao extends GenericDaoPagBean<InvoiceBean, Long>
	implements InvoiceBeanDaoLocal {

}
