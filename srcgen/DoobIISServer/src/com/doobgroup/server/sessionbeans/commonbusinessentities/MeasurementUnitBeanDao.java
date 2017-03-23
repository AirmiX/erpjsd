package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MeasurementUnitBeanDaoLocal.class)
public class MeasurementUnitBeanDao extends GenericDaoPagBean<MeasurementUnitBean, Long>
	implements MeasurementUnitBeanDaoLocal {

}
