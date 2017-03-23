package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProFormaInvoiceBeanDaoLocal.class)
public class ProFormaInvoiceBeanDao extends GenericDaoPagBean<ProFormaInvoiceBean, Long>
	implements ProFormaInvoiceBeanDaoLocal {

}
