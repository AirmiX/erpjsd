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

import com.doobgroup.server.entities.initialization.ProcurementPlanHeadingBean;
import com.doobgroup.server.entities.commonbusinessentities.IdentificationBean;
import com.doobgroup.server.entities.initialization.ProcurementRequestItemBean;

@Entity
@Table(name = "PROCUREMENTPLANITEM"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "PPIOrdinalNumber"  ,  "procurementPlanHeading"  	}))
@SQLDelete(sql="UPDATE PROCUREMENTPLANITEM SET deleted = 1 WHERE ProcurementPlanItem_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class ProcurementPlanItemBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProcurementPlanItem_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "PPIOrdinalNumber", nullable = false)
	protected int PPIOrdinalNumber;
	@Column(name = "PPIPlannedQuantity", nullable = false)
	protected int PPIPlannedQuantity;
	@Column(name = "PPIOrderedQuantity", nullable = false)
	protected int PPIOrderedQuantity;
	@Column(name = "PPIRecievedQuantity", nullable = false)
	protected int PPIRecievedQuantity;
	@Column(name = "PPISourceProvider", nullable = false)
	protected String PPISourceProvider;
	@Column(name = "PPIProcurementDeadline")
	protected Date PPIProcurementDeadline;
	@Column(name = "MUIdentificationCode", nullable = false)
	protected int MUIdentificationCode;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="procurementPlanHeading")
    protected ProcurementPlanHeadingBean procurementPlanHeading;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="identification")
    protected IdentificationBean identification;
    @OneToMany(mappedBy = "procurementPlanItem", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<ProcurementRequestItemBean> procurementRequestItems = new HashSet<ProcurementRequestItemBean>();

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

    @JsonProperty("PPIOrdinalNumber")
	public int getPPIOrdinalNumber() {
		return PPIOrdinalNumber;
	}

	public void setPPIOrdinalNumber(int PPIOrdinalNumber) {
		this.PPIOrdinalNumber = PPIOrdinalNumber;
	}

    @JsonProperty("PPIPlannedQuantity")
	public int getPPIPlannedQuantity() {
		return PPIPlannedQuantity;
	}

	public void setPPIPlannedQuantity(int PPIPlannedQuantity) {
		this.PPIPlannedQuantity = PPIPlannedQuantity;
	}

    @JsonProperty("PPIOrderedQuantity")
	public int getPPIOrderedQuantity() {
		return PPIOrderedQuantity;
	}

	public void setPPIOrderedQuantity(int PPIOrderedQuantity) {
		this.PPIOrderedQuantity = PPIOrderedQuantity;
	}

    @JsonProperty("PPIRecievedQuantity")
	public int getPPIRecievedQuantity() {
		return PPIRecievedQuantity;
	}

	public void setPPIRecievedQuantity(int PPIRecievedQuantity) {
		this.PPIRecievedQuantity = PPIRecievedQuantity;
	}

    @JsonProperty("PPISourceProvider")
	public String getPPISourceProvider() {
		return PPISourceProvider;
	}

	public void setPPISourceProvider(String PPISourceProvider) {
		this.PPISourceProvider = PPISourceProvider;
	}

    @JsonProperty("PPIProcurementDeadline")
	public Date getPPIProcurementDeadline() {
		return PPIProcurementDeadline;
	}

	public void setPPIProcurementDeadline(Date PPIProcurementDeadline) {
		this.PPIProcurementDeadline = PPIProcurementDeadline;
	}

    @JsonProperty("MUIdentificationCode")
	public int getMUIdentificationCode() {
		return MUIdentificationCode;
	}

	public void setMUIdentificationCode(int MUIdentificationCode) {
		this.MUIdentificationCode = MUIdentificationCode;
	}


    @JsonProperty("procurementPlanHeading")
	public ProcurementPlanHeadingBean getProcurementPlanHeading() {
		return procurementPlanHeading;
	}

    public void setProcurementPlanHeading(ProcurementPlanHeadingBean procurementPlanHeading) {
		this.procurementPlanHeading = procurementPlanHeading;
	}

    @JsonProperty("identification")
	public IdentificationBean getIdentification() {
		return identification;
	}

    public void setIdentification(IdentificationBean identification) {
		this.identification = identification;
	}

    @JsonProperty("procurementRequestItems")
	public Set<ProcurementRequestItemBean> getProcurementRequestItems() {
		return procurementRequestItems;
	}

	public void setProcurementRequestItems(Set<ProcurementRequestItemBean> procurementRequestItems) {
		this.procurementRequestItems = procurementRequestItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof ProcurementPlanItemBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((ProcurementPlanItemBean) o).getId()));
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
		return "ProcurementPlanItemBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", PPIOrdinalNumber=" + PPIOrdinalNumber
			+ ", PPIPlannedQuantity=" + PPIPlannedQuantity
			+ ", PPIOrderedQuantity=" + PPIOrderedQuantity
			+ ", PPIRecievedQuantity=" + PPIRecievedQuantity
			+ ", PPISourceProvider=" + PPISourceProvider
			+ ", PPIProcurementDeadline=" + PPIProcurementDeadline
			+ ", MUIdentificationCode=" + MUIdentificationCode
			// + ", procurementPlanHeading=" + procurementPlanHeading
			// + ", identification=" + identification
			// + ", procurementRequestItems=" + procurementRequestItems
			+ "]";
	}
}