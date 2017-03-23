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

import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteHeadingBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.logical.OrderSupplierItemBean;
import com.doobgroup.server.entities.initialization.GoodsAcceptanceStatusBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.logical.ProcurementRequestSettlementBean;

@Entity
@Table(name = "GOODSRECEIVEDNOTEITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "goodsReceivedNoteHeading"  	}))
@SQLDelete(sql="UPDATE GOODSRECEIVEDNOTEITEM SET deleted = 1 WHERE GoodsReceivedNoteItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class GoodsReceivedNoteItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "GoodsReceivedNoteItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "GRNIOrdinalNumber", nullable = false)
	protected int GRNIOrdinalNumber;
	@Column(name = "GRNIStockAccount", nullable = false)
	protected int GRNIStockAccount;
	@Column(name = "GRNIPriceDesignation", nullable = false)
	protected int GRNIPriceDesignation;
	@Column(name = "GRNIMeasurementUnit", nullable = false)
	protected String GRNIMeasurementUnit;
	@Column(name = "GRNIQuantityByShippingDocument", nullable = false)
	protected int GRNIQuantityByShippingDocument;
	@Column(name = "GRNIQunaityReceived", nullable = false)
	protected int GRNIQunaityReceived;
	@Column(name = "GRNIQuantityIssued", nullable = false)
	protected int GRNIQuantityIssued;
	@Column(name = "GRNIValue")
	protected int GRNIValue;
	@Column(name = "GRNIAddress")
	protected String GRNIAddress;
	@Column(name = "GRNIUnitPrice")
	protected int GRNIUnitPrice;
	@Column(name = "GRNIBookkeepingPosition")
	protected int GRNIBookkeepingPosition;
	@Column(name = "GRNIQuantityAfterBookkeeping")
	protected int GRNIQuantityAfterBookkeeping;
	@Column(name = "GRNIStorno")
	protected String GRNIStorno;
	@Column(name = "GRNIBatchDesignation")
	protected String GRNIBatchDesignation;
	@Column(name = "GRNIObsoescenceDate")
	protected Date GRNIObsoescenceDate;
	@Column(name = "GRNIQuantityRejected")
	protected int GRNIQuantityRejected;
	@Column(name = "GRNIRejectedItemControlRemark")
	protected String GRNIRejectedItemControlRemark;
	@Column(name = "GRNIRemark")
	protected String GRNIRemark;
	@Column(name = "GRNIQuantityReceivedQuantified")
	protected int GRNIQuantityReceivedQuantified;
	@Column(name = "GRNIQuantityRejectedQuantified")
	protected int GRNIQuantityRejectedQuantified;
	@Column(name = "GRNISellingPrice")
	protected int GRNISellingPrice;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="goodsReceivedNoteHeading")
    protected GoodsReceivedNoteHeadingBean goodsReceivedNoteHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemCondition")
    protected TangibleItemConditionBean tangibleItemCondition;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderSupplierItem")
    protected OrderSupplierItemBean orderSupplierItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="goodsAcceptanceStatus")
    protected GoodsAcceptanceStatusBean goodsAcceptanceStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;
    @OneToMany(mappedBy = "goodsReceivedNoteItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestSettlementBean> procurementRequestSettlements = new HashSet<ProcurementRequestSettlementBean>();

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

    @JsonProperty("GRNIOrdinalNumber")
	public int getGRNIOrdinalNumber() {
		return GRNIOrdinalNumber;
	}

	public void setGRNIOrdinalNumber(int GRNIOrdinalNumber) {
		this.GRNIOrdinalNumber = GRNIOrdinalNumber;
	}

    @JsonProperty("GRNIStockAccount")
	public int getGRNIStockAccount() {
		return GRNIStockAccount;
	}

	public void setGRNIStockAccount(int GRNIStockAccount) {
		this.GRNIStockAccount = GRNIStockAccount;
	}

    @JsonProperty("GRNIPriceDesignation")
	public int getGRNIPriceDesignation() {
		return GRNIPriceDesignation;
	}

	public void setGRNIPriceDesignation(int GRNIPriceDesignation) {
		this.GRNIPriceDesignation = GRNIPriceDesignation;
	}

    @JsonProperty("GRNIMeasurementUnit")
	public String getGRNIMeasurementUnit() {
		return GRNIMeasurementUnit;
	}

	public void setGRNIMeasurementUnit(String GRNIMeasurementUnit) {
		this.GRNIMeasurementUnit = GRNIMeasurementUnit;
	}

    @JsonProperty("GRNIQuantityByShippingDocument")
	public int getGRNIQuantityByShippingDocument() {
		return GRNIQuantityByShippingDocument;
	}

	public void setGRNIQuantityByShippingDocument(int GRNIQuantityByShippingDocument) {
		this.GRNIQuantityByShippingDocument = GRNIQuantityByShippingDocument;
	}

    @JsonProperty("GRNIQunaityReceived")
	public int getGRNIQunaityReceived() {
		return GRNIQunaityReceived;
	}

	public void setGRNIQunaityReceived(int GRNIQunaityReceived) {
		this.GRNIQunaityReceived = GRNIQunaityReceived;
	}

    @JsonProperty("GRNIQuantityIssued")
	public int getGRNIQuantityIssued() {
		return GRNIQuantityIssued;
	}

	public void setGRNIQuantityIssued(int GRNIQuantityIssued) {
		this.GRNIQuantityIssued = GRNIQuantityIssued;
	}

    @JsonProperty("GRNIValue")
	public int getGRNIValue() {
		return GRNIValue;
	}

	public void setGRNIValue(int GRNIValue) {
		this.GRNIValue = GRNIValue;
	}

    @JsonProperty("GRNIAddress")
	public String getGRNIAddress() {
		return GRNIAddress;
	}

	public void setGRNIAddress(String GRNIAddress) {
		this.GRNIAddress = GRNIAddress;
	}

    @JsonProperty("GRNIUnitPrice")
	public int getGRNIUnitPrice() {
		return GRNIUnitPrice;
	}

	public void setGRNIUnitPrice(int GRNIUnitPrice) {
		this.GRNIUnitPrice = GRNIUnitPrice;
	}

    @JsonProperty("GRNIBookkeepingPosition")
	public int getGRNIBookkeepingPosition() {
		return GRNIBookkeepingPosition;
	}

	public void setGRNIBookkeepingPosition(int GRNIBookkeepingPosition) {
		this.GRNIBookkeepingPosition = GRNIBookkeepingPosition;
	}

    @JsonProperty("GRNIQuantityAfterBookkeeping")
	public int getGRNIQuantityAfterBookkeeping() {
		return GRNIQuantityAfterBookkeeping;
	}

	public void setGRNIQuantityAfterBookkeeping(int GRNIQuantityAfterBookkeeping) {
		this.GRNIQuantityAfterBookkeeping = GRNIQuantityAfterBookkeeping;
	}

    @JsonProperty("GRNIStorno")
	public String getGRNIStorno() {
		return GRNIStorno;
	}

	public void setGRNIStorno(String GRNIStorno) {
		this.GRNIStorno = GRNIStorno;
	}

    @JsonProperty("GRNIBatchDesignation")
	public String getGRNIBatchDesignation() {
		return GRNIBatchDesignation;
	}

	public void setGRNIBatchDesignation(String GRNIBatchDesignation) {
		this.GRNIBatchDesignation = GRNIBatchDesignation;
	}

    @JsonProperty("GRNIObsoescenceDate")
	public Date getGRNIObsoescenceDate() {
		return GRNIObsoescenceDate;
	}

	public void setGRNIObsoescenceDate(Date GRNIObsoescenceDate) {
		this.GRNIObsoescenceDate = GRNIObsoescenceDate;
	}

    @JsonProperty("GRNIQuantityRejected")
	public int getGRNIQuantityRejected() {
		return GRNIQuantityRejected;
	}

	public void setGRNIQuantityRejected(int GRNIQuantityRejected) {
		this.GRNIQuantityRejected = GRNIQuantityRejected;
	}

    @JsonProperty("GRNIRejectedItemControlRemark")
	public String getGRNIRejectedItemControlRemark() {
		return GRNIRejectedItemControlRemark;
	}

	public void setGRNIRejectedItemControlRemark(String GRNIRejectedItemControlRemark) {
		this.GRNIRejectedItemControlRemark = GRNIRejectedItemControlRemark;
	}

    @JsonProperty("GRNIRemark")
	public String getGRNIRemark() {
		return GRNIRemark;
	}

	public void setGRNIRemark(String GRNIRemark) {
		this.GRNIRemark = GRNIRemark;
	}

    @JsonProperty("GRNIQuantityReceivedQuantified")
	public int getGRNIQuantityReceivedQuantified() {
		return GRNIQuantityReceivedQuantified;
	}

	public void setGRNIQuantityReceivedQuantified(int GRNIQuantityReceivedQuantified) {
		this.GRNIQuantityReceivedQuantified = GRNIQuantityReceivedQuantified;
	}

    @JsonProperty("GRNIQuantityRejectedQuantified")
	public int getGRNIQuantityRejectedQuantified() {
		return GRNIQuantityRejectedQuantified;
	}

	public void setGRNIQuantityRejectedQuantified(int GRNIQuantityRejectedQuantified) {
		this.GRNIQuantityRejectedQuantified = GRNIQuantityRejectedQuantified;
	}

    @JsonProperty("GRNISellingPrice")
	public int getGRNISellingPrice() {
		return GRNISellingPrice;
	}

	public void setGRNISellingPrice(int GRNISellingPrice) {
		this.GRNISellingPrice = GRNISellingPrice;
	}


    @JsonProperty("goodsReceivedNoteHeading")
	public GoodsReceivedNoteHeadingBean getGoodsReceivedNoteHeading() {
		return goodsReceivedNoteHeading;
	}

    public void setGoodsReceivedNoteHeading(GoodsReceivedNoteHeadingBean goodsReceivedNoteHeading) {
		this.goodsReceivedNoteHeading = goodsReceivedNoteHeading;
	}

    @JsonProperty("tangibleItemCondition")
	public TangibleItemConditionBean getTangibleItemCondition() {
		return tangibleItemCondition;
	}

    public void setTangibleItemCondition(TangibleItemConditionBean tangibleItemCondition) {
		this.tangibleItemCondition = tangibleItemCondition;
	}

    @JsonProperty("orderSupplierItem")
	public OrderSupplierItemBean getOrderSupplierItem() {
		return orderSupplierItem;
	}

    public void setOrderSupplierItem(OrderSupplierItemBean orderSupplierItem) {
		this.orderSupplierItem = orderSupplierItem;
	}

    @JsonProperty("goodsAcceptanceStatus")
	public GoodsAcceptanceStatusBean getGoodsAcceptanceStatus() {
		return goodsAcceptanceStatus;
	}

    public void setGoodsAcceptanceStatus(GoodsAcceptanceStatusBean goodsAcceptanceStatus) {
		this.goodsAcceptanceStatus = goodsAcceptanceStatus;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
	}

    @JsonProperty("procurementRequestSettlements")
	public Set<ProcurementRequestSettlementBean> getProcurementRequestSettlements() {
		return procurementRequestSettlements;
	}

	public void setProcurementRequestSettlements(Set<ProcurementRequestSettlementBean> procurementRequestSettlements) {
		this.procurementRequestSettlements = procurementRequestSettlements;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof GoodsReceivedNoteItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((GoodsReceivedNoteItemBean) o).getId()));
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
		return "GoodsReceivedNoteItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", GRNIOrdinalNumber=" + GRNIOrdinalNumber
			+ ", GRNIStockAccount=" + GRNIStockAccount
			+ ", GRNIPriceDesignation=" + GRNIPriceDesignation
			+ ", GRNIMeasurementUnit=" + GRNIMeasurementUnit
			+ ", GRNIQuantityByShippingDocument=" + GRNIQuantityByShippingDocument
			+ ", GRNIQunaityReceived=" + GRNIQunaityReceived
			+ ", GRNIQuantityIssued=" + GRNIQuantityIssued
			+ ", GRNIValue=" + GRNIValue
			+ ", GRNIAddress=" + GRNIAddress
			+ ", GRNIUnitPrice=" + GRNIUnitPrice
			+ ", GRNIBookkeepingPosition=" + GRNIBookkeepingPosition
			+ ", GRNIQuantityAfterBookkeeping=" + GRNIQuantityAfterBookkeeping
			+ ", GRNIStorno=" + GRNIStorno
			+ ", GRNIBatchDesignation=" + GRNIBatchDesignation
			+ ", GRNIObsoescenceDate=" + GRNIObsoescenceDate
			+ ", GRNIQuantityRejected=" + GRNIQuantityRejected
			+ ", GRNIRejectedItemControlRemark=" + GRNIRejectedItemControlRemark
			+ ", GRNIRemark=" + GRNIRemark
			+ ", GRNIQuantityReceivedQuantified=" + GRNIQuantityReceivedQuantified
			+ ", GRNIQuantityRejectedQuantified=" + GRNIQuantityRejectedQuantified
			+ ", GRNISellingPrice=" + GRNISellingPrice
			// + ", goodsReceivedNoteHeading=" + goodsReceivedNoteHeading
			// + ", tangibleItemCondition=" + tangibleItemCondition
			// + ", orderSupplierItem=" + orderSupplierItem
			// + ", goodsAcceptanceStatus=" + goodsAcceptanceStatus
			// + ", identification=" + identification
			// + ", tangibleItemStatus=" + tangibleItemStatus
			// + ", procurementRequestSettlements=" + procurementRequestSettlements
			+ "]";
	}
}