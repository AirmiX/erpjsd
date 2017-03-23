package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountByAddressBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TangibleItemAmmountByAddressBeanDaoLocal.class)
public class TangibleItemAmmountByAddressBeanDao extends GenericDaoPagBean<TangibleItemAmmountByAddressBean, Long>
	implements TangibleItemAmmountByAddressBeanDaoLocal {

}
