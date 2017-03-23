package com.doobgroup.server.entities.procurementplan;

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

import com.doobgroup.server.entities.initialization.ProcurementPlanHeadingBean;

@Entity
@Table(name = "PLANNINGPERIOD"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PPCode"  	}))
@SQLDelete(sql="UPDATE PLANNINGPERIOD SET deleted = 1 WHERE PlanningPeriod_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PlanningPeriodBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PlanningPeriod_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPCode", nullable = false)
	protected int PPCode;
	@Column(name = "PPName", nullable = false)
	protected String PPName;

    @OneToMany(mappedBy = "planningPeriod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementPlanHeadingBean> procurementPlanHeadings = new HashSet<ProcurementPlanHeadingBean>();

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

    @JsonProperty("PPCode")
	public int getPPCode() {
		return PPCode;
	}

	public void setPPCode(int PPCode) {
		this.PPCode = PPCode;
	}

    @JsonProperty("PPName")
	public String getPPName() {
		return PPName;
	}

	public void setPPName(String PPName) {
		this.PPName = PPName;
	}


    @JsonProperty("procurementPlanHeadings")
	public Set<ProcurementPlanHeadingBean> getProcurementPlanHeadings() {
		return procurementPlanHeadings;
	}

	public void setProcurementPlanHeadings(Set<ProcurementPlanHeadingBean> procurementPlanHeadings) {
		this.procurementPlanHeadings = procurementPlanHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PlanningPeriodBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PlanningPeriodBean) o).getId()));
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
		return "PlanningPeriodBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPCode=" + PPCode
			+ ", PPName=" + PPName
			// + ", procurementPlanHeadings=" + procurementPlanHeadings
			+ "]";
	}
}