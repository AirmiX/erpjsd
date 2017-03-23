package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.OtherQualificationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OtherQualificationBeanDaoLocal.class)
public class OtherQualificationBeanDao extends GenericDaoPagBean<OtherQualificationBean, Long>
	implements OtherQualificationBeanDaoLocal {

}
