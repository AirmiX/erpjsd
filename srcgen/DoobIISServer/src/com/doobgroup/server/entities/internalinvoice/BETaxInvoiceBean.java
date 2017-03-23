package com.doobgroup.server.entities.internalinvoice;

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

import com.doobgroup.server.entities.internalinvoice.BEInvoiceBean;

@Entity
@Table(name = "BETAXINVOICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BETIOrdinalNumber"  ,  "invoice"  	}))
@SQLDelete(sql="UPDATE BETAXINVOICE SET deleted = 1 WHERE BETaxInvoice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BETaxInvoiceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BETaxInvoice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BETIOrdinalNumber", nullable = false)
	protected int BETIOrdinalNumber;
	@Column(name = "BETIDescription")
	protected String BETIDescription;
	@Column(name = "BETIPercentage", nullable = false)
	protected double BETIPercentage;
	@Column(name = "BETIAmmount", nullable = false)
	protected double BETIAmmount;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="invoice")
    protected BEInvoiceBean invoice;

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

    @JsonProperty("BETIOrdinalNumber")
	public int getBETIOrdinalNumber() {
		return BETIOrdinalNumber;
	}

	public void setBETIOrdinalNumber(int BETIOrdinalNumber) {
		this.BETIOrdinalNumber = BETIOrdinalNumber;
	}

    @JsonProperty("BETIDescription")
	public String getBETIDescription() {
		return BETIDescription;
	}

	public void setBETIDescription(String BETIDescription) {
		this.BETIDescription = BETIDescription;
	}

    @JsonProperty("BETIPercentage")
	public double getBETIPercentage() {
		return BETIPercentage;
	}

	public void setBETIPercentage(double BETIPercentage) {
		this.BETIPercentage = BETIPercentage;
	}

    @JsonProperty("BETIAmmount")
	public double getBETIAmmount() {
		return BETIAmmount;
	}

	public void setBETIAmmount(double BETIAmmount) {
		this.BETIAmmount = BETIAmmount;
	}


    @JsonProperty("invoice")
	public BEInvoiceBean getInvoice() {
		return invoice;
	}

    public void setInvoice(BEInvoiceBean invoice) {
		this.invoice = invoice;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BETaxInvoiceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BETaxInvoiceBean) o).getId()));
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
		return "BETaxInvoiceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BETIOrdinalNumber=" + BETIOrdinalNumber
			+ ", BETIDescription=" + BETIDescription
			+ ", BETIPercentage=" + BETIPercentage
			+ ", BETIAmmount=" + BETIAmmount
			// + ", invoice=" + invoice
			+ "]";
	}
}