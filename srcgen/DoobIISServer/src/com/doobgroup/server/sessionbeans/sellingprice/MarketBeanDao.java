package com.doobgroup.server.sessionbeans.sellingprice;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.sellingprice.MarketBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MarketBeanDaoLocal.class)
public class MarketBeanDao extends GenericDaoPagBean<MarketBean, Long>
	implements MarketBeanDaoLocal {

}
