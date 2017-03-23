package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.ProcurementRequestHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ProcurementRequestHeadingBeanDaoLocal.class)
public class ProcurementRequestHeadingBeanDao extends GenericDaoPagBean<ProcurementRequestHeadingBean, Long>
	implements ProcurementRequestHeadingBeanDaoLocal {

}
