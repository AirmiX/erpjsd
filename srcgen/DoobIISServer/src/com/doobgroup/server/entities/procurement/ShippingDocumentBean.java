package com.doobgroup.server.entities.procurement;

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

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.initialization.PaymentMethodBean;
import com.doobgroup.server.entities.initialization.DeclarationBasisBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;

@Entity
@Table(name = "SHIPPINGDOCUMENT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SDDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE SHIPPINGDOCUMENT SET deleted = 1 WHERE ShippingDocument_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ShippingDocumentBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ShippingDocument_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SDDocumentNumber", nullable = false)
	protected int SDDocumentNumber;
	@Column(name = "SDDispositionDate", nullable = false)
	protected Date SDDispositionDate;
	@Column(name = "SDFinalPackagingDate")
	protected Date SDFinalPackagingDate;
	@Column(name = "SDIssueDocumentDate")
	protected Date SDIssueDocumentDate;
	@Column(name = "SDShippingDocumentNumber")
	protected String SDShippingDocumentNumber;
	@Column(name = "SDCancellationDocumentNumber")
	protected String SDCancellationDocumentNumber;
	@Column(name = "SDStatus", nullable = false)
	protected int SDStatus;
	@Column(name = "SDInvoiceDate")
	protected Date SDInvoiceDate;
	@Column(name = "SDCurrencyDate")
	protected Date SDCurrencyDate;
	@Column(name = "SDShipmentDate")
	protected Date SDShipmentDate;
	@Column(name = "SDCrateNumber")
	protected int SDCrateNumber;
	@Column(name = "SDPostsCosts")
	protected double SDPostsCosts;
	@Column(name = "SDStatementNumber")
	protected String SDStatementNumber;
	@Column(name = "SDConfirmationNumber")
	protected String SDConfirmationNumber;
	@Column(name = "SDStatementDate")
	protected Date SDStatementDate;
	@Column(name = "SDConfirmationDate")
	protected Date SDConfirmationDate;
	@Column(name = "SDPrintingStatusPackOrder")
	protected int SDPrintingStatusPackOrder;
	@Column(name = "SDPrintingStatusInvoice")
	protected int SDPrintingStatusInvoice;
	@Column(name = "SDPrintingStatusDispatch")
	protected int SDPrintingStatusDispatch;
	@Column(name = "SDPrintingStatusTransactions")
	protected int SDPrintingStatusTransactions;
	@Column(name = "SDOldDocument")
	protected String SDOldDocument;
	@Column(name = "SDTransactionDiaryNumber")
	protected int SDTransactionDiaryNumber;
	@Column(name = "SDUnified")
	protected int SDUnified;
	@Column(name = "SDPrintingPackagingOrder")
	protected int SDPrintingPackagingOrder;
	@Column(name = "SDTranslated")
	protected int SDTranslated;
	@Column(name = "SDForConsignment")
	protected int SDForConsignment;
	@Column(name = "SDDiaryConsignmentNumber")
	protected int SDDiaryConsignmentNumber;
	@Column(name = "SDBookkeepingDate")
	protected Date SDBookkeepingDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="goodsIdentification")
    protected IdentificationBean goodsIdentification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="invoiceIdentification")
    protected IdentificationBean invoiceIdentification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderHeading")
    protected OrderHeadingBean orderHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentMethod")
    protected PaymentMethodBean paymentMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="declarationBasis")
    protected DeclarationBasisBean declarationBasis;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="consignmentStockroom")
    protected StockroomBean consignmentStockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="exporterIdentification")
    protected IdentificationBean exporterIdentification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryMethod")
    protected IdentificationBean deliveryMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @OneToMany(mappedBy = "shippingDocument", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentItemBean> shippingDocumentItems = new HashSet<ShippingDocumentItemBean>();
    @OneToMany(mappedBy = "shippingDocument", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();

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

    @JsonProperty("SDDocumentNumber")
	public int getSDDocumentNumber() {
		return SDDocumentNumber;
	}

	public void setSDDocumentNumber(int SDDocumentNumber) {
		this.SDDocumentNumber = SDDocumentNumber;
	}

    @JsonProperty("SDDispositionDate")
	public Date getSDDispositionDate() {
		return SDDispositionDate;
	}

	public void setSDDispositionDate(Date SDDispositionDate) {
		this.SDDispositionDate = SDDispositionDate;
	}

    @JsonProperty("SDFinalPackagingDate")
	public Date getSDFinalPackagingDate() {
		return SDFinalPackagingDate;
	}

	public void setSDFinalPackagingDate(Date SDFinalPackagingDate) {
		this.SDFinalPackagingDate = SDFinalPackagingDate;
	}

    @JsonProperty("SDIssueDocumentDate")
	public Date getSDIssueDocumentDate() {
		return SDIssueDocumentDate;
	}

	public void setSDIssueDocumentDate(Date SDIssueDocumentDate) {
		this.SDIssueDocumentDate = SDIssueDocumentDate;
	}

    @JsonProperty("SDShippingDocumentNumber")
	public String getSDShippingDocumentNumber() {
		return SDShippingDocumentNumber;
	}

	public void setSDShippingDocumentNumber(String SDShippingDocumentNumber) {
		this.SDShippingDocumentNumber = SDShippingDocumentNumber;
	}

    @JsonProperty("SDCancellationDocumentNumber")
	public String getSDCancellationDocumentNumber() {
		return SDCancellationDocumentNumber;
	}

	public void setSDCancellationDocumentNumber(String SDCancellationDocumentNumber) {
		this.SDCancellationDocumentNumber = SDCancellationDocumentNumber;
	}

    @JsonProperty("SDStatus")
	public int getSDStatus() {
		return SDStatus;
	}

	public void setSDStatus(int SDStatus) {
		this.SDStatus = SDStatus;
	}

    @JsonProperty("SDInvoiceDate")
	public Date getSDInvoiceDate() {
		return SDInvoiceDate;
	}

	public void setSDInvoiceDate(Date SDInvoiceDate) {
		this.SDInvoiceDate = SDInvoiceDate;
	}

    @JsonProperty("SDCurrencyDate")
	public Date getSDCurrencyDate() {
		return SDCurrencyDate;
	}

	public void setSDCurrencyDate(Date SDCurrencyDate) {
		this.SDCurrencyDate = SDCurrencyDate;
	}

    @JsonProperty("SDShipmentDate")
	public Date getSDShipmentDate() {
		return SDShipmentDate;
	}

	public void setSDShipmentDate(Date SDShipmentDate) {
		this.SDShipmentDate = SDShipmentDate;
	}

    @JsonProperty("SDCrateNumber")
	public int getSDCrateNumber() {
		return SDCrateNumber;
	}

	public void setSDCrateNumber(int SDCrateNumber) {
		this.SDCrateNumber = SDCrateNumber;
	}

    @JsonProperty("SDPostsCosts")
	public double getSDPostsCosts() {
		return SDPostsCosts;
	}

	public void setSDPostsCosts(double SDPostsCosts) {
		this.SDPostsCosts = SDPostsCosts;
	}

    @JsonProperty("SDStatementNumber")
	public String getSDStatementNumber() {
		return SDStatementNumber;
	}

	public void setSDStatementNumber(String SDStatementNumber) {
		this.SDStatementNumber = SDStatementNumber;
	}

    @JsonProperty("SDConfirmationNumber")
	public String getSDConfirmationNumber() {
		return SDConfirmationNumber;
	}

	public void setSDConfirmationNumber(String SDConfirmationNumber) {
		this.SDConfirmationNumber = SDConfirmationNumber;
	}

    @JsonProperty("SDStatementDate")
	public Date getSDStatementDate() {
		return SDStatementDate;
	}

	public void setSDStatementDate(Date SDStatementDate) {
		this.SDStatementDate = SDStatementDate;
	}

    @JsonProperty("SDConfirmationDate")
	public Date getSDConfirmationDate() {
		return SDConfirmationDate;
	}

	public void setSDConfirmationDate(Date SDConfirmationDate) {
		this.SDConfirmationDate = SDConfirmationDate;
	}

    @JsonProperty("SDPrintingStatusPackOrder")
	public int getSDPrintingStatusPackOrder() {
		return SDPrintingStatusPackOrder;
	}

	public void setSDPrintingStatusPackOrder(int SDPrintingStatusPackOrder) {
		this.SDPrintingStatusPackOrder = SDPrintingStatusPackOrder;
	}

    @JsonProperty("SDPrintingStatusInvoice")
	public int getSDPrintingStatusInvoice() {
		return SDPrintingStatusInvoice;
	}

	public void setSDPrintingStatusInvoice(int SDPrintingStatusInvoice) {
		this.SDPrintingStatusInvoice = SDPrintingStatusInvoice;
	}

    @JsonProperty("SDPrintingStatusDispatch")
	public int getSDPrintingStatusDispatch() {
		return SDPrintingStatusDispatch;
	}

	public void setSDPrintingStatusDispatch(int SDPrintingStatusDispatch) {
		this.SDPrintingStatusDispatch = SDPrintingStatusDispatch;
	}

    @JsonProperty("SDPrintingStatusTransactions")
	public int getSDPrintingStatusTransactions() {
		return SDPrintingStatusTransactions;
	}

	public void setSDPrintingStatusTransactions(int SDPrintingStatusTransactions) {
		this.SDPrintingStatusTransactions = SDPrintingStatusTransactions;
	}

    @JsonProperty("SDOldDocument")
	public String getSDOldDocument() {
		return SDOldDocument;
	}

	public void setSDOldDocument(String SDOldDocument) {
		this.SDOldDocument = SDOldDocument;
	}

    @JsonProperty("SDTransactionDiaryNumber")
	public int getSDTransactionDiaryNumber() {
		return SDTransactionDiaryNumber;
	}

	public void setSDTransactionDiaryNumber(int SDTransactionDiaryNumber) {
		this.SDTransactionDiaryNumber = SDTransactionDiaryNumber;
	}

    @JsonProperty("SDUnified")
	public int getSDUnified() {
		return SDUnified;
	}

	public void setSDUnified(int SDUnified) {
		this.SDUnified = SDUnified;
	}

    @JsonProperty("SDPrintingPackagingOrder")
	public int getSDPrintingPackagingOrder() {
		return SDPrintingPackagingOrder;
	}

	public void setSDPrintingPackagingOrder(int SDPrintingPackagingOrder) {
		this.SDPrintingPackagingOrder = SDPrintingPackagingOrder;
	}

    @JsonProperty("SDTranslated")
	public int getSDTranslated() {
		return SDTranslated;
	}

	public void setSDTranslated(int SDTranslated) {
		this.SDTranslated = SDTranslated;
	}

    @JsonProperty("SDForConsignment")
	public int getSDForConsignment() {
		return SDForConsignment;
	}

	public void setSDForConsignment(int SDForConsignment) {
		this.SDForConsignment = SDForConsignment;
	}

    @JsonProperty("SDDiaryConsignmentNumber")
	public int getSDDiaryConsignmentNumber() {
		return SDDiaryConsignmentNumber;
	}

	public void setSDDiaryConsignmentNumber(int SDDiaryConsignmentNumber) {
		this.SDDiaryConsignmentNumber = SDDiaryConsignmentNumber;
	}

    @JsonProperty("SDBookkeepingDate")
	public Date getSDBookkeepingDate() {
		return SDBookkeepingDate;
	}

	public void setSDBookkeepingDate(Date SDBookkeepingDate) {
		this.SDBookkeepingDate = SDBookkeepingDate;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("goodsIdentification")
	public IdentificationBean getGoodsIdentification() {
		return goodsIdentification;
	}

    public void setGoodsIdentification(IdentificationBean goodsIdentification) {
		this.goodsIdentification = goodsIdentification;
	}

    @JsonProperty("invoiceIdentification")
	public IdentificationBean getInvoiceIdentification() {
		return invoiceIdentification;
	}

    public void setInvoiceIdentification(IdentificationBean invoiceIdentification) {
		this.invoiceIdentification = invoiceIdentification;
	}

    @JsonProperty("orderHeading")
	public OrderHeadingBean getOrderHeading() {
		return orderHeading;
	}

    public void setOrderHeading(OrderHeadingBean orderHeading) {
		this.orderHeading = orderHeading;
	}

    @JsonProperty("paymentMethod")
	public PaymentMethodBean getPaymentMethod() {
		return paymentMethod;
	}

    public void setPaymentMethod(PaymentMethodBean paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

    @JsonProperty("declarationBasis")
	public DeclarationBasisBean getDeclarationBasis() {
		return declarationBasis;
	}

    public void setDeclarationBasis(DeclarationBasisBean declarationBasis) {
		this.declarationBasis = declarationBasis;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("consignmentStockroom")
	public StockroomBean getConsignmentStockroom() {
		return consignmentStockroom;
	}

    public void setConsignmentStockroom(StockroomBean consignmentStockroom) {
		this.consignmentStockroom = consignmentStockroom;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("exporterIdentification")
	public IdentificationBean getExporterIdentification() {
		return exporterIdentification;
	}

    public void setExporterIdentification(IdentificationBean exporterIdentification) {
		this.exporterIdentification = exporterIdentification;
	}

    @JsonProperty("deliveryMethod")
	public IdentificationBean getDeliveryMethod() {
		return deliveryMethod;
	}

    public void setDeliveryMethod(IdentificationBean deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("shippingDocumentItems")
	public Set<ShippingDocumentItemBean> getShippingDocumentItems() {
		return shippingDocumentItems;
	}

	public void setShippingDocumentItems(Set<ShippingDocumentItemBean> shippingDocumentItems) {
		this.shippingDocumentItems = shippingDocumentItems;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ShippingDocumentBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ShippingDocumentBean) o).getId()));
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
		return "ShippingDocumentBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SDDocumentNumber=" + SDDocumentNumber
			+ ", SDDispositionDate=" + SDDispositionDate
			+ ", SDFinalPackagingDate=" + SDFinalPackagingDate
			+ ", SDIssueDocumentDate=" + SDIssueDocumentDate
			+ ", SDShippingDocumentNumber=" + SDShippingDocumentNumber
			+ ", SDCancellationDocumentNumber=" + SDCancellationDocumentNumber
			+ ", SDStatus=" + SDStatus
			+ ", SDInvoiceDate=" + SDInvoiceDate
			+ ", SDCurrencyDate=" + SDCurrencyDate
			+ ", SDShipmentDate=" + SDShipmentDate
			+ ", SDCrateNumber=" + SDCrateNumber
			+ ", SDPostsCosts=" + SDPostsCosts
			+ ", SDStatementNumber=" + SDStatementNumber
			+ ", SDConfirmationNumber=" + SDConfirmationNumber
			+ ", SDStatementDate=" + SDStatementDate
			+ ", SDConfirmationDate=" + SDConfirmationDate
			+ ", SDPrintingStatusPackOrder=" + SDPrintingStatusPackOrder
			+ ", SDPrintingStatusInvoice=" + SDPrintingStatusInvoice
			+ ", SDPrintingStatusDispatch=" + SDPrintingStatusDispatch
			+ ", SDPrintingStatusTransactions=" + SDPrintingStatusTransactions
			+ ", SDOldDocument=" + SDOldDocument
			+ ", SDTransactionDiaryNumber=" + SDTransactionDiaryNumber
			+ ", SDUnified=" + SDUnified
			+ ", SDPrintingPackagingOrder=" + SDPrintingPackagingOrder
			+ ", SDTranslated=" + SDTranslated
			+ ", SDForConsignment=" + SDForConsignment
			+ ", SDDiaryConsignmentNumber=" + SDDiaryConsignmentNumber
			+ ", SDBookkeepingDate=" + SDBookkeepingDate
			// + ", organizationUnit=" + organizationUnit
			// + ", goodsIdentification=" + goodsIdentification
			// + ", invoiceIdentification=" + invoiceIdentification
			// + ", orderHeading=" + orderHeading
			// + ", paymentMethod=" + paymentMethod
			// + ", declarationBasis=" + declarationBasis
			// + ", documentType=" + documentType
			// + ", consignmentStockroom=" + consignmentStockroom
			// + ", stockroom=" + stockroom
			// + ", exporterIdentification=" + exporterIdentification
			// + ", deliveryMethod=" + deliveryMethod
			// + ", currency=" + currency
			// + ", shippingDocumentItems=" + shippingDocumentItems
			// + ", invoices=" + invoices
			+ "]";
	}
}