package com.doobgroup.server.sessionbeans.sellingprice;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.sellingprice.OUBelongingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(OUBelongingBeanDaoLocal.class)
public class OUBelongingBeanDao extends GenericDaoPagBean<OUBelongingBean, Long>
	implements OUBelongingBeanDaoLocal {

}
