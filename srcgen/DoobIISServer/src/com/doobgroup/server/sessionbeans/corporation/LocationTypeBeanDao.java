package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.LocationTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(LocationTypeBeanDaoLocal.class)
public class LocationTypeBeanDao extends GenericDaoPagBean<LocationTypeBean, Long>
	implements LocationTypeBeanDaoLocal {

}
