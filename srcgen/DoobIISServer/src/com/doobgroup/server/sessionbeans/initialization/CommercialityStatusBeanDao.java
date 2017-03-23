package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.CommercialityStatusBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(CommercialityStatusBeanDaoLocal.class)
public class CommercialityStatusBeanDao extends GenericDaoPagBean<CommercialityStatusBean, Long>
	implements CommercialityStatusBeanDaoLocal {

}
