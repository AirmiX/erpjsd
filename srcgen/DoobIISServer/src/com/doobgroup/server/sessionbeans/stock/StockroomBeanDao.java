package com.doobgroup.server.sessionbeans.stock;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stock.StockroomBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StockroomBeanDaoLocal.class)
public class StockroomBeanDao extends GenericDaoPagBean<StockroomBean, Long>
	implements StockroomBeanDaoLocal {

}
