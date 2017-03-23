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

import com.doobgroup.server.entities.capacitymanagement.BalanceResourceBean;
import com.doobgroup.server.entities.productiondata.ProductionProcessBean;

@Entity
@Table(name = "PRODUCTIONPROCESSTYPE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PPTDesignation"  	}))
@SQLDelete(sql="UPDATE PRODUCTIONPROCESSTYPE SET deleted = 1 WHERE ProductionProcessType_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProductionProcessTypeBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProductionProcessType_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPTDesignation", nullable = false)
	protected String PPTDesignation;
	@Column(name = "PPTName", nullable = false)
	protected String PPTName;
	@Column(name = "PPTShortName", nullable = false)
	protected String PPTShortName;

    @OneToMany(mappedBy = "productionProcessType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BalanceResourceBean> balanceResources = new HashSet<BalanceResourceBean>();
    @OneToMany(mappedBy = "productionProcessType", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProductionProcessBean> productionProcesses = new HashSet<ProductionProcessBean>();

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

    @JsonProperty("PPTDesignation")
	public String getPPTDesignation() {
		return PPTDesignation;
	}

	public void setPPTDesignation(String PPTDesignation) {
		this.PPTDesignation = PPTDesignation;
	}

    @JsonProperty("PPTName")
	public String getPPTName() {
		return PPTName;
	}

	public void setPPTName(String PPTName) {
		this.PPTName = PPTName;
	}

    @JsonProperty("PPTShortName")
	public String getPPTShortName() {
		return PPTShortName;
	}

	public void setPPTShortName(String PPTShortName) {
		this.PPTShortName = PPTShortName;
	}


    @JsonProperty("balanceResources")
	public Set<BalanceResourceBean> getBalanceResources() {
		return balanceResources;
	}

	public void setBalanceResources(Set<BalanceResourceBean> balanceResources) {
		this.balanceResources = balanceResources;
	}

    @JsonProperty("productionProcesses")
	public Set<ProductionProcessBean> getProductionProcesses() {
		return productionProcesses;
	}

	public void setProductionProcesses(Set<ProductionProcessBean> productionProcesses) {
		this.productionProcesses = productionProcesses;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProductionProcessTypeBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProductionProcessTypeBean) o).getId()));
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
		return "ProductionProcessTypeBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPTDesignation=" + PPTDesignation
			+ ", PPTName=" + PPTName
			+ ", PPTShortName=" + PPTShortName
			// + ", balanceResources=" + balanceResources
			// + ", productionProcesses=" + productionProcesses
			+ "]";
	}
}