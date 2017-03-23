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
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.corporation.AccountBean;

@Entity
@Table(name = "TRANSACTIONLOG"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TLOrdinalNumber"  	}))
@SQLDelete(sql="UPDATE TRANSACTIONLOG SET deleted = 1 WHERE TransactionLog_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TransactionLogBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TransactionLog_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TLOrdinalNumber", nullable = false)
	protected int TLOrdinalNumber;
	@Column(name = "TLUser")
	protected String TLUser;
	@Column(name = "TLDocumentNumber", nullable = false)
	protected int TLDocumentNumber;
	@Column(name = "TLLogNumber", nullable = false)
	protected int TLLogNumber;
	@Column(name = "TLQuantityInput")
	protected int TLQuantityInput;
	@Column(name = "TLQuantityOutput")
	protected int TLQuantityOutput;
	@Column(name = "TLMeasurementUnit", nullable = false)
	protected String TLMeasurementUnit;
	@Column(name = "TLStatusDesignation", nullable = false)
	protected String TLStatusDesignation;
	@Column(name = "TLPrice", nullable = false)
	protected int TLPrice;
	@Column(name = "TLValue", nullable = false)
	protected int TLValue;
	@Column(name = "TLDate", nullable = false)
	protected Date TLDate;
	@Column(name = "TLMark")
	protected int TLMark;
	@Column(name = "TLItemOrdinalNumber")
	protected int TLItemOrdinalNumber;
	@Column(name = "TLDocumentType")
	protected String TLDocumentType;
	@Column(name = "TLSession")
	protected String TLSession;
	@Column(name = "TLOrganizationUnit")
	protected int TLOrganizationUnit;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
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

    @JsonProperty("TLOrdinalNumber")
	public int getTLOrdinalNumber() {
		return TLOrdinalNumber;
	}

	public void setTLOrdinalNumber(int TLOrdinalNumber) {
		this.TLOrdinalNumber = TLOrdinalNumber;
	}

    @JsonProperty("TLUser")
	public String getTLUser() {
		return TLUser;
	}

	public void setTLUser(String TLUser) {
		this.TLUser = TLUser;
	}

    @JsonProperty("TLDocumentNumber")
	public int getTLDocumentNumber() {
		return TLDocumentNumber;
	}

	public void setTLDocumentNumber(int TLDocumentNumber) {
		this.TLDocumentNumber = TLDocumentNumber;
	}

    @JsonProperty("TLLogNumber")
	public int getTLLogNumber() {
		return TLLogNumber;
	}

	public void setTLLogNumber(int TLLogNumber) {
		this.TLLogNumber = TLLogNumber;
	}

    @JsonProperty("TLQuantityInput")
	public int getTLQuantityInput() {
		return TLQuantityInput;
	}

	public void setTLQuantityInput(int TLQuantityInput) {
		this.TLQuantityInput = TLQuantityInput;
	}

    @JsonProperty("TLQuantityOutput")
	public int getTLQuantityOutput() {
		return TLQuantityOutput;
	}

	public void setTLQuantityOutput(int TLQuantityOutput) {
		this.TLQuantityOutput = TLQuantityOutput;
	}

    @JsonProperty("TLMeasurementUnit")
	public String getTLMeasurementUnit() {
		return TLMeasurementUnit;
	}

	public void setTLMeasurementUnit(String TLMeasurementUnit) {
		this.TLMeasurementUnit = TLMeasurementUnit;
	}

    @JsonProperty("TLStatusDesignation")
	public String getTLStatusDesignation() {
		return TLStatusDesignation;
	}

	public void setTLStatusDesignation(String TLStatusDesignation) {
		this.TLStatusDesignation = TLStatusDesignation;
	}

    @JsonProperty("TLPrice")
	public int getTLPrice() {
		return TLPrice;
	}

	public void setTLPrice(int TLPrice) {
		this.TLPrice = TLPrice;
	}

    @JsonProperty("TLValue")
	public int getTLValue() {
		return TLValue;
	}

	public void setTLValue(int TLValue) {
		this.TLValue = TLValue;
	}

    @JsonProperty("TLDate")
	public Date getTLDate() {
		return TLDate;
	}

	public void setTLDate(Date TLDate) {
		this.TLDate = TLDate;
	}

    @JsonProperty("TLMark")
	public int getTLMark() {
		return TLMark;
	}

	public void setTLMark(int TLMark) {
		this.TLMark = TLMark;
	}

    @JsonProperty("TLItemOrdinalNumber")
	public int getTLItemOrdinalNumber() {
		return TLItemOrdinalNumber;
	}

	public void setTLItemOrdinalNumber(int TLItemOrdinalNumber) {
		this.TLItemOrdinalNumber = TLItemOrdinalNumber;
	}

    @JsonProperty("TLDocumentType")
	public String getTLDocumentType() {
		return TLDocumentType;
	}

	public void setTLDocumentType(String TLDocumentType) {
		this.TLDocumentType = TLDocumentType;
	}

    @JsonProperty("TLSession")
	public String getTLSession() {
		return TLSession;
	}

	public void setTLSession(String TLSession) {
		this.TLSession = TLSession;
	}

    @JsonProperty("TLOrganizationUnit")
	public int getTLOrganizationUnit() {
		return TLOrganizationUnit;
	}

	public void setTLOrganizationUnit(int TLOrganizationUnit) {
		this.TLOrganizationUnit = TLOrganizationUnit;
	}


    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
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
		if (o == null || !(o instanceof TransactionLogBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TransactionLogBean) o).getId()));
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
		return "TransactionLogBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TLOrdinalNumber=" + TLOrdinalNumber
			+ ", TLUser=" + TLUser
			+ ", TLDocumentNumber=" + TLDocumentNumber
			+ ", TLLogNumber=" + TLLogNumber
			+ ", TLQuantityInput=" + TLQuantityInput
			+ ", TLQuantityOutput=" + TLQuantityOutput
			+ ", TLMeasurementUnit=" + TLMeasurementUnit
			+ ", TLStatusDesignation=" + TLStatusDesignation
			+ ", TLPrice=" + TLPrice
			+ ", TLValue=" + TLValue
			+ ", TLDate=" + TLDate
			+ ", TLMark=" + TLMark
			+ ", TLItemOrdinalNumber=" + TLItemOrdinalNumber
			+ ", TLDocumentType=" + TLDocumentType
			+ ", TLSession=" + TLSession
			+ ", TLOrganizationUnit=" + TLOrganizationUnit
			// + ", documentType=" + documentType
			// + ", identification=" + identification
			// + ", stockroom=" + stockroom
			// + ", account=" + account
			+ "]";
	}
}