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

import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;

@Entity
@Table(name = "TAXPROFORMAINVOICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TPIOrdinalNumber"  	}))
@SQLDelete(sql="UPDATE TAXPROFORMAINVOICE SET deleted = 1 WHERE TaxProformaInvoice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TaxProformaInvoiceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TaxProformaInvoice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TPIOrdinalNumber", nullable = false)
	protected int TPIOrdinalNumber;
	@Column(name = "TPIDescription", nullable = false)
	protected String TPIDescription;
	@Column(name = "TPIRate", nullable = false)
	protected double TPIRate;
	@Column(name = "TPIAmount", nullable = false)
	protected double TPIAmount;
	@Column(name = "TPIAccount", nullable = false)
	protected String TPIAccount;
	@Column(name = "TPIBase")
	protected double TPIBase;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="proFormaInvoice")
    protected ProFormaInvoiceBean proFormaInvoice;

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

    @JsonProperty("TPIOrdinalNumber")
	public int getTPIOrdinalNumber() {
		return TPIOrdinalNumber;
	}

	public void setTPIOrdinalNumber(int TPIOrdinalNumber) {
		this.TPIOrdinalNumber = TPIOrdinalNumber;
	}

    @JsonProperty("TPIDescription")
	public String getTPIDescription() {
		return TPIDescription;
	}

	public void setTPIDescription(String TPIDescription) {
		this.TPIDescription = TPIDescription;
	}

    @JsonProperty("TPIRate")
	public double getTPIRate() {
		return TPIRate;
	}

	public void setTPIRate(double TPIRate) {
		this.TPIRate = TPIRate;
	}

    @JsonProperty("TPIAmount")
	public double getTPIAmount() {
		return TPIAmount;
	}

	public void setTPIAmount(double TPIAmount) {
		this.TPIAmount = TPIAmount;
	}

    @JsonProperty("TPIAccount")
	public String getTPIAccount() {
		return TPIAccount;
	}

	public void setTPIAccount(String TPIAccount) {
		this.TPIAccount = TPIAccount;
	}

    @JsonProperty("TPIBase")
	public double getTPIBase() {
		return TPIBase;
	}

	public void setTPIBase(double TPIBase) {
		this.TPIBase = TPIBase;
	}


    @JsonProperty("proFormaInvoice")
	public ProFormaInvoiceBean getProFormaInvoice() {
		return proFormaInvoice;
	}

    public void setProFormaInvoice(ProFormaInvoiceBean proFormaInvoice) {
		this.proFormaInvoice = proFormaInvoice;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TaxProformaInvoiceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TaxProformaInvoiceBean) o).getId()));
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
		return "TaxProformaInvoiceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TPIOrdinalNumber=" + TPIOrdinalNumber
			+ ", TPIDescription=" + TPIDescription
			+ ", TPIRate=" + TPIRate
			+ ", TPIAmount=" + TPIAmount
			+ ", TPIAccount=" + TPIAccount
			+ ", TPIBase=" + TPIBase
			// + ", proFormaInvoice=" + proFormaInvoice
			+ "]";
	}
}