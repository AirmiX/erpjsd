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

import com.doobgroup.server.entities.initialization.TaxHeadingBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;
import com.doobgroup.server.entities.order.ProductInstanceBean;
import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.initialization.PackingMethodBean;
import com.doobgroup.server.entities.initialization.UrgentStatusBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.internalinvoice.BEInvoiceItemBean;

@Entity
@Table(name = "BEORDERITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BEOIOrdinalNumber"  ,  "beOrderHeading"  	}))
@SQLDelete(sql="UPDATE BEORDERITEM SET deleted = 1 WHERE BEOrderItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BEOrderItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BEOrderItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BEOIOrdinalNumber", nullable = false)
	protected int BEOIOrdinalNumber;
	@Column(name = "BEOIPrice")
	protected int BEOIPrice;
	@Column(name = "BEOIOrderedQuantity", nullable = false)
	protected int BEOIOrderedQuantity;
	@Column(name = "BEOIProductionQuantity")
	protected int BEOIProductionQuantity;
	@Column(name = "BEOIDeliveryPeriod")
	protected Date BEOIDeliveryPeriod;
	@Column(name = "BEOIValue")
	protected int BEOIValue;
	@Column(name = "BEOICompletionStatus")
	protected String BEOICompletionStatus;
	@Column(name = "BEOIDiscount")
	protected int BEOIDiscount;
	@Column(name = "BEOILeftQuantity")
	protected int BEOILeftQuantity;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taxHeading")
    protected TaxHeadingBean taxHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderItem")
    protected OrderItemBean orderItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="measurementUnit")
    protected MeasurementUnitBean measurementUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productInstance")
    protected ProductInstanceBean productInstance;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="beOrderHeading")
    protected BEOrderHeadingBean beOrderHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productType")
    protected IdentificationBean productType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="packingMethod")
    protected PackingMethodBean packingMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="urgentStatus")
    protected UrgentStatusBean urgentStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @OneToMany(mappedBy = "beOrderItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEInvoiceItemBean> beInvoiceItems = new HashSet<BEInvoiceItemBean>();

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

    @JsonProperty("BEOIOrdinalNumber")
	public int getBEOIOrdinalNumber() {
		return BEOIOrdinalNumber;
	}

	public void setBEOIOrdinalNumber(int BEOIOrdinalNumber) {
		this.BEOIOrdinalNumber = BEOIOrdinalNumber;
	}

    @JsonProperty("BEOIPrice")
	public int getBEOIPrice() {
		return BEOIPrice;
	}

	public void setBEOIPrice(int BEOIPrice) {
		this.BEOIPrice = BEOIPrice;
	}

    @JsonProperty("BEOIOrderedQuantity")
	public int getBEOIOrderedQuantity() {
		return BEOIOrderedQuantity;
	}

	public void setBEOIOrderedQuantity(int BEOIOrderedQuantity) {
		this.BEOIOrderedQuantity = BEOIOrderedQuantity;
	}

    @JsonProperty("BEOIProductionQuantity")
	public int getBEOIProductionQuantity() {
		return BEOIProductionQuantity;
	}

	public void setBEOIProductionQuantity(int BEOIProductionQuantity) {
		this.BEOIProductionQuantity = BEOIProductionQuantity;
	}

    @JsonProperty("BEOIDeliveryPeriod")
	public Date getBEOIDeliveryPeriod() {
		return BEOIDeliveryPeriod;
	}

	public void setBEOIDeliveryPeriod(Date BEOIDeliveryPeriod) {
		this.BEOIDeliveryPeriod = BEOIDeliveryPeriod;
	}

    @JsonProperty("BEOIValue")
	public int getBEOIValue() {
		return BEOIValue;
	}

	public void setBEOIValue(int BEOIValue) {
		this.BEOIValue = BEOIValue;
	}

    @JsonProperty("BEOICompletionStatus")
	public String getBEOICompletionStatus() {
		return BEOICompletionStatus;
	}

	public void setBEOICompletionStatus(String BEOICompletionStatus) {
		this.BEOICompletionStatus = BEOICompletionStatus;
	}

    @JsonProperty("BEOIDiscount")
	public int getBEOIDiscount() {
		return BEOIDiscount;
	}

	public void setBEOIDiscount(int BEOIDiscount) {
		this.BEOIDiscount = BEOIDiscount;
	}

    @JsonProperty("BEOILeftQuantity")
	public int getBEOILeftQuantity() {
		return BEOILeftQuantity;
	}

	public void setBEOILeftQuantity(int BEOILeftQuantity) {
		this.BEOILeftQuantity = BEOILeftQuantity;
	}


    @JsonProperty("taxHeading")
	public TaxHeadingBean getTaxHeading() {
		return taxHeading;
	}

    public void setTaxHeading(TaxHeadingBean taxHeading) {
		this.taxHeading = taxHeading;
	}

    @JsonProperty("orderItem")
	public OrderItemBean getOrderItem() {
		return orderItem;
	}

    public void setOrderItem(OrderItemBean orderItem) {
		this.orderItem = orderItem;
	}

    @JsonProperty("measurementUnit")
	public MeasurementUnitBean getMeasurementUnit() {
		return measurementUnit;
	}

    public void setMeasurementUnit(MeasurementUnitBean measurementUnit) {
		this.measurementUnit = measurementUnit;
	}

    @JsonProperty("productInstance")
	public ProductInstanceBean getProductInstance() {
		return productInstance;
	}

    public void setProductInstance(ProductInstanceBean productInstance) {
		this.productInstance = productInstance;
	}

    @JsonProperty("beOrderHeading")
	public BEOrderHeadingBean getBeOrderHeading() {
		return beOrderHeading;
	}

    public void setBeOrderHeading(BEOrderHeadingBean beOrderHeading) {
		this.beOrderHeading = beOrderHeading;
	}

    @JsonProperty("productType")
	public IdentificationBean getProductType() {
		return productType;
	}

    public void setProductType(IdentificationBean productType) {
		this.productType = productType;
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

    @JsonProperty("packingMethod")
	public PackingMethodBean getPackingMethod() {
		return packingMethod;
	}

    public void setPackingMethod(PackingMethodBean packingMethod) {
		this.packingMethod = packingMethod;
	}

    @JsonProperty("urgentStatus")
	public UrgentStatusBean getUrgentStatus() {
		return urgentStatus;
	}

    public void setUrgentStatus(UrgentStatusBean urgentStatus) {
		this.urgentStatus = urgentStatus;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("beInvoiceItems")
	public Set<BEInvoiceItemBean> getBeInvoiceItems() {
		return beInvoiceItems;
	}

	public void setBeInvoiceItems(Set<BEInvoiceItemBean> beInvoiceItems) {
		this.beInvoiceItems = beInvoiceItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BEOrderItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BEOrderItemBean) o).getId()));
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
		return "BEOrderItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BEOIOrdinalNumber=" + BEOIOrdinalNumber
			+ ", BEOIPrice=" + BEOIPrice
			+ ", BEOIOrderedQuantity=" + BEOIOrderedQuantity
			+ ", BEOIProductionQuantity=" + BEOIProductionQuantity
			+ ", BEOIDeliveryPeriod=" + BEOIDeliveryPeriod
			+ ", BEOIValue=" + BEOIValue
			+ ", BEOICompletionStatus=" + BEOICompletionStatus
			+ ", BEOIDiscount=" + BEOIDiscount
			+ ", BEOILeftQuantity=" + BEOILeftQuantity
			// + ", taxHeading=" + taxHeading
			// + ", orderItem=" + orderItem
			// + ", measurementUnit=" + measurementUnit
			// + ", productInstance=" + productInstance
			// + ", beOrderHeading=" + beOrderHeading
			// + ", productType=" + productType
			// + ", organizationUnit=" + organizationUnit
			// + ", currency=" + currency
			// + ", packingMethod=" + packingMethod
			// + ", urgentStatus=" + urgentStatus
			// + ", stockroom=" + stockroom
			// + ", beInvoiceItems=" + beInvoiceItems
			+ "]";
	}
}