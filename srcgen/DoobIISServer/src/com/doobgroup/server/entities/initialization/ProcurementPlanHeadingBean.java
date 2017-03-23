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

import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.procurementplan.PlanningPeriodBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.initialization.ProcurementPlanItemBean;

@Entity
@Table(name = "PROCUREMENTPLANHEADING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PPHDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE PROCUREMENTPLANHEADING SET deleted = 1 WHERE ProcurementPlanHeading_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProcurementPlanHeadingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProcurementPlanHeading_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPHDocumentNumber", nullable = false)
	protected int PPHDocumentNumber;
	@Column(name = "PPHPlanningDate", nullable = false)
	protected Date PPHPlanningDate;
	@Column(name = "PPHPlanVersion", nullable = false)
	protected String PPHPlanVersion;
	@Column(name = "PPHPrintingStatus")
	protected String PPHPrintingStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="planningPeriod")
    protected PlanningPeriodBean planningPeriod;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @OneToMany(mappedBy = "procurementPlanHeading", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementPlanItemBean> procurementPlanItems = new HashSet<ProcurementPlanItemBean>();

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

    @JsonProperty("PPHDocumentNumber")
	public int getPPHDocumentNumber() {
		return PPHDocumentNumber;
	}

	public void setPPHDocumentNumber(int PPHDocumentNumber) {
		this.PPHDocumentNumber = PPHDocumentNumber;
	}

    @JsonProperty("PPHPlanningDate")
	public Date getPPHPlanningDate() {
		return PPHPlanningDate;
	}

	public void setPPHPlanningDate(Date PPHPlanningDate) {
		this.PPHPlanningDate = PPHPlanningDate;
	}

    @JsonProperty("PPHPlanVersion")
	public String getPPHPlanVersion() {
		return PPHPlanVersion;
	}

	public void setPPHPlanVersion(String PPHPlanVersion) {
		this.PPHPlanVersion = PPHPlanVersion;
	}

    @JsonProperty("PPHPrintingStatus")
	public String getPPHPrintingStatus() {
		return PPHPrintingStatus;
	}

	public void setPPHPrintingStatus(String PPHPrintingStatus) {
		this.PPHPrintingStatus = PPHPrintingStatus;
	}


    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("planningPeriod")
	public PlanningPeriodBean getPlanningPeriod() {
		return planningPeriod;
	}

    public void setPlanningPeriod(PlanningPeriodBean planningPeriod) {
		this.planningPeriod = planningPeriod;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("procurementPlanItems")
	public Set<ProcurementPlanItemBean> getProcurementPlanItems() {
		return procurementPlanItems;
	}

	public void setProcurementPlanItems(Set<ProcurementPlanItemBean> procurementPlanItems) {
		this.procurementPlanItems = procurementPlanItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProcurementPlanHeadingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProcurementPlanHeadingBean) o).getId()));
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
		return "ProcurementPlanHeadingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPHDocumentNumber=" + PPHDocumentNumber
			+ ", PPHPlanningDate=" + PPHPlanningDate
			+ ", PPHPlanVersion=" + PPHPlanVersion
			+ ", PPHPrintingStatus=" + PPHPrintingStatus
			// + ", documentType=" + documentType
			// + ", planningPeriod=" + planningPeriod
			// + ", organizationUnit=" + organizationUnit
			// + ", procurementPlanItems=" + procurementPlanItems
			+ "]";
	}
}