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
import com.doobgroup.server.entities.capacitymanagement.BalanceResourceBean;
import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;

@Entity
@Table(name = "SCHOOLDEGREE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SDCode"  	}))
@SQLDelete(sql="UPDATE SCHOOLDEGREE SET deleted = 1 WHERE SchoolDegree_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class SchoolDegreeBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SchoolDegree_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SDCode", nullable = false)
	protected String SDCode;
	@Column(name = "SDName", nullable = false)
	protected String SDName;

    @OneToMany(mappedBy = "schoolDegree", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<EmployeeBean> employees = new HashSet<EmployeeBean>();
    @OneToMany(mappedBy = "schoolDegree", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BalanceResourceBean> balanceRecources = new HashSet<BalanceResourceBean>();
    @OneToMany(mappedBy = "schoolDegree", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TechnologicalUnitBean> technologicalUnits = new HashSet<TechnologicalUnitBean>();

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

    @JsonProperty("SDCode")
	public String getSDCode() {
		return SDCode;
	}

	public void setSDCode(String SDCode) {
		this.SDCode = SDCode;
	}

    @JsonProperty("SDName")
	public String getSDName() {
		return SDName;
	}

	public void setSDName(String SDName) {
		this.SDName = SDName;
	}


    @JsonProperty("employees")
	public Set<EmployeeBean> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<EmployeeBean> employees) {
		this.employees = employees;
	}

    @JsonProperty("balanceRecources")
	public Set<BalanceResourceBean> getBalanceRecources() {
		return balanceRecources;
	}

	public void setBalanceRecources(Set<BalanceResourceBean> balanceRecources) {
		this.balanceRecources = balanceRecources;
	}

    @JsonProperty("technologicalUnits")
	public Set<TechnologicalUnitBean> getTechnologicalUnits() {
		return technologicalUnits;
	}

	public void setTechnologicalUnits(Set<TechnologicalUnitBean> technologicalUnits) {
		this.technologicalUnits = technologicalUnits;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof SchoolDegreeBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((SchoolDegreeBean) o).getId()));
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
		return "SchoolDegreeBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SDCode=" + SDCode
			+ ", SDName=" + SDName
			// + ", employees=" + employees
			// + ", balanceRecources=" + balanceRecources
			// + ", technologicalUnits=" + technologicalUnits
			+ "]";
	}
}