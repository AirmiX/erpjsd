package com.doobgroup.server.entities.procurement;

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

import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.initialization.TaxHeadingBean;
import com.doobgroup.server.entities.commonbusinessentities.MeasurementUnitBean;

@Entity
@Table(name = "INVOICEITEMSWITHOUTDISP"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "IIDOrdinalNumber"  ,  "invoice"  	}))
@SQLDelete(sql="UPDATE INVOICEITEMSWITHOUTDISP SET deleted = 1 WHERE InvoiceItemsWithoutDisp_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class InvoiceItemsWithoutDispBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "InvoiceItemsWithoutDisp_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "IIDOrdinalNumber", nullable = false)
	protected int IIDOrdinalNumber;
	@Column(name = "IIDDescription")
	protected String IIDDescription;
	@Column(name = "IIDAmount", nullable = false)
	protected double IIDAmount;
	@Column(name = "IIDQuantity")
	protected int IIDQuantity;
	@Column(name = "IIDPrice")
	protected double IIDPrice;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="invoice")
    protected InvoiceBean invoice;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taxHeading")
    protected TaxHeadingBean taxHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="measurementUnit")
    protected MeasurementUnitBean measurementUnit;

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

    @JsonProperty("IIDOrdinalNumber")
	public int getIIDOrdinalNumber() {
		return IIDOrdinalNumber;
	}

	public void setIIDOrdinalNumber(int IIDOrdinalNumber) {
		this.IIDOrdinalNumber = IIDOrdinalNumber;
	}

    @JsonProperty("IIDDescription")
	public String getIIDDescription() {
		return IIDDescription;
	}

	public void setIIDDescription(String IIDDescription) {
		this.IIDDescription = IIDDescription;
	}

    @JsonProperty("IIDAmount")
	public double getIIDAmount() {
		return IIDAmount;
	}

	public void setIIDAmount(double IIDAmount) {
		this.IIDAmount = IIDAmount;
	}

    @JsonProperty("IIDQuantity")
	public int getIIDQuantity() {
		return IIDQuantity;
	}

	public void setIIDQuantity(int IIDQuantity) {
		this.IIDQuantity = IIDQuantity;
	}

    @JsonProperty("IIDPrice")
	public double getIIDPrice() {
		return IIDPrice;
	}

	public void setIIDPrice(double IIDPrice) {
		this.IIDPrice = IIDPrice;
	}


    @JsonProperty("invoice")
	public InvoiceBean getInvoice() {
		return invoice;
	}

    public void setInvoice(InvoiceBean invoice) {
		this.invoice = invoice;
	}

    @JsonProperty("taxHeading")
	public TaxHeadingBean getTaxHeading() {
		return taxHeading;
	}

    public void setTaxHeading(TaxHeadingBean taxHeading) {
		this.taxHeading = taxHeading;
	}

    @JsonProperty("measurementUnit")
	public MeasurementUnitBean getMeasurementUnit() {
		return measurementUnit;
	}

    public void setMeasurementUnit(MeasurementUnitBean measurementUnit) {
		this.measurementUnit = measurementUnit;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof InvoiceItemsWithoutDispBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((InvoiceItemsWithoutDispBean) o).getId()));
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
		return "InvoiceItemsWithoutDispBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", IIDOrdinalNumber=" + IIDOrdinalNumber
			+ ", IIDDescription=" + IIDDescription
			+ ", IIDAmount=" + IIDAmount
			+ ", IIDQuantity=" + IIDQuantity
			+ ", IIDPrice=" + IIDPrice
			// + ", invoice=" + invoice
			// + ", taxHeading=" + taxHeading
			// + ", measurementUnit=" + measurementUnit
			+ "]";
	}
}