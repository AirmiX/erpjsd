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

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;

@Entity
@Table(name = "STRUCTURALCOMPONENTS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SCLevel" ,   "SCOrdinalNumberAtLevel"  ,  "superIdent" ,   "subIdent"  	}))
@SQLDelete(sql="UPDATE STRUCTURALCOMPONENTS SET deleted = 1 WHERE StructuralComponents_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class StructuralComponentsBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "StructuralComponents_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SCLevel", nullable = false)
	protected int SCLevel;
	@Column(name = "SCOrdinalNumberAtLevel", nullable = false)
	protected int SCOrdinalNumberAtLevel;
	@Column(name = "SCVariantNumber", nullable = false)
	protected int SCVariantNumber;
	@Column(name = "SCNormativUgradnje", nullable = false)
	protected int SCNormativUgradnje;
	@Column(name = "SCSupplyingStatus", nullable = false)
	protected String SCSupplyingStatus;
	@Column(name = "SCWastePlannedPercentage")
	protected int SCWastePlannedPercentage;
	@Column(name = "SCFictiveProductIndicator")
	protected int SCFictiveProductIndicator;
	@Column(name = "SCValidStartDate", nullable = false)
	protected Date SCValidStartDate;
	@Column(name = "SCValidEndDate")
	protected Date SCValidEndDate;
	@Column(name = "SCEnteredBy")
	protected String SCEnteredBy;
	@Column(name = "SCEntryDate")
	protected Date SCEntryDate;
	@Column(name = "SCModifiedBy")
	protected String SCModifiedBy;
	@Column(name = "SCModificationDate")
	protected Date SCModificationDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="superIdent")
    protected IdentificationBean superIdent;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="subIdent")
    protected IdentificationBean subIdent;

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

    @JsonProperty("SCLevel")
	public int getSCLevel() {
		return SCLevel;
	}

	public void setSCLevel(int SCLevel) {
		this.SCLevel = SCLevel;
	}

    @JsonProperty("SCOrdinalNumberAtLevel")
	public int getSCOrdinalNumberAtLevel() {
		return SCOrdinalNumberAtLevel;
	}

	public void setSCOrdinalNumberAtLevel(int SCOrdinalNumberAtLevel) {
		this.SCOrdinalNumberAtLevel = SCOrdinalNumberAtLevel;
	}

    @JsonProperty("SCVariantNumber")
	public int getSCVariantNumber() {
		return SCVariantNumber;
	}

	public void setSCVariantNumber(int SCVariantNumber) {
		this.SCVariantNumber = SCVariantNumber;
	}

    @JsonProperty("SCNormativUgradnje")
	public int getSCNormativUgradnje() {
		return SCNormativUgradnje;
	}

	public void setSCNormativUgradnje(int SCNormativUgradnje) {
		this.SCNormativUgradnje = SCNormativUgradnje;
	}

    @JsonProperty("SCSupplyingStatus")
	public String getSCSupplyingStatus() {
		return SCSupplyingStatus;
	}

	public void setSCSupplyingStatus(String SCSupplyingStatus) {
		this.SCSupplyingStatus = SCSupplyingStatus;
	}

    @JsonProperty("SCWastePlannedPercentage")
	public int getSCWastePlannedPercentage() {
		return SCWastePlannedPercentage;
	}

	public void setSCWastePlannedPercentage(int SCWastePlannedPercentage) {
		this.SCWastePlannedPercentage = SCWastePlannedPercentage;
	}

    @JsonProperty("SCFictiveProductIndicator")
	public int getSCFictiveProductIndicator() {
		return SCFictiveProductIndicator;
	}

	public void setSCFictiveProductIndicator(int SCFictiveProductIndicator) {
		this.SCFictiveProductIndicator = SCFictiveProductIndicator;
	}

    @JsonProperty("SCValidStartDate")
	public Date getSCValidStartDate() {
		return SCValidStartDate;
	}

	public void setSCValidStartDate(Date SCValidStartDate) {
		this.SCValidStartDate = SCValidStartDate;
	}

    @JsonProperty("SCValidEndDate")
	public Date getSCValidEndDate() {
		return SCValidEndDate;
	}

	public void setSCValidEndDate(Date SCValidEndDate) {
		this.SCValidEndDate = SCValidEndDate;
	}

    @JsonProperty("SCEnteredBy")
	public String getSCEnteredBy() {
		return SCEnteredBy;
	}

	public void setSCEnteredBy(String SCEnteredBy) {
		this.SCEnteredBy = SCEnteredBy;
	}

    @JsonProperty("SCEntryDate")
	public Date getSCEntryDate() {
		return SCEntryDate;
	}

	public void setSCEntryDate(Date SCEntryDate) {
		this.SCEntryDate = SCEntryDate;
	}

    @JsonProperty("SCModifiedBy")
	public String getSCModifiedBy() {
		return SCModifiedBy;
	}

	public void setSCModifiedBy(String SCModifiedBy) {
		this.SCModifiedBy = SCModifiedBy;
	}

    @JsonProperty("SCModificationDate")
	public Date getSCModificationDate() {
		return SCModificationDate;
	}

	public void setSCModificationDate(Date SCModificationDate) {
		this.SCModificationDate = SCModificationDate;
	}


    @JsonProperty("superIdent")
	public IdentificationBean getSuperIdent() {
		return superIdent;
	}

    public void setSuperIdent(IdentificationBean superIdent) {
		this.superIdent = superIdent;
	}

    @JsonProperty("subIdent")
	public IdentificationBean getSubIdent() {
		return subIdent;
	}

    public void setSubIdent(IdentificationBean subIdent) {
		this.subIdent = subIdent;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof StructuralComponentsBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((StructuralComponentsBean) o).getId()));
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
		return "StructuralComponentsBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SCLevel=" + SCLevel
			+ ", SCOrdinalNumberAtLevel=" + SCOrdinalNumberAtLevel
			+ ", SCVariantNumber=" + SCVariantNumber
			+ ", SCNormativUgradnje=" + SCNormativUgradnje
			+ ", SCSupplyingStatus=" + SCSupplyingStatus
			+ ", SCWastePlannedPercentage=" + SCWastePlannedPercentage
			+ ", SCFictiveProductIndicator=" + SCFictiveProductIndicator
			+ ", SCValidStartDate=" + SCValidStartDate
			+ ", SCValidEndDate=" + SCValidEndDate
			+ ", SCEnteredBy=" + SCEnteredBy
			+ ", SCEntryDate=" + SCEntryDate
			+ ", SCModifiedBy=" + SCModifiedBy
			+ ", SCModificationDate=" + SCModificationDate
			// + ", superIdent=" + superIdent
			// + ", subIdent=" + subIdent
			+ "]";
	}
}