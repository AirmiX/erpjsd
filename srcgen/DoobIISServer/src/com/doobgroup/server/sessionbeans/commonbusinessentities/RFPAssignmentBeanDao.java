package com.doobgroup.server.sessionbeans.commonbusinessentities;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.commonbusinessentities.RFPAssignmentBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(RFPAssignmentBeanDaoLocal.class)
public class RFPAssignmentBeanDao extends GenericDaoPagBean<RFPAssignmentBean, Long>
	implements RFPAssignmentBeanDaoLocal {

}
