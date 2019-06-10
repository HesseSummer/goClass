package com.weixin.demo.entity;

import javax.persistence.*;

@Entity
@Table(name="schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String weekday;
    private String class_time;
    private String week;
    private String week_detail;
    private String cno;
    private String cname;
    private String tname;
    private String site_name;
    private String class_time_detail;
    private String site_name_detail;
    private String course_nature;
    private String building;
    private String major;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWeekday() {
        return weekday;
    }

    public void setWeekday(String weekday) {
        this.weekday = weekday;
    }

    public String getClass_time() {
        return class_time;
    }

    public void setClass_time(String class_time) {
        this.class_time = class_time;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getWeek_detail() {
        return week_detail;
    }

    public void setWeek_detail(String week_detail) {
        this.week_detail = week_detail;
    }

    public String getCno() {
        return cno;
    }

    public void setCno(String cno) {
        this.cno = cno;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }

    public String getSite_name() {
        return site_name;
    }

    public void setSite_name(String site_name) {
        this.site_name = site_name;
    }

    public String getClass_time_detail() {
        return class_time_detail;
    }

    public void setClass_time_detail(String class_time_detail) {
        this.class_time_detail = class_time_detail;
    }

    public String getSite_name_detail() {
        return site_name_detail;
    }

    public void setSite_name_detail(String site_name_detail) {
        this.site_name_detail = site_name_detail;
    }

    public String getCourse_nature() {
        return course_nature;
    }

    public void setCourse_nature(String course_nature) {
        this.course_nature = course_nature;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
