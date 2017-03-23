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

import com.doobgroup.server.entities.corporation.EmployeeBean;

@Entity
@Table(name = "FAMILYMEMBER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "employee"  	}))
@SQLDelete(sql="UPDATE FAMILYMEMBER SET deleted = 1 WHERE FamilyMember_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class FamilyMemberBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "FamilyMember_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "FMOrdinalNumber", nullable = false)
	protected int FMOrdinalNumber;
	@Column(name = "FMRelationship", nullable = false)
	protected String FMRelationship;
	@Column(name = "FMName", nullable = false)
	protected String FMName;
	@Column(name = "FMLastName", nullable = false)
	protected String FMLastName;
	@Column(name = "FMDateOfBirth", nullable = false)
	protected Date FMDateOfBirth;
	@Column(name = "FMEmployment", nullable = false)
	protected Boolean FMEmployment;
	@Column(name = "FMIsDependent", nullable = false)
	protected Boolean FMIsDependent;
	@Column(name = "FMHealthCard")
	protected String FMHealthCard;
	@Column(name = "FMInsurance", nullable = false)
	protected Boolean FMInsurance;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="employee")
    protected EmployeeBean employee;

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

    @JsonProperty("FMOrdinalNumber")
	public int getFMOrdinalNumber() {
		return FMOrdinalNumber;
	}

	public void setFMOrdinalNumber(int FMOrdinalNumber) {
		this.FMOrdinalNumber = FMOrdinalNumber;
	}

    @JsonProperty("FMRelationship")
	public String getFMRelationship() {
		return FMRelationship;
	}

	public void setFMRelationship(String FMRelationship) {
		this.FMRelationship = FMRelationship;
	}

    @JsonProperty("FMName")
	public String getFMName() {
		return FMName;
	}

	public void setFMName(String FMName) {
		this.FMName = FMName;
	}

    @JsonProperty("FMLastName")
	public String getFMLastName() {
		return FMLastName;
	}

	public void setFMLastName(String FMLastName) {
		this.FMLastName = FMLastName;
	}

    @JsonProperty("FMDateOfBirth")
	public Date getFMDateOfBirth() {
		return FMDateOfBirth;
	}

	public void setFMDateOfBirth(Date FMDateOfBirth) {
		this.FMDateOfBirth = FMDateOfBirth;
	}

    @JsonProperty("FMEmployment")
	public Boolean getFMEmployment() {
		return FMEmployment;
	}

	public void setFMEmployment(Boolean FMEmployment) {
		this.FMEmployment = FMEmployment;
	}

    @JsonProperty("FMIsDependent")
	public Boolean getFMIsDependent() {
		return FMIsDependent;
	}

	public void setFMIsDependent(Boolean FMIsDependent) {
		this.FMIsDependent = FMIsDependent;
	}

    @JsonProperty("FMHealthCard")
	public String getFMHealthCard() {
		return FMHealthCard;
	}

	public void setFMHealthCard(String FMHealthCard) {
		this.FMHealthCard = FMHealthCard;
	}

    @JsonProperty("FMInsurance")
	public Boolean getFMInsurance() {
		return FMInsurance;
	}

	public void setFMInsurance(Boolean FMInsurance) {
		this.FMInsurance = FMInsurance;
	}


    @JsonProperty("employee")
	public EmployeeBean getEmployee() {
		return employee;
	}

    public void setEmployee(EmployeeBean employee) {
		this.employee = employee;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof FamilyMemberBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((FamilyMemberBean) o).getId()));
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
		return "FamilyMemberBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", FMOrdinalNumber=" + FMOrdinalNumber
			+ ", FMRelationship=" + FMRelationship
			+ ", FMName=" + FMName
			+ ", FMLastName=" + FMLastName
			+ ", FMDateOfBirth=" + FMDateOfBirth
			+ ", FMEmployment=" + FMEmployment
			+ ", FMIsDependent=" + FMIsDependent
			+ ", FMHealthCard=" + FMHealthCard
			+ ", FMInsurance=" + FMInsurance
			// + ", employee=" + employee
			+ "]";
	}
}