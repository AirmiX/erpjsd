package com.doobgroup.server.sessionbeans.internalinvoice;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.internalinvoice.BETaxInvoiceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BETaxInvoiceBeanDaoLocal.class)
public class BETaxInvoiceBeanDao extends GenericDaoPagBean<BETaxInvoiceBean, Long>
	implements BETaxInvoiceBeanDaoLocal {

}
