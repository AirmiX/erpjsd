package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(GoodsReceivedNoteItemBeanDaoLocal.class)
public class GoodsReceivedNoteItemBeanDao extends GenericDaoPagBean<GoodsReceivedNoteItemBean, Long>
	implements GoodsReceivedNoteItemBeanDaoLocal {

}
