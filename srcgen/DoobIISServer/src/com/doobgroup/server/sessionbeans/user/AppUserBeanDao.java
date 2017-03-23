package com.doobgroup.server.sessionbeans.user;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import org.apache.log4j.Logger;
import org.hibernate.FlushMode;
import org.mindrot.jbcrypt.BCrypt;

import com.doobgroup.server.entities.user.AppUserBean;
import com.doobgroup.server.entities.user.ServiceBean;
import com.doobgroup.server.entities.user.ServiceGroupBean;
import com.doobgroup.server.sessionbeans.common.GenericDaoPagBean;

@Stateless
@Local(AppUserBeanDaoLocal.class)
public class AppUserBeanDao extends GenericDaoPagBean<AppUserBean, Long> implements AppUserBeanDaoLocal {
	
	private static Logger log = Logger.getLogger(AppUserBeanDao.class);
	
	@Context
	private HttpServletRequest request;
	
	@SuppressWarnings("unchecked")
	@Override
	public AppUserBean findByUsernameAndPasword(String username, String password) {
		AppUserBean user = null;
		Query q = em.createQuery("select distinct u from AppUserBean u where u.UUsername = :username ");
		q.setParameter("username", username);
		//q.setParameter("password", password);
		List<AppUserBean> users = q.getResultList();	
		if (users.size() == 1) { //if user with this username exists
			//compare password parameter with hashed password in the database
			if (BCrypt.checkpw(password, users.get(0).getUPassword())) {
				user = users.get(0);
				//user.setUPassword(null);
			}
		}	
		return user;
	}
	
	@Override
	public AppUserBean persist(AppUserBean entity) {
		//encrypt password before persisting
		log.info(entity.getUPassword());
		String hashedPwd = BCrypt.hashpw(entity.getUPassword(), BCrypt.gensalt());
		entity.setUPassword(hashedPwd);
		log.info(entity.getUPassword());
		
		em.persist(entity);
		
		return entity;
	}
	
	@Override
	public AppUserBean merge(AppUserBean entity) {
		//encrypt password before persisting
		if(entity.getUPassword().equals("passtest")) {
			Query q = em.createQuery("select x.UPassword  from "
					+ "AppUserBean x");		
			List<String> users = q.getResultList();
			entity.setUPassword(users.get(0));
		} else {
		//log.info(entity.getUPassword());
			String hashedPwd = BCrypt.hashpw(entity.getUPassword(), BCrypt.gensalt());
			entity.setUPassword(hashedPwd);
			log.info(entity.getUPassword());
		}
		entity = em.merge(entity);
		
		return entity;
	}
	
	@Override
	public Integer findMaxId() {
		Query q = em.createQuery("select max(x.UIdentificationCode) as max from "
				+ "AppUserBean x");		
		List<Integer> users = q.getResultList();		
		if (users.get(0) == null)
			return 0;
		else
			return users.get(0);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Set<ServiceBean> getPermittedServices(Long id) {
		List<ServiceBean> services = null;
		Query q = em.createQuery("select distinct s from AppUserBean u " +
			"join u.userGroups ug " +
			"join ug.serviceGroups sg " +
			"join sg.services s "+ 
			"where u.id = :id");
		q.setParameter("id", id);
		services = q.getResultList();	
		return new HashSet<ServiceBean>(services);

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ServiceGroupBean> getPermittedServiceGroups(Long id) {
		List<ServiceGroupBean> serviceGroups = null;
		Query q = em.createQuery("select distinct sg from AppUserBean u " +
			"join u.userGroups ug " +
			"join ug.serviceGroups sg " +
			"where u.id = :id");
		q.setParameter("id", id);
		serviceGroups = q.getResultList();	
		return serviceGroups;
	}
	
	@Override
	public boolean changePassword(String currentPassword, String newPassword) throws NoSuchFieldException {
		AppUserBean user = findById(((AppUserBean) request.getSession().getAttribute("user")).getId());
		log.info("AAAAAAAAAA" + user.getUPassword());
		if (BCrypt.checkpw(currentPassword, user.getUPassword())) {
			user.setUPassword(newPassword);
			merge(user);
			return true;		
		} else {
			return false;
		}
	}

	@Override
	public AppUserBean login(AppUserBean user) {
		AppUserBean user1 = findByIdEager(user.getId());
    	user1.setULogged(true);
		user1 = em.merge(user1);
		return user1;
	}
	
	@Override
	public AppUserBean logut(AppUserBean user) {
		AppUserBean user1 = findByIdEager(user.getId());
    	user1.setULogged(false);
		user1 = em.merge(user1);
		return user1;
	}
	
	
}