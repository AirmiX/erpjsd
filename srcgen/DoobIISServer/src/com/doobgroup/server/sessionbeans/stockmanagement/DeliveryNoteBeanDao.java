package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.DeliveryNoteBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DeliveryNoteBeanDaoLocal.class)
public class DeliveryNoteBeanDao extends GenericDaoPagBean<DeliveryNoteBean, Long>
	implements DeliveryNoteBeanDaoLocal {

}
