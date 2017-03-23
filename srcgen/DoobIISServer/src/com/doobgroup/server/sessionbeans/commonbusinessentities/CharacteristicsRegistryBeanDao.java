package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.CharacteristicsRegistryBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CharacteristicsRegistryBeanDaoLocal.class)
public class CharacteristicsRegistryBeanDao extends GenericDaoPagBean<CharacteristicsRegistryBean, Long>
	implements CharacteristicsRegistryBeanDaoLocal {

}
