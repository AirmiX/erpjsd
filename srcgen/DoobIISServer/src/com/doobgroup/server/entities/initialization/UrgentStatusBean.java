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

import com.doobgroup.server.entities.customerrequest.CustomerRequestItemBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.internalorder.BEOrderItemBean;

@Entity
@Table(name = "URGENTSTATUS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "USCode"  	}))
@SQLDelete(sql="UPDATE URGENTSTATUS SET deleted = 1 WHERE UrgentStatus_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class UrgentStatusBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "UrgentStatus_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "USCode", nullable = false)
	protected int USCode;
	@Column(name = "USDescription", nullable = false)
	protected String USDescription;

    @OneToMany(mappedBy = "urgentStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestItemBean> customerRequestItems = new HashSet<CustomerRequestItemBean>();
    @OneToMany(mappedBy = "urgentStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<CustomerRequestHeadingBean> customerRequestHeaders = new HashSet<CustomerRequestHeadingBean>();
    @OneToMany(mappedBy = "urgentStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderItemBean> orderItems = new HashSet<OrderItemBean>();
    @OneToMany(mappedBy = "urgentStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "urgentStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderItemBean> beOrderItems = new HashSet<BEOrderItemBean>();

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

    @JsonProperty("USCode")
	public int getUSCode() {
		return USCode;
	}

	public void setUSCode(int USCode) {
		this.USCode = USCode;
	}

    @JsonProperty("USDescription")
	public String getUSDescription() {
		return USDescription;
	}

	public void setUSDescription(String USDescription) {
		this.USDescription = USDescription;
	}


    @JsonProperty("customerRequestItems")
	public Set<CustomerRequestItemBean> getCustomerRequestItems() {
		return customerRequestItems;
	}

	public void setCustomerRequestItems(Set<CustomerRequestItemBean> customerRequestItems) {
		this.customerRequestItems = customerRequestItems;
	}

    @JsonProperty("customerRequestHeaders")
	public Set<CustomerRequestHeadingBean> getCustomerRequestHeaders() {
		return customerRequestHeaders;
	}

	public void setCustomerRequestHeaders(Set<CustomerRequestHeadingBean> customerRequestHeaders) {
		this.customerRequestHeaders = customerRequestHeaders;
	}

    @JsonProperty("orderItems")
	public Set<OrderItemBean> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(Set<OrderItemBean> orderItems) {
		this.orderItems = orderItems;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("beOrderItems")
	public Set<BEOrderItemBean> getBeOrderItems() {
		return beOrderItems;
	}

	public void setBeOrderItems(Set<BEOrderItemBean> beOrderItems) {
		this.beOrderItems = beOrderItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof UrgentStatusBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((UrgentStatusBean) o).getId()));
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
		return "UrgentStatusBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", USCode=" + USCode
			+ ", USDescription=" + USDescription
			// + ", customerRequestItems=" + customerRequestItems
			// + ", customerRequestHeaders=" + customerRequestHeaders
			// + ", orderItems=" + orderItems
			// + ", orderHeadings=" + orderHeadings
			// + ", beOrderItems=" + beOrderItems
			+ "]";
	}
}