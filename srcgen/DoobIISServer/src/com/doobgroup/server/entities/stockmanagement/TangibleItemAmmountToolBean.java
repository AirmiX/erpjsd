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

import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.stockmanagement.PriceDesignationBean;
import com.doobgroup.server.entities.corporation.AccountBean;

@Entity
@Table(name = "TANGIBLEITEMAMMOUNTTOOL"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "tangibleItemStatus" ,   "identification" ,   "stockroom"  	}))
@SQLDelete(sql="UPDATE TANGIBLEITEMAMMOUNTTOOL SET deleted = 1 WHERE TangibleItemAmmountTool_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TangibleItemAmmountToolBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TangibleItemAmmountTool_id")
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
	@Column(name = "TICLastInputDate", nullable = false)
	protected Date TICLastInputDate;
	@Column(name = "TICLastOutputDate", nullable = false)
	protected Date TICLastOutputDate;
	@Column(name = "TICAdditionalRecordStatus")
	protected char TICAdditionalRecordStatus;
	@Column(name = "TICQuantityForElemination")
	protected int TICQuantityForElemination;
	@Column(name = "TICQuantityForSharping")
	protected int TICQuantityForSharping;
	@Column(name = "TICQuantityForRepair")
	protected int TICQuantityForRepair;
	@Column(name = "TICQuantityOnSharping")
	protected int TICQuantityOnSharping;
	@Column(name = "TICQuantityOnRepair")
	protected int TICQuantityOnRepair;
	@Column(name = "TICQunatityAtWorker")
	protected int TICQunatityAtWorker;
	@Column(name = "TICWriteOffDesignation")
	protected int TICWriteOffDesignation;
	@Column(name = "TICWriteOffValue")
	protected int TICWriteOffValue;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="priceDesignation")
    protected PriceDesignationBean priceDesignation;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;

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

    @JsonProperty("TICQuantityForElemination")
	public int getTICQuantityForElemination() {
		return TICQuantityForElemination;
	}

	public void setTICQuantityForElemination(int TICQuantityForElemination) {
		this.TICQuantityForElemination = TICQuantityForElemination;
	}

    @JsonProperty("TICQuantityForSharping")
	public int getTICQuantityForSharping() {
		return TICQuantityForSharping;
	}

	public void setTICQuantityForSharping(int TICQuantityForSharping) {
		this.TICQuantityForSharping = TICQuantityForSharping;
	}

    @JsonProperty("TICQuantityForRepair")
	public int getTICQuantityForRepair() {
		return TICQuantityForRepair;
	}

	public void setTICQuantityForRepair(int TICQuantityForRepair) {
		this.TICQuantityForRepair = TICQuantityForRepair;
	}

    @JsonProperty("TICQuantityOnSharping")
	public int getTICQuantityOnSharping() {
		return TICQuantityOnSharping;
	}

	public void setTICQuantityOnSharping(int TICQuantityOnSharping) {
		this.TICQuantityOnSharping = TICQuantityOnSharping;
	}

    @JsonProperty("TICQuantityOnRepair")
	public int getTICQuantityOnRepair() {
		return TICQuantityOnRepair;
	}

	public void setTICQuantityOnRepair(int TICQuantityOnRepair) {
		this.TICQuantityOnRepair = TICQuantityOnRepair;
	}

    @JsonProperty("TICQunatityAtWorker")
	public int getTICQunatityAtWorker() {
		return TICQunatityAtWorker;
	}

	public void setTICQunatityAtWorker(int TICQunatityAtWorker) {
		this.TICQunatityAtWorker = TICQunatityAtWorker;
	}

    @JsonProperty("TICWriteOffDesignation")
	public int getTICWriteOffDesignation() {
		return TICWriteOffDesignation;
	}

	public void setTICWriteOffDesignation(int TICWriteOffDesignation) {
		this.TICWriteOffDesignation = TICWriteOffDesignation;
	}

    @JsonProperty("TICWriteOffValue")
	public int getTICWriteOffValue() {
		return TICWriteOffValue;
	}

	public void setTICWriteOffValue(int TICWriteOffValue) {
		this.TICWriteOffValue = TICWriteOffValue;
	}


    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
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

    @JsonProperty("account")
	public AccountBean getAccount() {
		return account;
	}

    public void setAccount(AccountBean account) {
		this.account = account;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TangibleItemAmmountToolBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TangibleItemAmmountToolBean) o).getId()));
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
		return "TangibleItemAmmountToolBean [id=" + id + ", deleted=" + deleted + ", version=" + version
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
			+ ", TICLastInputDate=" + TICLastInputDate
			+ ", TICLastOutputDate=" + TICLastOutputDate
			+ ", TICAdditionalRecordStatus=" + TICAdditionalRecordStatus
			+ ", TICQuantityForElemination=" + TICQuantityForElemination
			+ ", TICQuantityForSharping=" + TICQuantityForSharping
			+ ", TICQuantityForRepair=" + TICQuantityForRepair
			+ ", TICQuantityOnSharping=" + TICQuantityOnSharping
			+ ", TICQuantityOnRepair=" + TICQuantityOnRepair
			+ ", TICQunatityAtWorker=" + TICQunatityAtWorker
			+ ", TICWriteOffDesignation=" + TICWriteOffDesignation
			+ ", TICWriteOffValue=" + TICWriteOffValue
			// + ", tangibleItemStatus=" + tangibleItemStatus
			// + ", identification=" + identification
			// + ", stockroom=" + stockroom
			// + ", priceDesignation=" + priceDesignation
			// + ", account=" + account
			+ "]";
	}
}