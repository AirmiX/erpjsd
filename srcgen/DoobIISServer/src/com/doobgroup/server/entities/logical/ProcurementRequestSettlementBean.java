package com.doobgroup.server.entities.logical;

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

import com.doobgroup.server.entities.initialization.ProcurementRequestItemBean;
import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;

@Entity
@Table(name = "PROCUREMENTREQUESTSETTLEMENT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "procurementRequestItem" ,   "goodsReceivedNoteItem"  	}))
@SQLDelete(sql="UPDATE PROCUREMENTREQUESTSETTLEMENT SET deleted = 1 WHERE ProcurementRequestSettlement_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProcurementRequestSettlementBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProcurementRequestSettlement_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PRSDate", nullable = false)
	protected Date PRSDate;
	@Column(name = "PRSQuantity", nullable = false)
	protected int PRSQuantity;
	@Column(name = "PRSRequestedReceivedListStatus", nullable = false)
	protected int PRSRequestedReceivedListStatus;
	@Column(name = "PRSSettlementProcedure")
	protected String PRSSettlementProcedure;
	@Column(name = "PRSRequestCreatedBy")
	protected String PRSRequestCreatedBy;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="procurementRequestItem")
    protected ProcurementRequestItemBean procurementRequestItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="goodsReceivedNoteItem")
    protected GoodsReceivedNoteItemBean goodsReceivedNoteItem;

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

    @JsonProperty("PRSDate")
	public Date getPRSDate() {
		return PRSDate;
	}

	public void setPRSDate(Date PRSDate) {
		this.PRSDate = PRSDate;
	}

    @JsonProperty("PRSQuantity")
	public int getPRSQuantity() {
		return PRSQuantity;
	}

	public void setPRSQuantity(int PRSQuantity) {
		this.PRSQuantity = PRSQuantity;
	}

    @JsonProperty("PRSRequestedReceivedListStatus")
	public int getPRSRequestedReceivedListStatus() {
		return PRSRequestedReceivedListStatus;
	}

	public void setPRSRequestedReceivedListStatus(int PRSRequestedReceivedListStatus) {
		this.PRSRequestedReceivedListStatus = PRSRequestedReceivedListStatus;
	}

    @JsonProperty("PRSSettlementProcedure")
	public String getPRSSettlementProcedure() {
		return PRSSettlementProcedure;
	}

	public void setPRSSettlementProcedure(String PRSSettlementProcedure) {
		this.PRSSettlementProcedure = PRSSettlementProcedure;
	}

    @JsonProperty("PRSRequestCreatedBy")
	public String getPRSRequestCreatedBy() {
		return PRSRequestCreatedBy;
	}

	public void setPRSRequestCreatedBy(String PRSRequestCreatedBy) {
		this.PRSRequestCreatedBy = PRSRequestCreatedBy;
	}


    @JsonProperty("procurementRequestItem")
	public ProcurementRequestItemBean getProcurementRequestItem() {
		return procurementRequestItem;
	}

    public void setProcurementRequestItem(ProcurementRequestItemBean procurementRequestItem) {
		this.procurementRequestItem = procurementRequestItem;
	}

    @JsonProperty("goodsReceivedNoteItem")
	public GoodsReceivedNoteItemBean getGoodsReceivedNoteItem() {
		return goodsReceivedNoteItem;
	}

    public void setGoodsReceivedNoteItem(GoodsReceivedNoteItemBean goodsReceivedNoteItem) {
		this.goodsReceivedNoteItem = goodsReceivedNoteItem;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProcurementRequestSettlementBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProcurementRequestSettlementBean) o).getId()));
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
		return "ProcurementRequestSettlementBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PRSDate=" + PRSDate
			+ ", PRSQuantity=" + PRSQuantity
			+ ", PRSRequestedReceivedListStatus=" + PRSRequestedReceivedListStatus
			+ ", PRSSettlementProcedure=" + PRSSettlementProcedure
			+ ", PRSRequestCreatedBy=" + PRSRequestCreatedBy
			// + ", procurementRequestItem=" + procurementRequestItem
			// + ", goodsReceivedNoteItem=" + goodsReceivedNoteItem
			+ "]";
	}
}