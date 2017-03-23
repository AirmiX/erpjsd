package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.RFPItemProcurementPlanItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RFPItemProcurementPlanItemBeanDaoLocal.class)
public class RFPItemProcurementPlanItemBeanDao extends GenericDaoPagBean<RFPItemProcurementPlanItemBean, Long>
	implements RFPItemProcurementPlanItemBeanDaoLocal {

}
