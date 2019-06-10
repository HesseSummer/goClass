package com.weixin.demo.repository;

import com.weixin.demo.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository <Schedule,String> {
    List<Schedule> findAll();
    Schedule findByCno(String Cno);

    @Query(value = "select * from  Schedule u where u.week_detail like CONCAT('%,',:week_detail,',%')", nativeQuery = true)
    List<Schedule> findByWeek_detailLike(@Param("week_detail") String week_detail);

    @Query(value = "select * from  Schedule u where u.week_detail like CONCAT('%,',:week_detail,',%')and u.weekday=:weekday", nativeQuery = true)
    List<Schedule> findBydata(@Param("week_detail") String week_detail,@Param("weekday") String weekday);

    @Query(value = "select * from  Schedule u where u.site_name like :site_name", nativeQuery = true)
    List<Schedule> findBysite(@Param("site_name") String site_name);

    @Query(value = "select * from Schedule WHERE cname like CONCAT('%',:cname,'%')",nativeQuery = true)
    List<Schedule> findbycname(@Param("cname")String cname);

    @Query(value = "select * from Schedule WHERE tname like CONCAT('%',:tname,'%')",nativeQuery = true)
    List<Schedule> findbytname(@Param("tname")String tname);

    @Query(value = "select * from Schedule WHERE major like CONCAT('%',:major,'%')",nativeQuery = true)
    List<Schedule> findbymajor(@Param("major")String major);
}
