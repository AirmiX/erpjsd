package com.doobgroup.server.entities.sellingprice;

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

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.initialization.CommercialityStatusBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.capacitymanagement.CountryCurrencyBean;

@Entity
@Table(name = "SELLINGPRICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "identification" ,   "organizationUnit"  	}))
@SQLDelete(sql="UPDATE SELLINGPRICE SET deleted = 1 WHERE SellingPrice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class SellingPriceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SellingPrice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SPProductStatus")
	protected int SPProductStatus;
	@Column(name = "SPPrice", nullable = false)
	protected double SPPrice;
	@Column(name = "SPDateFrom", nullable = false)
	protected Date SPDateFrom;
	@Column(name = "SPDateUntil")
	protected Date SPDateUntil;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="commercialityStatus")
    protected CommercialityStatusBean commercialityStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CountryCurrencyBean currency;

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

    @JsonProperty("SPProductStatus")
	public int getSPProductStatus() {
		return SPProductStatus;
	}

	public void setSPProductStatus(int SPProductStatus) {
		this.SPProductStatus = SPProductStatus;
	}

    @JsonProperty("SPPrice")
	public double getSPPrice() {
		return SPPrice;
	}

	public void setSPPrice(double SPPrice) {
		this.SPPrice = SPPrice;
	}

    @JsonProperty("SPDateFrom")
	public Date getSPDateFrom() {
		return SPDateFrom;
	}

	public void setSPDateFrom(Date SPDateFrom) {
		this.SPDateFrom = SPDateFrom;
	}

    @JsonProperty("SPDateUntil")
	public Date getSPDateUntil() {
		return SPDateUntil;
	}

	public void setSPDateUntil(Date SPDateUntil) {
		this.SPDateUntil = SPDateUntil;
	}


    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("commercialityStatus")
	public CommercialityStatusBean getCommercialityStatus() {
		return commercialityStatus;
	}

    public void setCommercialityStatus(CommercialityStatusBean commercialityStatus) {
		this.commercialityStatus = commercialityStatus;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("currency")
	public CountryCurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CountryCurrencyBean currency) {
		this.currency = currency;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof SellingPriceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((SellingPriceBean) o).getId()));
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
		return "SellingPriceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SPProductStatus=" + SPProductStatus
			+ ", SPPrice=" + SPPrice
			+ ", SPDateFrom=" + SPDateFrom
			+ ", SPDateUntil=" + SPDateUntil
			// + ", identification=" + identification
			// + ", commercialityStatus=" + commercialityStatus
			// + ", organizationUnit=" + organizationUnit
			// + ", currency=" + currency
			+ "]";
	}
}