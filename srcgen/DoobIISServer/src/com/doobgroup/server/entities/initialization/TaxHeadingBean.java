package com.doobgroup.server.entities.initialization;

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

import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;
import com.doobgroup.server.entities.initialization.TaxBean;
import com.doobgroup.server.entities.procurement.InvoiceItemsWithoutDispBean;

@Entity
@Table(name = "TAXHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "THDesignation"  	}))
@SQLDelete(sql="UPDATE TAXHEADING SET deleted = 1 WHERE TaxHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TaxHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TaxHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "THDesignation", nullable = false)
	protected int THDesignation;
	@Column(name = "THDescription", nullable = false)
	protected String THDescription;
	@Column(name = "THStartDate", nullable = false)
	protected Date THStartDate;
	@Column(name = "THEndDate")
	protected Date THEndDate;
	@Column(name = "THTotalPercent", nullable = false)
	protected int THTotalPercent;
	@Column(name = "THRecalculatedTaxRate")
	protected int THRecalculatedTaxRate;

    @OneToMany(mappedBy = "taxHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();
    @OneToMany(mappedBy = "taxHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "taxHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentItemBean> shippingDocumentItems = new HashSet<ShippingDocumentItemBean>();
    @OneToMany(mappedBy = "taxHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TaxBean> taxes = new HashSet<TaxBean>();
    @OneToMany(mappedBy = "taxHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceItemsWithoutDispBean> invoiceItemWithoutDisp = new HashSet<InvoiceItemsWithoutDispBean>();

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

    @JsonProperty("THDesignation")
	public int getTHDesignation() {
		return THDesignation;
	}

	public void setTHDesignation(int THDesignation) {
		this.THDesignation = THDesignation;
	}

    @JsonProperty("THDescription")
	public String getTHDescription() {
		return THDescription;
	}

	public void setTHDescription(String THDescription) {
		this.THDescription = THDescription;
	}

    @JsonProperty("THStartDate")
	public Date getTHStartDate() {
		return THStartDate;
	}

	public void setTHStartDate(Date THStartDate) {
		this.THStartDate = THStartDate;
	}

    @JsonProperty("THEndDate")
	public Date getTHEndDate() {
		return THEndDate;
	}

	public void setTHEndDate(Date THEndDate) {
		this.THEndDate = THEndDate;
	}

    @JsonProperty("THTotalPercent")
	public int getTHTotalPercent() {
		return THTotalPercent;
	}

	public void setTHTotalPercent(int THTotalPercent) {
		this.THTotalPercent = THTotalPercent;
	}

    @JsonProperty("THRecalculatedTaxRate")
	public int getTHRecalculatedTaxRate() {
		return THRecalculatedTaxRate;
	}

	public void setTHRecalculatedTaxRate(int THRecalculatedTaxRate) {
		this.THRecalculatedTaxRate = THRecalculatedTaxRate;
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

    @JsonProperty("shippingDocumentItems")
	public Set<ShippingDocumentItemBean> getShippingDocumentItems() {
		return shippingDocumentItems;
	}

	public void setShippingDocumentItems(Set<ShippingDocumentItemBean> shippingDocumentItems) {
		this.shippingDocumentItems = shippingDocumentItems;
	}

    @JsonProperty("taxes")
	public Set<TaxBean> getTaxes() {
		return taxes;
	}

	public void setTaxes(Set<TaxBean> taxes) {
		this.taxes = taxes;
	}

    @JsonProperty("invoiceItemWithoutDisp")
	public Set<InvoiceItemsWithoutDispBean> getInvoiceItemWithoutDisp() {
		return invoiceItemWithoutDisp;
	}

	public void setInvoiceItemWithoutDisp(Set<InvoiceItemsWithoutDispBean> invoiceItemWithoutDisp) {
		this.invoiceItemWithoutDisp = invoiceItemWithoutDisp;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TaxHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TaxHeadingBean) o).getId()));
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
		return "TaxHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", THDesignation=" + THDesignation
			+ ", THDescription=" + THDescription
			+ ", THStartDate=" + THStartDate
			+ ", THEndDate=" + THEndDate
			+ ", THTotalPercent=" + THTotalPercent
			+ ", THRecalculatedTaxRate=" + THRecalculatedTaxRate
			// + ", beOrderItems=" + beOrderItems
			// + ", orderItems=" + orderItems
			// + ", shippingDocumentItems=" + shippingDocumentItems
			// + ", taxes=" + taxes
			// + ", invoiceItemWithoutDisp=" + invoiceItemWithoutDisp
			+ "]";
	}
}