package com.doobgroup.server.sessionbeans.capacitymanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.capacitymanagement.AssetBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AssetBeanDaoLocal.class)
public class AssetBeanDao extends GenericDaoPagBean<AssetBean, Long>
	implements AssetBeanDaoLocal {

}
