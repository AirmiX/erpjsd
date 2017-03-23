package com.doobgroup.server.entities.order;

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

import com.doobgroup.server.entities.initialization.PackingMethodBean;
import com.doobgroup.server.entities.order.OrderGroupBean;
import com.doobgroup.server.entities.initialization.TaxHeadingBean;
import com.doobgroup.server.entities.order.ProductInstanceBean;
import com.doobgroup.server.entities.initialization.DiscountTypeBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;
import com.doobgroup.server.entities.initialization.UrgentStatusBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.initialization.CommercialityStatusBean;
import com.doobgroup.server.entities.procurement.InvoiceItemBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;

@Entity
@Table(name = "ORDERITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OIOrdinalNumber"  	}))
@SQLDelete(sql="UPDATE ORDERITEM SET deleted = 1 WHERE OrderItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OrderItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OrderItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OIOrdinalNumber", nullable = false)
	protected int OIOrdinalNumber;
	@Column(name = "OIOrderedQuantity", nullable = false)
	protected int OIOrderedQuantity;
	@Column(name = "OIReservedQuantity", nullable = false)
	protected int OIReservedQuantity;
	@Column(name = "OIProductionQuantity", nullable = false)
	protected int OIProductionQuantity;
	@Column(name = "OINextPeriodQuantity", nullable = false)
	protected int OINextPeriodQuantity;
	@Column(name = "OIValue", nullable = false)
	protected double OIValue;
	@Column(name = "OILeftQuantity", nullable = false)
	protected int OILeftQuantity;
	@Column(name = "OIDeliveryPeriod", nullable = false)
	protected Date OIDeliveryPeriod;
	@Column(name = "OITechnologyStatus", nullable = false)
	protected String OITechnologyStatus;
	@Column(name = "OIPreviousRealizedQuantity")
	protected int OIPreviousRealizedQuantity;
	@Column(name = "OIRealizedQuantity")
	protected int OIRealizedQuantity;
	@Column(name = "OIDeletedStatus")
	protected String OIDeletedStatus;
	@Column(name = "OICompletionStatus")
	protected String OICompletionStatus;
	@Column(name = "OIRequiredProducedStatus")
	protected String OIRequiredProducedStatus;
	@Column(name = "OIDiscount")
	protected double OIDiscount;
	@Column(name = "OISettlementProcedure")
	protected String OISettlementProcedure;
	@Column(name = "OIShippedQuantity")
	protected int OIShippedQuantity;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="packingMethods")
    protected PackingMethodBean packingMethods;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderGroup")
    protected OrderGroupBean orderGroup;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taxHeading")
    protected TaxHeadingBean taxHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productInstance")
    protected ProductInstanceBean productInstance;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="discountType")
    protected DiscountTypeBean discountType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="measurementUnit")
    protected MeasurementUnitBean measurementUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="urgentStatus")
    protected UrgentStatusBean urgentStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="commercialityStatus")
    protected CommercialityStatusBean commercialityStatus;
    @OneToMany(mappedBy = "orderItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceItemBean> invoiceItems = new HashSet<InvoiceItemBean>();
    @OneToMany(mappedBy = "orderItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();
    @OneToMany(mappedBy = "orderItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentItemBean> shippingDocumentItems = new HashSet<ShippingDocumentItemBean>();
    @OneToMany(mappedBy = "orderItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionItemBean> requestForProductionItem = new HashSet<RequestForProductionItemBean>();

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

    @JsonProperty("OIOrdinalNumber")
	public int getOIOrdinalNumber() {
		return OIOrdinalNumber;
	}

	public void setOIOrdinalNumber(int OIOrdinalNumber) {
		this.OIOrdinalNumber = OIOrdinalNumber;
	}

    @JsonProperty("OIOrderedQuantity")
	public int getOIOrderedQuantity() {
		return OIOrderedQuantity;
	}

	public void setOIOrderedQuantity(int OIOrderedQuantity) {
		this.OIOrderedQuantity = OIOrderedQuantity;
	}

    @JsonProperty("OIReservedQuantity")
	public int getOIReservedQuantity() {
		return OIReservedQuantity;
	}

	public void setOIReservedQuantity(int OIReservedQuantity) {
		this.OIReservedQuantity = OIReservedQuantity;
	}

    @JsonProperty("OIProductionQuantity")
	public int getOIProductionQuantity() {
		return OIProductionQuantity;
	}

	public void setOIProductionQuantity(int OIProductionQuantity) {
		this.OIProductionQuantity = OIProductionQuantity;
	}

    @JsonProperty("OINextPeriodQuantity")
	public int getOINextPeriodQuantity() {
		return OINextPeriodQuantity;
	}

	public void setOINextPeriodQuantity(int OINextPeriodQuantity) {
		this.OINextPeriodQuantity = OINextPeriodQuantity;
	}

    @JsonProperty("OIValue")
	public double getOIValue() {
		return OIValue;
	}

	public void setOIValue(double OIValue) {
		this.OIValue = OIValue;
	}

    @JsonProperty("OILeftQuantity")
	public int getOILeftQuantity() {
		return OILeftQuantity;
	}

	public void setOILeftQuantity(int OILeftQuantity) {
		this.OILeftQuantity = OILeftQuantity;
	}

    @JsonProperty("OIDeliveryPeriod")
	public Date getOIDeliveryPeriod() {
		return OIDeliveryPeriod;
	}

	public void setOIDeliveryPeriod(Date OIDeliveryPeriod) {
		this.OIDeliveryPeriod = OIDeliveryPeriod;
	}

    @JsonProperty("OITechnologyStatus")
	public String getOITechnologyStatus() {
		return OITechnologyStatus;
	}

	public void setOITechnologyStatus(String OITechnologyStatus) {
		this.OITechnologyStatus = OITechnologyStatus;
	}

    @JsonProperty("OIPreviousRealizedQuantity")
	public int getOIPreviousRealizedQuantity() {
		return OIPreviousRealizedQuantity;
	}

	public void setOIPreviousRealizedQuantity(int OIPreviousRealizedQuantity) {
		this.OIPreviousRealizedQuantity = OIPreviousRealizedQuantity;
	}

    @JsonProperty("OIRealizedQuantity")
	public int getOIRealizedQuantity() {
		return OIRealizedQuantity;
	}

	public void setOIRealizedQuantity(int OIRealizedQuantity) {
		this.OIRealizedQuantity = OIRealizedQuantity;
	}

    @JsonProperty("OIDeletedStatus")
	public String getOIDeletedStatus() {
		return OIDeletedStatus;
	}

	public void setOIDeletedStatus(String OIDeletedStatus) {
		this.OIDeletedStatus = OIDeletedStatus;
	}

    @JsonProperty("OICompletionStatus")
	public String getOICompletionStatus() {
		return OICompletionStatus;
	}

	public void setOICompletionStatus(String OICompletionStatus) {
		this.OICompletionStatus = OICompletionStatus;
	}

    @JsonProperty("OIRequiredProducedStatus")
	public String getOIRequiredProducedStatus() {
		return OIRequiredProducedStatus;
	}

	public void setOIRequiredProducedStatus(String OIRequiredProducedStatus) {
		this.OIRequiredProducedStatus = OIRequiredProducedStatus;
	}

    @JsonProperty("OIDiscount")
	public double getOIDiscount() {
		return OIDiscount;
	}

	public void setOIDiscount(double OIDiscount) {
		this.OIDiscount = OIDiscount;
	}

    @JsonProperty("OISettlementProcedure")
	public String getOISettlementProcedure() {
		return OISettlementProcedure;
	}

	public void setOISettlementProcedure(String OISettlementProcedure) {
		this.OISettlementProcedure = OISettlementProcedure;
	}

    @JsonProperty("OIShippedQuantity")
	public int getOIShippedQuantity() {
		return OIShippedQuantity;
	}

	public void setOIShippedQuantity(int OIShippedQuantity) {
		this.OIShippedQuantity = OIShippedQuantity;
	}


    @JsonProperty("packingMethods")
	public PackingMethodBean getPackingMethods() {
		return packingMethods;
	}

    public void setPackingMethods(PackingMethodBean packingMethods) {
		this.packingMethods = packingMethods;
	}

    @JsonProperty("orderGroup")
	public OrderGroupBean getOrderGroup() {
		return orderGroup;
	}

    public void setOrderGroup(OrderGroupBean orderGroup) {
		this.orderGroup = orderGroup;
	}

    @JsonProperty("taxHeading")
	public TaxHeadingBean getTaxHeading() {
		return taxHeading;
	}

    public void setTaxHeading(TaxHeadingBean taxHeading) {
		this.taxHeading = taxHeading;
	}

    @JsonProperty("productInstance")
	public ProductInstanceBean getProductInstance() {
		return productInstance;
	}

    public void setProductInstance(ProductInstanceBean productInstance) {
		this.productInstance = productInstance;
	}

    @JsonProperty("discountType")
	public DiscountTypeBean getDiscountType() {
		return discountType;
	}

    public void setDiscountType(DiscountTypeBean discountType) {
		this.discountType = discountType;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("measurementUnit")
	public MeasurementUnitBean getMeasurementUnit() {
		return measurementUnit;
	}

    public void setMeasurementUnit(MeasurementUnitBean measurementUnit) {
		this.measurementUnit = measurementUnit;
	}

    @JsonProperty("urgentStatus")
	public UrgentStatusBean getUrgentStatus() {
		return urgentStatus;
	}

    public void setUrgentStatus(UrgentStatusBean urgentStatus) {
		this.urgentStatus = urgentStatus;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("commercialityStatus")
	public CommercialityStatusBean getCommercialityStatus() {
		return commercialityStatus;
	}

    public void setCommercialityStatus(CommercialityStatusBean commercialityStatus) {
		this.commercialityStatus = commercialityStatus;
	}

    @JsonProperty("invoiceItems")
	public Set<InvoiceItemBean> getInvoiceItems() {
		return invoiceItems;
	}

	public void setInvoiceItems(Set<InvoiceItemBean> invoiceItems) {
		this.invoiceItems = invoiceItems;
	}

    @JsonProperty("beOrderItems")
	public Set<BEOrderItemBean> getBeOrderItems() {
		return beOrderItems;
	}

	public void setBeOrderItems(Set<BEOrderItemBean> beOrderItems) {
		this.beOrderItems = beOrderItems;
	}

    @JsonProperty("shippingDocumentItems")
	public Set<ShippingDocumentItemBean> getShippingDocumentItems() {
		return shippingDocumentItems;
	}

	public void setShippingDocumentItems(Set<ShippingDocumentItemBean> shippingDocumentItems) {
		this.shippingDocumentItems = shippingDocumentItems;
	}

    @JsonProperty("requestForProductionItem")
	public Set<RequestForProductionItemBean> getRequestForProductionItem() {
		return requestForProductionItem;
	}

	public void setRequestForProductionItem(Set<RequestForProductionItemBean> requestForProductionItem) {
		this.requestForProductionItem = requestForProductionItem;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OrderItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OrderItemBean) o).getId()));
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
		return "OrderItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OIOrdinalNumber=" + OIOrdinalNumber
			+ ", OIOrderedQuantity=" + OIOrderedQuantity
			+ ", OIReservedQuantity=" + OIReservedQuantity
			+ ", OIProductionQuantity=" + OIProductionQuantity
			+ ", OINextPeriodQuantity=" + OINextPeriodQuantity
			+ ", OIValue=" + OIValue
			+ ", OILeftQuantity=" + OILeftQuantity
			+ ", OIDeliveryPeriod=" + OIDeliveryPeriod
			+ ", OITechnologyStatus=" + OITechnologyStatus
			+ ", OIPreviousRealizedQuantity=" + OIPreviousRealizedQuantity
			+ ", OIRealizedQuantity=" + OIRealizedQuantity
			+ ", OIDeletedStatus=" + OIDeletedStatus
			+ ", OICompletionStatus=" + OICompletionStatus
			+ ", OIRequiredProducedStatus=" + OIRequiredProducedStatus
			+ ", OIDiscount=" + OIDiscount
			+ ", OISettlementProcedure=" + OISettlementProcedure
			+ ", OIShippedQuantity=" + OIShippedQuantity
			// + ", packingMethods=" + packingMethods
			// + ", orderGroup=" + orderGroup
			// + ", taxHeading=" + taxHeading
			// + ", productInstance=" + productInstance
			// + ", discountType=" + discountType
			// + ", organizationUnit=" + organizationUnit
			// + ", measurementUnit=" + measurementUnit
			// + ", urgentStatus=" + urgentStatus
			// + ", identification=" + identification
			// + ", currency=" + currency
			// + ", stockroom=" + stockroom
			// + ", commercialityStatus=" + commercialityStatus
			// + ", invoiceItems=" + invoiceItems
			// + ", beOrderItems=" + beOrderItems
			// + ", shippingDocumentItems=" + shippingDocumentItems
			// + ", requestForProductionItem=" + requestForProductionItem
			+ "]";
	}
}