package com.doobgroup.server.entities.renaming;

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

import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.renaming.RenamingItemBean;

@Entity
@Table(name = "RENAMING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE RENAMING SET deleted = 1 WHERE Renaming_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RenamingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Renaming_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RDocumentNumber", nullable = false)
	protected int RDocumentNumber;
	@Column(name = "ROldDocument")
	protected String ROldDocument;
	@Column(name = "RDeliveryDate", nullable = false)
	protected Date RDeliveryDate;
	@Column(name = "RDocumentStatus", nullable = false)
	protected int RDocumentStatus;
	@Column(name = "RPrintStatus", nullable = false)
	protected int RPrintStatus;
	@Column(name = "RRemark")
	protected String RRemark;
	@Column(name = "RStornoDocumentNumber")
	protected int RStornoDocumentNumber;
	@Column(name = "RTransactionLogprint")
	protected int RTransactionLogprint;
	@Column(name = "RLogNumber")
	protected int RLogNumber;
	@Column(name = "IIdentificationCode", nullable = false)
	protected int IIdentificationCode;
	@Column(name = "TISDesignation", nullable = false)
	protected char TISDesignation;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @OneToMany(mappedBy = "renaming", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingItemBean> renamingItems = new HashSet<RenamingItemBean>();

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

    @JsonProperty("RDocumentNumber")
	public int getRDocumentNumber() {
		return RDocumentNumber;
	}

	public void setRDocumentNumber(int RDocumentNumber) {
		this.RDocumentNumber = RDocumentNumber;
	}

    @JsonProperty("ROldDocument")
	public String getROldDocument() {
		return ROldDocument;
	}

	public void setROldDocument(String ROldDocument) {
		this.ROldDocument = ROldDocument;
	}

    @JsonProperty("RDeliveryDate")
	public Date getRDeliveryDate() {
		return RDeliveryDate;
	}

	public void setRDeliveryDate(Date RDeliveryDate) {
		this.RDeliveryDate = RDeliveryDate;
	}

    @JsonProperty("RDocumentStatus")
	public int getRDocumentStatus() {
		return RDocumentStatus;
	}

	public void setRDocumentStatus(int RDocumentStatus) {
		this.RDocumentStatus = RDocumentStatus;
	}

    @JsonProperty("RPrintStatus")
	public int getRPrintStatus() {
		return RPrintStatus;
	}

	public void setRPrintStatus(int RPrintStatus) {
		this.RPrintStatus = RPrintStatus;
	}

    @JsonProperty("RRemark")
	public String getRRemark() {
		return RRemark;
	}

	public void setRRemark(String RRemark) {
		this.RRemark = RRemark;
	}

    @JsonProperty("RStornoDocumentNumber")
	public int getRStornoDocumentNumber() {
		return RStornoDocumentNumber;
	}

	public void setRStornoDocumentNumber(int RStornoDocumentNumber) {
		this.RStornoDocumentNumber = RStornoDocumentNumber;
	}

    @JsonProperty("RTransactionLogprint")
	public int getRTransactionLogprint() {
		return RTransactionLogprint;
	}

	public void setRTransactionLogprint(int RTransactionLogprint) {
		this.RTransactionLogprint = RTransactionLogprint;
	}

    @JsonProperty("RLogNumber")
	public int getRLogNumber() {
		return RLogNumber;
	}

	public void setRLogNumber(int RLogNumber) {
		this.RLogNumber = RLogNumber;
	}

    @JsonProperty("IIdentificationCode")
	public int getIIdentificationCode() {
		return IIdentificationCode;
	}

	public void setIIdentificationCode(int IIdentificationCode) {
		this.IIdentificationCode = IIdentificationCode;
	}

    @JsonProperty("TISDesignation")
	public char getTISDesignation() {
		return TISDesignation;
	}

	public void setTISDesignation(char TISDesignation) {
		this.TISDesignation = TISDesignation;
	}


    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("renamingItems")
	public Set<RenamingItemBean> getRenamingItems() {
		return renamingItems;
	}

	public void setRenamingItems(Set<RenamingItemBean> renamingItems) {
		this.renamingItems = renamingItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RenamingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RenamingBean) o).getId()));
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
		return "RenamingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RDocumentNumber=" + RDocumentNumber
			+ ", ROldDocument=" + ROldDocument
			+ ", RDeliveryDate=" + RDeliveryDate
			+ ", RDocumentStatus=" + RDocumentStatus
			+ ", RPrintStatus=" + RPrintStatus
			+ ", RRemark=" + RRemark
			+ ", RStornoDocumentNumber=" + RStornoDocumentNumber
			+ ", RTransactionLogprint=" + RTransactionLogprint
			+ ", RLogNumber=" + RLogNumber
			+ ", IIdentificationCode=" + IIdentificationCode
			+ ", TISDesignation=" + TISDesignation
			// + ", tangibleItemStatus=" + tangibleItemStatus
			// + ", stockroom=" + stockroom
			// + ", organizationUnit=" + organizationUnit
			// + ", documentType=" + documentType
			// + ", renamingItems=" + renamingItems
			+ "]";
	}
}