package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.RateBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RateBeanDaoLocal.class)
public class RateBeanDao extends GenericDaoPagBean<RateBean, Long>
	implements RateBeanDaoLocal {

}
