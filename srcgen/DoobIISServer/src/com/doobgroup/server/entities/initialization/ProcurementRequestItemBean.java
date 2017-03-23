package com.doobgroup.server.entities.initialization;

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
import com.doobgroup.server.entities.initialization.ProcurementPlanItemBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestHeadingBean;
import com.doobgroup.server.entities.logical.ProcurementRequestSettlementBean;
import com.doobgroup.server.entities.stockmanagement.RevokedProcurementRequestBean;

@Entity
@Table(name = "PROCUREMENTREQUESTITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PRIOrdinalNumber"  ,  "procurementRequestHeader"  	}))
@SQLDelete(sql="UPDATE PROCUREMENTREQUESTITEM SET deleted = 1 WHERE ProcurementRequestItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProcurementRequestItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProcurementRequestItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PRIOrdinalNumber", nullable = false)
	protected int PRIOrdinalNumber;
	@Column(name = "PRIRequestedQuantity", nullable = false)
	protected int PRIRequestedQuantity;
	@Column(name = "PRIRealizedQuantity", nullable = false)
	protected int PRIRealizedQuantity;
	@Column(name = "PRIDeadlineDate", nullable = false)
	protected Date PRIDeadlineDate;
	@Column(name = "PRISupplyStatus", nullable = false)
	protected String PRISupplyStatus;
	@Column(name = "PRIApprovalDate")
	protected Date PRIApprovalDate;
	@Column(name = "PRISpecialApprovalDate")
	protected Date PRISpecialApprovalDate;
	@Column(name = "PRISpecialApprovalStatus")
	protected String PRISpecialApprovalStatus;
	@Column(name = "PRIFinalApprovedQuantity")
	protected int PRIFinalApprovedQuantity;
	@Column(name = "PRIIncludedQunatityInPlan", nullable = false)
	protected int PRIIncludedQunatityInPlan;
	@Column(name = "PRIResolutionStatus", nullable = false)
	protected String PRIResolutionStatus;
	@Column(name = "PRIRemark")
	protected String PRIRemark;
	@Column(name = "PRIListStatusPrinting")
	protected int PRIListStatusPrinting;
	@Column(name = "PRIEarlierMaturity")
	protected int PRIEarlierMaturity;
	@Column(name = "PRISettlementClaimsProcedure")
	protected String PRISettlementClaimsProcedure;
	@Column(name = "PRIDeletedStatus")
	protected String PRIDeletedStatus;
	@Column(name = "MUIdentificationCode", nullable = false)
	protected int MUIdentificationCode;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="supplier")
    protected IdentificationBean supplier;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="procurementPlanItem")
    protected ProcurementPlanItemBean procurementPlanItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="procurementRequestHeader")
    protected ProcurementRequestHeadingBean procurementRequestHeader;
    @OneToMany(mappedBy = "procurementRequestItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestSettlementBean> procurementRequestSettlements = new HashSet<ProcurementRequestSettlementBean>();
    @OneToMany(mappedBy = "procurementRequestItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RevokedProcurementRequestBean> revokedProcurementRequests = new HashSet<RevokedProcurementRequestBean>();

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

    @JsonProperty("PRIOrdinalNumber")
	public int getPRIOrdinalNumber() {
		return PRIOrdinalNumber;
	}

	public void setPRIOrdinalNumber(int PRIOrdinalNumber) {
		this.PRIOrdinalNumber = PRIOrdinalNumber;
	}

    @JsonProperty("PRIRequestedQuantity")
	public int getPRIRequestedQuantity() {
		return PRIRequestedQuantity;
	}

	public void setPRIRequestedQuantity(int PRIRequestedQuantity) {
		this.PRIRequestedQuantity = PRIRequestedQuantity;
	}

    @JsonProperty("PRIRealizedQuantity")
	public int getPRIRealizedQuantity() {
		return PRIRealizedQuantity;
	}

	public void setPRIRealizedQuantity(int PRIRealizedQuantity) {
		this.PRIRealizedQuantity = PRIRealizedQuantity;
	}

    @JsonProperty("PRIDeadlineDate")
	public Date getPRIDeadlineDate() {
		return PRIDeadlineDate;
	}

	public void setPRIDeadlineDate(Date PRIDeadlineDate) {
		this.PRIDeadlineDate = PRIDeadlineDate;
	}

    @JsonProperty("PRISupplyStatus")
	public String getPRISupplyStatus() {
		return PRISupplyStatus;
	}

	public void setPRISupplyStatus(String PRISupplyStatus) {
		this.PRISupplyStatus = PRISupplyStatus;
	}

    @JsonProperty("PRIApprovalDate")
	public Date getPRIApprovalDate() {
		return PRIApprovalDate;
	}

	public void setPRIApprovalDate(Date PRIApprovalDate) {
		this.PRIApprovalDate = PRIApprovalDate;
	}

    @JsonProperty("PRISpecialApprovalDate")
	public Date getPRISpecialApprovalDate() {
		return PRISpecialApprovalDate;
	}

	public void setPRISpecialApprovalDate(Date PRISpecialApprovalDate) {
		this.PRISpecialApprovalDate = PRISpecialApprovalDate;
	}

    @JsonProperty("PRISpecialApprovalStatus")
	public String getPRISpecialApprovalStatus() {
		return PRISpecialApprovalStatus;
	}

	public void setPRISpecialApprovalStatus(String PRISpecialApprovalStatus) {
		this.PRISpecialApprovalStatus = PRISpecialApprovalStatus;
	}

    @JsonProperty("PRIFinalApprovedQuantity")
	public int getPRIFinalApprovedQuantity() {
		return PRIFinalApprovedQuantity;
	}

	public void setPRIFinalApprovedQuantity(int PRIFinalApprovedQuantity) {
		this.PRIFinalApprovedQuantity = PRIFinalApprovedQuantity;
	}

    @JsonProperty("PRIIncludedQunatityInPlan")
	public int getPRIIncludedQunatityInPlan() {
		return PRIIncludedQunatityInPlan;
	}

	public void setPRIIncludedQunatityInPlan(int PRIIncludedQunatityInPlan) {
		this.PRIIncludedQunatityInPlan = PRIIncludedQunatityInPlan;
	}

    @JsonProperty("PRIResolutionStatus")
	public String getPRIResolutionStatus() {
		return PRIResolutionStatus;
	}

	public void setPRIResolutionStatus(String PRIResolutionStatus) {
		this.PRIResolutionStatus = PRIResolutionStatus;
	}

    @JsonProperty("PRIRemark")
	public String getPRIRemark() {
		return PRIRemark;
	}

	public void setPRIRemark(String PRIRemark) {
		this.PRIRemark = PRIRemark;
	}

    @JsonProperty("PRIListStatusPrinting")
	public int getPRIListStatusPrinting() {
		return PRIListStatusPrinting;
	}

	public void setPRIListStatusPrinting(int PRIListStatusPrinting) {
		this.PRIListStatusPrinting = PRIListStatusPrinting;
	}

    @JsonProperty("PRIEarlierMaturity")
	public int getPRIEarlierMaturity() {
		return PRIEarlierMaturity;
	}

	public void setPRIEarlierMaturity(int PRIEarlierMaturity) {
		this.PRIEarlierMaturity = PRIEarlierMaturity;
	}

    @JsonProperty("PRISettlementClaimsProcedure")
	public String getPRISettlementClaimsProcedure() {
		return PRISettlementClaimsProcedure;
	}

	public void setPRISettlementClaimsProcedure(String PRISettlementClaimsProcedure) {
		this.PRISettlementClaimsProcedure = PRISettlementClaimsProcedure;
	}

    @JsonProperty("PRIDeletedStatus")
	public String getPRIDeletedStatus() {
		return PRIDeletedStatus;
	}

	public void setPRIDeletedStatus(String PRIDeletedStatus) {
		this.PRIDeletedStatus = PRIDeletedStatus;
	}

    @JsonProperty("MUIdentificationCode")
	public int getMUIdentificationCode() {
		return MUIdentificationCode;
	}

	public void setMUIdentificationCode(int MUIdentificationCode) {
		this.MUIdentificationCode = MUIdentificationCode;
	}


    @JsonProperty("supplier")
	public IdentificationBean getSupplier() {
		return supplier;
	}

    public void setSupplier(IdentificationBean supplier) {
		this.supplier = supplier;
	}

    @JsonProperty("procurementPlanItem")
	public ProcurementPlanItemBean getProcurementPlanItem() {
		return procurementPlanItem;
	}

    public void setProcurementPlanItem(ProcurementPlanItemBean procurementPlanItem) {
		this.procurementPlanItem = procurementPlanItem;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("procurementRequestHeader")
	public ProcurementRequestHeadingBean getProcurementRequestHeader() {
		return procurementRequestHeader;
	}

    public void setProcurementRequestHeader(ProcurementRequestHeadingBean procurementRequestHeader) {
		this.procurementRequestHeader = procurementRequestHeader;
	}

    @JsonProperty("procurementRequestSettlements")
	public Set<ProcurementRequestSettlementBean> getProcurementRequestSettlements() {
		return procurementRequestSettlements;
	}

	public void setProcurementRequestSettlements(Set<ProcurementRequestSettlementBean> procurementRequestSettlements) {
		this.procurementRequestSettlements = procurementRequestSettlements;
	}

    @JsonProperty("revokedProcurementRequests")
	public Set<RevokedProcurementRequestBean> getRevokedProcurementRequests() {
		return revokedProcurementRequests;
	}

	public void setRevokedProcurementRequests(Set<RevokedProcurementRequestBean> revokedProcurementRequests) {
		this.revokedProcurementRequests = revokedProcurementRequests;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProcurementRequestItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProcurementRequestItemBean) o).getId()));
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
		return "ProcurementRequestItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PRIOrdinalNumber=" + PRIOrdinalNumber
			+ ", PRIRequestedQuantity=" + PRIRequestedQuantity
			+ ", PRIRealizedQuantity=" + PRIRealizedQuantity
			+ ", PRIDeadlineDate=" + PRIDeadlineDate
			+ ", PRISupplyStatus=" + PRISupplyStatus
			+ ", PRIApprovalDate=" + PRIApprovalDate
			+ ", PRISpecialApprovalDate=" + PRISpecialApprovalDate
			+ ", PRISpecialApprovalStatus=" + PRISpecialApprovalStatus
			+ ", PRIFinalApprovedQuantity=" + PRIFinalApprovedQuantity
			+ ", PRIIncludedQunatityInPlan=" + PRIIncludedQunatityInPlan
			+ ", PRIResolutionStatus=" + PRIResolutionStatus
			+ ", PRIRemark=" + PRIRemark
			+ ", PRIListStatusPrinting=" + PRIListStatusPrinting
			+ ", PRIEarlierMaturity=" + PRIEarlierMaturity
			+ ", PRISettlementClaimsProcedure=" + PRISettlementClaimsProcedure
			+ ", PRIDeletedStatus=" + PRIDeletedStatus
			+ ", MUIdentificationCode=" + MUIdentificationCode
			// + ", supplier=" + supplier
			// + ", procurementPlanItem=" + procurementPlanItem
			// + ", identification=" + identification
			// + ", procurementRequestHeader=" + procurementRequestHeader
			// + ", procurementRequestSettlements=" + procurementRequestSettlements
			// + ", revokedProcurementRequests=" + revokedProcurementRequests
			+ "]";
	}
}