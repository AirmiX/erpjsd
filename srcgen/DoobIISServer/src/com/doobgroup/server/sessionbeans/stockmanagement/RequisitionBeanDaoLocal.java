package com.doobgroup.server.sessionbeans.stockmanagement;

import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.sessionbeans.common.GenericDao;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.doobgroup.server.util.RestrictSoftDeleteException;

public interface RequisitionBeanDaoLocal extends GenericDao<RequisitionBean, Long>  {

    public RequisitionBean crudEager(RequisitionBean entity, String dmlOperation) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchFieldException, RestrictSoftDeleteException;

}
