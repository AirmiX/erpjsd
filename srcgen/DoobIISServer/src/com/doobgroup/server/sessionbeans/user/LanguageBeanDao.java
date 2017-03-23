package com.doobgroup.server.sessionbeans.user;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.user.LanguageBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(LanguageBeanDaoLocal.class)
public class LanguageBeanDao extends GenericDaoPagBean<LanguageBean, Long>
	implements LanguageBeanDaoLocal {

}
