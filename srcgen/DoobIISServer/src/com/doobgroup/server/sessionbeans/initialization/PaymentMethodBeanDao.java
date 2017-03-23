package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.PaymentMethodBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PaymentMethodBeanDaoLocal.class)
public class PaymentMethodBeanDao extends GenericDaoPagBean<PaymentMethodBean, Long>
	implements PaymentMethodBeanDaoLocal {

}
