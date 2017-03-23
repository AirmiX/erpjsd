package com.doobgroup.server.sessionbeans.productiondata;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.productiondata.StepTimeAnalysisBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(StepTimeAnalysisBeanDaoLocal.class)
public class StepTimeAnalysisBeanDao extends GenericDaoPagBean<StepTimeAnalysisBean, Long>
	implements StepTimeAnalysisBeanDaoLocal {

}
