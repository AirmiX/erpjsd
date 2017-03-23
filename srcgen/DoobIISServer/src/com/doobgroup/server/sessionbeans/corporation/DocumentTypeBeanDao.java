package com.doobgroup.server.sessionbeans.corporation;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.corporation.DocumentTypeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DocumentTypeBeanDaoLocal.class)
public class DocumentTypeBeanDao extends GenericDaoPagBean<DocumentTypeBean, Long>
	implements DocumentTypeBeanDaoLocal {

}
