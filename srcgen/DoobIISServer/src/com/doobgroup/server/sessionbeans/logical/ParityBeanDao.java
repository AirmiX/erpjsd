package com.doobgroup.server.sessionbeans.logical;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.logical.ParityBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ParityBeanDaoLocal.class)
public class ParityBeanDao extends GenericDaoPagBean<ParityBean, Long>
	implements ParityBeanDaoLocal {

}
