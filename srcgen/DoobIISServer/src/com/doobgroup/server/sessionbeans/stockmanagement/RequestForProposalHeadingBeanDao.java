package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.RequestForProposalHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RequestForProposalHeadingBeanDaoLocal.class)
public class RequestForProposalHeadingBeanDao extends GenericDaoPagBean<RequestForProposalHeadingBean, Long>
	implements RequestForProposalHeadingBeanDaoLocal {

}
