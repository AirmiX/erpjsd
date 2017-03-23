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
import com.doobgroup.server.entities.stockmanagement.DeliveryNoteItemBean;

@Entity
@Table(name = "DELIVERYNOTE"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "DNDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE DELIVERYNOTE SET deleted = 1 WHERE DeliveryNote_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class DeliveryNoteBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DeliveryNote_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "DNDocumentNumber", nullable = false)
	protected int DNDocumentNumber;
	@Column(name = "DNDeliveryDate", nullable = false)
	protected Date DNDeliveryDate;
	@Column(name = "DNApprovalDate")
	protected Date DNApprovalDate;
	@Column(name = "DNStornoDocumentNumber")
	protected int DNStornoDocumentNumber;
	@Column(name = "DNDocumentStatus", nullable = false)
	protected int DNDocumentStatus;
	@Column(name = "DNPrintDate")
	protected Date DNPrintDate;
	@Column(name = "DNPostingDate")
	protected Date DNPostingDate;
	@Column(name = "DNPrintTransactionLog")
	protected int DNPrintTransactionLog;
	@Column(name = "DNOldDocument")
	protected String DNOldDocument;
	@Column(name = "DNPrintStatus")
	protected int DNPrintStatus;

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
    @OneToMany(mappedBy = "deliveryNote", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<DeliveryNoteItemBean> deliveryNoteItems = new HashSet<DeliveryNoteItemBean>();

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

    @JsonProperty("DNDocumentNumber")
	public int getDNDocumentNumber() {
		return DNDocumentNumber;
	}

	public void setDNDocumentNumber(int DNDocumentNumber) {
		this.DNDocumentNumber = DNDocumentNumber;
	}

    @JsonProperty("DNDeliveryDate")
	public Date getDNDeliveryDate() {
		return DNDeliveryDate;
	}

	public void setDNDeliveryDate(Date DNDeliveryDate) {
		this.DNDeliveryDate = DNDeliveryDate;
	}

    @JsonProperty("DNApprovalDate")
	public Date getDNApprovalDate() {
		return DNApprovalDate;
	}

	public void setDNApprovalDate(Date DNApprovalDate) {
		this.DNApprovalDate = DNApprovalDate;
	}

    @JsonProperty("DNStornoDocumentNumber")
	public int getDNStornoDocumentNumber() {
		return DNStornoDocumentNumber;
	}

	public void setDNStornoDocumentNumber(int DNStornoDocumentNumber) {
		this.DNStornoDocumentNumber = DNStornoDocumentNumber;
	}

    @JsonProperty("DNDocumentStatus")
	public int getDNDocumentStatus() {
		return DNDocumentStatus;
	}

	public void setDNDocumentStatus(int DNDocumentStatus) {
		this.DNDocumentStatus = DNDocumentStatus;
	}

    @JsonProperty("DNPrintDate")
	public Date getDNPrintDate() {
		return DNPrintDate;
	}

	public void setDNPrintDate(Date DNPrintDate) {
		this.DNPrintDate = DNPrintDate;
	}

    @JsonProperty("DNPostingDate")
	public Date getDNPostingDate() {
		return DNPostingDate;
	}

	public void setDNPostingDate(Date DNPostingDate) {
		this.DNPostingDate = DNPostingDate;
	}

    @JsonProperty("DNPrintTransactionLog")
	public int getDNPrintTransactionLog() {
		return DNPrintTransactionLog;
	}

	public void setDNPrintTransactionLog(int DNPrintTransactionLog) {
		this.DNPrintTransactionLog = DNPrintTransactionLog;
	}

    @JsonProperty("DNOldDocument")
	public String getDNOldDocument() {
		return DNOldDocument;
	}

	public void setDNOldDocument(String DNOldDocument) {
		this.DNOldDocument = DNOldDocument;
	}

    @JsonProperty("DNPrintStatus")
	public int getDNPrintStatus() {
		return DNPrintStatus;
	}

	public void setDNPrintStatus(int DNPrintStatus) {
		this.DNPrintStatus = DNPrintStatus;
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

    @JsonProperty("deliveryNoteItems")
	public Set<DeliveryNoteItemBean> getDeliveryNoteItems() {
		return deliveryNoteItems;
	}

	public void setDeliveryNoteItems(Set<DeliveryNoteItemBean> deliveryNoteItems) {
		this.deliveryNoteItems = deliveryNoteItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof DeliveryNoteBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((DeliveryNoteBean) o).getId()));
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
		return "DeliveryNoteBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", DNDocumentNumber=" + DNDocumentNumber
			+ ", DNDeliveryDate=" + DNDeliveryDate
			+ ", DNApprovalDate=" + DNApprovalDate
			+ ", DNStornoDocumentNumber=" + DNStornoDocumentNumber
			+ ", DNDocumentStatus=" + DNDocumentStatus
			+ ", DNPrintDate=" + DNPrintDate
			+ ", DNPostingDate=" + DNPostingDate
			+ ", DNPrintTransactionLog=" + DNPrintTransactionLog
			+ ", DNOldDocument=" + DNOldDocument
			+ ", DNPrintStatus=" + DNPrintStatus
			// + ", organizationUnit=" + organizationUnit
			// + ", stockroom=" + stockroom
			// + ", documentType=" + documentType
			// + ", workOrder=" + workOrder
			// + ", deliveryNoteItems=" + deliveryNoteItems
			+ "]";
	}
}