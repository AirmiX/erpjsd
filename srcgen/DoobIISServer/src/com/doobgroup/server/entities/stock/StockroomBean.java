package com.doobgroup.server.entities.stock;

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

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.environment.AddressBean;
import com.doobgroup.server.entities.corporation.EmployeeBean;
import com.doobgroup.server.entities.stockmanagement.StockroomOrgUniBean;
import com.doobgroup.server.entities.stockmanagement.StockAccountAssignmentBean;
import com.doobgroup.server.entities.renaming.RenamingBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountToolBean;
import com.doobgroup.server.entities.productiondata.ProductBean;
import com.doobgroup.server.entities.stockmanagement.TransactionLogBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;

@Entity
@Table(name = "STOCKROOM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SCode"  	}))
@SQLDelete(sql="UPDATE STOCKROOM SET deleted = 1 WHERE Stockroom_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class StockroomBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Stockroom_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SCode", nullable = false)
	protected int SCode;
	@Column(name = "SName", nullable = false)
	protected String SName;
	@Column(name = "SFullName", nullable = false)
	protected String SFullName;
	@Column(name = "SType", nullable = false)
	protected char SType;
	@Column(name = "SConditions", nullable = false)
	protected String SConditions;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="address")
    protected AddressBean address;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="assistantOfAccountable")
    protected EmployeeBean assistantOfAccountable;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="accountable")
    protected EmployeeBean accountable;
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomOrgUniBean> stockroomOrgUnis = new HashSet<StockroomOrgUniBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockAccountAssignmentBean> stockAccountAssignment = new HashSet<StockAccountAssignmentBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingBean> renamings = new HashSet<RenamingBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteBean> deliveryNotes = new HashSet<DeliveryNoteBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOrderBean> workOrders = new HashSet<WorkOrderBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools = new HashSet<TangibleItemAmmountToolBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductBean> products = new HashSet<ProductBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TransactionLogBean> transactionLogs = new HashSet<TransactionLogBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionBean> requisitions = new HashSet<RequisitionBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteBean> materialRetunNote = new HashSet<MaterialReturnNoteBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionItemBean> requestForProduction = new HashSet<RequestForProductionItemBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings = new HashSet<GoodsReceivedNoteHeadingBean>();
    @OneToMany(mappedBy = "consignmentStockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> consignmentShippingDocuments = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "consignmentStockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocument = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "stockroom", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
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

    @JsonProperty("SCode")
	public int getSCode() {
		return SCode;
	}

	public void setSCode(int SCode) {
		this.SCode = SCode;
	}

    @JsonProperty("SName")
	public String getSName() {
		return SName;
	}

	public void setSName(String SName) {
		this.SName = SName;
	}

    @JsonProperty("SFullName")
	public String getSFullName() {
		return SFullName;
	}

	public void setSFullName(String SFullName) {
		this.SFullName = SFullName;
	}

    @JsonProperty("SType")
	public char getSType() {
		return SType;
	}

	public void setSType(char SType) {
		this.SType = SType;
	}

    @JsonProperty("SConditions")
	public String getSConditions() {
		return SConditions;
	}

	public void setSConditions(String SConditions) {
		this.SConditions = SConditions;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("address")
	public AddressBean getAddress() {
		return address;
	}

    public void setAddress(AddressBean address) {
		this.address = address;
	}

    @JsonProperty("assistantOfAccountable")
	public EmployeeBean getAssistantOfAccountable() {
		return assistantOfAccountable;
	}

    public void setAssistantOfAccountable(EmployeeBean assistantOfAccountable) {
		this.assistantOfAccountable = assistantOfAccountable;
	}

    @JsonProperty("accountable")
	public EmployeeBean getAccountable() {
		return accountable;
	}

    public void setAccountable(EmployeeBean accountable) {
		this.accountable = accountable;
	}

    @JsonProperty("stockroomOrgUnis")
	public Set<StockroomOrgUniBean> getStockroomOrgUnis() {
		return stockroomOrgUnis;
	}

	public void setStockroomOrgUnis(Set<StockroomOrgUniBean> stockroomOrgUnis) {
		this.stockroomOrgUnis = stockroomOrgUnis;
	}

    @JsonProperty("stockAccountAssignment")
	public Set<StockAccountAssignmentBean> getStockAccountAssignment() {
		return stockAccountAssignment;
	}

	public void setStockAccountAssignment(Set<StockAccountAssignmentBean> stockAccountAssignment) {
		this.stockAccountAssignment = stockAccountAssignment;
	}

    @JsonProperty("renamings")
	public Set<RenamingBean> getRenamings() {
		return renamings;
	}

	public void setRenamings(Set<RenamingBean> renamings) {
		this.renamings = renamings;
	}

    @JsonProperty("tangibleItemConditions")
	public Set<TangibleItemConditionBean> getTangibleItemConditions() {
		return tangibleItemConditions;
	}

	public void setTangibleItemConditions(Set<TangibleItemConditionBean> tangibleItemConditions) {
		this.tangibleItemConditions = tangibleItemConditions;
	}

    @JsonProperty("deliveryNotes")
	public Set<DeliveryNoteBean> getDeliveryNotes() {
		return deliveryNotes;
	}

	public void setDeliveryNotes(Set<DeliveryNoteBean> deliveryNotes) {
		this.deliveryNotes = deliveryNotes;
	}

    @JsonProperty("workOrders")
	public Set<WorkOrderBean> getWorkOrders() {
		return workOrders;
	}

	public void setWorkOrders(Set<WorkOrderBean> workOrders) {
		this.workOrders = workOrders;
	}

    @JsonProperty("tangibleItemAmmountTools")
	public Set<TangibleItemAmmountToolBean> getTangibleItemAmmountTools() {
		return tangibleItemAmmountTools;
	}

	public void setTangibleItemAmmountTools(Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools) {
		this.tangibleItemAmmountTools = tangibleItemAmmountTools;
	}

    @JsonProperty("products")
	public Set<ProductBean> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductBean> products) {
		this.products = products;
	}

    @JsonProperty("transactionLogs")
	public Set<TransactionLogBean> getTransactionLogs() {
		return transactionLogs;
	}

	public void setTransactionLogs(Set<TransactionLogBean> transactionLogs) {
		this.transactionLogs = transactionLogs;
	}

    @JsonProperty("requisitions")
	public Set<RequisitionBean> getRequisitions() {
		return requisitions;
	}

	public void setRequisitions(Set<RequisitionBean> requisitions) {
		this.requisitions = requisitions;
	}

    @JsonProperty("materialRetunNote")
	public Set<MaterialReturnNoteBean> getMaterialRetunNote() {
		return materialRetunNote;
	}

	public void setMaterialRetunNote(Set<MaterialReturnNoteBean> materialRetunNote) {
		this.materialRetunNote = materialRetunNote;
	}

    @JsonProperty("requestForProduction")
	public Set<RequestForProductionItemBean> getRequestForProduction() {
		return requestForProduction;
	}

	public void setRequestForProduction(Set<RequestForProductionItemBean> requestForProduction) {
		this.requestForProduction = requestForProduction;
	}

    @JsonProperty("goodsReceivedNoteHeadings")
	public Set<GoodsReceivedNoteHeadingBean> getGoodsReceivedNoteHeadings() {
		return goodsReceivedNoteHeadings;
	}

	public void setGoodsReceivedNoteHeadings(Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings) {
		this.goodsReceivedNoteHeadings = goodsReceivedNoteHeadings;
	}

    @JsonProperty("consignmentShippingDocuments")
	public Set<ShippingDocumentBean> getConsignmentShippingDocuments() {
		return consignmentShippingDocuments;
	}

	public void setConsignmentShippingDocuments(Set<ShippingDocumentBean> consignmentShippingDocuments) {
		this.consignmentShippingDocuments = consignmentShippingDocuments;
	}

    @JsonProperty("shippingDocument")
	public Set<ShippingDocumentBean> getShippingDocument() {
		return shippingDocument;
	}

	public void setShippingDocument(Set<ShippingDocumentBean> shippingDocument) {
		this.shippingDocument = shippingDocument;
	}

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
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
		if (o == null || !(o instanceof StockroomBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((StockroomBean) o).getId()));
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
		return "StockroomBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SCode=" + SCode
			+ ", SName=" + SName
			+ ", SFullName=" + SFullName
			+ ", SType=" + SType
			+ ", SConditions=" + SConditions
			// + ", organizationUnit=" + organizationUnit
			// + ", address=" + address
			// + ", assistantOfAccountable=" + assistantOfAccountable
			// + ", accountable=" + accountable
			// + ", stockroomOrgUnis=" + stockroomOrgUnis
			// + ", stockAccountAssignment=" + stockAccountAssignment
			// + ", renamings=" + renamings
			// + ", tangibleItemConditions=" + tangibleItemConditions
			// + ", deliveryNotes=" + deliveryNotes
			// + ", workOrders=" + workOrders
			// + ", tangibleItemAmmountTools=" + tangibleItemAmmountTools
			// + ", products=" + products
			// + ", transactionLogs=" + transactionLogs
			// + ", requisitions=" + requisitions
			// + ", materialRetunNote=" + materialRetunNote
			// + ", requestForProduction=" + requestForProduction
			// + ", goodsReceivedNoteHeadings=" + goodsReceivedNoteHeadings
			// + ", consignmentShippingDocuments=" + consignmentShippingDocuments
			// + ", shippingDocument=" + shippingDocument
			// + ", orderItems=" + orderItems
			// + ", beOrderItems=" + beOrderItems
			+ "]";
	}
}