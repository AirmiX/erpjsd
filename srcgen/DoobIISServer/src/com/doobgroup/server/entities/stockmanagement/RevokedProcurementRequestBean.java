package com.doobgroup.server.entities.stockmanagement;

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

import com.doobgroup.server.entities.initialization.ProcurementRequestItemBean;

@Entity
@Table(name = "REVOKEDPROCUREMENTREQUEST"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RPRDate"  ,  "procurementRequestItem"  	}))
@SQLDelete(sql="UPDATE REVOKEDPROCUREMENTREQUEST SET deleted = 1 WHERE RevokedProcurementRequest_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RevokedProcurementRequestBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RevokedProcurementRequest_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RPRDate", nullable = false)
	protected Date RPRDate;
	@Column(name = "RPRIdentificationNumber", nullable = false)
	protected int RPRIdentificationNumber;
	@Column(name = "RPRMeasurementUnit", nullable = false)
	protected int RPRMeasurementUnit;
	@Column(name = "RPRQuantityRequested", nullable = false)
	protected int RPRQuantityRequested;
	@Column(name = "RPRQuantityRealized", nullable = false)
	protected int RPRQuantityRealized;
	@Column(name = "RPRProcurementDeadline", nullable = false)
	protected Date RPRProcurementDeadline;
	@Column(name = "RPRWorkOrderContractPlace", nullable = false)
	protected String RPRWorkOrderContractPlace;
	@Column(name = "RPRStatus")
	protected String RPRStatus;
	@Column(name = "RPRRemark")
	protected String RPRRemark;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="procurementRequestItem")
    protected ProcurementRequestItemBean procurementRequestItem;

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

    @JsonProperty("RPRDate")
	public Date getRPRDate() {
		return RPRDate;
	}

	public void setRPRDate(Date RPRDate) {
		this.RPRDate = RPRDate;
	}

    @JsonProperty("RPRIdentificationNumber")
	public int getRPRIdentificationNumber() {
		return RPRIdentificationNumber;
	}

	public void setRPRIdentificationNumber(int RPRIdentificationNumber) {
		this.RPRIdentificationNumber = RPRIdentificationNumber;
	}

    @JsonProperty("RPRMeasurementUnit")
	public int getRPRMeasurementUnit() {
		return RPRMeasurementUnit;
	}

	public void setRPRMeasurementUnit(int RPRMeasurementUnit) {
		this.RPRMeasurementUnit = RPRMeasurementUnit;
	}

    @JsonProperty("RPRQuantityRequested")
	public int getRPRQuantityRequested() {
		return RPRQuantityRequested;
	}

	public void setRPRQuantityRequested(int RPRQuantityRequested) {
		this.RPRQuantityRequested = RPRQuantityRequested;
	}

    @JsonProperty("RPRQuantityRealized")
	public int getRPRQuantityRealized() {
		return RPRQuantityRealized;
	}

	public void setRPRQuantityRealized(int RPRQuantityRealized) {
		this.RPRQuantityRealized = RPRQuantityRealized;
	}

    @JsonProperty("RPRProcurementDeadline")
	public Date getRPRProcurementDeadline() {
		return RPRProcurementDeadline;
	}

	public void setRPRProcurementDeadline(Date RPRProcurementDeadline) {
		this.RPRProcurementDeadline = RPRProcurementDeadline;
	}

    @JsonProperty("RPRWorkOrderContractPlace")
	public String getRPRWorkOrderContractPlace() {
		return RPRWorkOrderContractPlace;
	}

	public void setRPRWorkOrderContractPlace(String RPRWorkOrderContractPlace) {
		this.RPRWorkOrderContractPlace = RPRWorkOrderContractPlace;
	}

    @JsonProperty("RPRStatus")
	public String getRPRStatus() {
		return RPRStatus;
	}

	public void setRPRStatus(String RPRStatus) {
		this.RPRStatus = RPRStatus;
	}

    @JsonProperty("RPRRemark")
	public String getRPRRemark() {
		return RPRRemark;
	}

	public void setRPRRemark(String RPRRemark) {
		this.RPRRemark = RPRRemark;
	}


    @JsonProperty("procurementRequestItem")
	public ProcurementRequestItemBean getProcurementRequestItem() {
		return procurementRequestItem;
	}

    public void setProcurementRequestItem(ProcurementRequestItemBean procurementRequestItem) {
		this.procurementRequestItem = procurementRequestItem;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RevokedProcurementRequestBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RevokedProcurementRequestBean) o).getId()));
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
		return "RevokedProcurementRequestBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RPRDate=" + RPRDate
			+ ", RPRIdentificationNumber=" + RPRIdentificationNumber
			+ ", RPRMeasurementUnit=" + RPRMeasurementUnit
			+ ", RPRQuantityRequested=" + RPRQuantityRequested
			+ ", RPRQuantityRealized=" + RPRQuantityRealized
			+ ", RPRProcurementDeadline=" + RPRProcurementDeadline
			+ ", RPRWorkOrderContractPlace=" + RPRWorkOrderContractPlace
			+ ", RPRStatus=" + RPRStatus
			+ ", RPRRemark=" + RPRRemark
			// + ", procurementRequestItem=" + procurementRequestItem
			+ "]";
	}
}