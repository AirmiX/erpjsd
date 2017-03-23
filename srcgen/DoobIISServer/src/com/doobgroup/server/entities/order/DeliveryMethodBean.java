package com.doobgroup.server.entities.order;

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

import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;

@Entity
@Table(name = "DELIVERYMETHOD"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "DMCode"  	}))
@SQLDelete(sql="UPDATE DELIVERYMETHOD SET deleted = 1 WHERE DeliveryMethod_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class DeliveryMethodBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DeliveryMethod_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "DMCode", nullable = false)
	protected int DMCode;
	@Column(name = "DMName", nullable = false)
	protected String DMName;
	@Column(name = "DMDescription")
	protected String DMDescription;

    @OneToMany(mappedBy = "deliveryMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();
    @OneToMany(mappedBy = "deliveryMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadings = new HashSet<BEOrderHeadingBean>();
    @OneToMany(mappedBy = "deliveryMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();
    @OneToMany(mappedBy = "deliveryMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings = new HashSet<GoodsReceivedNoteHeadingBean>();

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

    @JsonProperty("DMCode")
	public int getDMCode() {
		return DMCode;
	}

	public void setDMCode(int DMCode) {
		this.DMCode = DMCode;
	}

    @JsonProperty("DMName")
	public String getDMName() {
		return DMName;
	}

	public void setDMName(String DMName) {
		this.DMName = DMName;
	}

    @JsonProperty("DMDescription")
	public String getDMDescription() {
		return DMDescription;
	}

	public void setDMDescription(String DMDescription) {
		this.DMDescription = DMDescription;
	}


    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}

    @JsonProperty("beOrderHeadings")
	public Set<BEOrderHeadingBean> getBeOrderHeadings() {
		return beOrderHeadings;
	}

	public void setBeOrderHeadings(Set<BEOrderHeadingBean> beOrderHeadings) {
		this.beOrderHeadings = beOrderHeadings;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}

    @JsonProperty("goodsReceivedNoteHeadings")
	public Set<GoodsReceivedNoteHeadingBean> getGoodsReceivedNoteHeadings() {
		return goodsReceivedNoteHeadings;
	}

	public void setGoodsReceivedNoteHeadings(Set<GoodsReceivedNoteHeadingBean> goodsReceivedNoteHeadings) {
		this.goodsReceivedNoteHeadings = goodsReceivedNoteHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof DeliveryMethodBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((DeliveryMethodBean) o).getId()));
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
		return "DeliveryMethodBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", DMCode=" + DMCode
			+ ", DMName=" + DMName
			+ ", DMDescription=" + DMDescription
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			// + ", beOrderHeadings=" + beOrderHeadings
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			// + ", goodsReceivedNoteHeadings=" + goodsReceivedNoteHeadings
			+ "]";
	}
}