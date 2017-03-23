package com.doobgroup.server.sessionbeans.renaming;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.renaming.RenamingItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RenamingItemBeanDaoLocal.class)
public class RenamingItemBeanDao extends GenericDaoPagBean<RenamingItemBean, Long>
	implements RenamingItemBeanDaoLocal {

}
