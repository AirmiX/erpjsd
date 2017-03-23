package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.ClassificationArchiveBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ClassificationArchiveBeanDaoLocal.class)
public class ClassificationArchiveBeanDao extends GenericDaoPagBean<ClassificationArchiveBean, Long>
	implements ClassificationArchiveBeanDaoLocal {

}
