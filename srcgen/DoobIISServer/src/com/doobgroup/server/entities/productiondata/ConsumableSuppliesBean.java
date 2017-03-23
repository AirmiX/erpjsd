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

import com.doobgroup.server.entities.productiondata.ProductionProcessBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;

@Entity
@Table(name = "CONSUMABLESUPPLIES"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "productionProcess" ,   "identification"  	}))
@SQLDelete(sql="UPDATE CONSUMABLESUPPLIES SET deleted = 1 WHERE ConsumableSupplies_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ConsumableSuppliesBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ConsumableSupplies_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "CSNormativ", nullable = false)
	protected int CSNormativ;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productionProcess")
    protected ProductionProcessBean productionProcess;
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

    @JsonProperty("CSNormativ")
	public int getCSNormativ() {
		return CSNormativ;
	}

	public void setCSNormativ(int CSNormativ) {
		this.CSNormativ = CSNormativ;
	}


    @JsonProperty("productionProcess")
	public ProductionProcessBean getProductionProcess() {
		return productionProcess;
	}

    public void setProductionProcess(ProductionProcessBean productionProcess) {
		this.productionProcess = productionProcess;
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
		if (o == null || !(o instanceof ConsumableSuppliesBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ConsumableSuppliesBean) o).getId()));
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
		return "ConsumableSuppliesBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", CSNormativ=" + CSNormativ
			// + ", productionProcess=" + productionProcess
			// + ", identification=" + identification
			+ "]";
	}
}