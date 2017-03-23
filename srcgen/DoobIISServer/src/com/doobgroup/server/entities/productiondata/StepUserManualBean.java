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
@Table(name = "STEPUSERMANUAL"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SUMOrdinalNumber"  ,  "productionProcessStep"  	}))
@SQLDelete(sql="UPDATE STEPUSERMANUAL SET deleted = 1 WHERE StepUserManual_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class StepUserManualBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "StepUserManual_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SUMOrdinalNumber", nullable = false)
	protected int SUMOrdinalNumber;
	@Column(name = "SUMText", nullable = false)
	protected String SUMText;
	@Column(name = "SUMDocument")
	protected String SUMDocument;
	@Column(name = "SUMValidStartDate", nullable = false)
	protected Date SUMValidStartDate;
	@Column(name = "SUMValidEndDate")
	protected Date SUMValidEndDate;
	@Column(name = "SUMEnteredBy")
	protected String SUMEnteredBy;
	@Column(name = "SUMEntryDate")
	protected Date SUMEntryDate;
	@Column(name = "SUMModifiedBy")
	protected String SUMModifiedBy;
	@Column(name = "SUMModificationDate")
	protected Date SUMModificationDate;

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

    @JsonProperty("SUMOrdinalNumber")
	public int getSUMOrdinalNumber() {
		return SUMOrdinalNumber;
	}

	public void setSUMOrdinalNumber(int SUMOrdinalNumber) {
		this.SUMOrdinalNumber = SUMOrdinalNumber;
	}

    @JsonProperty("SUMText")
	public String getSUMText() {
		return SUMText;
	}

	public void setSUMText(String SUMText) {
		this.SUMText = SUMText;
	}

    @JsonProperty("SUMDocument")
	public String getSUMDocument() {
		return SUMDocument;
	}

	public void setSUMDocument(String SUMDocument) {
		this.SUMDocument = SUMDocument;
	}

    @JsonProperty("SUMValidStartDate")
	public Date getSUMValidStartDate() {
		return SUMValidStartDate;
	}

	public void setSUMValidStartDate(Date SUMValidStartDate) {
		this.SUMValidStartDate = SUMValidStartDate;
	}

    @JsonProperty("SUMValidEndDate")
	public Date getSUMValidEndDate() {
		return SUMValidEndDate;
	}

	public void setSUMValidEndDate(Date SUMValidEndDate) {
		this.SUMValidEndDate = SUMValidEndDate;
	}

    @JsonProperty("SUMEnteredBy")
	public String getSUMEnteredBy() {
		return SUMEnteredBy;
	}

	public void setSUMEnteredBy(String SUMEnteredBy) {
		this.SUMEnteredBy = SUMEnteredBy;
	}

    @JsonProperty("SUMEntryDate")
	public Date getSUMEntryDate() {
		return SUMEntryDate;
	}

	public void setSUMEntryDate(Date SUMEntryDate) {
		this.SUMEntryDate = SUMEntryDate;
	}

    @JsonProperty("SUMModifiedBy")
	public String getSUMModifiedBy() {
		return SUMModifiedBy;
	}

	public void setSUMModifiedBy(String SUMModifiedBy) {
		this.SUMModifiedBy = SUMModifiedBy;
	}

    @JsonProperty("SUMModificationDate")
	public Date getSUMModificationDate() {
		return SUMModificationDate;
	}

	public void setSUMModificationDate(Date SUMModificationDate) {
		this.SUMModificationDate = SUMModificationDate;
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
		if (o == null || !(o instanceof StepUserManualBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((StepUserManualBean) o).getId()));
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
		return "StepUserManualBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SUMOrdinalNumber=" + SUMOrdinalNumber
			+ ", SUMText=" + SUMText
			+ ", SUMDocument=" + SUMDocument
			+ ", SUMValidStartDate=" + SUMValidStartDate
			+ ", SUMValidEndDate=" + SUMValidEndDate
			+ ", SUMEnteredBy=" + SUMEnteredBy
			+ ", SUMEntryDate=" + SUMEntryDate
			+ ", SUMModifiedBy=" + SUMModifiedBy
			+ ", SUMModificationDate=" + SUMModificationDate
			// + ", productionProcessStep=" + productionProcessStep
			+ "]";
	}
}