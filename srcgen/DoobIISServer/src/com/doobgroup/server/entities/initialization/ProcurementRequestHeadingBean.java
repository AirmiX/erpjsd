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

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestItemBean;

@Entity
@Table(name = "PROCUREMENTREQUESTHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PRHCode"  	}))
@SQLDelete(sql="UPDATE PROCUREMENTREQUESTHEADING SET deleted = 1 WHERE ProcurementRequestHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProcurementRequestHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProcurementRequestHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PRHCode", nullable = false)
	protected int PRHCode;
	@Column(name = "PRHCreationDate", nullable = false)
	protected Date PRHCreationDate;
	@Column(name = "PRHAdmissionDate")
	protected Date PRHAdmissionDate;
	@Column(name = "PRHRemark")
	protected String PRHRemark;
	@Column(name = "PRHPrintingStatus")
	protected String PRHPrintingStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workOrder")
    protected WorkOrderBean workOrder;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @OneToMany(mappedBy = "procurementRequestHeader", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestItemBean> procurementRequestitems = new HashSet<ProcurementRequestItemBean>();

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

    @JsonProperty("PRHCode")
	public int getPRHCode() {
		return PRHCode;
	}

	public void setPRHCode(int PRHCode) {
		this.PRHCode = PRHCode;
	}

    @JsonProperty("PRHCreationDate")
	public Date getPRHCreationDate() {
		return PRHCreationDate;
	}

	public void setPRHCreationDate(Date PRHCreationDate) {
		this.PRHCreationDate = PRHCreationDate;
	}

    @JsonProperty("PRHAdmissionDate")
	public Date getPRHAdmissionDate() {
		return PRHAdmissionDate;
	}

	public void setPRHAdmissionDate(Date PRHAdmissionDate) {
		this.PRHAdmissionDate = PRHAdmissionDate;
	}

    @JsonProperty("PRHRemark")
	public String getPRHRemark() {
		return PRHRemark;
	}

	public void setPRHRemark(String PRHRemark) {
		this.PRHRemark = PRHRemark;
	}

    @JsonProperty("PRHPrintingStatus")
	public String getPRHPrintingStatus() {
		return PRHPrintingStatus;
	}

	public void setPRHPrintingStatus(String PRHPrintingStatus) {
		this.PRHPrintingStatus = PRHPrintingStatus;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("workOrder")
	public WorkOrderBean getWorkOrder() {
		return workOrder;
	}

    public void setWorkOrder(WorkOrderBean workOrder) {
		this.workOrder = workOrder;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("procurementRequestitems")
	public Set<ProcurementRequestItemBean> getProcurementRequestitems() {
		return procurementRequestitems;
	}

	public void setProcurementRequestitems(Set<ProcurementRequestItemBean> procurementRequestitems) {
		this.procurementRequestitems = procurementRequestitems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProcurementRequestHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProcurementRequestHeadingBean) o).getId()));
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
		return "ProcurementRequestHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PRHCode=" + PRHCode
			+ ", PRHCreationDate=" + PRHCreationDate
			+ ", PRHAdmissionDate=" + PRHAdmissionDate
			+ ", PRHRemark=" + PRHRemark
			+ ", PRHPrintingStatus=" + PRHPrintingStatus
			// + ", organizationUnit=" + organizationUnit
			// + ", workOrder=" + workOrder
			// + ", documentType=" + documentType
			// + ", procurementRequestitems=" + procurementRequestitems
			+ "]";
	}
}