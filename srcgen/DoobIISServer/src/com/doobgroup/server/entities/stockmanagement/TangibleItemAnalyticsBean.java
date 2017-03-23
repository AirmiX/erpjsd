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

import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;

@Entity
@Table(name = "TANGIBLEITEMANALYTICS"
)
@SQLDelete(sql="UPDATE TANGIBLEITEMANALYTICS SET deleted = 1 WHERE TangibleItemAnalytics_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TangibleItemAnalyticsBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TangibleItemAnalytics_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TIAPostingPosition")
	protected int TIAPostingPosition;
	@Column(name = "TIADocumentNumber")
	protected int TIADocumentNumber;
	@Column(name = "TIAPostingDate")
	protected Date TIAPostingDate;
	@Column(name = "TIADocumentDate")
	protected Date TIADocumentDate;
	@Column(name = "TIAMeasurementUnit", nullable = false)
	protected String TIAMeasurementUnit;
	@Column(name = "TIAStocksAccount", nullable = false)
	protected String TIAStocksAccount;
	@Column(name = "TIAPriceDesignation", nullable = false)
	protected int TIAPriceDesignation;
	@Column(name = "TIAInputQuantity")
	protected int TIAInputQuantity;
	@Column(name = "TIAOutputQuantity")
	protected int TIAOutputQuantity;
	@Column(name = "TIAQuantityBalanceAfterPosting")
	protected int TIAQuantityBalanceAfterPosting;
	@Column(name = "TIAInputValue")
	protected int TIAInputValue;
	@Column(name = "TIAOutputValue")
	protected int TIAOutputValue;
	@Column(name = "TIABookValue")
	protected int TIABookValue;
	@Column(name = "TIAUnitPrice")
	protected int TIAUnitPrice;
	@Column(name = "TIAUser", nullable = false)
	protected String TIAUser;
	@Column(name = "TIAOrdinalNumber")
	protected int TIAOrdinalNumber;
	@Column(name = "TIAQuantityAtEmployee")
	protected int TIAQuantityAtEmployee;
	@Column(name = "TIAQuantityAtRepair")
	protected int TIAQuantityAtRepair;
	@Column(name = "TIAQuantityForRepair")
	protected int TIAQuantityForRepair;
	@Column(name = "TIAQuantityForRepair_1")
	protected int TIAQuantityForRepair_1;
	@Column(name = "TIASession")
	protected String TIASession;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;

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

    @JsonProperty("TIAPostingPosition")
	public int getTIAPostingPosition() {
		return TIAPostingPosition;
	}

	public void setTIAPostingPosition(int TIAPostingPosition) {
		this.TIAPostingPosition = TIAPostingPosition;
	}

    @JsonProperty("TIADocumentNumber")
	public int getTIADocumentNumber() {
		return TIADocumentNumber;
	}

	public void setTIADocumentNumber(int TIADocumentNumber) {
		this.TIADocumentNumber = TIADocumentNumber;
	}

    @JsonProperty("TIAPostingDate")
	public Date getTIAPostingDate() {
		return TIAPostingDate;
	}

	public void setTIAPostingDate(Date TIAPostingDate) {
		this.TIAPostingDate = TIAPostingDate;
	}

    @JsonProperty("TIADocumentDate")
	public Date getTIADocumentDate() {
		return TIADocumentDate;
	}

	public void setTIADocumentDate(Date TIADocumentDate) {
		this.TIADocumentDate = TIADocumentDate;
	}

    @JsonProperty("TIAMeasurementUnit")
	public String getTIAMeasurementUnit() {
		return TIAMeasurementUnit;
	}

	public void setTIAMeasurementUnit(String TIAMeasurementUnit) {
		this.TIAMeasurementUnit = TIAMeasurementUnit;
	}

    @JsonProperty("TIAStocksAccount")
	public String getTIAStocksAccount() {
		return TIAStocksAccount;
	}

	public void setTIAStocksAccount(String TIAStocksAccount) {
		this.TIAStocksAccount = TIAStocksAccount;
	}

    @JsonProperty("TIAPriceDesignation")
	public int getTIAPriceDesignation() {
		return TIAPriceDesignation;
	}

	public void setTIAPriceDesignation(int TIAPriceDesignation) {
		this.TIAPriceDesignation = TIAPriceDesignation;
	}

    @JsonProperty("TIAInputQuantity")
	public int getTIAInputQuantity() {
		return TIAInputQuantity;
	}

	public void setTIAInputQuantity(int TIAInputQuantity) {
		this.TIAInputQuantity = TIAInputQuantity;
	}

    @JsonProperty("TIAOutputQuantity")
	public int getTIAOutputQuantity() {
		return TIAOutputQuantity;
	}

	public void setTIAOutputQuantity(int TIAOutputQuantity) {
		this.TIAOutputQuantity = TIAOutputQuantity;
	}

    @JsonProperty("TIAQuantityBalanceAfterPosting")
	public int getTIAQuantityBalanceAfterPosting() {
		return TIAQuantityBalanceAfterPosting;
	}

	public void setTIAQuantityBalanceAfterPosting(int TIAQuantityBalanceAfterPosting) {
		this.TIAQuantityBalanceAfterPosting = TIAQuantityBalanceAfterPosting;
	}

    @JsonProperty("TIAInputValue")
	public int getTIAInputValue() {
		return TIAInputValue;
	}

	public void setTIAInputValue(int TIAInputValue) {
		this.TIAInputValue = TIAInputValue;
	}

    @JsonProperty("TIAOutputValue")
	public int getTIAOutputValue() {
		return TIAOutputValue;
	}

	public void setTIAOutputValue(int TIAOutputValue) {
		this.TIAOutputValue = TIAOutputValue;
	}

    @JsonProperty("TIABookValue")
	public int getTIABookValue() {
		return TIABookValue;
	}

	public void setTIABookValue(int TIABookValue) {
		this.TIABookValue = TIABookValue;
	}

    @JsonProperty("TIAUnitPrice")
	public int getTIAUnitPrice() {
		return TIAUnitPrice;
	}

	public void setTIAUnitPrice(int TIAUnitPrice) {
		this.TIAUnitPrice = TIAUnitPrice;
	}

    @JsonProperty("TIAUser")
	public String getTIAUser() {
		return TIAUser;
	}

	public void setTIAUser(String TIAUser) {
		this.TIAUser = TIAUser;
	}

    @JsonProperty("TIAOrdinalNumber")
	public int getTIAOrdinalNumber() {
		return TIAOrdinalNumber;
	}

	public void setTIAOrdinalNumber(int TIAOrdinalNumber) {
		this.TIAOrdinalNumber = TIAOrdinalNumber;
	}

    @JsonProperty("TIAQuantityAtEmployee")
	public int getTIAQuantityAtEmployee() {
		return TIAQuantityAtEmployee;
	}

	public void setTIAQuantityAtEmployee(int TIAQuantityAtEmployee) {
		this.TIAQuantityAtEmployee = TIAQuantityAtEmployee;
	}

    @JsonProperty("TIAQuantityAtRepair")
	public int getTIAQuantityAtRepair() {
		return TIAQuantityAtRepair;
	}

	public void setTIAQuantityAtRepair(int TIAQuantityAtRepair) {
		this.TIAQuantityAtRepair = TIAQuantityAtRepair;
	}

    @JsonProperty("TIAQuantityForRepair")
	public int getTIAQuantityForRepair() {
		return TIAQuantityForRepair;
	}

	public void setTIAQuantityForRepair(int TIAQuantityForRepair) {
		this.TIAQuantityForRepair = TIAQuantityForRepair;
	}

    @JsonProperty("TIAQuantityForRepair_1")
	public int getTIAQuantityForRepair_1() {
		return TIAQuantityForRepair_1;
	}

	public void setTIAQuantityForRepair_1(int TIAQuantityForRepair_1) {
		this.TIAQuantityForRepair_1 = TIAQuantityForRepair_1;
	}

    @JsonProperty("TIASession")
	public String getTIASession() {
		return TIASession;
	}

	public void setTIASession(String TIASession) {
		this.TIASession = TIASession;
	}


    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("tangibleItemCondition")
	public TangibleItemConditionBean getTangibleItemCondition() {
		return tangibleItemCondition;
	}

    public void setTangibleItemCondition(TangibleItemConditionBean tangibleItemCondition) {
		this.tangibleItemCondition = tangibleItemCondition;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TangibleItemAnalyticsBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TangibleItemAnalyticsBean) o).getId()));
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
		return "TangibleItemAnalyticsBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TIAPostingPosition=" + TIAPostingPosition
			+ ", TIADocumentNumber=" + TIADocumentNumber
			+ ", TIAPostingDate=" + TIAPostingDate
			+ ", TIADocumentDate=" + TIADocumentDate
			+ ", TIAMeasurementUnit=" + TIAMeasurementUnit
			+ ", TIAStocksAccount=" + TIAStocksAccount
			+ ", TIAPriceDesignation=" + TIAPriceDesignation
			+ ", TIAInputQuantity=" + TIAInputQuantity
			+ ", TIAOutputQuantity=" + TIAOutputQuantity
			+ ", TIAQuantityBalanceAfterPosting=" + TIAQuantityBalanceAfterPosting
			+ ", TIAInputValue=" + TIAInputValue
			+ ", TIAOutputValue=" + TIAOutputValue
			+ ", TIABookValue=" + TIABookValue
			+ ", TIAUnitPrice=" + TIAUnitPrice
			+ ", TIAUser=" + TIAUser
			+ ", TIAOrdinalNumber=" + TIAOrdinalNumber
			+ ", TIAQuantityAtEmployee=" + TIAQuantityAtEmployee
			+ ", TIAQuantityAtRepair=" + TIAQuantityAtRepair
			+ ", TIAQuantityForRepair=" + TIAQuantityForRepair
			+ ", TIAQuantityForRepair_1=" + TIAQuantityForRepair_1
			+ ", TIASession=" + TIASession
			// + ", documentType=" + documentType
			// + ", tangibleItemCondition=" + tangibleItemCondition
			+ "]";
	}
}