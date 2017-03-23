package com.doobgroup.server.entities.commonbusinessentities;

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

import com.doobgroup.server.entities.stockmanagement.ProductionRequestBean;
import com.doobgroup.server.entities.commonbusinessentities.CharacteristicsRegistryBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.logical.OrderSupplierItemBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;
import com.doobgroup.server.entities.procurement.InvoiceItemsWithoutDispBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionItemBean;

@Entity
@Table(name = "MEASUREMENTUNIT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "MUIdentificationCode"  	}))
@SQLDelete(sql="UPDATE MEASUREMENTUNIT SET deleted = 1 WHERE MeasurementUnit_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class MeasurementUnitBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MeasurementUnit_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "MUIdentificationCode", nullable = false)
	protected int MUIdentificationCode;
	@Column(name = "MUName", nullable = false)
	protected String MUName;
	@Column(name = "MUShortName")
	protected String MUShortName;
	@Column(name = "MUUnit")
	protected String MUUnit;

    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionRequestBean> productionRequests = new HashSet<ProductionRequestBean>();
    @OneToMany(mappedBy = "unit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CharacteristicsRegistryBean> characteristics = new HashSet<CharacteristicsRegistryBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentItemBean> shippingDocumentItems = new HashSet<ShippingDocumentItemBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierItemBean> orderSupplierItems = new HashSet<OrderSupplierItemBean>();
    @OneToMany(mappedBy = "mesurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionItemBean> requestForProductionItem = new HashSet<RequestForProductionItemBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceItemsWithoutDispBean> invoiceItemsWithousDisps = new HashSet<InvoiceItemsWithoutDispBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();
    @OneToMany(mappedBy = "measurementUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionItemBean> requisitionItems = new HashSet<RequisitionItemBean>();

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

    @JsonProperty("MUIdentificationCode")
	public int getMUIdentificationCode() {
		return MUIdentificationCode;
	}

	public void setMUIdentificationCode(int MUIdentificationCode) {
		this.MUIdentificationCode = MUIdentificationCode;
	}

    @JsonProperty("MUName")
	public String getMUName() {
		return MUName;
	}

	public void setMUName(String MUName) {
		this.MUName = MUName;
	}

    @JsonProperty("MUShortName")
	public String getMUShortName() {
		return MUShortName;
	}

	public void setMUShortName(String MUShortName) {
		this.MUShortName = MUShortName;
	}

    @JsonProperty("MUUnit")
	public String getMUUnit() {
		return MUUnit;
	}

	public void setMUUnit(String MUUnit) {
		this.MUUnit = MUUnit;
	}


    @JsonProperty("productionRequests")
	public Set<ProductionRequestBean> getProductionRequests() {
		return productionRequests;
	}

	public void setProductionRequests(Set<ProductionRequestBean> productionRequests) {
		this.productionRequests = productionRequests;
	}

    @JsonProperty("characteristics")
	public Set<CharacteristicsRegistryBean> getCharacteristics() {
		return characteristics;
	}

	public void setCharacteristics(Set<CharacteristicsRegistryBean> characteristics) {
		this.characteristics = characteristics;
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

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
	}

    @JsonProperty("orderSupplierItems")
	public Set<OrderSupplierItemBean> getOrderSupplierItems() {
		return orderSupplierItems;
	}

	public void setOrderSupplierItems(Set<OrderSupplierItemBean> orderSupplierItems) {
		this.orderSupplierItems = orderSupplierItems;
	}

    @JsonProperty("requestForProductionItem")
	public Set<RequestForProductionItemBean> getRequestForProductionItem() {
		return requestForProductionItem;
	}

	public void setRequestForProductionItem(Set<RequestForProductionItemBean> requestForProductionItem) {
		this.requestForProductionItem = requestForProductionItem;
	}

    @JsonProperty("invoiceItemsWithousDisps")
	public Set<InvoiceItemsWithoutDispBean> getInvoiceItemsWithousDisps() {
		return invoiceItemsWithousDisps;
	}

	public void setInvoiceItemsWithousDisps(Set<InvoiceItemsWithoutDispBean> invoiceItemsWithousDisps) {
		this.invoiceItemsWithousDisps = invoiceItemsWithousDisps;
	}

    @JsonProperty("tangibleItemConditions")
	public Set<TangibleItemConditionBean> getTangibleItemConditions() {
		return tangibleItemConditions;
	}

	public void setTangibleItemConditions(Set<TangibleItemConditionBean> tangibleItemConditions) {
		this.tangibleItemConditions = tangibleItemConditions;
	}

    @JsonProperty("requisitionItems")
	public Set<RequisitionItemBean> getRequisitionItems() {
		return requisitionItems;
	}

	public void setRequisitionItems(Set<RequisitionItemBean> requisitionItems) {
		this.requisitionItems = requisitionItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof MeasurementUnitBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((MeasurementUnitBean) o).getId()));
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
		return "MeasurementUnitBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", MUIdentificationCode=" + MUIdentificationCode
			+ ", MUName=" + MUName
			+ ", MUShortName=" + MUShortName
			+ ", MUUnit=" + MUUnit
			// + ", productionRequests=" + productionRequests
			// + ", characteristics=" + characteristics
			// + ", beOrderItems=" + beOrderItems
			// + ", shippingDocumentItems=" + shippingDocumentItems
			// + ", orderItems=" + orderItems
			// + ", orderSupplierItems=" + orderSupplierItems
			// + ", requestForProductionItem=" + requestForProductionItem
			// + ", invoiceItemsWithousDisps=" + invoiceItemsWithousDisps
			// + ", tangibleItemConditions=" + tangibleItemConditions
			// + ", requisitionItems=" + requisitionItems
			+ "]";
	}
}