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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@RestController
@RequestMapping("/login")
public class WXLoginController {
    @Autowired
    private UserService userService;
    //private static Logger log = LoggerFactory.getLogger(WeixinController.class);

    @PostMapping("/wxlogin")
    public ReturnData wxLogin(String code, String user_name){
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> param = new HashMap<>();
        param.put("appid","wxf32b2948391e668b");
        param.put("secret","c2d592a35ef2c6ec8b5024ea5b076ee8");
        param.put("js_code",code);
        param.put("grant_type","authorization_code");

        String wxResult=HttpClientUtil.doGet(url,param);

        WXSessionModel model = JsonUtil.jsonToPojo(wxResult,WXSessionModel.class);
        if(userService.IsUser(model.getOpenid())) {
            userService.UpdateSessionKey(model.getOpenid(),model.getSession_key());
        }
        else{
            userService.InsertUser(model.getOpenid(), model.getSession_key());
            userService.UpdataUserName(model.getOpenid(),user_name);
        }
        List<User>userList=userService.findByOpenid(model.getOpenid());
        //String skey=getSha1(model.getSession_key());
        String skey=shaEncode(model.getSession_key());
        ReturnData data=new ReturnData();
        data.user_id=userList.get(0).getUser_id();
        data.skey=skey;
        return data;
    }

    public class ReturnData{
        public int user_id;
        public String skey;
    }

    @RequestMapping("/userdata")
    public List<User> getUserdata(String open_id){
        return userService.findByOpenid(open_id);
    }


    public  String getSha1(String str){
        char[] buff=null;
        if (null == str || 0 == str.length()){
            return null;
        }
        char[] hexDigits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f'};
        try {
            MessageDigest mdTemp = MessageDigest.getInstance("SHA1");
            mdTemp.update(str.getBytes("UTF-8"));

            byte[] md = mdTemp.digest();
            int j = md.length;
            char[] buf = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                buf[k++] = hexDigits[byte0 >>> 4 & 0xf];
                buf[k++] = hexDigits[byte0 & 0xf];
            }
            buff=buf;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return new String(buff);
        }

        public String shaEncode(String inStr) {
        StringBuffer buffer=null;
        MessageDigest sha = null;
        try {
            sha = MessageDigest.getInstance("SHA");
        } catch (Exception e) {
            System.out.println(e.toString());
            e.printStackTrace();
            return "";
        }
        try {
            byte[] byteArray = inStr.getBytes("UTF-8");
            byte[] md5Bytes = sha.digest(byteArray);
            StringBuffer hexValue = new StringBuffer();
            for (int i = 0; i < md5Bytes.length; i++) {
                int val = ((int) md5Bytes[i]) & 0xff;
                if (val < 16) {
                    hexValue.append("0");
                }
                hexValue.append(Integer.toHexString(val));
            }
            buffer=hexValue;
        }catch (Exception e)
        {
            System.out.println(e);
        }

        return buffer.toString();
    }

    }



