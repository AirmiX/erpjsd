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

import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;

@Entity
@Table(name = "PACKING"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "POrdinalNumber"  ,  "shippingDocumentItem"  	}))
@SQLDelete(sql="UPDATE PACKING SET deleted = 1 WHERE Packing_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PackingBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Packing_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "POrdinalNumber", nullable = false)
	protected int POrdinalNumber;
	@Column(name = "PPackedQuantity", nullable = false)
	protected int PPackedQuantity;
	@Column(name = "PPackingDate", nullable = false)
	protected Date PPackingDate;
	@Column(name = "PAddress")
	protected String PAddress;
	@Column(name = "PBatch")
	protected String PBatch;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="shippingDocumentItem")
    protected ShippingDocumentItemBean shippingDocumentItem;

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

    @JsonProperty("POrdinalNumber")
	public int getPOrdinalNumber() {
		return POrdinalNumber;
	}

	public void setPOrdinalNumber(int POrdinalNumber) {
		this.POrdinalNumber = POrdinalNumber;
	}

    @JsonProperty("PPackedQuantity")
	public int getPPackedQuantity() {
		return PPackedQuantity;
	}

	public void setPPackedQuantity(int PPackedQuantity) {
		this.PPackedQuantity = PPackedQuantity;
	}

    @JsonProperty("PPackingDate")
	public Date getPPackingDate() {
		return PPackingDate;
	}

	public void setPPackingDate(Date PPackingDate) {
		this.PPackingDate = PPackingDate;
	}

    @JsonProperty("PAddress")
	public String getPAddress() {
		return PAddress;
	}

	public void setPAddress(String PAddress) {
		this.PAddress = PAddress;
	}

    @JsonProperty("PBatch")
	public String getPBatch() {
		return PBatch;
	}

	public void setPBatch(String PBatch) {
		this.PBatch = PBatch;
	}


    @JsonProperty("shippingDocumentItem")
	public ShippingDocumentItemBean getShippingDocumentItem() {
		return shippingDocumentItem;
	}

    public void setShippingDocumentItem(ShippingDocumentItemBean shippingDocumentItem) {
		this.shippingDocumentItem = shippingDocumentItem;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PackingBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PackingBean) o).getId()));
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
		return "PackingBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", POrdinalNumber=" + POrdinalNumber
			+ ", PPackedQuantity=" + PPackedQuantity
			+ ", PPackingDate=" + PPackingDate
			+ ", PAddress=" + PAddress
			+ ", PBatch=" + PBatch
			// + ", shippingDocumentItem=" + shippingDocumentItem
			+ "]";
	}
}