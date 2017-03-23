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

import com.doobgroup.server.entities.corporation.EmployeeBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.initialization.TaskTypeBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.order.OrderCategoryBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.order.CustomerBean;
import com.doobgroup.server.entities.initialization.PaymentMethodBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.initialization.PaymentConditionBean;
import com.doobgroup.server.entities.initialization.UrgentStatusBean;
import com.doobgroup.server.entities.order.SpecialProjectBean;
import com.doobgroup.server.entities.initialization.DenotationMethodBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;
import com.doobgroup.server.entities.order.OrderGroupBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;

@Entity
@Table(name = "ORDERHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OHDocumentNumber"  	}))
@SQLDelete(sql="UPDATE ORDERHEADING SET deleted = 1 WHERE OrderHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OrderHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OrderHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OHDocumentNumber", nullable = false)
	protected int OHDocumentNumber;
	@Column(name = "OHCreationDate", nullable = false)
	protected Date OHCreationDate;
	@Column(name = "OHContractNumber")
	protected String OHContractNumber;
	@Column(name = "OHOrderNumberOfBuyer", nullable = false)
	protected String OHOrderNumberOfBuyer;
	@Column(name = "OHOrderDate", nullable = false)
	protected Date OHOrderDate;
	@Column(name = "OHRemark")
	protected String OHRemark;
	@Column(name = "OHPaymentPeriodBuyer", nullable = false)
	protected Date OHPaymentPeriodBuyer;
	@Column(name = "OHBankLetterOfCredit")
	protected int OHBankLetterOfCredit;
	@Column(name = "OHDeletedStatus")
	protected String OHDeletedStatus;
	@Column(name = "OHCompletionStatus")
	protected String OHCompletionStatus;
	@Column(name = "OHPrintingStatus")
	protected String OHPrintingStatus;
	@Column(name = "OHConverted")
	protected String OHConverted;
	@Column(name = "OHShopId")
	protected String OHShopId;
	@Column(name = "OHShopIdOrderId")
	protected String OHShopIdOrderId;
	@Column(name = "OHOrderId")
	protected String OHOrderId;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="employee")
    protected EmployeeBean employee;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taskType")
    protected TaskTypeBean taskType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="deliveryMethod")
    protected IdentificationBean deliveryMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderCategory")
    protected OrderCategoryBean orderCategory;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="customer")
    protected CustomerBean customer;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentMethod")
    protected PaymentMethodBean paymentMethod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentCondition")
    protected PaymentConditionBean paymentCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="urgentStatus")
    protected UrgentStatusBean urgentStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="specialProject")
    protected SpecialProjectBean specialProject;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="denotationMethod")
    protected DenotationMethodBean denotationMethod;
    @OneToMany(mappedBy = "orderHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocument = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "orderHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProductionBean> requestForProduction = new HashSet<RequestForProductionBean>();
    @OneToMany(mappedBy = "orderHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderGroupBean> orderGroups = new HashSet<OrderGroupBean>();
    @OneToMany(mappedBy = "orderHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "orderHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proformaInvoices = new HashSet<ProFormaInvoiceBean>();

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

    @JsonProperty("OHDocumentNumber")
	public int getOHDocumentNumber() {
		return OHDocumentNumber;
	}

	public void setOHDocumentNumber(int OHDocumentNumber) {
		this.OHDocumentNumber = OHDocumentNumber;
	}

    @JsonProperty("OHCreationDate")
	public Date getOHCreationDate() {
		return OHCreationDate;
	}

	public void setOHCreationDate(Date OHCreationDate) {
		this.OHCreationDate = OHCreationDate;
	}

    @JsonProperty("OHContractNumber")
	public String getOHContractNumber() {
		return OHContractNumber;
	}

	public void setOHContractNumber(String OHContractNumber) {
		this.OHContractNumber = OHContractNumber;
	}

    @JsonProperty("OHOrderNumberOfBuyer")
	public String getOHOrderNumberOfBuyer() {
		return OHOrderNumberOfBuyer;
	}

	public void setOHOrderNumberOfBuyer(String OHOrderNumberOfBuyer) {
		this.OHOrderNumberOfBuyer = OHOrderNumberOfBuyer;
	}

    @JsonProperty("OHOrderDate")
	public Date getOHOrderDate() {
		return OHOrderDate;
	}

	public void setOHOrderDate(Date OHOrderDate) {
		this.OHOrderDate = OHOrderDate;
	}

    @JsonProperty("OHRemark")
	public String getOHRemark() {
		return OHRemark;
	}

	public void setOHRemark(String OHRemark) {
		this.OHRemark = OHRemark;
	}

    @JsonProperty("OHPaymentPeriodBuyer")
	public Date getOHPaymentPeriodBuyer() {
		return OHPaymentPeriodBuyer;
	}

	public void setOHPaymentPeriodBuyer(Date OHPaymentPeriodBuyer) {
		this.OHPaymentPeriodBuyer = OHPaymentPeriodBuyer;
	}

    @JsonProperty("OHBankLetterOfCredit")
	public int getOHBankLetterOfCredit() {
		return OHBankLetterOfCredit;
	}

	public void setOHBankLetterOfCredit(int OHBankLetterOfCredit) {
		this.OHBankLetterOfCredit = OHBankLetterOfCredit;
	}

    @JsonProperty("OHDeletedStatus")
	public String getOHDeletedStatus() {
		return OHDeletedStatus;
	}

	public void setOHDeletedStatus(String OHDeletedStatus) {
		this.OHDeletedStatus = OHDeletedStatus;
	}

    @JsonProperty("OHCompletionStatus")
	public String getOHCompletionStatus() {
		return OHCompletionStatus;
	}

	public void setOHCompletionStatus(String OHCompletionStatus) {
		this.OHCompletionStatus = OHCompletionStatus;
	}

    @JsonProperty("OHPrintingStatus")
	public String getOHPrintingStatus() {
		return OHPrintingStatus;
	}

	public void setOHPrintingStatus(String OHPrintingStatus) {
		this.OHPrintingStatus = OHPrintingStatus;
	}

    @JsonProperty("OHConverted")
	public String getOHConverted() {
		return OHConverted;
	}

	public void setOHConverted(String OHConverted) {
		this.OHConverted = OHConverted;
	}

    @JsonProperty("OHShopId")
	public String getOHShopId() {
		return OHShopId;
	}

	public void setOHShopId(String OHShopId) {
		this.OHShopId = OHShopId;
	}

    @JsonProperty("OHShopIdOrderId")
	public String getOHShopIdOrderId() {
		return OHShopIdOrderId;
	}

	public void setOHShopIdOrderId(String OHShopIdOrderId) {
		this.OHShopIdOrderId = OHShopIdOrderId;
	}

    @JsonProperty("OHOrderId")
	public String getOHOrderId() {
		return OHOrderId;
	}

	public void setOHOrderId(String OHOrderId) {
		this.OHOrderId = OHOrderId;
	}


    @JsonProperty("employee")
	public EmployeeBean getEmployee() {
		return employee;
	}

    public void setEmployee(EmployeeBean employee) {
		this.employee = employee;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("taskType")
	public TaskTypeBean getTaskType() {
		return taskType;
	}

    public void setTaskType(TaskTypeBean taskType) {
		this.taskType = taskType;
	}

    @JsonProperty("deliveryMethod")
	public IdentificationBean getDeliveryMethod() {
		return deliveryMethod;
	}

    public void setDeliveryMethod(IdentificationBean deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

    @JsonProperty("orderCategory")
	public OrderCategoryBean getOrderCategory() {
		return orderCategory;
	}

    public void setOrderCategory(OrderCategoryBean orderCategory) {
		this.orderCategory = orderCategory;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("customer")
	public CustomerBean getCustomer() {
		return customer;
	}

    public void setCustomer(CustomerBean customer) {
		this.customer = customer;
	}

    @JsonProperty("paymentMethod")
	public PaymentMethodBean getPaymentMethod() {
		return paymentMethod;
	}

    public void setPaymentMethod(PaymentMethodBean paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("paymentCondition")
	public PaymentConditionBean getPaymentCondition() {
		return paymentCondition;
	}

    public void setPaymentCondition(PaymentConditionBean paymentCondition) {
		this.paymentCondition = paymentCondition;
	}

    @JsonProperty("urgentStatus")
	public UrgentStatusBean getUrgentStatus() {
		return urgentStatus;
	}

    public void setUrgentStatus(UrgentStatusBean urgentStatus) {
		this.urgentStatus = urgentStatus;
	}

    @JsonProperty("specialProject")
	public SpecialProjectBean getSpecialProject() {
		return specialProject;
	}

    public void setSpecialProject(SpecialProjectBean specialProject) {
		this.specialProject = specialProject;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("denotationMethod")
	public DenotationMethodBean getDenotationMethod() {
		return denotationMethod;
	}

    public void setDenotationMethod(DenotationMethodBean denotationMethod) {
		this.denotationMethod = denotationMethod;
	}

    @JsonProperty("shippingDocument")
	public Set<ShippingDocumentBean> getShippingDocument() {
		return shippingDocument;
	}

	public void setShippingDocument(Set<ShippingDocumentBean> shippingDocument) {
		this.shippingDocument = shippingDocument;
	}

    @JsonProperty("requestForProduction")
	public Set<RequestForProductionBean> getRequestForProduction() {
		return requestForProduction;
	}

	public void setRequestForProduction(Set<RequestForProductionBean> requestForProduction) {
		this.requestForProduction = requestForProduction;
	}

    @JsonProperty("orderGroups")
	public Set<OrderGroupBean> getOrderGroups() {
		return orderGroups;
	}

	public void setOrderGroups(Set<OrderGroupBean> orderGroups) {
		this.orderGroups = orderGroups;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("proformaInvoices")
	public Set<ProFormaInvoiceBean> getProformaInvoices() {
		return proformaInvoices;
	}

	public void setProformaInvoices(Set<ProFormaInvoiceBean> proformaInvoices) {
		this.proformaInvoices = proformaInvoices;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OrderHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OrderHeadingBean) o).getId()));
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
		return "OrderHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OHDocumentNumber=" + OHDocumentNumber
			+ ", OHCreationDate=" + OHCreationDate
			+ ", OHContractNumber=" + OHContractNumber
			+ ", OHOrderNumberOfBuyer=" + OHOrderNumberOfBuyer
			+ ", OHOrderDate=" + OHOrderDate
			+ ", OHRemark=" + OHRemark
			+ ", OHPaymentPeriodBuyer=" + OHPaymentPeriodBuyer
			+ ", OHBankLetterOfCredit=" + OHBankLetterOfCredit
			+ ", OHDeletedStatus=" + OHDeletedStatus
			+ ", OHCompletionStatus=" + OHCompletionStatus
			+ ", OHPrintingStatus=" + OHPrintingStatus
			+ ", OHConverted=" + OHConverted
			+ ", OHShopId=" + OHShopId
			+ ", OHShopIdOrderId=" + OHShopIdOrderId
			+ ", OHOrderId=" + OHOrderId
			// + ", employee=" + employee
			// + ", currency=" + currency
			// + ", taskType=" + taskType
			// + ", deliveryMethod=" + deliveryMethod
			// + ", orderCategory=" + orderCategory
			// + ", organizationUnit=" + organizationUnit
			// + ", customer=" + customer
			// + ", paymentMethod=" + paymentMethod
			// + ", documentType=" + documentType
			// + ", paymentCondition=" + paymentCondition
			// + ", urgentStatus=" + urgentStatus
			// + ", specialProject=" + specialProject
			// + ", identification=" + identification
			// + ", denotationMethod=" + denotationMethod
			// + ", shippingDocument=" + shippingDocument
			// + ", requestForProduction=" + requestForProduction
			// + ", orderGroups=" + orderGroups
			// + ", invoices=" + invoices
			// + ", proformaInvoices=" + proformaInvoices
			+ "]";
	}
}