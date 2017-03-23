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

import com.doobgroup.server.entities.order.DeliveryMethodBean;
import com.doobgroup.server.entities.logical.ParityBean;
import com.doobgroup.server.entities.initialization.PaymentMethodBean;
import com.doobgroup.server.entities.initialization.PackagingStatusBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.initialization.DeclarationBasisBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.logical.OrderSupplierItemBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;

@Entity
@Table(name = "ORDERSUPPLIERHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OSHNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE ORDERSUPPLIERHEADING SET deleted = 1 WHERE OrderSupplierHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OrderSupplierHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OrderSupplierHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OSHNumber", nullable = false)
	protected int OSHNumber;
	@Column(name = "OSHDate", nullable = false)
	protected Date OSHDate;
	@Column(name = "OSHApprovalDate", nullable = false)
	protected Date OSHApprovalDate;
	@Column(name = "OSHStatus")
	protected String OSHStatus;
	@Column(name = "OSHOrderConfirmation")
	protected String OSHOrderConfirmation;
	@Column(name = "OSHRemark")
	protected String OSHRemark;
	@Column(name = "OSHStatementNumber")
	protected String OSHStatementNumber;
	@Column(name = "OSHStatementDate")
	protected Date OSHStatementDate;
	@Column(name = "OSHConfirmationNumber")
	protected String OSHConfirmationNumber;
	@Column(name = "OSHConfirmationDate")
	protected Date OSHConfirmationDate;
	@Column(name = "OSHPrintStatus")
	protected int OSHPrintStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryMethod")
    protected DeliveryMethodBean deliveryMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="parity")
    protected ParityBean parity;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentMethod")
    protected PaymentMethodBean paymentMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="packagingStatus")
    protected PackagingStatusBean packagingStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="supplier")
    protected IdentificationBean supplier;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="declarationBasis")
    protected DeclarationBasisBean declarationBasis;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @OneToMany(mappedBy = "orderSupplierHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierItemBean> orderSupplierItems = new HashSet<OrderSupplierItemBean>();
    @OneToMany(mappedBy = "orderSupplierHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings = new HashSet<GoodsReceivedNoteHeadingBean>();

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

    @JsonProperty("OSHNumber")
	public int getOSHNumber() {
		return OSHNumber;
	}

	public void setOSHNumber(int OSHNumber) {
		this.OSHNumber = OSHNumber;
	}

    @JsonProperty("OSHDate")
	public Date getOSHDate() {
		return OSHDate;
	}

	public void setOSHDate(Date OSHDate) {
		this.OSHDate = OSHDate;
	}

    @JsonProperty("OSHApprovalDate")
	public Date getOSHApprovalDate() {
		return OSHApprovalDate;
	}

	public void setOSHApprovalDate(Date OSHApprovalDate) {
		this.OSHApprovalDate = OSHApprovalDate;
	}

    @JsonProperty("OSHStatus")
	public String getOSHStatus() {
		return OSHStatus;
	}

	public void setOSHStatus(String OSHStatus) {
		this.OSHStatus = OSHStatus;
	}

    @JsonProperty("OSHOrderConfirmation")
	public String getOSHOrderConfirmation() {
		return OSHOrderConfirmation;
	}

	public void setOSHOrderConfirmation(String OSHOrderConfirmation) {
		this.OSHOrderConfirmation = OSHOrderConfirmation;
	}

    @JsonProperty("OSHRemark")
	public String getOSHRemark() {
		return OSHRemark;
	}

	public void setOSHRemark(String OSHRemark) {
		this.OSHRemark = OSHRemark;
	}

    @JsonProperty("OSHStatementNumber")
	public String getOSHStatementNumber() {
		return OSHStatementNumber;
	}

	public void setOSHStatementNumber(String OSHStatementNumber) {
		this.OSHStatementNumber = OSHStatementNumber;
	}

    @JsonProperty("OSHStatementDate")
	public Date getOSHStatementDate() {
		return OSHStatementDate;
	}

	public void setOSHStatementDate(Date OSHStatementDate) {
		this.OSHStatementDate = OSHStatementDate;
	}

    @JsonProperty("OSHConfirmationNumber")
	public String getOSHConfirmationNumber() {
		return OSHConfirmationNumber;
	}

	public void setOSHConfirmationNumber(String OSHConfirmationNumber) {
		this.OSHConfirmationNumber = OSHConfirmationNumber;
	}

    @JsonProperty("OSHConfirmationDate")
	public Date getOSHConfirmationDate() {
		return OSHConfirmationDate;
	}

	public void setOSHConfirmationDate(Date OSHConfirmationDate) {
		this.OSHConfirmationDate = OSHConfirmationDate;
	}

    @JsonProperty("OSHPrintStatus")
	public int getOSHPrintStatus() {
		return OSHPrintStatus;
	}

	public void setOSHPrintStatus(int OSHPrintStatus) {
		this.OSHPrintStatus = OSHPrintStatus;
	}


    @JsonProperty("deliveryMethod")
	public DeliveryMethodBean getDeliveryMethod() {
		return deliveryMethod;
	}

    public void setDeliveryMethod(DeliveryMethodBean deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

    @JsonProperty("parity")
	public ParityBean getParity() {
		return parity;
	}

    public void setParity(ParityBean parity) {
		this.parity = parity;
	}

    @JsonProperty("paymentMethod")
	public PaymentMethodBean getPaymentMethod() {
		return paymentMethod;
	}

    public void setPaymentMethod(PaymentMethodBean paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

    @JsonProperty("packagingStatus")
	public PackagingStatusBean getPackagingStatus() {
		return packagingStatus;
	}

    public void setPackagingStatus(PackagingStatusBean packagingStatus) {
		this.packagingStatus = packagingStatus;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("supplier")
	public IdentificationBean getSupplier() {
		return supplier;
	}

    public void setSupplier(IdentificationBean supplier) {
		this.supplier = supplier;
	}

    @JsonProperty("declarationBasis")
	public DeclarationBasisBean getDeclarationBasis() {
		return declarationBasis;
	}

    public void setDeclarationBasis(DeclarationBasisBean declarationBasis) {
		this.declarationBasis = declarationBasis;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("orderSupplierItems")
	public Set<OrderSupplierItemBean> getOrderSupplierItems() {
		return orderSupplierItems;
	}

	public void setOrderSupplierItems(Set<OrderSupplierItemBean> orderSupplierItems) {
		this.orderSupplierItems = orderSupplierItems;
	}

    @JsonProperty("goodsReceivedNoteHeadings")
	public Set<GoodsReceivedNoteHeadingBean> getGoodsReceivedNoteHeadings() {
		return goodsReceivedNoteHeadings;
	}

	public void setGoodsReceivedNoteHeadings(Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings) {
		this.goodsReceivedNoteHeadings = goodsReceivedNoteHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OrderSupplierHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OrderSupplierHeadingBean) o).getId()));
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
		return "OrderSupplierHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OSHNumber=" + OSHNumber
			+ ", OSHDate=" + OSHDate
			+ ", OSHApprovalDate=" + OSHApprovalDate
			+ ", OSHStatus=" + OSHStatus
			+ ", OSHOrderConfirmation=" + OSHOrderConfirmation
			+ ", OSHRemark=" + OSHRemark
			+ ", OSHStatementNumber=" + OSHStatementNumber
			+ ", OSHStatementDate=" + OSHStatementDate
			+ ", OSHConfirmationNumber=" + OSHConfirmationNumber
			+ ", OSHConfirmationDate=" + OSHConfirmationDate
			+ ", OSHPrintStatus=" + OSHPrintStatus
			// + ", deliveryMethod=" + deliveryMethod
			// + ", parity=" + parity
			// + ", paymentMethod=" + paymentMethod
			// + ", packagingStatus=" + packagingStatus
			// + ", documentType=" + documentType
			// + ", supplier=" + supplier
			// + ", declarationBasis=" + declarationBasis
			// + ", currency=" + currency
			// + ", organizationUnit=" + organizationUnit
			// + ", orderSupplierItems=" + orderSupplierItems
			// + ", goodsReceivedNoteHeadings=" + goodsReceivedNoteHeadings
			+ "]";
	}
}