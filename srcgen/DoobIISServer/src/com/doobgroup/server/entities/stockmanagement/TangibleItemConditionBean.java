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

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.stockmanagement.PriceDesignationBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;
import com.doobgroup.server.entities.corporation.AccountBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAnalyticsBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountByLotBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionItemBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountByAddressBean;

@Entity
@Table(name = "TANGIBLEITEMCONDITION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "identification" ,   "tangibleItemStatus"  	}))
@SQLDelete(sql="UPDATE TANGIBLEITEMCONDITION SET deleted = 1 WHERE TangibleItemCondition_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TangibleItemConditionBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TangibleItemCondition_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TICLocatonAddress", nullable = false)
	protected String TICLocatonAddress;
	@Column(name = "TICBookkeepingPosition", nullable = false)
	protected int TICBookkeepingPosition;
	@Column(name = "TICQuantityInitialState")
	protected int TICQuantityInitialState;
	@Column(name = "TICQuantityCumulativeInput", nullable = false)
	protected int TICQuantityCumulativeInput;
	@Column(name = "TICQuantityCumulativeOutput")
	protected int TICQuantityCumulativeOutput;
	@Column(name = "TICValueInitialState", nullable = false)
	protected int TICValueInitialState;
	@Column(name = "TICValueCumulativeInput", nullable = false)
	protected int TICValueCumulativeInput;
	@Column(name = "TICValueCumulativeOutput")
	protected int TICValueCumulativeOutput;
	@Column(name = "TICUnitPrice", nullable = false)
	protected int TICUnitPrice;
	@Column(name = "TICAvailableBalance", nullable = false)
	protected int TICAvailableBalance;
	@Column(name = "TICABCStatus")
	protected char TICABCStatus;
	@Column(name = "TICOpeningDate", nullable = false)
	protected Date TICOpeningDate;
	@Column(name = "TICLastInputDate", nullable = false)
	protected Date TICLastInputDate;
	@Column(name = "TICLastOutputDate", nullable = false)
	protected Date TICLastOutputDate;
	@Column(name = "TICAdditionalRecordStatus")
	protected char TICAdditionalRecordStatus;
	@Column(name = "TICSafetyStatus")
	protected char TICSafetyStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="priceDesignation")
    protected PriceDesignationBean priceDesignation;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="measurementUnit")
    protected MeasurementUnitBean measurementUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteItemBean> deliveryNoteItems = new HashSet<DeliveryNoteItemBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAnalyticsBean> tangibleItemAnalytics = new HashSet<TangibleItemAnalyticsBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentItemBean> shippingDocumentItems = new HashSet<ShippingDocumentItemBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountByLotBean> tangibleItemAmmountLots = new HashSet<TangibleItemAmmountByLotBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems = new HashSet<GoodsReceivedNoteItemBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionItemBean> requisitionItems = new HashSet<RequisitionItemBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteItemBean> materialReturnNoteItems = new HashSet<MaterialReturnNoteItemBean>();
    @OneToMany(mappedBy = "tangibleItemCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountByAddressBean> tangibleItemAmmountAddresses = new HashSet<TangibleItemAmmountByAddressBean>();

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

    @JsonProperty("TICLocatonAddress")
	public String getTICLocatonAddress() {
		return TICLocatonAddress;
	}

	public void setTICLocatonAddress(String TICLocatonAddress) {
		this.TICLocatonAddress = TICLocatonAddress;
	}

    @JsonProperty("TICBookkeepingPosition")
	public int getTICBookkeepingPosition() {
		return TICBookkeepingPosition;
	}

	public void setTICBookkeepingPosition(int TICBookkeepingPosition) {
		this.TICBookkeepingPosition = TICBookkeepingPosition;
	}

    @JsonProperty("TICQuantityInitialState")
	public int getTICQuantityInitialState() {
		return TICQuantityInitialState;
	}

	public void setTICQuantityInitialState(int TICQuantityInitialState) {
		this.TICQuantityInitialState = TICQuantityInitialState;
	}

    @JsonProperty("TICQuantityCumulativeInput")
	public int getTICQuantityCumulativeInput() {
		return TICQuantityCumulativeInput;
	}

	public void setTICQuantityCumulativeInput(int TICQuantityCumulativeInput) {
		this.TICQuantityCumulativeInput = TICQuantityCumulativeInput;
	}

    @JsonProperty("TICQuantityCumulativeOutput")
	public int getTICQuantityCumulativeOutput() {
		return TICQuantityCumulativeOutput;
	}

	public void setTICQuantityCumulativeOutput(int TICQuantityCumulativeOutput) {
		this.TICQuantityCumulativeOutput = TICQuantityCumulativeOutput;
	}

    @JsonProperty("TICValueInitialState")
	public int getTICValueInitialState() {
		return TICValueInitialState;
	}

	public void setTICValueInitialState(int TICValueInitialState) {
		this.TICValueInitialState = TICValueInitialState;
	}

    @JsonProperty("TICValueCumulativeInput")
	public int getTICValueCumulativeInput() {
		return TICValueCumulativeInput;
	}

	public void setTICValueCumulativeInput(int TICValueCumulativeInput) {
		this.TICValueCumulativeInput = TICValueCumulativeInput;
	}

    @JsonProperty("TICValueCumulativeOutput")
	public int getTICValueCumulativeOutput() {
		return TICValueCumulativeOutput;
	}

	public void setTICValueCumulativeOutput(int TICValueCumulativeOutput) {
		this.TICValueCumulativeOutput = TICValueCumulativeOutput;
	}

    @JsonProperty("TICUnitPrice")
	public int getTICUnitPrice() {
		return TICUnitPrice;
	}

	public void setTICUnitPrice(int TICUnitPrice) {
		this.TICUnitPrice = TICUnitPrice;
	}

    @JsonProperty("TICAvailableBalance")
	public int getTICAvailableBalance() {
		return TICAvailableBalance;
	}

	public void setTICAvailableBalance(int TICAvailableBalance) {
		this.TICAvailableBalance = TICAvailableBalance;
	}

    @JsonProperty("TICABCStatus")
	public char getTICABCStatus() {
		return TICABCStatus;
	}

	public void setTICABCStatus(char TICABCStatus) {
		this.TICABCStatus = TICABCStatus;
	}

    @JsonProperty("TICOpeningDate")
	public Date getTICOpeningDate() {
		return TICOpeningDate;
	}

	public void setTICOpeningDate(Date TICOpeningDate) {
		this.TICOpeningDate = TICOpeningDate;
	}

    @JsonProperty("TICLastInputDate")
	public Date getTICLastInputDate() {
		return TICLastInputDate;
	}

	public void setTICLastInputDate(Date TICLastInputDate) {
		this.TICLastInputDate = TICLastInputDate;
	}

    @JsonProperty("TICLastOutputDate")
	public Date getTICLastOutputDate() {
		return TICLastOutputDate;
	}

	public void setTICLastOutputDate(Date TICLastOutputDate) {
		this.TICLastOutputDate = TICLastOutputDate;
	}

    @JsonProperty("TICAdditionalRecordStatus")
	public char getTICAdditionalRecordStatus() {
		return TICAdditionalRecordStatus;
	}

	public void setTICAdditionalRecordStatus(char TICAdditionalRecordStatus) {
		this.TICAdditionalRecordStatus = TICAdditionalRecordStatus;
	}

    @JsonProperty("TICSafetyStatus")
	public char getTICSafetyStatus() {
		return TICSafetyStatus;
	}

	public void setTICSafetyStatus(char TICSafetyStatus) {
		this.TICSafetyStatus = TICSafetyStatus;
	}


    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("priceDesignation")
	public PriceDesignationBean getPriceDesignation() {
		return priceDesignation;
	}

    public void setPriceDesignation(PriceDesignationBean priceDesignation) {
		this.priceDesignation = priceDesignation;
	}

    @JsonProperty("measurementUnit")
	public MeasurementUnitBean getMeasurementUnit() {
		return measurementUnit;
	}

    public void setMeasurementUnit(MeasurementUnitBean measurementUnit) {
		this.measurementUnit = measurementUnit;
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

    @JsonProperty("deliveryNoteItems")
	public Set<DeliveryNoteItemBean> getDeliveryNoteItems() {
		return deliveryNoteItems;
	}

	public void setDeliveryNoteItems(Set<DeliveryNoteItemBean> deliveryNoteItems) {
		this.deliveryNoteItems = deliveryNoteItems;
	}

    @JsonProperty("tangibleItemAnalytics")
	public Set<TangibleItemAnalyticsBean> getTangibleItemAnalytics() {
		return tangibleItemAnalytics;
	}

	public void setTangibleItemAnalytics(Set<TangibleItemAnalyticsBean> tangibleItemAnalytics) {
		this.tangibleItemAnalytics = tangibleItemAnalytics;
	}

    @JsonProperty("shippingDocumentItems")
	public Set<ShippingDocumentItemBean> getShippingDocumentItems() {
		return shippingDocumentItems;
	}

	public void setShippingDocumentItems(Set<ShippingDocumentItemBean> shippingDocumentItems) {
		this.shippingDocumentItems = shippingDocumentItems;
	}

    @JsonProperty("tangibleItemAmmountLots")
	public Set<TangibleItemAmmountByLotBean> getTangibleItemAmmountLots() {
		return tangibleItemAmmountLots;
	}

	public void setTangibleItemAmmountLots(Set<TangibleItemAmmountByLotBean> tangibleItemAmmountLots) {
		this.tangibleItemAmmountLots = tangibleItemAmmountLots;
	}

    @JsonProperty("goodsReceivedNoteItems")
	public Set<GoodsReceivedNoteItemBean> getGoodsReceivedNoteItems() {
		return goodsReceivedNoteItems;
	}

	public void setGoodsReceivedNoteItems(Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems) {
		this.goodsReceivedNoteItems = goodsReceivedNoteItems;
	}

    @JsonProperty("requisitionItems")
	public Set<RequisitionItemBean> getRequisitionItems() {
		return requisitionItems;
	}

	public void setRequisitionItems(Set<RequisitionItemBean> requisitionItems) {
		this.requisitionItems = requisitionItems;
	}

    @JsonProperty("materialReturnNoteItems")
	public Set<MaterialReturnNoteItemBean> getMaterialReturnNoteItems() {
		return materialReturnNoteItems;
	}

	public void setMaterialReturnNoteItems(Set<MaterialReturnNoteItemBean> materialReturnNoteItems) {
		this.materialReturnNoteItems = materialReturnNoteItems;
	}

    @JsonProperty("tangibleItemAmmountAddresses")
	public Set<TangibleItemAmmountByAddressBean> getTangibleItemAmmountAddresses() {
		return tangibleItemAmmountAddresses;
	}

	public void setTangibleItemAmmountAddresses(Set<TangibleItemAmmountByAddressBean> tangibleItemAmmountAddresses) {
		this.tangibleItemAmmountAddresses = tangibleItemAmmountAddresses;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TangibleItemConditionBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TangibleItemConditionBean) o).getId()));
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
		return "TangibleItemConditionBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TICLocatonAddress=" + TICLocatonAddress
			+ ", TICBookkeepingPosition=" + TICBookkeepingPosition
			+ ", TICQuantityInitialState=" + TICQuantityInitialState
			+ ", TICQuantityCumulativeInput=" + TICQuantityCumulativeInput
			+ ", TICQuantityCumulativeOutput=" + TICQuantityCumulativeOutput
			+ ", TICValueInitialState=" + TICValueInitialState
			+ ", TICValueCumulativeInput=" + TICValueCumulativeInput
			+ ", TICValueCumulativeOutput=" + TICValueCumulativeOutput
			+ ", TICUnitPrice=" + TICUnitPrice
			+ ", TICAvailableBalance=" + TICAvailableBalance
			+ ", TICABCStatus=" + TICABCStatus
			+ ", TICOpeningDate=" + TICOpeningDate
			+ ", TICLastInputDate=" + TICLastInputDate
			+ ", TICLastOutputDate=" + TICLastOutputDate
			+ ", TICAdditionalRecordStatus=" + TICAdditionalRecordStatus
			+ ", TICSafetyStatus=" + TICSafetyStatus
			// + ", identification=" + identification
			// + ", documentType=" + documentType
			// + ", stockroom=" + stockroom
			// + ", priceDesignation=" + priceDesignation
			// + ", measurementUnit=" + measurementUnit
			// + ", account=" + account
			// + ", tangibleItemStatus=" + tangibleItemStatus
			// + ", deliveryNoteItems=" + deliveryNoteItems
			// + ", tangibleItemAnalytics=" + tangibleItemAnalytics
			// + ", shippingDocumentItems=" + shippingDocumentItems
			// + ", tangibleItemAmmountLots=" + tangibleItemAmmountLots
			// + ", goodsReceivedNoteItems=" + goodsReceivedNoteItems
			// + ", requisitionItems=" + requisitionItems
			// + ", materialReturnNoteItems=" + materialReturnNoteItems
			// + ", tangibleItemAmmountAddresses=" + tangibleItemAmmountAddresses
			+ "]";
	}
}