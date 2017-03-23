package com.doobgroup.server.entities.commonbusinessentities;

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
import com.doobgroup.server.entities.commonbusinessentities.ClassificationArchiveBean;
import com.doobgroup.server.entities.stockmanagement.StockAccountAssignmentBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessBean;
import com.doobgroup.server.entities.commonbusinessentities.CharacteristicsRegistryBean;

@Entity
@Table(name = "CLASSIFICATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CIdentificationCode"  	}))
@SQLDelete(sql="UPDATE CLASSIFICATION SET deleted = 1 WHERE Classification_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ClassificationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Classification_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CIdentificationCode", nullable = false)
	protected int CIdentificationCode;
	@Column(name = "CName")
	protected String CName;
	@Column(name = "CShortName")
	protected String CShortName;
	@Column(name = "CFinalClassification")
	protected Boolean CFinalClassification;
	@Column(name = "CIsAutomatic")
	protected Boolean CIsAutomatic;
	@Column(name = "CNameFormat")
	protected String CNameFormat;
	@Column(name = "CSpecialApproval")
	protected Boolean CSpecialApproval;

    @OneToMany(mappedBy = "classification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<IdentificationBean> identifications = new HashSet<IdentificationBean>();
    @OneToMany(mappedBy = "currentValue", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ClassificationArchiveBean> previousValues = new HashSet<ClassificationArchiveBean>();
    @OneToMany(mappedBy = "classification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockAccountAssignmentBean> stockAccountAssignments = new HashSet<StockAccountAssignmentBean>();
    @OneToMany(mappedBy = "classification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionProcessBean> productionProcesses = new HashSet<ProductionProcessBean>();
    @OneToMany(mappedBy = "classification", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CharacteristicsRegistryBean> characteristics = new HashSet<CharacteristicsRegistryBean>();

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

    @JsonProperty("CIdentificationCode")
	public int getCIdentificationCode() {
		return CIdentificationCode;
	}

	public void setCIdentificationCode(int CIdentificationCode) {
		this.CIdentificationCode = CIdentificationCode;
	}

    @JsonProperty("CName")
	public String getCName() {
		return CName;
	}

	public void setCName(String CName) {
		this.CName = CName;
	}

    @JsonProperty("CShortName")
	public String getCShortName() {
		return CShortName;
	}

	public void setCShortName(String CShortName) {
		this.CShortName = CShortName;
	}

    @JsonProperty("CFinalClassification")
	public Boolean getCFinalClassification() {
		return CFinalClassification;
	}

	public void setCFinalClassification(Boolean CFinalClassification) {
		this.CFinalClassification = CFinalClassification;
	}

    @JsonProperty("CIsAutomatic")
	public Boolean getCIsAutomatic() {
		return CIsAutomatic;
	}

	public void setCIsAutomatic(Boolean CIsAutomatic) {
		this.CIsAutomatic = CIsAutomatic;
	}

    @JsonProperty("CNameFormat")
	public String getCNameFormat() {
		return CNameFormat;
	}

	public void setCNameFormat(String CNameFormat) {
		this.CNameFormat = CNameFormat;
	}

    @JsonProperty("CSpecialApproval")
	public Boolean getCSpecialApproval() {
		return CSpecialApproval;
	}

	public void setCSpecialApproval(Boolean CSpecialApproval) {
		this.CSpecialApproval = CSpecialApproval;
	}


    @JsonProperty("identifications")
	public Set<IdentificationBean> getIdentifications() {
		return identifications;
	}

	public void setIdentifications(Set<IdentificationBean> identifications) {
		this.identifications = identifications;
	}

    @JsonProperty("previousValues")
	public Set<ClassificationArchiveBean> getPreviousValues() {
		return previousValues;
	}

	public void setPreviousValues(Set<ClassificationArchiveBean> previousValues) {
		this.previousValues = previousValues;
	}

    @JsonProperty("stockAccountAssignments")
	public Set<StockAccountAssignmentBean> getStockAccountAssignments() {
		return stockAccountAssignments;
	}

	public void setStockAccountAssignments(Set<StockAccountAssignmentBean> stockAccountAssignments) {
		this.stockAccountAssignments = stockAccountAssignments;
	}

    @JsonProperty("productionProcesses")
	public Set<ProductionProcessBean> getProductionProcesses() {
		return productionProcesses;
	}

	public void setProductionProcesses(Set<ProductionProcessBean> productionProcesses) {
		this.productionProcesses = productionProcesses;
	}

    @JsonProperty("characteristics")
	public Set<CharacteristicsRegistryBean> getCharacteristics() {
		return characteristics;
	}

	public void setCharacteristics(Set<CharacteristicsRegistryBean> characteristics) {
		this.characteristics = characteristics;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ClassificationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ClassificationBean) o).getId()));
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
		return "ClassificationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CIdentificationCode=" + CIdentificationCode
			+ ", CName=" + CName
			+ ", CShortName=" + CShortName
			+ ", CFinalClassification=" + CFinalClassification
			+ ", CIsAutomatic=" + CIsAutomatic
			+ ", CNameFormat=" + CNameFormat
			+ ", CSpecialApproval=" + CSpecialApproval
			// + ", identifications=" + identifications
			// + ", previousValues=" + previousValues
			// + ", stockAccountAssignments=" + stockAccountAssignments
			// + ", productionProcesses=" + productionProcesses
			// + ", characteristics=" + characteristics
			+ "]";
	}
}