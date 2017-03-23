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

import com.doobgroup.server.entities.commonbusinessentities.ClassificationBean;

@Entity
@Table(name = "CLASSIFICATIONARCHIVE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CATime"  ,  "currentValue"  	}))
@SQLDelete(sql="UPDATE CLASSIFICATIONARCHIVE SET deleted = 1 WHERE ClassificationArchive_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ClassificationArchiveBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ClassificationArchive_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CATime", nullable = false)
	protected Date CATime;
	@Column(name = "CAName", nullable = false)
	protected String CAName;
	@Column(name = "CAShortName")
	protected String CAShortName;
	@Column(name = "CAFinalClassification")
	protected Boolean CAFinalClassification;
	@Column(name = "CAIsAutomatic")
	protected Boolean CAIsAutomatic;
	@Column(name = "CANameFormat")
	protected String CANameFormat;
	@Column(name = "CAOperation")
	protected char CAOperation;
	@Column(name = "CAIdentificationCodeArchive")
	protected int CAIdentificationCodeArchive;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currentValue")
    protected ClassificationBean currentValue;

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

    @JsonProperty("CATime")
	public Date getCATime() {
		return CATime;
	}

	public void setCATime(Date CATime) {
		this.CATime = CATime;
	}

    @JsonProperty("CAName")
	public String getCAName() {
		return CAName;
	}

	public void setCAName(String CAName) {
		this.CAName = CAName;
	}

    @JsonProperty("CAShortName")
	public String getCAShortName() {
		return CAShortName;
	}

	public void setCAShortName(String CAShortName) {
		this.CAShortName = CAShortName;
	}

    @JsonProperty("CAFinalClassification")
	public Boolean getCAFinalClassification() {
		return CAFinalClassification;
	}

	public void setCAFinalClassification(Boolean CAFinalClassification) {
		this.CAFinalClassification = CAFinalClassification;
	}

    @JsonProperty("CAIsAutomatic")
	public Boolean getCAIsAutomatic() {
		return CAIsAutomatic;
	}

	public void setCAIsAutomatic(Boolean CAIsAutomatic) {
		this.CAIsAutomatic = CAIsAutomatic;
	}

    @JsonProperty("CANameFormat")
	public String getCANameFormat() {
		return CANameFormat;
	}

	public void setCANameFormat(String CANameFormat) {
		this.CANameFormat = CANameFormat;
	}

    @JsonProperty("CAOperation")
	public char getCAOperation() {
		return CAOperation;
	}

	public void setCAOperation(char CAOperation) {
		this.CAOperation = CAOperation;
	}

    @JsonProperty("CAIdentificationCodeArchive")
	public int getCAIdentificationCodeArchive() {
		return CAIdentificationCodeArchive;
	}

	public void setCAIdentificationCodeArchive(int CAIdentificationCodeArchive) {
		this.CAIdentificationCodeArchive = CAIdentificationCodeArchive;
	}


    @JsonProperty("currentValue")
	public ClassificationBean getCurrentValue() {
		return currentValue;
	}

    public void setCurrentValue(ClassificationBean currentValue) {
		this.currentValue = currentValue;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ClassificationArchiveBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ClassificationArchiveBean) o).getId()));
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
		return "ClassificationArchiveBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CATime=" + CATime
			+ ", CAName=" + CAName
			+ ", CAShortName=" + CAShortName
			+ ", CAFinalClassification=" + CAFinalClassification
			+ ", CAIsAutomatic=" + CAIsAutomatic
			+ ", CANameFormat=" + CANameFormat
			+ ", CAOperation=" + CAOperation
			+ ", CAIdentificationCodeArchive=" + CAIdentificationCodeArchive
			// + ", currentValue=" + currentValue
			+ "]";
	}
}