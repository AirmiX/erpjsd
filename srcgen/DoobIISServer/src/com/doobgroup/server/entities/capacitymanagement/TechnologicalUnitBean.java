package com.doobgroup.server.entities.capacitymanagement;

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

import com.doobgroup.server.entities.humanresources.OccupationBean;
import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.humanresources.SchoolDegreeBean;
import com.doobgroup.server.entities.capacitymanagement.AssetBean;
import com.doobgroup.server.entities.productiondata.WorkCenterBean;
import com.doobgroup.server.entities.capacitymanagement.AvailabilityTechnologicalUnitsBean;
import com.doobgroup.server.entities.capacitymanagement.TechnicalCharacteristicProductionEquipmentBean;
import com.doobgroup.server.entities.capacitymanagement.WorkOnBean;

@Entity
@Table(name = "TECHNOLOGICALUNIT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TUNumber"  ,  "workCenter"  	}))
@SQLDelete(sql="UPDATE TECHNOLOGICALUNIT SET deleted = 1 WHERE TechnologicalUnit_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TechnologicalUnitBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TechnologicalUnit_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TUNumber", nullable = false)
	protected int TUNumber;
	@Column(name = "TUShortName", nullable = false)
	protected String TUShortName;
	@Column(name = "TUName", nullable = false)
	protected String TUName;
	@Column(name = "TUType", nullable = false)
	protected String TUType;
	@Column(name = "TUTechnicalCapacity", nullable = false)
	protected int TUTechnicalCapacity;
	@Column(name = "TUAvailableCapacity", nullable = false)
	protected int TUAvailableCapacity;
	@Column(name = "TUWorkingDayLength", nullable = false)
	protected int TUWorkingDayLength;
	@Column(name = "TUWorkingWeekLength", nullable = false)
	protected int TUWorkingWeekLength;
	@Column(name = "TUShiftsNumber", nullable = false)
	protected int TUShiftsNumber;
	@Column(name = "TUNumberOfEmployee", nullable = false)
	protected int TUNumberOfEmployee;
	@Column(name = "TUStandardHourPrice")
	protected int TUStandardHourPrice;
	@Column(name = "TUMaterialsCostsPercentage")
	protected int TUMaterialsCostsPercentage;
	@Column(name = "TULaborCostsPercentage")
	protected int TULaborCostsPercentage;
	@Column(name = "TUActivityStatus", nullable = false)
	protected int TUActivityStatus;
	@Column(name = "TUCompletenessStatus", nullable = false)
	protected int TUCompletenessStatus;
	@Column(name = "TUEnteredBy")
	protected String TUEnteredBy;
	@Column(name = "TUEntryDate")
	protected Date TUEntryDate;
	@Column(name = "TUModifiedBy")
	protected int TUModifiedBy;
	@Column(name = "TUModificationDate")
	protected Date TUModificationDate;
	@Column(name = "TUApprovedBy")
	protected String TUApprovedBy;
	@Column(name = "TUApprovalDate")
	protected Date TUApprovalDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="profession")
    protected OccupationBean profession;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="schoolDegree")
    protected SchoolDegreeBean schoolDegree;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="asset")
    protected AssetBean asset;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workCenter")
    protected WorkCenterBean workCenter;
    @OneToMany(mappedBy = "technologicalUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AvailabilityTechnologicalUnitsBean> availabilities = new HashSet<AvailabilityTechnologicalUnitsBean>();
    @OneToMany(mappedBy = "technologicalUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TechnicalCharacteristicProductionEquipmentBean> technologicalCharacterics = new HashSet<TechnicalCharacteristicProductionEquipmentBean>();
    @OneToMany(mappedBy = "technologicalUnit", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<WorkOnBean> works = new HashSet<WorkOnBean>();

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

    @JsonProperty("TUNumber")
	public int getTUNumber() {
		return TUNumber;
	}

	public void setTUNumber(int TUNumber) {
		this.TUNumber = TUNumber;
	}

    @JsonProperty("TUShortName")
	public String getTUShortName() {
		return TUShortName;
	}

	public void setTUShortName(String TUShortName) {
		this.TUShortName = TUShortName;
	}

    @JsonProperty("TUName")
	public String getTUName() {
		return TUName;
	}

	public void setTUName(String TUName) {
		this.TUName = TUName;
	}

    @JsonProperty("TUType")
	public String getTUType() {
		return TUType;
	}

	public void setTUType(String TUType) {
		this.TUType = TUType;
	}

    @JsonProperty("TUTechnicalCapacity")
	public int getTUTechnicalCapacity() {
		return TUTechnicalCapacity;
	}

	public void setTUTechnicalCapacity(int TUTechnicalCapacity) {
		this.TUTechnicalCapacity = TUTechnicalCapacity;
	}

    @JsonProperty("TUAvailableCapacity")
	public int getTUAvailableCapacity() {
		return TUAvailableCapacity;
	}

	public void setTUAvailableCapacity(int TUAvailableCapacity) {
		this.TUAvailableCapacity = TUAvailableCapacity;
	}

    @JsonProperty("TUWorkingDayLength")
	public int getTUWorkingDayLength() {
		return TUWorkingDayLength;
	}

	public void setTUWorkingDayLength(int TUWorkingDayLength) {
		this.TUWorkingDayLength = TUWorkingDayLength;
	}

    @JsonProperty("TUWorkingWeekLength")
	public int getTUWorkingWeekLength() {
		return TUWorkingWeekLength;
	}

	public void setTUWorkingWeekLength(int TUWorkingWeekLength) {
		this.TUWorkingWeekLength = TUWorkingWeekLength;
	}

    @JsonProperty("TUShiftsNumber")
	public int getTUShiftsNumber() {
		return TUShiftsNumber;
	}

	public void setTUShiftsNumber(int TUShiftsNumber) {
		this.TUShiftsNumber = TUShiftsNumber;
	}

    @JsonProperty("TUNumberOfEmployee")
	public int getTUNumberOfEmployee() {
		return TUNumberOfEmployee;
	}

	public void setTUNumberOfEmployee(int TUNumberOfEmployee) {
		this.TUNumberOfEmployee = TUNumberOfEmployee;
	}

    @JsonProperty("TUStandardHourPrice")
	public int getTUStandardHourPrice() {
		return TUStandardHourPrice;
	}

	public void setTUStandardHourPrice(int TUStandardHourPrice) {
		this.TUStandardHourPrice = TUStandardHourPrice;
	}

    @JsonProperty("TUMaterialsCostsPercentage")
	public int getTUMaterialsCostsPercentage() {
		return TUMaterialsCostsPercentage;
	}

	public void setTUMaterialsCostsPercentage(int TUMaterialsCostsPercentage) {
		this.TUMaterialsCostsPercentage = TUMaterialsCostsPercentage;
	}

    @JsonProperty("TULaborCostsPercentage")
	public int getTULaborCostsPercentage() {
		return TULaborCostsPercentage;
	}

	public void setTULaborCostsPercentage(int TULaborCostsPercentage) {
		this.TULaborCostsPercentage = TULaborCostsPercentage;
	}

    @JsonProperty("TUActivityStatus")
	public int getTUActivityStatus() {
		return TUActivityStatus;
	}

	public void setTUActivityStatus(int TUActivityStatus) {
		this.TUActivityStatus = TUActivityStatus;
	}

    @JsonProperty("TUCompletenessStatus")
	public int getTUCompletenessStatus() {
		return TUCompletenessStatus;
	}

	public void setTUCompletenessStatus(int TUCompletenessStatus) {
		this.TUCompletenessStatus = TUCompletenessStatus;
	}

    @JsonProperty("TUEnteredBy")
	public String getTUEnteredBy() {
		return TUEnteredBy;
	}

	public void setTUEnteredBy(String TUEnteredBy) {
		this.TUEnteredBy = TUEnteredBy;
	}

    @JsonProperty("TUEntryDate")
	public Date getTUEntryDate() {
		return TUEntryDate;
	}

	public void setTUEntryDate(Date TUEntryDate) {
		this.TUEntryDate = TUEntryDate;
	}

    @JsonProperty("TUModifiedBy")
	public int getTUModifiedBy() {
		return TUModifiedBy;
	}

	public void setTUModifiedBy(int TUModifiedBy) {
		this.TUModifiedBy = TUModifiedBy;
	}

    @JsonProperty("TUModificationDate")
	public Date getTUModificationDate() {
		return TUModificationDate;
	}

	public void setTUModificationDate(Date TUModificationDate) {
		this.TUModificationDate = TUModificationDate;
	}

    @JsonProperty("TUApprovedBy")
	public String getTUApprovedBy() {
		return TUApprovedBy;
	}

	public void setTUApprovedBy(String TUApprovedBy) {
		this.TUApprovedBy = TUApprovedBy;
	}

    @JsonProperty("TUApprovalDate")
	public Date getTUApprovalDate() {
		return TUApprovalDate;
	}

	public void setTUApprovalDate(Date TUApprovalDate) {
		this.TUApprovalDate = TUApprovalDate;
	}


    @JsonProperty("profession")
	public OccupationBean getProfession() {
		return profession;
	}

    public void setProfession(OccupationBean profession) {
		this.profession = profession;
	}

    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("schoolDegree")
	public SchoolDegreeBean getSchoolDegree() {
		return schoolDegree;
	}

    public void setSchoolDegree(SchoolDegreeBean schoolDegree) {
		this.schoolDegree = schoolDegree;
	}

    @JsonProperty("asset")
	public AssetBean getAsset() {
		return asset;
	}

    public void setAsset(AssetBean asset) {
		this.asset = asset;
	}

    @JsonProperty("workCenter")
	public WorkCenterBean getWorkCenter() {
		return workCenter;
	}

    public void setWorkCenter(WorkCenterBean workCenter) {
		this.workCenter = workCenter;
	}

    @JsonProperty("availabilities")
	public Set<AvailabilityTechnologicalUnitsBean> getAvailabilities() {
		return availabilities;
	}

	public void setAvailabilities(Set<AvailabilityTechnologicalUnitsBean> availabilities) {
		this.availabilities = availabilities;
	}

    @JsonProperty("technologicalCharacterics")
	public Set<TechnicalCharacteristicProductionEquipmentBean> getTechnologicalCharacterics() {
		return technologicalCharacterics;
	}

	public void setTechnologicalCharacterics(Set<TechnicalCharacteristicProductionEquipmentBean> technologicalCharacterics) {
		this.technologicalCharacterics = technologicalCharacterics;
	}

    @JsonProperty("works")
	public Set<WorkOnBean> getWorks() {
		return works;
	}

	public void setWorks(Set<WorkOnBean> works) {
		this.works = works;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TechnologicalUnitBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TechnologicalUnitBean) o).getId()));
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
		return "TechnologicalUnitBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TUNumber=" + TUNumber
			+ ", TUShortName=" + TUShortName
			+ ", TUName=" + TUName
			+ ", TUType=" + TUType
			+ ", TUTechnicalCapacity=" + TUTechnicalCapacity
			+ ", TUAvailableCapacity=" + TUAvailableCapacity
			+ ", TUWorkingDayLength=" + TUWorkingDayLength
			+ ", TUWorkingWeekLength=" + TUWorkingWeekLength
			+ ", TUShiftsNumber=" + TUShiftsNumber
			+ ", TUNumberOfEmployee=" + TUNumberOfEmployee
			+ ", TUStandardHourPrice=" + TUStandardHourPrice
			+ ", TUMaterialsCostsPercentage=" + TUMaterialsCostsPercentage
			+ ", TULaborCostsPercentage=" + TULaborCostsPercentage
			+ ", TUActivityStatus=" + TUActivityStatus
			+ ", TUCompletenessStatus=" + TUCompletenessStatus
			+ ", TUEnteredBy=" + TUEnteredBy
			+ ", TUEntryDate=" + TUEntryDate
			+ ", TUModifiedBy=" + TUModifiedBy
			+ ", TUModificationDate=" + TUModificationDate
			+ ", TUApprovedBy=" + TUApprovedBy
			+ ", TUApprovalDate=" + TUApprovalDate
			// + ", profession=" + profession
			// + ", currency=" + currency
			// + ", schoolDegree=" + schoolDegree
			// + ", asset=" + asset
			// + ", workCenter=" + workCenter
			// + ", availabilities=" + availabilities
			// + ", technologicalCharacterics=" + technologicalCharacterics
			// + ", works=" + works
			+ "]";
	}
}