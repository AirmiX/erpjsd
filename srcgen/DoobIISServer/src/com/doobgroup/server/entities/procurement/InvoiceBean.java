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

import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.initialization.PaymentConditionBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.initialization.DeclarationBasisBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.procurement.TaxInvoiceBean;
import com.doobgroup.server.entities.procurement.InvoiceItemsWithoutDispBean;
import com.doobgroup.server.entities.procurement.InvoiceItemBean;

@Entity
@Table(name = "INVOICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "IInvoiceNumber"  ,  "organizationUnit"  	}))
@SQLDelete(sql="UPDATE INVOICE SET deleted = 1 WHERE Invoice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class InvoiceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Invoice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "IInvoiceNumber", nullable = false)
	protected int IInvoiceNumber;
	@Column(name = "IInvoiceDate", nullable = false)
	protected Date IInvoiceDate;
	@Column(name = "IPaymentDate", nullable = false)
	protected Date IPaymentDate;
	@Column(name = "IShippingDocumentNumber")
	protected String IShippingDocumentNumber;
	@Column(name = "IShippingDate")
	protected Date IShippingDate;
	@Column(name = "IInvoiceStatus", nullable = false)
	protected int IInvoiceStatus;
	@Column(name = "IPrintStatus", nullable = false)
	protected int IPrintStatus;
	@Column(name = "ISubTotal", nullable = false)
	protected double ISubTotal;
	@Column(name = "ITurnoverCosts")
	protected double ITurnoverCosts;
	@Column(name = "ITotal")
	protected double ITotal;
	@Column(name = "IPostCosts")
	protected double IPostCosts;
	@Column(name = "IPackingCosts")
	protected double IPackingCosts;
	@Column(name = "IAmountWithoutTax")
	protected double IAmountWithoutTax;
	@Column(name = "ITaxAmount")
	protected double ITaxAmount;
	@Column(name = "IPaymentAmount", nullable = false)
	protected double IPaymentAmount;
	@Column(name = "IForeignCommission")
	protected double IForeignCommission;
	@Column(name = "IDiscountPercentage")
	protected double IDiscountPercentage;
	@Column(name = "IForeignCurrencyNetAmount")
	protected double IForeignCurrencyNetAmount;
	@Column(name = "ITotalRSD")
	protected double ITotalRSD;
	@Column(name = "IExportCommission")
	protected double IExportCommission;
	@Column(name = "IRemark")
	protected String IRemark;
	@Column(name = "ITaxDeclarationNumber")
	protected String ITaxDeclarationNumber;
	@Column(name = "IConfirmationNumber")
	protected String IConfirmationNumber;
	@Column(name = "IDeclarationDate")
	protected Date IDeclarationDate;
	@Column(name = "IConfirmationDate")
	protected Date IConfirmationDate;
	@Column(name = "IKOrderNumber")
	protected String IKOrderNumber;
	@Column(name = "IFreeInvoice")
	protected String IFreeInvoice;
	@Column(name = "IUnified")
	protected String IUnified;
	@Column(name = "IConclusionNumber")
	protected String IConclusionNumber;
	@Column(name = "IUniqueCustomsIdentifier")
	protected String IUniqueCustomsIdentifier;
	@Column(name = "ICustomsDate")
	protected Date ICustomsDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentCondition")
    protected PaymentConditionBean paymentCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderHeading")
    protected OrderHeadingBean orderHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="declarationBasis")
    protected DeclarationBasisBean declarationBasis;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="shippingDocument")
    protected ShippingDocumentBean shippingDocument;
    @OneToMany(mappedBy = "invoice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TaxInvoiceBean> taxInvoices = new HashSet<TaxInvoiceBean>();
    @OneToMany(mappedBy = "invoice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceItemsWithoutDispBean> invoiceItemsWithoutDisp = new HashSet<InvoiceItemsWithoutDispBean>();
    @OneToMany(mappedBy = "invoice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceItemBean> invoiceItems = new HashSet<InvoiceItemBean>();

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

    @JsonProperty("IInvoiceNumber")
	public int getIInvoiceNumber() {
		return IInvoiceNumber;
	}

	public void setIInvoiceNumber(int IInvoiceNumber) {
		this.IInvoiceNumber = IInvoiceNumber;
	}

    @JsonProperty("IInvoiceDate")
	public Date getIInvoiceDate() {
		return IInvoiceDate;
	}

	public void setIInvoiceDate(Date IInvoiceDate) {
		this.IInvoiceDate = IInvoiceDate;
	}

    @JsonProperty("IPaymentDate")
	public Date getIPaymentDate() {
		return IPaymentDate;
	}

	public void setIPaymentDate(Date IPaymentDate) {
		this.IPaymentDate = IPaymentDate;
	}

    @JsonProperty("IShippingDocumentNumber")
	public String getIShippingDocumentNumber() {
		return IShippingDocumentNumber;
	}

	public void setIShippingDocumentNumber(String IShippingDocumentNumber) {
		this.IShippingDocumentNumber = IShippingDocumentNumber;
	}

    @JsonProperty("IShippingDate")
	public Date getIShippingDate() {
		return IShippingDate;
	}

	public void setIShippingDate(Date IShippingDate) {
		this.IShippingDate = IShippingDate;
	}

    @JsonProperty("IInvoiceStatus")
	public int getIInvoiceStatus() {
		return IInvoiceStatus;
	}

	public void setIInvoiceStatus(int IInvoiceStatus) {
		this.IInvoiceStatus = IInvoiceStatus;
	}

    @JsonProperty("IPrintStatus")
	public int getIPrintStatus() {
		return IPrintStatus;
	}

	public void setIPrintStatus(int IPrintStatus) {
		this.IPrintStatus = IPrintStatus;
	}

    @JsonProperty("ISubTotal")
	public double getISubTotal() {
		return ISubTotal;
	}

	public void setISubTotal(double ISubTotal) {
		this.ISubTotal = ISubTotal;
	}

    @JsonProperty("ITurnoverCosts")
	public double getITurnoverCosts() {
		return ITurnoverCosts;
	}

	public void setITurnoverCosts(double ITurnoverCosts) {
		this.ITurnoverCosts = ITurnoverCosts;
	}

    @JsonProperty("ITotal")
	public double getITotal() {
		return ITotal;
	}

	public void setITotal(double ITotal) {
		this.ITotal = ITotal;
	}

    @JsonProperty("IPostCosts")
	public double getIPostCosts() {
		return IPostCosts;
	}

	public void setIPostCosts(double IPostCosts) {
		this.IPostCosts = IPostCosts;
	}

    @JsonProperty("IPackingCosts")
	public double getIPackingCosts() {
		return IPackingCosts;
	}

	public void setIPackingCosts(double IPackingCosts) {
		this.IPackingCosts = IPackingCosts;
	}

    @JsonProperty("IAmountWithoutTax")
	public double getIAmountWithoutTax() {
		return IAmountWithoutTax;
	}

	public void setIAmountWithoutTax(double IAmountWithoutTax) {
		this.IAmountWithoutTax = IAmountWithoutTax;
	}

    @JsonProperty("ITaxAmount")
	public double getITaxAmount() {
		return ITaxAmount;
	}

	public void setITaxAmount(double ITaxAmount) {
		this.ITaxAmount = ITaxAmount;
	}

    @JsonProperty("IPaymentAmount")
	public double getIPaymentAmount() {
		return IPaymentAmount;
	}

	public void setIPaymentAmount(double IPaymentAmount) {
		this.IPaymentAmount = IPaymentAmount;
	}

    @JsonProperty("IForeignCommission")
	public double getIForeignCommission() {
		return IForeignCommission;
	}

	public void setIForeignCommission(double IForeignCommission) {
		this.IForeignCommission = IForeignCommission;
	}

    @JsonProperty("IDiscountPercentage")
	public double getIDiscountPercentage() {
		return IDiscountPercentage;
	}

	public void setIDiscountPercentage(double IDiscountPercentage) {
		this.IDiscountPercentage = IDiscountPercentage;
	}

    @JsonProperty("IForeignCurrencyNetAmount")
	public double getIForeignCurrencyNetAmount() {
		return IForeignCurrencyNetAmount;
	}

	public void setIForeignCurrencyNetAmount(double IForeignCurrencyNetAmount) {
		this.IForeignCurrencyNetAmount = IForeignCurrencyNetAmount;
	}

    @JsonProperty("ITotalRSD")
	public double getITotalRSD() {
		return ITotalRSD;
	}

	public void setITotalRSD(double ITotalRSD) {
		this.ITotalRSD = ITotalRSD;
	}

    @JsonProperty("IExportCommission")
	public double getIExportCommission() {
		return IExportCommission;
	}

	public void setIExportCommission(double IExportCommission) {
		this.IExportCommission = IExportCommission;
	}

    @JsonProperty("IRemark")
	public String getIRemark() {
		return IRemark;
	}

	public void setIRemark(String IRemark) {
		this.IRemark = IRemark;
	}

    @JsonProperty("ITaxDeclarationNumber")
	public String getITaxDeclarationNumber() {
		return ITaxDeclarationNumber;
	}

	public void setITaxDeclarationNumber(String ITaxDeclarationNumber) {
		this.ITaxDeclarationNumber = ITaxDeclarationNumber;
	}

    @JsonProperty("IConfirmationNumber")
	public String getIConfirmationNumber() {
		return IConfirmationNumber;
	}

	public void setIConfirmationNumber(String IConfirmationNumber) {
		this.IConfirmationNumber = IConfirmationNumber;
	}

    @JsonProperty("IDeclarationDate")
	public Date getIDeclarationDate() {
		return IDeclarationDate;
	}

	public void setIDeclarationDate(Date IDeclarationDate) {
		this.IDeclarationDate = IDeclarationDate;
	}

    @JsonProperty("IConfirmationDate")
	public Date getIConfirmationDate() {
		return IConfirmationDate;
	}

	public void setIConfirmationDate(Date IConfirmationDate) {
		this.IConfirmationDate = IConfirmationDate;
	}

    @JsonProperty("IKOrderNumber")
	public String getIKOrderNumber() {
		return IKOrderNumber;
	}

	public void setIKOrderNumber(String IKOrderNumber) {
		this.IKOrderNumber = IKOrderNumber;
	}

    @JsonProperty("IFreeInvoice")
	public String getIFreeInvoice() {
		return IFreeInvoice;
	}

	public void setIFreeInvoice(String IFreeInvoice) {
		this.IFreeInvoice = IFreeInvoice;
	}

    @JsonProperty("IUnified")
	public String getIUnified() {
		return IUnified;
	}

	public void setIUnified(String IUnified) {
		this.IUnified = IUnified;
	}

    @JsonProperty("IConclusionNumber")
	public String getIConclusionNumber() {
		return IConclusionNumber;
	}

	public void setIConclusionNumber(String IConclusionNumber) {
		this.IConclusionNumber = IConclusionNumber;
	}

    @JsonProperty("IUniqueCustomsIdentifier")
	public String getIUniqueCustomsIdentifier() {
		return IUniqueCustomsIdentifier;
	}

	public void setIUniqueCustomsIdentifier(String IUniqueCustomsIdentifier) {
		this.IUniqueCustomsIdentifier = IUniqueCustomsIdentifier;
	}

    @JsonProperty("ICustomsDate")
	public Date getICustomsDate() {
		return ICustomsDate;
	}

	public void setICustomsDate(Date ICustomsDate) {
		this.ICustomsDate = ICustomsDate;
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

    @JsonProperty("paymentCondition")
	public PaymentConditionBean getPaymentCondition() {
		return paymentCondition;
	}

    public void setPaymentCondition(PaymentConditionBean paymentCondition) {
		this.paymentCondition = paymentCondition;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("orderHeading")
	public OrderHeadingBean getOrderHeading() {
		return orderHeading;
	}

    public void setOrderHeading(OrderHeadingBean orderHeading) {
		this.orderHeading = orderHeading;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("declarationBasis")
	public DeclarationBasisBean getDeclarationBasis() {
		return declarationBasis;
	}

    public void setDeclarationBasis(DeclarationBasisBean declarationBasis) {
		this.declarationBasis = declarationBasis;
	}

    @JsonProperty("shippingDocument")
	public ShippingDocumentBean getShippingDocument() {
		return shippingDocument;
	}

    public void setShippingDocument(ShippingDocumentBean shippingDocument) {
		this.shippingDocument = shippingDocument;
	}

    @JsonProperty("taxInvoices")
	public Set<TaxInvoiceBean> getTaxInvoices() {
		return taxInvoices;
	}

	public void setTaxInvoices(Set<TaxInvoiceBean> taxInvoices) {
		this.taxInvoices = taxInvoices;
	}

    @JsonProperty("invoiceItemsWithoutDisp")
	public Set<InvoiceItemsWithoutDispBean> getInvoiceItemsWithoutDisp() {
		return invoiceItemsWithoutDisp;
	}

	public void setInvoiceItemsWithoutDisp(Set<InvoiceItemsWithoutDispBean> invoiceItemsWithoutDisp) {
		this.invoiceItemsWithoutDisp = invoiceItemsWithoutDisp;
	}

    @JsonProperty("invoiceItems")
	public Set<InvoiceItemBean> getInvoiceItems() {
		return invoiceItems;
	}

	public void setInvoiceItems(Set<InvoiceItemBean> invoiceItems) {
		this.invoiceItems = invoiceItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof InvoiceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((InvoiceBean) o).getId()));
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
		return "InvoiceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", IInvoiceNumber=" + IInvoiceNumber
			+ ", IInvoiceDate=" + IInvoiceDate
			+ ", IPaymentDate=" + IPaymentDate
			+ ", IShippingDocumentNumber=" + IShippingDocumentNumber
			+ ", IShippingDate=" + IShippingDate
			+ ", IInvoiceStatus=" + IInvoiceStatus
			+ ", IPrintStatus=" + IPrintStatus
			+ ", ISubTotal=" + ISubTotal
			+ ", ITurnoverCosts=" + ITurnoverCosts
			+ ", ITotal=" + ITotal
			+ ", IPostCosts=" + IPostCosts
			+ ", IPackingCosts=" + IPackingCosts
			+ ", IAmountWithoutTax=" + IAmountWithoutTax
			+ ", ITaxAmount=" + ITaxAmount
			+ ", IPaymentAmount=" + IPaymentAmount
			+ ", IForeignCommission=" + IForeignCommission
			+ ", IDiscountPercentage=" + IDiscountPercentage
			+ ", IForeignCurrencyNetAmount=" + IForeignCurrencyNetAmount
			+ ", ITotalRSD=" + ITotalRSD
			+ ", IExportCommission=" + IExportCommission
			+ ", IRemark=" + IRemark
			+ ", ITaxDeclarationNumber=" + ITaxDeclarationNumber
			+ ", IConfirmationNumber=" + IConfirmationNumber
			+ ", IDeclarationDate=" + IDeclarationDate
			+ ", IConfirmationDate=" + IConfirmationDate
			+ ", IKOrderNumber=" + IKOrderNumber
			+ ", IFreeInvoice=" + IFreeInvoice
			+ ", IUnified=" + IUnified
			+ ", IConclusionNumber=" + IConclusionNumber
			+ ", IUniqueCustomsIdentifier=" + IUniqueCustomsIdentifier
			+ ", ICustomsDate=" + ICustomsDate
			// + ", documentType=" + documentType
			// + ", identification=" + identification
			// + ", paymentCondition=" + paymentCondition
			// + ", currency=" + currency
			// + ", orderHeading=" + orderHeading
			// + ", organizationUnit=" + organizationUnit
			// + ", declarationBasis=" + declarationBasis
			// + ", shippingDocument=" + shippingDocument
			// + ", taxInvoices=" + taxInvoices
			// + ", invoiceItemsWithoutDisp=" + invoiceItemsWithoutDisp
			// + ", invoiceItems=" + invoiceItems
			+ "]";
	}
}