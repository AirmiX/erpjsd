package com.doobgroup.server.entities.productiondata;

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
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.corporation.LocationBean;
import com.doobgroup.server.entities.capacitymanagement.AlternativeWorkCenterBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessStepsBean;
import com.doobgroup.server.entities.capacitymanagement.WorkCenterStepsBean;
import com.doobgroup.server.entities.capacitymanagement.BalanceResourceBean;
import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;
import com.doobgroup.server.entities.capacitymanagement.AvailabilityWorkCenterBean;

@Entity
@Table(name = "WORKCENTER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "WCIndentificationCode"  ,  "organizationUnit" ,   "location"  	}))
@SQLDelete(sql="UPDATE WORKCENTER SET deleted = 1 WHERE WorkCenter_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class WorkCenterBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "WorkCenter_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "WCIndentificationCode", nullable = false)
	protected int WCIndentificationCode;
	@Column(name = "WCShortName", nullable = false)
	protected String WCShortName;
	@Column(name = "WCName", nullable = false)
	protected String WCName;
	@Column(name = "WCWorkingDayLenght", nullable = false)
	protected int WCWorkingDayLenght;
	@Column(name = "WCWorkingWeekLenght", nullable = false)
	protected int WCWorkingWeekLenght;
	@Column(name = "WCShiftsNumber", nullable = false)
	protected int WCShiftsNumber;
	@Column(name = "WCWorkStationsNumber", nullable = false)
	protected int WCWorkStationsNumber;
	@Column(name = "WCNumberOfEmployees", nullable = false)
	protected int WCNumberOfEmployees;
	@Column(name = "WCNumberOfSteps", nullable = false)
	protected int WCNumberOfSteps;
	@Column(name = "WCResourceConstraintIndicator")
	protected int WCResourceConstraintIndicator;
	@Column(name = "WCAverageWaitingTimeInFrontOfWorkCenter", nullable = false)
	protected int WCAverageWaitingTimeInFrontOfWorkCenter;
	@Column(name = "WCMaterialTransferAverageTime", nullable = false)
	protected int WCMaterialTransferAverageTime;
	@Column(name = "WCTechnicalCapacity", nullable = false)
	protected int WCTechnicalCapacity;
	@Column(name = "WCAvailableCapacity", nullable = false)
	protected int WCAvailableCapacity;
	@Column(name = "WCLoadAnalysisIndicator", nullable = false)
	protected String WCLoadAnalysisIndicator;
	@Column(name = "WCStandardHourPrice")
	protected int WCStandardHourPrice;
	@Column(name = "WCMaterialsCostsPercentage")
	protected int WCMaterialsCostsPercentage;
	@Column(name = "WCLaborCostsPercentage")
	protected int WCLaborCostsPercentage;
	@Column(name = "WCDataCompletenessStatus", nullable = false)
	protected int WCDataCompletenessStatus;
	@Column(name = "WCActitvityStatus", nullable = false)
	protected int WCActitvityStatus;
	@Column(name = "WCEnteredBy")
	protected String WCEnteredBy;
	@Column(name = "WCEntryDate")
	protected Date WCEntryDate;
	@Column(name = "WCModifiedBy")
	protected String WCModifiedBy;
	@Column(name = "WCModificationDate")
	protected Date WCModificationDate;
	@Column(name = "WCApprovedBy")
	protected String WCApprovedBy;
	@Column(name = "WCApprovalDate")
	protected Date WCApprovalDate;
	@Column(name = "WCAffiliationStatus")
	protected String WCAffiliationStatus;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="location")
    protected LocationBean location;
    @OneToMany(mappedBy = "workCenter1", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AlternativeWorkCenterBean> alternativeWorkCenters1 = new HashSet<AlternativeWorkCenterBean>();
    @OneToMany(mappedBy = "workCenter", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionProcessStepsBean> productionProcessSteps = new HashSet<ProductionProcessStepsBean>();
    @OneToMany(mappedBy = "workCenter", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkCenterStepsBean> workCenterSteps = new HashSet<WorkCenterStepsBean>();
    @OneToMany(mappedBy = "workCenter", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BalanceResourceBean> balanceResources = new HashSet<BalanceResourceBean>();
    @OneToMany(mappedBy = "workCenter", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TechnologicalUnitBean> technologicalUnits = new HashSet<TechnologicalUnitBean>();
    @OneToMany(mappedBy = "workCenter1", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AlternativeWorkCenterBean> alternativeWorkCenters = new HashSet<AlternativeWorkCenterBean>();
    @OneToMany(mappedBy = "workCenter", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AvailabilityWorkCenterBean> availabilities = new HashSet<AvailabilityWorkCenterBean>();

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

    @JsonProperty("WCIndentificationCode")
	public int getWCIndentificationCode() {
		return WCIndentificationCode;
	}

	public void setWCIndentificationCode(int WCIndentificationCode) {
		this.WCIndentificationCode = WCIndentificationCode;
	}

    @JsonProperty("WCShortName")
	public String getWCShortName() {
		return WCShortName;
	}

	public void setWCShortName(String WCShortName) {
		this.WCShortName = WCShortName;
	}

    @JsonProperty("WCName")
	public String getWCName() {
		return WCName;
	}

	public void setWCName(String WCName) {
		this.WCName = WCName;
	}

    @JsonProperty("WCWorkingDayLenght")
	public int getWCWorkingDayLenght() {
		return WCWorkingDayLenght;
	}

	public void setWCWorkingDayLenght(int WCWorkingDayLenght) {
		this.WCWorkingDayLenght = WCWorkingDayLenght;
	}

    @JsonProperty("WCWorkingWeekLenght")
	public int getWCWorkingWeekLenght() {
		return WCWorkingWeekLenght;
	}

	public void setWCWorkingWeekLenght(int WCWorkingWeekLenght) {
		this.WCWorkingWeekLenght = WCWorkingWeekLenght;
	}

    @JsonProperty("WCShiftsNumber")
	public int getWCShiftsNumber() {
		return WCShiftsNumber;
	}

	public void setWCShiftsNumber(int WCShiftsNumber) {
		this.WCShiftsNumber = WCShiftsNumber;
	}

    @JsonProperty("WCWorkStationsNumber")
	public int getWCWorkStationsNumber() {
		return WCWorkStationsNumber;
	}

	public void setWCWorkStationsNumber(int WCWorkStationsNumber) {
		this.WCWorkStationsNumber = WCWorkStationsNumber;
	}

    @JsonProperty("WCNumberOfEmployees")
	public int getWCNumberOfEmployees() {
		return WCNumberOfEmployees;
	}

	public void setWCNumberOfEmployees(int WCNumberOfEmployees) {
		this.WCNumberOfEmployees = WCNumberOfEmployees;
	}

    @JsonProperty("WCNumberOfSteps")
	public int getWCNumberOfSteps() {
		return WCNumberOfSteps;
	}

	public void setWCNumberOfSteps(int WCNumberOfSteps) {
		this.WCNumberOfSteps = WCNumberOfSteps;
	}

    @JsonProperty("WCResourceConstraintIndicator")
	public int getWCResourceConstraintIndicator() {
		return WCResourceConstraintIndicator;
	}

	public void setWCResourceConstraintIndicator(int WCResourceConstraintIndicator) {
		this.WCResourceConstraintIndicator = WCResourceConstraintIndicator;
	}

    @JsonProperty("WCAverageWaitingTimeInFrontOfWorkCenter")
	public int getWCAverageWaitingTimeInFrontOfWorkCenter() {
		return WCAverageWaitingTimeInFrontOfWorkCenter;
	}

	public void setWCAverageWaitingTimeInFrontOfWorkCenter(int WCAverageWaitingTimeInFrontOfWorkCenter) {
		this.WCAverageWaitingTimeInFrontOfWorkCenter = WCAverageWaitingTimeInFrontOfWorkCenter;
	}

    @JsonProperty("WCMaterialTransferAverageTime")
	public int getWCMaterialTransferAverageTime() {
		return WCMaterialTransferAverageTime;
	}

	public void setWCMaterialTransferAverageTime(int WCMaterialTransferAverageTime) {
		this.WCMaterialTransferAverageTime = WCMaterialTransferAverageTime;
	}

    @JsonProperty("WCTechnicalCapacity")
	public int getWCTechnicalCapacity() {
		return WCTechnicalCapacity;
	}

	public void setWCTechnicalCapacity(int WCTechnicalCapacity) {
		this.WCTechnicalCapacity = WCTechnicalCapacity;
	}

    @JsonProperty("WCAvailableCapacity")
	public int getWCAvailableCapacity() {
		return WCAvailableCapacity;
	}

	public void setWCAvailableCapacity(int WCAvailableCapacity) {
		this.WCAvailableCapacity = WCAvailableCapacity;
	}

    @JsonProperty("WCLoadAnalysisIndicator")
	public String getWCLoadAnalysisIndicator() {
		return WCLoadAnalysisIndicator;
	}

	public void setWCLoadAnalysisIndicator(String WCLoadAnalysisIndicator) {
		this.WCLoadAnalysisIndicator = WCLoadAnalysisIndicator;
	}

    @JsonProperty("WCStandardHourPrice")
	public int getWCStandardHourPrice() {
		return WCStandardHourPrice;
	}

	public void setWCStandardHourPrice(int WCStandardHourPrice) {
		this.WCStandardHourPrice = WCStandardHourPrice;
	}

    @JsonProperty("WCMaterialsCostsPercentage")
	public int getWCMaterialsCostsPercentage() {
		return WCMaterialsCostsPercentage;
	}

	public void setWCMaterialsCostsPercentage(int WCMaterialsCostsPercentage) {
		this.WCMaterialsCostsPercentage = WCMaterialsCostsPercentage;
	}

    @JsonProperty("WCLaborCostsPercentage")
	public int getWCLaborCostsPercentage() {
		return WCLaborCostsPercentage;
	}

	public void setWCLaborCostsPercentage(int WCLaborCostsPercentage) {
		this.WCLaborCostsPercentage = WCLaborCostsPercentage;
	}

    @JsonProperty("WCDataCompletenessStatus")
	public int getWCDataCompletenessStatus() {
		return WCDataCompletenessStatus;
	}

	public void setWCDataCompletenessStatus(int WCDataCompletenessStatus) {
		this.WCDataCompletenessStatus = WCDataCompletenessStatus;
	}

    @JsonProperty("WCActitvityStatus")
	public int getWCActitvityStatus() {
		return WCActitvityStatus;
	}

	public void setWCActitvityStatus(int WCActitvityStatus) {
		this.WCActitvityStatus = WCActitvityStatus;
	}

    @JsonProperty("WCEnteredBy")
	public String getWCEnteredBy() {
		return WCEnteredBy;
	}

	public void setWCEnteredBy(String WCEnteredBy) {
		this.WCEnteredBy = WCEnteredBy;
	}

    @JsonProperty("WCEntryDate")
	public Date getWCEntryDate() {
		return WCEntryDate;
	}

	public void setWCEntryDate(Date WCEntryDate) {
		this.WCEntryDate = WCEntryDate;
	}

    @JsonProperty("WCModifiedBy")
	public String getWCModifiedBy() {
		return WCModifiedBy;
	}

	public void setWCModifiedBy(String WCModifiedBy) {
		this.WCModifiedBy = WCModifiedBy;
	}

    @JsonProperty("WCModificationDate")
	public Date getWCModificationDate() {
		return WCModificationDate;
	}

	public void setWCModificationDate(Date WCModificationDate) {
		this.WCModificationDate = WCModificationDate;
	}

    @JsonProperty("WCApprovedBy")
	public String getWCApprovedBy() {
		return WCApprovedBy;
	}

	public void setWCApprovedBy(String WCApprovedBy) {
		this.WCApprovedBy = WCApprovedBy;
	}

    @JsonProperty("WCApprovalDate")
	public Date getWCApprovalDate() {
		return WCApprovalDate;
	}

	public void setWCApprovalDate(Date WCApprovalDate) {
		this.WCApprovalDate = WCApprovalDate;
	}

    @JsonProperty("WCAffiliationStatus")
	public String getWCAffiliationStatus() {
		return WCAffiliationStatus;
	}

	public void setWCAffiliationStatus(String WCAffiliationStatus) {
		this.WCAffiliationStatus = WCAffiliationStatus;
	}


    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("location")
	public LocationBean getLocation() {
		return location;
	}

    public void setLocation(LocationBean location) {
		this.location = location;
	}

    @JsonProperty("alternativeWorkCenters1")
	public Set<AlternativeWorkCenterBean> getAlternativeWorkCenters1() {
		return alternativeWorkCenters1;
	}

	public void setAlternativeWorkCenters1(Set<AlternativeWorkCenterBean> alternativeWorkCenters1) {
		this.alternativeWorkCenters1 = alternativeWorkCenters1;
	}

    @JsonProperty("productionProcessSteps")
	public Set<ProductionProcessStepsBean> getProductionProcessSteps() {
		return productionProcessSteps;
	}

	public void setProductionProcessSteps(Set<ProductionProcessStepsBean> productionProcessSteps) {
		this.productionProcessSteps = productionProcessSteps;
	}

    @JsonProperty("workCenterSteps")
	public Set<WorkCenterStepsBean> getWorkCenterSteps() {
		return workCenterSteps;
	}

	public void setWorkCenterSteps(Set<WorkCenterStepsBean> workCenterSteps) {
		this.workCenterSteps = workCenterSteps;
	}

    @JsonProperty("balanceResources")
	public Set<BalanceResourceBean> getBalanceResources() {
		return balanceResources;
	}

	public void setBalanceResources(Set<BalanceResourceBean> balanceResources) {
		this.balanceResources = balanceResources;
	}

    @JsonProperty("technologicalUnits")
	public Set<TechnologicalUnitBean> getTechnologicalUnits() {
		return technologicalUnits;
	}

	public void setTechnologicalUnits(Set<TechnologicalUnitBean> technologicalUnits) {
		this.technologicalUnits = technologicalUnits;
	}

    @JsonProperty("alternativeWorkCenters")
	public Set<AlternativeWorkCenterBean> getAlternativeWorkCenters() {
		return alternativeWorkCenters;
	}

	public void setAlternativeWorkCenters(Set<AlternativeWorkCenterBean> alternativeWorkCenters) {
		this.alternativeWorkCenters = alternativeWorkCenters;
	}

    @JsonProperty("availabilities")
	public Set<AvailabilityWorkCenterBean> getAvailabilities() {
		return availabilities;
	}

	public void setAvailabilities(Set<AvailabilityWorkCenterBean> availabilities) {
		this.availabilities = availabilities;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof WorkCenterBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((WorkCenterBean) o).getId()));
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
		return "WorkCenterBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", WCIndentificationCode=" + WCIndentificationCode
			+ ", WCShortName=" + WCShortName
			+ ", WCName=" + WCName
			+ ", WCWorkingDayLenght=" + WCWorkingDayLenght
			+ ", WCWorkingWeekLenght=" + WCWorkingWeekLenght
			+ ", WCShiftsNumber=" + WCShiftsNumber
			+ ", WCWorkStationsNumber=" + WCWorkStationsNumber
			+ ", WCNumberOfEmployees=" + WCNumberOfEmployees
			+ ", WCNumberOfSteps=" + WCNumberOfSteps
			+ ", WCResourceConstraintIndicator=" + WCResourceConstraintIndicator
			+ ", WCAverageWaitingTimeInFrontOfWorkCenter=" + WCAverageWaitingTimeInFrontOfWorkCenter
			+ ", WCMaterialTransferAverageTime=" + WCMaterialTransferAverageTime
			+ ", WCTechnicalCapacity=" + WCTechnicalCapacity
			+ ", WCAvailableCapacity=" + WCAvailableCapacity
			+ ", WCLoadAnalysisIndicator=" + WCLoadAnalysisIndicator
			+ ", WCStandardHourPrice=" + WCStandardHourPrice
			+ ", WCMaterialsCostsPercentage=" + WCMaterialsCostsPercentage
			+ ", WCLaborCostsPercentage=" + WCLaborCostsPercentage
			+ ", WCDataCompletenessStatus=" + WCDataCompletenessStatus
			+ ", WCActitvityStatus=" + WCActitvityStatus
			+ ", WCEnteredBy=" + WCEnteredBy
			+ ", WCEntryDate=" + WCEntryDate
			+ ", WCModifiedBy=" + WCModifiedBy
			+ ", WCModificationDate=" + WCModificationDate
			+ ", WCApprovedBy=" + WCApprovedBy
			+ ", WCApprovalDate=" + WCApprovalDate
			+ ", WCAffiliationStatus=" + WCAffiliationStatus
			// + ", currency=" + currency
			// + ", organizationUnit=" + organizationUnit
			// + ", location=" + location
			// + ", alternativeWorkCenters1=" + alternativeWorkCenters1
			// + ", productionProcessSteps=" + productionProcessSteps
			// + ", workCenterSteps=" + workCenterSteps
			// + ", balanceResources=" + balanceResources
			// + ", technologicalUnits=" + technologicalUnits
			// + ", alternativeWorkCenters=" + alternativeWorkCenters
			// + ", availabilities=" + availabilities
			+ "]";
	}
}