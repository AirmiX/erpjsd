package com.doobgroup.server.entities.humanresources;

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

import com.doobgroup.server.entities.capacitymanagement.TechnologicalUnitBean;
import com.doobgroup.server.entities.capacitymanagement.BalanceResourceBean;
import com.doobgroup.server.entities.humanresources.OccupationDescriptionBean;
import com.doobgroup.server.entities.humanresources.OccupationDemandBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessStepsBean;

@Entity
@Table(name = "OCCUPATION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OCode"  	}))
@SQLDelete(sql="UPDATE OCCUPATION SET deleted = 1 WHERE Occupation_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OccupationBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Occupation_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OCode", nullable = false)
	protected String OCode;
	@Column(name = "OName", nullable = false)
	protected String OName;

    @OneToMany(mappedBy = "profession", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TechnologicalUnitBean> technologicalUnits = new HashSet<TechnologicalUnitBean>();
    @OneToMany(mappedBy = "profession", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BalanceResourceBean> balanceResources = new HashSet<BalanceResourceBean>();
    @OneToMany(mappedBy = "occupation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OccupationDescriptionBean> occupationDescriptions = new HashSet<OccupationDescriptionBean>();
    @OneToMany(mappedBy = "occupation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OccupationDemandBean> occupationDemands = new HashSet<OccupationDemandBean>();
    @OneToMany(mappedBy = "occupation", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
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

    @JsonProperty("OCode")
	public String getOCode() {
		return OCode;
	}

	public void setOCode(String OCode) {
		this.OCode = OCode;
	}

    @JsonProperty("OName")
	public String getOName() {
		return OName;
	}

	public void setOName(String OName) {
		this.OName = OName;
	}


    @JsonProperty("technologicalUnits")
	public Set<TechnologicalUnitBean> getTechnologicalUnits() {
		return technologicalUnits;
	}

	public void setTechnologicalUnits(Set<TechnologicalUnitBean> technologicalUnits) {
		this.technologicalUnits = technologicalUnits;
	}

    @JsonProperty("balanceResources")
	public Set<BalanceResourceBean> getBalanceResources() {
		return balanceResources;
	}

	public void setBalanceResources(Set<BalanceResourceBean> balanceResources) {
		this.balanceResources = balanceResources;
	}

    @JsonProperty("occupationDescriptions")
	public Set<OccupationDescriptionBean> getOccupationDescriptions() {
		return occupationDescriptions;
	}

	public void setOccupationDescriptions(Set<OccupationDescriptionBean> occupationDescriptions) {
		this.occupationDescriptions = occupationDescriptions;
	}

    @JsonProperty("occupationDemands")
	public Set<OccupationDemandBean> getOccupationDemands() {
		return occupationDemands;
	}

	public void setOccupationDemands(Set<OccupationDemandBean> occupationDemands) {
		this.occupationDemands = occupationDemands;
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
		if (o == null || !(o instanceof OccupationBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OccupationBean) o).getId()));
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
		return "OccupationBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OCode=" + OCode
			+ ", OName=" + OName
			// + ", technologicalUnits=" + technologicalUnits
			// + ", balanceResources=" + balanceResources
			// + ", occupationDescriptions=" + occupationDescriptions
			// + ", occupationDemands=" + occupationDemands
			// + ", productionProcessSteps=" + productionProcessSteps
			+ "]";
	}
}