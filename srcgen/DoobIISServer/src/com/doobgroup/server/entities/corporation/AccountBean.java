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

import com.doobgroup.server.entities.stockmanagement.ExpensesAccountAssignmentBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteItemBean;
import com.doobgroup.server.entities.initialization.TaxBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionItemBean;
import com.doobgroup.server.entities.stockmanagement.StockAccountAssignmentBean;
import com.doobgroup.server.entities.stockmanagement.TransactionLogBean;
import com.doobgroup.server.entities.renaming.RenamingItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountToolBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteItemBean;

@Entity
@Table(name = "ACCOUNT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "AAccountNumber"  	}))
@SQLDelete(sql="UPDATE ACCOUNT SET deleted = 1 WHERE Account_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AccountBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Account_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "AAccountNumber", nullable = false)
	protected String AAccountNumber;
	@Column(name = "AName", nullable = false)
	protected String AName;
	@Column(name = "AIsTransfer", nullable = false)
	protected Boolean AIsTransfer;
	@Column(name = "AHasCostLocation")
	protected Boolean AHasCostLocation;
	@Column(name = "AIsForeignCurrencyAccount")
	protected Boolean AIsForeignCurrencyAccount;
	@Column(name = "AHasPartner")
	protected Boolean AHasPartner;
	@Column(name = "AHasAnalytics")
	protected Boolean AHasAnalytics;
	@Column(name = "AIsBalanceSheet")
	protected Boolean AIsBalanceSheet;
	@Column(name = "AEntrySide", nullable = false)
	protected String AEntrySide;
	@Column(name = "ADisplaySide", nullable = false)
	protected String ADisplaySide;

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ExpensesAccountAssignmentBean> assignedStockAccount = new HashSet<ExpensesAccountAssignmentBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteItemBean> deliveryNoteItems = new HashSet<DeliveryNoteItemBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TaxBean> taxes = new HashSet<TaxBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionItemBean> requsitionItems = new HashSet<RequisitionItemBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ExpensesAccountAssignmentBean> assignedExpensesAccounts = new HashSet<ExpensesAccountAssignmentBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockAccountAssignmentBean> stockAccountAssignments = new HashSet<StockAccountAssignmentBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionItemBean> requsitionItemsStock = new HashSet<RequisitionItemBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TransactionLogBean> transactionLogs = new HashSet<TransactionLogBean>();
    @OneToMany(mappedBy = "accountOutput", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingItemBean> renamingItemsOutput = new HashSet<RenamingItemBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools = new HashSet<TangibleItemAmmountToolBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteItemBean> materialReturnNoteItems = new HashSet<MaterialReturnNoteItemBean>();
    @OneToMany(mappedBy = "accountOutput", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
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

    @JsonProperty("AAccountNumber")
	public String getAAccountNumber() {
		return AAccountNumber;
	}

	public void setAAccountNumber(String AAccountNumber) {
		this.AAccountNumber = AAccountNumber;
	}

    @JsonProperty("AName")
	public String getAName() {
		return AName;
	}

	public void setAName(String AName) {
		this.AName = AName;
	}

    @JsonProperty("AIsTransfer")
	public Boolean getAIsTransfer() {
		return AIsTransfer;
	}

	public void setAIsTransfer(Boolean AIsTransfer) {
		this.AIsTransfer = AIsTransfer;
	}

    @JsonProperty("AHasCostLocation")
	public Boolean getAHasCostLocation() {
		return AHasCostLocation;
	}

	public void setAHasCostLocation(Boolean AHasCostLocation) {
		this.AHasCostLocation = AHasCostLocation;
	}

    @JsonProperty("AIsForeignCurrencyAccount")
	public Boolean getAIsForeignCurrencyAccount() {
		return AIsForeignCurrencyAccount;
	}

	public void setAIsForeignCurrencyAccount(Boolean AIsForeignCurrencyAccount) {
		this.AIsForeignCurrencyAccount = AIsForeignCurrencyAccount;
	}

    @JsonProperty("AHasPartner")
	public Boolean getAHasPartner() {
		return AHasPartner;
	}

	public void setAHasPartner(Boolean AHasPartner) {
		this.AHasPartner = AHasPartner;
	}

    @JsonProperty("AHasAnalytics")
	public Boolean getAHasAnalytics() {
		return AHasAnalytics;
	}

	public void setAHasAnalytics(Boolean AHasAnalytics) {
		this.AHasAnalytics = AHasAnalytics;
	}

    @JsonProperty("AIsBalanceSheet")
	public Boolean getAIsBalanceSheet() {
		return AIsBalanceSheet;
	}

	public void setAIsBalanceSheet(Boolean AIsBalanceSheet) {
		this.AIsBalanceSheet = AIsBalanceSheet;
	}

    @JsonProperty("AEntrySide")
	public String getAEntrySide() {
		return AEntrySide;
	}

	public void setAEntrySide(String AEntrySide) {
		this.AEntrySide = AEntrySide;
	}

    @JsonProperty("ADisplaySide")
	public String getADisplaySide() {
		return ADisplaySide;
	}

	public void setADisplaySide(String ADisplaySide) {
		this.ADisplaySide = ADisplaySide;
	}


    @JsonProperty("assignedStockAccount")
	public Set<ExpensesAccountAssignmentBean> getAssignedStockAccount() {
		return assignedStockAccount;
	}

	public void setAssignedStockAccount(Set<ExpensesAccountAssignmentBean> assignedStockAccount) {
		this.assignedStockAccount = assignedStockAccount;
	}

    @JsonProperty("deliveryNoteItems")
	public Set<DeliveryNoteItemBean> getDeliveryNoteItems() {
		return deliveryNoteItems;
	}

	public void setDeliveryNoteItems(Set<DeliveryNoteItemBean> deliveryNoteItems) {
		this.deliveryNoteItems = deliveryNoteItems;
	}

    @JsonProperty("taxes")
	public Set<TaxBean> getTaxes() {
		return taxes;
	}

	public void setTaxes(Set<TaxBean> taxes) {
		this.taxes = taxes;
	}

    @JsonProperty("requsitionItems")
	public Set<RequisitionItemBean> getRequsitionItems() {
		return requsitionItems;
	}

	public void setRequsitionItems(Set<RequisitionItemBean> requsitionItems) {
		this.requsitionItems = requsitionItems;
	}

    @JsonProperty("assignedExpensesAccounts")
	public Set<ExpensesAccountAssignmentBean> getAssignedExpensesAccounts() {
		return assignedExpensesAccounts;
	}

	public void setAssignedExpensesAccounts(Set<ExpensesAccountAssignmentBean> assignedExpensesAccounts) {
		this.assignedExpensesAccounts = assignedExpensesAccounts;
	}

    @JsonProperty("stockAccountAssignments")
	public Set<StockAccountAssignmentBean> getStockAccountAssignments() {
		return stockAccountAssignments;
	}

	public void setStockAccountAssignments(Set<StockAccountAssignmentBean> stockAccountAssignments) {
		this.stockAccountAssignments = stockAccountAssignments;
	}

    @JsonProperty("requsitionItemsStock")
	public Set<RequisitionItemBean> getRequsitionItemsStock() {
		return requsitionItemsStock;
	}

	public void setRequsitionItemsStock(Set<RequisitionItemBean> requsitionItemsStock) {
		this.requsitionItemsStock = requsitionItemsStock;
	}

    @JsonProperty("transactionLogs")
	public Set<TransactionLogBean> getTransactionLogs() {
		return transactionLogs;
	}

	public void setTransactionLogs(Set<TransactionLogBean> transactionLogs) {
		this.transactionLogs = transactionLogs;
	}

    @JsonProperty("renamingItemsOutput")
	public Set<RenamingItemBean> getRenamingItemsOutput() {
		return renamingItemsOutput;
	}

	public void setRenamingItemsOutput(Set<RenamingItemBean> renamingItemsOutput) {
		this.renamingItemsOutput = renamingItemsOutput;
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

    @JsonProperty("materialReturnNoteItems")
	public Set<MaterialReturnNoteItemBean> getMaterialReturnNoteItems() {
		return materialReturnNoteItems;
	}

	public void setMaterialReturnNoteItems(Set<MaterialReturnNoteItemBean> materialReturnNoteItems) {
		this.materialReturnNoteItems = materialReturnNoteItems;
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
		if (o == null || !(o instanceof AccountBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AccountBean) o).getId()));
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
		return "AccountBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", AAccountNumber=" + AAccountNumber
			+ ", AName=" + AName
			+ ", AIsTransfer=" + AIsTransfer
			+ ", AHasCostLocation=" + AHasCostLocation
			+ ", AIsForeignCurrencyAccount=" + AIsForeignCurrencyAccount
			+ ", AHasPartner=" + AHasPartner
			+ ", AHasAnalytics=" + AHasAnalytics
			+ ", AIsBalanceSheet=" + AIsBalanceSheet
			+ ", AEntrySide=" + AEntrySide
			+ ", ADisplaySide=" + ADisplaySide
			// + ", assignedStockAccount=" + assignedStockAccount
			// + ", deliveryNoteItems=" + deliveryNoteItems
			// + ", taxes=" + taxes
			// + ", requsitionItems=" + requsitionItems
			// + ", assignedExpensesAccounts=" + assignedExpensesAccounts
			// + ", stockAccountAssignments=" + stockAccountAssignments
			// + ", requsitionItemsStock=" + requsitionItemsStock
			// + ", transactionLogs=" + transactionLogs
			// + ", renamingItemsOutput=" + renamingItemsOutput
			// + ", tangibleItemAmmountTools=" + tangibleItemAmmountTools
			// + ", tangibleItemConditions=" + tangibleItemConditions
			// + ", materialReturnNoteItems=" + materialReturnNoteItems
			// + ", renamingItemsInput=" + renamingItemsInput
			+ "]";
	}
}