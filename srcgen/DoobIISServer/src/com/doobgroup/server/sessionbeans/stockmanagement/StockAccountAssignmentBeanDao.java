package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.StockAccountAssignmentBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StockAccountAssignmentBeanDaoLocal.class)
public class StockAccountAssignmentBeanDao extends GenericDaoPagBean<StockAccountAssignmentBean, Long>
	implements StockAccountAssignmentBeanDaoLocal {

}
