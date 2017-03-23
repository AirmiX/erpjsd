package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.RevokedProcurementRequestBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RevokedProcurementRequestBeanDaoLocal.class)
public class RevokedProcurementRequestBeanDao extends GenericDaoPagBean<RevokedProcurementRequestBean, Long>
	implements RevokedProcurementRequestBeanDaoLocal {

}
