package com.doobgroup.server.sessionbeans.internalinvoice;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.internalinvoice.BEInvoiceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BEInvoiceBeanDaoLocal.class)
public class BEInvoiceBeanDao extends GenericDaoPagBean<BEInvoiceBean, Long>
	implements BEInvoiceBeanDaoLocal {

}
