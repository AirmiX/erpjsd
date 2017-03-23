package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.TerritorialUnitTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TerritorialUnitTypeBeanDaoLocal.class)
public class TerritorialUnitTypeBeanDao extends GenericDaoPagBean<TerritorialUnitTypeBean, Long>
	implements TerritorialUnitTypeBeanDaoLocal {

}
