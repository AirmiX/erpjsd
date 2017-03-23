package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.AccountBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AccountBeanDaoLocal.class)
public class AccountBeanDao extends GenericDaoPagBean<AccountBean, Long>
	implements AccountBeanDaoLocal {

}
