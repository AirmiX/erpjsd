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

import com.doobgroup.server.entities.corporation.EmployeeBean;

@Entity
@Table(name = "APPUSER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "UIdentificationCode"  	}))
@SQLDelete(sql="UPDATE APPUSER SET deleted = 1 WHERE AppUser_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AppUserBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "AppUser_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "UIdentificationCode", nullable = false)
	protected int UIdentificationCode;
	@Column(name = "UUsername")
	protected String UUsername;
	@Column(name = "UPassword")
	protected String UPassword;
	@Column(name = "UFirstName")
	protected String UFirstName;
	@Column(name = "ULastName")
	protected String ULastName;
	@Column(name = "ULogged")
	protected Boolean ULogged;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="employee")
    protected EmployeeBean employee;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "UserGroup_AppUser", joinColumns = { 
			@JoinColumn(name = "AppUser_id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "UserGroup_id", 
					nullable = false, updatable = false) })
	protected Set<UserGroupBean> userGroups = new HashSet<UserGroupBean>();


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

    @JsonProperty("UIdentificationCode")
	public int getUIdentificationCode() {
		return UIdentificationCode;
	}

	public void setUIdentificationCode(int UIdentificationCode) {
		this.UIdentificationCode = UIdentificationCode;
	}

    @JsonProperty("UUsername")
	public String getUUsername() {
		return UUsername;
	}

	public void setUUsername(String UUsername) {
		this.UUsername = UUsername;
	}

    @JsonProperty("UPassword")
	public String getUPassword() {
		return UPassword;
	}

	public void setUPassword(String UPassword) {
		this.UPassword = UPassword;
	}

    @JsonProperty("UFirstName")
	public String getUFirstName() {
		return UFirstName;
	}

	public void setUFirstName(String UFirstName) {
		this.UFirstName = UFirstName;
	}

    @JsonProperty("ULastName")
	public String getULastName() {
		return ULastName;
	}

	public void setULastName(String ULastName) {
		this.ULastName = ULastName;
	}

    @JsonProperty("ULogged")
	public Boolean getULogged() {
		return ULogged;
	}

	public void setULogged(Boolean ULogged) {
		this.ULogged = ULogged;
	}


    @JsonProperty("employee")
	public EmployeeBean getEmployee() {
		return employee;
	}

    public void setEmployee(EmployeeBean employee) {
		this.employee = employee;
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
		if (o == null || !(o instanceof AppUserBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AppUserBean) o).getId()));
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
		return "AppUserBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", UIdentificationCode=" + UIdentificationCode
			+ ", UUsername=" + UUsername
			+ ", UPassword=" + UPassword
			+ ", UFirstName=" + UFirstName
			+ ", ULastName=" + ULastName
			+ ", ULogged=" + ULogged
			// + ", employee=" + employee
			+ "]";
	}
}