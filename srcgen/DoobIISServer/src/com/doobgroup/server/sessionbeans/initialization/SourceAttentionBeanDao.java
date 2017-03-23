package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.SourceAttentionBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(SourceAttentionBeanDaoLocal.class)
public class SourceAttentionBeanDao extends GenericDaoPagBean<SourceAttentionBean, Long>
	implements SourceAttentionBeanDaoLocal {

}
