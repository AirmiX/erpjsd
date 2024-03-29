package com.doobgroup.server.entities.user;

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
@Table(name = "SERVICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SIdentificationCode"  	}))
@SQLDelete(sql="UPDATE SERVICE SET deleted = 1 WHERE Service_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ServiceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Service_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SIdentificationCode", nullable = false)
	protected int SIdentificationCode;
	@Column(name = "SUri")
	protected String SUri;
	@Column(name = "SMethod")
	protected String SMethod;


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

    @JsonProperty("SIdentificationCode")
	public int getSIdentificationCode() {
		return SIdentificationCode;
	}

	public void setSIdentificationCode(int SIdentificationCode) {
		this.SIdentificationCode = SIdentificationCode;
	}

    @JsonProperty("SUri")
	public String getSUri() {
		return SUri;
	}

	public void setSUri(String SUri) {
		this.SUri = SUri;
	}

    @JsonProperty("SMethod")
	public String getSMethod() {
		return SMethod;
	}

	public void setSMethod(String SMethod) {
		this.SMethod = SMethod;
	}



	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ServiceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ServiceBean) o).getId()));
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
		return "ServiceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SIdentificationCode=" + SIdentificationCode
			+ ", SUri=" + SUri
			+ ", SMethod=" + SMethod
			+ "]";
	}
}