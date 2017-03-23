package com.doobgroup.server.entities.internalorder;

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
import com.doobgroup.server.entities.initialization.PaymentMethodBean;
import com.doobgroup.server.entities.initialization.PaymentConditionBean;
import com.doobgroup.server.entities.corporation.BusinessEntityBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;

@Entity
@Table(name = "BEORDERHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BEOHDocumentNumber"  	}))
@SQLDelete(sql="UPDATE BEORDERHEADING SET deleted = 1 WHERE BEOrderHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BEOrderHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BEOrderHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BEOHDocumentNumber", nullable = false)
	protected int BEOHDocumentNumber;
	@Column(name = "BEOHCreationDate", nullable = false)
	protected Date BEOHCreationDate;
	@Column(name = "BEOHOrderDate", nullable = false)
	protected Date BEOHOrderDate;
	@Column(name = "BEOHCompletionStatus")
	protected String BEOHCompletionStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryMethod")
    protected DeliveryMethodBean deliveryMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentMethod")
    protected PaymentMethodBean paymentMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentCondition")
    protected PaymentConditionBean paymentCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="beCustomer")
    protected BusinessEntityBean beCustomer;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="beSeller")
    protected BusinessEntityBean beSeller;
    @OneToMany(mappedBy = "beOrderHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();

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

    @JsonProperty("BEOHDocumentNumber")
	public int getBEOHDocumentNumber() {
		return BEOHDocumentNumber;
	}

	public void setBEOHDocumentNumber(int BEOHDocumentNumber) {
		this.BEOHDocumentNumber = BEOHDocumentNumber;
	}

    @JsonProperty("BEOHCreationDate")
	public Date getBEOHCreationDate() {
		return BEOHCreationDate;
	}

	public void setBEOHCreationDate(Date BEOHCreationDate) {
		this.BEOHCreationDate = BEOHCreationDate;
	}

    @JsonProperty("BEOHOrderDate")
	public Date getBEOHOrderDate() {
		return BEOHOrderDate;
	}

	public void setBEOHOrderDate(Date BEOHOrderDate) {
		this.BEOHOrderDate = BEOHOrderDate;
	}

    @JsonProperty("BEOHCompletionStatus")
	public String getBEOHCompletionStatus() {
		return BEOHCompletionStatus;
	}

	public void setBEOHCompletionStatus(String BEOHCompletionStatus) {
		this.BEOHCompletionStatus = BEOHCompletionStatus;
	}


    @JsonProperty("deliveryMethod")
	public DeliveryMethodBean getDeliveryMethod() {
		return deliveryMethod;
	}

    public void setDeliveryMethod(DeliveryMethodBean deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

    @JsonProperty("paymentMethod")
	public PaymentMethodBean getPaymentMethod() {
		return paymentMethod;
	}

    public void setPaymentMethod(PaymentMethodBean paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

    @JsonProperty("paymentCondition")
	public PaymentConditionBean getPaymentCondition() {
		return paymentCondition;
	}

    public void setPaymentCondition(PaymentConditionBean paymentCondition) {
		this.paymentCondition = paymentCondition;
	}

    @JsonProperty("beCustomer")
	public BusinessEntityBean getBeCustomer() {
		return beCustomer;
	}

    public void setBeCustomer(BusinessEntityBean beCustomer) {
		this.beCustomer = beCustomer;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("beSeller")
	public BusinessEntityBean getBeSeller() {
		return beSeller;
	}

    public void setBeSeller(BusinessEntityBean beSeller) {
		this.beSeller = beSeller;
	}

    @JsonProperty("beOrderItems")
	public Set<BEOrderItemBean> getBeOrderItems() {
		return beOrderItems;
	}

	public void setBeOrderItems(Set<BEOrderItemBean> beOrderItems) {
		this.beOrderItems = beOrderItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BEOrderHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BEOrderHeadingBean) o).getId()));
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
		return "BEOrderHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BEOHDocumentNumber=" + BEOHDocumentNumber
			+ ", BEOHCreationDate=" + BEOHCreationDate
			+ ", BEOHOrderDate=" + BEOHOrderDate
			+ ", BEOHCompletionStatus=" + BEOHCompletionStatus
			// + ", deliveryMethod=" + deliveryMethod
			// + ", paymentMethod=" + paymentMethod
			// + ", paymentCondition=" + paymentCondition
			// + ", beCustomer=" + beCustomer
			// + ", currency=" + currency
			// + ", documentType=" + documentType
			// + ", beSeller=" + beSeller
			// + ", beOrderItems=" + beOrderItems
			+ "]";
	}
}