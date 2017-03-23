package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.TerritorialUnitBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TerritorialUnitBeanDaoLocal.class)
public class TerritorialUnitBeanDao extends GenericDaoPagBean<TerritorialUnitBean, Long>
	implements TerritorialUnitBeanDaoLocal {

}
