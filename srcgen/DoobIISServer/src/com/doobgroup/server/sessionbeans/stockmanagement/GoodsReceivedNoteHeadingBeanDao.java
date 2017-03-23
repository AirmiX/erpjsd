package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(GoodsReceivedNoteHeadingBeanDaoLocal.class)
public class GoodsReceivedNoteHeadingBeanDao extends GenericDaoPagBean<GoodsReceivedNoteHeadingBean, Long>
	implements GoodsReceivedNoteHeadingBeanDaoLocal {

}
