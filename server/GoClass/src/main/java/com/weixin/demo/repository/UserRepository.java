package com.weixin.demo.repository;

import com.weixin.demo.entity.Schedule;
import com.weixin.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "select * from  user u where u.open_id = :open_id", nativeQuery = true)
    List<User> findByOpenid(@Param("open_id") String open_id);

    @Modifying
    @Query(value = "insert into user(user_id,open_id,user_name,sex,major,sdept,motto,session_key)values(null,:open_id,null,null,null,null,null,:session_key)", nativeQuery = true)
    void InsertUser(@Param("open_id") String open_id,@Param("session_key") String session_key);

    @Modifying
    @Query(value = "select user_id from  user u where u.open_id = :open_id", nativeQuery = true)
    int getUser_id(@Param("open_id") String open_id);

    @Modifying
    @Query(value = "UPDATE user SET session_key = :session_key WHERE open_id = :open_id",nativeQuery = true)
    void UpdateSessionKey(@Param("open_id") String open_id,@Param("session_key") String session_key);

    @Modifying
    @Query(value = "UPDATE user SET user_name = :user_name WHERE open_id = :open_id",nativeQuery = true)
    void UpdataUserName(@Param("open_id") String open_id,@Param("user_name") String user_name);

    @Modifying
    @Query(value = "UPDATE user SET major = :major WHERE open_id = :open_id",nativeQuery = true)
    void UpdataMajor(@Param("open_id") String open_id,@Param("major") String major);

    @Modifying
    @Query(value = "UPDATE user SET sex = :sex WHERE open_id = :open_id",nativeQuery = true)
    void UpdataSex(@Param("open_id") String open_id,@Param("sex") String sex);

    @Modifying
    @Query(value = "UPDATE user SET sdept = :sdept WHERE open_id = :open_id",nativeQuery = true)
    void UpdataSdept(@Param("open_id") String open_id,@Param("sdept") String sdept);

    @Modifying
    @Query(value = "UPDATE user SET motto = :motto WHERE open_id = :open_id",nativeQuery = true)
    void UpdataMotto(@Param("open_id") String open_id,@Param("motto") String motto);

    @Modifying
    @Query(value = "UPDATE user  SET user_name=:user_name,sex=:sex,major=:major,sdept=:sdept,motto=:motto WHERE open_id =:open_id",nativeQuery = true)
    void UpdateUserData(@Param("open_id") String open_id,@Param("user_name") String user_name,@Param("major") String major,@Param("sex") String sex,@Param("sdept") String sdept,@Param("motto") String motto);


}
