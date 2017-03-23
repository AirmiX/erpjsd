package com.doobgroup.server.entities.productionrequest;

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
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.initialization.TaskTypeBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionItemBean;

@Entity
@Table(name = "REQUESTFORPRODUCTION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RFPDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE REQUESTFORPRODUCTION SET deleted = 1 WHERE RequestForProduction_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RequestForProductionBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RequestForProduction_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RFPDocumentNumber", nullable = false)
	protected int RFPDocumentNumber;
	@Column(name = "RFPCreationDate", nullable = false)
	protected Date RFPCreationDate;
	@Column(name = "RFPRemark")
	protected String RFPRemark;
	@Column(name = "RFPPrintStatus")
	protected int RFPPrintStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderHeading")
    protected OrderHeadingBean orderHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taskType")
    protected TaskTypeBean taskType;
    @OneToMany(mappedBy = "requestForProduction", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
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

    @JsonProperty("RFPDocumentNumber")
	public int getRFPDocumentNumber() {
		return RFPDocumentNumber;
	}

	public void setRFPDocumentNumber(int RFPDocumentNumber) {
		this.RFPDocumentNumber = RFPDocumentNumber;
	}

    @JsonProperty("RFPCreationDate")
	public Date getRFPCreationDate() {
		return RFPCreationDate;
	}

	public void setRFPCreationDate(Date RFPCreationDate) {
		this.RFPCreationDate = RFPCreationDate;
	}

    @JsonProperty("RFPRemark")
	public String getRFPRemark() {
		return RFPRemark;
	}

	public void setRFPRemark(String RFPRemark) {
		this.RFPRemark = RFPRemark;
	}

    @JsonProperty("RFPPrintStatus")
	public int getRFPPrintStatus() {
		return RFPPrintStatus;
	}

	public void setRFPPrintStatus(int RFPPrintStatus) {
		this.RFPPrintStatus = RFPPrintStatus;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("orderHeading")
	public OrderHeadingBean getOrderHeading() {
		return orderHeading;
	}

    public void setOrderHeading(OrderHeadingBean orderHeading) {
		this.orderHeading = orderHeading;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
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
		if (o == null || !(o instanceof RequestForProductionBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RequestForProductionBean) o).getId()));
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
		return "RequestForProductionBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RFPDocumentNumber=" + RFPDocumentNumber
			+ ", RFPCreationDate=" + RFPCreationDate
			+ ", RFPRemark=" + RFPRemark
			+ ", RFPPrintStatus=" + RFPPrintStatus
			// + ", organizationUnit=" + organizationUnit
			// + ", orderHeading=" + orderHeading
			// + ", documentType=" + documentType
			// + ", currency=" + currency
			// + ", taskType=" + taskType
			// + ", requestForProductionItem=" + requestForProductionItem
			+ "]";
	}
}