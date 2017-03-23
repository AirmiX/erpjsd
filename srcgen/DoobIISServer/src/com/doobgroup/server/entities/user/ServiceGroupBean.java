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
@Table(name = "SERVICEGROUP"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "SGIdentificationCode"  	}))
@SQLDelete(sql="UPDATE SERVICEGROUP SET deleted = 1 WHERE ServiceGroup_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ServiceGroupBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ServiceGroup_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "Service_ServiceGroup", joinColumns = { 
			@JoinColumn(name = "ServiceGroup_id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "Service_id", 
					nullable = false, updatable = false) })
	protected Set<ServiceBean> services = new HashSet<ServiceBean>();
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "UserGroup_ServiceGroup", joinColumns = { 
			@JoinColumn(name = "ServiceGroup_id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "UserGroup_id", 
					nullable = false, updatable = false) })
	protected Set<UserGroupBean> userGroups = new HashSet<UserGroupBean>();

	@Column(name = "SGIdentificationCode", nullable = false)
	protected int SGIdentificationCode;
	@Column(name = "SGName")
	protected String SGName;


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

    @JsonProperty("SGIdentificationCode")
	public int getSGIdentificationCode() {
		return SGIdentificationCode;
	}

	public void setSGIdentificationCode(int SGIdentificationCode) {
		this.SGIdentificationCode = SGIdentificationCode;
	}

    @JsonProperty("SGName")
	public String getSGName() {
		return SGName;
	}

	public void setSGName(String SGName) {
		this.SGName = SGName;
	}
	
	public Set<ServiceBean> getServices() {
		return services;
	}

	public void setServices(Set<ServiceBean> services) {
		this.services = services;
	}

	public Set<UserGroupBean> getUserGroups() {
		return userGroups;
	}

	public void setUserGroups(Set<UserGroupBean> userGroups) {
		this.userGroups = userGroups;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ServiceGroupBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ServiceGroupBean) o).getId()));
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
		return "ServiceGroupBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SGIdentificationCode=" + SGIdentificationCode
			+ ", SGName=" + SGName
			+ "]";
	}
}