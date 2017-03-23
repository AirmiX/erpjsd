package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.OccupationDescriptionBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OccupationDescriptionBeanDaoLocal.class)
public class OccupationDescriptionBeanDao extends GenericDaoPagBean<OccupationDescriptionBean, Long>
	implements OccupationDescriptionBeanDaoLocal {

}
