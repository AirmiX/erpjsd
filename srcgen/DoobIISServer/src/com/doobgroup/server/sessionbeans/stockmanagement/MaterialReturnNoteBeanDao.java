package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(MaterialReturnNoteBeanDaoLocal.class)
public class MaterialReturnNoteBeanDao extends GenericDaoPagBean<MaterialReturnNoteBean, Long>
	implements MaterialReturnNoteBeanDaoLocal {

}
