package com.doobgroup.server.sessionbeans.procurement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.procurement.TaxProformaInvoiceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TaxProformaInvoiceBeanDaoLocal.class)
public class TaxProformaInvoiceBeanDao extends GenericDaoPagBean<TaxProformaInvoiceBean, Long>
	implements TaxProformaInvoiceBeanDaoLocal {

}
