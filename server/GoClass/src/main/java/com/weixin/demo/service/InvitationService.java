package com.weixin.demo.service;

import com.weixin.demo.entity.Invitation;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvitationService {

    void setinvitation(@Param("user_id") String user_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("opposite_sex") String opposite_sex,@Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information);

    List<Invitation> findall();

    List<Invitation> findbykeywords(@Param("keywords") String keywords);

    List<Invitation> findbyuserid(@Param("user_id") String user_id);

    void DeleteByIid(@Param("invitation_id") int invitation_id);

    void UpdataInvitation(@Param("invitation_id") int invitation_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("opposite_sex") String opposite_sex,@Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information);

    List<Invitation> Search(@Param("key") String key);
}
