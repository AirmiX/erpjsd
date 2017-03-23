package com.doobgroup.server.entities.capacitymanagement;

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

import com.doobgroup.server.entities.productiondata.WorkCenterBean;

@Entity
@Table(name = "AVAILABILITYWORKCENTER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "AWCOrdinalNumber"  ,  "workCenter"  	}))
@SQLDelete(sql="UPDATE AVAILABILITYWORKCENTER SET deleted = 1 WHERE AvailabilityWorkCenter_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AvailabilityWorkCenterBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "AvailabilityWorkCenter_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "AWCOrdinalNumber", nullable = false)
	protected int AWCOrdinalNumber;
	@Column(name = "AWCStartDate", nullable = false)
	protected Date AWCStartDate;
	@Column(name = "AWCEndDate")
	protected Date AWCEndDate;
	@Column(name = "AWCCapacityChange", nullable = false)
	protected int AWCCapacityChange;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workCenter")
    protected WorkCenterBean workCenter;

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

    @JsonProperty("AWCOrdinalNumber")
	public int getAWCOrdinalNumber() {
		return AWCOrdinalNumber;
	}

	public void setAWCOrdinalNumber(int AWCOrdinalNumber) {
		this.AWCOrdinalNumber = AWCOrdinalNumber;
	}

    @JsonProperty("AWCStartDate")
	public Date getAWCStartDate() {
		return AWCStartDate;
	}

	public void setAWCStartDate(Date AWCStartDate) {
		this.AWCStartDate = AWCStartDate;
	}

    @JsonProperty("AWCEndDate")
	public Date getAWCEndDate() {
		return AWCEndDate;
	}

	public void setAWCEndDate(Date AWCEndDate) {
		this.AWCEndDate = AWCEndDate;
	}

    @JsonProperty("AWCCapacityChange")
	public int getAWCCapacityChange() {
		return AWCCapacityChange;
	}

	public void setAWCCapacityChange(int AWCCapacityChange) {
		this.AWCCapacityChange = AWCCapacityChange;
	}


    @JsonProperty("workCenter")
	public WorkCenterBean getWorkCenter() {
		return workCenter;
	}

    public void setWorkCenter(WorkCenterBean workCenter) {
		this.workCenter = workCenter;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof AvailabilityWorkCenterBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AvailabilityWorkCenterBean) o).getId()));
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
		return "AvailabilityWorkCenterBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", AWCOrdinalNumber=" + AWCOrdinalNumber
			+ ", AWCStartDate=" + AWCStartDate
			+ ", AWCEndDate=" + AWCEndDate
			+ ", AWCCapacityChange=" + AWCCapacityChange
			// + ", workCenter=" + workCenter
			+ "]";
	}
}