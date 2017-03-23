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

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.order.DeliveryMethodBean;
import com.doobgroup.server.entities.initialization.DenotationMethodBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.initialization.PaymentMethodBean;
import com.doobgroup.server.entities.stockmanagement.RequestForProposalHeadingBean;
import com.doobgroup.server.entities.initialization.PackingMethodBean;
import com.doobgroup.server.entities.logical.OfferSupplierItemBean;

@Entity
@Table(name = "OFFERSUPPLIERHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OSHNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE OFFERSUPPLIERHEADING SET deleted = 1 WHERE OfferSupplierHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OfferSupplierHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OfferSupplierHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OSHNumber", nullable = false)
	protected int OSHNumber;
	@Column(name = "OSHOfferAcceptStatus", nullable = false)
	protected String OSHOfferAcceptStatus;
	@Column(name = "OSHReceivingDate", nullable = false)
	protected Date OSHReceivingDate;
	@Column(name = "OSHExpiryDate", nullable = false)
	protected Date OSHExpiryDate;
	@Column(name = "OSHRemark")
	protected String OSHRemark;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="supplier")
    protected IdentificationBean supplier;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryMethod")
    protected DeliveryMethodBean deliveryMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="denotationMethod")
    protected DenotationMethodBean denotationMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentMethod")
    protected PaymentMethodBean paymentMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="rfpHeading")
    protected RequestForProposalHeadingBean rfpHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="packingMethod")
    protected PackingMethodBean packingMethod;
    @OneToMany(mappedBy = "offerSupplierHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierItemBean> offerSupplierItems = new HashSet<OfferSupplierItemBean>();

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

    @JsonProperty("OSHOfferAcceptStatus")
	public String getOSHOfferAcceptStatus() {
		return OSHOfferAcceptStatus;
	}

	public void setOSHOfferAcceptStatus(String OSHOfferAcceptStatus) {
		this.OSHOfferAcceptStatus = OSHOfferAcceptStatus;
	}

    @JsonProperty("OSHReceivingDate")
	public Date getOSHReceivingDate() {
		return OSHReceivingDate;
	}

	public void setOSHReceivingDate(Date OSHReceivingDate) {
		this.OSHReceivingDate = OSHReceivingDate;
	}

    @JsonProperty("OSHExpiryDate")
	public Date getOSHExpiryDate() {
		return OSHExpiryDate;
	}

	public void setOSHExpiryDate(Date OSHExpiryDate) {
		this.OSHExpiryDate = OSHExpiryDate;
	}

    @JsonProperty("OSHRemark")
	public String getOSHRemark() {
		return OSHRemark;
	}

	public void setOSHRemark(String OSHRemark) {
		this.OSHRemark = OSHRemark;
	}


    @JsonProperty("supplier")
	public IdentificationBean getSupplier() {
		return supplier;
	}

    public void setSupplier(IdentificationBean supplier) {
		this.supplier = supplier;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("deliveryMethod")
	public DeliveryMethodBean getDeliveryMethod() {
		return deliveryMethod;
	}

    public void setDeliveryMethod(DeliveryMethodBean deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

    @JsonProperty("denotationMethod")
	public DenotationMethodBean getDenotationMethod() {
		return denotationMethod;
	}

    public void setDenotationMethod(DenotationMethodBean denotationMethod) {
		this.denotationMethod = denotationMethod;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("paymentMethod")
	public PaymentMethodBean getPaymentMethod() {
		return paymentMethod;
	}

    public void setPaymentMethod(PaymentMethodBean paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

    @JsonProperty("rfpHeading")
	public RequestForProposalHeadingBean getRfpHeading() {
		return rfpHeading;
	}

    public void setRfpHeading(RequestForProposalHeadingBean rfpHeading) {
		this.rfpHeading = rfpHeading;
	}

    @JsonProperty("packingMethod")
	public PackingMethodBean getPackingMethod() {
		return packingMethod;
	}

    public void setPackingMethod(PackingMethodBean packingMethod) {
		this.packingMethod = packingMethod;
	}

    @JsonProperty("offerSupplierItems")
	public Set<OfferSupplierItemBean> getOfferSupplierItems() {
		return offerSupplierItems;
	}

	public void setOfferSupplierItems(Set<OfferSupplierItemBean> offerSupplierItems) {
		this.offerSupplierItems = offerSupplierItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OfferSupplierHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OfferSupplierHeadingBean) o).getId()));
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
		return "OfferSupplierHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OSHNumber=" + OSHNumber
			+ ", OSHOfferAcceptStatus=" + OSHOfferAcceptStatus
			+ ", OSHReceivingDate=" + OSHReceivingDate
			+ ", OSHExpiryDate=" + OSHExpiryDate
			+ ", OSHRemark=" + OSHRemark
			// + ", supplier=" + supplier
			// + ", documentType=" + documentType
			// + ", currency=" + currency
			// + ", deliveryMethod=" + deliveryMethod
			// + ", denotationMethod=" + denotationMethod
			// + ", organizationUnit=" + organizationUnit
			// + ", paymentMethod=" + paymentMethod
			// + ", rfpHeading=" + rfpHeading
			// + ", packingMethod=" + packingMethod
			// + ", offerSupplierItems=" + offerSupplierItems
			+ "]";
	}
}