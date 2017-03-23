package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TangibleItemStatusBeanDaoLocal.class)
public class TangibleItemStatusBeanDao extends GenericDaoPagBean<TangibleItemStatusBean, Long>
	implements TangibleItemStatusBeanDaoLocal {

}
