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

import com.doobgroup.server.entities.stockmanagement.GoodsReceivedNoteItemBean;

@Entity
@Table(name = "GOODSACCEPTANCESTATUS"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "GASDesignation"  	}))
@SQLDelete(sql="UPDATE GOODSACCEPTANCESTATUS SET deleted = 1 WHERE GoodsAcceptanceStatus_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class GoodsAcceptanceStatusBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "GoodsAcceptanceStatus_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "GASDesignation", nullable = false)
	protected String GASDesignation;
	@Column(name = "GASDescription", nullable = false)
	protected String GASDescription;

    @OneToMany(mappedBy = "goodsAcceptanceStatus", fetch = FetchType.LAZY, cascade = { CascadeType.REFRESH })
    @Where(clause = "deleted = 0")
    protected Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems = new HashSet<GoodsReceivedNoteItemBean>();

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

    @JsonProperty("GASDesignation")
	public String getGASDesignation() {
		return GASDesignation;
	}

	public void setGASDesignation(String GASDesignation) {
		this.GASDesignation = GASDesignation;
	}

    @JsonProperty("GASDescription")
	public String getGASDescription() {
		return GASDescription;
	}

	public void setGASDescription(String GASDescription) {
		this.GASDescription = GASDescription;
	}


    @JsonProperty("goodsReceivedNoteItems")
	public Set<GoodsReceivedNoteItemBean> getGoodsReceivedNoteItems() {
		return goodsReceivedNoteItems;
	}

	public void setGoodsReceivedNoteItems(Set<GoodsReceivedNoteItemBean> goodsReceivedNoteItems) {
		this.goodsReceivedNoteItems = goodsReceivedNoteItems;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof GoodsAcceptanceStatusBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((GoodsAcceptanceStatusBean) o).getId()));
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
		return "GoodsAcceptanceStatusBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", GASDesignation=" + GASDesignation
			+ ", GASDescription=" + GASDescription
			// + ", goodsReceivedNoteItems=" + goodsReceivedNoteItems
			+ "]";
	}
}