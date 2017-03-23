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

import com.doobgroup.server.entities.stockmanagement.TangibleItemAnalyticsBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;
import com.doobgroup.server.entities.stockmanagement.TransactionLogBean;
import com.doobgroup.server.entities.stockmanagement.RequestForProposalHeadingBean;
import com.doobgroup.server.entities.stockmanagement.TransferOrderBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;
import com.doobgroup.server.entities.initialization.ProcurementPlanHeadingBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteBean;
import com.doobgroup.server.entities.internalinvoice.BEInvoiceBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;
import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;
import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestHeadingBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.renaming.RenamingBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;

@Entity
@Table(name = "DOCUMENTTYPE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "DTIdentificationNumber"  	}))
@SQLDelete(sql="UPDATE DOCUMENTTYPE SET deleted = 1 WHERE DocumentType_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class DocumentTypeBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DocumentType_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "DTIdentificationNumber", nullable = false)
	protected int DTIdentificationNumber;
	@Column(name = "DTName", nullable = false)
	protected String DTName;
	@Column(name = "DTShortName", nullable = false)
	protected String DTShortName;
	@Column(name = "DTCounter")
	protected int DTCounter;

    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAnalyticsBean> tangibleItemAnalytics = new HashSet<TangibleItemAnalyticsBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionBean> requisitions = new HashSet<RequisitionBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestHeadingBean> customerRequestHeaders = new HashSet<CustomerRequestHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TransactionLogBean> transactionLogs = new HashSet<TransactionLogBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProposalHeadingBean> rfpHeadings = new HashSet<RequestForProposalHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TransferOrderBean> transferOrders = new HashSet<TransferOrderBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementPlanHeadingBean> procurementPlanHeadings = new HashSet<ProcurementPlanHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteBean> deliveryNotes = new HashSet<DeliveryNoteBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEInvoiceBean> beInvoices = new HashSet<BEInvoiceBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings = new HashSet<GoodsReceivedNoteHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionBean> requestForProduction = new HashSet<RequestForProductionBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proformaInvoices = new HashSet<ProFormaInvoiceBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadings = new HashSet<BEOrderHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteBean> materialReturnNotes = new HashSet<MaterialReturnNoteBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestHeadingBean> procurementRequestHeadings = new HashSet<ProcurementRequestHeadingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocuments = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingBean> renamings = new HashSet<RenamingBean>();
    @OneToMany(mappedBy = "documentType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOrderBean> workOrders = new HashSet<WorkOrderBean>();

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

    @JsonProperty("DTIdentificationNumber")
	public int getDTIdentificationNumber() {
		return DTIdentificationNumber;
	}

	public void setDTIdentificationNumber(int DTIdentificationNumber) {
		this.DTIdentificationNumber = DTIdentificationNumber;
	}

    @JsonProperty("DTName")
	public String getDTName() {
		return DTName;
	}

	public void setDTName(String DTName) {
		this.DTName = DTName;
	}

    @JsonProperty("DTShortName")
	public String getDTShortName() {
		return DTShortName;
	}

	public void setDTShortName(String DTShortName) {
		this.DTShortName = DTShortName;
	}

    @JsonProperty("DTCounter")
	public int getDTCounter() {
		return DTCounter;
	}

	public void setDTCounter(int DTCounter) {
		this.DTCounter = DTCounter;
	}


    @JsonProperty("tangibleItemAnalytics")
	public Set<TangibleItemAnalyticsBean> getTangibleItemAnalytics() {
		return tangibleItemAnalytics;
	}

	public void setTangibleItemAnalytics(Set<TangibleItemAnalyticsBean> tangibleItemAnalytics) {
		this.tangibleItemAnalytics = tangibleItemAnalytics;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("requisitions")
	public Set<RequisitionBean> getRequisitions() {
		return requisitions;
	}

	public void setRequisitions(Set<RequisitionBean> requisitions) {
		this.requisitions = requisitions;
	}

    @JsonProperty("customerRequestHeaders")
	public Set<CustomerRequestHeadingBean> getCustomerRequestHeaders() {
		return customerRequestHeaders;
	}

	public void setCustomerRequestHeaders(Set<CustomerRequestHeadingBean> customerRequestHeaders) {
		this.customerRequestHeaders = customerRequestHeaders;
	}

    @JsonProperty("transactionLogs")
	public Set<TransactionLogBean> getTransactionLogs() {
		return transactionLogs;
	}

	public void setTransactionLogs(Set<TransactionLogBean> transactionLogs) {
		this.transactionLogs = transactionLogs;
	}

    @JsonProperty("rfpHeadings")
	public Set<RequestForProposalHeadingBean> getRfpHeadings() {
		return rfpHeadings;
	}

	public void setRfpHeadings(Set<RequestForProposalHeadingBean> rfpHeadings) {
		this.rfpHeadings = rfpHeadings;
	}

    @JsonProperty("transferOrders")
	public Set<TransferOrderBean> getTransferOrders() {
		return transferOrders;
	}

	public void setTransferOrders(Set<TransferOrderBean> transferOrders) {
		this.transferOrders = transferOrders;
	}

    @JsonProperty("tangibleItemConditions")
	public Set<TangibleItemConditionBean> getTangibleItemConditions() {
		return tangibleItemConditions;
	}

	public void setTangibleItemConditions(Set<TangibleItemConditionBean> tangibleItemConditions) {
		this.tangibleItemConditions = tangibleItemConditions;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}

    @JsonProperty("procurementPlanHeadings")
	public Set<ProcurementPlanHeadingBean> getProcurementPlanHeadings() {
		return procurementPlanHeadings;
	}

	public void setProcurementPlanHeadings(Set<ProcurementPlanHeadingBean> procurementPlanHeadings) {
		this.procurementPlanHeadings = procurementPlanHeadings;
	}

    @JsonProperty("deliveryNotes")
	public Set<DeliveryNoteBean> getDeliveryNotes() {
		return deliveryNotes;
	}

	public void setDeliveryNotes(Set<DeliveryNoteBean> deliveryNotes) {
		this.deliveryNotes = deliveryNotes;
	}

    @JsonProperty("beInvoices")
	public Set<BEInvoiceBean> getBeInvoices() {
		return beInvoices;
	}

	public void setBeInvoices(Set<BEInvoiceBean> beInvoices) {
		this.beInvoices = beInvoices;
	}

    @JsonProperty("goodsReceivedNoteHeadings")
	public Set<GoodsReceivedNoteHeadingBean> getGoodsReceivedNoteHeadings() {
		return goodsReceivedNoteHeadings;
	}

	public void setGoodsReceivedNoteHeadings(Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings) {
		this.goodsReceivedNoteHeadings = goodsReceivedNoteHeadings;
	}

    @JsonProperty("requestForProduction")
	public Set<RequestForProductionBean> getRequestForProduction() {
		return requestForProduction;
	}

	public void setRequestForProduction(Set<RequestForProductionBean> requestForProduction) {
		this.requestForProduction = requestForProduction;
	}

    @JsonProperty("proformaInvoices")
	public Set<ProFormaInvoiceBean> getProformaInvoices() {
		return proformaInvoices;
	}

	public void setProformaInvoices(Set<ProFormaInvoiceBean> proformaInvoices) {
		this.proformaInvoices = proformaInvoices;
	}

    @JsonProperty("beOrderHeadings")
	public Set<BEOrderHeadingBean> getBeOrderHeadings() {
		return beOrderHeadings;
	}

	public void setBeOrderHeadings(Set<BEOrderHeadingBean> beOrderHeadings) {
		this.beOrderHeadings = beOrderHeadings;
	}

    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("materialReturnNotes")
	public Set<MaterialReturnNoteBean> getMaterialReturnNotes() {
		return materialReturnNotes;
	}

	public void setMaterialReturnNotes(Set<MaterialReturnNoteBean> materialReturnNotes) {
		this.materialReturnNotes = materialReturnNotes;
	}

    @JsonProperty("procurementRequestHeadings")
	public Set<ProcurementRequestHeadingBean> getProcurementRequestHeadings() {
		return procurementRequestHeadings;
	}

	public void setProcurementRequestHeadings(Set<ProcurementRequestHeadingBean> procurementRequestHeadings) {
		this.procurementRequestHeadings = procurementRequestHeadings;
	}

    @JsonProperty("shippingDocuments")
	public Set<ShippingDocumentBean> getShippingDocuments() {
		return shippingDocuments;
	}

	public void setShippingDocuments(Set<ShippingDocumentBean> shippingDocuments) {
		this.shippingDocuments = shippingDocuments;
	}

    @JsonProperty("renamings")
	public Set<RenamingBean> getRenamings() {
		return renamings;
	}

	public void setRenamings(Set<RenamingBean> renamings) {
		this.renamings = renamings;
	}

    @JsonProperty("workOrders")
	public Set<WorkOrderBean> getWorkOrders() {
		return workOrders;
	}

	public void setWorkOrders(Set<WorkOrderBean> workOrders) {
		this.workOrders = workOrders;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof DocumentTypeBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((DocumentTypeBean) o).getId()));
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
		return "DocumentTypeBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", DTIdentificationNumber=" + DTIdentificationNumber
			+ ", DTName=" + DTName
			+ ", DTShortName=" + DTShortName
			+ ", DTCounter=" + DTCounter
			// + ", tangibleItemAnalytics=" + tangibleItemAnalytics
			// + ", invoices=" + invoices
			// + ", requisitions=" + requisitions
			// + ", customerRequestHeaders=" + customerRequestHeaders
			// + ", transactionLogs=" + transactionLogs
			// + ", rfpHeadings=" + rfpHeadings
			// + ", transferOrders=" + transferOrders
			// + ", tangibleItemConditions=" + tangibleItemConditions
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			// + ", procurementPlanHeadings=" + procurementPlanHeadings
			// + ", deliveryNotes=" + deliveryNotes
			// + ", beInvoices=" + beInvoices
			// + ", goodsReceivedNoteHeadings=" + goodsReceivedNoteHeadings
			// + ", requestForProduction=" + requestForProduction
			// + ", proformaInvoices=" + proformaInvoices
			// + ", beOrderHeadings=" + beOrderHeadings
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			// + ", orderHeadings=" + orderHeadings
			// + ", materialReturnNotes=" + materialReturnNotes
			// + ", procurementRequestHeadings=" + procurementRequestHeadings
			// + ", shippingDocuments=" + shippingDocuments
			// + ", renamings=" + renamings
			// + ", workOrders=" + workOrders
			+ "]";
	}
}