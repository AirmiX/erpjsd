package com.doobgroup.server.sessionbeans.initialization;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.initialization.GoodsAcceptanceStatusBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(GoodsAcceptanceStatusBeanDaoLocal.class)
public class GoodsAcceptanceStatusBeanDao extends GenericDaoPagBean<GoodsAcceptanceStatusBean, Long>
	implements GoodsAcceptanceStatusBeanDaoLocal {

}
