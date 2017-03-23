package com.doobgroup.server.entities.stockmanagement;

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
import com.doobgroup.server.entities.stockmanagement.RequestForProposalHeadingBean;
import com.doobgroup.server.entities.logical.OfferSupplierItemBean;

@Entity
@Table(name = "REQUESTFORPROPOSALITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RFPIOrdinalNumber"  ,  "rfpHeading"  	}))
@SQLDelete(sql="UPDATE REQUESTFORPROPOSALITEM SET deleted = 1 WHERE RequestForProposalItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RequestForProposalItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RequestForProposalItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RFPIOrdinalNumber", nullable = false)
	protected int RFPIOrdinalNumber;
	@Column(name = "RFPIMeasurementUnit", nullable = false)
	protected String RFPIMeasurementUnit;
	@Column(name = "RFPIRequestedQuantity", nullable = false)
	protected int RFPIRequestedQuantity;
	@Column(name = "RFPIDrawingNumber")
	protected String RFPIDrawingNumber;
	@Column(name = "RFPIProductCode")
	protected String RFPIProductCode;
	@Column(name = "RFPIProcurementSourceStatus", nullable = false)
	protected String RFPIProcurementSourceStatus;
	@Column(name = "RFPIRemark")
	protected String RFPIRemark;
	@Column(name = "RFPIDeliveryDeadline")
	protected Date RFPIDeliveryDeadline;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="rfpHeading")
    protected RequestForProposalHeadingBean rfpHeading;
    @OneToMany(mappedBy = "rfpItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<OfferSupplierItemBean> offerSupplierItems = new HashSet<OfferSupplierItemBean>();

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

    @JsonProperty("RFPIOrdinalNumber")
	public int getRFPIOrdinalNumber() {
		return RFPIOrdinalNumber;
	}

	public void setRFPIOrdinalNumber(int RFPIOrdinalNumber) {
		this.RFPIOrdinalNumber = RFPIOrdinalNumber;
	}

    @JsonProperty("RFPIMeasurementUnit")
	public String getRFPIMeasurementUnit() {
		return RFPIMeasurementUnit;
	}

	public void setRFPIMeasurementUnit(String RFPIMeasurementUnit) {
		this.RFPIMeasurementUnit = RFPIMeasurementUnit;
	}

    @JsonProperty("RFPIRequestedQuantity")
	public int getRFPIRequestedQuantity() {
		return RFPIRequestedQuantity;
	}

	public void setRFPIRequestedQuantity(int RFPIRequestedQuantity) {
		this.RFPIRequestedQuantity = RFPIRequestedQuantity;
	}

    @JsonProperty("RFPIDrawingNumber")
	public String getRFPIDrawingNumber() {
		return RFPIDrawingNumber;
	}

	public void setRFPIDrawingNumber(String RFPIDrawingNumber) {
		this.RFPIDrawingNumber = RFPIDrawingNumber;
	}

    @JsonProperty("RFPIProductCode")
	public String getRFPIProductCode() {
		return RFPIProductCode;
	}

	public void setRFPIProductCode(String RFPIProductCode) {
		this.RFPIProductCode = RFPIProductCode;
	}

    @JsonProperty("RFPIProcurementSourceStatus")
	public String getRFPIProcurementSourceStatus() {
		return RFPIProcurementSourceStatus;
	}

	public void setRFPIProcurementSourceStatus(String RFPIProcurementSourceStatus) {
		this.RFPIProcurementSourceStatus = RFPIProcurementSourceStatus;
	}

    @JsonProperty("RFPIRemark")
	public String getRFPIRemark() {
		return RFPIRemark;
	}

	public void setRFPIRemark(String RFPIRemark) {
		this.RFPIRemark = RFPIRemark;
	}

    @JsonProperty("RFPIDeliveryDeadline")
	public Date getRFPIDeliveryDeadline() {
		return RFPIDeliveryDeadline;
	}

	public void setRFPIDeliveryDeadline(Date RFPIDeliveryDeadline) {
		this.RFPIDeliveryDeadline = RFPIDeliveryDeadline;
	}


    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("rfpHeading")
	public RequestForProposalHeadingBean getRfpHeading() {
		return rfpHeading;
	}

    public void setRfpHeading(RequestForProposalHeadingBean rfpHeading) {
		this.rfpHeading = rfpHeading;
	}

    @JsonProperty("offerSupplierItems")
	public Set<OfferSupplierItemBean> getOfferSupplierItems() {
		return offerSupplierItems;
	}

	public void setOfferSupplierItems(Set<OfferSupplierItemBean> offerSupplierItems) {
		this.offerSupplierItems = offerSupplierItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RequestForProposalItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RequestForProposalItemBean) o).getId()));
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
		return "RequestForProposalItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RFPIOrdinalNumber=" + RFPIOrdinalNumber
			+ ", RFPIMeasurementUnit=" + RFPIMeasurementUnit
			+ ", RFPIRequestedQuantity=" + RFPIRequestedQuantity
			+ ", RFPIDrawingNumber=" + RFPIDrawingNumber
			+ ", RFPIProductCode=" + RFPIProductCode
			+ ", RFPIProcurementSourceStatus=" + RFPIProcurementSourceStatus
			+ ", RFPIRemark=" + RFPIRemark
			+ ", RFPIDeliveryDeadline=" + RFPIDeliveryDeadline
			// + ", identification=" + identification
			// + ", rfpHeading=" + rfpHeading
			// + ", offerSupplierItems=" + offerSupplierItems
			+ "]";
	}
}