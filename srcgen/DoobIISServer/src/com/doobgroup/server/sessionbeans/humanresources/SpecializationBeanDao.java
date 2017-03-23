package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.SpecializationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(SpecializationBeanDaoLocal.class)
public class SpecializationBeanDao extends GenericDaoPagBean<SpecializationBean, Long>
	implements SpecializationBeanDaoLocal {

}