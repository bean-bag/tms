package com.jungle.tms.service.impl;

import java.util.List;

import com.jungle.tms.dao.IGroupDao;
import com.jungle.tms.enumo.GroupSort;
import com.jungle.tms.model.Group;
import com.jungle.tms.service.IGroupService;

public class GroupService implements IGroupService {
	private IGroupDao dao;
	

	public void setDao(IGroupDao dao) {
		this.dao = dao;
	}

	@Override
	public List<Group> findAll(Integer prjID, GroupSort sort) {
		return dao.findAll(prjID, null, sort);
	}

	@Override
	public List<Group> findByUser(Integer userID) {
		return dao.findBy("memberID", userID);
	}

	@Override
	public List<Group> findAllByPrj(Integer prjID) {
		return dao.findBy("prjID", prjID);
	}
	
	@Override
	public boolean isGroupSort(Integer prjID, Integer memberID, GroupSort sort) {
		return dao.findAll(prjID, memberID, sort).size()>0;
	}
	
	@Override
	public boolean canCheck(Integer prjID, Integer memberID,GroupSort sort) {
		List<Group> list = this.dao.findAll(prjID, memberID, sort);
		return !(list == null ||list.isEmpty());
	}

	/**
	 * ������¾�άһ�Ե�����
	 * @param prjID
	 * @param sort
	 * @param memberID
	 */
	@Override
	public void saveSingle(Integer prjID, GroupSort sort, Integer memberID){
		List<Group> list = dao.findAll(prjID, null, sort);
		if(list.size() == 0){//�¼�
			this.dao.doSave(new Group(prjID,sort,memberID));
		}else if(list.size() == 1){//����
			Group g = this.dao.findById(list.get(0).getId());
				g.setPrjID(list.get(0).getPrjID());
				g.setMemberID(memberID);
				g.setSort(list.get(0).getSort());
			this.dao.doSave(g);
		}else {
			for(Group g : list){//ɾ��ȫ�������ݣ����¼�
				this.dao.doDelete(g);
			}
			this.dao.doSave(new Group(prjID,sort,memberID));
		}
	}
	
	/**
	 * ������¿ɶ��������ݣ��������������
	 * @param prjID
	 * @param sort
	 * @param memberID
	 */
	@Override
	public void saveWithClear(Integer prjID, GroupSort sort, List<Integer> memberID){
		List<Group> list = dao.findAll(prjID, null, sort);
		for(Group g : list){//ɾ��ȫ�������ݣ����¼�
			this.dao.doDelete(g);
		}
		for(Integer m : memberID){
			this.dao.doSave(new Group(prjID,sort,m));
		}
	}	
}
