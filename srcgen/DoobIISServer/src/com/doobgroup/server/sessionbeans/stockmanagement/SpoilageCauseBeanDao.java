package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.SpoilageCauseBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(SpoilageCauseBeanDaoLocal.class)
public class SpoilageCauseBeanDao extends GenericDaoPagBean<SpoilageCauseBean, Long>
	implements SpoilageCauseBeanDaoLocal {

}
