package com.weixin.demo.service.impl;

import com.weixin.demo.entity.User;
import com.weixin.demo.repository.UserRepository;
import com.weixin.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    public boolean IsNew(@Param("open_id") String open_id){
        List<User> userList = userRepository.findByOpenid(open_id);
        if(userList.size()==0){
            return true;
        }
        else
            return false;
    }

    public void InsertUser(@Param("open_id") String open_id,@Param("session_key") String session_key){
        userRepository.InsertUser(open_id,session_key);
    }

    public int getUser_id(@Param("open_id") String open_id){
        return userRepository.getUser_id(open_id);
    }

    public boolean IsUser(@Param("open_id") String open_id){
        List<User> userList=userRepository.findByOpenid(open_id);
        if(userList.size()>0)   return true;
        else return false;

        /*if(userRepository.getUser_id(open_id)!=0){
            return true;
        }
        else {
            return false;
        }*/
    }

    public void UpdateSessionKey(@Param("open_id") String open_id,@Param("session_key") String session_key){
        userRepository.UpdateSessionKey(open_id,session_key);
    }
    public List<User> findByOpenid(@Param("open_id") String open_id){
        return userRepository.findByOpenid(open_id);
    }

    public void UpdataUserName(@Param("open_id") String open_id,@Param("user_name") String user_name)
    {
        userRepository.UpdataUserName(open_id,user_name);
    }
    public void UpdataMotto(@Param("user_id") int user_id,@Param("motto") String motto){
        userRepository.UpdataMotto(user_id,motto);
    }

    public void UpdataNote(@Param("user_id") int user_id,@Param("note") String note)
    {
        userRepository.UpdataNote(user_id,note);
    }

    public void UpdateUserData(@Param("user_id") int user_id,@Param("user_name") String user_name,@Param("major") String major,@Param("sex") String sex,@Param("sdept") String sdept){
        userRepository.UpdateUserData(user_id,user_name,major,sex,sdept);
    }

    public void UpdateMajor(@Param("user_id") int user_id,@Param("major") String major) {
        userRepository.UpdateMajor(user_id,major);
    }

    public void UpdateSex(@Param("user_id") int user_id,@Param("sex") String sex) {
        userRepository.UpdateSex(user_id,sex);
    }

    public void UpdateSdept(@Param("user_id") int user_id,@Param("sdept") String sdept) {
        userRepository.UpdateSdept(user_id,sdept);
    }

}
