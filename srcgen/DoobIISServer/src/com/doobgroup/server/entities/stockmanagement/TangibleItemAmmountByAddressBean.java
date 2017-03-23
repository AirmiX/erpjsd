package com.doobgroup.server.entities.stockmanagement;

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

import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;

@Entity
@Table(name = "TANGIBLEITEMAMMOUNTBYADDRESS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TIAALocationAddress"  ,  "tangibleItemCondition"  	}))
@SQLDelete(sql="UPDATE TANGIBLEITEMAMMOUNTBYADDRESS SET deleted = 1 WHERE TangibleItemAmmountByAddress_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TangibleItemAmmountByAddressBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TangibleItemAmmountByAddress_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TIAALocationAddress", nullable = false)
	protected String TIAALocationAddress;
	@Column(name = "TIAAAvailableAmmount", nullable = false)
	protected int TIAAAvailableAmmount;
	@Column(name = "TIAAAddressCapacity")
	protected int TIAAAddressCapacity;
	@Column(name = "TIAAActivationDate", nullable = false)
	protected Date TIAAActivationDate;
	@Column(name = "TIAAQuantity", nullable = false)
	protected int TIAAQuantity;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;

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

    @JsonProperty("TIAALocationAddress")
	public String getTIAALocationAddress() {
		return TIAALocationAddress;
	}

	public void setTIAALocationAddress(String TIAALocationAddress) {
		this.TIAALocationAddress = TIAALocationAddress;
	}

    @JsonProperty("TIAAAvailableAmmount")
	public int getTIAAAvailableAmmount() {
		return TIAAAvailableAmmount;
	}

	public void setTIAAAvailableAmmount(int TIAAAvailableAmmount) {
		this.TIAAAvailableAmmount = TIAAAvailableAmmount;
	}

    @JsonProperty("TIAAAddressCapacity")
	public int getTIAAAddressCapacity() {
		return TIAAAddressCapacity;
	}

	public void setTIAAAddressCapacity(int TIAAAddressCapacity) {
		this.TIAAAddressCapacity = TIAAAddressCapacity;
	}

    @JsonProperty("TIAAActivationDate")
	public Date getTIAAActivationDate() {
		return TIAAActivationDate;
	}

	public void setTIAAActivationDate(Date TIAAActivationDate) {
		this.TIAAActivationDate = TIAAActivationDate;
	}

    @JsonProperty("TIAAQuantity")
	public int getTIAAQuantity() {
		return TIAAQuantity;
	}

	public void setTIAAQuantity(int TIAAQuantity) {
		this.TIAAQuantity = TIAAQuantity;
	}


    @JsonProperty("tangibleItemCondition")
	public TangibleItemConditionBean getTangibleItemCondition() {
		return tangibleItemCondition;
	}

    public void setTangibleItemCondition(TangibleItemConditionBean tangibleItemCondition) {
		this.tangibleItemCondition = tangibleItemCondition;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TangibleItemAmmountByAddressBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TangibleItemAmmountByAddressBean) o).getId()));
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
		return "TangibleItemAmmountByAddressBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TIAALocationAddress=" + TIAALocationAddress
			+ ", TIAAAvailableAmmount=" + TIAAAvailableAmmount
			+ ", TIAAAddressCapacity=" + TIAAAddressCapacity
			+ ", TIAAActivationDate=" + TIAAActivationDate
			+ ", TIAAQuantity=" + TIAAQuantity
			// + ", tangibleItemCondition=" + tangibleItemCondition
			+ "]";
	}
}