package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.FinalDegreeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(FinalDegreeBeanDaoLocal.class)
public class FinalDegreeBeanDao extends GenericDaoPagBean<FinalDegreeBean, Long>
	implements FinalDegreeBeanDaoLocal {

}
