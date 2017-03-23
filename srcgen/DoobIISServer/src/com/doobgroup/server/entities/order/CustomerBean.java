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

import com.doobgroup.server.entities.initialization.GenderBean;
import com.doobgroup.server.entities.initialization.SourceAttentionBean;
import com.doobgroup.server.entities.environment.AddressBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;

@Entity
@Table(name = "CUSTOMER"
)
@SQLDelete(sql="UPDATE CUSTOMER SET deleted = 1 WHERE Customer_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class CustomerBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Customer_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CFirstName", nullable = false)
	protected String CFirstName;
	@Column(name = "CLastName", nullable = false)
	protected String CLastName;
	@Column(name = "CPhone")
	protected String CPhone;
	@Column(name = "CEmail")
	protected String CEmail;
	@Column(name = "CCreateDate")
	protected Date CCreateDate;
	@Column(name = "CGender")
	protected String CGender;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="gender")
    protected GenderBean gender;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="sourceAttention")
    protected SourceAttentionBean sourceAttention;
    @OneToMany(mappedBy = "customerCompany", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AddressBean> addressesCompany = new HashSet<AddressBean>();
    @OneToMany(mappedBy = "customerCompany", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AddressBean> addresses = new HashSet<AddressBean>();
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();

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

    @JsonProperty("CFirstName")
	public String getCFirstName() {
		return CFirstName;
	}

	public void setCFirstName(String CFirstName) {
		this.CFirstName = CFirstName;
	}

    @JsonProperty("CLastName")
	public String getCLastName() {
		return CLastName;
	}

	public void setCLastName(String CLastName) {
		this.CLastName = CLastName;
	}

    @JsonProperty("CPhone")
	public String getCPhone() {
		return CPhone;
	}

	public void setCPhone(String CPhone) {
		this.CPhone = CPhone;
	}

    @JsonProperty("CEmail")
	public String getCEmail() {
		return CEmail;
	}

	public void setCEmail(String CEmail) {
		this.CEmail = CEmail;
	}

    @JsonProperty("CCreateDate")
	public Date getCCreateDate() {
		return CCreateDate;
	}

	public void setCCreateDate(Date CCreateDate) {
		this.CCreateDate = CCreateDate;
	}

    @JsonProperty("CGender")
	public String getCGender() {
		return CGender;
	}

	public void setCGender(String CGender) {
		this.CGender = CGender;
	}


    @JsonProperty("gender")
	public GenderBean getGender() {
		return gender;
	}

    public void setGender(GenderBean gender) {
		this.gender = gender;
	}

    @JsonProperty("sourceAttention")
	public SourceAttentionBean getSourceAttention() {
		return sourceAttention;
	}

    public void setSourceAttention(SourceAttentionBean sourceAttention) {
		this.sourceAttention = sourceAttention;
	}

    @JsonProperty("addressesCompany")
	public Set<AddressBean> getAddressesCompany() {
		return addressesCompany;
	}

	public void setAddressesCompany(Set<AddressBean> addressesCompany) {
		this.addressesCompany = addressesCompany;
	}

    @JsonProperty("addresses")
	public Set<AddressBean> getAddresses() {
		return addresses;
	}

	public void setAddresses(Set<AddressBean> addresses) {
		this.addresses = addresses;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof CustomerBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((CustomerBean) o).getId()));
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
		return "CustomerBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CFirstName=" + CFirstName
			+ ", CLastName=" + CLastName
			+ ", CPhone=" + CPhone
			+ ", CEmail=" + CEmail
			+ ", CCreateDate=" + CCreateDate
			+ ", CGender=" + CGender
			// + ", gender=" + gender
			// + ", sourceAttention=" + sourceAttention
			// + ", addressesCompany=" + addressesCompany
			// + ", addresses=" + addresses
			// + ", orderHeadings=" + orderHeadings
			+ "]";
	}
}