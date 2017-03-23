package com.doobgroup.server.util;
 
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler","$resolved","$promise"})
public class WorkCalendarUtil {

	protected Long ChosenUnit;
	protected Integer Year;
	protected Integer DaysInWeek;
	protected Integer ChosenWeekendWorkingDays;
	protected List<Integer> Years;
	protected boolean monday;
	protected boolean tuesday;
	protected boolean wednesday;
	protected boolean thursday;
	protected boolean friday;
	protected boolean saturday;
	protected boolean sunday;
	
	@JsonProperty("ChosenUnit")
	public Long getChosenUnit() {
		return ChosenUnit;
	}
	public void setChosenUnit(Long chosenUnit) {
		ChosenUnit = chosenUnit;
	}
	@JsonProperty("Year")
	public Integer getYear() {
		return Year;
	}
	public void setYear(Integer year) {
		Year = year;
	}
	@JsonProperty("DaysInWeek")
	public Integer getDaysInWeek() {
		return DaysInWeek;
	}
	public void setDaysInWeek(Integer daysInWeek) {
		DaysInWeek = daysInWeek;
	}
	@JsonProperty("ChosenWeekendWorkingDays")
	public Integer getChosenWeekendWorkingDays() {
		return ChosenWeekendWorkingDays;
	}
	public void setChosenWeekendWorkingDays(Integer chosenWeekendWorkingDays) {
		ChosenWeekendWorkingDays = chosenWeekendWorkingDays;
	}
	public List<Integer> getYears() {
		return Years;
	}
	public void setYears(List<Integer> years) {
		Years = years;
	}
	@JsonProperty("monday")
	public boolean isMonday() {
		return monday;
	}
	public void setMonday(boolean monday) {
		this.monday = monday;
	}
	@JsonProperty("tuesday")
	public boolean isTuesday() {
		return tuesday;
	}
	public void setTuesday(boolean tuesday) {
		this.tuesday = tuesday;
	}
	@JsonProperty("wednesday")
	public boolean isWednesday() {
		return wednesday;
	}
	public void setWednesday(boolean wednesday) {
		this.wednesday = wednesday;
	}
	@JsonProperty("thursday")
	public boolean isThursday() {
		return thursday;
	}
	public void setThursday(boolean thursday) {
		this.thursday = thursday;
	}
	@JsonProperty("friday")
	public boolean isFriday() {
		return friday;
	}
	public void setFriday(boolean friday) {
		this.friday = friday;
	}
	@JsonProperty("saturday")
	public boolean isSaturday() {
		return saturday;
	}
	public void setSaturday(boolean saturday) {
		this.saturday = saturday;
	}
	@JsonProperty("sunday")
	public boolean isSunday() {
		return sunday;
	}
	public void setSunday(boolean sunday) {
		this.sunday = sunday;
	}
	@Override
	public String toString() {
		return "WorkCalendarUtil [ChosenUnit=" + ChosenUnit + ", Year=" + Year + ", DaysInWeek=" + DaysInWeek
			+ ", ChosenWeekendWorkingDays=" + ChosenWeekendWorkingDays
			+ ", monday=" + monday
			+ ", tuesday=" + tuesday
			+ ", wednesday=" + wednesday
			+ ", thursday=" + thursday
			+ ", friday=" + friday
			+ ", saturday=" + saturday
			+ ", sunday=" + sunday
			+ "]";
	}
}
