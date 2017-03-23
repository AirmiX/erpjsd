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


@Entity
@Table(name = "WORKORDERHASPRODUCTIONREQUESTS"
)
@SQLDelete(sql="UPDATE WORKORDERHASPRODUCTIONREQUESTS SET deleted = 1 WHERE WorkOrderHasProductionRequests_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class WorkOrderHasProductionRequestsBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "WorkOrderHasProductionRequests_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "WOPRQuantity", nullable = false)
	protected int WOPRQuantity;
	@Column(name = "WOPRDate", nullable = false)
	protected Date WOPRDate;
	@Column(name = "WOPRCoveredEarlier")
	protected int WOPRCoveredEarlier;
	@Column(name = "WOPRCoveredNow")
	protected int WOPRCoveredNow;
	@Column(name = "WOPRPrintStatus")
	protected String WOPRPrintStatus;


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

    @JsonProperty("WOPRQuantity")
	public int getWOPRQuantity() {
		return WOPRQuantity;
	}

	public void setWOPRQuantity(int WOPRQuantity) {
		this.WOPRQuantity = WOPRQuantity;
	}

    @JsonProperty("WOPRDate")
	public Date getWOPRDate() {
		return WOPRDate;
	}

	public void setWOPRDate(Date WOPRDate) {
		this.WOPRDate = WOPRDate;
	}

    @JsonProperty("WOPRCoveredEarlier")
	public int getWOPRCoveredEarlier() {
		return WOPRCoveredEarlier;
	}

	public void setWOPRCoveredEarlier(int WOPRCoveredEarlier) {
		this.WOPRCoveredEarlier = WOPRCoveredEarlier;
	}

    @JsonProperty("WOPRCoveredNow")
	public int getWOPRCoveredNow() {
		return WOPRCoveredNow;
	}

	public void setWOPRCoveredNow(int WOPRCoveredNow) {
		this.WOPRCoveredNow = WOPRCoveredNow;
	}

    @JsonProperty("WOPRPrintStatus")
	public String getWOPRPrintStatus() {
		return WOPRPrintStatus;
	}

	public void setWOPRPrintStatus(String WOPRPrintStatus) {
		this.WOPRPrintStatus = WOPRPrintStatus;
	}



	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof WorkOrderHasProductionRequestsBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((WorkOrderHasProductionRequestsBean) o).getId()));
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
		return "WorkOrderHasProductionRequestsBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", WOPRQuantity=" + WOPRQuantity
			+ ", WOPRDate=" + WOPRDate
			+ ", WOPRCoveredEarlier=" + WOPRCoveredEarlier
			+ ", WOPRCoveredNow=" + WOPRCoveredNow
			+ ", WOPRPrintStatus=" + WOPRPrintStatus
			+ "]";
	}
}