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

import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.stockmanagement.MaterialReturnNoteItemBean;

@Entity
@Table(name = "MATERIALRETURNNOTE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "MRNDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE MATERIALRETURNNOTE SET deleted = 1 WHERE MaterialReturnNote_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class MaterialReturnNoteBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "MaterialReturnNote_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "MRNDocumentNumber", nullable = false)
	protected int MRNDocumentNumber;
	@Column(name = "MRNOldDocument")
	protected String MRNOldDocument;
	@Column(name = "MRNIssuanceDate", nullable = false)
	protected Date MRNIssuanceDate;
	@Column(name = "MRNDocumentStatus", nullable = false)
	protected int MRNDocumentStatus;
	@Column(name = "MRNRequisitionNumber")
	protected int MRNRequisitionNumber;
	@Column(name = "MRNStornoDocumentNumber")
	protected int MRNStornoDocumentNumber;
	@Column(name = "MRNPrintStatus", nullable = false)
	protected int MRNPrintStatus;
	@Column(name = "MRNTransactionLogPrint", nullable = false)
	protected int MRNTransactionLogPrint;
	@Column(name = "MRNLogNumber")
	protected int MRNLogNumber;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workOrder")
    protected WorkOrderBean workOrder;
    @OneToMany(mappedBy = "materialReturnNote", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<MaterialReturnNoteItemBean> materialReturnNoteItems = new HashSet<MaterialReturnNoteItemBean>();

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

    @JsonProperty("MRNDocumentNumber")
	public int getMRNDocumentNumber() {
		return MRNDocumentNumber;
	}

	public void setMRNDocumentNumber(int MRNDocumentNumber) {
		this.MRNDocumentNumber = MRNDocumentNumber;
	}

    @JsonProperty("MRNOldDocument")
	public String getMRNOldDocument() {
		return MRNOldDocument;
	}

	public void setMRNOldDocument(String MRNOldDocument) {
		this.MRNOldDocument = MRNOldDocument;
	}

    @JsonProperty("MRNIssuanceDate")
	public Date getMRNIssuanceDate() {
		return MRNIssuanceDate;
	}

	public void setMRNIssuanceDate(Date MRNIssuanceDate) {
		this.MRNIssuanceDate = MRNIssuanceDate;
	}

    @JsonProperty("MRNDocumentStatus")
	public int getMRNDocumentStatus() {
		return MRNDocumentStatus;
	}

	public void setMRNDocumentStatus(int MRNDocumentStatus) {
		this.MRNDocumentStatus = MRNDocumentStatus;
	}

    @JsonProperty("MRNRequisitionNumber")
	public int getMRNRequisitionNumber() {
		return MRNRequisitionNumber;
	}

	public void setMRNRequisitionNumber(int MRNRequisitionNumber) {
		this.MRNRequisitionNumber = MRNRequisitionNumber;
	}

    @JsonProperty("MRNStornoDocumentNumber")
	public int getMRNStornoDocumentNumber() {
		return MRNStornoDocumentNumber;
	}

	public void setMRNStornoDocumentNumber(int MRNStornoDocumentNumber) {
		this.MRNStornoDocumentNumber = MRNStornoDocumentNumber;
	}

    @JsonProperty("MRNPrintStatus")
	public int getMRNPrintStatus() {
		return MRNPrintStatus;
	}

	public void setMRNPrintStatus(int MRNPrintStatus) {
		this.MRNPrintStatus = MRNPrintStatus;
	}

    @JsonProperty("MRNTransactionLogPrint")
	public int getMRNTransactionLogPrint() {
		return MRNTransactionLogPrint;
	}

	public void setMRNTransactionLogPrint(int MRNTransactionLogPrint) {
		this.MRNTransactionLogPrint = MRNTransactionLogPrint;
	}

    @JsonProperty("MRNLogNumber")
	public int getMRNLogNumber() {
		return MRNLogNumber;
	}

	public void setMRNLogNumber(int MRNLogNumber) {
		this.MRNLogNumber = MRNLogNumber;
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

    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("workOrder")
	public WorkOrderBean getWorkOrder() {
		return workOrder;
	}

    public void setWorkOrder(WorkOrderBean workOrder) {
		this.workOrder = workOrder;
	}

    @JsonProperty("materialReturnNoteItems")
	public Set<MaterialReturnNoteItemBean> getMaterialReturnNoteItems() {
		return materialReturnNoteItems;
	}

	public void setMaterialReturnNoteItems(Set<MaterialReturnNoteItemBean> materialReturnNoteItems) {
		this.materialReturnNoteItems = materialReturnNoteItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof MaterialReturnNoteBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((MaterialReturnNoteBean) o).getId()));
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
		return "MaterialReturnNoteBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", MRNDocumentNumber=" + MRNDocumentNumber
			+ ", MRNOldDocument=" + MRNOldDocument
			+ ", MRNIssuanceDate=" + MRNIssuanceDate
			+ ", MRNDocumentStatus=" + MRNDocumentStatus
			+ ", MRNRequisitionNumber=" + MRNRequisitionNumber
			+ ", MRNStornoDocumentNumber=" + MRNStornoDocumentNumber
			+ ", MRNPrintStatus=" + MRNPrintStatus
			+ ", MRNTransactionLogPrint=" + MRNTransactionLogPrint
			+ ", MRNLogNumber=" + MRNLogNumber
			// + ", organizationUnit=" + organizationUnit
			// + ", stockroom=" + stockroom
			// + ", documentType=" + documentType
			// + ", workOrder=" + workOrder
			// + ", materialReturnNoteItems=" + materialReturnNoteItems
			+ "]";
	}
}