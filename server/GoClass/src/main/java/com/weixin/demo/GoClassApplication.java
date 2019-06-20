package com.weixin.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@ServletComponentScan
@EnableScheduling
@RestController
public class GoClassApplication {

    public static void main(String[] args) {
        System.out.println("System Running!");

        SpringApplication.run(GoClassApplication.class, args);

    }

}
