package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.OccupationDemandBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OccupationDemandBeanDaoLocal.class)
public class OccupationDemandBeanDao extends GenericDaoPagBean<OccupationDemandBean, Long>
	implements OccupationDemandBeanDaoLocal {

}
