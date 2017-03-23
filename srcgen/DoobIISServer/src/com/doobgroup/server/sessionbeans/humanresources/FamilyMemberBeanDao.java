package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.FamilyMemberBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(FamilyMemberBeanDaoLocal.class)
public class FamilyMemberBeanDao extends GenericDaoPagBean<FamilyMemberBean, Long>
	implements FamilyMemberBeanDaoLocal {

}
