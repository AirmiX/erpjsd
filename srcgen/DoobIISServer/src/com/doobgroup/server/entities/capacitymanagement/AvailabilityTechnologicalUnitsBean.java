package com.doobgroup.server.entities.capacitymanagement;

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
import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;

@Entity
@Table(name = "AVAILABILITYTECHNOLOGICALUNITS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "ATUOrdinalNumber"  ,  "technologicalUnit"  	}))
@SQLDelete(sql="UPDATE AVAILABILITYTECHNOLOGICALUNITS SET deleted = 1 WHERE AvailabilityTechnologicalUnits_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AvailabilityTechnologicalUnitsBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "AvailabilityTechnologicalUnits_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "ATUOrdinalNumber", nullable = false)
	protected int ATUOrdinalNumber;
	@Column(name = "ATUStartDate", nullable = false)
	protected Date ATUStartDate;
	@Column(name = "ATUEndDate")
	protected Date ATUEndDate;
	@Column(name = "ATUCapacityChange", nullable = false)
	protected int ATUCapacityChange;
	@Column(name = "ATUHoldupReason")
	protected String ATUHoldupReason;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="employee")
    protected EmployeeBean employee;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="technologicalUnit")
    protected TechnologicalUnitBean technologicalUnit;

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

    @JsonProperty("ATUOrdinalNumber")
	public int getATUOrdinalNumber() {
		return ATUOrdinalNumber;
	}

	public void setATUOrdinalNumber(int ATUOrdinalNumber) {
		this.ATUOrdinalNumber = ATUOrdinalNumber;
	}

    @JsonProperty("ATUStartDate")
	public Date getATUStartDate() {
		return ATUStartDate;
	}

	public void setATUStartDate(Date ATUStartDate) {
		this.ATUStartDate = ATUStartDate;
	}

    @JsonProperty("ATUEndDate")
	public Date getATUEndDate() {
		return ATUEndDate;
	}

	public void setATUEndDate(Date ATUEndDate) {
		this.ATUEndDate = ATUEndDate;
	}

    @JsonProperty("ATUCapacityChange")
	public int getATUCapacityChange() {
		return ATUCapacityChange;
	}

	public void setATUCapacityChange(int ATUCapacityChange) {
		this.ATUCapacityChange = ATUCapacityChange;
	}

    @JsonProperty("ATUHoldupReason")
	public String getATUHoldupReason() {
		return ATUHoldupReason;
	}

	public void setATUHoldupReason(String ATUHoldupReason) {
		this.ATUHoldupReason = ATUHoldupReason;
	}


    @JsonProperty("employee")
	public EmployeeBean getEmployee() {
		return employee;
	}

    public void setEmployee(EmployeeBean employee) {
		this.employee = employee;
	}

    @JsonProperty("technologicalUnit")
	public TechnologicalUnitBean getTechnologicalUnit() {
		return technologicalUnit;
	}

    public void setTechnologicalUnit(TechnologicalUnitBean technologicalUnit) {
		this.technologicalUnit = technologicalUnit;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof AvailabilityTechnologicalUnitsBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AvailabilityTechnologicalUnitsBean) o).getId()));
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
		return "AvailabilityTechnologicalUnitsBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", ATUOrdinalNumber=" + ATUOrdinalNumber
			+ ", ATUStartDate=" + ATUStartDate
			+ ", ATUEndDate=" + ATUEndDate
			+ ", ATUCapacityChange=" + ATUCapacityChange
			+ ", ATUHoldupReason=" + ATUHoldupReason
			// + ", employee=" + employee
			// + ", technologicalUnit=" + technologicalUnit
			+ "]";
	}
}