package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.DiscountTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DiscountTypeBeanDaoLocal.class)
public class DiscountTypeBeanDao extends GenericDaoPagBean<DiscountTypeBean, Long>
	implements DiscountTypeBeanDaoLocal {

}
