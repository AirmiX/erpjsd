package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.PaymentConditionBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PaymentConditionBeanDaoLocal.class)
public class PaymentConditionBeanDao extends GenericDaoPagBean<PaymentConditionBean, Long>
	implements PaymentConditionBeanDaoLocal {

}
