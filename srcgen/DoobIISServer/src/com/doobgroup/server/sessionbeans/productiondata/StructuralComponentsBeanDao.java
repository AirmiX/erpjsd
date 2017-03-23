package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.StructuralComponentsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StructuralComponentsBeanDaoLocal.class)
public class StructuralComponentsBeanDao extends GenericDaoPagBean<StructuralComponentsBean, Long>
	implements StructuralComponentsBeanDaoLocal {

}
