package com.weixin.demo.service.impl;

import com.weixin.demo.entity.Invitation;
import com.weixin.demo.repository.InvitationRepository;
import com.weixin.demo.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class InvitationServiceImpl implements InvitationService {
    @Autowired
    private InvitationRepository invitationRepository;

    public void setinvitation(@Param("user_id") String user_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("opposite_sex") String opposite_sex,@Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information)
    {
        invitationRepository.setinvitation(user_id,user_name,sex,major,opposite_sex,illustration,key_words,contact_information);
    }

    public List<Invitation> findall()
    {
        return invitationRepository.findallinvitation();
    }

    public List<Invitation> findbykeywords(@Param("keywords") String keywords)
    {
        return invitationRepository.findBykeywords(keywords);
    }

    public List<Invitation> findbyuserid(@Param("user_id") String user_id)
    {
        return invitationRepository.findbyid(user_id);
    }

    public void DeleteByIid(@Param("invitation_id") int invitation_id)
    {
        invitationRepository.DeleteByIid(invitation_id);
    }

    public void UpdataInvitation(@Param("invitation_id") int invitation_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("opposite_sex") String opposite_sex,@Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information)
    {
        invitationRepository.UpdataInvitation(invitation_id,user_name,sex,major,opposite_sex,illustration,key_words,contact_information);
    }

    public List<Invitation> Search(@Param("key") String key)
    {
        List<Invitation> list=new ArrayList<Invitation>();
        List<Invitation> keyword=invitationRepository.findBykeywords(key);
        List<Invitation> illustration=invitationRepository.findByillustration(key);
        List<Invitation> major=invitationRepository.findBymajor(key);

        list.addAll(keyword);
        list.removeAll(major);
        list.addAll(major);
        list.removeAll(illustration);
        list.addAll(illustration);

        return list;
    }
}
