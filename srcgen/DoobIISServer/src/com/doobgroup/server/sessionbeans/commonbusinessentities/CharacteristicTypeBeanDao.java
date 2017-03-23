package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.CharacteristicTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CharacteristicTypeBeanDaoLocal.class)
public class CharacteristicTypeBeanDao extends GenericDaoPagBean<CharacteristicTypeBean, Long>
	implements CharacteristicTypeBeanDaoLocal {

}
