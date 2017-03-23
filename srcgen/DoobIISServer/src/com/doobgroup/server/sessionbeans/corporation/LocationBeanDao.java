package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.LocationBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(LocationBeanDaoLocal.class)
public class LocationBeanDao extends GenericDaoPagBean<LocationBean, Long>
	implements LocationBeanDaoLocal {

}
