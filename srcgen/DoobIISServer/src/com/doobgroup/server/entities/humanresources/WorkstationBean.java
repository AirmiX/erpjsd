package com.doobgroup.server.entities.humanresources;

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
import com.doobgroup.server.entities.humanresources.JobCatalogBean;
import com.doobgroup.server.entities.humanresources.WorkstationDescriptionBean;
import com.doobgroup.server.entities.humanresources.WorkstationDemandBean;
import com.doobgroup.server.entities.corporation.EmployeeBean;

@Entity
@Table(name = "WORKSTATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "WOrdinalNumber"  ,  "organizationUnit"  	}))
@SQLDelete(sql="UPDATE WORKSTATION SET deleted = 1 WHERE Workstation_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class WorkstationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Workstation_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "WOrdinalNumber", nullable = false)
	protected int WOrdinalNumber;
	@Column(name = "WName", nullable = false)
	protected String WName;
	@Column(name = "WNumberOfPerformers", nullable = false)
	protected int WNumberOfPerformers;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="job")
    protected JobCatalogBean job;
    @OneToMany(mappedBy = "workstation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkstationDescriptionBean> workstationDescriptions = new HashSet<WorkstationDescriptionBean>();
    @OneToMany(mappedBy = "workstation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkstationDemandBean> workstationDemands = new HashSet<WorkstationDemandBean>();
    @OneToMany(mappedBy = "workstation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<EmployeeBean> employees = new HashSet<EmployeeBean>();

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

    @JsonProperty("WOrdinalNumber")
	public int getWOrdinalNumber() {
		return WOrdinalNumber;
	}

	public void setWOrdinalNumber(int WOrdinalNumber) {
		this.WOrdinalNumber = WOrdinalNumber;
	}

    @JsonProperty("WName")
	public String getWName() {
		return WName;
	}

	public void setWName(String WName) {
		this.WName = WName;
	}

    @JsonProperty("WNumberOfPerformers")
	public int getWNumberOfPerformers() {
		return WNumberOfPerformers;
	}

	public void setWNumberOfPerformers(int WNumberOfPerformers) {
		this.WNumberOfPerformers = WNumberOfPerformers;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("job")
	public JobCatalogBean getJob() {
		return job;
	}

    public void setJob(JobCatalogBean job) {
		this.job = job;
	}

    @JsonProperty("workstationDescriptions")
	public Set<WorkstationDescriptionBean> getWorkstationDescriptions() {
		return workstationDescriptions;
	}

	public void setWorkstationDescriptions(Set<WorkstationDescriptionBean> workstationDescriptions) {
		this.workstationDescriptions = workstationDescriptions;
	}

    @JsonProperty("workstationDemands")
	public Set<WorkstationDemandBean> getWorkstationDemands() {
		return workstationDemands;
	}

	public void setWorkstationDemands(Set<WorkstationDemandBean> workstationDemands) {
		this.workstationDemands = workstationDemands;
	}

    @JsonProperty("employees")
	public Set<EmployeeBean> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<EmployeeBean> employees) {
		this.employees = employees;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof WorkstationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((WorkstationBean) o).getId()));
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
		return "WorkstationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", WOrdinalNumber=" + WOrdinalNumber
			+ ", WName=" + WName
			+ ", WNumberOfPerformers=" + WNumberOfPerformers
			// + ", organizationUnit=" + organizationUnit
			// + ", job=" + job
			// + ", workstationDescriptions=" + workstationDescriptions
			// + ", workstationDemands=" + workstationDemands
			// + ", employees=" + employees
			+ "]";
	}
}