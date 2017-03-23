package com.doobgroup.server.sessionbeans.humanresources;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.humanresources.SchoolDegreeBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(SchoolDegreeBeanDaoLocal.class)
public class SchoolDegreeBeanDao extends GenericDaoPagBean<SchoolDegreeBean, Long>
	implements SchoolDegreeBeanDaoLocal {

}
