package com.doobgroup.server.entities.environment;

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
@Table(name = "TERRITORIALUNIT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TUCode"  	}))
@SQLDelete(sql="UPDATE TERRITORIALUNIT SET deleted = 1 WHERE TerritorialUnit_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TerritorialUnitBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TerritorialUnit_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TUCode", nullable = false)
	protected String TUCode;
	@Column(name = "TUName", nullable = false)
	protected String TUName;
	@Column(name = "TUShortName")
	protected String TUShortName;
	@Column(name = "TUIsLeaf")
	protected Boolean TUIsLeaf;
	@Column(name = "TUNumberOfSubordinateTUs")
	protected int TUNumberOfSubordinateTUs;


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

    @JsonProperty("TUCode")
	public String getTUCode() {
		return TUCode;
	}

	public void setTUCode(String TUCode) {
		this.TUCode = TUCode;
	}

    @JsonProperty("TUName")
	public String getTUName() {
		return TUName;
	}

	public void setTUName(String TUName) {
		this.TUName = TUName;
	}

    @JsonProperty("TUShortName")
	public String getTUShortName() {
		return TUShortName;
	}

	public void setTUShortName(String TUShortName) {
		this.TUShortName = TUShortName;
	}

    @JsonProperty("TUIsLeaf")
	public Boolean getTUIsLeaf() {
		return TUIsLeaf;
	}

	public void setTUIsLeaf(Boolean TUIsLeaf) {
		this.TUIsLeaf = TUIsLeaf;
	}

    @JsonProperty("TUNumberOfSubordinateTUs")
	public int getTUNumberOfSubordinateTUs() {
		return TUNumberOfSubordinateTUs;
	}

	public void setTUNumberOfSubordinateTUs(int TUNumberOfSubordinateTUs) {
		this.TUNumberOfSubordinateTUs = TUNumberOfSubordinateTUs;
	}



	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TerritorialUnitBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TerritorialUnitBean) o).getId()));
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
		return "TerritorialUnitBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TUCode=" + TUCode
			+ ", TUName=" + TUName
			+ ", TUShortName=" + TUShortName
			+ ", TUIsLeaf=" + TUIsLeaf
			+ ", TUNumberOfSubordinateTUs=" + TUNumberOfSubordinateTUs
			+ "]";
	}
}