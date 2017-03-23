package com.doobgroup.server.sessionbeans.user;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.user.UserGroupBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(UserGroupBeanDaoLocal.class)
public class UserGroupBeanDao extends GenericDaoPagBean<UserGroupBean, Long>
	implements UserGroupBeanDaoLocal {

}
