package com.doobgroup.server.entities.renaming;

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
import com.doobgroup.server.entities.corporation.AccountBean;
import com.doobgroup.server.entities.stockmanagement.PriceDesignationBean;
import com.doobgroup.server.entities.renaming.RenamingBean;

@Entity
@Table(name = "RENAMINGITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "RIOrdinalNumber"  ,  "renaming"  	}))
@SQLDelete(sql="UPDATE RENAMINGITEM SET deleted = 1 WHERE RenamingItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class RenamingItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "RenamingItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "RIOrdinalNumber", nullable = false)
	protected int RIOrdinalNumber;
	@Column(name = "RIMeasurementUnitInput", nullable = false)
	protected String RIMeasurementUnitInput;
	@Column(name = "RIMeasurementUnitOutput", nullable = false)
	protected String RIMeasurementUnitOutput;
	@Column(name = "RIQuantityForTransfer", nullable = false)
	protected int RIQuantityForTransfer;
	@Column(name = "RIAddressOutput", nullable = false)
	protected String RIAddressOutput;
	@Column(name = "RIBatchOutput")
	protected String RIBatchOutput;
	@Column(name = "RIAddressInput")
	protected String RIAddressInput;
	@Column(name = "RIBatchInput")
	protected String RIBatchInput;
	@Column(name = "RIStorno")
	protected String RIStorno;
	@Column(name = "RIQuantityTransfered")
	protected int RIQuantityTransfered;
	@Column(name = "RIPriceOutput")
	protected int RIPriceOutput;
	@Column(name = "RIPriceInput")
	protected int RIPriceInput;
	@Column(name = "RIValueOutput")
	protected int RIValueOutput;
	@Column(name = "RIValueInput")
	protected int RIValueInput;
	@Column(name = "RIPostingPositionInput")
	protected int RIPostingPositionInput;
	@Column(name = "RIPostingPositionOutput")
	protected int RIPostingPositionOutput;
	@Column(name = "RIPostingDate")
	protected Date RIPostingDate;
	@Column(name = "RIAmmountAfterPostingInput")
	protected int RIAmmountAfterPostingInput;
	@Column(name = "RIAmmountAfterPostingOutput")
	protected int RIAmmountAfterPostingOutput;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identificationOutput")
    protected IdentificationBean identificationOutput;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identificationInput")
    protected IdentificationBean identificationInput;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="accountOutput")
    protected AccountBean accountOutput;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="priceDesignationOutput")
    protected PriceDesignationBean priceDesignationOutput;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="accountInput")
    protected AccountBean accountInput;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="priceDesignationInput")
    protected PriceDesignationBean priceDesignationInput;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="renaming")
    protected RenamingBean renaming;

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

    @JsonProperty("RIOrdinalNumber")
	public int getRIOrdinalNumber() {
		return RIOrdinalNumber;
	}

	public void setRIOrdinalNumber(int RIOrdinalNumber) {
		this.RIOrdinalNumber = RIOrdinalNumber;
	}

    @JsonProperty("RIMeasurementUnitInput")
	public String getRIMeasurementUnitInput() {
		return RIMeasurementUnitInput;
	}

	public void setRIMeasurementUnitInput(String RIMeasurementUnitInput) {
		this.RIMeasurementUnitInput = RIMeasurementUnitInput;
	}

    @JsonProperty("RIMeasurementUnitOutput")
	public String getRIMeasurementUnitOutput() {
		return RIMeasurementUnitOutput;
	}

	public void setRIMeasurementUnitOutput(String RIMeasurementUnitOutput) {
		this.RIMeasurementUnitOutput = RIMeasurementUnitOutput;
	}

    @JsonProperty("RIQuantityForTransfer")
	public int getRIQuantityForTransfer() {
		return RIQuantityForTransfer;
	}

	public void setRIQuantityForTransfer(int RIQuantityForTransfer) {
		this.RIQuantityForTransfer = RIQuantityForTransfer;
	}

    @JsonProperty("RIAddressOutput")
	public String getRIAddressOutput() {
		return RIAddressOutput;
	}

	public void setRIAddressOutput(String RIAddressOutput) {
		this.RIAddressOutput = RIAddressOutput;
	}

    @JsonProperty("RIBatchOutput")
	public String getRIBatchOutput() {
		return RIBatchOutput;
	}

	public void setRIBatchOutput(String RIBatchOutput) {
		this.RIBatchOutput = RIBatchOutput;
	}

    @JsonProperty("RIAddressInput")
	public String getRIAddressInput() {
		return RIAddressInput;
	}

	public void setRIAddressInput(String RIAddressInput) {
		this.RIAddressInput = RIAddressInput;
	}

    @JsonProperty("RIBatchInput")
	public String getRIBatchInput() {
		return RIBatchInput;
	}

	public void setRIBatchInput(String RIBatchInput) {
		this.RIBatchInput = RIBatchInput;
	}

    @JsonProperty("RIStorno")
	public String getRIStorno() {
		return RIStorno;
	}

	public void setRIStorno(String RIStorno) {
		this.RIStorno = RIStorno;
	}

    @JsonProperty("RIQuantityTransfered")
	public int getRIQuantityTransfered() {
		return RIQuantityTransfered;
	}

	public void setRIQuantityTransfered(int RIQuantityTransfered) {
		this.RIQuantityTransfered = RIQuantityTransfered;
	}

    @JsonProperty("RIPriceOutput")
	public int getRIPriceOutput() {
		return RIPriceOutput;
	}

	public void setRIPriceOutput(int RIPriceOutput) {
		this.RIPriceOutput = RIPriceOutput;
	}

    @JsonProperty("RIPriceInput")
	public int getRIPriceInput() {
		return RIPriceInput;
	}

	public void setRIPriceInput(int RIPriceInput) {
		this.RIPriceInput = RIPriceInput;
	}

    @JsonProperty("RIValueOutput")
	public int getRIValueOutput() {
		return RIValueOutput;
	}

	public void setRIValueOutput(int RIValueOutput) {
		this.RIValueOutput = RIValueOutput;
	}

    @JsonProperty("RIValueInput")
	public int getRIValueInput() {
		return RIValueInput;
	}

	public void setRIValueInput(int RIValueInput) {
		this.RIValueInput = RIValueInput;
	}

    @JsonProperty("RIPostingPositionInput")
	public int getRIPostingPositionInput() {
		return RIPostingPositionInput;
	}

	public void setRIPostingPositionInput(int RIPostingPositionInput) {
		this.RIPostingPositionInput = RIPostingPositionInput;
	}

    @JsonProperty("RIPostingPositionOutput")
	public int getRIPostingPositionOutput() {
		return RIPostingPositionOutput;
	}

	public void setRIPostingPositionOutput(int RIPostingPositionOutput) {
		this.RIPostingPositionOutput = RIPostingPositionOutput;
	}

    @JsonProperty("RIPostingDate")
	public Date getRIPostingDate() {
		return RIPostingDate;
	}

	public void setRIPostingDate(Date RIPostingDate) {
		this.RIPostingDate = RIPostingDate;
	}

    @JsonProperty("RIAmmountAfterPostingInput")
	public int getRIAmmountAfterPostingInput() {
		return RIAmmountAfterPostingInput;
	}

	public void setRIAmmountAfterPostingInput(int RIAmmountAfterPostingInput) {
		this.RIAmmountAfterPostingInput = RIAmmountAfterPostingInput;
	}

    @JsonProperty("RIAmmountAfterPostingOutput")
	public int getRIAmmountAfterPostingOutput() {
		return RIAmmountAfterPostingOutput;
	}

	public void setRIAmmountAfterPostingOutput(int RIAmmountAfterPostingOutput) {
		this.RIAmmountAfterPostingOutput = RIAmmountAfterPostingOutput;
	}


    @JsonProperty("identificationOutput")
	public IdentificationBean getIdentificationOutput() {
		return identificationOutput;
	}

    public void setIdentificationOutput(IdentificationBean identificationOutput) {
		this.identificationOutput = identificationOutput;
	}

    @JsonProperty("identificationInput")
	public IdentificationBean getIdentificationInput() {
		return identificationInput;
	}

    public void setIdentificationInput(IdentificationBean identificationInput) {
		this.identificationInput = identificationInput;
	}

    @JsonProperty("accountOutput")
	public AccountBean getAccountOutput() {
		return accountOutput;
	}

    public void setAccountOutput(AccountBean accountOutput) {
		this.accountOutput = accountOutput;
	}

    @JsonProperty("priceDesignationOutput")
	public PriceDesignationBean getPriceDesignationOutput() {
		return priceDesignationOutput;
	}

    public void setPriceDesignationOutput(PriceDesignationBean priceDesignationOutput) {
		this.priceDesignationOutput = priceDesignationOutput;
	}

    @JsonProperty("accountInput")
	public AccountBean getAccountInput() {
		return accountInput;
	}

    public void setAccountInput(AccountBean accountInput) {
		this.accountInput = accountInput;
	}

    @JsonProperty("priceDesignationInput")
	public PriceDesignationBean getPriceDesignationInput() {
		return priceDesignationInput;
	}

    public void setPriceDesignationInput(PriceDesignationBean priceDesignationInput) {
		this.priceDesignationInput = priceDesignationInput;
	}

    @JsonProperty("renaming")
	public RenamingBean getRenaming() {
		return renaming;
	}

    public void setRenaming(RenamingBean renaming) {
		this.renaming = renaming;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof RenamingItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((RenamingItemBean) o).getId()));
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
		return "RenamingItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", RIOrdinalNumber=" + RIOrdinalNumber
			+ ", RIMeasurementUnitInput=" + RIMeasurementUnitInput
			+ ", RIMeasurementUnitOutput=" + RIMeasurementUnitOutput
			+ ", RIQuantityForTransfer=" + RIQuantityForTransfer
			+ ", RIAddressOutput=" + RIAddressOutput
			+ ", RIBatchOutput=" + RIBatchOutput
			+ ", RIAddressInput=" + RIAddressInput
			+ ", RIBatchInput=" + RIBatchInput
			+ ", RIStorno=" + RIStorno
			+ ", RIQuantityTransfered=" + RIQuantityTransfered
			+ ", RIPriceOutput=" + RIPriceOutput
			+ ", RIPriceInput=" + RIPriceInput
			+ ", RIValueOutput=" + RIValueOutput
			+ ", RIValueInput=" + RIValueInput
			+ ", RIPostingPositionInput=" + RIPostingPositionInput
			+ ", RIPostingPositionOutput=" + RIPostingPositionOutput
			+ ", RIPostingDate=" + RIPostingDate
			+ ", RIAmmountAfterPostingInput=" + RIAmmountAfterPostingInput
			+ ", RIAmmountAfterPostingOutput=" + RIAmmountAfterPostingOutput
			// + ", identificationOutput=" + identificationOutput
			// + ", identificationInput=" + identificationInput
			// + ", accountOutput=" + accountOutput
			// + ", priceDesignationOutput=" + priceDesignationOutput
			// + ", accountInput=" + accountInput
			// + ", priceDesignationInput=" + priceDesignationInput
			// + ", renaming=" + renaming
			+ "]";
	}
}