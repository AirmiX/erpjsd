package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TransferOrderBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TransferOrderBeanDaoLocal.class)
public class TransferOrderBeanDao extends GenericDaoPagBean<TransferOrderBean, Long>
	implements TransferOrderBeanDaoLocal {

}
