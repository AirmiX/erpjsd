package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountByLotBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TangibleItemAmmountByLotBeanDaoLocal.class)
public class TangibleItemAmmountByLotBeanDao extends GenericDaoPagBean<TangibleItemAmmountByLotBean, Long>
	implements TangibleItemAmmountByLotBeanDaoLocal {

}
