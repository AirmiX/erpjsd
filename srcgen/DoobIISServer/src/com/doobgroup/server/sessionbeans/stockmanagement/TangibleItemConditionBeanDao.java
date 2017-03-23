package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TangibleItemConditionBeanDaoLocal.class)
public class TangibleItemConditionBeanDao extends GenericDaoPagBean<TangibleItemConditionBean, Long>
	implements TangibleItemConditionBeanDaoLocal {

}
