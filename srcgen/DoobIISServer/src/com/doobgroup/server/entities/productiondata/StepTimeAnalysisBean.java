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


@Entity
@Table(name = "STEPTIMEANALYSIS"
)
@SQLDelete(sql="UPDATE STEPTIMEANALYSIS SET deleted = 1 WHERE StepTimeAnalysis_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class StepTimeAnalysisBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "StepTimeAnalysis_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "STAMainTime", nullable = false)
	protected int STAMainTime;
	@Column(name = "STAAuxiliaryTime", nullable = false)
	protected int STAAuxiliaryTime;
	@Column(name = "STAAdditionalTime", nullable = false)
	protected int STAAdditionalTime;
	@Column(name = "STAPreparatoryFinalTime", nullable = false)
	protected int STAPreparatoryFinalTime;
	@Column(name = "STAShifters", nullable = false)
	protected int STAShifters;
	@Column(name = "STARPM")
	protected int STARPM;
	@Column(name = "STACuttingDepth")
	protected int STACuttingDepth;
	@Column(name = "STAValidStartDate", nullable = false)
	protected Date STAValidStartDate;
	@Column(name = "STAValidEndDate")
	protected Date STAValidEndDate;
	@Column(name = "STAEnteredBy")
	protected String STAEnteredBy;
	@Column(name = "STAEntryDate")
	protected Date STAEntryDate;
	@Column(name = "STAModifiedBy")
	protected String STAModifiedBy;
	@Column(name = "STAModificationDate")
	protected Date STAModificationDate;


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

    @JsonProperty("STAMainTime")
	public int getSTAMainTime() {
		return STAMainTime;
	}

	public void setSTAMainTime(int STAMainTime) {
		this.STAMainTime = STAMainTime;
	}

    @JsonProperty("STAAuxiliaryTime")
	public int getSTAAuxiliaryTime() {
		return STAAuxiliaryTime;
	}

	public void setSTAAuxiliaryTime(int STAAuxiliaryTime) {
		this.STAAuxiliaryTime = STAAuxiliaryTime;
	}

    @JsonProperty("STAAdditionalTime")
	public int getSTAAdditionalTime() {
		return STAAdditionalTime;
	}

	public void setSTAAdditionalTime(int STAAdditionalTime) {
		this.STAAdditionalTime = STAAdditionalTime;
	}

    @JsonProperty("STAPreparatoryFinalTime")
	public int getSTAPreparatoryFinalTime() {
		return STAPreparatoryFinalTime;
	}

	public void setSTAPreparatoryFinalTime(int STAPreparatoryFinalTime) {
		this.STAPreparatoryFinalTime = STAPreparatoryFinalTime;
	}

    @JsonProperty("STAShifters")
	public int getSTAShifters() {
		return STAShifters;
	}

	public void setSTAShifters(int STAShifters) {
		this.STAShifters = STAShifters;
	}

    @JsonProperty("STARPM")
	public int getSTARPM() {
		return STARPM;
	}

	public void setSTARPM(int STARPM) {
		this.STARPM = STARPM;
	}

    @JsonProperty("STACuttingDepth")
	public int getSTACuttingDepth() {
		return STACuttingDepth;
	}

	public void setSTACuttingDepth(int STACuttingDepth) {
		this.STACuttingDepth = STACuttingDepth;
	}

    @JsonProperty("STAValidStartDate")
	public Date getSTAValidStartDate() {
		return STAValidStartDate;
	}

	public void setSTAValidStartDate(Date STAValidStartDate) {
		this.STAValidStartDate = STAValidStartDate;
	}

    @JsonProperty("STAValidEndDate")
	public Date getSTAValidEndDate() {
		return STAValidEndDate;
	}

	public void setSTAValidEndDate(Date STAValidEndDate) {
		this.STAValidEndDate = STAValidEndDate;
	}

    @JsonProperty("STAEnteredBy")
	public String getSTAEnteredBy() {
		return STAEnteredBy;
	}

	public void setSTAEnteredBy(String STAEnteredBy) {
		this.STAEnteredBy = STAEnteredBy;
	}

    @JsonProperty("STAEntryDate")
	public Date getSTAEntryDate() {
		return STAEntryDate;
	}

	public void setSTAEntryDate(Date STAEntryDate) {
		this.STAEntryDate = STAEntryDate;
	}

    @JsonProperty("STAModifiedBy")
	public String getSTAModifiedBy() {
		return STAModifiedBy;
	}

	public void setSTAModifiedBy(String STAModifiedBy) {
		this.STAModifiedBy = STAModifiedBy;
	}

    @JsonProperty("STAModificationDate")
	public Date getSTAModificationDate() {
		return STAModificationDate;
	}

	public void setSTAModificationDate(Date STAModificationDate) {
		this.STAModificationDate = STAModificationDate;
	}



	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof StepTimeAnalysisBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((StepTimeAnalysisBean) o).getId()));
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
		return "StepTimeAnalysisBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", STAMainTime=" + STAMainTime
			+ ", STAAuxiliaryTime=" + STAAuxiliaryTime
			+ ", STAAdditionalTime=" + STAAdditionalTime
			+ ", STAPreparatoryFinalTime=" + STAPreparatoryFinalTime
			+ ", STAShifters=" + STAShifters
			+ ", STARPM=" + STARPM
			+ ", STACuttingDepth=" + STACuttingDepth
			+ ", STAValidStartDate=" + STAValidStartDate
			+ ", STAValidEndDate=" + STAValidEndDate
			+ ", STAEnteredBy=" + STAEnteredBy
			+ ", STAEntryDate=" + STAEntryDate
			+ ", STAModifiedBy=" + STAModifiedBy
			+ ", STAModificationDate=" + STAModificationDate
			+ "]";
	}
}