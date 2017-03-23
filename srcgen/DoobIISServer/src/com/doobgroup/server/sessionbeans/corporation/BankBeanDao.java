package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.BankBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BankBeanDaoLocal.class)
public class BankBeanDao extends GenericDaoPagBean<BankBean, Long>
	implements BankBeanDaoLocal {

}
