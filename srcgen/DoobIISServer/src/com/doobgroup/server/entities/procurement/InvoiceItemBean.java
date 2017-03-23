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

import com.doobgroup.server.entities.order.OrderItemBean;
import com.doobgroup.server.entities.procurement.InvoiceBean;

@Entity
@Table(name = "INVOICEITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "IIOrdinalNumber"  ,  "invoice"  	}))
@SQLDelete(sql="UPDATE INVOICEITEM SET deleted = 1 WHERE InvoiceItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class InvoiceItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "InvoiceItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "IIOrdinalNumber", nullable = false)
	protected int IIOrdinalNumber;
	@Column(name = "IIQuantity")
	protected int IIQuantity;
	@Column(name = "IIRebate")
	protected int IIRebate;
	@Column(name = "IIPrice")
	protected int IIPrice;
	@Column(name = "IIValue")
	protected int IIValue;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="orderItem")
    protected OrderItemBean orderItem;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="invoice")
    protected InvoiceBean invoice;

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

    @JsonProperty("IIOrdinalNumber")
	public int getIIOrdinalNumber() {
		return IIOrdinalNumber;
	}

	public void setIIOrdinalNumber(int IIOrdinalNumber) {
		this.IIOrdinalNumber = IIOrdinalNumber;
	}

    @JsonProperty("IIQuantity")
	public int getIIQuantity() {
		return IIQuantity;
	}

	public void setIIQuantity(int IIQuantity) {
		this.IIQuantity = IIQuantity;
	}

    @JsonProperty("IIRebate")
	public int getIIRebate() {
		return IIRebate;
	}

	public void setIIRebate(int IIRebate) {
		this.IIRebate = IIRebate;
	}

    @JsonProperty("IIPrice")
	public int getIIPrice() {
		return IIPrice;
	}

	public void setIIPrice(int IIPrice) {
		this.IIPrice = IIPrice;
	}

    @JsonProperty("IIValue")
	public int getIIValue() {
		return IIValue;
	}

	public void setIIValue(int IIValue) {
		this.IIValue = IIValue;
	}


    @JsonProperty("orderItem")
	public OrderItemBean getOrderItem() {
		return orderItem;
	}

    public void setOrderItem(OrderItemBean orderItem) {
		this.orderItem = orderItem;
	}

    @JsonProperty("invoice")
	public InvoiceBean getInvoice() {
		return invoice;
	}

    public void setInvoice(InvoiceBean invoice) {
		this.invoice = invoice;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof InvoiceItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((InvoiceItemBean) o).getId()));
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
		return "InvoiceItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", IIOrdinalNumber=" + IIOrdinalNumber
			+ ", IIQuantity=" + IIQuantity
			+ ", IIRebate=" + IIRebate
			+ ", IIPrice=" + IIPrice
			+ ", IIValue=" + IIValue
			// + ", orderItem=" + orderItem
			// + ", invoice=" + invoice
			+ "]";
	}
}