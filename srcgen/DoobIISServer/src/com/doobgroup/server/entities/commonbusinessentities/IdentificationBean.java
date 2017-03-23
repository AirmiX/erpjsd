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

import com.doobgroup.server.entities.commonbusinessentities.ClassificationBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteItemBean;
import com.doobgroup.server.entities.productiondata.StepToolBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteItemBean;
import com.doobgroup.server.entities.renaming.RenamingItemBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.commonbusinessentities.CharacteristicBean;
import com.doobgroup.server.entities.stockmanagement.RequestForProposalItemBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.logical.OrderSupplierItemBean;
import com.doobgroup.server.entities.sellingprice.SellingPriceBean;
import com.doobgroup.server.entities.logical.OfferSupplierItemBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;
import com.doobgroup.server.entities.stockmanagement.TransactionLogBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;
import com.doobgroup.server.entities.sellingprice.OUBelongingBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;
import com.doobgroup.server.entities.productiondata.StructuralComponentsBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountToolBean;
import com.doobgroup.server.entities.order.ProductInstanceBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationArchiveBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;
import com.doobgroup.server.entities.productiondata.ConsumableSuppliesBean;
import com.doobgroup.server.entities.capacitymanagement.BalanceResourceBean;
import com.doobgroup.server.entities.stockmanagement.PriceBean;
import com.doobgroup.server.entities.initialization.ProcurementPlanItemBean;

@Entity
@Table(name = "IDENTIFICATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "IIdentificationCode"  	}))
@SQLDelete(sql="UPDATE IDENTIFICATION SET deleted = 1 WHERE Identification_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class IdentificationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Identification_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "IIdentificationCode", nullable = false)
	protected int IIdentificationCode;
	@Column(name = "IName")
	protected String IName;
	@Column(name = "IShortName")
	protected String IShortName;
	@Column(name = "IParallelCode")
	protected String IParallelCode;
	@Column(name = "IDrawingIdentificationNumber")
	protected String IDrawingIdentificationNumber;
	@Column(name = "IIsPayable")
	protected Boolean IIsPayable;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="classification")
    protected ClassificationBean classification;
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteItemBean> materialReturnNoteItems = new HashSet<MaterialReturnNoteItemBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StepToolBean> stepTools = new HashSet<StepToolBean>();
    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestItemBean> procurementRequestItemSuppliers = new HashSet<ProcurementRequestItemBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteItemBean> deliveryNoteItems = new HashSet<DeliveryNoteItemBean>();
    @OneToMany(mappedBy = "identificationOutput", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingItemBean> renamingItemsOutput = new HashSet<RenamingItemBean>();
    @OneToMany(mappedBy = "identificationOutput", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingItemBean> renamingItemsInput = new HashSet<RenamingItemBean>();
    @OneToMany(mappedBy = "deliveryMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadingsDelivery = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CharacteristicBean> characteristics = new HashSet<CharacteristicBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProposalItemBean> rfpItems = new HashSet<RequestForProposalItemBean>();
    @OneToMany(mappedBy = "goodsIdentification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> goodsSDs = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierItemBean> orderSupplierItems = new HashSet<OrderSupplierItemBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<SellingPriceBean> sellingPrice = new HashSet<SellingPriceBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierItemBean> offerSupplierItems = new HashSet<OfferSupplierItemBean>();
    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings = new HashSet<GoodsReceivedNoteHeadingBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TransactionLogBean> transactionLogs = new HashSet<TransactionLogBean>();
    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OUBelongingBean> marketBelonging = new HashSet<OUBelongingBean>();
    @OneToMany(mappedBy = "goodsIdentification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> invoiceSDs = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "identification1", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestHeadingBean> customerRequestHeaders1 = new HashSet<CustomerRequestHeadingBean>();
    @OneToMany(mappedBy = "superIdent", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StructuralComponentsBean> superComponent = new HashSet<StructuralComponentsBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionItemBean> requestForProduction = new HashSet<RequestForProductionItemBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools = new HashSet<TangibleItemAmmountToolBean>();
    @OneToMany(mappedBy = "superIdent", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StructuralComponentsBean> subComponent = new HashSet<StructuralComponentsBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductInstanceBean> productInstances = new HashSet<ProductInstanceBean>();
    @OneToMany(mappedBy = "productType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();
    @OneToMany(mappedBy = "currentValue", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<IdentificationArchiveBean> previousValues = new HashSet<IdentificationArchiveBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOrderBean> workOrders = new HashSet<WorkOrderBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestItemBean> procurementRequestItems = new HashSet<ProcurementRequestItemBean>();
    @OneToMany(mappedBy = "identifications", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proformaInvoices = new HashSet<ProFormaInvoiceBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems = new HashSet<GoodsReceivedNoteItemBean>();
    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();
    @OneToMany(mappedBy = "identification1", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestHeadingBean> customerRequestHeaders = new HashSet<CustomerRequestHeadingBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestItemBean> customerRequestItems = new HashSet<CustomerRequestItemBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ConsumableSuppliesBean> consumableSupplies = new HashSet<ConsumableSuppliesBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BalanceResourceBean> balanceResources = new HashSet<BalanceResourceBean>();
    @OneToMany(mappedBy = "deliveryMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "goodsIdentification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> exporterSDs = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<PriceBean> prices = new HashSet<PriceBean>();
    @OneToMany(mappedBy = "identification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementPlanItemBean> procurementPlanItems = new HashSet<ProcurementPlanItemBean>();
    @OneToMany(mappedBy = "goodsIdentification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocumentsDelivery = new HashSet<ShippingDocumentBean>();

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

    @JsonProperty("IIdentificationCode")
	public int getIIdentificationCode() {
		return IIdentificationCode;
	}

	public void setIIdentificationCode(int IIdentificationCode) {
		this.IIdentificationCode = IIdentificationCode;
	}

    @JsonProperty("IName")
	public String getIName() {
		return IName;
	}

	public void setIName(String IName) {
		this.IName = IName;
	}

    @JsonProperty("IShortName")
	public String getIShortName() {
		return IShortName;
	}

	public void setIShortName(String IShortName) {
		this.IShortName = IShortName;
	}

    @JsonProperty("IParallelCode")
	public String getIParallelCode() {
		return IParallelCode;
	}

	public void setIParallelCode(String IParallelCode) {
		this.IParallelCode = IParallelCode;
	}

    @JsonProperty("IDrawingIdentificationNumber")
	public String getIDrawingIdentificationNumber() {
		return IDrawingIdentificationNumber;
	}

	public void setIDrawingIdentificationNumber(String IDrawingIdentificationNumber) {
		this.IDrawingIdentificationNumber = IDrawingIdentificationNumber;
	}

    @JsonProperty("IIsPayable")
	public Boolean getIIsPayable() {
		return IIsPayable;
	}

	public void setIIsPayable(Boolean IIsPayable) {
		this.IIsPayable = IIsPayable;
	}


    @JsonProperty("classification")
	public ClassificationBean getClassification() {
		return classification;
	}

    public void setClassification(ClassificationBean classification) {
		this.classification = classification;
	}

    @JsonProperty("materialReturnNoteItems")
	public Set<MaterialReturnNoteItemBean> getMaterialReturnNoteItems() {
		return materialReturnNoteItems;
	}

	public void setMaterialReturnNoteItems(Set<MaterialReturnNoteItemBean> materialReturnNoteItems) {
		this.materialReturnNoteItems = materialReturnNoteItems;
	}

    @JsonProperty("stepTools")
	public Set<StepToolBean> getStepTools() {
		return stepTools;
	}

	public void setStepTools(Set<StepToolBean> stepTools) {
		this.stepTools = stepTools;
	}

    @JsonProperty("procurementRequestItemSuppliers")
	public Set<ProcurementRequestItemBean> getProcurementRequestItemSuppliers() {
		return procurementRequestItemSuppliers;
	}

	public void setProcurementRequestItemSuppliers(Set<ProcurementRequestItemBean> procurementRequestItemSuppliers) {
		this.procurementRequestItemSuppliers = procurementRequestItemSuppliers;
	}

    @JsonProperty("tangibleItemConditions")
	public Set<TangibleItemConditionBean> getTangibleItemConditions() {
		return tangibleItemConditions;
	}

	public void setTangibleItemConditions(Set<TangibleItemConditionBean> tangibleItemConditions) {
		this.tangibleItemConditions = tangibleItemConditions;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("deliveryNoteItems")
	public Set<DeliveryNoteItemBean> getDeliveryNoteItems() {
		return deliveryNoteItems;
	}

	public void setDeliveryNoteItems(Set<DeliveryNoteItemBean> deliveryNoteItems) {
		this.deliveryNoteItems = deliveryNoteItems;
	}

    @JsonProperty("renamingItemsOutput")
	public Set<RenamingItemBean> getRenamingItemsOutput() {
		return renamingItemsOutput;
	}

	public void setRenamingItemsOutput(Set<RenamingItemBean> renamingItemsOutput) {
		this.renamingItemsOutput = renamingItemsOutput;
	}

    @JsonProperty("renamingItemsInput")
	public Set<RenamingItemBean> getRenamingItemsInput() {
		return renamingItemsInput;
	}

	public void setRenamingItemsInput(Set<RenamingItemBean> renamingItemsInput) {
		this.renamingItemsInput = renamingItemsInput;
	}

    @JsonProperty("orderHeadingsDelivery")
	public Set<OrderHeadingBean> getOrderHeadingsDelivery() {
		return orderHeadingsDelivery;
	}

	public void setOrderHeadingsDelivery(Set<OrderHeadingBean> orderHeadingsDelivery) {
		this.orderHeadingsDelivery = orderHeadingsDelivery;
	}

    @JsonProperty("characteristics")
	public Set<CharacteristicBean> getCharacteristics() {
		return characteristics;
	}

	public void setCharacteristics(Set<CharacteristicBean> characteristics) {
		this.characteristics = characteristics;
	}

    @JsonProperty("rfpItems")
	public Set<RequestForProposalItemBean> getRfpItems() {
		return rfpItems;
	}

	public void setRfpItems(Set<RequestForProposalItemBean> rfpItems) {
		this.rfpItems = rfpItems;
	}

    @JsonProperty("goodsSDs")
	public Set<ShippingDocumentBean> getGoodsSDs() {
		return goodsSDs;
	}

	public void setGoodsSDs(Set<ShippingDocumentBean> goodsSDs) {
		this.goodsSDs = goodsSDs;
	}

    @JsonProperty("orderSupplierItems")
	public Set<OrderSupplierItemBean> getOrderSupplierItems() {
		return orderSupplierItems;
	}

	public void setOrderSupplierItems(Set<OrderSupplierItemBean> orderSupplierItems) {
		this.orderSupplierItems = orderSupplierItems;
	}

    @JsonProperty("sellingPrice")
	public Set<SellingPriceBean> getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(Set<SellingPriceBean> sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

    @JsonProperty("offerSupplierItems")
	public Set<OfferSupplierItemBean> getOfferSupplierItems() {
		return offerSupplierItems;
	}

	public void setOfferSupplierItems(Set<OfferSupplierItemBean> offerSupplierItems) {
		this.offerSupplierItems = offerSupplierItems;
	}

    @JsonProperty("goodsReceivedNoteHeadings")
	public Set<GoodsReceivedNoteHeadingBean> getGoodsReceivedNoteHeadings() {
		return goodsReceivedNoteHeadings;
	}

	public void setGoodsReceivedNoteHeadings(Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings) {
		this.goodsReceivedNoteHeadings = goodsReceivedNoteHeadings;
	}

    @JsonProperty("transactionLogs")
	public Set<TransactionLogBean> getTransactionLogs() {
		return transactionLogs;
	}

	public void setTransactionLogs(Set<TransactionLogBean> transactionLogs) {
		this.transactionLogs = transactionLogs;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}

    @JsonProperty("marketBelonging")
	public Set<OUBelongingBean> getMarketBelonging() {
		return marketBelonging;
	}

	public void setMarketBelonging(Set<OUBelongingBean> marketBelonging) {
		this.marketBelonging = marketBelonging;
	}

    @JsonProperty("invoiceSDs")
	public Set<ShippingDocumentBean> getInvoiceSDs() {
		return invoiceSDs;
	}

	public void setInvoiceSDs(Set<ShippingDocumentBean> invoiceSDs) {
		this.invoiceSDs = invoiceSDs;
	}

    @JsonProperty("customerRequestHeaders1")
	public Set<CustomerRequestHeadingBean> getCustomerRequestHeaders1() {
		return customerRequestHeaders1;
	}

	public void setCustomerRequestHeaders1(Set<CustomerRequestHeadingBean> customerRequestHeaders1) {
		this.customerRequestHeaders1 = customerRequestHeaders1;
	}

    @JsonProperty("superComponent")
	public Set<StructuralComponentsBean> getSuperComponent() {
		return superComponent;
	}

	public void setSuperComponent(Set<StructuralComponentsBean> superComponent) {
		this.superComponent = superComponent;
	}

    @JsonProperty("requestForProduction")
	public Set<RequestForProductionItemBean> getRequestForProduction() {
		return requestForProduction;
	}

	public void setRequestForProduction(Set<RequestForProductionItemBean> requestForProduction) {
		this.requestForProduction = requestForProduction;
	}

    @JsonProperty("tangibleItemAmmountTools")
	public Set<TangibleItemAmmountToolBean> getTangibleItemAmmountTools() {
		return tangibleItemAmmountTools;
	}

	public void setTangibleItemAmmountTools(Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools) {
		this.tangibleItemAmmountTools = tangibleItemAmmountTools;
	}

    @JsonProperty("subComponent")
	public Set<StructuralComponentsBean> getSubComponent() {
		return subComponent;
	}

	public void setSubComponent(Set<StructuralComponentsBean> subComponent) {
		this.subComponent = subComponent;
	}

    @JsonProperty("productInstances")
	public Set<ProductInstanceBean> getProductInstances() {
		return productInstances;
	}

	public void setProductInstances(Set<ProductInstanceBean> productInstances) {
		this.productInstances = productInstances;
	}

    @JsonProperty("beOrderItems")
	public Set<BEOrderItemBean> getBeOrderItems() {
		return beOrderItems;
	}

	public void setBeOrderItems(Set<BEOrderItemBean> beOrderItems) {
		this.beOrderItems = beOrderItems;
	}

    @JsonProperty("previousValues")
	public Set<IdentificationArchiveBean> getPreviousValues() {
		return previousValues;
	}

	public void setPreviousValues(Set<IdentificationArchiveBean> previousValues) {
		this.previousValues = previousValues;
	}

    @JsonProperty("workOrders")
	public Set<WorkOrderBean> getWorkOrders() {
		return workOrders;
	}

	public void setWorkOrders(Set<WorkOrderBean> workOrders) {
		this.workOrders = workOrders;
	}

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
	}

    @JsonProperty("procurementRequestItems")
	public Set<ProcurementRequestItemBean> getProcurementRequestItems() {
		return procurementRequestItems;
	}

	public void setProcurementRequestItems(Set<ProcurementRequestItemBean> procurementRequestItems) {
		this.procurementRequestItems = procurementRequestItems;
	}

    @JsonProperty("proformaInvoices")
	public Set<ProFormaInvoiceBean> getProformaInvoices() {
		return proformaInvoices;
	}

	public void setProformaInvoices(Set<ProFormaInvoiceBean> proformaInvoices) {
		this.proformaInvoices = proformaInvoices;
	}

    @JsonProperty("goodsReceivedNoteItems")
	public Set<GoodsReceivedNoteItemBean> getGoodsReceivedNoteItems() {
		return goodsReceivedNoteItems;
	}

	public void setGoodsReceivedNoteItems(Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems) {
		this.goodsReceivedNoteItems = goodsReceivedNoteItems;
	}

    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}

    @JsonProperty("customerRequestHeaders")
	public Set<CustomerRequestHeadingBean> getCustomerRequestHeaders() {
		return customerRequestHeaders;
	}

	public void setCustomerRequestHeaders(Set<CustomerRequestHeadingBean> customerRequestHeaders) {
		this.customerRequestHeaders = customerRequestHeaders;
	}

    @JsonProperty("customerRequestItems")
	public Set<CustomerRequestItemBean> getCustomerRequestItems() {
		return customerRequestItems;
	}

	public void setCustomerRequestItems(Set<CustomerRequestItemBean> customerRequestItems) {
		this.customerRequestItems = customerRequestItems;
	}

    @JsonProperty("consumableSupplies")
	public Set<ConsumableSuppliesBean> getConsumableSupplies() {
		return consumableSupplies;
	}

	public void setConsumableSupplies(Set<ConsumableSuppliesBean> consumableSupplies) {
		this.consumableSupplies = consumableSupplies;
	}

    @JsonProperty("balanceResources")
	public Set<BalanceResourceBean> getBalanceResources() {
		return balanceResources;
	}

	public void setBalanceResources(Set<BalanceResourceBean> balanceResources) {
		this.balanceResources = balanceResources;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("exporterSDs")
	public Set<ShippingDocumentBean> getExporterSDs() {
		return exporterSDs;
	}

	public void setExporterSDs(Set<ShippingDocumentBean> exporterSDs) {
		this.exporterSDs = exporterSDs;
	}

    @JsonProperty("prices")
	public Set<PriceBean> getPrices() {
		return prices;
	}

	public void setPrices(Set<PriceBean> prices) {
		this.prices = prices;
	}

    @JsonProperty("procurementPlanItems")
	public Set<ProcurementPlanItemBean> getProcurementPlanItems() {
		return procurementPlanItems;
	}

	public void setProcurementPlanItems(Set<ProcurementPlanItemBean> procurementPlanItems) {
		this.procurementPlanItems = procurementPlanItems;
	}

    @JsonProperty("shippingDocumentsDelivery")
	public Set<ShippingDocumentBean> getShippingDocumentsDelivery() {
		return shippingDocumentsDelivery;
	}

	public void setShippingDocumentsDelivery(Set<ShippingDocumentBean> shippingDocumentsDelivery) {
		this.shippingDocumentsDelivery = shippingDocumentsDelivery;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof IdentificationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((IdentificationBean) o).getId()));
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
		return "IdentificationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", IIdentificationCode=" + IIdentificationCode
			+ ", IName=" + IName
			+ ", IShortName=" + IShortName
			+ ", IParallelCode=" + IParallelCode
			+ ", IDrawingIdentificationNumber=" + IDrawingIdentificationNumber
			+ ", IIsPayable=" + IIsPayable
			// + ", classification=" + classification
			// + ", materialReturnNoteItems=" + materialReturnNoteItems
			// + ", stepTools=" + stepTools
			// + ", procurementRequestItemSuppliers=" + procurementRequestItemSuppliers
			// + ", tangibleItemConditions=" + tangibleItemConditions
			// + ", invoices=" + invoices
			// + ", deliveryNoteItems=" + deliveryNoteItems
			// + ", renamingItemsOutput=" + renamingItemsOutput
			// + ", renamingItemsInput=" + renamingItemsInput
			// + ", orderHeadingsDelivery=" + orderHeadingsDelivery
			// + ", characteristics=" + characteristics
			// + ", rfpItems=" + rfpItems
			// + ", goodsSDs=" + goodsSDs
			// + ", orderSupplierItems=" + orderSupplierItems
			// + ", sellingPrice=" + sellingPrice
			// + ", offerSupplierItems=" + offerSupplierItems
			// + ", goodsReceivedNoteHeadings=" + goodsReceivedNoteHeadings
			// + ", transactionLogs=" + transactionLogs
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			// + ", marketBelonging=" + marketBelonging
			// + ", invoiceSDs=" + invoiceSDs
			// + ", customerRequestHeaders1=" + customerRequestHeaders1
			// + ", superComponent=" + superComponent
			// + ", requestForProduction=" + requestForProduction
			// + ", tangibleItemAmmountTools=" + tangibleItemAmmountTools
			// + ", subComponent=" + subComponent
			// + ", productInstances=" + productInstances
			// + ", beOrderItems=" + beOrderItems
			// + ", previousValues=" + previousValues
			// + ", workOrders=" + workOrders
			// + ", orderItems=" + orderItems
			// + ", procurementRequestItems=" + procurementRequestItems
			// + ", proformaInvoices=" + proformaInvoices
			// + ", goodsReceivedNoteItems=" + goodsReceivedNoteItems
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			// + ", customerRequestHeaders=" + customerRequestHeaders
			// + ", customerRequestItems=" + customerRequestItems
			// + ", consumableSupplies=" + consumableSupplies
			// + ", balanceResources=" + balanceResources
			// + ", orderHeadings=" + orderHeadings
			// + ", exporterSDs=" + exporterSDs
			// + ", prices=" + prices
			// + ", procurementPlanItems=" + procurementPlanItems
			// + ", shippingDocumentsDelivery=" + shippingDocumentsDelivery
			+ "]";
	}
}