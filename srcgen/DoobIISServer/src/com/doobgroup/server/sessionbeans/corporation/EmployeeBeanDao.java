package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.EmployeeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(EmployeeBeanDaoLocal.class)
public class EmployeeBeanDao extends GenericDaoPagBean<EmployeeBean, Long>
	implements EmployeeBeanDaoLocal {

}
