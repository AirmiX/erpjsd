package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.JobCatalogBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(JobCatalogBeanDaoLocal.class)
public class JobCatalogBeanDao extends GenericDaoPagBean<JobCatalogBean, Long>
	implements JobCatalogBeanDaoLocal {

}
