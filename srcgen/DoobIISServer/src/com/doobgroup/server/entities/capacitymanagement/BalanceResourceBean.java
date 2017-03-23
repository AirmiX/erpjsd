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

import com.doobgroup.server.entities.humanresources.SchoolDegreeBean;
import com.doobgroup.server.entities.humanresources.OccupationBean;
import com.doobgroup.server.entities.productiondata.WorkCenterBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessTypeBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;

@Entity
@Table(name = "BALANCERESOURCE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "workCenter" ,   "productionProcessType" ,   "identification"  	}))
@SQLDelete(sql="UPDATE BALANCERESOURCE SET deleted = 1 WHERE BalanceResource_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BalanceResourceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BalanceResource_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BRBalanceUnit", nullable = false)
	protected int BRBalanceUnit;
	@Column(name = "BRResourceType", nullable = false)
	protected String BRResourceType;
	@Column(name = "BRStartDate", nullable = false)
	protected Date BRStartDate;
	@Column(name = "BREndDate")
	protected Date BREndDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="schoolDegree")
    protected SchoolDegreeBean schoolDegree;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="profession")
    protected OccupationBean profession;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workCenter")
    protected WorkCenterBean workCenter;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productionProcessType")
    protected ProductionProcessTypeBean productionProcessType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;

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

    @JsonProperty("BRBalanceUnit")
	public int getBRBalanceUnit() {
		return BRBalanceUnit;
	}

	public void setBRBalanceUnit(int BRBalanceUnit) {
		this.BRBalanceUnit = BRBalanceUnit;
	}

    @JsonProperty("BRResourceType")
	public String getBRResourceType() {
		return BRResourceType;
	}

	public void setBRResourceType(String BRResourceType) {
		this.BRResourceType = BRResourceType;
	}

    @JsonProperty("BRStartDate")
	public Date getBRStartDate() {
		return BRStartDate;
	}

	public void setBRStartDate(Date BRStartDate) {
		this.BRStartDate = BRStartDate;
	}

    @JsonProperty("BREndDate")
	public Date getBREndDate() {
		return BREndDate;
	}

	public void setBREndDate(Date BREndDate) {
		this.BREndDate = BREndDate;
	}


    @JsonProperty("schoolDegree")
	public SchoolDegreeBean getSchoolDegree() {
		return schoolDegree;
	}

    public void setSchoolDegree(SchoolDegreeBean schoolDegree) {
		this.schoolDegree = schoolDegree;
	}

    @JsonProperty("profession")
	public OccupationBean getProfession() {
		return profession;
	}

    public void setProfession(OccupationBean profession) {
		this.profession = profession;
	}

    @JsonProperty("workCenter")
	public WorkCenterBean getWorkCenter() {
		return workCenter;
	}

    public void setWorkCenter(WorkCenterBean workCenter) {
		this.workCenter = workCenter;
	}

    @JsonProperty("productionProcessType")
	public ProductionProcessTypeBean getProductionProcessType() {
		return productionProcessType;
	}

    public void setProductionProcessType(ProductionProcessTypeBean productionProcessType) {
		this.productionProcessType = productionProcessType;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BalanceResourceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BalanceResourceBean) o).getId()));
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
		return "BalanceResourceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BRBalanceUnit=" + BRBalanceUnit
			+ ", BRResourceType=" + BRResourceType
			+ ", BRStartDate=" + BRStartDate
			+ ", BREndDate=" + BREndDate
			// + ", schoolDegree=" + schoolDegree
			// + ", profession=" + profession
			// + ", workCenter=" + workCenter
			// + ", productionProcessType=" + productionProcessType
			// + ", identification=" + identification
			+ "]";
	}
}