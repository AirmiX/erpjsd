package com.doobgroup.server.entities.corporation;

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

import com.doobgroup.server.entities.sellingprice.MarketBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitTypeBean;
import com.doobgroup.server.entities.environment.AddressBean;
import com.doobgroup.server.entities.corporation.EmployeeBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.initialization.TaskTypeBean;
import com.doobgroup.server.entities.stockmanagement.RequestForProposalHeadingBean;
import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestHeadingBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteBean;
import com.doobgroup.server.entities.corporation.WorkCalendarBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.sellingprice.OUBelongingBean;
import com.doobgroup.server.entities.stockmanagement.StockroomOrgUniBean;
import com.doobgroup.server.entities.renaming.RenamingBean;
import com.doobgroup.server.entities.sellingprice.SellingPriceBean;
import com.doobgroup.server.entities.productiondata.WorkCenterBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteBean;
import com.doobgroup.server.entities.humanresources.WorkstationBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;
import com.doobgroup.server.entities.productiondata.ProductBean;
import com.doobgroup.server.entities.initialization.ProcurementPlanHeadingBean;
import com.doobgroup.server.entities.order.OrderCategoryBean;
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessBean;

@Entity
@Table(name = "ORGANIZATIONUNIT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OUIdentificationCode"  	}))
@SQLDelete(sql="UPDATE ORGANIZATIONUNIT SET deleted = 1 WHERE OrganizationUnit_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OrganizationUnitBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OrganizationUnit_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OUIdentificationCode", nullable = false)
	protected String OUIdentificationCode;
	@Column(name = "OUName", nullable = false)
	protected String OUName;
	@Column(name = "OUShortName")
	protected String OUShortName;
	@Column(name = "OUTelephone")
	protected String OUTelephone;
	@Column(name = "OUFax")
	protected String OUFax;
	@Column(name = "OUEmail")
	protected String OUEmail;
	@Column(name = "OUCalculationLevelStatus")
	protected Boolean OUCalculationLevelStatus;
	@Column(name = "OUClassificationNumber")
	protected String OUClassificationNumber;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="market")
    protected MarketBean market;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="type")
    protected OrganizationUnitTypeBean type;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="address")
    protected AddressBean address;
    @OneToMany(mappedBy = "organizationUnits", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<EmployeeBean> employees = new HashSet<EmployeeBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocuments = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TaskTypeBean> taskTypes = new HashSet<TaskTypeBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProposalHeadingBean> rfpHeadings = new HashSet<RequestForProposalHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proFormaInvoices = new HashSet<ProFormaInvoiceBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestHeadingBean> procurementRequestHeadings = new HashSet<ProcurementRequestHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionBean> requestForProduction = new HashSet<RequestForProductionBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOrderBean> workOrder = new HashSet<WorkOrderBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteBean> deliveryNotes = new HashSet<DeliveryNoteBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkCalendarBean> workCalendars = new HashSet<WorkCalendarBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomBean> stockrooms = new HashSet<StockroomBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OUBelongingBean> ouBelonging = new HashSet<OUBelongingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomOrgUniBean> stckroomOrgiUnis = new HashSet<StockroomOrgUniBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingBean> renamings = new HashSet<RenamingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<SellingPriceBean> sellingPrice = new HashSet<SellingPriceBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkCenterBean> workCenters = new HashSet<WorkCenterBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionBean> requisitions = new HashSet<RequisitionBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteBean> materialReturnNotes = new HashSet<MaterialReturnNoteBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkstationBean> workstations = new HashSet<WorkstationBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings = new HashSet<GoodsReceivedNoteHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestItemBean> customerRequestitems = new HashSet<CustomerRequestItemBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductBean> products = new HashSet<ProductBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOrderBean> workOrdersProduction = new HashSet<WorkOrderBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementPlanHeadingBean> procurementPlanHeadings = new HashSet<ProcurementPlanHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderCategoryBean> orderCategories = new HashSet<OrderCategoryBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();
    @OneToMany(mappedBy = "organizationUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionProcessBean> productionProcesses = new HashSet<ProductionProcessBean>();

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

    @JsonProperty("OUIdentificationCode")
	public String getOUIdentificationCode() {
		return OUIdentificationCode;
	}

	public void setOUIdentificationCode(String OUIdentificationCode) {
		this.OUIdentificationCode = OUIdentificationCode;
	}

    @JsonProperty("OUName")
	public String getOUName() {
		return OUName;
	}

	public void setOUName(String OUName) {
		this.OUName = OUName;
	}

    @JsonProperty("OUShortName")
	public String getOUShortName() {
		return OUShortName;
	}

	public void setOUShortName(String OUShortName) {
		this.OUShortName = OUShortName;
	}

    @JsonProperty("OUTelephone")
	public String getOUTelephone() {
		return OUTelephone;
	}

	public void setOUTelephone(String OUTelephone) {
		this.OUTelephone = OUTelephone;
	}

    @JsonProperty("OUFax")
	public String getOUFax() {
		return OUFax;
	}

	public void setOUFax(String OUFax) {
		this.OUFax = OUFax;
	}

    @JsonProperty("OUEmail")
	public String getOUEmail() {
		return OUEmail;
	}

	public void setOUEmail(String OUEmail) {
		this.OUEmail = OUEmail;
	}

    @JsonProperty("OUCalculationLevelStatus")
	public Boolean getOUCalculationLevelStatus() {
		return OUCalculationLevelStatus;
	}

	public void setOUCalculationLevelStatus(Boolean OUCalculationLevelStatus) {
		this.OUCalculationLevelStatus = OUCalculationLevelStatus;
	}

    @JsonProperty("OUClassificationNumber")
	public String getOUClassificationNumber() {
		return OUClassificationNumber;
	}

	public void setOUClassificationNumber(String OUClassificationNumber) {
		this.OUClassificationNumber = OUClassificationNumber;
	}


    @JsonProperty("market")
	public MarketBean getMarket() {
		return market;
	}

    public void setMarket(MarketBean market) {
		this.market = market;
	}

    @JsonProperty("type")
	public OrganizationUnitTypeBean getType() {
		return type;
	}

    public void setType(OrganizationUnitTypeBean type) {
		this.type = type;
	}

    @JsonProperty("address")
	public AddressBean getAddress() {
		return address;
	}

    public void setAddress(AddressBean address) {
		this.address = address;
	}

    @JsonProperty("employees")
	public Set<EmployeeBean> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<EmployeeBean> employees) {
		this.employees = employees;
	}

    @JsonProperty("shippingDocuments")
	public Set<ShippingDocumentBean> getShippingDocuments() {
		return shippingDocuments;
	}

	public void setShippingDocuments(Set<ShippingDocumentBean> shippingDocuments) {
		this.shippingDocuments = shippingDocuments;
	}

    @JsonProperty("taskTypes")
	public Set<TaskTypeBean> getTaskTypes() {
		return taskTypes;
	}

	public void setTaskTypes(Set<TaskTypeBean> taskTypes) {
		this.taskTypes = taskTypes;
	}

    @JsonProperty("rfpHeadings")
	public Set<RequestForProposalHeadingBean> getRfpHeadings() {
		return rfpHeadings;
	}

	public void setRfpHeadings(Set<RequestForProposalHeadingBean> rfpHeadings) {
		this.rfpHeadings = rfpHeadings;
	}

    @JsonProperty("proFormaInvoices")
	public Set<ProFormaInvoiceBean> getProFormaInvoices() {
		return proFormaInvoices;
	}

	public void setProFormaInvoices(Set<ProFormaInvoiceBean> proFormaInvoices) {
		this.proFormaInvoices = proFormaInvoices;
	}

    @JsonProperty("procurementRequestHeadings")
	public Set<ProcurementRequestHeadingBean> getProcurementRequestHeadings() {
		return procurementRequestHeadings;
	}

	public void setProcurementRequestHeadings(Set<ProcurementRequestHeadingBean> procurementRequestHeadings) {
		this.procurementRequestHeadings = procurementRequestHeadings;
	}

    @JsonProperty("requestForProduction")
	public Set<RequestForProductionBean> getRequestForProduction() {
		return requestForProduction;
	}

	public void setRequestForProduction(Set<RequestForProductionBean> requestForProduction) {
		this.requestForProduction = requestForProduction;
	}

    @JsonProperty("workOrder")
	public Set<WorkOrderBean> getWorkOrder() {
		return workOrder;
	}

	public void setWorkOrder(Set<WorkOrderBean> workOrder) {
		this.workOrder = workOrder;
	}

    @JsonProperty("deliveryNotes")
	public Set<DeliveryNoteBean> getDeliveryNotes() {
		return deliveryNotes;
	}

	public void setDeliveryNotes(Set<DeliveryNoteBean> deliveryNotes) {
		this.deliveryNotes = deliveryNotes;
	}

    @JsonProperty("workCalendars")
	public Set<WorkCalendarBean> getWorkCalendars() {
		return workCalendars;
	}

	public void setWorkCalendars(Set<WorkCalendarBean> workCalendars) {
		this.workCalendars = workCalendars;
	}

    @JsonProperty("stockrooms")
	public Set<StockroomBean> getStockrooms() {
		return stockrooms;
	}

	public void setStockrooms(Set<StockroomBean> stockrooms) {
		this.stockrooms = stockrooms;
	}

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
	}

    @JsonProperty("ouBelonging")
	public Set<OUBelongingBean> getOuBelonging() {
		return ouBelonging;
	}

	public void setOuBelonging(Set<OUBelongingBean> ouBelonging) {
		this.ouBelonging = ouBelonging;
	}

    @JsonProperty("stckroomOrgiUnis")
	public Set<StockroomOrgUniBean> getStckroomOrgiUnis() {
		return stckroomOrgiUnis;
	}

	public void setStckroomOrgiUnis(Set<StockroomOrgUniBean> stckroomOrgiUnis) {
		this.stckroomOrgiUnis = stckroomOrgiUnis;
	}

    @JsonProperty("renamings")
	public Set<RenamingBean> getRenamings() {
		return renamings;
	}

	public void setRenamings(Set<RenamingBean> renamings) {
		this.renamings = renamings;
	}

    @JsonProperty("sellingPrice")
	public Set<SellingPriceBean> getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(Set<SellingPriceBean> sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

    @JsonProperty("workCenters")
	public Set<WorkCenterBean> getWorkCenters() {
		return workCenters;
	}

	public void setWorkCenters(Set<WorkCenterBean> workCenters) {
		this.workCenters = workCenters;
	}

    @JsonProperty("requisitions")
	public Set<RequisitionBean> getRequisitions() {
		return requisitions;
	}

	public void setRequisitions(Set<RequisitionBean> requisitions) {
		this.requisitions = requisitions;
	}

    @JsonProperty("materialReturnNotes")
	public Set<MaterialReturnNoteBean> getMaterialReturnNotes() {
		return materialReturnNotes;
	}

	public void setMaterialReturnNotes(Set<MaterialReturnNoteBean> materialReturnNotes) {
		this.materialReturnNotes = materialReturnNotes;
	}

    @JsonProperty("workstations")
	public Set<WorkstationBean> getWorkstations() {
		return workstations;
	}

	public void setWorkstations(Set<WorkstationBean> workstations) {
		this.workstations = workstations;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("goodsReceivedNoteHeadings")
	public Set<GoodsReceivedNoteHeadingBean> getGoodsReceivedNoteHeadings() {
		return goodsReceivedNoteHeadings;
	}

	public void setGoodsReceivedNoteHeadings(Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings) {
		this.goodsReceivedNoteHeadings = goodsReceivedNoteHeadings;
	}

    @JsonProperty("beOrderItems")
	public Set<BEOrderItemBean> getBeOrderItems() {
		return beOrderItems;
	}

	public void setBeOrderItems(Set<BEOrderItemBean> beOrderItems) {
		this.beOrderItems = beOrderItems;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}

    @JsonProperty("customerRequestitems")
	public Set<CustomerRequestItemBean> getCustomerRequestitems() {
		return customerRequestitems;
	}

	public void setCustomerRequestitems(Set<CustomerRequestItemBean> customerRequestitems) {
		this.customerRequestitems = customerRequestitems;
	}

    @JsonProperty("products")
	public Set<ProductBean> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductBean> products) {
		this.products = products;
	}

    @JsonProperty("workOrdersProduction")
	public Set<WorkOrderBean> getWorkOrdersProduction() {
		return workOrdersProduction;
	}

	public void setWorkOrdersProduction(Set<WorkOrderBean> workOrdersProduction) {
		this.workOrdersProduction = workOrdersProduction;
	}

    @JsonProperty("procurementPlanHeadings")
	public Set<ProcurementPlanHeadingBean> getProcurementPlanHeadings() {
		return procurementPlanHeadings;
	}

	public void setProcurementPlanHeadings(Set<ProcurementPlanHeadingBean> procurementPlanHeadings) {
		this.procurementPlanHeadings = procurementPlanHeadings;
	}

    @JsonProperty("orderCategories")
	public Set<OrderCategoryBean> getOrderCategories() {
		return orderCategories;
	}

	public void setOrderCategories(Set<OrderCategoryBean> orderCategories) {
		this.orderCategories = orderCategories;
	}

    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}

    @JsonProperty("productionProcesses")
	public Set<ProductionProcessBean> getProductionProcesses() {
		return productionProcesses;
	}

	public void setProductionProcesses(Set<ProductionProcessBean> productionProcesses) {
		this.productionProcesses = productionProcesses;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OrganizationUnitBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OrganizationUnitBean) o).getId()));
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
		return "OrganizationUnitBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OUIdentificationCode=" + OUIdentificationCode
			+ ", OUName=" + OUName
			+ ", OUShortName=" + OUShortName
			+ ", OUTelephone=" + OUTelephone
			+ ", OUFax=" + OUFax
			+ ", OUEmail=" + OUEmail
			+ ", OUCalculationLevelStatus=" + OUCalculationLevelStatus
			+ ", OUClassificationNumber=" + OUClassificationNumber
			// + ", market=" + market
			// + ", type=" + type
			// + ", address=" + address
			// + ", employees=" + employees
			// + ", shippingDocuments=" + shippingDocuments
			// + ", taskTypes=" + taskTypes
			// + ", rfpHeadings=" + rfpHeadings
			// + ", proFormaInvoices=" + proFormaInvoices
			// + ", procurementRequestHeadings=" + procurementRequestHeadings
			// + ", requestForProduction=" + requestForProduction
			// + ", workOrder=" + workOrder
			// + ", deliveryNotes=" + deliveryNotes
			// + ", workCalendars=" + workCalendars
			// + ", stockrooms=" + stockrooms
			// + ", orderItems=" + orderItems
			// + ", ouBelonging=" + ouBelonging
			// + ", stckroomOrgiUnis=" + stckroomOrgiUnis
			// + ", renamings=" + renamings
			// + ", sellingPrice=" + sellingPrice
			// + ", workCenters=" + workCenters
			// + ", requisitions=" + requisitions
			// + ", materialReturnNotes=" + materialReturnNotes
			// + ", workstations=" + workstations
			// + ", orderHeadings=" + orderHeadings
			// + ", invoices=" + invoices
			// + ", goodsReceivedNoteHeadings=" + goodsReceivedNoteHeadings
			// + ", beOrderItems=" + beOrderItems
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			// + ", customerRequestitems=" + customerRequestitems
			// + ", products=" + products
			// + ", workOrdersProduction=" + workOrdersProduction
			// + ", procurementPlanHeadings=" + procurementPlanHeadings
			// + ", orderCategories=" + orderCategories
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			// + ", productionProcesses=" + productionProcesses
			+ "]";
	}
}