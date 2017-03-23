package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.AuthorityBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AuthorityBeanDaoLocal.class)
public class AuthorityBeanDao extends GenericDaoPagBean<AuthorityBean, Long>
	implements AuthorityBeanDaoLocal {

}
