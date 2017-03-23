package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.RequestForProposalItemBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RequestForProposalItemBeanDaoLocal.class)
public class RequestForProposalItemBeanDao extends GenericDaoPagBean<RequestForProposalItemBean, Long>
	implements RequestForProposalItemBeanDaoLocal {

}
