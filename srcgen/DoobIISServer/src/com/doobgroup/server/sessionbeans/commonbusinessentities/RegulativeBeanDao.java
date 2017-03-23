package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.RegulativeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RegulativeBeanDaoLocal.class)
public class RegulativeBeanDao extends GenericDaoPagBean<RegulativeBean, Long>
	implements RegulativeBeanDaoLocal {

}
