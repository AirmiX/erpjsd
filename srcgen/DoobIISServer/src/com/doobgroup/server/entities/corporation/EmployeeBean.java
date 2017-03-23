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

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.humanresources.SchoolDegreeBean;
import com.doobgroup.server.entities.environment.MVCountryBean;
import com.doobgroup.server.entities.humanresources.NationalityBean;
import com.doobgroup.server.entities.initialization.GenderBean;
import com.doobgroup.server.entities.environment.AddressBean;
import com.doobgroup.server.entities.humanresources.WorkstationBean;
import com.doobgroup.server.entities.humanresources.AuthorityBean;
import com.doobgroup.server.entities.humanresources.FinalDegreeBean;
import com.doobgroup.server.entities.humanresources.AcademicTitleBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.corporation.BankAccountBean;
import com.doobgroup.server.entities.capacitymanagement.AvailabilityTechnologicalUnitsBean;
import com.doobgroup.server.entities.humanresources.SpecializationBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.user.AppUserBean;
import com.doobgroup.server.entities.humanresources.FamilyMemberBean;
import com.doobgroup.server.entities.capacitymanagement.WorkOnBean;

@Entity
@Table(name = "EMPLOYEE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "EPersonellNumber"  	}))
@SQLDelete(sql="UPDATE EMPLOYEE SET deleted = 1 WHERE Employee_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class EmployeeBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Employee_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "EPersonellNumber", nullable = false)
	protected String EPersonellNumber;
	@Column(name = "EName", nullable = false)
	protected String EName;
	@Column(name = "ELastName", nullable = false)
	protected String ELastName;
	@Column(name = "EJobTitle")
	protected String EJobTitle;
	@Column(name = "EEmail")
	protected String EEmail;
	@Column(name = "EBirthName")
	protected String EBirthName;
	@Column(name = "EDateOfBirth", nullable = false)
	protected Date EDateOfBirth;
	@Column(name = "ENationality")
	protected String ENationality;
	@Column(name = "EUsername")
	protected String EUsername;
	@Column(name = "EStreet")
	protected String EStreet;
	@Column(name = "ETelephone")
	protected String ETelephone;
	@Column(name = "EAccountNumber")
	protected String EAccountNumber;
	@Column(name = "EEmploymentType")
	protected String EEmploymentType;
	@Column(name = "EEmploymentWay")
	protected String EEmploymentWay;
	@Column(name = "EWorkExpirienceYY")
	protected int EWorkExpirienceYY;
	@Column(name = "EWorkExpirienceMM")
	protected int EWorkExpirienceMM;
	@Column(name = "EWorkExpirienceDD")
	protected int EWorkExpirienceDD;
	@Column(name = "EWorkExpirienceFRAYY")
	protected int EWorkExpirienceFRAYY;
	@Column(name = "EWorkExpirienceFRAMM")
	protected int EWorkExpirienceFRAMM;
	@Column(name = "EWorkExpirienceFRADD")
	protected int EWorkExpirienceFRADD;
	@Column(name = "EEmploymentEntryDate")
	protected Date EEmploymentEntryDate;
	@Column(name = "EEmploymentDateOfLeaving")
	protected Date EEmploymentDateOfLeaving;
	@Column(name = "EEmploymentEndReason")
	protected String EEmploymentEndReason;
	@Column(name = "EEmploymentLimitation")
	protected Date EEmploymentLimitation;
	@Column(name = "EMaritialStatus")
	protected String EMaritialStatus;
	@Column(name = "ESingleParent")
	protected Boolean ESingleParent;
	@Column(name = "EBloodType")
	protected String EBloodType;
	@Column(name = "EBloodDonor")
	protected Boolean EBloodDonor;
	@Column(name = "EShiftWork")
	protected String EShiftWork;
	@Column(name = "EWorkingTime")
	protected String EWorkingTime;
	@Column(name = "EWorkingAbility")
	protected String EWorkingAbility;
	@Column(name = "EWorkingAbilityChangeDate")
	protected Date EWorkingAbilityChangeDate;
	@Column(name = "EWeaklyWorkingHours")
	protected int EWeaklyWorkingHours;
	@Column(name = "EHolidayEntitlement")
	protected int EHolidayEntitlement;
	@Column(name = "EAnnualWageGross")
	protected int EAnnualWageGross;
	@Column(name = "ENumberOfWages")
	protected int ENumberOfWages;
	@Column(name = "EMonthlyWageGross")
	protected int EMonthlyWageGross;
	@Column(name = "ETaxIdentificationNumber")
	protected int ETaxIdentificationNumber;
	@Column(name = "ETaxOfficeNumber")
	protected int ETaxOfficeNumber;
	@Column(name = "ETaxClass")
	protected int ETaxClass;
	@Column(name = "EChildAllowance")
	protected int EChildAllowance;
	@Column(name = "EConffesion")
	protected String EConffesion;
	@Column(name = "EHealthInsurance")
	protected String EHealthInsurance;
	@Column(name = "ESocialInsuranceNumber")
	protected int ESocialInsuranceNumber;
	@Column(name = "EInsuranceGroupKeyHealthInsurance")
	protected int EInsuranceGroupKeyHealthInsurance;
	@Column(name = "EInsuranceGroupKeyPensionInsurance")
	protected int EInsuranceGroupKeyPensionInsurance;
	@Column(name = "EInsuranceGroupKeyUnemploymentInsurance")
	protected int EInsuranceGroupKeyUnemploymentInsurance;
	@Column(name = "EInsuranceGroupKeyNursingCareInsurance")
	protected int EInsuranceGroupKeyNursingCareInsurance;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnits")
    protected OrganizationUnitBean organizationUnits;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="schoolDegree")
    protected SchoolDegreeBean schoolDegree;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="countryOfBirth")
    protected MVCountryBean countryOfBirth;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="nationality")
    protected NationalityBean nationality;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="gender")
    protected GenderBean gender;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="address")
    protected AddressBean address;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workstation")
    protected WorkstationBean workstation;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="authority")
    protected AuthorityBean authority;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="finalDegree")
    protected FinalDegreeBean finalDegree;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="academicTitle")
    protected AcademicTitleBean academicTitle;
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BankAccountBean> bankAccounts = new HashSet<BankAccountBean>();
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AvailabilityTechnologicalUnitsBean> technologicalUnits = new HashSet<AvailabilityTechnologicalUnitsBean>();
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<SpecializationBean> specializations = new HashSet<SpecializationBean>();
    @OneToMany(mappedBy = "assistantOfAccountable", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomBean> assitantOfAccountables = new HashSet<StockroomBean>();
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AppUserBean> users = new HashSet<AppUserBean>();
    @OneToMany(mappedBy = "assistantOfAccountable", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StockroomBean> accountables = new HashSet<StockroomBean>();
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<FamilyMemberBean> familyMembers = new HashSet<FamilyMemberBean>();
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
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

    @JsonProperty("EPersonellNumber")
	public String getEPersonellNumber() {
		return EPersonellNumber;
	}

	public void setEPersonellNumber(String EPersonellNumber) {
		this.EPersonellNumber = EPersonellNumber;
	}

    @JsonProperty("EName")
	public String getEName() {
		return EName;
	}

	public void setEName(String EName) {
		this.EName = EName;
	}

    @JsonProperty("ELastName")
	public String getELastName() {
		return ELastName;
	}

	public void setELastName(String ELastName) {
		this.ELastName = ELastName;
	}

    @JsonProperty("EJobTitle")
	public String getEJobTitle() {
		return EJobTitle;
	}

	public void setEJobTitle(String EJobTitle) {
		this.EJobTitle = EJobTitle;
	}

    @JsonProperty("EEmail")
	public String getEEmail() {
		return EEmail;
	}

	public void setEEmail(String EEmail) {
		this.EEmail = EEmail;
	}

    @JsonProperty("EBirthName")
	public String getEBirthName() {
		return EBirthName;
	}

	public void setEBirthName(String EBirthName) {
		this.EBirthName = EBirthName;
	}

    @JsonProperty("EDateOfBirth")
	public Date getEDateOfBirth() {
		return EDateOfBirth;
	}

	public void setEDateOfBirth(Date EDateOfBirth) {
		this.EDateOfBirth = EDateOfBirth;
	}

    @JsonProperty("ENationality")
	public String getENationality() {
		return ENationality;
	}

	public void setENationality(String ENationality) {
		this.ENationality = ENationality;
	}

    @JsonProperty("EUsername")
	public String getEUsername() {
		return EUsername;
	}

	public void setEUsername(String EUsername) {
		this.EUsername = EUsername;
	}

    @JsonProperty("EStreet")
	public String getEStreet() {
		return EStreet;
	}

	public void setEStreet(String EStreet) {
		this.EStreet = EStreet;
	}

    @JsonProperty("ETelephone")
	public String getETelephone() {
		return ETelephone;
	}

	public void setETelephone(String ETelephone) {
		this.ETelephone = ETelephone;
	}

    @JsonProperty("EAccountNumber")
	public String getEAccountNumber() {
		return EAccountNumber;
	}

	public void setEAccountNumber(String EAccountNumber) {
		this.EAccountNumber = EAccountNumber;
	}

    @JsonProperty("EEmploymentType")
	public String getEEmploymentType() {
		return EEmploymentType;
	}

	public void setEEmploymentType(String EEmploymentType) {
		this.EEmploymentType = EEmploymentType;
	}

    @JsonProperty("EEmploymentWay")
	public String getEEmploymentWay() {
		return EEmploymentWay;
	}

	public void setEEmploymentWay(String EEmploymentWay) {
		this.EEmploymentWay = EEmploymentWay;
	}

    @JsonProperty("EWorkExpirienceYY")
	public int getEWorkExpirienceYY() {
		return EWorkExpirienceYY;
	}

	public void setEWorkExpirienceYY(int EWorkExpirienceYY) {
		this.EWorkExpirienceYY = EWorkExpirienceYY;
	}

    @JsonProperty("EWorkExpirienceMM")
	public int getEWorkExpirienceMM() {
		return EWorkExpirienceMM;
	}

	public void setEWorkExpirienceMM(int EWorkExpirienceMM) {
		this.EWorkExpirienceMM = EWorkExpirienceMM;
	}

    @JsonProperty("EWorkExpirienceDD")
	public int getEWorkExpirienceDD() {
		return EWorkExpirienceDD;
	}

	public void setEWorkExpirienceDD(int EWorkExpirienceDD) {
		this.EWorkExpirienceDD = EWorkExpirienceDD;
	}

    @JsonProperty("EWorkExpirienceFRAYY")
	public int getEWorkExpirienceFRAYY() {
		return EWorkExpirienceFRAYY;
	}

	public void setEWorkExpirienceFRAYY(int EWorkExpirienceFRAYY) {
		this.EWorkExpirienceFRAYY = EWorkExpirienceFRAYY;
	}

    @JsonProperty("EWorkExpirienceFRAMM")
	public int getEWorkExpirienceFRAMM() {
		return EWorkExpirienceFRAMM;
	}

	public void setEWorkExpirienceFRAMM(int EWorkExpirienceFRAMM) {
		this.EWorkExpirienceFRAMM = EWorkExpirienceFRAMM;
	}

    @JsonProperty("EWorkExpirienceFRADD")
	public int getEWorkExpirienceFRADD() {
		return EWorkExpirienceFRADD;
	}

	public void setEWorkExpirienceFRADD(int EWorkExpirienceFRADD) {
		this.EWorkExpirienceFRADD = EWorkExpirienceFRADD;
	}

    @JsonProperty("EEmploymentEntryDate")
	public Date getEEmploymentEntryDate() {
		return EEmploymentEntryDate;
	}

	public void setEEmploymentEntryDate(Date EEmploymentEntryDate) {
		this.EEmploymentEntryDate = EEmploymentEntryDate;
	}

    @JsonProperty("EEmploymentDateOfLeaving")
	public Date getEEmploymentDateOfLeaving() {
		return EEmploymentDateOfLeaving;
	}

	public void setEEmploymentDateOfLeaving(Date EEmploymentDateOfLeaving) {
		this.EEmploymentDateOfLeaving = EEmploymentDateOfLeaving;
	}

    @JsonProperty("EEmploymentEndReason")
	public String getEEmploymentEndReason() {
		return EEmploymentEndReason;
	}

	public void setEEmploymentEndReason(String EEmploymentEndReason) {
		this.EEmploymentEndReason = EEmploymentEndReason;
	}

    @JsonProperty("EEmploymentLimitation")
	public Date getEEmploymentLimitation() {
		return EEmploymentLimitation;
	}

	public void setEEmploymentLimitation(Date EEmploymentLimitation) {
		this.EEmploymentLimitation = EEmploymentLimitation;
	}

    @JsonProperty("EMaritialStatus")
	public String getEMaritialStatus() {
		return EMaritialStatus;
	}

	public void setEMaritialStatus(String EMaritialStatus) {
		this.EMaritialStatus = EMaritialStatus;
	}

    @JsonProperty("ESingleParent")
	public Boolean getESingleParent() {
		return ESingleParent;
	}

	public void setESingleParent(Boolean ESingleParent) {
		this.ESingleParent = ESingleParent;
	}

    @JsonProperty("EBloodType")
	public String getEBloodType() {
		return EBloodType;
	}

	public void setEBloodType(String EBloodType) {
		this.EBloodType = EBloodType;
	}

    @JsonProperty("EBloodDonor")
	public Boolean getEBloodDonor() {
		return EBloodDonor;
	}

	public void setEBloodDonor(Boolean EBloodDonor) {
		this.EBloodDonor = EBloodDonor;
	}

    @JsonProperty("EShiftWork")
	public String getEShiftWork() {
		return EShiftWork;
	}

	public void setEShiftWork(String EShiftWork) {
		this.EShiftWork = EShiftWork;
	}

    @JsonProperty("EWorkingTime")
	public String getEWorkingTime() {
		return EWorkingTime;
	}

	public void setEWorkingTime(String EWorkingTime) {
		this.EWorkingTime = EWorkingTime;
	}

    @JsonProperty("EWorkingAbility")
	public String getEWorkingAbility() {
		return EWorkingAbility;
	}

	public void setEWorkingAbility(String EWorkingAbility) {
		this.EWorkingAbility = EWorkingAbility;
	}

    @JsonProperty("EWorkingAbilityChangeDate")
	public Date getEWorkingAbilityChangeDate() {
		return EWorkingAbilityChangeDate;
	}

	public void setEWorkingAbilityChangeDate(Date EWorkingAbilityChangeDate) {
		this.EWorkingAbilityChangeDate = EWorkingAbilityChangeDate;
	}

    @JsonProperty("EWeaklyWorkingHours")
	public int getEWeaklyWorkingHours() {
		return EWeaklyWorkingHours;
	}

	public void setEWeaklyWorkingHours(int EWeaklyWorkingHours) {
		this.EWeaklyWorkingHours = EWeaklyWorkingHours;
	}

    @JsonProperty("EHolidayEntitlement")
	public int getEHolidayEntitlement() {
		return EHolidayEntitlement;
	}

	public void setEHolidayEntitlement(int EHolidayEntitlement) {
		this.EHolidayEntitlement = EHolidayEntitlement;
	}

    @JsonProperty("EAnnualWageGross")
	public int getEAnnualWageGross() {
		return EAnnualWageGross;
	}

	public void setEAnnualWageGross(int EAnnualWageGross) {
		this.EAnnualWageGross = EAnnualWageGross;
	}

    @JsonProperty("ENumberOfWages")
	public int getENumberOfWages() {
		return ENumberOfWages;
	}

	public void setENumberOfWages(int ENumberOfWages) {
		this.ENumberOfWages = ENumberOfWages;
	}

    @JsonProperty("EMonthlyWageGross")
	public int getEMonthlyWageGross() {
		return EMonthlyWageGross;
	}

	public void setEMonthlyWageGross(int EMonthlyWageGross) {
		this.EMonthlyWageGross = EMonthlyWageGross;
	}

    @JsonProperty("ETaxIdentificationNumber")
	public int getETaxIdentificationNumber() {
		return ETaxIdentificationNumber;
	}

	public void setETaxIdentificationNumber(int ETaxIdentificationNumber) {
		this.ETaxIdentificationNumber = ETaxIdentificationNumber;
	}

    @JsonProperty("ETaxOfficeNumber")
	public int getETaxOfficeNumber() {
		return ETaxOfficeNumber;
	}

	public void setETaxOfficeNumber(int ETaxOfficeNumber) {
		this.ETaxOfficeNumber = ETaxOfficeNumber;
	}

    @JsonProperty("ETaxClass")
	public int getETaxClass() {
		return ETaxClass;
	}

	public void setETaxClass(int ETaxClass) {
		this.ETaxClass = ETaxClass;
	}

    @JsonProperty("EChildAllowance")
	public int getEChildAllowance() {
		return EChildAllowance;
	}

	public void setEChildAllowance(int EChildAllowance) {
		this.EChildAllowance = EChildAllowance;
	}

    @JsonProperty("EConffesion")
	public String getEConffesion() {
		return EConffesion;
	}

	public void setEConffesion(String EConffesion) {
		this.EConffesion = EConffesion;
	}

    @JsonProperty("EHealthInsurance")
	public String getEHealthInsurance() {
		return EHealthInsurance;
	}

	public void setEHealthInsurance(String EHealthInsurance) {
		this.EHealthInsurance = EHealthInsurance;
	}

    @JsonProperty("ESocialInsuranceNumber")
	public int getESocialInsuranceNumber() {
		return ESocialInsuranceNumber;
	}

	public void setESocialInsuranceNumber(int ESocialInsuranceNumber) {
		this.ESocialInsuranceNumber = ESocialInsuranceNumber;
	}

    @JsonProperty("EInsuranceGroupKeyHealthInsurance")
	public int getEInsuranceGroupKeyHealthInsurance() {
		return EInsuranceGroupKeyHealthInsurance;
	}

	public void setEInsuranceGroupKeyHealthInsurance(int EInsuranceGroupKeyHealthInsurance) {
		this.EInsuranceGroupKeyHealthInsurance = EInsuranceGroupKeyHealthInsurance;
	}

    @JsonProperty("EInsuranceGroupKeyPensionInsurance")
	public int getEInsuranceGroupKeyPensionInsurance() {
		return EInsuranceGroupKeyPensionInsurance;
	}

	public void setEInsuranceGroupKeyPensionInsurance(int EInsuranceGroupKeyPensionInsurance) {
		this.EInsuranceGroupKeyPensionInsurance = EInsuranceGroupKeyPensionInsurance;
	}

    @JsonProperty("EInsuranceGroupKeyUnemploymentInsurance")
	public int getEInsuranceGroupKeyUnemploymentInsurance() {
		return EInsuranceGroupKeyUnemploymentInsurance;
	}

	public void setEInsuranceGroupKeyUnemploymentInsurance(int EInsuranceGroupKeyUnemploymentInsurance) {
		this.EInsuranceGroupKeyUnemploymentInsurance = EInsuranceGroupKeyUnemploymentInsurance;
	}

    @JsonProperty("EInsuranceGroupKeyNursingCareInsurance")
	public int getEInsuranceGroupKeyNursingCareInsurance() {
		return EInsuranceGroupKeyNursingCareInsurance;
	}

	public void setEInsuranceGroupKeyNursingCareInsurance(int EInsuranceGroupKeyNursingCareInsurance) {
		this.EInsuranceGroupKeyNursingCareInsurance = EInsuranceGroupKeyNursingCareInsurance;
	}


    @JsonProperty("organizationUnits")
	public OrganizationUnitBean getOrganizationUnits() {
		return organizationUnits;
	}

    public void setOrganizationUnits(OrganizationUnitBean organizationUnits) {
		this.organizationUnits = organizationUnits;
	}

    @JsonProperty("schoolDegree")
	public SchoolDegreeBean getSchoolDegree() {
		return schoolDegree;
	}

    public void setSchoolDegree(SchoolDegreeBean schoolDegree) {
		this.schoolDegree = schoolDegree;
	}

    @JsonProperty("countryOfBirth")
	public MVCountryBean getCountryOfBirth() {
		return countryOfBirth;
	}

    public void setCountryOfBirth(MVCountryBean countryOfBirth) {
		this.countryOfBirth = countryOfBirth;
	}

    @JsonProperty("nationality")
	public NationalityBean getNationality() {
		return nationality;
	}

    public void setNationality(NationalityBean nationality) {
		this.nationality = nationality;
	}

    @JsonProperty("gender")
	public GenderBean getGender() {
		return gender;
	}

    public void setGender(GenderBean gender) {
		this.gender = gender;
	}

    @JsonProperty("address")
	public AddressBean getAddress() {
		return address;
	}

    public void setAddress(AddressBean address) {
		this.address = address;
	}

    @JsonProperty("workstation")
	public WorkstationBean getWorkstation() {
		return workstation;
	}

    public void setWorkstation(WorkstationBean workstation) {
		this.workstation = workstation;
	}

    @JsonProperty("authority")
	public AuthorityBean getAuthority() {
		return authority;
	}

    public void setAuthority(AuthorityBean authority) {
		this.authority = authority;
	}

    @JsonProperty("finalDegree")
	public FinalDegreeBean getFinalDegree() {
		return finalDegree;
	}

    public void setFinalDegree(FinalDegreeBean finalDegree) {
		this.finalDegree = finalDegree;
	}

    @JsonProperty("academicTitle")
	public AcademicTitleBean getAcademicTitle() {
		return academicTitle;
	}

    public void setAcademicTitle(AcademicTitleBean academicTitle) {
		this.academicTitle = academicTitle;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("bankAccounts")
	public Set<BankAccountBean> getBankAccounts() {
		return bankAccounts;
	}

	public void setBankAccounts(Set<BankAccountBean> bankAccounts) {
		this.bankAccounts = bankAccounts;
	}

    @JsonProperty("technologicalUnits")
	public Set<AvailabilityTechnologicalUnitsBean> getTechnologicalUnits() {
		return technologicalUnits;
	}

	public void setTechnologicalUnits(Set<AvailabilityTechnologicalUnitsBean> technologicalUnits) {
		this.technologicalUnits = technologicalUnits;
	}

    @JsonProperty("specializations")
	public Set<SpecializationBean> getSpecializations() {
		return specializations;
	}

	public void setSpecializations(Set<SpecializationBean> specializations) {
		this.specializations = specializations;
	}

    @JsonProperty("assitantOfAccountables")
	public Set<StockroomBean> getAssitantOfAccountables() {
		return assitantOfAccountables;
	}

	public void setAssitantOfAccountables(Set<StockroomBean> assitantOfAccountables) {
		this.assitantOfAccountables = assitantOfAccountables;
	}

    @JsonProperty("users")
	public Set<AppUserBean> getUsers() {
		return users;
	}

	public void setUsers(Set<AppUserBean> users) {
		this.users = users;
	}

    @JsonProperty("accountables")
	public Set<StockroomBean> getAccountables() {
		return accountables;
	}

	public void setAccountables(Set<StockroomBean> accountables) {
		this.accountables = accountables;
	}

    @JsonProperty("familyMembers")
	public Set<FamilyMemberBean> getFamilyMembers() {
		return familyMembers;
	}

	public void setFamilyMembers(Set<FamilyMemberBean> familyMembers) {
		this.familyMembers = familyMembers;
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
		if (o == null || !(o instanceof EmployeeBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((EmployeeBean) o).getId()));
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
		return "EmployeeBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", EPersonellNumber=" + EPersonellNumber
			+ ", EName=" + EName
			+ ", ELastName=" + ELastName
			+ ", EJobTitle=" + EJobTitle
			+ ", EEmail=" + EEmail
			+ ", EBirthName=" + EBirthName
			+ ", EDateOfBirth=" + EDateOfBirth
			+ ", ENationality=" + ENationality
			+ ", EUsername=" + EUsername
			+ ", EStreet=" + EStreet
			+ ", ETelephone=" + ETelephone
			+ ", EAccountNumber=" + EAccountNumber
			+ ", EEmploymentType=" + EEmploymentType
			+ ", EEmploymentWay=" + EEmploymentWay
			+ ", EWorkExpirienceYY=" + EWorkExpirienceYY
			+ ", EWorkExpirienceMM=" + EWorkExpirienceMM
			+ ", EWorkExpirienceDD=" + EWorkExpirienceDD
			+ ", EWorkExpirienceFRAYY=" + EWorkExpirienceFRAYY
			+ ", EWorkExpirienceFRAMM=" + EWorkExpirienceFRAMM
			+ ", EWorkExpirienceFRADD=" + EWorkExpirienceFRADD
			+ ", EEmploymentEntryDate=" + EEmploymentEntryDate
			+ ", EEmploymentDateOfLeaving=" + EEmploymentDateOfLeaving
			+ ", EEmploymentEndReason=" + EEmploymentEndReason
			+ ", EEmploymentLimitation=" + EEmploymentLimitation
			+ ", EMaritialStatus=" + EMaritialStatus
			+ ", ESingleParent=" + ESingleParent
			+ ", EBloodType=" + EBloodType
			+ ", EBloodDonor=" + EBloodDonor
			+ ", EShiftWork=" + EShiftWork
			+ ", EWorkingTime=" + EWorkingTime
			+ ", EWorkingAbility=" + EWorkingAbility
			+ ", EWorkingAbilityChangeDate=" + EWorkingAbilityChangeDate
			+ ", EWeaklyWorkingHours=" + EWeaklyWorkingHours
			+ ", EHolidayEntitlement=" + EHolidayEntitlement
			+ ", EAnnualWageGross=" + EAnnualWageGross
			+ ", ENumberOfWages=" + ENumberOfWages
			+ ", EMonthlyWageGross=" + EMonthlyWageGross
			+ ", ETaxIdentificationNumber=" + ETaxIdentificationNumber
			+ ", ETaxOfficeNumber=" + ETaxOfficeNumber
			+ ", ETaxClass=" + ETaxClass
			+ ", EChildAllowance=" + EChildAllowance
			+ ", EConffesion=" + EConffesion
			+ ", EHealthInsurance=" + EHealthInsurance
			+ ", ESocialInsuranceNumber=" + ESocialInsuranceNumber
			+ ", EInsuranceGroupKeyHealthInsurance=" + EInsuranceGroupKeyHealthInsurance
			+ ", EInsuranceGroupKeyPensionInsurance=" + EInsuranceGroupKeyPensionInsurance
			+ ", EInsuranceGroupKeyUnemploymentInsurance=" + EInsuranceGroupKeyUnemploymentInsurance
			+ ", EInsuranceGroupKeyNursingCareInsurance=" + EInsuranceGroupKeyNursingCareInsurance
			// + ", organizationUnits=" + organizationUnits
			// + ", schoolDegree=" + schoolDegree
			// + ", countryOfBirth=" + countryOfBirth
			// + ", nationality=" + nationality
			// + ", gender=" + gender
			// + ", address=" + address
			// + ", workstation=" + workstation
			// + ", authority=" + authority
			// + ", finalDegree=" + finalDegree
			// + ", academicTitle=" + academicTitle
			// + ", orderHeadings=" + orderHeadings
			// + ", bankAccounts=" + bankAccounts
			// + ", technologicalUnits=" + technologicalUnits
			// + ", specializations=" + specializations
			// + ", assitantOfAccountables=" + assitantOfAccountables
			// + ", users=" + users
			// + ", accountables=" + accountables
			// + ", familyMembers=" + familyMembers
			// + ", works=" + works
			+ "]";
	}
}