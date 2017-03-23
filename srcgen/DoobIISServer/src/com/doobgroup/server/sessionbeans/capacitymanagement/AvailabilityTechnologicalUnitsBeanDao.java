package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.AvailabilityTechnologicalUnitsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AvailabilityTechnologicalUnitsBeanDaoLocal.class)
public class AvailabilityTechnologicalUnitsBeanDao extends GenericDaoPagBean<AvailabilityTechnologicalUnitsBean, Long>
	implements AvailabilityTechnologicalUnitsBeanDaoLocal {

}
