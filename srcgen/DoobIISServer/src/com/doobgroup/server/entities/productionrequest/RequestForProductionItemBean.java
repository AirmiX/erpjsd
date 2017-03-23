package com.doobgroup.server.entities.productionrequest;

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

import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.productionrequest.RequestForProductionBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;
import com.doobgroup.server.entities.stock.StockroomBean;

@Entity
@Table(name = "REQUESTFORPRODUCTIONITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RFPIItemNumber"  ,  "requestForProduction"  	}))
@SQLDelete(sql="UPDATE REQUESTFORPRODUCTIONITEM SET deleted = 1 WHERE RequestForProductionItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RequestForProductionItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RequestForProductionItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RFPIItemNumber", nullable = false)
	protected int RFPIItemNumber;
	@Column(name = "RFPIQuantity", nullable = false)
	protected double RFPIQuantity;
	@Column(name = "RFPICreationDeadline", nullable = false)
	protected Date RFPICreationDeadline;
	@Column(name = "RFPISellingPrice", nullable = false)
	protected double RFPISellingPrice;
	@Column(name = "RFPIDeleteStatus")
	protected String RFPIDeleteStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="requestForProduction")
    protected RequestForProductionBean requestForProduction;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderItem")
    protected OrderItemBean orderItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="mesurementUnit")
    protected MeasurementUnitBean mesurementUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;

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

    @JsonProperty("RFPIItemNumber")
	public int getRFPIItemNumber() {
		return RFPIItemNumber;
	}

	public void setRFPIItemNumber(int RFPIItemNumber) {
		this.RFPIItemNumber = RFPIItemNumber;
	}

    @JsonProperty("RFPIQuantity")
	public double getRFPIQuantity() {
		return RFPIQuantity;
	}

	public void setRFPIQuantity(double RFPIQuantity) {
		this.RFPIQuantity = RFPIQuantity;
	}

    @JsonProperty("RFPICreationDeadline")
	public Date getRFPICreationDeadline() {
		return RFPICreationDeadline;
	}

	public void setRFPICreationDeadline(Date RFPICreationDeadline) {
		this.RFPICreationDeadline = RFPICreationDeadline;
	}

    @JsonProperty("RFPISellingPrice")
	public double getRFPISellingPrice() {
		return RFPISellingPrice;
	}

	public void setRFPISellingPrice(double RFPISellingPrice) {
		this.RFPISellingPrice = RFPISellingPrice;
	}

    @JsonProperty("RFPIDeleteStatus")
	public String getRFPIDeleteStatus() {
		return RFPIDeleteStatus;
	}

	public void setRFPIDeleteStatus(String RFPIDeleteStatus) {
		this.RFPIDeleteStatus = RFPIDeleteStatus;
	}


    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("requestForProduction")
	public RequestForProductionBean getRequestForProduction() {
		return requestForProduction;
	}

    public void setRequestForProduction(RequestForProductionBean requestForProduction) {
		this.requestForProduction = requestForProduction;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("orderItem")
	public OrderItemBean getOrderItem() {
		return orderItem;
	}

    public void setOrderItem(OrderItemBean orderItem) {
		this.orderItem = orderItem;
	}

    @JsonProperty("mesurementUnit")
	public MeasurementUnitBean getMesurementUnit() {
		return mesurementUnit;
	}

    public void setMesurementUnit(MeasurementUnitBean mesurementUnit) {
		this.mesurementUnit = mesurementUnit;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RequestForProductionItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RequestForProductionItemBean) o).getId()));
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
		return "RequestForProductionItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RFPIItemNumber=" + RFPIItemNumber
			+ ", RFPIQuantity=" + RFPIQuantity
			+ ", RFPICreationDeadline=" + RFPICreationDeadline
			+ ", RFPISellingPrice=" + RFPISellingPrice
			+ ", RFPIDeleteStatus=" + RFPIDeleteStatus
			// + ", currency=" + currency
			// + ", requestForProduction=" + requestForProduction
			// + ", identification=" + identification
			// + ", orderItem=" + orderItem
			// + ", mesurementUnit=" + mesurementUnit
			// + ", stockroom=" + stockroom
			+ "]";
	}
}