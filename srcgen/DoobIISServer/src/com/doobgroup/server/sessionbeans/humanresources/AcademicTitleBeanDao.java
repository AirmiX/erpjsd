package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.AcademicTitleBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AcademicTitleBeanDaoLocal.class)
public class AcademicTitleBeanDao extends GenericDaoPagBean<AcademicTitleBean, Long>
	implements AcademicTitleBeanDaoLocal {

}
