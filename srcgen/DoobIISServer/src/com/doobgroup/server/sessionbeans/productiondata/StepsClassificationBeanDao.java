package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.StepsClassificationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StepsClassificationBeanDaoLocal.class)
public class StepsClassificationBeanDao extends GenericDaoPagBean<StepsClassificationBean, Long>
	implements StepsClassificationBeanDaoLocal {

}
