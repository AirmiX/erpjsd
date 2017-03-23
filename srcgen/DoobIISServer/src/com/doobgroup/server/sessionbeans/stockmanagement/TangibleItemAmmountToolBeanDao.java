package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountToolBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TangibleItemAmmountToolBeanDaoLocal.class)
public class TangibleItemAmmountToolBeanDao extends GenericDaoPagBean<TangibleItemAmmountToolBean, Long>
	implements TangibleItemAmmountToolBeanDaoLocal {

}
