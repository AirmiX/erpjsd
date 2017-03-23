package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.BankAccountTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BankAccountTypeBeanDaoLocal.class)
public class BankAccountTypeBeanDao extends GenericDaoPagBean<BankAccountTypeBean, Long>
	implements BankAccountTypeBeanDaoLocal {

}
