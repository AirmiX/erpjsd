package com.doobgroup.server.sessionbeans.internalorder;

import javax.ejb.Local;
import javax.ejb.Stateless;

import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;

import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(BEOrderHeadingBeanDaoLocal.class)
public class BEOrderHeadingBeanDao extends GenericDaoPagBean<BEOrderHeadingBean, Long>
	implements BEOrderHeadingBeanDaoLocal {

}
