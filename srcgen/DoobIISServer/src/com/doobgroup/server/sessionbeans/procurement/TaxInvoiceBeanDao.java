package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.TaxInvoiceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TaxInvoiceBeanDaoLocal.class)
public class TaxInvoiceBeanDao extends GenericDaoPagBean<TaxInvoiceBean, Long>
	implements TaxInvoiceBeanDaoLocal {

}
