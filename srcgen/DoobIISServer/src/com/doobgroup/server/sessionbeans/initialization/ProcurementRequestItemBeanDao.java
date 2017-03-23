package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.ProcurementRequestItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProcurementRequestItemBeanDaoLocal.class)
public class ProcurementRequestItemBeanDao extends GenericDaoPagBean<ProcurementRequestItemBean, Long>
	implements ProcurementRequestItemBeanDaoLocal {

}
