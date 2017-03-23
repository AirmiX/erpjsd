package com.doobgroup.server.sessionbeans.stockmanagement;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.Query;

import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionItemBean;
import com.doobgroup.server.services.stockmanagement.RequisitionItemService;
import com.doobgroup.server.sessionbeans.common.GenericDaoBean;
import com.doobgroup.server.util.RestrictSoftDeleteException;

@Stateless
@Local(RequisitionBeanDaoLocal.class)
public class RequisitionBeanDao extends GenericDaoBean<RequisitionBean, Long>
	implements RequisitionBeanDaoLocal {

	@EJB
	private RequisitionItemBeanDaoLocal requisitionitemDao;

	@Override
	public RequisitionBean crudEager(RequisitionBean entity, String dmlOperation) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException {

		if(dmlOperation.equals("I")) {
			this.persist(entity);
		}
		else if(dmlOperation.equals("U")) {
			this.merge(entity);
		}
		else if(dmlOperation.equals("D")) {
			this.remove(entity);
		}
		for(RequisitionItemBean requisitionitem : entity.getRequisitionItems()) {

			requisitionitem.setRequisition(entity);
			if(requisitionitem.getDeleted() == true) {
				if(requisitionitem.getId() != null) {
					requisitionitem.setDeleted(false);
					requisitionitemDao.remove(requisitionitem);
				}
			}
			else if(requisitionitem.getId() != null) {
				requisitionitemDao.merge(requisitionitem);
			}
			else {
				requisitionitemDao.persist(requisitionitem);
			}
		}

		return entity;
	}

}
