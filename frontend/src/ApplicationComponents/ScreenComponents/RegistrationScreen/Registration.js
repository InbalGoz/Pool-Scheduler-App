import React , { useState , useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import {Paper , Stack , Button , Modal , Box ,Typography, InputLabel} from '@mui/material';
import { styled } from '@mui/material/styles';
import MouseIcon from '@mui/icons-material/Mouse';
import StudentsTable from '../Table/StudentsTable';
import RegistrationForm from './RegistrationForm';
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width:400,
    height:80,
  }));

  

const Registration = ({getData }) => {
  const [studentsData , setStudentsData] = useState([{}]);//array of student obj
  const [studentDataForm , setStudentDataForm] = useState({});// only one student
  const [open, setOpen] = useState(false);

  const [counter , setCounter] = useState(0);
  const [isDisabled,setIsDisabled] = useState(localStorage.getItem('isDisabled') || false)
  //localStorage.getItem('isDisabled')

  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  
   
  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:3001/');
    console.log('data' , data)
    setStudentsData(data);//fetch all students
   }

   useEffect(()=>{
    localStorage.setItem('isDisabled',isDisabled)
  },[isDisabled]);

  useEffect(()=>{
    fetchData();
  },[]);/////[studentsData]

  
  const handleAddClick =  (formData) => {
   //setStudentDataForm(formData);//updates only one student
   // where do we want this information will go.
   //clearState();  
   setIsDisabled(true);
   setStudentDataForm(formData);
   axios.post('http://localhost:3001/register', formData);
   
  }

  //add only few students
  const addRows = (formData) => { 
     const totalStudents = studentsData.length; 
     formData.id = totalStudents + 1; 
     const updatedStudentData = [...studentsData]; 
     updatedStudentData.push(formData); 
     //console.log("pushed",updatedStudentData)
     setStudentsData(updatedStudentData);
  };

  const deleteItem =  (studentId) => {
     axios.delete("/delete/" + studentId);
     Swal.fire(
      'Deleted!',
      'Student deleted from the list.',
      'success'
    )
    console.log("deletehiiii")
    //alert("Student deleted from the list.");
   };
  
   const handleDeleteClick = (studentId) =>{
     const newStudents = [...studentsData];
     deleteItem(studentId);
     const index = studentsData.findIndex((student) => student._id === studentId);
     newStudents.splice(index,1);
     setStudentsData(newStudents);
     setIsDisabled(true);
   };

  

   const handleRestartSubmit = ()=>{
    console.log('handleRestartSubmit')
      axios.delete('/deleteall');
      setIsDisabled(false);
   }
  
   const handleSubmit =  () =>{
      console.log('handleSubmit')
      setIsDisabled(true);
      getData(studentsData);
   };

   const sendRowData = async (headers, data) => {
      const rows =[];
      await data.forEach(async (row) => {
        let rowData = {}
        row.forEach((element,index)=> {
          
          if(headers[index] == 'days') {
            console.log('hii elemnt' ,element)
  
            const daysArr = element.split(',');
            rowData[headers[index]] = daysArr;
          }else{
            rowData[headers[index]] = element;
            console.log("rowdata" , rowData)
          }  
        });
        rows.push(rowData);
        const sendData = await axios.post('http://localhost:3001/register', rowData);
      });
      console.log("rows", rows)  
  }  

  const importExcel = (event) => {
    setIsDisabled(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (event) => {
       //parse data
       const bstr = event.target.result;
       const workBook = XLSX.read(bstr, {type:"binary"});

       //get first sheet
       const workSheetName = workBook.SheetNames[0];
       const workSheet = workBook.Sheets[workSheetName];

       const fileData = XLSX.utils.sheet_to_json(workSheet, {header:1});
      // console.log(fileData)
       const headers = fileData[0];
       fileData.splice(0,1)
       
      // setStudentsData(convertToJson(headers,fileData));
      sendRowData(headers ,fileData);

       fetchData();  
    }
    reader.readAsBinaryString(file);
  };

  const exportExcel = () =>{
    // changeDisable(false);
     setIsDisabled(true);
     console.log("isdia" , isDisabled)
 
     const newData = studentsData.map((row) => {
       delete row.__v;
       delete row._id;
       console.log('row',row)
       row.days = row.days.toString();
       return row;
     })
 
     const workSheet = XLSX.utils.json_to_sheet(newData);
     const workBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workBook, workSheet, "students");
     //Buffer
     let buf = XLSX.write(workBook, {bookType:"xlsx", type:"buffer"});
     //Binary string
     XLSX.write(workBook, {bookType:"xlsx", type:"binary"});
     //Download
     XLSX.writeFile(workBook, "StudentsData.xlsx");
 
    };

  const style = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
   
  };

  //<MouseIcon fontSize='medium'/>
  //direction="row" spacing={1} alignItems="center" justifyContent="center" style={{ minHeight: '20vh' }}
  //<input className="form-control" type='file' style={{fontSize:'20px',marginLeft:95, marginTop:5}}  onChange={importExcel}/>

  return (
    <>
    <div>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" style={{spacing:2, minHeight: '20vh' }} >
        <Item style={{ backgroundColor:'rgba(220, 220, 220,0.8)', fontWeight:'bold'}}>
          <InputLabel htmlFor="register" sx={{fontWeight:'bold'}}>Registration Form:</InputLabel>
            <Button  id="register" variant="primary" style={{fontSize:'20px', marginTop:5, backgroundColor:'rgba(255, 255, 255)'}}  onClick={handleShow} >
              Click Here 
            </Button>
        </Item>
        

        <Item style={{ backgroundColor:'rgba(220, 220, 220,0.8)'}}>
            <InputLabel htmlFor="import" sx={{fontWeight:'bold'}}>Upload File:</InputLabel>
             <input id="import" className="form-control" type='file' style={{fontSize:'20px',marginLeft:95, marginTop:10}}  onChange={importExcel}/>
        </Item>
        

        
        
      </Stack>
    </div>

    <StudentsTable studentData={studentsData} handleSubmit={handleSubmit} handleDeleteClick={handleDeleteClick} isDisabled={isDisabled}  handleRestartSubmit={handleRestartSubmit} exportExcel={exportExcel}/>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
         
          <RegistrationForm func={addRows} handleAddClick={handleAddClick}/>
  
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>

    </>
  )
}

export default Registration;

/*
<div>
      <Stack >
        <Item>
          <label htmlFor="formFile" className="form-label" style={{fontSize: '23px' , marginTop:30}}>Fill a Registration Form</label><br/>
           <Button  variant="primary" style={{fontSize:'15px', mt:20, backgroundColor:'rgba(220, 220, 220,0.7)'}}  onClick={handleShow}>
               <MouseIcon fontSize='medium'/>
            </Button>
            
        </Item>
        <Item>
        <label htmlFor="formFile" className="form-label" style={{fontSize: '23px'}}>Upload file:</label>
        <input className="form-control" type='file' style={{fontSize:'20px',marginLeft:95, marginTop:5}}  onChange={importExcel}/>
        </Item>
      </Stack>
    </div>
    */


