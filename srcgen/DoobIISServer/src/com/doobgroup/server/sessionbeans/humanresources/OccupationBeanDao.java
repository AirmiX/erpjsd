package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.OccupationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OccupationBeanDaoLocal.class)
public class OccupationBeanDao extends GenericDaoPagBean<OccupationBean, Long>
	implements OccupationBeanDaoLocal {

}
