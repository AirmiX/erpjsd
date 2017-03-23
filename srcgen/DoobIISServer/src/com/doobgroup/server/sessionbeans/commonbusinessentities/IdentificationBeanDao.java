package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(IdentificationBeanDaoLocal.class)
public class IdentificationBeanDao extends GenericDaoPagBean<IdentificationBean, Long>
	implements IdentificationBeanDaoLocal {

}
