package com.doobgroup.server.entities.initialization;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Date;
import java.awt.Image;

import javax.persistence.CascadeType;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.Version;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import org.hibernate.annotations.Where;
import org.hibernate.annotations.SQLDelete;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import com.doobgroup.server.util.JsonDateDeserializer;
import com.doobgroup.server.util.JsonDateSerializer;

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;

@Entity
@Table(name = "TASKTYPE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TTCode"  	}))
@SQLDelete(sql="UPDATE TASKTYPE SET deleted = 1 WHERE TaskType_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TaskTypeBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TaskType_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TTCode", nullable = false)
	protected int TTCode;
	@Column(name = "TTName", nullable = false)
	protected String TTName;
	@Column(name = "TTDescription")
	protected String TTDescription;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @OneToMany(mappedBy = "taskType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "taskType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestHeadingBean> customerRequestHeaders = new HashSet<CustomerRequestHeadingBean>();
    @OneToMany(mappedBy = "taskType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionBean> requestForProduction = new HashSet<RequestForProductionBean>();

	@JsonProperty("id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonProperty("deleted")
	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	@JsonProperty("version")
	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		version = this.version;
	}

    @JsonProperty("TTCode")
	public int getTTCode() {
		return TTCode;
	}

	public void setTTCode(int TTCode) {
		this.TTCode = TTCode;
	}

    @JsonProperty("TTName")
	public String getTTName() {
		return TTName;
	}

	public void setTTName(String TTName) {
		this.TTName = TTName;
	}

    @JsonProperty("TTDescription")
	public String getTTDescription() {
		return TTDescription;
	}

	public void setTTDescription(String TTDescription) {
		this.TTDescription = TTDescription;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("customerRequestHeaders")
	public Set<CustomerRequestHeadingBean> getCustomerRequestHeaders() {
		return customerRequestHeaders;
	}

	public void setCustomerRequestHeaders(Set<CustomerRequestHeadingBean> customerRequestHeaders) {
		this.customerRequestHeaders = customerRequestHeaders;
	}

    @JsonProperty("requestForProduction")
	public Set<RequestForProductionBean> getRequestForProduction() {
		return requestForProduction;
	}

	public void setRequestForProduction(Set<RequestForProductionBean> requestForProduction) {
		this.requestForProduction = requestForProduction;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TaskTypeBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TaskTypeBean) o).getId()));
	}

	@Override
	public int hashCode() {
		if (id != null) {
			return id.hashCode();
		} else {
			return super.hashCode();
		}
	}

	@Override
	public String toString() {
		return "TaskTypeBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TTCode=" + TTCode
			+ ", TTName=" + TTName
			+ ", TTDescription=" + TTDescription
			// + ", organizationUnit=" + organizationUnit
			// + ", orderHeadings=" + orderHeadings
			// + ", customerRequestHeaders=" + customerRequestHeaders
			// + ", requestForProduction=" + requestForProduction
			+ "]";
	}
}