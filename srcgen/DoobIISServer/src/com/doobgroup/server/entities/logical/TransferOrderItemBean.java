package com.doobgroup.server.entities.logical;

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

import com.doobgroup.server.entities.stockmanagement.TransferOrderBean;

@Entity
@Table(name = "TRANSFERORDERITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TOIOrdinalNumber"  ,  "transferOrder"  	}))
@SQLDelete(sql="UPDATE TRANSFERORDERITEM SET deleted = 1 WHERE TransferOrderItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TransferOrderItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TransferOrderItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TOIOrdinalNumber", nullable = false)
	protected int TOIOrdinalNumber;
	@Column(name = "TOILocationAddress")
	protected String TOILocationAddress;
	@Column(name = "TOIMeasurementUnit")
	protected String TOIMeasurementUnit;
	@Column(name = "TOIQuantityNeeded", nullable = false)
	protected int TOIQuantityNeeded;
	@Column(name = "TOIQuantityTransferred", nullable = false)
	protected int TOIQuantityTransferred;
	@Column(name = "TOIPriceDesignation", nullable = false)
	protected int TOIPriceDesignation;
	@Column(name = "TOIPrice")
	protected int TOIPrice;
	@Column(name = "TOIBookValueAmmount")
	protected int TOIBookValueAmmount;
	@Column(name = "TOIPostingDate")
	protected Date TOIPostingDate;
	@Column(name = "TOIPostingPosition")
	protected int TOIPostingPosition;
	@Column(name = "TOIAmmountAfterPosting")
	protected int TOIAmmountAfterPosting;
	@Column(name = "TOIBatchNumber")
	protected String TOIBatchNumber;
	@Column(name = "TOIStorno")
	protected String TOIStorno;
	@Column(name = "TOIFAGroup")
	protected String TOIFAGroup;
	@Column(name = "TOIFASubgroup")
	protected String TOIFASubgroup;
	@Column(name = "TOIFANomenclature")
	protected String TOIFANomenclature;
	@Column(name = "TOIFAAmortizationRate")
	protected int TOIFAAmortizationRate;
	@Column(name = "TOIFAGroupCode")
	protected String TOIFAGroupCode;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="transferOrder")
    protected TransferOrderBean transferOrder;

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

    @JsonProperty("TOIOrdinalNumber")
	public int getTOIOrdinalNumber() {
		return TOIOrdinalNumber;
	}

	public void setTOIOrdinalNumber(int TOIOrdinalNumber) {
		this.TOIOrdinalNumber = TOIOrdinalNumber;
	}

    @JsonProperty("TOILocationAddress")
	public String getTOILocationAddress() {
		return TOILocationAddress;
	}

	public void setTOILocationAddress(String TOILocationAddress) {
		this.TOILocationAddress = TOILocationAddress;
	}

    @JsonProperty("TOIMeasurementUnit")
	public String getTOIMeasurementUnit() {
		return TOIMeasurementUnit;
	}

	public void setTOIMeasurementUnit(String TOIMeasurementUnit) {
		this.TOIMeasurementUnit = TOIMeasurementUnit;
	}

    @JsonProperty("TOIQuantityNeeded")
	public int getTOIQuantityNeeded() {
		return TOIQuantityNeeded;
	}

	public void setTOIQuantityNeeded(int TOIQuantityNeeded) {
		this.TOIQuantityNeeded = TOIQuantityNeeded;
	}

    @JsonProperty("TOIQuantityTransferred")
	public int getTOIQuantityTransferred() {
		return TOIQuantityTransferred;
	}

	public void setTOIQuantityTransferred(int TOIQuantityTransferred) {
		this.TOIQuantityTransferred = TOIQuantityTransferred;
	}

    @JsonProperty("TOIPriceDesignation")
	public int getTOIPriceDesignation() {
		return TOIPriceDesignation;
	}

	public void setTOIPriceDesignation(int TOIPriceDesignation) {
		this.TOIPriceDesignation = TOIPriceDesignation;
	}

    @JsonProperty("TOIPrice")
	public int getTOIPrice() {
		return TOIPrice;
	}

	public void setTOIPrice(int TOIPrice) {
		this.TOIPrice = TOIPrice;
	}

    @JsonProperty("TOIBookValueAmmount")
	public int getTOIBookValueAmmount() {
		return TOIBookValueAmmount;
	}

	public void setTOIBookValueAmmount(int TOIBookValueAmmount) {
		this.TOIBookValueAmmount = TOIBookValueAmmount;
	}

    @JsonProperty("TOIPostingDate")
	public Date getTOIPostingDate() {
		return TOIPostingDate;
	}

	public void setTOIPostingDate(Date TOIPostingDate) {
		this.TOIPostingDate = TOIPostingDate;
	}

    @JsonProperty("TOIPostingPosition")
	public int getTOIPostingPosition() {
		return TOIPostingPosition;
	}

	public void setTOIPostingPosition(int TOIPostingPosition) {
		this.TOIPostingPosition = TOIPostingPosition;
	}

    @JsonProperty("TOIAmmountAfterPosting")
	public int getTOIAmmountAfterPosting() {
		return TOIAmmountAfterPosting;
	}

	public void setTOIAmmountAfterPosting(int TOIAmmountAfterPosting) {
		this.TOIAmmountAfterPosting = TOIAmmountAfterPosting;
	}

    @JsonProperty("TOIBatchNumber")
	public String getTOIBatchNumber() {
		return TOIBatchNumber;
	}

	public void setTOIBatchNumber(String TOIBatchNumber) {
		this.TOIBatchNumber = TOIBatchNumber;
	}

    @JsonProperty("TOIStorno")
	public String getTOIStorno() {
		return TOIStorno;
	}

	public void setTOIStorno(String TOIStorno) {
		this.TOIStorno = TOIStorno;
	}

    @JsonProperty("TOIFAGroup")
	public String getTOIFAGroup() {
		return TOIFAGroup;
	}

	public void setTOIFAGroup(String TOIFAGroup) {
		this.TOIFAGroup = TOIFAGroup;
	}

    @JsonProperty("TOIFASubgroup")
	public String getTOIFASubgroup() {
		return TOIFASubgroup;
	}

	public void setTOIFASubgroup(String TOIFASubgroup) {
		this.TOIFASubgroup = TOIFASubgroup;
	}

    @JsonProperty("TOIFANomenclature")
	public String getTOIFANomenclature() {
		return TOIFANomenclature;
	}

	public void setTOIFANomenclature(String TOIFANomenclature) {
		this.TOIFANomenclature = TOIFANomenclature;
	}

    @JsonProperty("TOIFAAmortizationRate")
	public int getTOIFAAmortizationRate() {
		return TOIFAAmortizationRate;
	}

	public void setTOIFAAmortizationRate(int TOIFAAmortizationRate) {
		this.TOIFAAmortizationRate = TOIFAAmortizationRate;
	}

    @JsonProperty("TOIFAGroupCode")
	public String getTOIFAGroupCode() {
		return TOIFAGroupCode;
	}

	public void setTOIFAGroupCode(String TOIFAGroupCode) {
		this.TOIFAGroupCode = TOIFAGroupCode;
	}


    @JsonProperty("transferOrder")
	public TransferOrderBean getTransferOrder() {
		return transferOrder;
	}

    public void setTransferOrder(TransferOrderBean transferOrder) {
		this.transferOrder = transferOrder;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TransferOrderItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TransferOrderItemBean) o).getId()));
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
		return "TransferOrderItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TOIOrdinalNumber=" + TOIOrdinalNumber
			+ ", TOILocationAddress=" + TOILocationAddress
			+ ", TOIMeasurementUnit=" + TOIMeasurementUnit
			+ ", TOIQuantityNeeded=" + TOIQuantityNeeded
			+ ", TOIQuantityTransferred=" + TOIQuantityTransferred
			+ ", TOIPriceDesignation=" + TOIPriceDesignation
			+ ", TOIPrice=" + TOIPrice
			+ ", TOIBookValueAmmount=" + TOIBookValueAmmount
			+ ", TOIPostingDate=" + TOIPostingDate
			+ ", TOIPostingPosition=" + TOIPostingPosition
			+ ", TOIAmmountAfterPosting=" + TOIAmmountAfterPosting
			+ ", TOIBatchNumber=" + TOIBatchNumber
			+ ", TOIStorno=" + TOIStorno
			+ ", TOIFAGroup=" + TOIFAGroup
			+ ", TOIFASubgroup=" + TOIFASubgroup
			+ ", TOIFANomenclature=" + TOIFANomenclature
			+ ", TOIFAAmortizationRate=" + TOIFAAmortizationRate
			+ ", TOIFAGroupCode=" + TOIFAGroupCode
			// + ", transferOrder=" + transferOrder
			+ "]";
	}
}