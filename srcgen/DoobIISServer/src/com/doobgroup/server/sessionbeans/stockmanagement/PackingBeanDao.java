package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.PackingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PackingBeanDaoLocal.class)
public class PackingBeanDao extends GenericDaoPagBean<PackingBean, Long>
	implements PackingBeanDaoLocal {

}
