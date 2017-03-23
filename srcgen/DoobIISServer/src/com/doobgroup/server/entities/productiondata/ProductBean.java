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

import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;

@Entity
@Table(name = "PRODUCT"
)
@SQLDelete(sql="UPDATE PRODUCT SET deleted = 1 WHERE Product_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProductBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Product_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PProductIndicator")
	protected String PProductIndicator;
	@Column(name = "PProcurementIndicator")
	protected String PProcurementIndicator;
	@Column(name = "PProductWeight")
	protected int PProductWeight;
	@Column(name = "PProductStatus")
	protected String PProductStatus;
	@Column(name = "PSecurityIndicator")
	protected String PSecurityIndicator;
	@Column(name = "PSparePartIndicator")
	protected String PSparePartIndicator;
	@Column(name = "PDrawingFormat")
	protected String PDrawingFormat;
	@Column(name = "PDrawingDate")
	protected Date PDrawingDate;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;

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

    @JsonProperty("PProductIndicator")
	public String getPProductIndicator() {
		return PProductIndicator;
	}

	public void setPProductIndicator(String PProductIndicator) {
		this.PProductIndicator = PProductIndicator;
	}

    @JsonProperty("PProcurementIndicator")
	public String getPProcurementIndicator() {
		return PProcurementIndicator;
	}

	public void setPProcurementIndicator(String PProcurementIndicator) {
		this.PProcurementIndicator = PProcurementIndicator;
	}

    @JsonProperty("PProductWeight")
	public int getPProductWeight() {
		return PProductWeight;
	}

	public void setPProductWeight(int PProductWeight) {
		this.PProductWeight = PProductWeight;
	}

    @JsonProperty("PProductStatus")
	public String getPProductStatus() {
		return PProductStatus;
	}

	public void setPProductStatus(String PProductStatus) {
		this.PProductStatus = PProductStatus;
	}

    @JsonProperty("PSecurityIndicator")
	public String getPSecurityIndicator() {
		return PSecurityIndicator;
	}

	public void setPSecurityIndicator(String PSecurityIndicator) {
		this.PSecurityIndicator = PSecurityIndicator;
	}

    @JsonProperty("PSparePartIndicator")
	public String getPSparePartIndicator() {
		return PSparePartIndicator;
	}

	public void setPSparePartIndicator(String PSparePartIndicator) {
		this.PSparePartIndicator = PSparePartIndicator;
	}

    @JsonProperty("PDrawingFormat")
	public String getPDrawingFormat() {
		return PDrawingFormat;
	}

	public void setPDrawingFormat(String PDrawingFormat) {
		this.PDrawingFormat = PDrawingFormat;
	}

    @JsonProperty("PDrawingDate")
	public Date getPDrawingDate() {
		return PDrawingDate;
	}

	public void setPDrawingDate(Date PDrawingDate) {
		this.PDrawingDate = PDrawingDate;
	}


    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProductBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProductBean) o).getId()));
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
		return "ProductBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PProductIndicator=" + PProductIndicator
			+ ", PProcurementIndicator=" + PProcurementIndicator
			+ ", PProductWeight=" + PProductWeight
			+ ", PProductStatus=" + PProductStatus
			+ ", PSecurityIndicator=" + PSecurityIndicator
			+ ", PSparePartIndicator=" + PSparePartIndicator
			+ ", PDrawingFormat=" + PDrawingFormat
			+ ", PDrawingDate=" + PDrawingDate
			// + ", stockroom=" + stockroom
			// + ", organizationUnit=" + organizationUnit
			+ "]";
	}
}