package com.doobgroup.server.entities.corporation;

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

import com.doobgroup.server.entities.environment.AddressBean;
import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.corporation.OrganizationSchemaBean;
import com.doobgroup.server.entities.corporation.BankAccountBean;

@Entity
@Table(name = "BUSINESSENTITY"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BEIdentificationCode"  	}))
@SQLDelete(sql="UPDATE BUSINESSENTITY SET deleted = 1 WHERE BusinessEntity_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BusinessEntityBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BusinessEntity_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BEIdentificationCode", nullable = false)
	protected int BEIdentificationCode;
	@Column(name = "BEName", nullable = false)
	protected String BEName;
	@Column(name = "BEShortName", nullable = false)
	protected String BEShortName;
	@Column(name = "BELogo")
	protected String BELogo;
	@Column(name = "BELogoCounter")
	protected int BELogoCounter;
	@Column(name = "BETelephone", nullable = false)
	protected String BETelephone;
	@Column(name = "BEFax", nullable = false)
	protected String BEFax;
	@Column(name = "BEEmail")
	protected String BEEmail;
	@Column(name = "BEWeb")
	protected String BEWeb;
	@Column(name = "BECompanyNumber", nullable = false)
	protected String BECompanyNumber;
	@Column(name = "BERegistrationNumber", nullable = false)
	protected String BERegistrationNumber;
	@Column(name = "BEActivityType")
	protected String BEActivityType;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="address")
    protected AddressBean address;
    @OneToMany(mappedBy = "beCustomer", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadingsCustomer = new HashSet<BEOrderHeadingBean>();
    @OneToMany(mappedBy = "be", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrganizationSchemaBean> organizationSchema = new HashSet<OrganizationSchemaBean>();
    @OneToMany(mappedBy = "entities", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BankAccountBean> accounts = new HashSet<BankAccountBean>();
    @OneToMany(mappedBy = "beCustomer", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadingsSeller = new HashSet<BEOrderHeadingBean>();

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

    @JsonProperty("BEIdentificationCode")
	public int getBEIdentificationCode() {
		return BEIdentificationCode;
	}

	public void setBEIdentificationCode(int BEIdentificationCode) {
		this.BEIdentificationCode = BEIdentificationCode;
	}

    @JsonProperty("BEName")
	public String getBEName() {
		return BEName;
	}

	public void setBEName(String BEName) {
		this.BEName = BEName;
	}

    @JsonProperty("BEShortName")
	public String getBEShortName() {
		return BEShortName;
	}

	public void setBEShortName(String BEShortName) {
		this.BEShortName = BEShortName;
	}

    @JsonProperty("BELogo")
	public String getBELogo() {
		return BELogo;
	}

	public void setBELogo(String BELogo) {
		this.BELogo = BELogo;
	}

    @JsonProperty("BELogoCounter")
	public int getBELogoCounter() {
		return BELogoCounter;
	}

	public void setBELogoCounter(int BELogoCounter) {
		this.BELogoCounter = BELogoCounter;
	}

    @JsonProperty("BETelephone")
	public String getBETelephone() {
		return BETelephone;
	}

	public void setBETelephone(String BETelephone) {
		this.BETelephone = BETelephone;
	}

    @JsonProperty("BEFax")
	public String getBEFax() {
		return BEFax;
	}

	public void setBEFax(String BEFax) {
		this.BEFax = BEFax;
	}

    @JsonProperty("BEEmail")
	public String getBEEmail() {
		return BEEmail;
	}

	public void setBEEmail(String BEEmail) {
		this.BEEmail = BEEmail;
	}

    @JsonProperty("BEWeb")
	public String getBEWeb() {
		return BEWeb;
	}

	public void setBEWeb(String BEWeb) {
		this.BEWeb = BEWeb;
	}

    @JsonProperty("BECompanyNumber")
	public String getBECompanyNumber() {
		return BECompanyNumber;
	}

	public void setBECompanyNumber(String BECompanyNumber) {
		this.BECompanyNumber = BECompanyNumber;
	}

    @JsonProperty("BERegistrationNumber")
	public String getBERegistrationNumber() {
		return BERegistrationNumber;
	}

	public void setBERegistrationNumber(String BERegistrationNumber) {
		this.BERegistrationNumber = BERegistrationNumber;
	}

    @JsonProperty("BEActivityType")
	public String getBEActivityType() {
		return BEActivityType;
	}

	public void setBEActivityType(String BEActivityType) {
		this.BEActivityType = BEActivityType;
	}


    @JsonProperty("address")
	public AddressBean getAddress() {
		return address;
	}

    public void setAddress(AddressBean address) {
		this.address = address;
	}

    @JsonProperty("beOrderHeadingsCustomer")
	public Set<BEOrderHeadingBean> getBeOrderHeadingsCustomer() {
		return beOrderHeadingsCustomer;
	}

	public void setBeOrderHeadingsCustomer(Set<BEOrderHeadingBean> beOrderHeadingsCustomer) {
		this.beOrderHeadingsCustomer = beOrderHeadingsCustomer;
	}

    @JsonProperty("organizationSchema")
	public Set<OrganizationSchemaBean> getOrganizationSchema() {
		return organizationSchema;
	}

	public void setOrganizationSchema(Set<OrganizationSchemaBean> organizationSchema) {
		this.organizationSchema = organizationSchema;
	}

    @JsonProperty("accounts")
	public Set<BankAccountBean> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<BankAccountBean> accounts) {
		this.accounts = accounts;
	}

    @JsonProperty("beOrderHeadingsSeller")
	public Set<BEOrderHeadingBean> getBeOrderHeadingsSeller() {
		return beOrderHeadingsSeller;
	}

	public void setBeOrderHeadingsSeller(Set<BEOrderHeadingBean> beOrderHeadingsSeller) {
		this.beOrderHeadingsSeller = beOrderHeadingsSeller;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BusinessEntityBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BusinessEntityBean) o).getId()));
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
		return "BusinessEntityBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BEIdentificationCode=" + BEIdentificationCode
			+ ", BEName=" + BEName
			+ ", BEShortName=" + BEShortName
			+ ", BELogo=" + BELogo
			+ ", BELogoCounter=" + BELogoCounter
			+ ", BETelephone=" + BETelephone
			+ ", BEFax=" + BEFax
			+ ", BEEmail=" + BEEmail
			+ ", BEWeb=" + BEWeb
			+ ", BECompanyNumber=" + BECompanyNumber
			+ ", BERegistrationNumber=" + BERegistrationNumber
			+ ", BEActivityType=" + BEActivityType
			// + ", address=" + address
			// + ", beOrderHeadingsCustomer=" + beOrderHeadingsCustomer
			// + ", organizationSchema=" + organizationSchema
			// + ", accounts=" + accounts
			// + ", beOrderHeadingsSeller=" + beOrderHeadingsSeller
			+ "]";
	}
}