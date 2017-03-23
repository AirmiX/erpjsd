package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.IdentificationHasSynonimForPartnerBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(IdentificationHasSynonimForPartnerBeanDaoLocal.class)
public class IdentificationHasSynonimForPartnerBeanDao extends GenericDaoPagBean<IdentificationHasSynonimForPartnerBean, Long>
	implements IdentificationHasSynonimForPartnerBeanDaoLocal {

}
