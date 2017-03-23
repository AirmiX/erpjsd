package com.doobgroup.server.sessionbeans.environment;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.environment.PostOfficeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(PostOfficeBeanDaoLocal.class)
public class PostOfficeBeanDao extends GenericDaoPagBean<PostOfficeBean, Long>
	implements PostOfficeBeanDaoLocal {

}
