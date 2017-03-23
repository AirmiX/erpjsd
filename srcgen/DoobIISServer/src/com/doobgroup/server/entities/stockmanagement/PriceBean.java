package com.doobgroup.server.entities.stockmanagement;

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

import com.doobgroup.server.entities.stockmanagement.PriceDesignationBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.stockmanagement.PriceArchiveBean;

@Entity
@Table(name = "PRICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "priceDesignation" ,   "tangibleItemStatuses" ,   "currencies" ,   "identification"  	}))
@SQLDelete(sql="UPDATE PRICE SET deleted = 1 WHERE Price_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PriceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Price_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPrice", nullable = false)
	protected int PPrice;
	@Column(name = "PStartDate")
	protected Date PStartDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="priceDesignation")
    protected PriceDesignationBean priceDesignation;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatuses")
    protected TangibleItemStatusBean tangibleItemStatuses;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currencies")
    protected CurrencyBean currencies;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @OneToMany(mappedBy = "price", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<PriceArchiveBean> priceArchives = new HashSet<PriceArchiveBean>();

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

    @JsonProperty("PPrice")
	public int getPPrice() {
		return PPrice;
	}

	public void setPPrice(int PPrice) {
		this.PPrice = PPrice;
	}

    @JsonProperty("PStartDate")
	public Date getPStartDate() {
		return PStartDate;
	}

	public void setPStartDate(Date PStartDate) {
		this.PStartDate = PStartDate;
	}


    @JsonProperty("priceDesignation")
	public PriceDesignationBean getPriceDesignation() {
		return priceDesignation;
	}

    public void setPriceDesignation(PriceDesignationBean priceDesignation) {
		this.priceDesignation = priceDesignation;
	}

    @JsonProperty("tangibleItemStatuses")
	public TangibleItemStatusBean getTangibleItemStatuses() {
		return tangibleItemStatuses;
	}

    public void setTangibleItemStatuses(TangibleItemStatusBean tangibleItemStatuses) {
		this.tangibleItemStatuses = tangibleItemStatuses;
	}

    @JsonProperty("currencies")
	public CurrencyBean getCurrencies() {
		return currencies;
	}

    public void setCurrencies(CurrencyBean currencies) {
		this.currencies = currencies;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("priceArchives")
	public Set<PriceArchiveBean> getPriceArchives() {
		return priceArchives;
	}

	public void setPriceArchives(Set<PriceArchiveBean> priceArchives) {
		this.priceArchives = priceArchives;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PriceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PriceBean) o).getId()));
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
		return "PriceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPrice=" + PPrice
			+ ", PStartDate=" + PStartDate
			// + ", priceDesignation=" + priceDesignation
			// + ", tangibleItemStatuses=" + tangibleItemStatuses
			// + ", currencies=" + currencies
			// + ", identification=" + identification
			// + ", priceArchives=" + priceArchives
			+ "]";
	}
}