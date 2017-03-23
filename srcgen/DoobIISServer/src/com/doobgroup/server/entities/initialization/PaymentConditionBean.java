package com.doobgroup.server.entities.initialization;

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
import com.doobgroup.server.entities.internalorder.BEOrderHeadingBean;
import com.doobgroup.server.entities.order.OrderHeadingBean;
import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;
import com.doobgroup.server.entities.internalinvoice.BEInvoiceBean;

@Entity
@Table(name = "PAYMENTCONDITION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PCCode"  	}))
@SQLDelete(sql="UPDATE PAYMENTCONDITION SET deleted = 1 WHERE PaymentCondition_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class PaymentConditionBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "PaymentCondition_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PCCode", nullable = false)
	protected int PCCode;
	@Column(name = "PCDescription", nullable = false)
	protected String PCDescription;
	@Column(name = "PCEnglish")
	protected String PCEnglish;

    @OneToMany(mappedBy = "paymentCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "paymentCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEOrderHeadingBean> beOrderHeadings = new HashSet<BEOrderHeadingBean>();
    @OneToMany(mappedBy = "paymentCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderHeadingBean> orderHeadings = new HashSet<OrderHeadingBean>();
    @OneToMany(mappedBy = "paymentCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proFormaInvoices = new HashSet<ProFormaInvoiceBean>();
    @OneToMany(mappedBy = "paymentCondition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<BEInvoiceBean> beInvoice = new HashSet<BEInvoiceBean>();

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

    @JsonProperty("PCCode")
	public int getPCCode() {
		return PCCode;
	}

	public void setPCCode(int PCCode) {
		this.PCCode = PCCode;
	}

    @JsonProperty("PCDescription")
	public String getPCDescription() {
		return PCDescription;
	}

	public void setPCDescription(String PCDescription) {
		this.PCDescription = PCDescription;
	}

    @JsonProperty("PCEnglish")
	public String getPCEnglish() {
		return PCEnglish;
	}

	public void setPCEnglish(String PCEnglish) {
		this.PCEnglish = PCEnglish;
	}


    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("beOrderHeadings")
	public Set<BEOrderHeadingBean> getBeOrderHeadings() {
		return beOrderHeadings;
	}

	public void setBeOrderHeadings(Set<BEOrderHeadingBean> beOrderHeadings) {
		this.beOrderHeadings = beOrderHeadings;
	}

    @JsonProperty("orderHeadings")
	public Set<OrderHeadingBean> getOrderHeadings() {
		return orderHeadings;
	}

	public void setOrderHeadings(Set<OrderHeadingBean> orderHeadings) {
		this.orderHeadings = orderHeadings;
	}

    @JsonProperty("proFormaInvoices")
	public Set<ProFormaInvoiceBean> getProFormaInvoices() {
		return proFormaInvoices;
	}

	public void setProFormaInvoices(Set<ProFormaInvoiceBean> proFormaInvoices) {
		this.proFormaInvoices = proFormaInvoices;
	}

    @JsonProperty("beInvoice")
	public Set<BEInvoiceBean> getBeInvoice() {
		return beInvoice;
	}

	public void setBeInvoice(Set<BEInvoiceBean> beInvoice) {
		this.beInvoice = beInvoice;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof PaymentConditionBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((PaymentConditionBean) o).getId()));
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
		return "PaymentConditionBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PCCode=" + PCCode
			+ ", PCDescription=" + PCDescription
			+ ", PCEnglish=" + PCEnglish
			// + ", invoices=" + invoices
			// + ", beOrderHeadings=" + beOrderHeadings
			// + ", orderHeadings=" + orderHeadings
			// + ", proFormaInvoices=" + proFormaInvoices
			// + ", beInvoice=" + beInvoice
			+ "]";
	}
}