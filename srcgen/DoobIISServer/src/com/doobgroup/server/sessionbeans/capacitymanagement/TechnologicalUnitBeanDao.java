package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TechnologicalUnitBeanDaoLocal.class)
public class TechnologicalUnitBeanDao extends GenericDaoPagBean<TechnologicalUnitBean, Long>
	implements TechnologicalUnitBeanDaoLocal {

}
