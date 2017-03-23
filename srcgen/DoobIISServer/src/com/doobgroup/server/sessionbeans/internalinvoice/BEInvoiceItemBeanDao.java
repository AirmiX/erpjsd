package com.doobgroup.server.sessionbeans.internalinvoice;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.internalinvoice.BEInvoiceItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BEInvoiceItemBeanDaoLocal.class)
public class BEInvoiceItemBeanDao extends GenericDaoPagBean<BEInvoiceItemBean, Long>
	implements BEInvoiceItemBeanDaoLocal {

}
