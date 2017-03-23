package com.doobgroup.server.sessionbeans.sellingprice;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.sellingprice.SellingPriceBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(SellingPriceBeanDaoLocal.class)
public class SellingPriceBeanDao extends GenericDaoPagBean<SellingPriceBean, Long>
	implements SellingPriceBeanDaoLocal {

}
