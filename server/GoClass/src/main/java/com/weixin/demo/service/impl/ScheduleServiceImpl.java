package com.weixin.demo.service.impl;

import com.weixin.demo.entity.Schedule;
import com.weixin.demo.repository.ScheduleRepository;
import com.weixin.demo.service.ScheduleService;
import com.weixin.demo.service.impl.ScheduleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Schedule> getAll(){
        return scheduleRepository.findAll();
    }
    public Schedule getByCno(String Cno){
        return scheduleRepository.findByCno(Cno);
    }

    public List<Schedule> getWeekSchedule(String week_detail)
    {
        return scheduleRepository.findByWeek_detailLike(week_detail);
    }

    public List<Schedule>getTodaySchedule(String week_detail,String weekday)
    {
        return scheduleRepository.findBydata(week_detail,weekday);
    }

    public List<Schedule>floorschedule(String site_name)
    {
        //List<Schedule> today=scheduleRepository.findBydata(week_detail,weekday);
        return scheduleRepository.findBysite(site_name);
    }

    public List<Schedule>getbycname(String cname)
    {
        return scheduleRepository.findbycname(cname);
    }

    public List<Schedule>getbyteacher(String tname)
    {
        return scheduleRepository.findbytname(tname);
    }

    public List<Schedule>getbymajor(String major)
    {
        return scheduleRepository.findbymajor(major);
    }
}
