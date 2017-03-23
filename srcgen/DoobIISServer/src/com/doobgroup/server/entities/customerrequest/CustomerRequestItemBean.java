package com.doobgroup.server.entities.customerrequest;

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

import com.doobgroup.server.entities.initialization.UrgentStatusBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.customerrequest.CustomerRequestHeadingBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.initialization.CommercialityStatusBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;

@Entity
@Table(name = "CUSTOMERREQUESTITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "CRIOrdinalNumber"  ,  "customerRequestHeader"  	}))
@SQLDelete(sql="UPDATE CUSTOMERREQUESTITEM SET deleted = 1 WHERE CustomerRequestItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class CustomerRequestItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CustomerRequestItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CRIOrdinalNumber", nullable = false)
	protected int CRIOrdinalNumber;
	@Column(name = "CRIQuantity", nullable = false)
	protected int CRIQuantity;
	@Column(name = "CRICostingPrice")
	protected double CRICostingPrice;
	@Column(name = "CRISellingPrice")
	protected double CRISellingPrice;
	@Column(name = "CRIDeliveryTime", nullable = false)
	protected Date CRIDeliveryTime;
	@Column(name = "CRIDrawingNumber")
	protected String CRIDrawingNumber;
	@Column(name = "CRICustomerProuctCode")
	protected String CRICustomerProuctCode;
	@Column(name = "CRIRemark")
	protected String CRIRemark;
	@Column(name = "CRICalculation")
	protected char CRICalculation;
	@Column(name = "CRIPreviouslyProduced")
	protected char CRIPreviouslyProduced;
	@Column(name = "CRIPrintingStatus")
	protected int CRIPrintingStatus;
	@Column(name = "CRIDeadlineTime")
	protected Date CRIDeadlineTime;
	@Column(name = "CRIDeltedStatus")
	protected char CRIDeltedStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="urgentStatus")
    protected UrgentStatusBean urgentStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="customerRequestHeader")
    protected CustomerRequestHeadingBean customerRequestHeader;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="commercialityStatus")
    protected CommercialityStatusBean commercialityStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;

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

    @JsonProperty("CRIOrdinalNumber")
	public int getCRIOrdinalNumber() {
		return CRIOrdinalNumber;
	}

	public void setCRIOrdinalNumber(int CRIOrdinalNumber) {
		this.CRIOrdinalNumber = CRIOrdinalNumber;
	}

    @JsonProperty("CRIQuantity")
	public int getCRIQuantity() {
		return CRIQuantity;
	}

	public void setCRIQuantity(int CRIQuantity) {
		this.CRIQuantity = CRIQuantity;
	}

    @JsonProperty("CRICostingPrice")
	public double getCRICostingPrice() {
		return CRICostingPrice;
	}

	public void setCRICostingPrice(double CRICostingPrice) {
		this.CRICostingPrice = CRICostingPrice;
	}

    @JsonProperty("CRISellingPrice")
	public double getCRISellingPrice() {
		return CRISellingPrice;
	}

	public void setCRISellingPrice(double CRISellingPrice) {
		this.CRISellingPrice = CRISellingPrice;
	}

    @JsonProperty("CRIDeliveryTime")
	public Date getCRIDeliveryTime() {
		return CRIDeliveryTime;
	}

	public void setCRIDeliveryTime(Date CRIDeliveryTime) {
		this.CRIDeliveryTime = CRIDeliveryTime;
	}

    @JsonProperty("CRIDrawingNumber")
	public String getCRIDrawingNumber() {
		return CRIDrawingNumber;
	}

	public void setCRIDrawingNumber(String CRIDrawingNumber) {
		this.CRIDrawingNumber = CRIDrawingNumber;
	}

    @JsonProperty("CRICustomerProuctCode")
	public String getCRICustomerProuctCode() {
		return CRICustomerProuctCode;
	}

	public void setCRICustomerProuctCode(String CRICustomerProuctCode) {
		this.CRICustomerProuctCode = CRICustomerProuctCode;
	}

    @JsonProperty("CRIRemark")
	public String getCRIRemark() {
		return CRIRemark;
	}

	public void setCRIRemark(String CRIRemark) {
		this.CRIRemark = CRIRemark;
	}

    @JsonProperty("CRICalculation")
	public char getCRICalculation() {
		return CRICalculation;
	}

	public void setCRICalculation(char CRICalculation) {
		this.CRICalculation = CRICalculation;
	}

    @JsonProperty("CRIPreviouslyProduced")
	public char getCRIPreviouslyProduced() {
		return CRIPreviouslyProduced;
	}

	public void setCRIPreviouslyProduced(char CRIPreviouslyProduced) {
		this.CRIPreviouslyProduced = CRIPreviouslyProduced;
	}

    @JsonProperty("CRIPrintingStatus")
	public int getCRIPrintingStatus() {
		return CRIPrintingStatus;
	}

	public void setCRIPrintingStatus(int CRIPrintingStatus) {
		this.CRIPrintingStatus = CRIPrintingStatus;
	}

    @JsonProperty("CRIDeadlineTime")
	public Date getCRIDeadlineTime() {
		return CRIDeadlineTime;
	}

	public void setCRIDeadlineTime(Date CRIDeadlineTime) {
		this.CRIDeadlineTime = CRIDeadlineTime;
	}

    @JsonProperty("CRIDeltedStatus")
	public char getCRIDeltedStatus() {
		return CRIDeltedStatus;
	}

	public void setCRIDeltedStatus(char CRIDeltedStatus) {
		this.CRIDeltedStatus = CRIDeltedStatus;
	}


    @JsonProperty("urgentStatus")
	public UrgentStatusBean getUrgentStatus() {
		return urgentStatus;
	}

    public void setUrgentStatus(UrgentStatusBean urgentStatus) {
		this.urgentStatus = urgentStatus;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("customerRequestHeader")
	public CustomerRequestHeadingBean getCustomerRequestHeader() {
		return customerRequestHeader;
	}

    public void setCustomerRequestHeader(CustomerRequestHeadingBean customerRequestHeader) {
		this.customerRequestHeader = customerRequestHeader;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("commercialityStatus")
	public CommercialityStatusBean getCommercialityStatus() {
		return commercialityStatus;
	}

    public void setCommercialityStatus(CommercialityStatusBean commercialityStatus) {
		this.commercialityStatus = commercialityStatus;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof CustomerRequestItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((CustomerRequestItemBean) o).getId()));
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
		return "CustomerRequestItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CRIOrdinalNumber=" + CRIOrdinalNumber
			+ ", CRIQuantity=" + CRIQuantity
			+ ", CRICostingPrice=" + CRICostingPrice
			+ ", CRISellingPrice=" + CRISellingPrice
			+ ", CRIDeliveryTime=" + CRIDeliveryTime
			+ ", CRIDrawingNumber=" + CRIDrawingNumber
			+ ", CRICustomerProuctCode=" + CRICustomerProuctCode
			+ ", CRIRemark=" + CRIRemark
			+ ", CRICalculation=" + CRICalculation
			+ ", CRIPreviouslyProduced=" + CRIPreviouslyProduced
			+ ", CRIPrintingStatus=" + CRIPrintingStatus
			+ ", CRIDeadlineTime=" + CRIDeadlineTime
			+ ", CRIDeltedStatus=" + CRIDeltedStatus
			// + ", urgentStatus=" + urgentStatus
			// + ", currency=" + currency
			// + ", customerRequestHeader=" + customerRequestHeader
			// + ", organizationUnit=" + organizationUnit
			// + ", commercialityStatus=" + commercialityStatus
			// + ", identification=" + identification
			+ "]";
	}
}