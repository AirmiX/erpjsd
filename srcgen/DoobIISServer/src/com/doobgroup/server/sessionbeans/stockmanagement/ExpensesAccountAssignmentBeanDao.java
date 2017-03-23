package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.ExpensesAccountAssignmentBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ExpensesAccountAssignmentBeanDaoLocal.class)
public class ExpensesAccountAssignmentBeanDao extends GenericDaoPagBean<ExpensesAccountAssignmentBean, Long>
	implements ExpensesAccountAssignmentBeanDaoLocal {

}
