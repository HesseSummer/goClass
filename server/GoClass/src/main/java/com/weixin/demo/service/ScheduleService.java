package com.weixin.demo.service;

import com.weixin.demo.entity.Schedule;
import com.weixin.demo.repository.ScheduleRepository;
import com.weixin.demo.service.impl.ScheduleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ScheduleService {
    public List<Schedule> getAll();

    public Schedule getByCno(String Cno);

    public List<Schedule> getWeekSchedule(String week_detail);

    public List<Schedule>getTodaySchedule(String week_detail,String weekday);

    public List<Schedule>floorschedule(String site_name);

    public List<Schedule>getbycname(String cname);

    public List<Schedule>getbyteacher(String tname);

    public List<Schedule>getbymajor(String major);
}
