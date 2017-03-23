package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TransactionLogBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TransactionLogBeanDaoLocal.class)
public class TransactionLogBeanDao extends GenericDaoPagBean<TransactionLogBean, Long>
	implements TransactionLogBeanDaoLocal {

}
