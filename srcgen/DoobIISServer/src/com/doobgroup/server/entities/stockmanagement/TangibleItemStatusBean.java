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

import com.doobgroup.server.entities.renaming.RenamingBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemAmmountToolBean;
import com.doobgroup.server.entities.stockmanagement.PriceBean;
import com.doobgroup.server.entities.stockmanagement.StockAccountAssignmentBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteItemBean;
import com.doobgroup.server.entities.stockmanagement.StockroomOrgUniBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteItemBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemConditionBean;

@Entity
@Table(name = "TANGIBLEITEMSTATUS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TISDesignation"  	}))
@SQLDelete(sql="UPDATE TANGIBLEITEMSTATUS SET deleted = 1 WHERE TangibleItemStatus_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TangibleItemStatusBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TangibleItemStatus_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TISDesignation", nullable = false)
	protected char TISDesignation;
	@Column(name = "TISName", nullable = false)
	protected String TISName;

    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RenamingBean> renamings = new HashSet<RenamingBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools = new HashSet<TangibleItemAmmountToolBean>();
    @OneToMany(mappedBy = "tangibleItemStatuses", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<PriceBean> prices = new HashSet<PriceBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockAccountAssignmentBean> stockAccountAssignments = new HashSet<StockAccountAssignmentBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOrderBean> workOrders = new HashSet<WorkOrderBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteItemBean> deliveryNoteItems = new HashSet<DeliveryNoteItemBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomOrgUniBean> stockroomOrgUnis = new HashSet<StockroomOrgUniBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteItemBean> materialReturnNoteItems = new HashSet<MaterialReturnNoteItemBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems = new HashSet<GoodsReceivedNoteItemBean>();
    @OneToMany(mappedBy = "tangibleItemStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TangibleItemConditionBean> tangibleItemConditions = new HashSet<TangibleItemConditionBean>();

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

    @JsonProperty("TISDesignation")
	public char getTISDesignation() {
		return TISDesignation;
	}

	public void setTISDesignation(char TISDesignation) {
		this.TISDesignation = TISDesignation;
	}

    @JsonProperty("TISName")
	public String getTISName() {
		return TISName;
	}

	public void setTISName(String TISName) {
		this.TISName = TISName;
	}


    @JsonProperty("renamings")
	public Set<RenamingBean> getRenamings() {
		return renamings;
	}

	public void setRenamings(Set<RenamingBean> renamings) {
		this.renamings = renamings;
	}

    @JsonProperty("tangibleItemAmmountTools")
	public Set<TangibleItemAmmountToolBean> getTangibleItemAmmountTools() {
		return tangibleItemAmmountTools;
	}

	public void setTangibleItemAmmountTools(Set<TangibleItemAmmountToolBean> tangibleItemAmmountTools) {
		this.tangibleItemAmmountTools = tangibleItemAmmountTools;
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

    @JsonProperty("workOrders")
	public Set<WorkOrderBean> getWorkOrders() {
		return workOrders;
	}

	public void setWorkOrders(Set<WorkOrderBean> workOrders) {
		this.workOrders = workOrders;
	}

    @JsonProperty("deliveryNoteItems")
	public Set<DeliveryNoteItemBean> getDeliveryNoteItems() {
		return deliveryNoteItems;
	}

	public void setDeliveryNoteItems(Set<DeliveryNoteItemBean> deliveryNoteItems) {
		this.deliveryNoteItems = deliveryNoteItems;
	}

    @JsonProperty("stockroomOrgUnis")
	public Set<StockroomOrgUniBean> getStockroomOrgUnis() {
		return stockroomOrgUnis;
	}

	public void setStockroomOrgUnis(Set<StockroomOrgUniBean> stockroomOrgUnis) {
		this.stockroomOrgUnis = stockroomOrgUnis;
	}

    @JsonProperty("materialReturnNoteItems")
	public Set<MaterialReturnNoteItemBean> getMaterialReturnNoteItems() {
		return materialReturnNoteItems;
	}

	public void setMaterialReturnNoteItems(Set<MaterialReturnNoteItemBean> materialReturnNoteItems) {
		this.materialReturnNoteItems = materialReturnNoteItems;
	}

    @JsonProperty("goodsReceivedNoteItems")
	public Set<GoodsReceivedNoteItemBean> getGoodsReceivedNoteItems() {
		return goodsReceivedNoteItems;
	}

	public void setGoodsReceivedNoteItems(Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems) {
		this.goodsReceivedNoteItems = goodsReceivedNoteItems;
	}

    @JsonProperty("tangibleItemConditions")
	public Set<TangibleItemConditionBean> getTangibleItemConditions() {
		return tangibleItemConditions;
	}

	public void setTangibleItemConditions(Set<TangibleItemConditionBean> tangibleItemConditions) {
		this.tangibleItemConditions = tangibleItemConditions;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TangibleItemStatusBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TangibleItemStatusBean) o).getId()));
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
		return "TangibleItemStatusBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TISDesignation=" + TISDesignation
			+ ", TISName=" + TISName
			// + ", renamings=" + renamings
			// + ", tangibleItemAmmountTools=" + tangibleItemAmmountTools
			// + ", prices=" + prices
			// + ", stockAccountAssignments=" + stockAccountAssignments
			// + ", workOrders=" + workOrders
			// + ", deliveryNoteItems=" + deliveryNoteItems
			// + ", stockroomOrgUnis=" + stockroomOrgUnis
			// + ", materialReturnNoteItems=" + materialReturnNoteItems
			// + ", goodsReceivedNoteItems=" + goodsReceivedNoteItems
			// + ", tangibleItemConditions=" + tangibleItemConditions
			+ "]";
	}
}