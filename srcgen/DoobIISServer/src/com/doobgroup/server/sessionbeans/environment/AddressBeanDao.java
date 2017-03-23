package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.AddressBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AddressBeanDaoLocal.class)
public class AddressBeanDao extends GenericDaoPagBean<AddressBean, Long>
	implements AddressBeanDaoLocal {

}
