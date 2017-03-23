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

import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.entities.corporation.AccountBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;

@Entity
@Table(name = "REQUISITIONITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RIOrdinalNumber"  ,  "requisition"  	}))
@SQLDelete(sql="UPDATE REQUISITIONITEM SET deleted = 1 WHERE RequisitionItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise" })
public class RequisitionItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RequisitionItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RIOrdinalNumber", nullable = false)
	protected int RIOrdinalNumber;
	@Column(name = "RILocationAddress", nullable = false)
	protected String RILocationAddress;
	@Column(name = "RIQuantityStandardized", nullable = false)
	protected int RIQuantityStandardized;
	@Column(name = "RIQuantityRequisitioned", nullable = false)
	protected int RIQuantityRequisitioned;
	@Column(name = "RIQuantityReserved", nullable = false)
	protected int RIQuantityReserved;
	@Column(name = "RIQuantityIssued", nullable = false)
	protected int RIQuantityIssued;
	@Column(name = "RIBookValueAmmount", nullable = false)
	protected int RIBookValueAmmount;
	@Column(name = "RIPriceDesignation", nullable = false)
	protected int RIPriceDesignation;
	@Column(name = "RIPostingPosition", nullable = false)
	protected char RIPostingPosition;
	@Column(name = "RIAmmountAfterPosting", nullable = false)
	protected int RIAmmountAfterPosting;
	@Column(name = "RIBatchNumber")
	protected char RIBatchNumber;
	@Column(name = "RIStorno")
	protected char RIStorno;
	@Column(name = "RIStepNumber")
	protected int RIStepNumber;
	@Column(name = "RIStatusReservedNotIssued", nullable = false)
	protected char RIStatusReservedNotIssued;
	@Column(name = "RIDocumentNumber")
	protected int RIDocumentNumber;
	@Column(name = "RISecurityIndicator")
	protected char RISecurityIndicator;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="requisition")
    protected RequisitionBean requisition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="accountStock")
    protected AccountBean accountStock;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="measurementUnit")
    protected MeasurementUnitBean measurementUnit;

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

    @JsonProperty("RIOrdinalNumber")
	public int getRIOrdinalNumber() {
		return RIOrdinalNumber;
	}

	public void setRIOrdinalNumber(int RIOrdinalNumber) {
		this.RIOrdinalNumber = RIOrdinalNumber;
	}

    @JsonProperty("RILocationAddress")
	public String getRILocationAddress() {
		return RILocationAddress;
	}

	public void setRILocationAddress(String RILocationAddress) {
		this.RILocationAddress = RILocationAddress;
	}

    @JsonProperty("RIQuantityStandardized")
	public int getRIQuantityStandardized() {
		return RIQuantityStandardized;
	}

	public void setRIQuantityStandardized(int RIQuantityStandardized) {
		this.RIQuantityStandardized = RIQuantityStandardized;
	}

    @JsonProperty("RIQuantityRequisitioned")
	public int getRIQuantityRequisitioned() {
		return RIQuantityRequisitioned;
	}

	public void setRIQuantityRequisitioned(int RIQuantityRequisitioned) {
		this.RIQuantityRequisitioned = RIQuantityRequisitioned;
	}

    @JsonProperty("RIQuantityReserved")
	public int getRIQuantityReserved() {
		return RIQuantityReserved;
	}

	public void setRIQuantityReserved(int RIQuantityReserved) {
		this.RIQuantityReserved = RIQuantityReserved;
	}

    @JsonProperty("RIQuantityIssued")
	public int getRIQuantityIssued() {
		return RIQuantityIssued;
	}

	public void setRIQuantityIssued(int RIQuantityIssued) {
		this.RIQuantityIssued = RIQuantityIssued;
	}

    @JsonProperty("RIBookValueAmmount")
	public int getRIBookValueAmmount() {
		return RIBookValueAmmount;
	}

	public void setRIBookValueAmmount(int RIBookValueAmmount) {
		this.RIBookValueAmmount = RIBookValueAmmount;
	}

    @JsonProperty("RIPriceDesignation")
	public int getRIPriceDesignation() {
		return RIPriceDesignation;
	}

	public void setRIPriceDesignation(int RIPriceDesignation) {
		this.RIPriceDesignation = RIPriceDesignation;
	}

    @JsonProperty("RIPostingPosition")
	public char getRIPostingPosition() {
		return RIPostingPosition;
	}

	public void setRIPostingPosition(char RIPostingPosition) {
		this.RIPostingPosition = RIPostingPosition;
	}

    @JsonProperty("RIAmmountAfterPosting")
	public int getRIAmmountAfterPosting() {
		return RIAmmountAfterPosting;
	}

	public void setRIAmmountAfterPosting(int RIAmmountAfterPosting) {
		this.RIAmmountAfterPosting = RIAmmountAfterPosting;
	}

    @JsonProperty("RIBatchNumber")
	public char getRIBatchNumber() {
		return RIBatchNumber;
	}

	public void setRIBatchNumber(char RIBatchNumber) {
		this.RIBatchNumber = RIBatchNumber;
	}

    @JsonProperty("RIStorno")
	public char getRIStorno() {
		return RIStorno;
	}

	public void setRIStorno(char RIStorno) {
		this.RIStorno = RIStorno;
	}

    @JsonProperty("RIStepNumber")
	public int getRIStepNumber() {
		return RIStepNumber;
	}

	public void setRIStepNumber(int RIStepNumber) {
		this.RIStepNumber = RIStepNumber;
	}

    @JsonProperty("RIStatusReservedNotIssued")
	public char getRIStatusReservedNotIssued() {
		return RIStatusReservedNotIssued;
	}

	public void setRIStatusReservedNotIssued(char RIStatusReservedNotIssued) {
		this.RIStatusReservedNotIssued = RIStatusReservedNotIssued;
	}

    @JsonProperty("RIDocumentNumber")
	public int getRIDocumentNumber() {
		return RIDocumentNumber;
	}

	public void setRIDocumentNumber(int RIDocumentNumber) {
		this.RIDocumentNumber = RIDocumentNumber;
	}

    @JsonProperty("RISecurityIndicator")
	public char getRISecurityIndicator() {
		return RISecurityIndicator;
	}

	public void setRISecurityIndicator(char RISecurityIndicator) {
		this.RISecurityIndicator = RISecurityIndicator;
	}


    @JsonProperty("requisition")
	public RequisitionBean getRequisition() {
		return requisition;
	}

    public void setRequisition(RequisitionBean requisition) {
		this.requisition = requisition;
	}

    @JsonProperty("account")
	public AccountBean getAccount() {
		return account;
	}

    public void setAccount(AccountBean account) {
		this.account = account;
	}

    @JsonProperty("tangibleItemCondition")
	public TangibleItemConditionBean getTangibleItemCondition() {
		return tangibleItemCondition;
	}

    public void setTangibleItemCondition(TangibleItemConditionBean tangibleItemCondition) {
		this.tangibleItemCondition = tangibleItemCondition;
	}

    @JsonProperty("accountStock")
	public AccountBean getAccountStock() {
		return accountStock;
	}

    public void setAccountStock(AccountBean accountStock) {
		this.accountStock = accountStock;
	}

    @JsonProperty("measurementUnit")
	public MeasurementUnitBean getMeasurementUnit() {
		return measurementUnit;
	}

    public void setMeasurementUnit(MeasurementUnitBean measurementUnit) {
		this.measurementUnit = measurementUnit;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RequisitionItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RequisitionItemBean) o).getId()));
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
		return "RequisitionItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RIOrdinalNumber=" + RIOrdinalNumber
			+ ", RILocationAddress=" + RILocationAddress
			+ ", RIQuantityStandardized=" + RIQuantityStandardized
			+ ", RIQuantityRequisitioned=" + RIQuantityRequisitioned
			+ ", RIQuantityReserved=" + RIQuantityReserved
			+ ", RIQuantityIssued=" + RIQuantityIssued
			+ ", RIBookValueAmmount=" + RIBookValueAmmount
			+ ", RIPriceDesignation=" + RIPriceDesignation
			+ ", RIPostingPosition=" + RIPostingPosition
			+ ", RIAmmountAfterPosting=" + RIAmmountAfterPosting
			+ ", RIBatchNumber=" + RIBatchNumber
			+ ", RIStorno=" + RIStorno
			+ ", RIStepNumber=" + RIStepNumber
			+ ", RIStatusReservedNotIssued=" + RIStatusReservedNotIssued
			+ ", RIDocumentNumber=" + RIDocumentNumber
			+ ", RISecurityIndicator=" + RISecurityIndicator
			// + ", requisition=" + requisition
			// + ", account=" + account
			// + ", tangibleItemCondition=" + tangibleItemCondition
			// + ", accountStock=" + accountStock
			// + ", measurementUnit=" + measurementUnit
			+ "]";
	}
}