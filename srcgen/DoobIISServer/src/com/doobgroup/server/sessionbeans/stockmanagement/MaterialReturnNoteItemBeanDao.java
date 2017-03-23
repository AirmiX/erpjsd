package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MaterialReturnNoteItemBeanDaoLocal.class)
public class MaterialReturnNoteItemBeanDao extends GenericDaoPagBean<MaterialReturnNoteItemBean, Long>
	implements MaterialReturnNoteItemBeanDaoLocal {

}
