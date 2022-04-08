//give numbers to set the time
const setTime = (hours ,minutes) => 
{
    try{
        let time = new Date()

        time.setHours(hours)
        time.setMinutes(minutes)
        return time
    }catch(error){
        console.log("error - setTime()" , error)
    }
    
}

const changeTime = (time ,addMinutes) => 
{
   try{
       time.setMinutes(time.getMinutes() + addMinutes)  
   }catch(e){
       console.log('eror',e)
   } 
}

//list of guides
const guides = 
[
    {
        firstName:"Yotam",
        startTime: setTime(16,0),
        endTime: setTime(20,0),
        days:['Monday' , 'Thursday'],
        swimmingStyle:['rowing','chest', 'butterfly' , 'back'],
    },
    {
        firstName:"Yoni",
        startTime: setTime(8,0),
        endTime: setTime(10,0),
        days:['Tuesday','Wednesday','Thursday'],
        swimmingStyle:['chest', 'butterfly'],
    },
    {
        firstName:"Joni",
        startTime: setTime(10,0),
        endTime: setTime(19,0),
        days:['Sunday','Tuesday', 'Thursday'],
        swimmingStyle:['rowing','chest', 'butterfly' , 'back'],
    },
]

//varibales
export const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday']
export let collectiveClasses = [
{style:'rowing', count:0, studentsCollective:[] , collectiveDay: '', startCollectiveTime: '', endCollectiveTime:'', guideName:''},
{style:'chest', count:0, studentsCollective:[], collectiveDay: '', startCollectiveTime: '', endCollectiveTime:'', guideName:''}, 
{style:'butterfly', count:0, studentsCollective:[], collectiveDay: '', startCollectiveTime: '', endCollectiveTime:'', guideName:''} , 
{style:'back', count:0, studentsCollective:[], collectiveDay: '', startCollectiveTime: '', endCollectiveTime:'', guideName:''}
]

export let classStartTimeArray = [];// an array of start times
export let newStudentsArray = [];

async function matchClasses (students) 
{
    let classes = [];
    
    for(const day of days)
    {
        for(const student of students)
        {
            for(const guide of guides)
            {

                if(student.days.includes(day) && guide.days.includes(day))
                {
                    if(guide.swimmingStyle.includes(student.swimmingStyle))
                    {
                        let startHour = (new Date(guide.startTime)).getHours();
                        let startMinutes = (new Date(guide.startTime)).getMinutes();

                        let diffHours = guide.endTime.getHours() - startHour;// The diff between end and start hours.
                        let diffMinutes = guide.endTime.getMinutes() - startMinutes;// The diff between end and start minutes.

                        let startTimeString = guide.startTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false});

                        if(!classStartTimeArray.includes(startTimeString))
                        {
                            if(!((diffHours <= 1) && ((Math.abs(diffMinutes) === 45) || (Math.abs(diffMinutes) === 0))))
                            {
                                if((Math.abs(diffMinutes) <= 45) && student.lessonType === 'private')
                                {
                                    let newStartTime = new Date();
                                    newStartTime = setTime(startHour , startMinutes);
                                    let newEndTime = setTime(guide.startTime.getHours(), guide.startTime.getMinutes() + 45);
                                    
                                    classes.push({
                                        classType:'private',
                                        day: day,
                                        startTime: newStartTime , 
                                        endTime: newEndTime,
                                        color:'#ff7f50',
                                        guideName: guide.firstName,
                                        studentName: student.firstName,
                                        swimmingStyle: student.swimmingStyle,
                                        description:`Private swimming lesson  between ${guide.firstName} and ${student.firstName} `
                                    })

                                    //add starttime to array
                                    classStartTimeArray.push(guide.startTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false}));
                                    //change time of guide
                                    changeTime(guide.startTime, 45);
                                    //add the student to a new array and remove him from the current one
                                    newStudentsArray.push(student);

                                    const newStudentArr = students.filter(s => s !== student); 
                                    students = newStudentArr;
                                }//if classType is private
                                else if((diffHours >= 1) && student.lessonType === 'collective')
                                {
                                    for(let i = 0; i < collectiveClasses.length; i++)
                                    {
                                        if(collectiveClasses[i].style === student.swimmingStyle)
                                        {
                                            collectiveClasses[i].count++;
                                            collectiveClasses[i].studentsCollective.push(student);
                                            newStudentsArray.push(student);

                                            if(collectiveClasses[i].guideName === ''){
                                                collectiveClasses[i].guideName = guide.firstName;
                                            }
                                            //remove the student from the students array
                                            const newStudentArr = students.filter(s => s !== student); 
                                            students = newStudentArr;

                                            if(collectiveClasses[i].count === 2 && collectiveClasses[i].guideName === guide.firstName)
                                            {
                                                //add starttime to array
                                                classStartTimeArray.push(guide.startTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false}));

                                                console.log("starttime",guide.startTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false}))

                                                let newStartTime = new Date();
                                                newStartTime = setTime(startHour , startMinutes);
                                                collectiveClasses[i].startCollectiveTime = newStartTime;
                                                collectiveClasses[i].endCollectiveTime = setTime(guide.startTime.getHours(), guide.startTime.getMinutes() + 60);
                                                collectiveClasses[i].collectiveDay = day;
                                                ///update the guides time 
                                                changeTime(guide.startTime, 60);
                                            }

                                        }

                                    }

                                }//if classtype is collective
                                else if((Math.abs(diffMinutes) <= 45) && student.lessonType === 'both')
                                {
                                    let newStartTime = new Date();
                                    newStartTime = setTime(startHour , startMinutes);
                                    let newEndTime = setTime(guide.startTime.getHours(), guide.startTime.getMinutes() + 45);
                                    classes.push({
                                        classType:'private',
                                        day: day,
                                        startTime: newStartTime , 
                                        endTime: newEndTime,
                                        color:'#ff7f50',
                                        guideName: guide.firstName,
                                        studentName: student.firstName,
                                        swimmingStyle: student.swimmingStyle,
                                        description:`Private swimming lesson  between ${guide.firstName} and ${student.firstName}`
                                    });

                                    //add starttime to array
                                    classStartTimeArray.push(guide.startTime.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false}));
                                    //change time of guide
                                    changeTime(guide.startTime, 45);
                                    //add the student to a new array and remove him from the current one
                                    newStudentsArray.push(student);
                                    const newStudentArr = students.filter(s => s !== student); 
                                    students = newStudentArr;
                                }

                            }//check if there is time to add a class
                            else
                            {
                                classes.push({
                                    classType:'error',
                                    day: '',
                                    startTime: null,
                                    endTime: null,
                                    color: '',
                                    guideName: '',
                                    studentName: student.firstName,
                                    swimmingStyle: '',
                                    description:'There is not enough time, we will try to stroke you at another time!!'
                                });
                            }
                            break;
                        }
                        else
                        {
                            classes.push({
                                classType:'error',
                                day: '',
                                startTime: null,
                                endTime: null,
                                color: '',
                                guideName: '',
                                studentName: student.firstName,
                                swimmingStyle: '',
                                description:'There is already a lesson planned at this time.'
                            });
                        }
                        //break;

                    }//check if guide teaches the swimming style of the student

                }//check if both includes the same day

            }//guides

        }//students
        for(let i = 0; i < collectiveClasses.length; i++)
        {
           if(collectiveClasses[i].count >= 2)
           {
                classes.push({
                  classType:'collective',
                  day: collectiveClasses[i].collectiveDay,
                  startTime: collectiveClasses[i].startCollectiveTime,
                  endTime: collectiveClasses[i].endCollectiveTime,
                  color: '#5f9ea0',
                  guideName: collectiveClasses[i].guideName,
                  studentName: collectiveClasses[i].studentsCollective.map((student) => 
                  student.firstName + ' '
                  ),
                  swimmingStyle: collectiveClasses[i].style,
                  description:`Collective swimming lesson between ${collectiveClasses[i].guideName} and the students: ${collectiveClasses[i].studentsCollective.map((student) => 
                      student.firstName
                  ) }. `
                });

                console.log('collectivearray',collectiveClasses[i].studentsCollective)

                collectiveClasses[i] = {
                    style: collectiveClasses[i].style,
                    count: 0, 
                    studentsCollective:[] ,
                    collectiveDay: '', 
                    startCollectiveTime: '', 
                    endCollectiveTime:'', 
                    guideName:'',
                }
            }
            else if(collectiveClasses[i].count === 1)
            {
               students.push(collectiveClasses[i].studentsCollective[0]);

               collectiveClasses[i] = {
                style: collectiveClasses[i].style,
                count: 0, 
                studentsCollective:[] ,
                collectiveDay: '', 
                startCollectiveTime: '', 
                endCollectiveTime:'', 
                guideName:''
               }
            }
        }
        //reset the guides times
        for(const g of guides)
        {
            if((g.firstName === 'Yotam'))
            {
               g.startTime = setTime(16,0);
                //break;
            } 
            else if((g.firstName ===  'Yoni'))
            {
                g.startTime = setTime(8,0);
               // break;
            }
            else if((g.firstName === 'Joni'))
            {
                g.startTime = setTime(10,0);
                //break;
            } 
        }
        classStartTimeArray= [];

    }//days
    if(students.length !== 0)
    {
       for(const student of students)
       {
          classes.push({
            classType:'error',
            day: '',
            startTime: null,
            endTime: null,
            color: '',
            guideName:'',
            studentName: student.firstName,
            swimmingStyle:'',
            description:`${student.firstName} ${student.lastName} was not included in a class because there was no match with the instructors.`
          })
       }
    }
    return classes;
}
export default matchClasses;

