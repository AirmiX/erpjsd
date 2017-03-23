package com.doobgroup.server.sessionbeans.renaming;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.renaming.RenamingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RenamingBeanDaoLocal.class)
public class RenamingBeanDao extends GenericDaoPagBean<RenamingBean, Long>
	implements RenamingBeanDaoLocal {

}
