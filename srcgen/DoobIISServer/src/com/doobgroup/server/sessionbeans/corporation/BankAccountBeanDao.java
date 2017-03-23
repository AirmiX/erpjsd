package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.BankAccountBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BankAccountBeanDaoLocal.class)
public class BankAccountBeanDao extends GenericDaoPagBean<BankAccountBean, Long>
	implements BankAccountBeanDaoLocal {

}
