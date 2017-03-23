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
import com.doobgroup.server.entities.capacitymanagement.AlternativeWorkCenterStepsBean;

@Entity
@Table(name = "ALTERNATIVEWORKCENTER"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "workCenter1" ,   "workCenter"  	}))
@SQLDelete(sql="UPDATE ALTERNATIVEWORKCENTER SET deleted = 1 WHERE AlternativeWorkCenter_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class AlternativeWorkCenterBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "AlternativeWorkCenter_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "AWCApproved")
	protected Boolean AWCApproved;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workCenter1")
    protected WorkCenterBean workCenter1;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="workCenter")
    protected WorkCenterBean workCenter;
    @OneToMany(mappedBy = "alternativeWorkCenter", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<AlternativeWorkCenterStepsBean> alternativeWorkCenterSteps = new HashSet<AlternativeWorkCenterStepsBean>();

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

    @JsonProperty("AWCApproved")
	public Boolean getAWCApproved() {
		return AWCApproved;
	}

	public void setAWCApproved(Boolean AWCApproved) {
		this.AWCApproved = AWCApproved;
	}


    @JsonProperty("workCenter1")
	public WorkCenterBean getWorkCenter1() {
		return workCenter1;
	}

    public void setWorkCenter1(WorkCenterBean workCenter1) {
		this.workCenter1 = workCenter1;
	}

    @JsonProperty("workCenter")
	public WorkCenterBean getWorkCenter() {
		return workCenter;
	}

    public void setWorkCenter(WorkCenterBean workCenter) {
		this.workCenter = workCenter;
	}

    @JsonProperty("alternativeWorkCenterSteps")
	public Set<AlternativeWorkCenterStepsBean> getAlternativeWorkCenterSteps() {
		return alternativeWorkCenterSteps;
	}

	public void setAlternativeWorkCenterSteps(Set<AlternativeWorkCenterStepsBean> alternativeWorkCenterSteps) {
		this.alternativeWorkCenterSteps = alternativeWorkCenterSteps;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof AlternativeWorkCenterBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((AlternativeWorkCenterBean) o).getId()));
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
		return "AlternativeWorkCenterBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", AWCApproved=" + AWCApproved
			// + ", workCenter1=" + workCenter1
			// + ", workCenter=" + workCenter
			// + ", alternativeWorkCenterSteps=" + alternativeWorkCenterSteps
			+ "]";
	}
}