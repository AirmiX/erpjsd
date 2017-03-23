package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.TransferOrderItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TransferOrderItemBeanDaoLocal.class)
public class TransferOrderItemBeanDao extends GenericDaoPagBean<TransferOrderItemBean, Long>
	implements TransferOrderItemBeanDaoLocal {

}
