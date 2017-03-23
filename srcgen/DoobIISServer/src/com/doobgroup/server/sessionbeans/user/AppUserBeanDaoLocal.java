package com.doobgroup.server.sessionbeans.user;

import java.util.List;
import java.util.Set;

import com.doobgroup.server.entities.user.AppUserBean;
import com.doobgroup.server.entities.user.ServiceBean;
import com.doobgroup.server.entities.user.ServiceGroupBean;
import com.doobgroup.server.sessionbeans.common.GenericDaoPag;

public interface AppUserBeanDaoLocal extends GenericDaoPag<AppUserBean, Long>  {

	AppUserBean findByUsernameAndPasword(String uUsername, String uPassword);

	Integer findMaxId();

	Set<ServiceBean> getPermittedServices(Long id);

	List<ServiceGroupBean> getPermittedServiceGroups(Long id);

	boolean changePassword(String currentPassword, String newPassword) throws NoSuchFieldException;


	AppUserBean logut(AppUserBean user);

	AppUserBean login(AppUserBean user);

	//boolean hasServiceGroup(Long userId, String serviceGroupName);
	
}