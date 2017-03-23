package com.doobgroup.server.entities.environment;

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

import com.doobgroup.server.entities.order.CompanyBean;
import com.doobgroup.server.entities.order.CustomerBean;
import com.doobgroup.server.entities.environment.PostOfficeBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.corporation.EmployeeBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.corporation.BusinessEntityBean;

@Entity
@Table(name = "ADDRESS"
)
@SQLDelete(sql="UPDATE ADDRESS SET deleted = 1 WHERE Address_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AddressBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Address_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "AStreet")
	protected String AStreet;
	@Column(name = "ANumber")
	protected String ANumber;
	@Column(name = "ADateFrom")
	protected Date ADateFrom;
	@Column(name = "ADateUntil")
	protected Date ADateUntil;
	@Column(name = "APostCode")
	protected String APostCode;
	@Column(name = "AState")
	protected String AState;
	@Column(name = "ACity")
	protected String ACity;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="company")
    protected CompanyBean company;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="customerCompany")
    protected CustomerBean customerCompany;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="customer")
    protected CustomerBean customer;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="postOffice")
    protected PostOfficeBean postOffice;
    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomBean> stockrooms = new HashSet<StockroomBean>();
    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<EmployeeBean> employees = new HashSet<EmployeeBean>();
    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrganizationUnitBean> organizationUnits = new HashSet<OrganizationUnitBean>();
    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BusinessEntityBean> businessEntities = new HashSet<BusinessEntityBean>();

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

    @JsonProperty("AStreet")
	public String getAStreet() {
		return AStreet;
	}

	public void setAStreet(String AStreet) {
		this.AStreet = AStreet;
	}

    @JsonProperty("ANumber")
	public String getANumber() {
		return ANumber;
	}

	public void setANumber(String ANumber) {
		this.ANumber = ANumber;
	}

    @JsonProperty("ADateFrom")
	public Date getADateFrom() {
		return ADateFrom;
	}

	public void setADateFrom(Date ADateFrom) {
		this.ADateFrom = ADateFrom;
	}

    @JsonProperty("ADateUntil")
	public Date getADateUntil() {
		return ADateUntil;
	}

	public void setADateUntil(Date ADateUntil) {
		this.ADateUntil = ADateUntil;
	}

    @JsonProperty("APostCode")
	public String getAPostCode() {
		return APostCode;
	}

	public void setAPostCode(String APostCode) {
		this.APostCode = APostCode;
	}

    @JsonProperty("AState")
	public String getAState() {
		return AState;
	}

	public void setAState(String AState) {
		this.AState = AState;
	}

    @JsonProperty("ACity")
	public String getACity() {
		return ACity;
	}

	public void setACity(String ACity) {
		this.ACity = ACity;
	}


    @JsonProperty("company")
	public CompanyBean getCompany() {
		return company;
	}

    public void setCompany(CompanyBean company) {
		this.company = company;
	}

    @JsonProperty("customerCompany")
	public CustomerBean getCustomerCompany() {
		return customerCompany;
	}

    public void setCustomerCompany(CustomerBean customerCompany) {
		this.customerCompany = customerCompany;
	}

    @JsonProperty("customer")
	public CustomerBean getCustomer() {
		return customer;
	}

    public void setCustomer(CustomerBean customer) {
		this.customer = customer;
	}

    @JsonProperty("postOffice")
	public PostOfficeBean getPostOffice() {
		return postOffice;
	}

    public void setPostOffice(PostOfficeBean postOffice) {
		this.postOffice = postOffice;
	}

    @JsonProperty("stockrooms")
	public Set<StockroomBean> getStockrooms() {
		return stockrooms;
	}

	public void setStockrooms(Set<StockroomBean> stockrooms) {
		this.stockrooms = stockrooms;
	}

    @JsonProperty("employees")
	public Set<EmployeeBean> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<EmployeeBean> employees) {
		this.employees = employees;
	}

    @JsonProperty("organizationUnits")
	public Set<OrganizationUnitBean> getOrganizationUnits() {
		return organizationUnits;
	}

	public void setOrganizationUnits(Set<OrganizationUnitBean> organizationUnits) {
		this.organizationUnits = organizationUnits;
	}

    @JsonProperty("businessEntities")
	public Set<BusinessEntityBean> getBusinessEntities() {
		return businessEntities;
	}

	public void setBusinessEntities(Set<BusinessEntityBean> businessEntities) {
		this.businessEntities = businessEntities;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof AddressBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AddressBean) o).getId()));
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
		return "AddressBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", AStreet=" + AStreet
			+ ", ANumber=" + ANumber
			+ ", ADateFrom=" + ADateFrom
			+ ", ADateUntil=" + ADateUntil
			+ ", APostCode=" + APostCode
			+ ", AState=" + AState
			+ ", ACity=" + ACity
			// + ", company=" + company
			// + ", customerCompany=" + customerCompany
			// + ", customer=" + customer
			// + ", postOffice=" + postOffice
			// + ", stockrooms=" + stockrooms
			// + ", employees=" + employees
			// + ", organizationUnits=" + organizationUnits
			// + ", businessEntities=" + businessEntities
			+ "]";
	}
}