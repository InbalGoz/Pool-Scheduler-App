import React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const SchedulerScreen =  () => {
  const [currentDate , setCurrentDate] = useState(new Date());
  const [classesData, setClassesData] = useState([]);

  //נעבור על כל השיעורים ונשלח אותם, וגם נקבל אותם פה 
  const fetchClassesData = async () => {
    const { data } = await axios.get('http://localhost:3001/schedulerclasses');
    console.log('schedulerclasses' , data)

    setClassesData(data);//fetch all students

    console.log('neww' , data);
   }


  useEffect(()=>{
    console.log('useeffect_2')
    fetchClassesData();
  },[]);/////[classesData]*/

  const currentDateChange = (currentDate) => {
     setCurrentDate(currentDate);
  }



  const Appointment = ({
    children, style, ...restProps
  }) => (
    classesData.map((child) =>{
      return(
        <Appointments.Appointment
          {...restProps}
          style={{
           ...style,
           backgroundColor: '#FFC107',
           borderRadius: '8px',
          }}
        >
         {children}
       </Appointments.Appointment>
      )
    })
    
  );


  
  return(
      <Paper>
         <Scheduler
            data={classesData}
           //height={}
          >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <DayView
            startDayHour={6}
            endDayHour={22}
          />
          <WeekView
            startDayHour={6}
            endDayHour={22}
          />
         <MonthView/>
         <Toolbar />
         <ViewSwitcher />
         <DateNavigator />
         <TodayButton />
         <Appointments />
         <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
       </Scheduler>
     </Paper>
  )
  
  };

export default SchedulerScreen;