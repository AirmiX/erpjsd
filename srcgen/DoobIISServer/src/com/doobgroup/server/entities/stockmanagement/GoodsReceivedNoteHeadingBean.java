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
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.order.DeliveryMethodBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;

@Entity
@Table(name = "GOODSRECEIVEDNOTEHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "GRNHNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE GOODSRECEIVEDNOTEHEADING SET deleted = 1 WHERE GoodsReceivedNoteHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class GoodsReceivedNoteHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "GoodsReceivedNoteHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "GRNHNumber", nullable = false)
	protected int GRNHNumber;
	@Column(name = "GRNHWaybillNumber")
	protected String GRNHWaybillNumber;
	@Column(name = "GRNHSupplierShippingDocument", nullable = false)
	protected String GRNHSupplierShippingDocument;
	@Column(name = "GRNHShippingDocumentDate", nullable = false)
	protected Date GRNHShippingDocumentDate;
	@Column(name = "GRNHArrivalDate", nullable = false)
	protected Date GRNHArrivalDate;
	@Column(name = "GRNHInvoiceNumber")
	protected String GRNHInvoiceNumber;
	@Column(name = "GRNHInvoiceDate")
	protected Date GRNHInvoiceDate;
	@Column(name = "GRNHBookkeepingDate")
	protected Date GRNHBookkeepingDate;
	@Column(name = "GRNHRemark")
	protected String GRNHRemark;
	@Column(name = "GRNHStornoDocumentNumber")
	protected int GRNHStornoDocumentNumber;
	@Column(name = "GRNHCompletionStatus", nullable = false)
	protected int GRNHCompletionStatus;
	@Column(name = "GRNHPrintStatus", nullable = false)
	protected int GRNHPrintStatus;
	@Column(name = "GRNHPrintDate")
	protected Date GRNHPrintDate;
	@Column(name = "GRNHTransactionLogPrint")
	protected int GRNHTransactionLogPrint;
	@Column(name = "GRNHOldDocument")
	protected String GRNHOldDocument;
	@Column(name = "GRNHRemarkKvant")
	protected int GRNHRemarkKvant;
	@Column(name = "GRNHNotificationNumber")
	protected int GRNHNotificationNumber;
	@Column(name = "GRNHReclamationNumber")
	protected int GRNHReclamationNumber;
	@Column(name = "GRNHReclamationNumberKvant")
	protected int GRNHReclamationNumberKvant;
	@Column(name = "GRNHConclusionPrint")
	protected String GRNHConclusionPrint;
	@Column(name = "GRNHTransactionLog")
	protected int GRNHTransactionLog;
	@Column(name = "GRNHCurrency")
	protected String GRNHCurrency;
	@Column(name = "GRNHCalculationStatus")
	protected String GRNHCalculationStatus;
	@Column(name = "GRNHThisYear")
	protected String GRNHThisYear;
	@Column(name = "GRNHByShippingDocument")
	protected int GRNHByShippingDocument;
	@Column(name = "GRNHBookkeepingStatus")
	protected String GRNHBookkeepingStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="supplier")
    protected IdentificationBean supplier;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderSupplierHeading")
    protected OrderSupplierHeadingBean orderSupplierHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryMethod")
    protected DeliveryMethodBean deliveryMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @OneToMany(mappedBy = "goodsReceivedNoteHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems = new HashSet<GoodsReceivedNoteItemBean>();

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

    @JsonProperty("GRNHNumber")
	public int getGRNHNumber() {
		return GRNHNumber;
	}

	public void setGRNHNumber(int GRNHNumber) {
		this.GRNHNumber = GRNHNumber;
	}

    @JsonProperty("GRNHWaybillNumber")
	public String getGRNHWaybillNumber() {
		return GRNHWaybillNumber;
	}

	public void setGRNHWaybillNumber(String GRNHWaybillNumber) {
		this.GRNHWaybillNumber = GRNHWaybillNumber;
	}

    @JsonProperty("GRNHSupplierShippingDocument")
	public String getGRNHSupplierShippingDocument() {
		return GRNHSupplierShippingDocument;
	}

	public void setGRNHSupplierShippingDocument(String GRNHSupplierShippingDocument) {
		this.GRNHSupplierShippingDocument = GRNHSupplierShippingDocument;
	}

    @JsonProperty("GRNHShippingDocumentDate")
	public Date getGRNHShippingDocumentDate() {
		return GRNHShippingDocumentDate;
	}

	public void setGRNHShippingDocumentDate(Date GRNHShippingDocumentDate) {
		this.GRNHShippingDocumentDate = GRNHShippingDocumentDate;
	}

    @JsonProperty("GRNHArrivalDate")
	public Date getGRNHArrivalDate() {
		return GRNHArrivalDate;
	}

	public void setGRNHArrivalDate(Date GRNHArrivalDate) {
		this.GRNHArrivalDate = GRNHArrivalDate;
	}

    @JsonProperty("GRNHInvoiceNumber")
	public String getGRNHInvoiceNumber() {
		return GRNHInvoiceNumber;
	}

	public void setGRNHInvoiceNumber(String GRNHInvoiceNumber) {
		this.GRNHInvoiceNumber = GRNHInvoiceNumber;
	}

    @JsonProperty("GRNHInvoiceDate")
	public Date getGRNHInvoiceDate() {
		return GRNHInvoiceDate;
	}

	public void setGRNHInvoiceDate(Date GRNHInvoiceDate) {
		this.GRNHInvoiceDate = GRNHInvoiceDate;
	}

    @JsonProperty("GRNHBookkeepingDate")
	public Date getGRNHBookkeepingDate() {
		return GRNHBookkeepingDate;
	}

	public void setGRNHBookkeepingDate(Date GRNHBookkeepingDate) {
		this.GRNHBookkeepingDate = GRNHBookkeepingDate;
	}

    @JsonProperty("GRNHRemark")
	public String getGRNHRemark() {
		return GRNHRemark;
	}

	public void setGRNHRemark(String GRNHRemark) {
		this.GRNHRemark = GRNHRemark;
	}

    @JsonProperty("GRNHStornoDocumentNumber")
	public int getGRNHStornoDocumentNumber() {
		return GRNHStornoDocumentNumber;
	}

	public void setGRNHStornoDocumentNumber(int GRNHStornoDocumentNumber) {
		this.GRNHStornoDocumentNumber = GRNHStornoDocumentNumber;
	}

    @JsonProperty("GRNHCompletionStatus")
	public int getGRNHCompletionStatus() {
		return GRNHCompletionStatus;
	}

	public void setGRNHCompletionStatus(int GRNHCompletionStatus) {
		this.GRNHCompletionStatus = GRNHCompletionStatus;
	}

    @JsonProperty("GRNHPrintStatus")
	public int getGRNHPrintStatus() {
		return GRNHPrintStatus;
	}

	public void setGRNHPrintStatus(int GRNHPrintStatus) {
		this.GRNHPrintStatus = GRNHPrintStatus;
	}

    @JsonProperty("GRNHPrintDate")
	public Date getGRNHPrintDate() {
		return GRNHPrintDate;
	}

	public void setGRNHPrintDate(Date GRNHPrintDate) {
		this.GRNHPrintDate = GRNHPrintDate;
	}

    @JsonProperty("GRNHTransactionLogPrint")
	public int getGRNHTransactionLogPrint() {
		return GRNHTransactionLogPrint;
	}

	public void setGRNHTransactionLogPrint(int GRNHTransactionLogPrint) {
		this.GRNHTransactionLogPrint = GRNHTransactionLogPrint;
	}

    @JsonProperty("GRNHOldDocument")
	public String getGRNHOldDocument() {
		return GRNHOldDocument;
	}

	public void setGRNHOldDocument(String GRNHOldDocument) {
		this.GRNHOldDocument = GRNHOldDocument;
	}

    @JsonProperty("GRNHRemarkKvant")
	public int getGRNHRemarkKvant() {
		return GRNHRemarkKvant;
	}

	public void setGRNHRemarkKvant(int GRNHRemarkKvant) {
		this.GRNHRemarkKvant = GRNHRemarkKvant;
	}

    @JsonProperty("GRNHNotificationNumber")
	public int getGRNHNotificationNumber() {
		return GRNHNotificationNumber;
	}

	public void setGRNHNotificationNumber(int GRNHNotificationNumber) {
		this.GRNHNotificationNumber = GRNHNotificationNumber;
	}

    @JsonProperty("GRNHReclamationNumber")
	public int getGRNHReclamationNumber() {
		return GRNHReclamationNumber;
	}

	public void setGRNHReclamationNumber(int GRNHReclamationNumber) {
		this.GRNHReclamationNumber = GRNHReclamationNumber;
	}

    @JsonProperty("GRNHReclamationNumberKvant")
	public int getGRNHReclamationNumberKvant() {
		return GRNHReclamationNumberKvant;
	}

	public void setGRNHReclamationNumberKvant(int GRNHReclamationNumberKvant) {
		this.GRNHReclamationNumberKvant = GRNHReclamationNumberKvant;
	}

    @JsonProperty("GRNHConclusionPrint")
	public String getGRNHConclusionPrint() {
		return GRNHConclusionPrint;
	}

	public void setGRNHConclusionPrint(String GRNHConclusionPrint) {
		this.GRNHConclusionPrint = GRNHConclusionPrint;
	}

    @JsonProperty("GRNHTransactionLog")
	public int getGRNHTransactionLog() {
		return GRNHTransactionLog;
	}

	public void setGRNHTransactionLog(int GRNHTransactionLog) {
		this.GRNHTransactionLog = GRNHTransactionLog;
	}

    @JsonProperty("GRNHCurrency")
	public String getGRNHCurrency() {
		return GRNHCurrency;
	}

	public void setGRNHCurrency(String GRNHCurrency) {
		this.GRNHCurrency = GRNHCurrency;
	}

    @JsonProperty("GRNHCalculationStatus")
	public String getGRNHCalculationStatus() {
		return GRNHCalculationStatus;
	}

	public void setGRNHCalculationStatus(String GRNHCalculationStatus) {
		this.GRNHCalculationStatus = GRNHCalculationStatus;
	}

    @JsonProperty("GRNHThisYear")
	public String getGRNHThisYear() {
		return GRNHThisYear;
	}

	public void setGRNHThisYear(String GRNHThisYear) {
		this.GRNHThisYear = GRNHThisYear;
	}

    @JsonProperty("GRNHByShippingDocument")
	public int getGRNHByShippingDocument() {
		return GRNHByShippingDocument;
	}

	public void setGRNHByShippingDocument(int GRNHByShippingDocument) {
		this.GRNHByShippingDocument = GRNHByShippingDocument;
	}

    @JsonProperty("GRNHBookkeepingStatus")
	public String getGRNHBookkeepingStatus() {
		return GRNHBookkeepingStatus;
	}

	public void setGRNHBookkeepingStatus(String GRNHBookkeepingStatus) {
		this.GRNHBookkeepingStatus = GRNHBookkeepingStatus;
	}


    @JsonProperty("supplier")
	public IdentificationBean getSupplier() {
		return supplier;
	}

    public void setSupplier(IdentificationBean supplier) {
		this.supplier = supplier;
	}

    @JsonProperty("orderSupplierHeading")
	public OrderSupplierHeadingBean getOrderSupplierHeading() {
		return orderSupplierHeading;
	}

    public void setOrderSupplierHeading(OrderSupplierHeadingBean orderSupplierHeading) {
		this.orderSupplierHeading = orderSupplierHeading;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("deliveryMethod")
	public DeliveryMethodBean getDeliveryMethod() {
		return deliveryMethod;
	}

    public void setDeliveryMethod(DeliveryMethodBean deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("goodsReceivedNoteItems")
	public Set<GoodsReceivedNoteItemBean> getGoodsReceivedNoteItems() {
		return goodsReceivedNoteItems;
	}

	public void setGoodsReceivedNoteItems(Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems) {
		this.goodsReceivedNoteItems = goodsReceivedNoteItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof GoodsReceivedNoteHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((GoodsReceivedNoteHeadingBean) o).getId()));
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
		return "GoodsReceivedNoteHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", GRNHNumber=" + GRNHNumber
			+ ", GRNHWaybillNumber=" + GRNHWaybillNumber
			+ ", GRNHSupplierShippingDocument=" + GRNHSupplierShippingDocument
			+ ", GRNHShippingDocumentDate=" + GRNHShippingDocumentDate
			+ ", GRNHArrivalDate=" + GRNHArrivalDate
			+ ", GRNHInvoiceNumber=" + GRNHInvoiceNumber
			+ ", GRNHInvoiceDate=" + GRNHInvoiceDate
			+ ", GRNHBookkeepingDate=" + GRNHBookkeepingDate
			+ ", GRNHRemark=" + GRNHRemark
			+ ", GRNHStornoDocumentNumber=" + GRNHStornoDocumentNumber
			+ ", GRNHCompletionStatus=" + GRNHCompletionStatus
			+ ", GRNHPrintStatus=" + GRNHPrintStatus
			+ ", GRNHPrintDate=" + GRNHPrintDate
			+ ", GRNHTransactionLogPrint=" + GRNHTransactionLogPrint
			+ ", GRNHOldDocument=" + GRNHOldDocument
			+ ", GRNHRemarkKvant=" + GRNHRemarkKvant
			+ ", GRNHNotificationNumber=" + GRNHNotificationNumber
			+ ", GRNHReclamationNumber=" + GRNHReclamationNumber
			+ ", GRNHReclamationNumberKvant=" + GRNHReclamationNumberKvant
			+ ", GRNHConclusionPrint=" + GRNHConclusionPrint
			+ ", GRNHTransactionLog=" + GRNHTransactionLog
			+ ", GRNHCurrency=" + GRNHCurrency
			+ ", GRNHCalculationStatus=" + GRNHCalculationStatus
			+ ", GRNHThisYear=" + GRNHThisYear
			+ ", GRNHByShippingDocument=" + GRNHByShippingDocument
			+ ", GRNHBookkeepingStatus=" + GRNHBookkeepingStatus
			// + ", supplier=" + supplier
			// + ", orderSupplierHeading=" + orderSupplierHeading
			// + ", documentType=" + documentType
			// + ", deliveryMethod=" + deliveryMethod
			// + ", organizationUnit=" + organizationUnit
			// + ", stockroom=" + stockroom
			// + ", goodsReceivedNoteItems=" + goodsReceivedNoteItems
			+ "]";
	}
}