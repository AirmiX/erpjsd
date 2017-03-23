package com.doobgroup.server.entities.capacitymanagement;

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

import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;

@Entity
@Table(name = "ASSET"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "AInventoryNumber"  	}))
@SQLDelete(sql="UPDATE ASSET SET deleted = 1 WHERE Asset_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AssetBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Asset_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "AInventoryNumber", nullable = false)
	protected String AInventoryNumber;
	@Column(name = "ABuyingValue")
	protected int ABuyingValue;
	@Column(name = "APurchaseValueInitialState")
	protected int APurchaseValueInitialState;
	@Column(name = "ADepreciatedValueInitialState")
	protected int ADepreciatedValueInitialState;
	@Column(name = "APurchaseValue")
	protected int APurchaseValue;
	@Column(name = "ADepreciatedValue")
	protected int ADepreciatedValue;
	@Column(name = "ACurrentValue")
	protected int ACurrentValue;
	@Column(name = "ACurrentAmortization")
	protected int ACurrentAmortization;
	@Column(name = "ACurrentRevaluation")
	protected int ACurrentRevaluation;
	@Column(name = "ARemark")
	protected String ARemark;
	@Column(name = "APurchasingDate", nullable = false)
	protected Date APurchasingDate;
	@Column(name = "AExchangeRate")
	protected int AExchangeRate;
	@Column(name = "AExchangeRateDate")
	protected Date AExchangeRateDate;
	@Column(name = "ABuyingValueVal")
	protected int ABuyingValueVal;
	@Column(name = "AStatus")
	protected char AStatus;
	@Column(name = "AAmortizationRate")
	protected int AAmortizationRate;
	@Column(name = "AAmortizationType")
	protected char AAmortizationType;
	@Column(name = "AQuantity", nullable = false)
	protected int AQuantity;
	@Column(name = "AAmortizationDate")
	protected Date AAmortizationDate;
	@Column(name = "ARevaluationDate")
	protected Date ARevaluationDate;
	@Column(name = "ADeactivationDate")
	protected Date ADeactivationDate;
	@Column(name = "AActivationDate")
	protected Date AActivationDate;
	@Column(name = "ADescription")
	protected String ADescription;
	@Column(name = "AProductionYear")
	protected int AProductionYear;
	@Column(name = "AProductCode")
	protected int AProductCode;
	@Column(name = "AProductName")
	protected String AProductName;
	@Column(name = "ASupplierCode")
	protected int ASupplierCode;
	@Column(name = "ASupplierName")
	protected String ASupplierName;
	@Column(name = "APosition")
	protected int APosition;
	@Column(name = "AEnteredBy")
	protected String AEnteredBy;
	@Column(name = "AEntryDate")
	protected Date AEntryDate;
	@Column(name = "AChangedBy")
	protected String AChangedBy;
	@Column(name = "AChangeDate")
	protected Date AChangeDate;

    @OneToMany(mappedBy = "asset", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TechnologicalUnitBean> technologicalUnits = new HashSet<TechnologicalUnitBean>();

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

    @JsonProperty("AInventoryNumber")
	public String getAInventoryNumber() {
		return AInventoryNumber;
	}

	public void setAInventoryNumber(String AInventoryNumber) {
		this.AInventoryNumber = AInventoryNumber;
	}

    @JsonProperty("ABuyingValue")
	public int getABuyingValue() {
		return ABuyingValue;
	}

	public void setABuyingValue(int ABuyingValue) {
		this.ABuyingValue = ABuyingValue;
	}

    @JsonProperty("APurchaseValueInitialState")
	public int getAPurchaseValueInitialState() {
		return APurchaseValueInitialState;
	}

	public void setAPurchaseValueInitialState(int APurchaseValueInitialState) {
		this.APurchaseValueInitialState = APurchaseValueInitialState;
	}

    @JsonProperty("ADepreciatedValueInitialState")
	public int getADepreciatedValueInitialState() {
		return ADepreciatedValueInitialState;
	}

	public void setADepreciatedValueInitialState(int ADepreciatedValueInitialState) {
		this.ADepreciatedValueInitialState = ADepreciatedValueInitialState;
	}

    @JsonProperty("APurchaseValue")
	public int getAPurchaseValue() {
		return APurchaseValue;
	}

	public void setAPurchaseValue(int APurchaseValue) {
		this.APurchaseValue = APurchaseValue;
	}

    @JsonProperty("ADepreciatedValue")
	public int getADepreciatedValue() {
		return ADepreciatedValue;
	}

	public void setADepreciatedValue(int ADepreciatedValue) {
		this.ADepreciatedValue = ADepreciatedValue;
	}

    @JsonProperty("ACurrentValue")
	public int getACurrentValue() {
		return ACurrentValue;
	}

	public void setACurrentValue(int ACurrentValue) {
		this.ACurrentValue = ACurrentValue;
	}

    @JsonProperty("ACurrentAmortization")
	public int getACurrentAmortization() {
		return ACurrentAmortization;
	}

	public void setACurrentAmortization(int ACurrentAmortization) {
		this.ACurrentAmortization = ACurrentAmortization;
	}

    @JsonProperty("ACurrentRevaluation")
	public int getACurrentRevaluation() {
		return ACurrentRevaluation;
	}

	public void setACurrentRevaluation(int ACurrentRevaluation) {
		this.ACurrentRevaluation = ACurrentRevaluation;
	}

    @JsonProperty("ARemark")
	public String getARemark() {
		return ARemark;
	}

	public void setARemark(String ARemark) {
		this.ARemark = ARemark;
	}

    @JsonProperty("APurchasingDate")
	public Date getAPurchasingDate() {
		return APurchasingDate;
	}

	public void setAPurchasingDate(Date APurchasingDate) {
		this.APurchasingDate = APurchasingDate;
	}

    @JsonProperty("AExchangeRate")
	public int getAExchangeRate() {
		return AExchangeRate;
	}

	public void setAExchangeRate(int AExchangeRate) {
		this.AExchangeRate = AExchangeRate;
	}

    @JsonProperty("AExchangeRateDate")
	public Date getAExchangeRateDate() {
		return AExchangeRateDate;
	}

	public void setAExchangeRateDate(Date AExchangeRateDate) {
		this.AExchangeRateDate = AExchangeRateDate;
	}

    @JsonProperty("ABuyingValueVal")
	public int getABuyingValueVal() {
		return ABuyingValueVal;
	}

	public void setABuyingValueVal(int ABuyingValueVal) {
		this.ABuyingValueVal = ABuyingValueVal;
	}

    @JsonProperty("AStatus")
	public char getAStatus() {
		return AStatus;
	}

	public void setAStatus(char AStatus) {
		this.AStatus = AStatus;
	}

    @JsonProperty("AAmortizationRate")
	public int getAAmortizationRate() {
		return AAmortizationRate;
	}

	public void setAAmortizationRate(int AAmortizationRate) {
		this.AAmortizationRate = AAmortizationRate;
	}

    @JsonProperty("AAmortizationType")
	public char getAAmortizationType() {
		return AAmortizationType;
	}

	public void setAAmortizationType(char AAmortizationType) {
		this.AAmortizationType = AAmortizationType;
	}

    @JsonProperty("AQuantity")
	public int getAQuantity() {
		return AQuantity;
	}

	public void setAQuantity(int AQuantity) {
		this.AQuantity = AQuantity;
	}

    @JsonProperty("AAmortizationDate")
	public Date getAAmortizationDate() {
		return AAmortizationDate;
	}

	public void setAAmortizationDate(Date AAmortizationDate) {
		this.AAmortizationDate = AAmortizationDate;
	}

    @JsonProperty("ARevaluationDate")
	public Date getARevaluationDate() {
		return ARevaluationDate;
	}

	public void setARevaluationDate(Date ARevaluationDate) {
		this.ARevaluationDate = ARevaluationDate;
	}

    @JsonProperty("ADeactivationDate")
	public Date getADeactivationDate() {
		return ADeactivationDate;
	}

	public void setADeactivationDate(Date ADeactivationDate) {
		this.ADeactivationDate = ADeactivationDate;
	}

    @JsonProperty("AActivationDate")
	public Date getAActivationDate() {
		return AActivationDate;
	}

	public void setAActivationDate(Date AActivationDate) {
		this.AActivationDate = AActivationDate;
	}

    @JsonProperty("ADescription")
	public String getADescription() {
		return ADescription;
	}

	public void setADescription(String ADescription) {
		this.ADescription = ADescription;
	}

    @JsonProperty("AProductionYear")
	public int getAProductionYear() {
		return AProductionYear;
	}

	public void setAProductionYear(int AProductionYear) {
		this.AProductionYear = AProductionYear;
	}

    @JsonProperty("AProductCode")
	public int getAProductCode() {
		return AProductCode;
	}

	public void setAProductCode(int AProductCode) {
		this.AProductCode = AProductCode;
	}

    @JsonProperty("AProductName")
	public String getAProductName() {
		return AProductName;
	}

	public void setAProductName(String AProductName) {
		this.AProductName = AProductName;
	}

    @JsonProperty("ASupplierCode")
	public int getASupplierCode() {
		return ASupplierCode;
	}

	public void setASupplierCode(int ASupplierCode) {
		this.ASupplierCode = ASupplierCode;
	}

    @JsonProperty("ASupplierName")
	public String getASupplierName() {
		return ASupplierName;
	}

	public void setASupplierName(String ASupplierName) {
		this.ASupplierName = ASupplierName;
	}

    @JsonProperty("APosition")
	public int getAPosition() {
		return APosition;
	}

	public void setAPosition(int APosition) {
		this.APosition = APosition;
	}

    @JsonProperty("AEnteredBy")
	public String getAEnteredBy() {
		return AEnteredBy;
	}

	public void setAEnteredBy(String AEnteredBy) {
		this.AEnteredBy = AEnteredBy;
	}

    @JsonProperty("AEntryDate")
	public Date getAEntryDate() {
		return AEntryDate;
	}

	public void setAEntryDate(Date AEntryDate) {
		this.AEntryDate = AEntryDate;
	}

    @JsonProperty("AChangedBy")
	public String getAChangedBy() {
		return AChangedBy;
	}

	public void setAChangedBy(String AChangedBy) {
		this.AChangedBy = AChangedBy;
	}

    @JsonProperty("AChangeDate")
	public Date getAChangeDate() {
		return AChangeDate;
	}

	public void setAChangeDate(Date AChangeDate) {
		this.AChangeDate = AChangeDate;
	}


    @JsonProperty("technologicalUnits")
	public Set<TechnologicalUnitBean> getTechnologicalUnits() {
		return technologicalUnits;
	}

	public void setTechnologicalUnits(Set<TechnologicalUnitBean> technologicalUnits) {
		this.technologicalUnits = technologicalUnits;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof AssetBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AssetBean) o).getId()));
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
		return "AssetBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", AInventoryNumber=" + AInventoryNumber
			+ ", ABuyingValue=" + ABuyingValue
			+ ", APurchaseValueInitialState=" + APurchaseValueInitialState
			+ ", ADepreciatedValueInitialState=" + ADepreciatedValueInitialState
			+ ", APurchaseValue=" + APurchaseValue
			+ ", ADepreciatedValue=" + ADepreciatedValue
			+ ", ACurrentValue=" + ACurrentValue
			+ ", ACurrentAmortization=" + ACurrentAmortization
			+ ", ACurrentRevaluation=" + ACurrentRevaluation
			+ ", ARemark=" + ARemark
			+ ", APurchasingDate=" + APurchasingDate
			+ ", AExchangeRate=" + AExchangeRate
			+ ", AExchangeRateDate=" + AExchangeRateDate
			+ ", ABuyingValueVal=" + ABuyingValueVal
			+ ", AStatus=" + AStatus
			+ ", AAmortizationRate=" + AAmortizationRate
			+ ", AAmortizationType=" + AAmortizationType
			+ ", AQuantity=" + AQuantity
			+ ", AAmortizationDate=" + AAmortizationDate
			+ ", ARevaluationDate=" + ARevaluationDate
			+ ", ADeactivationDate=" + ADeactivationDate
			+ ", AActivationDate=" + AActivationDate
			+ ", ADescription=" + ADescription
			+ ", AProductionYear=" + AProductionYear
			+ ", AProductCode=" + AProductCode
			+ ", AProductName=" + AProductName
			+ ", ASupplierCode=" + ASupplierCode
			+ ", ASupplierName=" + ASupplierName
			+ ", APosition=" + APosition
			+ ", AEnteredBy=" + AEnteredBy
			+ ", AEntryDate=" + AEntryDate
			+ ", AChangedBy=" + AChangedBy
			+ ", AChangeDate=" + AChangeDate
			// + ", technologicalUnits=" + technologicalUnits
			+ "]";
	}
}