package com.doobgroup.server.entities.stockmanagement;

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
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.stockmanagement.RequestForProposalItemBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;

@Entity
@Table(name = "REQUESTFORPROPOSALHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RFPHNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE REQUESTFORPROPOSALHEADING SET deleted = 1 WHERE RequestForProposalHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RequestForProposalHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RequestForProposalHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RFPHNumber", nullable = false)
	protected int RFPHNumber;
	@Column(name = "RFPHIssueDate", nullable = false)
	protected Date RFPHIssueDate;
	@Column(name = "RFPHResponseDeadline", nullable = false)
	protected Date RFPHResponseDeadline;
	@Column(name = "RFPHOrganizationPart")
	protected String RFPHOrganizationPart;
	@Column(name = "RFPHResponsiblePerson")
	protected String RFPHResponsiblePerson;
	@Column(name = "RFPHPhoneNumber")
	protected String RFPHPhoneNumber;
	@Column(name = "RFPHStatus", nullable = false)
	protected String RFPHStatus;
	@Column(name = "RFPHRemark")
	protected String RFPHRemark;
	@Column(name = "RFPHPrintStatus")
	protected String RFPHPrintStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @OneToMany(mappedBy = "rfpHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequestForProposalItemBean> rfpItems = new HashSet<RequestForProposalItemBean>();
    @OneToMany(mappedBy = "rfpHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();

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

    @JsonProperty("RFPHNumber")
	public int getRFPHNumber() {
		return RFPHNumber;
	}

	public void setRFPHNumber(int RFPHNumber) {
		this.RFPHNumber = RFPHNumber;
	}

    @JsonProperty("RFPHIssueDate")
	public Date getRFPHIssueDate() {
		return RFPHIssueDate;
	}

	public void setRFPHIssueDate(Date RFPHIssueDate) {
		this.RFPHIssueDate = RFPHIssueDate;
	}

    @JsonProperty("RFPHResponseDeadline")
	public Date getRFPHResponseDeadline() {
		return RFPHResponseDeadline;
	}

	public void setRFPHResponseDeadline(Date RFPHResponseDeadline) {
		this.RFPHResponseDeadline = RFPHResponseDeadline;
	}

    @JsonProperty("RFPHOrganizationPart")
	public String getRFPHOrganizationPart() {
		return RFPHOrganizationPart;
	}

	public void setRFPHOrganizationPart(String RFPHOrganizationPart) {
		this.RFPHOrganizationPart = RFPHOrganizationPart;
	}

    @JsonProperty("RFPHResponsiblePerson")
	public String getRFPHResponsiblePerson() {
		return RFPHResponsiblePerson;
	}

	public void setRFPHResponsiblePerson(String RFPHResponsiblePerson) {
		this.RFPHResponsiblePerson = RFPHResponsiblePerson;
	}

    @JsonProperty("RFPHPhoneNumber")
	public String getRFPHPhoneNumber() {
		return RFPHPhoneNumber;
	}

	public void setRFPHPhoneNumber(String RFPHPhoneNumber) {
		this.RFPHPhoneNumber = RFPHPhoneNumber;
	}

    @JsonProperty("RFPHStatus")
	public String getRFPHStatus() {
		return RFPHStatus;
	}

	public void setRFPHStatus(String RFPHStatus) {
		this.RFPHStatus = RFPHStatus;
	}

    @JsonProperty("RFPHRemark")
	public String getRFPHRemark() {
		return RFPHRemark;
	}

	public void setRFPHRemark(String RFPHRemark) {
		this.RFPHRemark = RFPHRemark;
	}

    @JsonProperty("RFPHPrintStatus")
	public String getRFPHPrintStatus() {
		return RFPHPrintStatus;
	}

	public void setRFPHPrintStatus(String RFPHPrintStatus) {
		this.RFPHPrintStatus = RFPHPrintStatus;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("rfpItems")
	public Set<RequestForProposalItemBean> getRfpItems() {
		return rfpItems;
	}

	public void setRfpItems(Set<RequestForProposalItemBean> rfpItems) {
		this.rfpItems = rfpItems;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RequestForProposalHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RequestForProposalHeadingBean) o).getId()));
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
		return "RequestForProposalHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RFPHNumber=" + RFPHNumber
			+ ", RFPHIssueDate=" + RFPHIssueDate
			+ ", RFPHResponseDeadline=" + RFPHResponseDeadline
			+ ", RFPHOrganizationPart=" + RFPHOrganizationPart
			+ ", RFPHResponsiblePerson=" + RFPHResponsiblePerson
			+ ", RFPHPhoneNumber=" + RFPHPhoneNumber
			+ ", RFPHStatus=" + RFPHStatus
			+ ", RFPHRemark=" + RFPHRemark
			+ ", RFPHPrintStatus=" + RFPHPrintStatus
			// + ", organizationUnit=" + organizationUnit
			// + ", documentType=" + documentType
			// + ", rfpItems=" + rfpItems
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			+ "]";
	}
}