package com.weixin.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weixin.demo.entity.User;
import com.weixin.demo.model.WXSessionModel;
import com.weixin.demo.service.UserService;
import com.weixin.demo.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class WXLoginController {
    @Autowired
    private UserService userService;
    //private static Logger log = LoggerFactory.getLogger(WeixinController.class);

    @PostMapping("/wxlogin")
    public int wxLogin(String code,String user_name){

        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> param = new HashMap<>();
        param.put("appid","wxf32b2948391e668b");
        param.put("secret","c2d592a35ef2c6ec8b5024ea5b076ee8");
        param.put("js_code",code);
        param.put("grant_type","authorization_code");

        String wxResult=HttpClientUtil.doGet(url,param);

        WXSessionModel model = JsonUtil.jsonToPojo(wxResult,WXSessionModel.class);
        boolean a=userService.IsUser(model.getOpenid());
        if(a)
        {
            System.out.println("new");
        }
        else{
            System.out.println("old");
        }
        if(userService.IsUser(model.getOpenid())) {
            userService.UpdateSessionKey(model.getOpenid(),model.getSession_key());
        }
        else{
            userService.InsertUser(model.getOpenid(), model.getSession_key());
            userService.UpdataUserName(model.getOpenid(),user_name);
        }
        List<User>userList=userService.findByOpenid(model.getOpenid());
        return userList.get(0).getUser_id();
    }


    @RequestMapping("/userdata")
    public List<User> getUserdata(String open_id){
        return userService.findByOpenid(open_id);
    }

    }



