package com.doobgroup.server.entities.productiondata;

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

import com.doobgroup.server.entities.productiondata.ProductionProcessStepsBean;
import com.doobgroup.server.entities.capacitymanagement.AlternativeWorkCenterStepsBean;
import com.doobgroup.server.entities.capacitymanagement.WorkCenterStepsBean;

@Entity
@Table(name = "STEPSCLASSIFICATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SCClassificationNumber"  	}))
@SQLDelete(sql="UPDATE STEPSCLASSIFICATION SET deleted = 1 WHERE StepsClassification_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class StepsClassificationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "StepsClassification_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SCClassificationNumber", nullable = false)
	protected String SCClassificationNumber;
	@Column(name = "SCFinalClassification")
	protected Boolean SCFinalClassification;
	@Column(name = "SCName", nullable = false)
	protected String SCName;

    @OneToMany(mappedBy = "stepClassification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionProcessStepsBean> productionProcessSteps = new HashSet<ProductionProcessStepsBean>();
    @OneToMany(mappedBy = "stepsClassification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AlternativeWorkCenterStepsBean> alternativeWorkCenters = new HashSet<AlternativeWorkCenterStepsBean>();
    @OneToMany(mappedBy = "stepsClassification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkCenterStepsBean> workCenterSteps = new HashSet<WorkCenterStepsBean>();

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

    @JsonProperty("SCClassificationNumber")
	public String getSCClassificationNumber() {
		return SCClassificationNumber;
	}

	public void setSCClassificationNumber(String SCClassificationNumber) {
		this.SCClassificationNumber = SCClassificationNumber;
	}

    @JsonProperty("SCFinalClassification")
	public Boolean getSCFinalClassification() {
		return SCFinalClassification;
	}

	public void setSCFinalClassification(Boolean SCFinalClassification) {
		this.SCFinalClassification = SCFinalClassification;
	}

    @JsonProperty("SCName")
	public String getSCName() {
		return SCName;
	}

	public void setSCName(String SCName) {
		this.SCName = SCName;
	}


    @JsonProperty("productionProcessSteps")
	public Set<ProductionProcessStepsBean> getProductionProcessSteps() {
		return productionProcessSteps;
	}

	public void setProductionProcessSteps(Set<ProductionProcessStepsBean> productionProcessSteps) {
		this.productionProcessSteps = productionProcessSteps;
	}

    @JsonProperty("alternativeWorkCenters")
	public Set<AlternativeWorkCenterStepsBean> getAlternativeWorkCenters() {
		return alternativeWorkCenters;
	}

	public void setAlternativeWorkCenters(Set<AlternativeWorkCenterStepsBean> alternativeWorkCenters) {
		this.alternativeWorkCenters = alternativeWorkCenters;
	}

    @JsonProperty("workCenterSteps")
	public Set<WorkCenterStepsBean> getWorkCenterSteps() {
		return workCenterSteps;
	}

	public void setWorkCenterSteps(Set<WorkCenterStepsBean> workCenterSteps) {
		this.workCenterSteps = workCenterSteps;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof StepsClassificationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((StepsClassificationBean) o).getId()));
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
		return "StepsClassificationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SCClassificationNumber=" + SCClassificationNumber
			+ ", SCFinalClassification=" + SCFinalClassification
			+ ", SCName=" + SCName
			// + ", productionProcessSteps=" + productionProcessSteps
			// + ", alternativeWorkCenters=" + alternativeWorkCenters
			// + ", workCenterSteps=" + workCenterSteps
			+ "]";
	}
}