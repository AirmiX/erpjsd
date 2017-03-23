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

import com.doobgroup.server.entities.corporation.EmployeeBean;
import com.doobgroup.server.entities.corporation.BusinessEntityBean;
import com.doobgroup.server.entities.corporation.BankBean;

@Entity
@Table(name = "BANKACCOUNT"
    , uniqueConstraints = @UniqueConstraint(columnNames = {
 "BAAccountNumber"  	}))
@SQLDelete(sql="UPDATE BANKACCOUNT SET deleted = 1 WHERE BankAccount_id = ? AND version=?")
@Where(clause = "deleted = 0")
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "$resolved", "$promise"  ,"deleted" })
public class BankAccountBean implements Serializable {

	private static final long serialVersionUID = 3167766219958010418L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BankAccount_id")
	protected Long id;
	@Version
	protected int version;
	protected boolean deleted;

	@Column(name = "BAAccountNumber", nullable = false)
	protected String BAAccountNumber;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="employee")
    protected EmployeeBean employee;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="entities")
    protected BusinessEntityBean entities;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name="bank")
    protected BankBean bank;

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

    @JsonProperty("BAAccountNumber")
	public String getBAAccountNumber() {
		return BAAccountNumber;
	}

	public void setBAAccountNumber(String BAAccountNumber) {
		this.BAAccountNumber = BAAccountNumber;
	}


    @JsonProperty("employee")
	public EmployeeBean getEmployee() {
		return employee;
	}

    public void setEmployee(EmployeeBean employee) {
		this.employee = employee;
	}

    @JsonProperty("entities")
	public BusinessEntityBean getEntities() {
		return entities;
	}

    public void setEntities(BusinessEntityBean entities) {
		this.entities = entities;
	}

    @JsonProperty("bank")
	public BankBean getBank() {
		return bank;
	}

    public void setBank(BankBean bank) {
		this.bank = bank;
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || !(o instanceof BankAccountBean)) {
			return false;
		}
		if (id == null) return false;
		return id.equals((((BankAccountBean) o).getId()));
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
		return "BankAccountBean [id=" + id + ", deleted=" + deleted + ", version=" + version
			+ ", BAAccountNumber=" + BAAccountNumber
			// + ", employee=" + employee
			// + ", entities=" + entities
			// + ", bank=" + bank
			+ "]";
	}
}