package com.weixin.demo.controller;

import com.weixin.demo.entity.User;
import com.weixin.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/1")
    public String hellouser(){
        return "Hello User.";
    }

    @RequestMapping("/userdata")
    public List<User> getUserdata(String open_id){
        return userService.findByOpenid(open_id);
    }

    @RequestMapping("/setuserdata")
    void setuser(@Param("user_id") int user_id,@Param("user_name") String user_name,@Param("sex") String sex,@Param("major") String major,@Param("sdept") String sdept)
    {
        userService.UpdateUserData(user_id,user_name,sex,major,sdept);
    }

    @RequestMapping("/setmotto")
    public void SetMotto(@Param("user_id") int user_id,@Param("motto") String motto)
    {
        userService.UpdataMotto(user_id,motto);
    }

    @RequestMapping("/setnote")
    public void SetLabel(@Param("user_id") int user_id,@Param("note") String note)
    {
        userService.UpdataNote(user_id,note);
    }

    @RequestMapping("/setsex")
    void setsex(@Param("user_id") int user_id,@Param("sex") String sex){
        userService.UpdateSex(user_id,sex);
    }

    @RequestMapping("/setsdept")
    void setsdept(@Param("user_id") int user_id,@Param("sdept") String sdept){
        userService.UpdateSdept(user_id,sdept);
    }

    @RequestMapping("/setmajor")
    public void setmajor(@Param("user_id") int user_id,@Param("major") String major){
        userService.UpdateMajor(user_id,major);
    }

}
