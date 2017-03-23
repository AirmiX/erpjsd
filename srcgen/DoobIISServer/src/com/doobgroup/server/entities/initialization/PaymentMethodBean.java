package com.doobgroup.server.entities.initialization;

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

import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;

@Entity
@Table(name = "PAYMENTMETHOD"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PMCode"  	}))
@SQLDelete(sql="UPDATE PAYMENTMETHOD SET deleted = 1 WHERE PaymentMethod_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PaymentMethodBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PaymentMethod_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PMCode", nullable = false)
	protected int PMCode;
	@Column(name = "PMName", nullable = false)
	protected String PMName;
	@Column(name = "PMDescription")
	protected String PMDescription;
	@Column(name = "PMEnabled", nullable = false)
	protected Boolean PMEnabled;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadings = new HashSet<BEOrderHeadingBean>();
    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();
    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippingDocuments = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierHeadingBean> offerSupplierHeadings = new HashSet<OfferSupplierHeadingBean>();

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

    @JsonProperty("PMCode")
	public int getPMCode() {
		return PMCode;
	}

	public void setPMCode(int PMCode) {
		this.PMCode = PMCode;
	}

    @JsonProperty("PMName")
	public String getPMName() {
		return PMName;
	}

	public void setPMName(String PMName) {
		this.PMName = PMName;
	}

    @JsonProperty("PMDescription")
	public String getPMDescription() {
		return PMDescription;
	}

	public void setPMDescription(String PMDescription) {
		this.PMDescription = PMDescription;
	}

    @JsonProperty("PMEnabled")
	public Boolean getPMEnabled() {
		return PMEnabled;
	}

	public void setPMEnabled(Boolean PMEnabled) {
		this.PMEnabled = PMEnabled;
	}


    @JsonProperty("beOrderHeadings")
	public Set<BEOrderHeadingBean> getBeOrderHeadings() {
		return beOrderHeadings;
	}

	public void setBeOrderHeadings(Set<BEOrderHeadingBean> beOrderHeadings) {
		this.beOrderHeadings = beOrderHeadings;
	}

    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}

    @JsonProperty("shippingDocuments")
	public Set<ShippingDocumentBean> getShippingDocuments() {
		return shippingDocuments;
	}

	public void setShippingDocuments(Set<ShippingDocumentBean> shippingDocuments) {
		this.shippingDocuments = shippingDocuments;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("offerSupplierHeadings")
	public Set<OfferSupplierHeadingBean> getOfferSupplierHeadings() {
		return offerSupplierHeadings;
	}

	public void setOfferSupplierHeadings(Set<OfferSupplierHeadingBean> offerSupplierHeadings) {
		this.offerSupplierHeadings = offerSupplierHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PaymentMethodBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PaymentMethodBean) o).getId()));
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
		return "PaymentMethodBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PMCode=" + PMCode
			+ ", PMName=" + PMName
			+ ", PMDescription=" + PMDescription
			+ ", PMEnabled=" + PMEnabled
			// + ", beOrderHeadings=" + beOrderHeadings
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			// + ", shippingDocuments=" + shippingDocuments
			// + ", orderHeadings=" + orderHeadings
			// + ", offerSupplierHeadings=" + offerSupplierHeadings
			+ "]";
	}
}