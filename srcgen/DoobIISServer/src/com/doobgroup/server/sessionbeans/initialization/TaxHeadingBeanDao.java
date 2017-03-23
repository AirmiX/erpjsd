package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.TaxHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TaxHeadingBeanDaoLocal.class)
public class TaxHeadingBeanDao extends GenericDaoPagBean<TaxHeadingBean, Long>
	implements TaxHeadingBeanDaoLocal {

}
