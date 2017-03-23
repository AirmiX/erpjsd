package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.PriceArchiveBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PriceArchiveBeanDaoLocal.class)
public class PriceArchiveBeanDao extends GenericDaoPagBean<PriceArchiveBean, Long>
	implements PriceArchiveBeanDaoLocal {

}
