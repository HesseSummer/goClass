package com.weixin.demo.repository;

import com.weixin.demo.entity.Invitation;
import com.weixin.demo.entity.Schedule;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLInsert;
import org.hibernate.annotations.SQLUpdate;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Statement;
import java.util.List;
public interface InvitationRepository extends JpaRepository<Invitation,Integer> {

    @Query(value = "select * from  invitation ORDER BY invitation_id DESC", nativeQuery = true)
    List<Invitation> findallinvitation();

    @Modifying
    @Query(value = "insert into invitation(invitation_id,user_id,user_name,sex,major,opposite_sex,illustration,key_words,contact_information)values(null,:user_id,:user_name,:sex,:major,:opposite_sex,:illustration,:key_words,:contact_information)", nativeQuery = true)
    void setinvitation(@Param("user_id") String user_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("opposite_sex") String opposite_sex,@Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information);

    @Query(value = "select * from   invitation u where u.key_words like CONCAT('%',:keywords,'%') ORDER BY invitation_id DESC", nativeQuery = true)
    List<Invitation> findBykeywords(@Param("keywords") String keywords);

    @Query(value = "select * from   invitation u where u.illustration like CONCAT('%',:illustration,'%') ORDER BY invitation_id DESC", nativeQuery = true)
    List<Invitation> findByillustration(@Param("illustration") String illustration);

    @Query(value = "select * from   invitation u where u.major like CONCAT('%',:major,'%') ORDER BY invitation_id DESC", nativeQuery = true)
    List<Invitation> findBymajor(@Param("major") String major);


    @Query(value = "select * from   invitation u where u.user_id=:user_id ORDER BY invitation_id DESC", nativeQuery = true)
    List<Invitation> findbyid(@Param("user_id") String user_id);

    @Modifying
    @Query(value = "DELETE FROM invitation WHERE invitation_id=:invitation_id", nativeQuery = true)
    void DeleteByIid(@Param("invitation_id") int invitation_id);

    @Modifying
    @Query(value ="UPDATE invitation SET user_name=:user_name,sex=:sex,major=:major,opposite_sex=:opposite_sex,illustration=:illustration,key_words=:key_words,contact_information=:contact_information WHERE invitation_id=:invitation_id", nativeQuery = true)
    void UpdataInvitation(@Param("invitation_id") int invitation_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("opposite_sex") String opposite_sex,@Param("illustration") String illustration,@Param("key_words") String key_words,@Param("contact_information") String contact_information);


}
