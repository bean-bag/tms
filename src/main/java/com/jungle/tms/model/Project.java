package com.jungle.tms.model;

import java.util.Date;

import com.jungle.framework.core.model.AbstractPersistentObject;
import com.jungle.tms.enumo.Stage;

/**
 * TProject entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Project extends AbstractPersistentObject implements java.io.Serializable {

	private static final long serialVersionUID = -915824336065582307L;
	
	// Fields

	private String prjNumber;//工程编号
	private String prjName;//工程名称
	private Integer prjType;//工程类型
	//private String prjState;//工程状态
	private Boolean contract=Boolean.FALSE;//合同
	private Boolean deposit=Boolean.FALSE;//定金
	private Boolean collection=Boolean.FALSE;//收款
	private Boolean audit=Boolean.FALSE;//审核
	private Boolean complete=Boolean.FALSE;//完工
	private Stage prjStage;//工程进展阶段
	private Integer prjPriority;//工程优先级
	private Date startDate = new Date();//启动日期
	private Date endDate;//截止日期
	private String docNO;//归档编号
	private Boolean delFlag = Boolean.FALSE;//删除标识
	private Boolean budgetFlag = Boolean.FALSE;//预算标识
	private Float budgetAmount;//预算金额
	private Boolean feeFlag = Boolean.FALSE;
	private Date createDate = new Date();//工程信息创建日期
	private Date orderDate;//排序用日期
	private Date checkDate;//审核日期
	private String remark;//备注
	public Project(){}
	public Project(Integer id){
		this.setId(id);
	}
	public String getPrjNumber() {
		return prjNumber;
	}
	public void setPrjNumber(String prjNumber) {
		this.prjNumber = prjNumber;
	}
	public String getPrjName() {
		return prjName;
	}
	public void setPrjName(String prjName) {
		this.prjName = prjName;
	}
	public Integer getPrjType() {
		return prjType;
	}
	public void setPrjType(Integer prjType) {
		this.prjType = prjType;
	}
	public Boolean getContract() {
		return contract;
	}
	public void setContract(Boolean contract) {
		this.contract = contract;
	}
	public Boolean getDeposit() {
		return deposit;
	}
	public void setDeposit(Boolean deposit) {
		this.deposit = deposit;
	}
	public Boolean getCollection() {
		return collection;
	}
	public void setCollection(Boolean collection) {
		this.collection = collection;
	}
	public Boolean getAudit() {
		return audit;
	}
	public void setAudit(Boolean audit) {
		this.audit = audit;
	}
	public Boolean getComplete() {
		return complete;
	}
	public void setComplete(Boolean complete) {
		this.complete = complete;
	}
	public Stage getPrjStage() {
		return prjStage;
	}
	public void setPrjStage(Stage prjStage) {
		this.prjStage = prjStage;
	}
	public Integer getPrjPriority() {
		return prjPriority;
	}
	public void setPrjPriority(Integer prjPriority) {
		this.prjPriority = prjPriority;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getDocNO() {
		return docNO;
	}
	public void setDocNO(String docNO) {
		this.docNO = docNO;
	}
	public Boolean getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(Boolean delFlag) {
		this.delFlag = delFlag;
	}
	public Boolean getBudgetFlag() {
		return budgetFlag;
	}
	public void setBudgetFlag(Boolean budgetFlag) {
		this.budgetFlag = budgetFlag;
	}
	public Float getBudgetAmount() {
		return budgetAmount;
	}
	public void setBudgetAmount(Float budgetAmount) {
		this.budgetAmount = budgetAmount;
	}
	public Boolean getFeeFlag() {
		return feeFlag;
	}
	public void setFeeFlag(Boolean feeFlag) {
		this.feeFlag = feeFlag;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}	
}