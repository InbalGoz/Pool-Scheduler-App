import React , {useState, Fragment , useEffect} from 'react';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import  matchClasses  from './Algorithm/Algorithm.js'
import TopBar from './ApplicationComponents/Components/TopBar';
import SchedulerScreen from './ApplicationComponents/ScreenComponents/SchedulerScreen/SchedulerScreen';
import Registration from './ApplicationComponents/ScreenComponents/RegistrationScreen/Registration';
import GuidesSchedulerScreen from './ApplicationComponents/ScreenComponents/GuidesScreen/GuidesSchedulerScreen';
import JoniClasses from './ApplicationComponents/ScreenComponents/GuidesScreen/JoniClasses';
import YotamClasses from './ApplicationComponents/ScreenComponents/GuidesScreen/YotamClasses';
import YoniClasses from './ApplicationComponents/ScreenComponents/GuidesScreen/YoniClasses';
import Swal from 'sweetalert2'
import axios from 'axios';


const App = () => {

   const [dataClasses, setDataClasses] = useState([]);
   const [guidesData, setGuidesData] = useState([]);


  const getClassesData = async (studentsData) => {

    console.log("appstudentdata" , studentsData)
   
    const newClasses = await matchClasses(studentsData);
    
    console.log("newClasses" , newClasses)
  
    let curdataClasses = [];
    let guidesClasses = [];
    
    let studentsNames =[];

     newClasses.forEach(async(cl) => {
        if(cl.classType === 'error'){ 
          studentsNames.push(cl.studentName);
          console.log("name" , cl.studentName); 
          //alert(cl.description);
        }
    });

    const text = `There is no lesson for  ${studentsNames.join()} because there was no match with the instructors.`
    if(studentsNames.length !== 0){
      Swal.fire({ 
        icon: 'error',
        title: 'Oops...',
        text: text , 
       });
    }

    newClasses.forEach(async (cl) => {
      if(cl.classType !== "error"){
        const isoClassStart = new Date(cl.startTime.getTime() - cl.startTime.getTimezoneOffset() * 60000).toISOString();
        const isoClassEnd = new Date(cl.endTime.getTime() - cl.endTime.getTimezoneOffset() * 60000).toISOString();

        const classData = {
          startDate: isoClassStart , 
          endDate: isoClassEnd,
          title: cl.description,
          classType:cl.classType,
          color: cl.color,
        }

        curdataClasses.push(classData);

        const type = typeof cl.studentName;
        let studentsNames = cl.studentName;

        if(type !== 'string'){
          studentsNames = cl.studentName.join();
        }

        const guidesClassData = {
          name: cl.guideName,
          classType: cl.classType,
          swimmingStyle: cl.swimmingStyle,
          day: cl.day,
          startTime: cl.startTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false}), 
          endTime: cl.endTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false}),
          students: studentsNames,
        } 
        guidesClasses.push(guidesClassData);

      }  
    })
    console.log("curentdaat", curdataClasses)
    
    setDataClasses(curdataClasses);
    setGuidesData(guidesClasses); 
  }

  const sendClassesData = async (dataClasses) =>{
    console.log("send data")
    dataClasses.forEach(async(element) => {
      const sendData = await axios.post('http://localhost:3001/schedulerclasses' , element);
     });
  }

  const sendGuidesData = async() =>{
    guidesData.forEach(async(element)=>{
      const sendData = await axios.post('http://localhost:3001/guidesclasses' , element);
    })
  };

  useEffect(() => {
    sendGuidesData(guidesData);
  },[guidesData])//[dataClasses]*/

  useEffect(()=>{
    console.log("dataClasses", dataClasses)
    sendClassesData(dataClasses);
  },[dataClasses])

  
  return (
    <>
     <Router>
       <TopBar/>
         <main className='py-2'>
            <Routes>
              <Fragment>
               <Route exact  path="/" />
               <Route path="/register" element={<Registration getData={getClassesData}/>}/>
               <Route path="/shiftmanagement" element={<GuidesSchedulerScreen/>}/>
               <Route path="/shiftmanagement/yotam" element={<YotamClasses  />}/>
               <Route path="/shiftmanagement/yoni" element={<YoniClasses />}/>
               <Route path="/shiftmanagement/joni" element={<JoniClasses />}/>
               <Route path="/scheduler" element={<SchedulerScreen />}/>
               
              </Fragment>
            </Routes>
          </main>
    </Router>
    </>
  );
}

export default App;

/*
<Route path="/register" element={<Registration getData={getClassesData}/>}/>
<Route path="/shiftmanagement" element={<GuidesScheduler guideClasses={guidesData} />}/>
 <Route path="/scheduler" element={<Scheduler classes={dataClasses}/>}/>*/

 /*
 <Route path="/shiftmanagement" element={<GuidesSchedulerScreen guideClasses={guidesData}/>}/>
               <Route path="/shiftmanagement/yotam" element={<YotamClasses yotamClasses={yotamData} />}/>
               <Route path="/shiftmanagement/yoni" element={<YoniClasses yoniClasses={yoniData}/>}/>
               <Route path="/shiftmanagement/joni" element={<JoniClasses joniClasses={joniData}/>}/>
               <Route path="/scheduler" element={<SchedulerScreen classes={dataClasses}/>}/>*/