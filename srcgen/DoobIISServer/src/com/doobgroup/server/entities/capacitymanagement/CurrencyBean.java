package com.doobgroup.server.entities.capacitymanagement;

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

import com.doobgroup.server.entities.productiondata.WorkCenterBean;
import com.doobgroup.server.entities.internalinvoice.BEInvoiceBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;
import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;
import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;
import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.stockmanagement.PriceBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;

@Entity
@Table(name = "CURRENCY"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CCurrencyDesignation"  	}))
@SQLDelete(sql="UPDATE CURRENCY SET deleted = 1 WHERE Currency_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class CurrencyBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Currency_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CCurrencyDesignation", nullable = false)
	protected String CCurrencyDesignation;
	@Column(name = "CDescription")
	protected String CDescription;

    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkCenterBean> workCenters = new HashSet<WorkCenterBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEInvoiceBean> beInvoices = new HashSet<BEInvoiceBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionItemBean> productionRequestItems = new HashSet<RequestForProductionItemBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proformaInvoices = new HashSet<ProFormaInvoiceBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestItemBean> customerRequestItems = new HashSet<CustomerRequestItemBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TechnologicalUnitBean> technologicalUnits = new HashSet<TechnologicalUnitBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadings = new HashSet<BEOrderHeadingBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentItemBean> shippingDocumentItems = new HashSet<ShippingDocumentItemBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionBean> productionRequests = new HashSet<RequestForProductionBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();
    @OneToMany(mappedBy = "currencies", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<PriceBean> prices = new HashSet<PriceBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestHeadingBean> customerRequestHeaders = new HashSet<CustomerRequestHeadingBean>();
    @OneToMany(mappedBy = "currency", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocuments = new HashSet<ShippingDocumentBean>();

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

    @JsonProperty("CCurrencyDesignation")
	public String getCCurrencyDesignation() {
		return CCurrencyDesignation;
	}

	public void setCCurrencyDesignation(String CCurrencyDesignation) {
		this.CCurrencyDesignation = CCurrencyDesignation;
	}

    @JsonProperty("CDescription")
	public String getCDescription() {
		return CDescription;
	}

	public void setCDescription(String CDescription) {
		this.CDescription = CDescription;
	}


    @JsonProperty("workCenters")
	public Set<WorkCenterBean> getWorkCenters() {
		return workCenters;
	}

	public void setWorkCenters(Set<WorkCenterBean> workCenters) {
		this.workCenters = workCenters;
	}

    @JsonProperty("beInvoices")
	public Set<BEInvoiceBean> getBeInvoices() {
		return beInvoices;
	}

	public void setBeInvoices(Set<BEInvoiceBean> beInvoices) {
		this.beInvoices = beInvoices;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("productionRequestItems")
	public Set<RequestForProductionItemBean> getProductionRequestItems() {
		return productionRequestItems;
	}

	public void setProductionRequestItems(Set<RequestForProductionItemBean> productionRequestItems) {
		this.productionRequestItems = productionRequestItems;
	}

    @JsonProperty("proformaInvoices")
	public Set<ProFormaInvoiceBean> getProformaInvoices() {
		return proformaInvoices;
	}

	public void setProformaInvoices(Set<ProFormaInvoiceBean> proformaInvoices) {
		this.proformaInvoices = proformaInvoices;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("customerRequestItems")
	public Set<CustomerRequestItemBean> getCustomerRequestItems() {
		return customerRequestItems;
	}

	public void setCustomerRequestItems(Set<CustomerRequestItemBean> customerRequestItems) {
		this.customerRequestItems = customerRequestItems;
	}

    @JsonProperty("technologicalUnits")
	public Set<TechnologicalUnitBean> getTechnologicalUnits() {
		return technologicalUnits;
	}

	public void setTechnologicalUnits(Set<TechnologicalUnitBean> technologicalUnits) {
		this.technologicalUnits = technologicalUnits;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}

    @JsonProperty("beOrderHeadings")
	public Set<BEOrderHeadingBean> getBeOrderHeadings() {
		return beOrderHeadings;
	}

	public void setBeOrderHeadings(Set<BEOrderHeadingBean> beOrderHeadings) {
		this.beOrderHeadings = beOrderHeadings;
	}

    @JsonProperty("shippingDocumentItems")
	public Set<ShippingDocumentItemBean> getShippingDocumentItems() {
		return shippingDocumentItems;
	}

	public void setShippingDocumentItems(Set<ShippingDocumentItemBean> shippingDocumentItems) {
		this.shippingDocumentItems = shippingDocumentItems;
	}

    @JsonProperty("productionRequests")
	public Set<RequestForProductionBean> getProductionRequests() {
		return productionRequests;
	}

	public void setProductionRequests(Set<RequestForProductionBean> productionRequests) {
		this.productionRequests = productionRequests;
	}

    @JsonProperty("beOrderItems")
	public Set<BEOrderItemBean> getBeOrderItems() {
		return beOrderItems;
	}

	public void setBeOrderItems(Set<BEOrderItemBean> beOrderItems) {
		this.beOrderItems = beOrderItems;
	}

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
	}

    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}

    @JsonProperty("prices")
	public Set<PriceBean> getPrices() {
		return prices;
	}

	public void setPrices(Set<PriceBean> prices) {
		this.prices = prices;
	}

    @JsonProperty("customerRequestHeaders")
	public Set<CustomerRequestHeadingBean> getCustomerRequestHeaders() {
		return customerRequestHeaders;
	}

	public void setCustomerRequestHeaders(Set<CustomerRequestHeadingBean> customerRequestHeaders) {
		this.customerRequestHeaders = customerRequestHeaders;
	}

    @JsonProperty("shippingDocuments")
	public Set<ShippingDocumentBean> getShippingDocuments() {
		return shippingDocuments;
	}

	public void setShippingDocuments(Set<ShippingDocumentBean> shippingDocuments) {
		this.shippingDocuments = shippingDocuments;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof CurrencyBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((CurrencyBean) o).getId()));
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
		return "CurrencyBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CCurrencyDesignation=" + CCurrencyDesignation
			+ ", CDescription=" + CDescription
			// + ", workCenters=" + workCenters
			// + ", beInvoices=" + beInvoices
			// + ", orderHeadings=" + orderHeadings
			// + ", productionRequestItems=" + productionRequestItems
			// + ", proformaInvoices=" + proformaInvoices
			// + ", invoices=" + invoices
			// + ", customerRequestItems=" + customerRequestItems
			// + ", technologicalUnits=" + technologicalUnits
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			// + ", beOrderHeadings=" + beOrderHeadings
			// + ", shippingDocumentItems=" + shippingDocumentItems
			// + ", productionRequests=" + productionRequests
			// + ", beOrderItems=" + beOrderItems
			// + ", orderItems=" + orderItems
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			// + ", prices=" + prices
			// + ", customerRequestHeaders=" + customerRequestHeaders
			// + ", shippingDocuments=" + shippingDocuments
			+ "]";
	}
}