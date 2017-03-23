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
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.corporation.AccountBean;

@Entity
@Table(name = "MATERIALRETURNNOTEITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "MRNIOrdinalNumber"  ,  "materialReturnNote"  	}))
@SQLDelete(sql="UPDATE MATERIALRETURNNOTEITEM SET deleted = 1 WHERE MaterialReturnNoteItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class MaterialReturnNoteItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MaterialReturnNoteItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "MRNIOrdinalNumber", nullable = false)
	protected int MRNIOrdinalNumber;
	@Column(name = "MRNILocationAddress")
	protected String MRNILocationAddress;
	@Column(name = "MRNIBatch")
	protected String MRNIBatch;
	@Column(name = "MRNIMeasurementUnit")
	protected String MRNIMeasurementUnit;
	@Column(name = "MRNIQuantityReturned", nullable = false)
	protected int MRNIQuantityReturned;
	@Column(name = "MRNIBookValueAmmount")
	protected int MRNIBookValueAmmount;
	@Column(name = "MRNIPriceDesignation", nullable = false)
	protected int MRNIPriceDesignation;
	@Column(name = "MRNIPostingDate")
	protected Date MRNIPostingDate;
	@Column(name = "MRNIPostingPosition")
	protected int MRNIPostingPosition;
	@Column(name = "MRNIAmmountAfterPosting")
	protected int MRNIAmmountAfterPosting;
	@Column(name = "MRNIStorno")
	protected String MRNIStorno;
	@Column(name = "MRNIPrice")
	protected int MRNIPrice;
	@Column(name = "MRNIExpensesAccount")
	protected String MRNIExpensesAccount;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="materialReturnNote")
    protected MaterialReturnNoteBean materialReturnNote;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;

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

    @JsonProperty("MRNIOrdinalNumber")
	public int getMRNIOrdinalNumber() {
		return MRNIOrdinalNumber;
	}

	public void setMRNIOrdinalNumber(int MRNIOrdinalNumber) {
		this.MRNIOrdinalNumber = MRNIOrdinalNumber;
	}

    @JsonProperty("MRNILocationAddress")
	public String getMRNILocationAddress() {
		return MRNILocationAddress;
	}

	public void setMRNILocationAddress(String MRNILocationAddress) {
		this.MRNILocationAddress = MRNILocationAddress;
	}

    @JsonProperty("MRNIBatch")
	public String getMRNIBatch() {
		return MRNIBatch;
	}

	public void setMRNIBatch(String MRNIBatch) {
		this.MRNIBatch = MRNIBatch;
	}

    @JsonProperty("MRNIMeasurementUnit")
	public String getMRNIMeasurementUnit() {
		return MRNIMeasurementUnit;
	}

	public void setMRNIMeasurementUnit(String MRNIMeasurementUnit) {
		this.MRNIMeasurementUnit = MRNIMeasurementUnit;
	}

    @JsonProperty("MRNIQuantityReturned")
	public int getMRNIQuantityReturned() {
		return MRNIQuantityReturned;
	}

	public void setMRNIQuantityReturned(int MRNIQuantityReturned) {
		this.MRNIQuantityReturned = MRNIQuantityReturned;
	}

    @JsonProperty("MRNIBookValueAmmount")
	public int getMRNIBookValueAmmount() {
		return MRNIBookValueAmmount;
	}

	public void setMRNIBookValueAmmount(int MRNIBookValueAmmount) {
		this.MRNIBookValueAmmount = MRNIBookValueAmmount;
	}

    @JsonProperty("MRNIPriceDesignation")
	public int getMRNIPriceDesignation() {
		return MRNIPriceDesignation;
	}

	public void setMRNIPriceDesignation(int MRNIPriceDesignation) {
		this.MRNIPriceDesignation = MRNIPriceDesignation;
	}

    @JsonProperty("MRNIPostingDate")
	public Date getMRNIPostingDate() {
		return MRNIPostingDate;
	}

	public void setMRNIPostingDate(Date MRNIPostingDate) {
		this.MRNIPostingDate = MRNIPostingDate;
	}

    @JsonProperty("MRNIPostingPosition")
	public int getMRNIPostingPosition() {
		return MRNIPostingPosition;
	}

	public void setMRNIPostingPosition(int MRNIPostingPosition) {
		this.MRNIPostingPosition = MRNIPostingPosition;
	}

    @JsonProperty("MRNIAmmountAfterPosting")
	public int getMRNIAmmountAfterPosting() {
		return MRNIAmmountAfterPosting;
	}

	public void setMRNIAmmountAfterPosting(int MRNIAmmountAfterPosting) {
		this.MRNIAmmountAfterPosting = MRNIAmmountAfterPosting;
	}

    @JsonProperty("MRNIStorno")
	public String getMRNIStorno() {
		return MRNIStorno;
	}

	public void setMRNIStorno(String MRNIStorno) {
		this.MRNIStorno = MRNIStorno;
	}

    @JsonProperty("MRNIPrice")
	public int getMRNIPrice() {
		return MRNIPrice;
	}

	public void setMRNIPrice(int MRNIPrice) {
		this.MRNIPrice = MRNIPrice;
	}

    @JsonProperty("MRNIExpensesAccount")
	public String getMRNIExpensesAccount() {
		return MRNIExpensesAccount;
	}

	public void setMRNIExpensesAccount(String MRNIExpensesAccount) {
		this.MRNIExpensesAccount = MRNIExpensesAccount;
	}


    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("materialReturnNote")
	public MaterialReturnNoteBean getMaterialReturnNote() {
		return materialReturnNote;
	}

    public void setMaterialReturnNote(MaterialReturnNoteBean materialReturnNote) {
		this.materialReturnNote = materialReturnNote;
	}

    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
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


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof MaterialReturnNoteItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((MaterialReturnNoteItemBean) o).getId()));
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
		return "MaterialReturnNoteItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", MRNIOrdinalNumber=" + MRNIOrdinalNumber
			+ ", MRNILocationAddress=" + MRNILocationAddress
			+ ", MRNIBatch=" + MRNIBatch
			+ ", MRNIMeasurementUnit=" + MRNIMeasurementUnit
			+ ", MRNIQuantityReturned=" + MRNIQuantityReturned
			+ ", MRNIBookValueAmmount=" + MRNIBookValueAmmount
			+ ", MRNIPriceDesignation=" + MRNIPriceDesignation
			+ ", MRNIPostingDate=" + MRNIPostingDate
			+ ", MRNIPostingPosition=" + MRNIPostingPosition
			+ ", MRNIAmmountAfterPosting=" + MRNIAmmountAfterPosting
			+ ", MRNIStorno=" + MRNIStorno
			+ ", MRNIPrice=" + MRNIPrice
			+ ", MRNIExpensesAccount=" + MRNIExpensesAccount
			// + ", identification=" + identification
			// + ", materialReturnNote=" + materialReturnNote
			// + ", tangibleItemStatus=" + tangibleItemStatus
			// + ", tangibleItemCondition=" + tangibleItemCondition
			// + ", account=" + account
			+ "]";
	}
}