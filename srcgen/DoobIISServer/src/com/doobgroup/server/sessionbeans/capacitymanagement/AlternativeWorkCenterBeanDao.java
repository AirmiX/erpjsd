package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.AlternativeWorkCenterBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AlternativeWorkCenterBeanDaoLocal.class)
public class AlternativeWorkCenterBeanDao extends GenericDaoPagBean<AlternativeWorkCenterBean, Long>
	implements AlternativeWorkCenterBeanDaoLocal {

}
