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
@Table(name = "TANGIBLEITEMAMMOUNTBYLOT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TIALLotNumber" ,   "TIALLocationAddress"  ,  "tangibleItemCondition"  	}))
@SQLDelete(sql="UPDATE TANGIBLEITEMAMMOUNTBYLOT SET deleted = 1 WHERE TangibleItemAmmountByLot_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TangibleItemAmmountByLotBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TangibleItemAmmountByLot_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TIALLotNumber", nullable = false)
	protected String TIALLotNumber;
	@Column(name = "TIALLocationAddress", nullable = false)
	protected String TIALLocationAddress;
	@Column(name = "TIALAvailableAmmount", nullable = false)
	protected int TIALAvailableAmmount;
	@Column(name = "TIALAddressCapacity")
	protected int TIALAddressCapacity;
	@Column(name = "TIALActivationDate", nullable = false)
	protected Date TIALActivationDate;
	@Column(name = "TIALQuantity", nullable = false)
	protected int TIALQuantity;

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

    @JsonProperty("TIALLotNumber")
	public String getTIALLotNumber() {
		return TIALLotNumber;
	}

	public void setTIALLotNumber(String TIALLotNumber) {
		this.TIALLotNumber = TIALLotNumber;
	}

    @JsonProperty("TIALLocationAddress")
	public String getTIALLocationAddress() {
		return TIALLocationAddress;
	}

	public void setTIALLocationAddress(String TIALLocationAddress) {
		this.TIALLocationAddress = TIALLocationAddress;
	}

    @JsonProperty("TIALAvailableAmmount")
	public int getTIALAvailableAmmount() {
		return TIALAvailableAmmount;
	}

	public void setTIALAvailableAmmount(int TIALAvailableAmmount) {
		this.TIALAvailableAmmount = TIALAvailableAmmount;
	}

    @JsonProperty("TIALAddressCapacity")
	public int getTIALAddressCapacity() {
		return TIALAddressCapacity;
	}

	public void setTIALAddressCapacity(int TIALAddressCapacity) {
		this.TIALAddressCapacity = TIALAddressCapacity;
	}

    @JsonProperty("TIALActivationDate")
	public Date getTIALActivationDate() {
		return TIALActivationDate;
	}

	public void setTIALActivationDate(Date TIALActivationDate) {
		this.TIALActivationDate = TIALActivationDate;
	}

    @JsonProperty("TIALQuantity")
	public int getTIALQuantity() {
		return TIALQuantity;
	}

	public void setTIALQuantity(int TIALQuantity) {
		this.TIALQuantity = TIALQuantity;
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
		if (o == null || !(o instanceof TangibleItemAmmountByLotBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TangibleItemAmmountByLotBean) o).getId()));
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
		return "TangibleItemAmmountByLotBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TIALLotNumber=" + TIALLotNumber
			+ ", TIALLocationAddress=" + TIALLocationAddress
			+ ", TIALAvailableAmmount=" + TIALAvailableAmmount
			+ ", TIALAddressCapacity=" + TIALAddressCapacity
			+ ", TIALActivationDate=" + TIALActivationDate
			+ ", TIALQuantity=" + TIALQuantity
			// + ", tangibleItemCondition=" + tangibleItemCondition
			+ "]";
	}
}