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

import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.initialization.TaxHeadingBean;
import com.doobgroup.server.entities.stockmanagement.PackingBean;

@Entity
@Table(name = "SHIPPINGDOCUMENTITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SDIOrdinalNumber"  ,  "shippingDocument"  	}))
@SQLDelete(sql="UPDATE SHIPPINGDOCUMENTITEM SET deleted = 1 WHERE ShippingDocumentItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ShippingDocumentItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ShippingDocumentItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SDIOrdinalNumber", nullable = false)
	protected int SDIOrdinalNumber;
	@Column(name = "SDIQuantityDisposed", nullable = false)
	protected int SDIQuantityDisposed;
	@Column(name = "SDIQuantityPacked", nullable = false)
	protected int SDIQuantityPacked;
	@Column(name = "SDIQuantityForRepacking")
	protected int SDIQuantityForRepacking;
	@Column(name = "SDIQuantityDispatched", nullable = false)
	protected int SDIQuantityDispatched;
	@Column(name = "SDIBookValueAmmount")
	protected int SDIBookValueAmmount;
	@Column(name = "SDISellingPrice")
	protected int SDISellingPrice;
	@Column(name = "SDIRebate")
	protected int SDIRebate;
	@Column(name = "SDIPostingPosition")
	protected int SDIPostingPosition;
	@Column(name = "SDIStorno")
	protected String SDIStorno;
	@Column(name = "SDIPostingDate")
	protected Date SDIPostingDate;
	@Column(name = "SDILocationAddress")
	protected String SDILocationAddress;
	@Column(name = "SDIQuantityAfterPosting")
	protected int SDIQuantityAfterPosting;
	@Column(name = "SDIAccount")
	protected String SDIAccount;
	@Column(name = "SDIQuantityForShipping")
	protected int SDIQuantityForShipping;
	@Column(name = "SDIConsignmentPostingPosition")
	protected int SDIConsignmentPostingPosition;
	@Column(name = "SDIConsignmentValue")
	protected int SDIConsignmentValue;
	@Column(name = "SDIConsignemntAddress")
	protected String SDIConsignemntAddress;
	@Column(name = "SDIStockroom")
	protected int SDIStockroom;
	@Column(name = "SDIIdentification")
	protected int SDIIdentification;
	@Column(name = "SDITangibleItemStatus")
	protected String SDITangibleItemStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="shippingDocument")
    protected ShippingDocumentBean shippingDocument;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="measurementUnit")
    protected MeasurementUnitBean measurementUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderItem")
    protected OrderItemBean orderItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taxHeading")
    protected TaxHeadingBean taxHeading;
    @OneToMany(mappedBy = "shippingDocumentItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<PackingBean> packings = new HashSet<PackingBean>();

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

    @JsonProperty("SDIOrdinalNumber")
	public int getSDIOrdinalNumber() {
		return SDIOrdinalNumber;
	}

	public void setSDIOrdinalNumber(int SDIOrdinalNumber) {
		this.SDIOrdinalNumber = SDIOrdinalNumber;
	}

    @JsonProperty("SDIQuantityDisposed")
	public int getSDIQuantityDisposed() {
		return SDIQuantityDisposed;
	}

	public void setSDIQuantityDisposed(int SDIQuantityDisposed) {
		this.SDIQuantityDisposed = SDIQuantityDisposed;
	}

    @JsonProperty("SDIQuantityPacked")
	public int getSDIQuantityPacked() {
		return SDIQuantityPacked;
	}

	public void setSDIQuantityPacked(int SDIQuantityPacked) {
		this.SDIQuantityPacked = SDIQuantityPacked;
	}

    @JsonProperty("SDIQuantityForRepacking")
	public int getSDIQuantityForRepacking() {
		return SDIQuantityForRepacking;
	}

	public void setSDIQuantityForRepacking(int SDIQuantityForRepacking) {
		this.SDIQuantityForRepacking = SDIQuantityForRepacking;
	}

    @JsonProperty("SDIQuantityDispatched")
	public int getSDIQuantityDispatched() {
		return SDIQuantityDispatched;
	}

	public void setSDIQuantityDispatched(int SDIQuantityDispatched) {
		this.SDIQuantityDispatched = SDIQuantityDispatched;
	}

    @JsonProperty("SDIBookValueAmmount")
	public int getSDIBookValueAmmount() {
		return SDIBookValueAmmount;
	}

	public void setSDIBookValueAmmount(int SDIBookValueAmmount) {
		this.SDIBookValueAmmount = SDIBookValueAmmount;
	}

    @JsonProperty("SDISellingPrice")
	public int getSDISellingPrice() {
		return SDISellingPrice;
	}

	public void setSDISellingPrice(int SDISellingPrice) {
		this.SDISellingPrice = SDISellingPrice;
	}

    @JsonProperty("SDIRebate")
	public int getSDIRebate() {
		return SDIRebate;
	}

	public void setSDIRebate(int SDIRebate) {
		this.SDIRebate = SDIRebate;
	}

    @JsonProperty("SDIPostingPosition")
	public int getSDIPostingPosition() {
		return SDIPostingPosition;
	}

	public void setSDIPostingPosition(int SDIPostingPosition) {
		this.SDIPostingPosition = SDIPostingPosition;
	}

    @JsonProperty("SDIStorno")
	public String getSDIStorno() {
		return SDIStorno;
	}

	public void setSDIStorno(String SDIStorno) {
		this.SDIStorno = SDIStorno;
	}

    @JsonProperty("SDIPostingDate")
	public Date getSDIPostingDate() {
		return SDIPostingDate;
	}

	public void setSDIPostingDate(Date SDIPostingDate) {
		this.SDIPostingDate = SDIPostingDate;
	}

    @JsonProperty("SDILocationAddress")
	public String getSDILocationAddress() {
		return SDILocationAddress;
	}

	public void setSDILocationAddress(String SDILocationAddress) {
		this.SDILocationAddress = SDILocationAddress;
	}

    @JsonProperty("SDIQuantityAfterPosting")
	public int getSDIQuantityAfterPosting() {
		return SDIQuantityAfterPosting;
	}

	public void setSDIQuantityAfterPosting(int SDIQuantityAfterPosting) {
		this.SDIQuantityAfterPosting = SDIQuantityAfterPosting;
	}

    @JsonProperty("SDIAccount")
	public String getSDIAccount() {
		return SDIAccount;
	}

	public void setSDIAccount(String SDIAccount) {
		this.SDIAccount = SDIAccount;
	}

    @JsonProperty("SDIQuantityForShipping")
	public int getSDIQuantityForShipping() {
		return SDIQuantityForShipping;
	}

	public void setSDIQuantityForShipping(int SDIQuantityForShipping) {
		this.SDIQuantityForShipping = SDIQuantityForShipping;
	}

    @JsonProperty("SDIConsignmentPostingPosition")
	public int getSDIConsignmentPostingPosition() {
		return SDIConsignmentPostingPosition;
	}

	public void setSDIConsignmentPostingPosition(int SDIConsignmentPostingPosition) {
		this.SDIConsignmentPostingPosition = SDIConsignmentPostingPosition;
	}

    @JsonProperty("SDIConsignmentValue")
	public int getSDIConsignmentValue() {
		return SDIConsignmentValue;
	}

	public void setSDIConsignmentValue(int SDIConsignmentValue) {
		this.SDIConsignmentValue = SDIConsignmentValue;
	}

    @JsonProperty("SDIConsignemntAddress")
	public String getSDIConsignemntAddress() {
		return SDIConsignemntAddress;
	}

	public void setSDIConsignemntAddress(String SDIConsignemntAddress) {
		this.SDIConsignemntAddress = SDIConsignemntAddress;
	}

    @JsonProperty("SDIStockroom")
	public int getSDIStockroom() {
		return SDIStockroom;
	}

	public void setSDIStockroom(int SDIStockroom) {
		this.SDIStockroom = SDIStockroom;
	}

    @JsonProperty("SDIIdentification")
	public int getSDIIdentification() {
		return SDIIdentification;
	}

	public void setSDIIdentification(int SDIIdentification) {
		this.SDIIdentification = SDIIdentification;
	}

    @JsonProperty("SDITangibleItemStatus")
	public String getSDITangibleItemStatus() {
		return SDITangibleItemStatus;
	}

	public void setSDITangibleItemStatus(String SDITangibleItemStatus) {
		this.SDITangibleItemStatus = SDITangibleItemStatus;
	}


    @JsonProperty("shippingDocument")
	public ShippingDocumentBean getShippingDocument() {
		return shippingDocument;
	}

    public void setShippingDocument(ShippingDocumentBean shippingDocument) {
		this.shippingDocument = shippingDocument;
	}

    @JsonProperty("tangibleItemCondition")
	public TangibleItemConditionBean getTangibleItemCondition() {
		return tangibleItemCondition;
	}

    public void setTangibleItemCondition(TangibleItemConditionBean tangibleItemCondition) {
		this.tangibleItemCondition = tangibleItemCondition;
	}

    @JsonProperty("measurementUnit")
	public MeasurementUnitBean getMeasurementUnit() {
		return measurementUnit;
	}

    public void setMeasurementUnit(MeasurementUnitBean measurementUnit) {
		this.measurementUnit = measurementUnit;
	}

    @JsonProperty("orderItem")
	public OrderItemBean getOrderItem() {
		return orderItem;
	}

    public void setOrderItem(OrderItemBean orderItem) {
		this.orderItem = orderItem;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("taxHeading")
	public TaxHeadingBean getTaxHeading() {
		return taxHeading;
	}

    public void setTaxHeading(TaxHeadingBean taxHeading) {
		this.taxHeading = taxHeading;
	}

    @JsonProperty("packings")
	public Set<PackingBean> getPackings() {
		return packings;
	}

	public void setPackings(Set<PackingBean> packings) {
		this.packings = packings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ShippingDocumentItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ShippingDocumentItemBean) o).getId()));
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
		return "ShippingDocumentItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SDIOrdinalNumber=" + SDIOrdinalNumber
			+ ", SDIQuantityDisposed=" + SDIQuantityDisposed
			+ ", SDIQuantityPacked=" + SDIQuantityPacked
			+ ", SDIQuantityForRepacking=" + SDIQuantityForRepacking
			+ ", SDIQuantityDispatched=" + SDIQuantityDispatched
			+ ", SDIBookValueAmmount=" + SDIBookValueAmmount
			+ ", SDISellingPrice=" + SDISellingPrice
			+ ", SDIRebate=" + SDIRebate
			+ ", SDIPostingPosition=" + SDIPostingPosition
			+ ", SDIStorno=" + SDIStorno
			+ ", SDIPostingDate=" + SDIPostingDate
			+ ", SDILocationAddress=" + SDILocationAddress
			+ ", SDIQuantityAfterPosting=" + SDIQuantityAfterPosting
			+ ", SDIAccount=" + SDIAccount
			+ ", SDIQuantityForShipping=" + SDIQuantityForShipping
			+ ", SDIConsignmentPostingPosition=" + SDIConsignmentPostingPosition
			+ ", SDIConsignmentValue=" + SDIConsignmentValue
			+ ", SDIConsignemntAddress=" + SDIConsignemntAddress
			+ ", SDIStockroom=" + SDIStockroom
			+ ", SDIIdentification=" + SDIIdentification
			+ ", SDITangibleItemStatus=" + SDITangibleItemStatus
			// + ", shippingDocument=" + shippingDocument
			// + ", tangibleItemCondition=" + tangibleItemCondition
			// + ", measurementUnit=" + measurementUnit
			// + ", orderItem=" + orderItem
			// + ", currency=" + currency
			// + ", taxHeading=" + taxHeading
			// + ", packings=" + packings
			+ "]";
	}
}