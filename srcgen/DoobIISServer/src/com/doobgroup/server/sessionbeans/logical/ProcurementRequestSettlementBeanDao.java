package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.ProcurementRequestSettlementBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProcurementRequestSettlementBeanDaoLocal.class)
public class ProcurementRequestSettlementBeanDao extends GenericDaoPagBean<ProcurementRequestSettlementBean, Long>
	implements ProcurementRequestSettlementBeanDaoLocal {

}
