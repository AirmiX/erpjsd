package com.doobgroup.server.entities.internalinvoice;

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

import com.doobgroup.server.entities.internalorder.BEOrderItemBean;
import com.doobgroup.server.entities.internalinvoice.BEInvoiceBean;

@Entity
@Table(name = "BEINVOICEITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BEIIOrdinalNumber"  ,  "beInvoice"  	}))
@SQLDelete(sql="UPDATE BEINVOICEITEM SET deleted = 1 WHERE BEInvoiceItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BEInvoiceItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BEInvoiceItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BEIIOrdinalNumber", nullable = false)
	protected int BEIIOrdinalNumber;
	@Column(name = "BEIIQuantity", nullable = false)
	protected int BEIIQuantity;
	@Column(name = "BEIIPrice")
	protected int BEIIPrice;
	@Column(name = "BEIIValue")
	protected int BEIIValue;
	@Column(name = "BEIIRebate")
	protected int BEIIRebate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="beOrderItem")
    protected BEOrderItemBean beOrderItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="beInvoice")
    protected BEInvoiceBean beInvoice;

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

    @JsonProperty("BEIIOrdinalNumber")
	public int getBEIIOrdinalNumber() {
		return BEIIOrdinalNumber;
	}

	public void setBEIIOrdinalNumber(int BEIIOrdinalNumber) {
		this.BEIIOrdinalNumber = BEIIOrdinalNumber;
	}

    @JsonProperty("BEIIQuantity")
	public int getBEIIQuantity() {
		return BEIIQuantity;
	}

	public void setBEIIQuantity(int BEIIQuantity) {
		this.BEIIQuantity = BEIIQuantity;
	}

    @JsonProperty("BEIIPrice")
	public int getBEIIPrice() {
		return BEIIPrice;
	}

	public void setBEIIPrice(int BEIIPrice) {
		this.BEIIPrice = BEIIPrice;
	}

    @JsonProperty("BEIIValue")
	public int getBEIIValue() {
		return BEIIValue;
	}

	public void setBEIIValue(int BEIIValue) {
		this.BEIIValue = BEIIValue;
	}

    @JsonProperty("BEIIRebate")
	public int getBEIIRebate() {
		return BEIIRebate;
	}

	public void setBEIIRebate(int BEIIRebate) {
		this.BEIIRebate = BEIIRebate;
	}


    @JsonProperty("beOrderItem")
	public BEOrderItemBean getBeOrderItem() {
		return beOrderItem;
	}

    public void setBeOrderItem(BEOrderItemBean beOrderItem) {
		this.beOrderItem = beOrderItem;
	}

    @JsonProperty("beInvoice")
	public BEInvoiceBean getBeInvoice() {
		return beInvoice;
	}

    public void setBeInvoice(BEInvoiceBean beInvoice) {
		this.beInvoice = beInvoice;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BEInvoiceItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BEInvoiceItemBean) o).getId()));
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
		return "BEInvoiceItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BEIIOrdinalNumber=" + BEIIOrdinalNumber
			+ ", BEIIQuantity=" + BEIIQuantity
			+ ", BEIIPrice=" + BEIIPrice
			+ ", BEIIValue=" + BEIIValue
			+ ", BEIIRebate=" + BEIIRebate
			// + ", beOrderItem=" + beOrderItem
			// + ", beInvoice=" + beInvoice
			+ "]";
	}
}