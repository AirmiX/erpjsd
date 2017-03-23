package com.doobgroup.server.entities.capacitymanagement;

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

import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;

@Entity
@Table(name = "TECHNICALCHARACTERISTICPRODUCTIONEQUIPMENT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TCPEOrdinalNumber"  ,  "technologicalUnit"  	}))
@SQLDelete(sql="UPDATE TECHNICALCHARACTERISTICPRODUCTIONEQUIPMENT SET deleted = 1 WHERE TechnicalCharacteristicProductionEquipment_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TechnicalCharacteristicProductionEquipmentBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TechnicalCharacteristicProductionEquipment_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TCPEOrdinalNumber", nullable = false)
	protected int TCPEOrdinalNumber;
	@Column(name = "TCPECharacteristicDescription", nullable = false)
	protected String TCPECharacteristicDescription;
	@Column(name = "TCPECharacteristicValue", nullable = false)
	protected String TCPECharacteristicValue;
	@Column(name = "TCPEMeasurementUnit")
	protected String TCPEMeasurementUnit;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="technologicalUnit")
    protected TechnologicalUnitBean technologicalUnit;

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

    @JsonProperty("TCPEOrdinalNumber")
	public int getTCPEOrdinalNumber() {
		return TCPEOrdinalNumber;
	}

	public void setTCPEOrdinalNumber(int TCPEOrdinalNumber) {
		this.TCPEOrdinalNumber = TCPEOrdinalNumber;
	}

    @JsonProperty("TCPECharacteristicDescription")
	public String getTCPECharacteristicDescription() {
		return TCPECharacteristicDescription;
	}

	public void setTCPECharacteristicDescription(String TCPECharacteristicDescription) {
		this.TCPECharacteristicDescription = TCPECharacteristicDescription;
	}

    @JsonProperty("TCPECharacteristicValue")
	public String getTCPECharacteristicValue() {
		return TCPECharacteristicValue;
	}

	public void setTCPECharacteristicValue(String TCPECharacteristicValue) {
		this.TCPECharacteristicValue = TCPECharacteristicValue;
	}

    @JsonProperty("TCPEMeasurementUnit")
	public String getTCPEMeasurementUnit() {
		return TCPEMeasurementUnit;
	}

	public void setTCPEMeasurementUnit(String TCPEMeasurementUnit) {
		this.TCPEMeasurementUnit = TCPEMeasurementUnit;
	}


    @JsonProperty("technologicalUnit")
	public TechnologicalUnitBean getTechnologicalUnit() {
		return technologicalUnit;
	}

    public void setTechnologicalUnit(TechnologicalUnitBean technologicalUnit) {
		this.technologicalUnit = technologicalUnit;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TechnicalCharacteristicProductionEquipmentBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TechnicalCharacteristicProductionEquipmentBean) o).getId()));
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
		return "TechnicalCharacteristicProductionEquipmentBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TCPEOrdinalNumber=" + TCPEOrdinalNumber
			+ ", TCPECharacteristicDescription=" + TCPECharacteristicDescription
			+ ", TCPECharacteristicValue=" + TCPECharacteristicValue
			+ ", TCPEMeasurementUnit=" + TCPEMeasurementUnit
			// + ", technologicalUnit=" + technologicalUnit
			+ "]";
	}
}