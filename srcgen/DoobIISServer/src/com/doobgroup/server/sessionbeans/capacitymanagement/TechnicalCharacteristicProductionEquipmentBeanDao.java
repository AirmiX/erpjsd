package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.TechnicalCharacteristicProductionEquipmentBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TechnicalCharacteristicProductionEquipmentBeanDaoLocal.class)
public class TechnicalCharacteristicProductionEquipmentBeanDao extends GenericDaoPagBean<TechnicalCharacteristicProductionEquipmentBean, Long>
	implements TechnicalCharacteristicProductionEquipmentBeanDaoLocal {

}
