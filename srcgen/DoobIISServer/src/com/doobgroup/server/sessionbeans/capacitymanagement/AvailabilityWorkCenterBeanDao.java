package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.AvailabilityWorkCenterBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AvailabilityWorkCenterBeanDaoLocal.class)
public class AvailabilityWorkCenterBeanDao extends GenericDaoPagBean<AvailabilityWorkCenterBean, Long>
	implements AvailabilityWorkCenterBeanDaoLocal {

}
