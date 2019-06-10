package com.weixin.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String Hello()
    {
        System.out.println("Hello,Triple2");
        System.out.println("Hello，101");
        return "Hello,Triple2";
    }
}
