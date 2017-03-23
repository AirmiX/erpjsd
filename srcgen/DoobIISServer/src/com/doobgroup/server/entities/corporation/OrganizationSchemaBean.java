package com.doobgroup.server.entities.corporation;

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

import com.doobgroup.server.entities.corporation.BusinessEntityBean;

@Entity
@Table(name = "ORGANIZATIONSCHEMA"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OSName" ,   "OSYear"  	}))
@SQLDelete(sql="UPDATE ORGANIZATIONSCHEMA SET deleted = 1 WHERE OrganizationSchema_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OrganizationSchemaBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OrganizationSchema_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OSName", nullable = false)
	protected String OSName;
	@Column(name = "OSYear", nullable = false)
	protected int OSYear;
	@Column(name = "OSStartDate", nullable = false)
	protected Date OSStartDate;
	@Column(name = "OSEndDate")
	protected Date OSEndDate;
	@Column(name = "OSCreationDate", nullable = false)
	protected Date OSCreationDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="be")
    protected BusinessEntityBean be;

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

    @JsonProperty("OSName")
	public String getOSName() {
		return OSName;
	}

	public void setOSName(String OSName) {
		this.OSName = OSName;
	}

    @JsonProperty("OSYear")
	public int getOSYear() {
		return OSYear;
	}

	public void setOSYear(int OSYear) {
		this.OSYear = OSYear;
	}

    @JsonProperty("OSStartDate")
	public Date getOSStartDate() {
		return OSStartDate;
	}

	public void setOSStartDate(Date OSStartDate) {
		this.OSStartDate = OSStartDate;
	}

    @JsonProperty("OSEndDate")
	public Date getOSEndDate() {
		return OSEndDate;
	}

	public void setOSEndDate(Date OSEndDate) {
		this.OSEndDate = OSEndDate;
	}

    @JsonProperty("OSCreationDate")
	public Date getOSCreationDate() {
		return OSCreationDate;
	}

	public void setOSCreationDate(Date OSCreationDate) {
		this.OSCreationDate = OSCreationDate;
	}


    @JsonProperty("be")
	public BusinessEntityBean getBe() {
		return be;
	}

    public void setBe(BusinessEntityBean be) {
		this.be = be;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OrganizationSchemaBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OrganizationSchemaBean) o).getId()));
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
		return "OrganizationSchemaBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OSName=" + OSName
			+ ", OSYear=" + OSYear
			+ ", OSStartDate=" + OSStartDate
			+ ", OSEndDate=" + OSEndDate
			+ ", OSCreationDate=" + OSCreationDate
			// + ", be=" + be
			+ "]";
	}
}