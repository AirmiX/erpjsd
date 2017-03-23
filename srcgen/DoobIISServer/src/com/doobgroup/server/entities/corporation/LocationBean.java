package com.doobgroup.server.entities.corporation;

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

import com.doobgroup.server.entities.corporation.LocationTypeBean;
import com.doobgroup.server.entities.productiondata.WorkCenterBean;

@Entity
@Table(name = "LOCATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "LIdentificationCode"  	}))
@SQLDelete(sql="UPDATE LOCATION SET deleted = 1 WHERE Location_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class LocationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Location_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "LIdentificationCode", nullable = false)
	protected int LIdentificationCode;
	@Column(name = "LName", nullable = false)
	protected String LName;
	@Column(name = "LShortName")
	protected String LShortName;
	@Column(name = "LTelephone")
	protected String LTelephone;
	@Column(name = "LClassification")
	protected String LClassification;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="type")
    protected LocationTypeBean type;
    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkCenterBean> workCenters = new HashSet<WorkCenterBean>();

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

    @JsonProperty("LIdentificationCode")
	public int getLIdentificationCode() {
		return LIdentificationCode;
	}

	public void setLIdentificationCode(int LIdentificationCode) {
		this.LIdentificationCode = LIdentificationCode;
	}

    @JsonProperty("LName")
	public String getLName() {
		return LName;
	}

	public void setLName(String LName) {
		this.LName = LName;
	}

    @JsonProperty("LShortName")
	public String getLShortName() {
		return LShortName;
	}

	public void setLShortName(String LShortName) {
		this.LShortName = LShortName;
	}

    @JsonProperty("LTelephone")
	public String getLTelephone() {
		return LTelephone;
	}

	public void setLTelephone(String LTelephone) {
		this.LTelephone = LTelephone;
	}

    @JsonProperty("LClassification")
	public String getLClassification() {
		return LClassification;
	}

	public void setLClassification(String LClassification) {
		this.LClassification = LClassification;
	}


    @JsonProperty("type")
	public LocationTypeBean getType() {
		return type;
	}

    public void setType(LocationTypeBean type) {
		this.type = type;
	}

    @JsonProperty("workCenters")
	public Set<WorkCenterBean> getWorkCenters() {
		return workCenters;
	}

	public void setWorkCenters(Set<WorkCenterBean> workCenters) {
		this.workCenters = workCenters;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof LocationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((LocationBean) o).getId()));
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
		return "LocationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", LIdentificationCode=" + LIdentificationCode
			+ ", LName=" + LName
			+ ", LShortName=" + LShortName
			+ ", LTelephone=" + LTelephone
			+ ", LClassification=" + LClassification
			// + ", type=" + type
			// + ", workCenters=" + workCenters
			+ "]";
	}
}