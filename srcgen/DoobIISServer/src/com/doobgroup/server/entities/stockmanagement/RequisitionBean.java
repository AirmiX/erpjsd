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

import com.doobgroup.server.entities.corporation.DocumentTypeBean;
import com.doobgroup.server.entities.corporation.OrganizationUnitBean;
import com.doobgroup.server.entities.initialization.WorkOrderBean;
import com.doobgroup.server.entities.stock.StockroomBean;
import com.doobgroup.server.entities.stockmanagement.RequisitionItemBean;

@Entity
@Table(name = "REQUISITION"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RDocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE REQUISITION SET deleted = 1 WHERE Requisition_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise" })
public class RequisitionBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Requisition_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RDocumentNumber", nullable = false)
	protected int RDocumentNumber;
	@Column(name = "RReservationDate", nullable = false)
	protected Date RReservationDate;
	@Column(name = "RRequisitionDate")
	protected Date RRequisitionDate;
	@Column(name = "RApprovalDate")
	protected Date RApprovalDate;
	@Column(name = "RQuantityLaunched", nullable = false)
	protected int RQuantityLaunched;
	@Column(name = "RStornoDocumentNumber")
	protected int RStornoDocumentNumber;
	@Column(name = "RStatusIndicator", nullable = false)
	protected char RStatusIndicator;
	@Column(name = "RPrintDate", nullable = false)
	protected Date RPrintDate;
	@Column(name = "REntered")
	protected String REntered;
	@Column(name = "RTransactionLogPrint")
	protected int RTransactionLogPrint;
	@Column(name = "ROldDocument")
	protected String ROldDocument;
	@Column(name = "RLogNumber")
	protected int RLogNumber;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workOrder")
    protected WorkOrderBean workOrder;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="stockroom")
    protected StockroomBean stockroom;
    @OneToMany(mappedBy = "requisition", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<RequisitionItemBean> requisitionItems = new HashSet<RequisitionItemBean>();

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

    @JsonProperty("RDocumentNumber")
	public int getRDocumentNumber() {
		return RDocumentNumber;
	}

	public void setRDocumentNumber(int RDocumentNumber) {
		this.RDocumentNumber = RDocumentNumber;
	}

    @JsonProperty("RReservationDate")
	public Date getRReservationDate() {
		return RReservationDate;
	}

	public void setRReservationDate(Date RReservationDate) {
		this.RReservationDate = RReservationDate;
	}

    @JsonProperty("RRequisitionDate")
	public Date getRRequisitionDate() {
		return RRequisitionDate;
	}

	public void setRRequisitionDate(Date RRequisitionDate) {
		this.RRequisitionDate = RRequisitionDate;
	}

    @JsonProperty("RApprovalDate")
	public Date getRApprovalDate() {
		return RApprovalDate;
	}

	public void setRApprovalDate(Date RApprovalDate) {
		this.RApprovalDate = RApprovalDate;
	}

    @JsonProperty("RQuantityLaunched")
	public int getRQuantityLaunched() {
		return RQuantityLaunched;
	}

	public void setRQuantityLaunched(int RQuantityLaunched) {
		this.RQuantityLaunched = RQuantityLaunched;
	}

    @JsonProperty("RStornoDocumentNumber")
	public int getRStornoDocumentNumber() {
		return RStornoDocumentNumber;
	}

	public void setRStornoDocumentNumber(int RStornoDocumentNumber) {
		this.RStornoDocumentNumber = RStornoDocumentNumber;
	}

    @JsonProperty("RStatusIndicator")
	public char getRStatusIndicator() {
		return RStatusIndicator;
	}

	public void setRStatusIndicator(char RStatusIndicator) {
		this.RStatusIndicator = RStatusIndicator;
	}

    @JsonProperty("RPrintDate")
	public Date getRPrintDate() {
		return RPrintDate;
	}

	public void setRPrintDate(Date RPrintDate) {
		this.RPrintDate = RPrintDate;
	}

    @JsonProperty("REntered")
	public String getREntered() {
		return REntered;
	}

	public void setREntered(String REntered) {
		this.REntered = REntered;
	}

    @JsonProperty("RTransactionLogPrint")
	public int getRTransactionLogPrint() {
		return RTransactionLogPrint;
	}

	public void setRTransactionLogPrint(int RTransactionLogPrint) {
		this.RTransactionLogPrint = RTransactionLogPrint;
	}

    @JsonProperty("ROldDocument")
	public String getROldDocument() {
		return ROldDocument;
	}

	public void setROldDocument(String ROldDocument) {
		this.ROldDocument = ROldDocument;
	}

    @JsonProperty("RLogNumber")
	public int getRLogNumber() {
		return RLogNumber;
	}

	public void setRLogNumber(int RLogNumber) {
		this.RLogNumber = RLogNumber;
	}


    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}

    @JsonProperty("workOrder")
	public WorkOrderBean getWorkOrder() {
		return workOrder;
	}

    public void setWorkOrder(WorkOrderBean workOrder) {
		this.workOrder = workOrder;
	}

    @JsonProperty("stockroom")
	public StockroomBean getStockroom() {
		return stockroom;
	}

    public void setStockroom(StockroomBean stockroom) {
		this.stockroom = stockroom;
	}

    @JsonProperty("requisitionItems")
	public Set<RequisitionItemBean> getRequisitionItems() {
		return requisitionItems;
	}

	public void setRequisitionItems(Set<RequisitionItemBean> requisitionItems) {
		this.requisitionItems = requisitionItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RequisitionBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RequisitionBean) o).getId()));
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
		return "RequisitionBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RDocumentNumber=" + RDocumentNumber
			+ ", RReservationDate=" + RReservationDate
			+ ", RRequisitionDate=" + RRequisitionDate
			+ ", RApprovalDate=" + RApprovalDate
			+ ", RQuantityLaunched=" + RQuantityLaunched
			+ ", RStornoDocumentNumber=" + RStornoDocumentNumber
			+ ", RStatusIndicator=" + RStatusIndicator
			+ ", RPrintDate=" + RPrintDate
			+ ", REntered=" + REntered
			+ ", RTransactionLogPrint=" + RTransactionLogPrint
			+ ", ROldDocument=" + ROldDocument
			+ ", RLogNumber=" + RLogNumber
			// + ", documentType=" + documentType
			// + ", organizationUnit=" + organizationUnit
			// + ", workOrder=" + workOrder
			// + ", stockroom=" + stockroom
			// + ", requisitionItems=" + requisitionItems
			+ "]";
	}
}