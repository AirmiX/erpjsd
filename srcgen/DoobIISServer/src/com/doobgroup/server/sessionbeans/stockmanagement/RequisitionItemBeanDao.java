package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.RequisitionItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RequisitionItemBeanDaoLocal.class)
public class RequisitionItemBeanDao extends GenericDaoPagBean<RequisitionItemBean, Long>
	implements RequisitionItemBeanDaoLocal {

}
