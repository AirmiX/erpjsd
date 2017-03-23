package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.ClassificationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ClassificationBeanDaoLocal.class)
public class ClassificationBeanDao extends GenericDaoPagBean<ClassificationBean, Long>
	implements ClassificationBeanDaoLocal {

}
