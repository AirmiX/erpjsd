package com.doobgroup.server.sessionbeans.user;

import com.doobgroup.server.entities.user.ServiceBean;
import com.doobgroup.server.sessionbeans.common.GenericDaoPag;

public interface ServiceBeanDaoLocal extends GenericDaoPag<ServiceBean, Long>  {

	ServiceBean findByUriAndMethod(String uri, String method);
	
}