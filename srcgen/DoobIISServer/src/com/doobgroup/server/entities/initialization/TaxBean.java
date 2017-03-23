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

import com.doobgroup.server.entities.corporation.AccountBean;
import com.doobgroup.server.entities.initialization.TaxHeadingBean;

@Entity
@Table(name = "TAX"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "TOrdinalNumber"  ,  "taxHeading"  	}))
@SQLDelete(sql="UPDATE TAX SET deleted = 1 WHERE Tax_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class TaxBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Tax_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "TOrdinalNumber", nullable = false)
	protected int TOrdinalNumber;
	@Column(name = "TName", nullable = false)
	protected String TName;
	@Column(name = "TRemark")
	protected String TRemark;
	@Column(name = "TPercent", nullable = false)
	protected int TPercent;
	@Column(name = "TRecalculatedPercent")
	protected int TRecalculatedPercent;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="account")
    protected AccountBean account;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="taxHeading")
    protected TaxHeadingBean taxHeading;

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

    @JsonProperty("TOrdinalNumber")
	public int getTOrdinalNumber() {
		return TOrdinalNumber;
	}

	public void setTOrdinalNumber(int TOrdinalNumber) {
		this.TOrdinalNumber = TOrdinalNumber;
	}

    @JsonProperty("TName")
	public String getTName() {
		return TName;
	}

	public void setTName(String TName) {
		this.TName = TName;
	}

    @JsonProperty("TRemark")
	public String getTRemark() {
		return TRemark;
	}

	public void setTRemark(String TRemark) {
		this.TRemark = TRemark;
	}

    @JsonProperty("TPercent")
	public int getTPercent() {
		return TPercent;
	}

	public void setTPercent(int TPercent) {
		this.TPercent = TPercent;
	}

    @JsonProperty("TRecalculatedPercent")
	public int getTRecalculatedPercent() {
		return TRecalculatedPercent;
	}

	public void setTRecalculatedPercent(int TRecalculatedPercent) {
		this.TRecalculatedPercent = TRecalculatedPercent;
	}


    @JsonProperty("account")
	public AccountBean getAccount() {
		return account;
	}

    public void setAccount(AccountBean account) {
		this.account = account;
	}

    @JsonProperty("taxHeading")
	public TaxHeadingBean getTaxHeading() {
		return taxHeading;
	}

    public void setTaxHeading(TaxHeadingBean taxHeading) {
		this.taxHeading = taxHeading;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof TaxBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((TaxBean) o).getId()));
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
		return "TaxBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", TOrdinalNumber=" + TOrdinalNumber
			+ ", TName=" + TName
			+ ", TRemark=" + TRemark
			+ ", TPercent=" + TPercent
			+ ", TRecalculatedPercent=" + TRecalculatedPercent
			// + ", account=" + account
			// + ", taxHeading=" + taxHeading
			+ "]";
	}
}