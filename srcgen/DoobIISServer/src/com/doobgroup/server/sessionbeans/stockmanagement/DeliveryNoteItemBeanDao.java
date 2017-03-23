package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.DeliveryNoteItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DeliveryNoteItemBeanDaoLocal.class)
public class DeliveryNoteItemBeanDao extends GenericDaoPagBean<DeliveryNoteItemBean, Long>
	implements DeliveryNoteItemBeanDaoLocal {

}
