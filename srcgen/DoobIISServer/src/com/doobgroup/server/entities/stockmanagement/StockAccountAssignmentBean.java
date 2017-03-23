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
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.commonbusinessentities.ClassificationBean;
import com.doobgroup.server.entities.corporation.AccountBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;

@Entity
@Table(name = "STOCKACCOUNTASSIGNMENT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "stockroom" ,   "classification" ,   "account" ,   "tangibleItemStatus"  	}))
@SQLDelete(sql="UPDATE STOCKACCOUNTASSIGNMENT SET deleted = 1 WHERE StockAccountAssignment_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class StockAccountAssignmentBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "StockAccountAssignment_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "SAAValueStatus", nullable = false)
	protected char SAAValueStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="priceDesignation")
    protected PriceDesignationBean priceDesignation;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="classification")
    protected ClassificationBean classification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;

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

    @JsonProperty("SAAValueStatus")
	public char getSAAValueStatus() {
		return SAAValueStatus;
	}

	public void setSAAValueStatus(char SAAValueStatus) {
		this.SAAValueStatus = SAAValueStatus;
	}


    @JsonProperty("priceDesignation")
	public PriceDesignationBean getPriceDesignation() {
		return priceDesignation;
	}

    public void setPriceDesignation(PriceDesignationBean priceDesignation) {
		this.priceDesignation = priceDesignation;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("classification")
	public ClassificationBean getClassification() {
		return classification;
	}

    public void setClassification(ClassificationBean classification) {
		this.classification = classification;
	}

    @JsonProperty("account")
	public AccountBean getAccount() {
		return account;
	}

    public void setAccount(AccountBean account) {
		this.account = account;
	}

    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof StockAccountAssignmentBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((StockAccountAssignmentBean) o).getId()));
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
		return "StockAccountAssignmentBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", SAAValueStatus=" + SAAValueStatus
			// + ", priceDesignation=" + priceDesignation
			// + ", stockroom=" + stockroom
			// + ", classification=" + classification
			// + ", account=" + account
			// + ", tangibleItemStatus=" + tangibleItemStatus
			+ "]";
	}
}