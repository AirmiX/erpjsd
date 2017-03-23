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

@Entity
@Table(name = "IDENTIFICATIONARCHIVE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "IATime"  ,  "currentValue"  	}))
@SQLDelete(sql="UPDATE IDENTIFICATIONARCHIVE SET deleted = 1 WHERE IdentificationArchive_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class IdentificationArchiveBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "IdentificationArchive_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "IATime", nullable = false)
	protected Date IATime;
	@Column(name = "IAName")
	protected String IAName;
	@Column(name = "IAShortName")
	protected String IAShortName;
	@Column(name = "IAParallelCode")
	protected String IAParallelCode;
	@Column(name = "IADrawingIdentificationNumber")
	protected String IADrawingIdentificationNumber;
	@Column(name = "IAOperation")
	protected char IAOperation;
	@Column(name = "IAIdentificationCodeArchive")
	protected int IAIdentificationCodeArchive;
	@Column(name = "IIsPayable")
	protected Boolean IIsPayable;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currentValue")
    protected IdentificationBean currentValue;

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

    @JsonProperty("IATime")
	public Date getIATime() {
		return IATime;
	}

	public void setIATime(Date IATime) {
		this.IATime = IATime;
	}

    @JsonProperty("IAName")
	public String getIAName() {
		return IAName;
	}

	public void setIAName(String IAName) {
		this.IAName = IAName;
	}

    @JsonProperty("IAShortName")
	public String getIAShortName() {
		return IAShortName;
	}

	public void setIAShortName(String IAShortName) {
		this.IAShortName = IAShortName;
	}

    @JsonProperty("IAParallelCode")
	public String getIAParallelCode() {
		return IAParallelCode;
	}

	public void setIAParallelCode(String IAParallelCode) {
		this.IAParallelCode = IAParallelCode;
	}

    @JsonProperty("IADrawingIdentificationNumber")
	public String getIADrawingIdentificationNumber() {
		return IADrawingIdentificationNumber;
	}

	public void setIADrawingIdentificationNumber(String IADrawingIdentificationNumber) {
		this.IADrawingIdentificationNumber = IADrawingIdentificationNumber;
	}

    @JsonProperty("IAOperation")
	public char getIAOperation() {
		return IAOperation;
	}

	public void setIAOperation(char IAOperation) {
		this.IAOperation = IAOperation;
	}

    @JsonProperty("IAIdentificationCodeArchive")
	public int getIAIdentificationCodeArchive() {
		return IAIdentificationCodeArchive;
	}

	public void setIAIdentificationCodeArchive(int IAIdentificationCodeArchive) {
		this.IAIdentificationCodeArchive = IAIdentificationCodeArchive;
	}

    @JsonProperty("IIsPayable")
	public Boolean getIIsPayable() {
		return IIsPayable;
	}

	public void setIIsPayable(Boolean IIsPayable) {
		this.IIsPayable = IIsPayable;
	}


    @JsonProperty("currentValue")
	public IdentificationBean getCurrentValue() {
		return currentValue;
	}

    public void setCurrentValue(IdentificationBean currentValue) {
		this.currentValue = currentValue;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof IdentificationArchiveBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((IdentificationArchiveBean) o).getId()));
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
		return "IdentificationArchiveBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", IATime=" + IATime
			+ ", IAName=" + IAName
			+ ", IAShortName=" + IAShortName
			+ ", IAParallelCode=" + IAParallelCode
			+ ", IADrawingIdentificationNumber=" + IADrawingIdentificationNumber
			+ ", IAOperation=" + IAOperation
			+ ", IAIdentificationCodeArchive=" + IAIdentificationCodeArchive
			+ ", IIsPayable=" + IIsPayable
			// + ", currentValue=" + currentValue
			+ "]";
	}
}