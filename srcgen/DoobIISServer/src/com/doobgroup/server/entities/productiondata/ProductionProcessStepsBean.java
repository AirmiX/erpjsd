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

import com.doobgroup.server.entities.productiondata.StepsClassificationBean;
import com.doobgroup.server.entities.productiondata.WorkCenterBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessBean;
import com.doobgroup.server.entities.humanresources.OccupationBean;
import com.doobgroup.server.entities.productiondata.StepToolBean;
import com.doobgroup.server.entities.productiondata.StepUserManualBean;
import com.doobgroup.server.entities.productiondata.ControlDemandsBean;

@Entity
@Table(name = "PRODUCTIONPROCESSSTEPS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PPSOrdinalNumber"  ,  "productionProcess"  	}))
@SQLDelete(sql="UPDATE PRODUCTIONPROCESSSTEPS SET deleted = 1 WHERE ProductionProcessSteps_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProductionProcessStepsBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProductionProcessSteps_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPSOrdinalNumber", nullable = false)
	protected int PPSOrdinalNumber;
	@Column(name = "PPSSuffix")
	protected int PPSSuffix;
	@Column(name = "PPSDescription")
	protected String PPSDescription;
	@Column(name = "PPSPreparatoryFinishTime")
	protected int PPSPreparatoryFinishTime;
	@Column(name = "PPSStepDuration", nullable = false)
	protected int PPSStepDuration;
	@Column(name = "PPSPaymentTime")
	protected int PPSPaymentTime;
	@Column(name = "PPSAllowedWaste")
	protected int PPSAllowedWaste;
	@Column(name = "PPSNormOverthrowAllowed")
	protected int PPSNormOverthrowAllowed;
	@Column(name = "PPSControlIndicator", nullable = false)
	protected int PPSControlIndicator;
	@Column(name = "PPSValidStartDate", nullable = false)
	protected Date PPSValidStartDate;
	@Column(name = "PPSValidEndDate")
	protected Date PPSValidEndDate;
	@Column(name = "PPSPiecesInStep")
	protected int PPSPiecesInStep;
	@Column(name = "PPSEnteredBy")
	protected String PPSEnteredBy;
	@Column(name = "PPSEntryDate")
	protected Date PPSEntryDate;
	@Column(name = "PPSModifiedBy")
	protected String PPSModifiedBy;
	@Column(name = "PPSModificationDate")
	protected Date PPSModificationDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stepClassification")
    protected StepsClassificationBean stepClassification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workCenter")
    protected WorkCenterBean workCenter;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productionProcess")
    protected ProductionProcessBean productionProcess;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="occupation")
    protected OccupationBean occupation;
    @OneToMany(mappedBy = "productionProcessStep", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StepToolBean> stepTools = new HashSet<StepToolBean>();
    @OneToMany(mappedBy = "productionProcessStep", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<StepUserManualBean> stepUserManuals = new HashSet<StepUserManualBean>();
    @OneToMany(mappedBy = "productionProcessStep", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ControlDemandsBean> controlDemands = new HashSet<ControlDemandsBean>();

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

    @JsonProperty("PPSOrdinalNumber")
	public int getPPSOrdinalNumber() {
		return PPSOrdinalNumber;
	}

	public void setPPSOrdinalNumber(int PPSOrdinalNumber) {
		this.PPSOrdinalNumber = PPSOrdinalNumber;
	}

    @JsonProperty("PPSSuffix")
	public int getPPSSuffix() {
		return PPSSuffix;
	}

	public void setPPSSuffix(int PPSSuffix) {
		this.PPSSuffix = PPSSuffix;
	}

    @JsonProperty("PPSDescription")
	public String getPPSDescription() {
		return PPSDescription;
	}

	public void setPPSDescription(String PPSDescription) {
		this.PPSDescription = PPSDescription;
	}

    @JsonProperty("PPSPreparatoryFinishTime")
	public int getPPSPreparatoryFinishTime() {
		return PPSPreparatoryFinishTime;
	}

	public void setPPSPreparatoryFinishTime(int PPSPreparatoryFinishTime) {
		this.PPSPreparatoryFinishTime = PPSPreparatoryFinishTime;
	}

    @JsonProperty("PPSStepDuration")
	public int getPPSStepDuration() {
		return PPSStepDuration;
	}

	public void setPPSStepDuration(int PPSStepDuration) {
		this.PPSStepDuration = PPSStepDuration;
	}

    @JsonProperty("PPSPaymentTime")
	public int getPPSPaymentTime() {
		return PPSPaymentTime;
	}

	public void setPPSPaymentTime(int PPSPaymentTime) {
		this.PPSPaymentTime = PPSPaymentTime;
	}

    @JsonProperty("PPSAllowedWaste")
	public int getPPSAllowedWaste() {
		return PPSAllowedWaste;
	}

	public void setPPSAllowedWaste(int PPSAllowedWaste) {
		this.PPSAllowedWaste = PPSAllowedWaste;
	}

    @JsonProperty("PPSNormOverthrowAllowed")
	public int getPPSNormOverthrowAllowed() {
		return PPSNormOverthrowAllowed;
	}

	public void setPPSNormOverthrowAllowed(int PPSNormOverthrowAllowed) {
		this.PPSNormOverthrowAllowed = PPSNormOverthrowAllowed;
	}

    @JsonProperty("PPSControlIndicator")
	public int getPPSControlIndicator() {
		return PPSControlIndicator;
	}

	public void setPPSControlIndicator(int PPSControlIndicator) {
		this.PPSControlIndicator = PPSControlIndicator;
	}

    @JsonProperty("PPSValidStartDate")
	public Date getPPSValidStartDate() {
		return PPSValidStartDate;
	}

	public void setPPSValidStartDate(Date PPSValidStartDate) {
		this.PPSValidStartDate = PPSValidStartDate;
	}

    @JsonProperty("PPSValidEndDate")
	public Date getPPSValidEndDate() {
		return PPSValidEndDate;
	}

	public void setPPSValidEndDate(Date PPSValidEndDate) {
		this.PPSValidEndDate = PPSValidEndDate;
	}

    @JsonProperty("PPSPiecesInStep")
	public int getPPSPiecesInStep() {
		return PPSPiecesInStep;
	}

	public void setPPSPiecesInStep(int PPSPiecesInStep) {
		this.PPSPiecesInStep = PPSPiecesInStep;
	}

    @JsonProperty("PPSEnteredBy")
	public String getPPSEnteredBy() {
		return PPSEnteredBy;
	}

	public void setPPSEnteredBy(String PPSEnteredBy) {
		this.PPSEnteredBy = PPSEnteredBy;
	}

    @JsonProperty("PPSEntryDate")
	public Date getPPSEntryDate() {
		return PPSEntryDate;
	}

	public void setPPSEntryDate(Date PPSEntryDate) {
		this.PPSEntryDate = PPSEntryDate;
	}

    @JsonProperty("PPSModifiedBy")
	public String getPPSModifiedBy() {
		return PPSModifiedBy;
	}

	public void setPPSModifiedBy(String PPSModifiedBy) {
		this.PPSModifiedBy = PPSModifiedBy;
	}

    @JsonProperty("PPSModificationDate")
	public Date getPPSModificationDate() {
		return PPSModificationDate;
	}

	public void setPPSModificationDate(Date PPSModificationDate) {
		this.PPSModificationDate = PPSModificationDate;
	}


    @JsonProperty("stepClassification")
	public StepsClassificationBean getStepClassification() {
		return stepClassification;
	}

    public void setStepClassification(StepsClassificationBean stepClassification) {
		this.stepClassification = stepClassification;
	}

    @JsonProperty("workCenter")
	public WorkCenterBean getWorkCenter() {
		return workCenter;
	}

    public void setWorkCenter(WorkCenterBean workCenter) {
		this.workCenter = workCenter;
	}

    @JsonProperty("productionProcess")
	public ProductionProcessBean getProductionProcess() {
		return productionProcess;
	}

    public void setProductionProcess(ProductionProcessBean productionProcess) {
		this.productionProcess = productionProcess;
	}

    @JsonProperty("occupation")
	public OccupationBean getOccupation() {
		return occupation;
	}

    public void setOccupation(OccupationBean occupation) {
		this.occupation = occupation;
	}

    @JsonProperty("stepTools")
	public Set<StepToolBean> getStepTools() {
		return stepTools;
	}

	public void setStepTools(Set<StepToolBean> stepTools) {
		this.stepTools = stepTools;
	}

    @JsonProperty("stepUserManuals")
	public Set<StepUserManualBean> getStepUserManuals() {
		return stepUserManuals;
	}

	public void setStepUserManuals(Set<StepUserManualBean> stepUserManuals) {
		this.stepUserManuals = stepUserManuals;
	}

    @JsonProperty("controlDemands")
	public Set<ControlDemandsBean> getControlDemands() {
		return controlDemands;
	}

	public void setControlDemands(Set<ControlDemandsBean> controlDemands) {
		this.controlDemands = controlDemands;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProductionProcessStepsBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProductionProcessStepsBean) o).getId()));
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
		return "ProductionProcessStepsBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPSOrdinalNumber=" + PPSOrdinalNumber
			+ ", PPSSuffix=" + PPSSuffix
			+ ", PPSDescription=" + PPSDescription
			+ ", PPSPreparatoryFinishTime=" + PPSPreparatoryFinishTime
			+ ", PPSStepDuration=" + PPSStepDuration
			+ ", PPSPaymentTime=" + PPSPaymentTime
			+ ", PPSAllowedWaste=" + PPSAllowedWaste
			+ ", PPSNormOverthrowAllowed=" + PPSNormOverthrowAllowed
			+ ", PPSControlIndicator=" + PPSControlIndicator
			+ ", PPSValidStartDate=" + PPSValidStartDate
			+ ", PPSValidEndDate=" + PPSValidEndDate
			+ ", PPSPiecesInStep=" + PPSPiecesInStep
			+ ", PPSEnteredBy=" + PPSEnteredBy
			+ ", PPSEntryDate=" + PPSEntryDate
			+ ", PPSModifiedBy=" + PPSModifiedBy
			+ ", PPSModificationDate=" + PPSModificationDate
			// + ", stepClassification=" + stepClassification
			// + ", workCenter=" + workCenter
			// + ", productionProcess=" + productionProcess
			// + ", occupation=" + occupation
			// + ", stepTools=" + stepTools
			// + ", stepUserManuals=" + stepUserManuals
			// + ", controlDemands=" + controlDemands
			+ "]";
	}
}