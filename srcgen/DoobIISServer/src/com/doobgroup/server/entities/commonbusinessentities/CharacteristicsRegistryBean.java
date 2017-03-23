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

import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;
import com.doobgroup.server.entities.commonbusinessentities.CharacteristicTypeBean;
import com.doobgroup.server.entities.commonbusinessentities.ClassificationBean;
import com.doobgroup.server.entities.commonbusinessentities.CharacteristicBean;

@Entity
@Table(name = "CHARACTERISTICSREGISTRY"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CRIdentificationNumber"  ,  "classification"  	}))
@SQLDelete(sql="UPDATE CHARACTERISTICSREGISTRY SET deleted = 1 WHERE CharacteristicsRegistry_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class CharacteristicsRegistryBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CharacteristicsRegistry_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CRIdentificationNumber", nullable = false)
	protected String CRIdentificationNumber;
	@Column(name = "CRName", nullable = false)
	protected String CRName;
	@Column(name = "CRPriority")
	protected int CRPriority;
	@Column(name = "CRPrintPriority")
	protected int CRPrintPriority;
	@Column(name = "CRStatus")
	protected Boolean CRStatus;
	@Column(name = "CRLength")
	protected int CRLength;
	@Column(name = "CRPrecision")
	protected int CRPrecision;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="unit")
    protected MeasurementUnitBean unit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="type")
    protected CharacteristicTypeBean type;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="classification")
    protected ClassificationBean classification;
    @OneToMany(mappedBy = "registarKarakteristike", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CharacteristicBean> karakteristike = new HashSet<CharacteristicBean>();

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

    @JsonProperty("CRIdentificationNumber")
	public String getCRIdentificationNumber() {
		return CRIdentificationNumber;
	}

	public void setCRIdentificationNumber(String CRIdentificationNumber) {
		this.CRIdentificationNumber = CRIdentificationNumber;
	}

    @JsonProperty("CRName")
	public String getCRName() {
		return CRName;
	}

	public void setCRName(String CRName) {
		this.CRName = CRName;
	}

    @JsonProperty("CRPriority")
	public int getCRPriority() {
		return CRPriority;
	}

	public void setCRPriority(int CRPriority) {
		this.CRPriority = CRPriority;
	}

    @JsonProperty("CRPrintPriority")
	public int getCRPrintPriority() {
		return CRPrintPriority;
	}

	public void setCRPrintPriority(int CRPrintPriority) {
		this.CRPrintPriority = CRPrintPriority;
	}

    @JsonProperty("CRStatus")
	public Boolean getCRStatus() {
		return CRStatus;
	}

	public void setCRStatus(Boolean CRStatus) {
		this.CRStatus = CRStatus;
	}

    @JsonProperty("CRLength")
	public int getCRLength() {
		return CRLength;
	}

	public void setCRLength(int CRLength) {
		this.CRLength = CRLength;
	}

    @JsonProperty("CRPrecision")
	public int getCRPrecision() {
		return CRPrecision;
	}

	public void setCRPrecision(int CRPrecision) {
		this.CRPrecision = CRPrecision;
	}


    @JsonProperty("unit")
	public MeasurementUnitBean getUnit() {
		return unit;
	}

    public void setUnit(MeasurementUnitBean unit) {
		this.unit = unit;
	}

    @JsonProperty("type")
	public CharacteristicTypeBean getType() {
		return type;
	}

    public void setType(CharacteristicTypeBean type) {
		this.type = type;
	}

    @JsonProperty("classification")
	public ClassificationBean getClassification() {
		return classification;
	}

    public void setClassification(ClassificationBean classification) {
		this.classification = classification;
	}

    @JsonProperty("karakteristike")
	public Set<CharacteristicBean> getKarakteristike() {
		return karakteristike;
	}

	public void setKarakteristike(Set<CharacteristicBean> karakteristike) {
		this.karakteristike = karakteristike;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof CharacteristicsRegistryBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((CharacteristicsRegistryBean) o).getId()));
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
		return "CharacteristicsRegistryBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CRIdentificationNumber=" + CRIdentificationNumber
			+ ", CRName=" + CRName
			+ ", CRPriority=" + CRPriority
			+ ", CRPrintPriority=" + CRPrintPriority
			+ ", CRStatus=" + CRStatus
			+ ", CRLength=" + CRLength
			+ ", CRPrecision=" + CRPrecision
			// + ", unit=" + unit
			// + ", type=" + type
			// + ", classification=" + classification
			// + ", karakteristike=" + karakteristike
			+ "]";
	}
}