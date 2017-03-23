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

import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.order.OrderItemBean;

@Entity
@Table(name = "ORDERGROUP"
)
@SQLDelete(sql="UPDATE ORDERGROUP SET deleted = 1 WHERE OrderGroup_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OrderGroupBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OrderGroup_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OGDescription")
	protected String OGDescription;
	@Column(name = "OGCode")
	protected int OGCode;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderHeading")
    protected OrderHeadingBean orderHeading;
    @OneToMany(mappedBy = "orderGroup", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
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

    @JsonProperty("OGDescription")
	public String getOGDescription() {
		return OGDescription;
	}

	public void setOGDescription(String OGDescription) {
		this.OGDescription = OGDescription;
	}

    @JsonProperty("OGCode")
	public int getOGCode() {
		return OGCode;
	}

	public void setOGCode(int OGCode) {
		this.OGCode = OGCode;
	}


    @JsonProperty("orderHeading")
	public OrderHeadingBean getOrderHeading() {
		return orderHeading;
	}

    public void setOrderHeading(OrderHeadingBean orderHeading) {
		this.orderHeading = orderHeading;
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
		if (o == null || !(o instanceof OrderGroupBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OrderGroupBean) o).getId()));
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
		return "OrderGroupBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OGDescription=" + OGDescription
			+ ", OGCode=" + OGCode
			// + ", orderHeading=" + orderHeading
			// + ", orderItems=" + orderItems
			+ "]";
	}
}