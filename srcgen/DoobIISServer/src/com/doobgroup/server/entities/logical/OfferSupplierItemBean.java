package com.doobgroup.server.entities.logical;

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

import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.logical.OfferSupplierHeadingBean;
import com.doobgroup.server.entities.stockmanagement.RequestForProposalItemBean;
import com.doobgroup.server.entities.logical.OrderSupplierItemBean;

@Entity
@Table(name = "OFFERSUPPLIERITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "OSIOrdinalNumber"  ,  "offerSupplierHeading"  	}))
@SQLDelete(sql="UPDATE OFFERSUPPLIERITEM SET deleted = 1 WHERE OfferSupplierItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class OfferSupplierItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OfferSupplierItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "OSIOrdinalNumber", nullable = false)
	protected int OSIOrdinalNumber;
	@Column(name = "OSIMeasurementUnit", nullable = false)
	protected String OSIMeasurementUnit;
	@Column(name = "OSIOfferedQuantity", nullable = false)
	protected int OSIOfferedQuantity;
	@Column(name = "OSIOfferedPrice", nullable = false)
	protected int OSIOfferedPrice;
	@Column(name = "OSIDeliveryDeadline", nullable = false)
	protected Date OSIDeliveryDeadline;
	@Column(name = "OSIStatus", nullable = false)
	protected String OSIStatus;
	@Column(name = "OSIRemark")
	protected String OSIRemark;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="offerSupplierHeading")
    protected OfferSupplierHeadingBean offerSupplierHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="rfpItem")
    protected RequestForProposalItemBean rfpItem;
    @OneToMany(mappedBy = "offerSupplierItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OrderSupplierItemBean> orderSupplierItems = new HashSet<OrderSupplierItemBean>();

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

    @JsonProperty("OSIOrdinalNumber")
	public int getOSIOrdinalNumber() {
		return OSIOrdinalNumber;
	}

	public void setOSIOrdinalNumber(int OSIOrdinalNumber) {
		this.OSIOrdinalNumber = OSIOrdinalNumber;
	}

    @JsonProperty("OSIMeasurementUnit")
	public String getOSIMeasurementUnit() {
		return OSIMeasurementUnit;
	}

	public void setOSIMeasurementUnit(String OSIMeasurementUnit) {
		this.OSIMeasurementUnit = OSIMeasurementUnit;
	}

    @JsonProperty("OSIOfferedQuantity")
	public int getOSIOfferedQuantity() {
		return OSIOfferedQuantity;
	}

	public void setOSIOfferedQuantity(int OSIOfferedQuantity) {
		this.OSIOfferedQuantity = OSIOfferedQuantity;
	}

    @JsonProperty("OSIOfferedPrice")
	public int getOSIOfferedPrice() {
		return OSIOfferedPrice;
	}

	public void setOSIOfferedPrice(int OSIOfferedPrice) {
		this.OSIOfferedPrice = OSIOfferedPrice;
	}

    @JsonProperty("OSIDeliveryDeadline")
	public Date getOSIDeliveryDeadline() {
		return OSIDeliveryDeadline;
	}

	public void setOSIDeliveryDeadline(Date OSIDeliveryDeadline) {
		this.OSIDeliveryDeadline = OSIDeliveryDeadline;
	}

    @JsonProperty("OSIStatus")
	public String getOSIStatus() {
		return OSIStatus;
	}

	public void setOSIStatus(String OSIStatus) {
		this.OSIStatus = OSIStatus;
	}

    @JsonProperty("OSIRemark")
	public String getOSIRemark() {
		return OSIRemark;
	}

	public void setOSIRemark(String OSIRemark) {
		this.OSIRemark = OSIRemark;
	}


    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("offerSupplierHeading")
	public OfferSupplierHeadingBean getOfferSupplierHeading() {
		return offerSupplierHeading;
	}

    public void setOfferSupplierHeading(OfferSupplierHeadingBean offerSupplierHeading) {
		this.offerSupplierHeading = offerSupplierHeading;
	}

    @JsonProperty("rfpItem")
	public RequestForProposalItemBean getRfpItem() {
		return rfpItem;
	}

    public void setRfpItem(RequestForProposalItemBean rfpItem) {
		this.rfpItem = rfpItem;
	}

    @JsonProperty("orderSupplierItems")
	public Set<OrderSupplierItemBean> getOrderSupplierItems() {
		return orderSupplierItems;
	}

	public void setOrderSupplierItems(Set<OrderSupplierItemBean> orderSupplierItems) {
		this.orderSupplierItems = orderSupplierItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof OfferSupplierItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((OfferSupplierItemBean) o).getId()));
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
		return "OfferSupplierItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", OSIOrdinalNumber=" + OSIOrdinalNumber
			+ ", OSIMeasurementUnit=" + OSIMeasurementUnit
			+ ", OSIOfferedQuantity=" + OSIOfferedQuantity
			+ ", OSIOfferedPrice=" + OSIOfferedPrice
			+ ", OSIDeliveryDeadline=" + OSIDeliveryDeadline
			+ ", OSIStatus=" + OSIStatus
			+ ", OSIRemark=" + OSIRemark
			// + ", identification=" + identification
			// + ", offerSupplierHeading=" + offerSupplierHeading
			// + ", rfpItem=" + rfpItem
			// + ", orderSupplierItems=" + orderSupplierItems
			+ "]";
	}
}