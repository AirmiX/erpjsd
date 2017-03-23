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

import com.doobgroup.server.entities.sellingprice.SellingPriceBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;
import com.doobgroup.server.entities.order.OrderItemBean;

@Entity
@Table(name = "COMMERCIALITYSTATUS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CSCode"  	}))
@SQLDelete(sql="UPDATE COMMERCIALITYSTATUS SET deleted = 1 WHERE CommercialityStatus_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class CommercialityStatusBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CommercialityStatus_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CSCode", nullable = false)
	protected int CSCode;
	@Column(name = "CSName", nullable = false)
	protected String CSName;
	@Column(name = "CSDescription")
	protected String CSDescription;

    @OneToMany(mappedBy = "commercialityStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<SellingPriceBean> sellingPrices = new HashSet<SellingPriceBean>();
    @OneToMany(mappedBy = "commercialityStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestItemBean> customerRequestItems = new HashSet<CustomerRequestItemBean>();
    @OneToMany(mappedBy = "commercialityStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();

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

    @JsonProperty("CSCode")
	public int getCSCode() {
		return CSCode;
	}

	public void setCSCode(int CSCode) {
		this.CSCode = CSCode;
	}

    @JsonProperty("CSName")
	public String getCSName() {
		return CSName;
	}

	public void setCSName(String CSName) {
		this.CSName = CSName;
	}

    @JsonProperty("CSDescription")
	public String getCSDescription() {
		return CSDescription;
	}

	public void setCSDescription(String CSDescription) {
		this.CSDescription = CSDescription;
	}


    @JsonProperty("sellingPrices")
	public Set<SellingPriceBean> getSellingPrices() {
		return sellingPrices;
	}

	public void setSellingPrices(Set<SellingPriceBean> sellingPrices) {
		this.sellingPrices = sellingPrices;
	}

    @JsonProperty("customerRequestItems")
	public Set<CustomerRequestItemBean> getCustomerRequestItems() {
		return customerRequestItems;
	}

	public void setCustomerRequestItems(Set<CustomerRequestItemBean> customerRequestItems) {
		this.customerRequestItems = customerRequestItems;
	}

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof CommercialityStatusBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((CommercialityStatusBean) o).getId()));
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
		return "CommercialityStatusBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CSCode=" + CSCode
			+ ", CSName=" + CSName
			+ ", CSDescription=" + CSDescription
			// + ", sellingPrices=" + sellingPrices
			// + ", customerRequestItems=" + customerRequestItems
			// + ", orderItems=" + orderItems
			+ "]";
	}
}