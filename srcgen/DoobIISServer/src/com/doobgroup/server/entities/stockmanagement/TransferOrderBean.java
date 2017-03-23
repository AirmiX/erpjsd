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
import com.doobgroup.server.entities.logical.TransferOrderItemBean;

@Entity
@Table(name = "TRANSFERORDER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TODocumentNumber"  ,  "documentType"  	}))
@SQLDelete(sql="UPDATE TRANSFERORDER SET deleted = 1 WHERE TransferOrder_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TransferOrderBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TransferOrder_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TODocumentNumber", nullable = false)
	protected int TODocumentNumber;
	@Column(name = "TOIssuanceDate", nullable = false)
	protected Date TOIssuanceDate;
	@Column(name = "TOStornoDocumentNumber")
	protected int TOStornoDocumentNumber;
	@Column(name = "TODocumentStatus", nullable = false)
	protected int TODocumentStatus;
	@Column(name = "TOPrintStatus", nullable = false)
	protected int TOPrintStatus;
	@Column(name = "TOOldDocument")
	protected String TOOldDocument;
	@Column(name = "TOTransactionLogPrint")
	protected int TOTransactionLogPrint;
	@Column(name = "TOLogNumber")
	protected int TOLogNumber;
	@Column(name = "TOForFixedAssets")
	protected String TOForFixedAssets;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="documentType")
    protected DocumentTypeBean documentType;
    @OneToMany(mappedBy = "transferOrder", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<TransferOrderItemBean> transferOrderItems = new HashSet<TransferOrderItemBean>();

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

    @JsonProperty("TODocumentNumber")
	public int getTODocumentNumber() {
		return TODocumentNumber;
	}

	public void setTODocumentNumber(int TODocumentNumber) {
		this.TODocumentNumber = TODocumentNumber;
	}

    @JsonProperty("TOIssuanceDate")
	public Date getTOIssuanceDate() {
		return TOIssuanceDate;
	}

	public void setTOIssuanceDate(Date TOIssuanceDate) {
		this.TOIssuanceDate = TOIssuanceDate;
	}

    @JsonProperty("TOStornoDocumentNumber")
	public int getTOStornoDocumentNumber() {
		return TOStornoDocumentNumber;
	}

	public void setTOStornoDocumentNumber(int TOStornoDocumentNumber) {
		this.TOStornoDocumentNumber = TOStornoDocumentNumber;
	}

    @JsonProperty("TODocumentStatus")
	public int getTODocumentStatus() {
		return TODocumentStatus;
	}

	public void setTODocumentStatus(int TODocumentStatus) {
		this.TODocumentStatus = TODocumentStatus;
	}

    @JsonProperty("TOPrintStatus")
	public int getTOPrintStatus() {
		return TOPrintStatus;
	}

	public void setTOPrintStatus(int TOPrintStatus) {
		this.TOPrintStatus = TOPrintStatus;
	}

    @JsonProperty("TOOldDocument")
	public String getTOOldDocument() {
		return TOOldDocument;
	}

	public void setTOOldDocument(String TOOldDocument) {
		this.TOOldDocument = TOOldDocument;
	}

    @JsonProperty("TOTransactionLogPrint")
	public int getTOTransactionLogPrint() {
		return TOTransactionLogPrint;
	}

	public void setTOTransactionLogPrint(int TOTransactionLogPrint) {
		this.TOTransactionLogPrint = TOTransactionLogPrint;
	}

    @JsonProperty("TOLogNumber")
	public int getTOLogNumber() {
		return TOLogNumber;
	}

	public void setTOLogNumber(int TOLogNumber) {
		this.TOLogNumber = TOLogNumber;
	}

    @JsonProperty("TOForFixedAssets")
	public String getTOForFixedAssets() {
		return TOForFixedAssets;
	}

	public void setTOForFixedAssets(String TOForFixedAssets) {
		this.TOForFixedAssets = TOForFixedAssets;
	}


    @JsonProperty("documentType")
	public DocumentTypeBean getDocumentType() {
		return documentType;
	}

    public void setDocumentType(DocumentTypeBean documentType) {
		this.documentType = documentType;
	}

    @JsonProperty("transferOrderItems")
	public Set<TransferOrderItemBean> getTransferOrderItems() {
		return transferOrderItems;
	}

	public void setTransferOrderItems(Set<TransferOrderItemBean> transferOrderItems) {
		this.transferOrderItems = transferOrderItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TransferOrderBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TransferOrderBean) o).getId()));
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
		return "TransferOrderBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TODocumentNumber=" + TODocumentNumber
			+ ", TOIssuanceDate=" + TOIssuanceDate
			+ ", TOStornoDocumentNumber=" + TOStornoDocumentNumber
			+ ", TODocumentStatus=" + TODocumentStatus
			+ ", TOPrintStatus=" + TOPrintStatus
			+ ", TOOldDocument=" + TOOldDocument
			+ ", TOTransactionLogPrint=" + TOTransactionLogPrint
			+ ", TOLogNumber=" + TOLogNumber
			+ ", TOForFixedAssets=" + TOForFixedAssets
			// + ", documentType=" + documentType
			// + ", transferOrderItems=" + transferOrderItems
			+ "]";
	}
}