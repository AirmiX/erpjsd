package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.StockroomOrgUniBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StockroomOrgUniBeanDaoLocal.class)
public class StockroomOrgUniBeanDao extends GenericDaoPagBean<StockroomOrgUniBean, Long>
	implements StockroomOrgUniBeanDaoLocal {

}
