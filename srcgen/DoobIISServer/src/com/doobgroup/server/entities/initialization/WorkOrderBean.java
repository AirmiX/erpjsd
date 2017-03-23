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

import com.doobgroup.server.entities.stockmanagement.ProductStatusBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.stockmanagement.TangibleItemStatusBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestHeadingBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionBean;
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteBean;

@Entity
@Table(name = "WORKORDER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "WOCode"  ,  "productionUnit" ,   "documentType"  	}))
@SQLDelete(sql="UPDATE WORKORDER SET deleted = 1 WHERE WorkOrder_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class WorkOrderBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "WorkOrder_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "WOCode", nullable = false)
	protected int WOCode;
	@Column(name = "WOCreationDate", nullable = false)
	protected Date WOCreationDate;
	@Column(name = "WOScheduledDate", nullable = false)
	protected Date WOScheduledDate;
	@Column(name = "WOLunchingProductionDate")
	protected Date WOLunchingProductionDate;
	@Column(name = "WOFinishingDate")
	protected Date WOFinishingDate;
	@Column(name = "WOCalculationDate")
	protected Date WOCalculationDate;
	@Column(name = "WOLuanchedQuantity", nullable = false)
	protected int WOLuanchedQuantity;
	@Column(name = "WOAcceptedQuantity", nullable = false)
	protected int WOAcceptedQuantity;
	@Column(name = "WORejectedQuantity", nullable = false)
	protected int WORejectedQuantity;
	@Column(name = "WOZanovljenaQuantity", nullable = false)
	protected int WOZanovljenaQuantity;
	@Column(name = "WOCalculationStatus", nullable = false)
	protected int WOCalculationStatus;
	@Column(name = "WOPrintingStatus")
	protected String WOPrintingStatus;
	@Column(name = "WOCurrentNumber")
	protected int WOCurrentNumber;
	@Column(name = "WOPrintingReceipt")
	protected int WOPrintingReceipt;
	@Column(name = "WOTransferredMaterial")
	protected int WOTransferredMaterial;
	@Column(name = "WOSellingPrice")
	protected double WOSellingPrice;
	@Column(name = "WOLansiranaKnjigovodstvena")
	protected int WOLansiranaKnjigovodstvena;
	@Column(name = "WOPrescribedQuantity")
	protected int WOPrescribedQuantity;
	@Column(name = "WOClosed")
	protected String WOClosed;
	@Column(name = "WOTechnologicalProcessType")
	protected String WOTechnologicalProcessType;
	@Column(name = "WOMarketStatus")
	protected String WOMarketStatus;
	@Column(name = "WOPriorityStatus")
	protected int WOPriorityStatus;
	@Column(name = "WOLucnhedDocumentStatus")
	protected String WOLucnhedDocumentStatus;
	@Column(name = "WODirectLaborCost")
	protected double WODirectLaborCost;
	@Column(name = "WOEffectiveOperatingTime")
	protected int WOEffectiveOperatingTime;
	@Column(name = "WOStandardizedOperatingTime")
	protected int WOStandardizedOperatingTime;
	@Column(name = "WODirectMaterialCost")
	protected double WODirectMaterialCost;
	@Column(name = "WOServiceCost")
	protected double WOServiceCost;
	@Column(name = "WOGeneralCost")
	protected char WOGeneralCost;
	@Column(name = "WOGeneralMaterialCost")
	protected double WOGeneralMaterialCost;
	@Column(name = "WOInvoicingStatus")
	protected String WOInvoicingStatus;
	@Column(name = "WOImplementationValue")
	protected int WOImplementationValue;
	@Column(name = "TISDesignation", nullable = false)
	protected char TISDesignation;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productStatus")
    protected ProductStatusBean productStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="tangibleItemStatus")
    protected TangibleItemStatusBean tangibleItemStatus;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="productionUnit")
    protected OrganizationUnitBean productionUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @OneToMany(mappedBy = "workOrder", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestHeadingBean> procurementRequestHeadings = new HashSet<ProcurementRequestHeadingBean>();
    @OneToMany(mappedBy = "workOrder", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionBean> requisitions = new HashSet<RequisitionBean>();
    @OneToMany(mappedBy = "workOrder", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteBean> deliveryNotes = new HashSet<DeliveryNoteBean>();
    @OneToMany(mappedBy = "workOrder", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteBean> materialReturnNotes = new HashSet<MaterialReturnNoteBean>();

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

    @JsonProperty("WOCode")
	public int getWOCode() {
		return WOCode;
	}

	public void setWOCode(int WOCode) {
		this.WOCode = WOCode;
	}

    @JsonProperty("WOCreationDate")
	public Date getWOCreationDate() {
		return WOCreationDate;
	}

	public void setWOCreationDate(Date WOCreationDate) {
		this.WOCreationDate = WOCreationDate;
	}

    @JsonProperty("WOScheduledDate")
	public Date getWOScheduledDate() {
		return WOScheduledDate;
	}

	public void setWOScheduledDate(Date WOScheduledDate) {
		this.WOScheduledDate = WOScheduledDate;
	}

    @JsonProperty("WOLunchingProductionDate")
	public Date getWOLunchingProductionDate() {
		return WOLunchingProductionDate;
	}

	public void setWOLunchingProductionDate(Date WOLunchingProductionDate) {
		this.WOLunchingProductionDate = WOLunchingProductionDate;
	}

    @JsonProperty("WOFinishingDate")
	public Date getWOFinishingDate() {
		return WOFinishingDate;
	}

	public void setWOFinishingDate(Date WOFinishingDate) {
		this.WOFinishingDate = WOFinishingDate;
	}

    @JsonProperty("WOCalculationDate")
	public Date getWOCalculationDate() {
		return WOCalculationDate;
	}

	public void setWOCalculationDate(Date WOCalculationDate) {
		this.WOCalculationDate = WOCalculationDate;
	}

    @JsonProperty("WOLuanchedQuantity")
	public int getWOLuanchedQuantity() {
		return WOLuanchedQuantity;
	}

	public void setWOLuanchedQuantity(int WOLuanchedQuantity) {
		this.WOLuanchedQuantity = WOLuanchedQuantity;
	}

    @JsonProperty("WOAcceptedQuantity")
	public int getWOAcceptedQuantity() {
		return WOAcceptedQuantity;
	}

	public void setWOAcceptedQuantity(int WOAcceptedQuantity) {
		this.WOAcceptedQuantity = WOAcceptedQuantity;
	}

    @JsonProperty("WORejectedQuantity")
	public int getWORejectedQuantity() {
		return WORejectedQuantity;
	}

	public void setWORejectedQuantity(int WORejectedQuantity) {
		this.WORejectedQuantity = WORejectedQuantity;
	}

    @JsonProperty("WOZanovljenaQuantity")
	public int getWOZanovljenaQuantity() {
		return WOZanovljenaQuantity;
	}

	public void setWOZanovljenaQuantity(int WOZanovljenaQuantity) {
		this.WOZanovljenaQuantity = WOZanovljenaQuantity;
	}

    @JsonProperty("WOCalculationStatus")
	public int getWOCalculationStatus() {
		return WOCalculationStatus;
	}

	public void setWOCalculationStatus(int WOCalculationStatus) {
		this.WOCalculationStatus = WOCalculationStatus;
	}

    @JsonProperty("WOPrintingStatus")
	public String getWOPrintingStatus() {
		return WOPrintingStatus;
	}

	public void setWOPrintingStatus(String WOPrintingStatus) {
		this.WOPrintingStatus = WOPrintingStatus;
	}

    @JsonProperty("WOCurrentNumber")
	public int getWOCurrentNumber() {
		return WOCurrentNumber;
	}

	public void setWOCurrentNumber(int WOCurrentNumber) {
		this.WOCurrentNumber = WOCurrentNumber;
	}

    @JsonProperty("WOPrintingReceipt")
	public int getWOPrintingReceipt() {
		return WOPrintingReceipt;
	}

	public void setWOPrintingReceipt(int WOPrintingReceipt) {
		this.WOPrintingReceipt = WOPrintingReceipt;
	}

    @JsonProperty("WOTransferredMaterial")
	public int getWOTransferredMaterial() {
		return WOTransferredMaterial;
	}

	public void setWOTransferredMaterial(int WOTransferredMaterial) {
		this.WOTransferredMaterial = WOTransferredMaterial;
	}

    @JsonProperty("WOSellingPrice")
	public double getWOSellingPrice() {
		return WOSellingPrice;
	}

	public void setWOSellingPrice(double WOSellingPrice) {
		this.WOSellingPrice = WOSellingPrice;
	}

    @JsonProperty("WOLansiranaKnjigovodstvena")
	public int getWOLansiranaKnjigovodstvena() {
		return WOLansiranaKnjigovodstvena;
	}

	public void setWOLansiranaKnjigovodstvena(int WOLansiranaKnjigovodstvena) {
		this.WOLansiranaKnjigovodstvena = WOLansiranaKnjigovodstvena;
	}

    @JsonProperty("WOPrescribedQuantity")
	public int getWOPrescribedQuantity() {
		return WOPrescribedQuantity;
	}

	public void setWOPrescribedQuantity(int WOPrescribedQuantity) {
		this.WOPrescribedQuantity = WOPrescribedQuantity;
	}

    @JsonProperty("WOClosed")
	public String getWOClosed() {
		return WOClosed;
	}

	public void setWOClosed(String WOClosed) {
		this.WOClosed = WOClosed;
	}

    @JsonProperty("WOTechnologicalProcessType")
	public String getWOTechnologicalProcessType() {
		return WOTechnologicalProcessType;
	}

	public void setWOTechnologicalProcessType(String WOTechnologicalProcessType) {
		this.WOTechnologicalProcessType = WOTechnologicalProcessType;
	}

    @JsonProperty("WOMarketStatus")
	public String getWOMarketStatus() {
		return WOMarketStatus;
	}

	public void setWOMarketStatus(String WOMarketStatus) {
		this.WOMarketStatus = WOMarketStatus;
	}

    @JsonProperty("WOPriorityStatus")
	public int getWOPriorityStatus() {
		return WOPriorityStatus;
	}

	public void setWOPriorityStatus(int WOPriorityStatus) {
		this.WOPriorityStatus = WOPriorityStatus;
	}

    @JsonProperty("WOLucnhedDocumentStatus")
	public String getWOLucnhedDocumentStatus() {
		return WOLucnhedDocumentStatus;
	}

	public void setWOLucnhedDocumentStatus(String WOLucnhedDocumentStatus) {
		this.WOLucnhedDocumentStatus = WOLucnhedDocumentStatus;
	}

    @JsonProperty("WODirectLaborCost")
	public double getWODirectLaborCost() {
		return WODirectLaborCost;
	}

	public void setWODirectLaborCost(double WODirectLaborCost) {
		this.WODirectLaborCost = WODirectLaborCost;
	}

    @JsonProperty("WOEffectiveOperatingTime")
	public int getWOEffectiveOperatingTime() {
		return WOEffectiveOperatingTime;
	}

	public void setWOEffectiveOperatingTime(int WOEffectiveOperatingTime) {
		this.WOEffectiveOperatingTime = WOEffectiveOperatingTime;
	}

    @JsonProperty("WOStandardizedOperatingTime")
	public int getWOStandardizedOperatingTime() {
		return WOStandardizedOperatingTime;
	}

	public void setWOStandardizedOperatingTime(int WOStandardizedOperatingTime) {
		this.WOStandardizedOperatingTime = WOStandardizedOperatingTime;
	}

    @JsonProperty("WODirectMaterialCost")
	public double getWODirectMaterialCost() {
		return WODirectMaterialCost;
	}

	public void setWODirectMaterialCost(double WODirectMaterialCost) {
		this.WODirectMaterialCost = WODirectMaterialCost;
	}

    @JsonProperty("WOServiceCost")
	public double getWOServiceCost() {
		return WOServiceCost;
	}

	public void setWOServiceCost(double WOServiceCost) {
		this.WOServiceCost = WOServiceCost;
	}

    @JsonProperty("WOGeneralCost")
	public char getWOGeneralCost() {
		return WOGeneralCost;
	}

	public void setWOGeneralCost(char WOGeneralCost) {
		this.WOGeneralCost = WOGeneralCost;
	}

    @JsonProperty("WOGeneralMaterialCost")
	public double getWOGeneralMaterialCost() {
		return WOGeneralMaterialCost;
	}

	public void setWOGeneralMaterialCost(double WOGeneralMaterialCost) {
		this.WOGeneralMaterialCost = WOGeneralMaterialCost;
	}

    @JsonProperty("WOInvoicingStatus")
	public String getWOInvoicingStatus() {
		return WOInvoicingStatus;
	}

	public void setWOInvoicingStatus(String WOInvoicingStatus) {
		this.WOInvoicingStatus = WOInvoicingStatus;
	}

    @JsonProperty("WOImplementationValue")
	public int getWOImplementationValue() {
		return WOImplementationValue;
	}

	public void setWOImplementationValue(int WOImplementationValue) {
		this.WOImplementationValue = WOImplementationValue;
	}

    @JsonProperty("TISDesignation")
	public char getTISDesignation() {
		return TISDesignation;
	}

	public void setTISDesignation(char TISDesignation) {
		this.TISDesignation = TISDesignation;
	}


    @JsonProperty("productStatus")
	public ProductStatusBean getProductStatus() {
		return productStatus;
	}

    public void setProductStatus(ProductStatusBean productStatus) {
		this.productStatus = productStatus;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("tangibleItemStatus")
	public TangibleItemStatusBean getTangibleItemStatus() {
		return tangibleItemStatus;
	}

    public void setTangibleItemStatus(TangibleItemStatusBean tangibleItemStatus) {
		this.tangibleItemStatus = tangibleItemStatus;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("productionUnit")
	public OrganizationUnitBean getProductionUnit() {
		return productionUnit;
	}

    public void setProductionUnit(OrganizationUnitBean productionUnit) {
		this.productionUnit = productionUnit;
	}

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("procurementRequestHeadings")
	public Set<ProcurementRequestHeadingBean> getProcurementRequestHeadings() {
		return procurementRequestHeadings;
	}

	public void setProcurementRequestHeadings(Set<ProcurementRequestHeadingBean> procurementRequestHeadings) {
		this.procurementRequestHeadings = procurementRequestHeadings;
	}

    @JsonProperty("requisitions")
	public Set<RequisitionBean> getRequisitions() {
		return requisitions;
	}

	public void setRequisitions(Set<RequisitionBean> requisitions) {
		this.requisitions = requisitions;
	}

    @JsonProperty("deliveryNotes")
	public Set<DeliveryNoteBean> getDeliveryNotes() {
		return deliveryNotes;
	}

	public void setDeliveryNotes(Set<DeliveryNoteBean> deliveryNotes) {
		this.deliveryNotes = deliveryNotes;
	}

    @JsonProperty("materialReturnNotes")
	public Set<MaterialReturnNoteBean> getMaterialReturnNotes() {
		return materialReturnNotes;
	}

	public void setMaterialReturnNotes(Set<MaterialReturnNoteBean> materialReturnNotes) {
		this.materialReturnNotes = materialReturnNotes;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof WorkOrderBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((WorkOrderBean) o).getId()));
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
		return "WorkOrderBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", WOCode=" + WOCode
			+ ", WOCreationDate=" + WOCreationDate
			+ ", WOScheduledDate=" + WOScheduledDate
			+ ", WOLunchingProductionDate=" + WOLunchingProductionDate
			+ ", WOFinishingDate=" + WOFinishingDate
			+ ", WOCalculationDate=" + WOCalculationDate
			+ ", WOLuanchedQuantity=" + WOLuanchedQuantity
			+ ", WOAcceptedQuantity=" + WOAcceptedQuantity
			+ ", WORejectedQuantity=" + WORejectedQuantity
			+ ", WOZanovljenaQuantity=" + WOZanovljenaQuantity
			+ ", WOCalculationStatus=" + WOCalculationStatus
			+ ", WOPrintingStatus=" + WOPrintingStatus
			+ ", WOCurrentNumber=" + WOCurrentNumber
			+ ", WOPrintingReceipt=" + WOPrintingReceipt
			+ ", WOTransferredMaterial=" + WOTransferredMaterial
			+ ", WOSellingPrice=" + WOSellingPrice
			+ ", WOLansiranaKnjigovodstvena=" + WOLansiranaKnjigovodstvena
			+ ", WOPrescribedQuantity=" + WOPrescribedQuantity
			+ ", WOClosed=" + WOClosed
			+ ", WOTechnologicalProcessType=" + WOTechnologicalProcessType
			+ ", WOMarketStatus=" + WOMarketStatus
			+ ", WOPriorityStatus=" + WOPriorityStatus
			+ ", WOLucnhedDocumentStatus=" + WOLucnhedDocumentStatus
			+ ", WODirectLaborCost=" + WODirectLaborCost
			+ ", WOEffectiveOperatingTime=" + WOEffectiveOperatingTime
			+ ", WOStandardizedOperatingTime=" + WOStandardizedOperatingTime
			+ ", WODirectMaterialCost=" + WODirectMaterialCost
			+ ", WOServiceCost=" + WOServiceCost
			+ ", WOGeneralCost=" + WOGeneralCost
			+ ", WOGeneralMaterialCost=" + WOGeneralMaterialCost
			+ ", WOInvoicingStatus=" + WOInvoicingStatus
			+ ", WOImplementationValue=" + WOImplementationValue
			+ ", TISDesignation=" + TISDesignation
			// + ", productStatus=" + productStatus
			// + ", organizationUnit=" + organizationUnit
			// + ", stockroom=" + stockroom
			// + ", tangibleItemStatus=" + tangibleItemStatus
			// + ", identification=" + identification
			// + ", productionUnit=" + productionUnit
			// + ", documentType=" + documentType
			// + ", procurementRequestHeadings=" + procurementRequestHeadings
			// + ", requisitions=" + requisitions
			// + ", deliveryNotes=" + deliveryNotes
			// + ", materialReturnNotes=" + materialReturnNotes
			+ "]";
	}
}