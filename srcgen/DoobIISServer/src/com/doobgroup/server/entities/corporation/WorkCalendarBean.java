package com.doobgroup.server.entities.corporation;

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

@Entity
@Table(name = "WORKCALENDAR"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "WCYear" ,   "WCMonth" ,   "WCDay"  ,  "organizationUnit"  	}))
@SQLDelete(sql="UPDATE WORKCALENDAR SET deleted = 1 WHERE WorkCalendar_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class WorkCalendarBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "WorkCalendar_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "WCYear", nullable = false)
	protected int WCYear;
	@Column(name = "WCMonth", nullable = false)
	protected int WCMonth;
	@Column(name = "WCDay", nullable = false)
	protected int WCDay;
	@Column(name = "WCTimeUnit", nullable = false)
	protected int WCTimeUnit;
	@Column(name = "WCDaysInWeek", nullable = false)
	protected int WCDaysInWeek;
	@Column(name = "WCDayStatus", nullable = false)
	protected char WCDayStatus;
	@Column(name = "WCDayOrdinalNumber", nullable = false)
	protected int WCDayOrdinalNumber;
	@Column(name = "WCWorkingDayOrdinalNumber", nullable = false)
	protected int WCWorkingDayOrdinalNumber;
	@Column(name = "WCEvent")
	protected String WCEvent;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="organizationUnit")
    protected OrganizationUnitBean organizationUnit;

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

    @JsonProperty("WCYear")
	public int getWCYear() {
		return WCYear;
	}

	public void setWCYear(int WCYear) {
		this.WCYear = WCYear;
	}

    @JsonProperty("WCMonth")
	public int getWCMonth() {
		return WCMonth;
	}

	public void setWCMonth(int WCMonth) {
		this.WCMonth = WCMonth;
	}

    @JsonProperty("WCDay")
	public int getWCDay() {
		return WCDay;
	}

	public void setWCDay(int WCDay) {
		this.WCDay = WCDay;
	}

    @JsonProperty("WCTimeUnit")
	public int getWCTimeUnit() {
		return WCTimeUnit;
	}

	public void setWCTimeUnit(int WCTimeUnit) {
		this.WCTimeUnit = WCTimeUnit;
	}

    @JsonProperty("WCDaysInWeek")
	public int getWCDaysInWeek() {
		return WCDaysInWeek;
	}

	public void setWCDaysInWeek(int WCDaysInWeek) {
		this.WCDaysInWeek = WCDaysInWeek;
	}

    @JsonProperty("WCDayStatus")
	public char getWCDayStatus() {
		return WCDayStatus;
	}

	public void setWCDayStatus(char WCDayStatus) {
		this.WCDayStatus = WCDayStatus;
	}

    @JsonProperty("WCDayOrdinalNumber")
	public int getWCDayOrdinalNumber() {
		return WCDayOrdinalNumber;
	}

	public void setWCDayOrdinalNumber(int WCDayOrdinalNumber) {
		this.WCDayOrdinalNumber = WCDayOrdinalNumber;
	}

    @JsonProperty("WCWorkingDayOrdinalNumber")
	public int getWCWorkingDayOrdinalNumber() {
		return WCWorkingDayOrdinalNumber;
	}

	public void setWCWorkingDayOrdinalNumber(int WCWorkingDayOrdinalNumber) {
		this.WCWorkingDayOrdinalNumber = WCWorkingDayOrdinalNumber;
	}

    @JsonProperty("WCEvent")
	public String getWCEvent() {
		return WCEvent;
	}

	public void setWCEvent(String WCEvent) {
		this.WCEvent = WCEvent;
	}


    @JsonProperty("organizationUnit")
	public OrganizationUnitBean getOrganizationUnit() {
		return organizationUnit;
	}

    public void setOrganizationUnit(OrganizationUnitBean organizationUnit) {
		this.organizationUnit = organizationUnit;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof WorkCalendarBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((WorkCalendarBean) o).getId()));
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
		return "WorkCalendarBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", WCYear=" + WCYear
			+ ", WCMonth=" + WCMonth
			+ ", WCDay=" + WCDay
			+ ", WCTimeUnit=" + WCTimeUnit
			+ ", WCDaysInWeek=" + WCDaysInWeek
			+ ", WCDayStatus=" + WCDayStatus
			+ ", WCDayOrdinalNumber=" + WCDayOrdinalNumber
			+ ", WCWorkingDayOrdinalNumber=" + WCWorkingDayOrdinalNumber
			+ ", WCEvent=" + WCEvent
			// + ", organizationUnit=" + organizationUnit
			+ "]";
	}
}