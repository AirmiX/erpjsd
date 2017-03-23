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

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.corporation.AccountBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;

@Entity
@Table(name = "DELIVERYNOTEITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "DNIOrdinalNumber"  ,  "deliveryNote"  	}))
@SQLDelete(sql="UPDATE DELIVERYNOTEITEM SET deleted = 1 WHERE DeliveryNoteItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class DeliveryNoteItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DeliveryNoteItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "DNIOrdinalNumber", nullable = false)
	protected int DNIOrdinalNumber;
	@Column(name = "DNILocationAddress")
	protected String DNILocationAddress;
	@Column(name = "DNIMeasurementUnit", nullable = false)
	protected String DNIMeasurementUnit;
	@Column(name = "DNIQuantityLaunched")
	protected int DNIQuantityLaunched;
	@Column(name = "DNIQuantityRejected")
	protected int DNIQuantityRejected;
	@Column(name = "DNIQuantityReceived", nullable = false)
	protected int DNIQuantityReceived;
	@Column(name = "DNIPlannedPrice")
	protected int DNIPlannedPrice;
	@Column(name = "DNIBookValueAmmount")
	protected int DNIBookValueAmmount;
	@Column(name = "DNIRealizationAmmount")
	protected int DNIRealizationAmmount;
	@Column(name = "DNIPostingPosition")
	protected int DNIPostingPosition;
	@Column(name = "DNIAmmountAfterPosting")
	protected int DNIAmmountAfterPosting;
	@Column(name = "DNIBatchNumber")
	protected String DNIBatchNumber;
	@Column(name = "DNIStorno")
	protected String DNIStorno;
	@Column(name = "DNIStepNumber")
	protected int DNIStepNumber;
	@Column(name = "DNISecurityIndicator")
	protected String DNISecurityIndicator;
	@Column(name = "DNIPriceDesignation", nullable = false)
	protected int DNIPriceDesignation;
	@Column(name = "DNISellingPrice")
	protected int DNISellingPrice;
	@Column(name = "DNIQuantityReserved")
	protected int DNIQuantityReserved;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryNote")
    protected DeliveryNoteBean deliveryNote;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;

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

    @JsonProperty("DNIOrdinalNumber")
	public int getDNIOrdinalNumber() {
		return DNIOrdinalNumber;
	}

	public void setDNIOrdinalNumber(int DNIOrdinalNumber) {
		this.DNIOrdinalNumber = DNIOrdinalNumber;
	}

    @JsonProperty("DNILocationAddress")
	public String getDNILocationAddress() {
		return DNILocationAddress;
	}

	public void setDNILocationAddress(String DNILocationAddress) {
		this.DNILocationAddress = DNILocationAddress;
	}

    @JsonProperty("DNIMeasurementUnit")
	public String getDNIMeasurementUnit() {
		return DNIMeasurementUnit;
	}

	public void setDNIMeasurementUnit(String DNIMeasurementUnit) {
		this.DNIMeasurementUnit = DNIMeasurementUnit;
	}

    @JsonProperty("DNIQuantityLaunched")
	public int getDNIQuantityLaunched() {
		return DNIQuantityLaunched;
	}

	public void setDNIQuantityLaunched(int DNIQuantityLaunched) {
		this.DNIQuantityLaunched = DNIQuantityLaunched;
	}

    @JsonProperty("DNIQuantityRejected")
	public int getDNIQuantityRejected() {
		return DNIQuantityRejected;
	}

	public void setDNIQuantityRejected(int DNIQuantityRejected) {
		this.DNIQuantityRejected = DNIQuantityRejected;
	}

    @JsonProperty("DNIQuantityReceived")
	public int getDNIQuantityReceived() {
		return DNIQuantityReceived;
	}

	public void setDNIQuantityReceived(int DNIQuantityReceived) {
		this.DNIQuantityReceived = DNIQuantityReceived;
	}

    @JsonProperty("DNIPlannedPrice")
	public int getDNIPlannedPrice() {
		return DNIPlannedPrice;
	}

	public void setDNIPlannedPrice(int DNIPlannedPrice) {
		this.DNIPlannedPrice = DNIPlannedPrice;
	}

    @JsonProperty("DNIBookValueAmmount")
	public int getDNIBookValueAmmount() {
		return DNIBookValueAmmount;
	}

	public void setDNIBookValueAmmount(int DNIBookValueAmmount) {
		this.DNIBookValueAmmount = DNIBookValueAmmount;
	}

    @JsonProperty("DNIRealizationAmmount")
	public int getDNIRealizationAmmount() {
		return DNIRealizationAmmount;
	}

	public void setDNIRealizationAmmount(int DNIRealizationAmmount) {
		this.DNIRealizationAmmount = DNIRealizationAmmount;
	}

    @JsonProperty("DNIPostingPosition")
	public int getDNIPostingPosition() {
		return DNIPostingPosition;
	}

	public void setDNIPostingPosition(int DNIPostingPosition) {
		this.DNIPostingPosition = DNIPostingPosition;
	}

    @JsonProperty("DNIAmmountAfterPosting")
	public int getDNIAmmountAfterPosting() {
		return DNIAmmountAfterPosting;
	}

	public void setDNIAmmountAfterPosting(int DNIAmmountAfterPosting) {
		this.DNIAmmountAfterPosting = DNIAmmountAfterPosting;
	}

    @JsonProperty("DNIBatchNumber")
	public String getDNIBatchNumber() {
		return DNIBatchNumber;
	}

	public void setDNIBatchNumber(String DNIBatchNumber) {
		this.DNIBatchNumber = DNIBatchNumber;
	}

    @JsonProperty("DNIStorno")
	public String getDNIStorno() {
		return DNIStorno;
	}

	public void setDNIStorno(String DNIStorno) {
		this.DNIStorno = DNIStorno;
	}

    @JsonProperty("DNIStepNumber")
	public int getDNIStepNumber() {
		return DNIStepNumber;
	}

	public void setDNIStepNumber(int DNIStepNumber) {
		this.DNIStepNumber = DNIStepNumber;
	}

    @JsonProperty("DNISecurityIndicator")
	public String getDNISecurityIndicator() {
		return DNISecurityIndicator;
	}

	public void setDNISecurityIndicator(String DNISecurityIndicator) {
		this.DNISecurityIndicator = DNISecurityIndicator;
	}

    @JsonProperty("DNIPriceDesignation")
	public int getDNIPriceDesignation() {
		return DNIPriceDesignation;
	}

	public void setDNIPriceDesignation(int DNIPriceDesignation) {
		this.DNIPriceDesignation = DNIPriceDesignation;
	}

    @JsonProperty("DNISellingPrice")
	public int getDNISellingPrice() {
		return DNISellingPrice;
	}

	public void setDNISellingPrice(int DNISellingPrice) {
		this.DNISellingPrice = DNISellingPrice;
	}

    @JsonProperty("DNIQuantityReserved")
	public int getDNIQuantityReserved() {
		return DNIQuantityReserved;
	}

	public void setDNIQuantityReserved(int DNIQuantityReserved) {
		this.DNIQuantityReserved = DNIQuantityReserved;
	}


    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("tangibleItemCondition")
	public TangibleItemConditionBean getTangibleItemCondition() {
		return tangibleItemCondition;
	}

    public void setTangibleItemCondition(TangibleItemConditionBean tangibleItemCondition) {
		this.tangibleItemCondition = tangibleItemCondition;
	}

    @JsonProperty("account")
	public AccountBean getAccount() {
		return account;
	}

    public void setAccount(AccountBean account) {
		this.account = account;
	}

    @JsonProperty("deliveryNote")
	public DeliveryNoteBean getDeliveryNote() {
		return deliveryNote;
	}

    public void setDeliveryNote(DeliveryNoteBean deliveryNote) {
		this.deliveryNote = deliveryNote;
	}

    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof DeliveryNoteItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((DeliveryNoteItemBean) o).getId()));
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
		return "DeliveryNoteItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", DNIOrdinalNumber=" + DNIOrdinalNumber
			+ ", DNILocationAddress=" + DNILocationAddress
			+ ", DNIMeasurementUnit=" + DNIMeasurementUnit
			+ ", DNIQuantityLaunched=" + DNIQuantityLaunched
			+ ", DNIQuantityRejected=" + DNIQuantityRejected
			+ ", DNIQuantityReceived=" + DNIQuantityReceived
			+ ", DNIPlannedPrice=" + DNIPlannedPrice
			+ ", DNIBookValueAmmount=" + DNIBookValueAmmount
			+ ", DNIRealizationAmmount=" + DNIRealizationAmmount
			+ ", DNIPostingPosition=" + DNIPostingPosition
			+ ", DNIAmmountAfterPosting=" + DNIAmmountAfterPosting
			+ ", DNIBatchNumber=" + DNIBatchNumber
			+ ", DNIStorno=" + DNIStorno
			+ ", DNIStepNumber=" + DNIStepNumber
			+ ", DNISecurityIndicator=" + DNISecurityIndicator
			+ ", DNIPriceDesignation=" + DNIPriceDesignation
			+ ", DNISellingPrice=" + DNISellingPrice
			+ ", DNIQuantityReserved=" + DNIQuantityReserved
			// + ", identification=" + identification
			// + ", tangibleItemCondition=" + tangibleItemCondition
			// + ", account=" + account
			// + ", deliveryNote=" + deliveryNote
			// + ", tangibleItemStatus=" + tangibleItemStatus
			+ "]";
	}
}