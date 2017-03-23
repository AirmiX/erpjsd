package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.IdentificationArchiveBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(IdentificationArchiveBeanDaoLocal.class)
public class IdentificationArchiveBeanDao extends GenericDaoPagBean<IdentificationArchiveBean, Long>
	implements IdentificationArchiveBeanDaoLocal {

}
