package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.DeclarationBasisBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(DeclarationBasisBeanDaoLocal.class)
public class DeclarationBasisBeanDao extends GenericDaoPagBean<DeclarationBasisBean, Long>
	implements DeclarationBasisBeanDaoLocal {

}
