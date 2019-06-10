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
    void setuser(@Param("open_id") String open_id,String user_name,String sex,String major,String sdept,String motto)
    {
        userService.UpdateUserData(open_id,user_name,sex,major,sdept,motto);
    }
}
