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

import com.doobgroup.server.entities.commonbusinessentities.ClassificationBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessTypeBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.productiondata.ConsumableSuppliesBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessStepsBean;

@Entity
@Table(name = "PRODUCTIONPROCESS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PPVariant" ,   "PPName"  ,  "classification" ,   "productionProcessType" ,   "organizationUnit"  	}))
@SQLDelete(sql="UPDATE PRODUCTIONPROCESS SET deleted = 1 WHERE ProductionProcess_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProductionProcessBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProductionProcess_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPVariant", nullable = false)
	protected int PPVariant;
	@Column(name = "PPName", nullable = false)
	protected String PPName;
	@Column(name = "PPStatus", nullable = false)
	protected int PPStatus;
	@Column(name = "PPValidStartDate", nullable = false)
	protected Date PPValidStartDate;
	@Column(name = "PPValidEndDate")
	protected Date PPValidEndDate;
	@Column(name = "PPOptimumBatchSize")
	protected int PPOptimumBatchSize;
	@Column(name = "PPProductionCycle")
	protected int PPProductionCycle;
	@Column(name = "PPTechnologist")
	protected String PPTechnologist;
	@Column(name = "PPCreationDate")
	protected Date PPCreationDate;
	@Column(name = "PPNormedBy")
	protected String PPNormedBy;
	@Column(name = "PPNormingDate")
	protected Date PPNormingDate;
	@Column(name = "PPControledBy")
	protected String PPControledBy;
	@Column(name = "PPControlDate")
	protected Date PPControlDate;
	@Column(name = "PPApprovedBy")
	protected String PPApprovedBy;
	@Column(name = "PPApprovalDate")
	protected Date PPApprovalDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="classification")
    protected ClassificationBean classification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productionProcessType")
    protected ProductionProcessTypeBean productionProcessType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @OneToMany(mappedBy = "productionProcess", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ConsumableSuppliesBean> consumableSupplies = new HashSet<ConsumableSuppliesBean>();
    @OneToMany(mappedBy = "productionProcess", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionProcessStepsBean> productionProcessSteps = new HashSet<ProductionProcessStepsBean>();

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

    @JsonProperty("PPVariant")
	public int getPPVariant() {
		return PPVariant;
	}

	public void setPPVariant(int PPVariant) {
		this.PPVariant = PPVariant;
	}

    @JsonProperty("PPName")
	public String getPPName() {
		return PPName;
	}

	public void setPPName(String PPName) {
		this.PPName = PPName;
	}

    @JsonProperty("PPStatus")
	public int getPPStatus() {
		return PPStatus;
	}

	public void setPPStatus(int PPStatus) {
		this.PPStatus = PPStatus;
	}

    @JsonProperty("PPValidStartDate")
	public Date getPPValidStartDate() {
		return PPValidStartDate;
	}

	public void setPPValidStartDate(Date PPValidStartDate) {
		this.PPValidStartDate = PPValidStartDate;
	}

    @JsonProperty("PPValidEndDate")
	public Date getPPValidEndDate() {
		return PPValidEndDate;
	}

	public void setPPValidEndDate(Date PPValidEndDate) {
		this.PPValidEndDate = PPValidEndDate;
	}

    @JsonProperty("PPOptimumBatchSize")
	public int getPPOptimumBatchSize() {
		return PPOptimumBatchSize;
	}

	public void setPPOptimumBatchSize(int PPOptimumBatchSize) {
		this.PPOptimumBatchSize = PPOptimumBatchSize;
	}

    @JsonProperty("PPProductionCycle")
	public int getPPProductionCycle() {
		return PPProductionCycle;
	}

	public void setPPProductionCycle(int PPProductionCycle) {
		this.PPProductionCycle = PPProductionCycle;
	}

    @JsonProperty("PPTechnologist")
	public String getPPTechnologist() {
		return PPTechnologist;
	}

	public void setPPTechnologist(String PPTechnologist) {
		this.PPTechnologist = PPTechnologist;
	}

    @JsonProperty("PPCreationDate")
	public Date getPPCreationDate() {
		return PPCreationDate;
	}

	public void setPPCreationDate(Date PPCreationDate) {
		this.PPCreationDate = PPCreationDate;
	}

    @JsonProperty("PPNormedBy")
	public String getPPNormedBy() {
		return PPNormedBy;
	}

	public void setPPNormedBy(String PPNormedBy) {
		this.PPNormedBy = PPNormedBy;
	}

    @JsonProperty("PPNormingDate")
	public Date getPPNormingDate() {
		return PPNormingDate;
	}

	public void setPPNormingDate(Date PPNormingDate) {
		this.PPNormingDate = PPNormingDate;
	}

    @JsonProperty("PPControledBy")
	public String getPPControledBy() {
		return PPControledBy;
	}

	public void setPPControledBy(String PPControledBy) {
		this.PPControledBy = PPControledBy;
	}

    @JsonProperty("PPControlDate")
	public Date getPPControlDate() {
		return PPControlDate;
	}

	public void setPPControlDate(Date PPControlDate) {
		this.PPControlDate = PPControlDate;
	}

    @JsonProperty("PPApprovedBy")
	public String getPPApprovedBy() {
		return PPApprovedBy;
	}

	public void setPPApprovedBy(String PPApprovedBy) {
		this.PPApprovedBy = PPApprovedBy;
	}

    @JsonProperty("PPApprovalDate")
	public Date getPPApprovalDate() {
		return PPApprovalDate;
	}

	public void setPPApprovalDate(Date PPApprovalDate) {
		this.PPApprovalDate = PPApprovalDate;
	}


    @JsonProperty("classification")
	public ClassificationBean getClassification() {
		return classification;
	}

    public void setClassification(ClassificationBean classification) {
		this.classification = classification;
	}

    @JsonProperty("productionProcessType")
	public ProductionProcessTypeBean getProductionProcessType() {
		return productionProcessType;
	}

    public void setProductionProcessType(ProductionProcessTypeBean productionProcessType) {
		this.productionProcessType = productionProcessType;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("consumableSupplies")
	public Set<ConsumableSuppliesBean> getConsumableSupplies() {
		return consumableSupplies;
	}

	public void setConsumableSupplies(Set<ConsumableSuppliesBean> consumableSupplies) {
		this.consumableSupplies = consumableSupplies;
	}

    @JsonProperty("productionProcessSteps")
	public Set<ProductionProcessStepsBean> getProductionProcessSteps() {
		return productionProcessSteps;
	}

	public void setProductionProcessSteps(Set<ProductionProcessStepsBean> productionProcessSteps) {
		this.productionProcessSteps = productionProcessSteps;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProductionProcessBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProductionProcessBean) o).getId()));
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
		return "ProductionProcessBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPVariant=" + PPVariant
			+ ", PPName=" + PPName
			+ ", PPStatus=" + PPStatus
			+ ", PPValidStartDate=" + PPValidStartDate
			+ ", PPValidEndDate=" + PPValidEndDate
			+ ", PPOptimumBatchSize=" + PPOptimumBatchSize
			+ ", PPProductionCycle=" + PPProductionCycle
			+ ", PPTechnologist=" + PPTechnologist
			+ ", PPCreationDate=" + PPCreationDate
			+ ", PPNormedBy=" + PPNormedBy
			+ ", PPNormingDate=" + PPNormingDate
			+ ", PPControledBy=" + PPControledBy
			+ ", PPControlDate=" + PPControlDate
			+ ", PPApprovedBy=" + PPApprovedBy
			+ ", PPApprovalDate=" + PPApprovalDate
			// + ", classification=" + classification
			// + ", productionProcessType=" + productionProcessType
			// + ", organizationUnit=" + organizationUnit
			// + ", consumableSupplies=" + consumableSupplies
			// + ", productionProcessSteps=" + productionProcessSteps
			+ "]";
	}
}