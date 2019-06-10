package com.weixin.demo.controller;

import com.weixin.demo.entity.Invitation;
import com.weixin.demo.entity.Schedule;
import com.weixin.demo.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/invitation")
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @GetMapping(value = "/setinvitation")
    void setinvitation(@Param("user_id") String user_id, @Param("user_name") String user_name, @Param("sex") String sex, @Param("major") String major, @Param("opposite_sex") String opposite_sex, @Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information)
    {
        invitationService.setinvitation(user_id,user_name,sex,major,opposite_sex,illustration,key_words,contact_information);
    }

    @GetMapping(value = "/findall")
    List<Invitation>getAll()
    {
        return invitationService.findall();
    }

    @GetMapping(value = "/search")
    List<Invitation>getbykeyword(@Param("key_words") String key_words)
    {
        return invitationService.findbykeywords(key_words);
    }

    @GetMapping(value = "/userinvitation")
    List<Invitation> GetById(@Param("user_id") String user_id)
    {
        return invitationService.findbyuserid(user_id);
    }

    @GetMapping(value = "/delete")
    void Delete(@Param("invitation_id") int invitation_id)
    {
        invitationService.DeleteByIid(invitation_id);
    }

    @GetMapping(value = "/updata")
    void Updata(@Param("invitation_id") int invitation_id,@Param("user_name") String user_name, @Param("sex") String sex, @Param("major") String major, @Param("opposite_sex") String opposite_sex, @Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information)
    {
        invitationService.UpdataInvitation(invitation_id,user_name,sex,major,opposite_sex,illustration,key_words,contact_information);
    }

    @GetMapping(value = "/searchall")
    List<Invitation> GetByAllInfo(@Param("key") String key)
    {

        return invitationService.Search(key);
    }
}
