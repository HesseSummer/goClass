package com.weixin.demo.controller;

import com.weixin.demo.entity.Schedule;
import com.weixin.demo.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @GetMapping(value = "/floortoday")
    public int[][] floortodayschedule(@Param(value="week_detail") String week_detail,@Param(value="weekday") String weekday,@Param(value = "site_name") String site_name)
    {
        List<Schedule> today=scheduleService.getTodaySchedule(week_detail,weekday);
        List<Schedule> floor=scheduleService.floorschedule(site_name+"%");
        today.retainAll(floor);
        int[][] status;
        status=trans(today,site_name);
        return status;
    }

    @GetMapping(value = "/teacher")
    public List<Schedule> rublesson_teacher(@Param(value = "tname")String tname)
    {
        return scheduleService.getbyteacher(tname);
    }

    @GetMapping(value = "/cname")
    public List<Schedule> rublesson_cname(@Param(value = "cname")String cname)
    {
        System.out.println(cname);
        return scheduleService.getbycname(cname);
    }

    @GetMapping(value = "/major")
    public List<Schedule> rublesson_major(@Param(value = "major")String major)
    {
        return scheduleService.getbymajor(major);
    }



    public int[][] trans(List<Schedule> schedules,String site_name)
    {
        int [][] status;
        if(site_name.charAt(0)=='四')
        {
            if(site_name.charAt(2)=='B') status=new int[13][5];
            else status=new int[11][5];
        }
        else status=new int[5][5];
        for(int i=0;i<status.length;i++)
        {
            for(int j=0;j<status[i].length;j++) status[i][j]=0;
        }
        for(int i=0;i<schedules.size();i++)
        {
            Schedule schedule=schedules.get(i);
            String Site_name=schedule.getSite_name();
            String class_time=schedule.getClass_time();
            int room,time;
            int room1,room2;
            room1=Integer.valueOf(Site_name.charAt(Site_name.length()-2))-48;
            room2=Integer.valueOf(Site_name.charAt(Site_name.length()-1))-48;
            room=room1*10+room2;
            time=Integer.valueOf(class_time.charAt(0))-48;
            if(time>10) continue;
            time=(time+1)/2-1;
            status[room-1][time]=1;
        }
        return status;
    }




    /*
    @GetMapping(value = "/week")
    public List<Schedule> weekschedule(@Param(value="week_detail") String week_detail)
    {
        List<Schedule> schedules=scheduleService.getWeekSchedule(week_detail);
        return schedules;
    }

    @GetMapping(value = "/today")
    public List<Schedule> todayschedule(@Param(value="week_detail") String week_detail,@Param(value="weekday") String weekday)
    {
        System.out.println(week_detail+","+weekday);
        return scheduleService.getTodaySchedule(week_detail,weekday);
    }

    @GetMapping(value = "/floor")
    public List<Schedule> floorschedule(@Param(value = "site_name") String site_name)
    {
        return scheduleService.floorschedule(site_name+"%");
    }
    */
}
