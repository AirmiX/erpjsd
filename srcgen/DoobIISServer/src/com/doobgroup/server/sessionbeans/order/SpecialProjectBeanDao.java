package com.doobgroup.server.sessionbeans.order;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.order.SpecialProjectBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(SpecialProjectBeanDaoLocal.class)
public class SpecialProjectBeanDao extends GenericDaoPagBean<SpecialProjectBean, Long>
	implements SpecialProjectBeanDaoLocal {

}
