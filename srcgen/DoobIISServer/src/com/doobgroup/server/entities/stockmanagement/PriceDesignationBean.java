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

import com.doobgroup.server.entities.stockmanagement.PriceBean;
import com.doobgroup.server.entities.stockmanagement.StockAccountAssignmentBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountToolBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.renaming.RenamingItemBean;

@Entity
@Table(name = "PRICEDESIGNATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PDPriceDesignation"  	}))
@SQLDelete(sql="UPDATE PRICEDESIGNATION SET deleted = 1 WHERE PriceDesignation_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PriceDesignationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PriceDesignation_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PDPriceDesignation", nullable = false)
	protected int PDPriceDesignation;
	@Column(name = "PDName", nullable = false)
	protected String PDName;

    @OneToMany(mappedBy = "priceDesignation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<PriceBean> prices = new HashSet<PriceBean>();
    @OneToMany(mappedBy = "priceDesignation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockAccountAssignmentBean> stockAccountAssignments = new HashSet<StockAccountAssignmentBean>();
    @OneToMany(mappedBy = "priceDesignation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools = new HashSet<TangibleItemAmmountToolBean>();
    @OneToMany(mappedBy = "priceDesignation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();
    @OneToMany(mappedBy = "priceDesignationOutput", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingItemBean> renamingItemsOutput = new HashSet<RenamingItemBean>();
    @OneToMany(mappedBy = "priceDesignationOutput", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingItemBean> renamingItemsInput = new HashSet<RenamingItemBean>();

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

    @JsonProperty("PDPriceDesignation")
	public int getPDPriceDesignation() {
		return PDPriceDesignation;
	}

	public void setPDPriceDesignation(int PDPriceDesignation) {
		this.PDPriceDesignation = PDPriceDesignation;
	}

    @JsonProperty("PDName")
	public String getPDName() {
		return PDName;
	}

	public void setPDName(String PDName) {
		this.PDName = PDName;
	}


    @JsonProperty("prices")
	public Set<PriceBean> getPrices() {
		return prices;
	}

	public void setPrices(Set<PriceBean> prices) {
		this.prices = prices;
	}

    @JsonProperty("stockAccountAssignments")
	public Set<StockAccountAssignmentBean> getStockAccountAssignments() {
		return stockAccountAssignments;
	}

	public void setStockAccountAssignments(Set<StockAccountAssignmentBean> stockAccountAssignments) {
		this.stockAccountAssignments = stockAccountAssignments;
	}

    @JsonProperty("tangibleItemAmmountTools")
	public Set<TangibleItemAmmountToolBean> getTangibleItemAmmountTools() {
		return tangibleItemAmmountTools;
	}

	public void setTangibleItemAmmountTools(Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools) {
		this.tangibleItemAmmountTools = tangibleItemAmmountTools;
	}

    @JsonProperty("tangibleItemConditions")
	public Set<TangibleItemConditionBean> getTangibleItemConditions() {
		return tangibleItemConditions;
	}

	public void setTangibleItemConditions(Set<TangibleItemConditionBean> tangibleItemConditions) {
		this.tangibleItemConditions = tangibleItemConditions;
	}

    @JsonProperty("renamingItemsOutput")
	public Set<RenamingItemBean> getRenamingItemsOutput() {
		return renamingItemsOutput;
	}

	public void setRenamingItemsOutput(Set<RenamingItemBean> renamingItemsOutput) {
		this.renamingItemsOutput = renamingItemsOutput;
	}

    @JsonProperty("renamingItemsInput")
	public Set<RenamingItemBean> getRenamingItemsInput() {
		return renamingItemsInput;
	}

	public void setRenamingItemsInput(Set<RenamingItemBean> renamingItemsInput) {
		this.renamingItemsInput = renamingItemsInput;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PriceDesignationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PriceDesignationBean) o).getId()));
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
		return "PriceDesignationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PDPriceDesignation=" + PDPriceDesignation
			+ ", PDName=" + PDName
			// + ", prices=" + prices
			// + ", stockAccountAssignments=" + stockAccountAssignments
			// + ", tangibleItemAmmountTools=" + tangibleItemAmmountTools
			// + ", tangibleItemConditions=" + tangibleItemConditions
			// + ", renamingItemsOutput=" + renamingItemsOutput
			// + ", renamingItemsInput=" + renamingItemsInput
			+ "]";
	}
}