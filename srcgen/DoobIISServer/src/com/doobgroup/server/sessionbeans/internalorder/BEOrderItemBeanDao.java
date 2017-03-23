package com.doobgroup.server.sessionbeans.internalorder;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.internalorder.BEOrderItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BEOrderItemBeanDaoLocal.class)
public class BEOrderItemBeanDao extends GenericDaoPagBean<BEOrderItemBean, Long>
	implements BEOrderItemBeanDaoLocal {

}
