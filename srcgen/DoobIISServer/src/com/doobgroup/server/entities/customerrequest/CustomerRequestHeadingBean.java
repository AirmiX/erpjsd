package com.doobgroup.server.entities.customerrequest;

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

import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.initialization.UrgentStatusBean;
import com.doobgroup.server.entities.initialization.TaskTypeBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;

@Entity
@Table(name = "CUSTOMERREQUESTHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CRHDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE CUSTOMERREQUESTHEADING SET deleted = 1 WHERE CustomerRequestHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class CustomerRequestHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CustomerRequestHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CRHDocumentNumber", nullable = false)
	protected int CRHDocumentNumber;
	@Column(name = "CRHRegistrationDate", nullable = false)
	protected Date CRHRegistrationDate;
	@Column(name = "CRHSignNumberCustomerInquiry", nullable = false)
	protected String CRHSignNumberCustomerInquiry;
	@Column(name = "CRHInquiryDate", nullable = false)
	protected Date CRHInquiryDate;
	@Column(name = "CRHCustomerOrgUnit")
	protected String CRHCustomerOrgUnit;
	@Column(name = "CRHCustomerContactPerson")
	protected String CRHCustomerContactPerson;
	@Column(name = "CRHCustomerPhoneNumber")
	protected String CRHCustomerPhoneNumber;
	@Column(name = "CRHRemark")
	protected String CRHRemark;
	@Column(name = "CRHDeletedStatus")
	protected char CRHDeletedStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification1")
    protected IdentificationBean identification1;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="urgentStatus")
    protected UrgentStatusBean urgentStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taskType")
    protected TaskTypeBean taskType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @OneToMany(mappedBy = "customerRequestHeader", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestItemBean> customerRequestItems = new HashSet<CustomerRequestItemBean>();

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

    @JsonProperty("CRHDocumentNumber")
	public int getCRHDocumentNumber() {
		return CRHDocumentNumber;
	}

	public void setCRHDocumentNumber(int CRHDocumentNumber) {
		this.CRHDocumentNumber = CRHDocumentNumber;
	}

    @JsonProperty("CRHRegistrationDate")
	public Date getCRHRegistrationDate() {
		return CRHRegistrationDate;
	}

	public void setCRHRegistrationDate(Date CRHRegistrationDate) {
		this.CRHRegistrationDate = CRHRegistrationDate;
	}

    @JsonProperty("CRHSignNumberCustomerInquiry")
	public String getCRHSignNumberCustomerInquiry() {
		return CRHSignNumberCustomerInquiry;
	}

	public void setCRHSignNumberCustomerInquiry(String CRHSignNumberCustomerInquiry) {
		this.CRHSignNumberCustomerInquiry = CRHSignNumberCustomerInquiry;
	}

    @JsonProperty("CRHInquiryDate")
	public Date getCRHInquiryDate() {
		return CRHInquiryDate;
	}

	public void setCRHInquiryDate(Date CRHInquiryDate) {
		this.CRHInquiryDate = CRHInquiryDate;
	}

    @JsonProperty("CRHCustomerOrgUnit")
	public String getCRHCustomerOrgUnit() {
		return CRHCustomerOrgUnit;
	}

	public void setCRHCustomerOrgUnit(String CRHCustomerOrgUnit) {
		this.CRHCustomerOrgUnit = CRHCustomerOrgUnit;
	}

    @JsonProperty("CRHCustomerContactPerson")
	public String getCRHCustomerContactPerson() {
		return CRHCustomerContactPerson;
	}

	public void setCRHCustomerContactPerson(String CRHCustomerContactPerson) {
		this.CRHCustomerContactPerson = CRHCustomerContactPerson;
	}

    @JsonProperty("CRHCustomerPhoneNumber")
	public String getCRHCustomerPhoneNumber() {
		return CRHCustomerPhoneNumber;
	}

	public void setCRHCustomerPhoneNumber(String CRHCustomerPhoneNumber) {
		this.CRHCustomerPhoneNumber = CRHCustomerPhoneNumber;
	}

    @JsonProperty("CRHRemark")
	public String getCRHRemark() {
		return CRHRemark;
	}

	public void setCRHRemark(String CRHRemark) {
		this.CRHRemark = CRHRemark;
	}

    @JsonProperty("CRHDeletedStatus")
	public char getCRHDeletedStatus() {
		return CRHDeletedStatus;
	}

	public void setCRHDeletedStatus(char CRHDeletedStatus) {
		this.CRHDeletedStatus = CRHDeletedStatus;
	}


    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("identification1")
	public IdentificationBean getIdentification1() {
		return identification1;
	}

    public void setIdentification1(IdentificationBean identification1) {
		this.identification1 = identification1;
	}

    @JsonProperty("urgentStatus")
	public UrgentStatusBean getUrgentStatus() {
		return urgentStatus;
	}

    public void setUrgentStatus(UrgentStatusBean urgentStatus) {
		this.urgentStatus = urgentStatus;
	}

    @JsonProperty("taskType")
	public TaskTypeBean getTaskType() {
		return taskType;
	}

    public void setTaskType(TaskTypeBean taskType) {
		this.taskType = taskType;
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

    @JsonProperty("customerRequestItems")
	public Set<CustomerRequestItemBean> getCustomerRequestItems() {
		return customerRequestItems;
	}

	public void setCustomerRequestItems(Set<CustomerRequestItemBean> customerRequestItems) {
		this.customerRequestItems = customerRequestItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof CustomerRequestHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((CustomerRequestHeadingBean) o).getId()));
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
		return "CustomerRequestHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CRHDocumentNumber=" + CRHDocumentNumber
			+ ", CRHRegistrationDate=" + CRHRegistrationDate
			+ ", CRHSignNumberCustomerInquiry=" + CRHSignNumberCustomerInquiry
			+ ", CRHInquiryDate=" + CRHInquiryDate
			+ ", CRHCustomerOrgUnit=" + CRHCustomerOrgUnit
			+ ", CRHCustomerContactPerson=" + CRHCustomerContactPerson
			+ ", CRHCustomerPhoneNumber=" + CRHCustomerPhoneNumber
			+ ", CRHRemark=" + CRHRemark
			+ ", CRHDeletedStatus=" + CRHDeletedStatus
			// + ", documentType=" + documentType
			// + ", identification1=" + identification1
			// + ", urgentStatus=" + urgentStatus
			// + ", taskType=" + taskType
			// + ", identification=" + identification
			// + ", currency=" + currency
			// + ", customerRequestItems=" + customerRequestItems
			+ "]";
	}
}