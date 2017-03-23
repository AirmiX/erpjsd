package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.ConsumableSuppliesBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ConsumableSuppliesBeanDaoLocal.class)
public class ConsumableSuppliesBeanDao extends GenericDaoPagBean<ConsumableSuppliesBean, Long>
	implements ConsumableSuppliesBeanDaoLocal {

}
