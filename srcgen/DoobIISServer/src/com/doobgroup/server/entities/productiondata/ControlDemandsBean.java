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

@Entity
@Table(name = "CONTROLDEMANDS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CDOrdinalNumber"  ,  "productionProcessStep"  	}))
@SQLDelete(sql="UPDATE CONTROLDEMANDS SET deleted = 1 WHERE ControlDemands_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ControlDemandsBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ControlDemands_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CDOrdinalNumber", nullable = false)
	protected int CDOrdinalNumber;
	@Column(name = "CDMeasureType", nullable = false)
	protected String CDMeasureType;
	@Column(name = "CDRequiredValue")
	protected String CDRequiredValue;
	@Column(name = "CDTolerance")
	protected String CDTolerance;
	@Column(name = "CDControlMedium")
	protected String CDControlMedium;
	@Column(name = "CDControlType")
	protected String CDControlType;
	@Column(name = "CDControlFrequency")
	protected String CDControlFrequency;
	@Column(name = "CDEnteredBy")
	protected String CDEnteredBy;
	@Column(name = "CDEntryDate")
	protected Date CDEntryDate;
	@Column(name = "CDModifiedBy")
	protected String CDModifiedBy;
	@Column(name = "CDModificationDate")
	protected Date CDModificationDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productionProcessStep")
    protected ProductionProcessStepsBean productionProcessStep;

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

    @JsonProperty("CDOrdinalNumber")
	public int getCDOrdinalNumber() {
		return CDOrdinalNumber;
	}

	public void setCDOrdinalNumber(int CDOrdinalNumber) {
		this.CDOrdinalNumber = CDOrdinalNumber;
	}

    @JsonProperty("CDMeasureType")
	public String getCDMeasureType() {
		return CDMeasureType;
	}

	public void setCDMeasureType(String CDMeasureType) {
		this.CDMeasureType = CDMeasureType;
	}

    @JsonProperty("CDRequiredValue")
	public String getCDRequiredValue() {
		return CDRequiredValue;
	}

	public void setCDRequiredValue(String CDRequiredValue) {
		this.CDRequiredValue = CDRequiredValue;
	}

    @JsonProperty("CDTolerance")
	public String getCDTolerance() {
		return CDTolerance;
	}

	public void setCDTolerance(String CDTolerance) {
		this.CDTolerance = CDTolerance;
	}

    @JsonProperty("CDControlMedium")
	public String getCDControlMedium() {
		return CDControlMedium;
	}

	public void setCDControlMedium(String CDControlMedium) {
		this.CDControlMedium = CDControlMedium;
	}

    @JsonProperty("CDControlType")
	public String getCDControlType() {
		return CDControlType;
	}

	public void setCDControlType(String CDControlType) {
		this.CDControlType = CDControlType;
	}

    @JsonProperty("CDControlFrequency")
	public String getCDControlFrequency() {
		return CDControlFrequency;
	}

	public void setCDControlFrequency(String CDControlFrequency) {
		this.CDControlFrequency = CDControlFrequency;
	}

    @JsonProperty("CDEnteredBy")
	public String getCDEnteredBy() {
		return CDEnteredBy;
	}

	public void setCDEnteredBy(String CDEnteredBy) {
		this.CDEnteredBy = CDEnteredBy;
	}

    @JsonProperty("CDEntryDate")
	public Date getCDEntryDate() {
		return CDEntryDate;
	}

	public void setCDEntryDate(Date CDEntryDate) {
		this.CDEntryDate = CDEntryDate;
	}

    @JsonProperty("CDModifiedBy")
	public String getCDModifiedBy() {
		return CDModifiedBy;
	}

	public void setCDModifiedBy(String CDModifiedBy) {
		this.CDModifiedBy = CDModifiedBy;
	}

    @JsonProperty("CDModificationDate")
	public Date getCDModificationDate() {
		return CDModificationDate;
	}

	public void setCDModificationDate(Date CDModificationDate) {
		this.CDModificationDate = CDModificationDate;
	}


    @JsonProperty("productionProcessStep")
	public ProductionProcessStepsBean getProductionProcessStep() {
		return productionProcessStep;
	}

    public void setProductionProcessStep(ProductionProcessStepsBean productionProcessStep) {
		this.productionProcessStep = productionProcessStep;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ControlDemandsBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ControlDemandsBean) o).getId()));
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
		return "ControlDemandsBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CDOrdinalNumber=" + CDOrdinalNumber
			+ ", CDMeasureType=" + CDMeasureType
			+ ", CDRequiredValue=" + CDRequiredValue
			+ ", CDTolerance=" + CDTolerance
			+ ", CDControlMedium=" + CDControlMedium
			+ ", CDControlType=" + CDControlType
			+ ", CDControlFrequency=" + CDControlFrequency
			+ ", CDEnteredBy=" + CDEnteredBy
			+ ", CDEntryDate=" + CDEntryDate
			+ ", CDModifiedBy=" + CDModifiedBy
			+ ", CDModificationDate=" + CDModificationDate
			// + ", productionProcessStep=" + productionProcessStep
			+ "]";
	}
}