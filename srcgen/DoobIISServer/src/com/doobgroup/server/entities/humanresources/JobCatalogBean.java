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

import com.doobgroup.server.entities.humanresources.WorkstationBean;

@Entity
@Table(name = "JOBCATALOG"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "JCIdentificationCode"  	}))
@SQLDelete(sql="UPDATE JOBCATALOG SET deleted = 1 WHERE JobCatalog_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class JobCatalogBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "JobCatalog_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "JCIdentificationCode", nullable = false)
	protected int JCIdentificationCode;
	@Column(name = "JCCode", nullable = false)
	protected String JCCode;
	@Column(name = "JCDescription", nullable = false)
	protected String JCDescription;
	@Column(name = "JCClassification", nullable = false)
	protected String JCClassification;

    @OneToMany(mappedBy = "job", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkstationBean> workstations = new HashSet<WorkstationBean>();

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

    @JsonProperty("JCIdentificationCode")
	public int getJCIdentificationCode() {
		return JCIdentificationCode;
	}

	public void setJCIdentificationCode(int JCIdentificationCode) {
		this.JCIdentificationCode = JCIdentificationCode;
	}

    @JsonProperty("JCCode")
	public String getJCCode() {
		return JCCode;
	}

	public void setJCCode(String JCCode) {
		this.JCCode = JCCode;
	}

    @JsonProperty("JCDescription")
	public String getJCDescription() {
		return JCDescription;
	}

	public void setJCDescription(String JCDescription) {
		this.JCDescription = JCDescription;
	}

    @JsonProperty("JCClassification")
	public String getJCClassification() {
		return JCClassification;
	}

	public void setJCClassification(String JCClassification) {
		this.JCClassification = JCClassification;
	}


    @JsonProperty("workstations")
	public Set<WorkstationBean> getWorkstations() {
		return workstations;
	}

	public void setWorkstations(Set<WorkstationBean> workstations) {
		this.workstations = workstations;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof JobCatalogBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((JobCatalogBean) o).getId()));
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
		return "JobCatalogBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", JCIdentificationCode=" + JCIdentificationCode
			+ ", JCCode=" + JCCode
			+ ", JCDescription=" + JCDescription
			+ ", JCClassification=" + JCClassification
			// + ", workstations=" + workstations
			+ "]";
	}
}