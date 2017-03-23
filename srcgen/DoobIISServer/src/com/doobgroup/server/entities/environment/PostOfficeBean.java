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

import com.doobgroup.server.entities.environment.AddressBean;

@Entity
@Table(name = "POSTOFFICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PONumber"  	}))
@SQLDelete(sql="UPDATE POSTOFFICE SET deleted = 1 WHERE PostOffice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PostOfficeBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PostOffice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PONumber", nullable = false)
	protected String PONumber;
	@Column(name = "POName")
	protected String POName;

    @OneToMany(mappedBy = "postOffice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AddressBean> addresses = new HashSet<AddressBean>();

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

    @JsonProperty("PONumber")
	public String getPONumber() {
		return PONumber;
	}

	public void setPONumber(String PONumber) {
		this.PONumber = PONumber;
	}

    @JsonProperty("POName")
	public String getPOName() {
		return POName;
	}

	public void setPOName(String POName) {
		this.POName = POName;
	}


    @JsonProperty("addresses")
	public Set<AddressBean> getAddresses() {
		return addresses;
	}

	public void setAddresses(Set<AddressBean> addresses) {
		this.addresses = addresses;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PostOfficeBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PostOfficeBean) o).getId()));
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
		return "PostOfficeBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PONumber=" + PONumber
			+ ", POName=" + POName
			// + ", addresses=" + addresses
			+ "]";
	}
}