package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.ItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ItemBeanDaoLocal.class)
public class ItemBeanDao extends GenericDaoPagBean<ItemBean, Long>
	implements ItemBeanDaoLocal {

}
