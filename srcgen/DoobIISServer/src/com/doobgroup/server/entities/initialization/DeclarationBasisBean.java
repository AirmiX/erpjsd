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

import com.doobgroup.server.entities.procurement.ProFormaInvoiceBean;
import com.doobgroup.server.entities.procurement.ShippingDocumentBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;
import com.doobgroup.server.entities.logical.OrderSupplierHeadingBean;

@Entity
@Table(name = "DECLARATIONBASIS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "DBCode"  	}))
@SQLDelete(sql="UPDATE DECLARATIONBASIS SET deleted = 1 WHERE DeclarationBasis_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class DeclarationBasisBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DeclarationBasis_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "DBCode", nullable = false)
	protected int DBCode;
	@Column(name = "DBDescription", nullable = false)
	protected String DBDescription;

    @OneToMany(mappedBy = "declarationBasis", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProFormaInvoiceBean> proFormaInvoices = new HashSet<ProFormaInvoiceBean>();
    @OneToMany(mappedBy = "declarationBasis", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ShippingDocumentBean> shippnigDocuments = new HashSet<ShippingDocumentBean>();
    @OneToMany(mappedBy = "declarationBasis", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<InvoiceBean> invoices = new HashSet<InvoiceBean>();
    @OneToMany(mappedBy = "declarationBasis", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierHeadingBean> orderSupplierHeadings = new HashSet<OrderSupplierHeadingBean>();

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

    @JsonProperty("DBCode")
	public int getDBCode() {
		return DBCode;
	}

	public void setDBCode(int DBCode) {
		this.DBCode = DBCode;
	}

    @JsonProperty("DBDescription")
	public String getDBDescription() {
		return DBDescription;
	}

	public void setDBDescription(String DBDescription) {
		this.DBDescription = DBDescription;
	}


    @JsonProperty("proFormaInvoices")
	public Set<ProFormaInvoiceBean> getProFormaInvoices() {
		return proFormaInvoices;
	}

	public void setProFormaInvoices(Set<ProFormaInvoiceBean> proFormaInvoices) {
		this.proFormaInvoices = proFormaInvoices;
	}

    @JsonProperty("shippnigDocuments")
	public Set<ShippingDocumentBean> getShippnigDocuments() {
		return shippnigDocuments;
	}

	public void setShippnigDocuments(Set<ShippingDocumentBean> shippnigDocuments) {
		this.shippnigDocuments = shippnigDocuments;
	}

    @JsonProperty("invoices")
	public Set<InvoiceBean> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<InvoiceBean> invoices) {
		this.invoices = invoices;
	}

    @JsonProperty("orderSupplierHeadings")
	public Set<OrderSupplierHeadingBean> getOrderSupplierHeadings() {
		return orderSupplierHeadings;
	}

	public void setOrderSupplierHeadings(Set<OrderSupplierHeadingBean> orderSupplierHeadings) {
		this.orderSupplierHeadings = orderSupplierHeadings;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof DeclarationBasisBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((DeclarationBasisBean) o).getId()));
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
		return "DeclarationBasisBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", DBCode=" + DBCode
			+ ", DBDescription=" + DBDescription
			// + ", proFormaInvoices=" + proFormaInvoices
			// + ", shippnigDocuments=" + shippnigDocuments
			// + ", invoices=" + invoices
			// + ", orderSupplierHeadings=" + orderSupplierHeadings
			+ "]";
	}
}