package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.TaxBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TaxBeanDaoLocal.class)
public class TaxBeanDao extends GenericDaoPagBean<TaxBean, Long>
	implements TaxBeanDaoLocal {

}
