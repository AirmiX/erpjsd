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
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.initialization.DeclarationBasisBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.initialization.PaymentConditionBean;
import com.doobgroup.server.entities.procurement.TaxProformaInvoiceBean;

@Entity
@Table(name = "PROFORMAINVOICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PFINumber1"  ,  "organizationUnit"  	}))
@SQLDelete(sql="UPDATE PROFORMAINVOICE SET deleted = 1 WHERE ProFormaInvoice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProFormaInvoiceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProFormaInvoice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PFINumber1", nullable = false)
	protected int PFINumber1;
	@Column(name = "PFIDate", nullable = false)
	protected Date PFIDate;
	@Column(name = "PFIStatus", nullable = false)
	protected int PFIStatus;
	@Column(name = "PFIPrint", nullable = false)
	protected int PFIPrint;
	@Column(name = "PFIPaymentDate", nullable = false)
	protected Date PFIPaymentDate;
	@Column(name = "PFISubTotal", nullable = false)
	protected int PFISubTotal;
	@Column(name = "PFIRebateAmount")
	protected int PFIRebateAmount;
	@Column(name = "PFITotal")
	protected int PFITotal;
	@Column(name = "PFIPostalCosts")
	protected int PFIPostalCosts;
	@Column(name = "PFIPackaging")
	protected int PFIPackaging;
	@Column(name = "PFIAmountWithoutTax")
	protected int PFIAmountWithoutTax;
	@Column(name = "PFITaxAmount")
	protected int PFITaxAmount;
	@Column(name = "PFIForPayment", nullable = false)
	protected int PFIForPayment;
	@Column(name = "PFIRemark")
	protected String PFIRemark;
	@Column(name = "PFIDeclarationNumber")
	protected String PFIDeclarationNumber;
	@Column(name = "PFIConfirmationNumber")
	protected String PFIConfirmationNumber;
	@Column(name = "PFIDeclarationDate")
	protected Date PFIDeclarationDate;
	@Column(name = "PFIConfirmationDate")
	protected Date PFIConfirmationDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="declarationBasis")
    protected DeclarationBasisBean declarationBasis;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderHeading")
    protected OrderHeadingBean orderHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identifications")
    protected IdentificationBean identifications;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentCondition")
    protected PaymentConditionBean paymentCondition;
    @OneToMany(mappedBy = "proFormaInvoice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TaxProformaInvoiceBean> taxesProFormaInvoices = new HashSet<TaxProformaInvoiceBean>();

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

    @JsonProperty("PFINumber1")
	public int getPFINumber1() {
		return PFINumber1;
	}

	public void setPFINumber1(int PFINumber1) {
		this.PFINumber1 = PFINumber1;
	}

    @JsonProperty("PFIDate")
	public Date getPFIDate() {
		return PFIDate;
	}

	public void setPFIDate(Date PFIDate) {
		this.PFIDate = PFIDate;
	}

    @JsonProperty("PFIStatus")
	public int getPFIStatus() {
		return PFIStatus;
	}

	public void setPFIStatus(int PFIStatus) {
		this.PFIStatus = PFIStatus;
	}

    @JsonProperty("PFIPrint")
	public int getPFIPrint() {
		return PFIPrint;
	}

	public void setPFIPrint(int PFIPrint) {
		this.PFIPrint = PFIPrint;
	}

    @JsonProperty("PFIPaymentDate")
	public Date getPFIPaymentDate() {
		return PFIPaymentDate;
	}

	public void setPFIPaymentDate(Date PFIPaymentDate) {
		this.PFIPaymentDate = PFIPaymentDate;
	}

    @JsonProperty("PFISubTotal")
	public int getPFISubTotal() {
		return PFISubTotal;
	}

	public void setPFISubTotal(int PFISubTotal) {
		this.PFISubTotal = PFISubTotal;
	}

    @JsonProperty("PFIRebateAmount")
	public int getPFIRebateAmount() {
		return PFIRebateAmount;
	}

	public void setPFIRebateAmount(int PFIRebateAmount) {
		this.PFIRebateAmount = PFIRebateAmount;
	}

    @JsonProperty("PFITotal")
	public int getPFITotal() {
		return PFITotal;
	}

	public void setPFITotal(int PFITotal) {
		this.PFITotal = PFITotal;
	}

    @JsonProperty("PFIPostalCosts")
	public int getPFIPostalCosts() {
		return PFIPostalCosts;
	}

	public void setPFIPostalCosts(int PFIPostalCosts) {
		this.PFIPostalCosts = PFIPostalCosts;
	}

    @JsonProperty("PFIPackaging")
	public int getPFIPackaging() {
		return PFIPackaging;
	}

	public void setPFIPackaging(int PFIPackaging) {
		this.PFIPackaging = PFIPackaging;
	}

    @JsonProperty("PFIAmountWithoutTax")
	public int getPFIAmountWithoutTax() {
		return PFIAmountWithoutTax;
	}

	public void setPFIAmountWithoutTax(int PFIAmountWithoutTax) {
		this.PFIAmountWithoutTax = PFIAmountWithoutTax;
	}

    @JsonProperty("PFITaxAmount")
	public int getPFITaxAmount() {
		return PFITaxAmount;
	}

	public void setPFITaxAmount(int PFITaxAmount) {
		this.PFITaxAmount = PFITaxAmount;
	}

    @JsonProperty("PFIForPayment")
	public int getPFIForPayment() {
		return PFIForPayment;
	}

	public void setPFIForPayment(int PFIForPayment) {
		this.PFIForPayment = PFIForPayment;
	}

    @JsonProperty("PFIRemark")
	public String getPFIRemark() {
		return PFIRemark;
	}

	public void setPFIRemark(String PFIRemark) {
		this.PFIRemark = PFIRemark;
	}

    @JsonProperty("PFIDeclarationNumber")
	public String getPFIDeclarationNumber() {
		return PFIDeclarationNumber;
	}

	public void setPFIDeclarationNumber(String PFIDeclarationNumber) {
		this.PFIDeclarationNumber = PFIDeclarationNumber;
	}

    @JsonProperty("PFIConfirmationNumber")
	public String getPFIConfirmationNumber() {
		return PFIConfirmationNumber;
	}

	public void setPFIConfirmationNumber(String PFIConfirmationNumber) {
		this.PFIConfirmationNumber = PFIConfirmationNumber;
	}

    @JsonProperty("PFIDeclarationDate")
	public Date getPFIDeclarationDate() {
		return PFIDeclarationDate;
	}

	public void setPFIDeclarationDate(Date PFIDeclarationDate) {
		this.PFIDeclarationDate = PFIDeclarationDate;
	}

    @JsonProperty("PFIConfirmationDate")
	public Date getPFIConfirmationDate() {
		return PFIConfirmationDate;
	}

	public void setPFIConfirmationDate(Date PFIConfirmationDate) {
		this.PFIConfirmationDate = PFIConfirmationDate;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
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

    @JsonProperty("orderHeading")
	public OrderHeadingBean getOrderHeading() {
		return orderHeading;
	}

    public void setOrderHeading(OrderHeadingBean orderHeading) {
		this.orderHeading = orderHeading;
	}

    @JsonProperty("identifications")
	public IdentificationBean getIdentifications() {
		return identifications;
	}

    public void setIdentifications(IdentificationBean identifications) {
		this.identifications = identifications;
	}

    @JsonProperty("paymentCondition")
	public PaymentConditionBean getPaymentCondition() {
		return paymentCondition;
	}

    public void setPaymentCondition(PaymentConditionBean paymentCondition) {
		this.paymentCondition = paymentCondition;
	}

    @JsonProperty("taxesProFormaInvoices")
	public Set<TaxProformaInvoiceBean> getTaxesProFormaInvoices() {
		return taxesProFormaInvoices;
	}

	public void setTaxesProFormaInvoices(Set<TaxProformaInvoiceBean> taxesProFormaInvoices) {
		this.taxesProFormaInvoices = taxesProFormaInvoices;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProFormaInvoiceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProFormaInvoiceBean) o).getId()));
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
		return "ProFormaInvoiceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PFINumber1=" + PFINumber1
			+ ", PFIDate=" + PFIDate
			+ ", PFIStatus=" + PFIStatus
			+ ", PFIPrint=" + PFIPrint
			+ ", PFIPaymentDate=" + PFIPaymentDate
			+ ", PFISubTotal=" + PFISubTotal
			+ ", PFIRebateAmount=" + PFIRebateAmount
			+ ", PFITotal=" + PFITotal
			+ ", PFIPostalCosts=" + PFIPostalCosts
			+ ", PFIPackaging=" + PFIPackaging
			+ ", PFIAmountWithoutTax=" + PFIAmountWithoutTax
			+ ", PFITaxAmount=" + PFITaxAmount
			+ ", PFIForPayment=" + PFIForPayment
			+ ", PFIRemark=" + PFIRemark
			+ ", PFIDeclarationNumber=" + PFIDeclarationNumber
			+ ", PFIConfirmationNumber=" + PFIConfirmationNumber
			+ ", PFIDeclarationDate=" + PFIDeclarationDate
			+ ", PFIConfirmationDate=" + PFIConfirmationDate
			// + ", organizationUnit=" + organizationUnit
			// + ", currency=" + currency
			// + ", declarationBasis=" + declarationBasis
			// + ", documentType=" + documentType
			// + ", orderHeading=" + orderHeading
			// + ", identifications=" + identifications
			// + ", paymentCondition=" + paymentCondition
			// + ", taxesProFormaInvoices=" + taxesProFormaInvoices
			+ "]";
	}
}