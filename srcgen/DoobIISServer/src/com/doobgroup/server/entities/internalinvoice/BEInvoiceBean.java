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

import com.doobgroup.server.entities.capacitymanagement.CurrencyBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.initialization.PaymentConditionBean;
import com.doobgroup.server.entities.internalinvoice.BEInvoiceItemBean;
import com.doobgroup.server.entities.internalinvoice.BETaxInvoiceBean;

@Entity
@Table(name = "BEINVOICE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BEIHInvoiceNumber"  	}))
@SQLDelete(sql="UPDATE BEINVOICE SET deleted = 1 WHERE BEInvoice_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BEInvoiceBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BEInvoice_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BEIHInvoiceNumber", nullable = false)
	protected int BEIHInvoiceNumber;
	@Column(name = "BEIHCreationDateDate", nullable = false)
	protected Date BEIHCreationDateDate;
	@Column(name = "BEIHTotal")
	protected int BEIHTotal;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="currency")
    protected CurrencyBean currency;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="paymentCondition")
    protected PaymentConditionBean paymentCondition;
    @OneToMany(mappedBy = "beInvoice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEInvoiceItemBean> beInvoiceItems = new HashSet<BEInvoiceItemBean>();
    @OneToMany(mappedBy = "invoice", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BETaxInvoiceBean> beInvoiceTaxes = new HashSet<BETaxInvoiceBean>();

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

    @JsonProperty("BEIHInvoiceNumber")
	public int getBEIHInvoiceNumber() {
		return BEIHInvoiceNumber;
	}

	public void setBEIHInvoiceNumber(int BEIHInvoiceNumber) {
		this.BEIHInvoiceNumber = BEIHInvoiceNumber;
	}

    @JsonProperty("BEIHCreationDateDate")
	public Date getBEIHCreationDateDate() {
		return BEIHCreationDateDate;
	}

	public void setBEIHCreationDateDate(Date BEIHCreationDateDate) {
		this.BEIHCreationDateDate = BEIHCreationDateDate;
	}

    @JsonProperty("BEIHTotal")
	public int getBEIHTotal() {
		return BEIHTotal;
	}

	public void setBEIHTotal(int BEIHTotal) {
		this.BEIHTotal = BEIHTotal;
	}


    @JsonProperty("currency")
	public CurrencyBean getCurrency() {
		return currency;
	}

    public void setCurrency(CurrencyBean currency) {
		this.currency = currency;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("paymentCondition")
	public PaymentConditionBean getPaymentCondition() {
		return paymentCondition;
	}

    public void setPaymentCondition(PaymentConditionBean paymentCondition) {
		this.paymentCondition = paymentCondition;
	}

    @JsonProperty("beInvoiceItems")
	public Set<BEInvoiceItemBean> getBeInvoiceItems() {
		return beInvoiceItems;
	}

	public void setBeInvoiceItems(Set<BEInvoiceItemBean> beInvoiceItems) {
		this.beInvoiceItems = beInvoiceItems;
	}

    @JsonProperty("beInvoiceTaxes")
	public Set<BETaxInvoiceBean> getBeInvoiceTaxes() {
		return beInvoiceTaxes;
	}

	public void setBeInvoiceTaxes(Set<BETaxInvoiceBean> beInvoiceTaxes) {
		this.beInvoiceTaxes = beInvoiceTaxes;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BEInvoiceBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BEInvoiceBean) o).getId()));
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
		return "BEInvoiceBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BEIHInvoiceNumber=" + BEIHInvoiceNumber
			+ ", BEIHCreationDateDate=" + BEIHCreationDateDate
			+ ", BEIHTotal=" + BEIHTotal
			// + ", currency=" + currency
			// + ", documentType=" + documentType
			// + ", paymentCondition=" + paymentCondition
			// + ", beInvoiceItems=" + beInvoiceItems
			// + ", beInvoiceTaxes=" + beInvoiceTaxes
			+ "]";
	}
}