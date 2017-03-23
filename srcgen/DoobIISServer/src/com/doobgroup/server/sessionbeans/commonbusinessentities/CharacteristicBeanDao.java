package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.CharacteristicBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CharacteristicBeanDaoLocal.class)
public class CharacteristicBeanDao extends GenericDaoPagBean<CharacteristicBean, Long>
	implements CharacteristicBeanDaoLocal {

}
