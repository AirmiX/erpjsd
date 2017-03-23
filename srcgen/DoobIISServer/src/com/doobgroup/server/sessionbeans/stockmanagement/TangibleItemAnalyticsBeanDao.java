package com.doobgroup.server.sessionbeans.stockmanagement;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.stockmanagement.TangibleItemAnalyticsBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(TangibleItemAnalyticsBeanDaoLocal.class)
public class TangibleItemAnalyticsBeanDao extends GenericDaoPagBean<TangibleItemAnalyticsBean, Long>
	implements TangibleItemAnalyticsBeanDaoLocal {

}
