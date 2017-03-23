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
@Table(name = "USERGROUP"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "UGIdentificationCode"  	}))
@SQLDelete(sql="UPDATE USERGROUP SET deleted = 1 WHERE UserGroup_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class UserGroupBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "UserGroup_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "UGIdentificationCode", nullable = false)
	protected int UGIdentificationCode;
	@Column(name = "UGName")
	protected String UGName;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "UserGroup_AppUser", joinColumns = { 
			@JoinColumn(name = "UserGroup_id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "AppUser_id", 
					nullable = false, updatable = false) })
	protected Set<AppUserBean> appUsers = new HashSet<AppUserBean>();
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "UserGroup_ServiceGroup", joinColumns = { 
			@JoinColumn(name = "UserGroup_id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "ServiceGroup_id", 
					nullable = false, updatable = false) })
	protected Set<ServiceGroupBean> serviceGroups = new HashSet<ServiceGroupBean>();



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

    @JsonProperty("UGIdentificationCode")
	public int getUGIdentificationCode() {
		return UGIdentificationCode;
	}

	public void setUGIdentificationCode(int UGIdentificationCode) {
		this.UGIdentificationCode = UGIdentificationCode;
	}

    @JsonProperty("UGName")
	public String getUGName() {
		return UGName;
	}

	public void setUGName(String UGName) {
		this.UGName = UGName;
	}

	public Set<AppUserBean> getAppUsers() {
		return appUsers;
	}

	public void setAppUsers(Set<AppUserBean> appUsers) {
		this.appUsers = appUsers;
	}

	public Set<ServiceGroupBean> getServiceGroups() {
		return serviceGroups;
	}

	public void setServiceGroups(Set<ServiceGroupBean> serviceGroups) {
		this.serviceGroups = serviceGroups;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof UserGroupBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((UserGroupBean) o).getId()));
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
		return "UserGroupBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", UGIdentificationCode=" + UGIdentificationCode
			+ ", UGName=" + UGName
			+ "]";
	}
}