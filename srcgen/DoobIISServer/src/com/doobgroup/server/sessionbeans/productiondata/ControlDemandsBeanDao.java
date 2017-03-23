package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.ControlDemandsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(ControlDemandsBeanDaoLocal.class)
public class ControlDemandsBeanDao extends GenericDaoPagBean<ControlDemandsBean, Long>
	implements ControlDemandsBeanDaoLocal {

}
