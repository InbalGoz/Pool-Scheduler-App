import React,{Fragment} from 'react';
import { Button, Paper , Table , TableBody , TableCell , TableContainer, TableHead , Stack, TableRow} from '@mui/material';
import StudentRow from './StudentRow';
import * as XLSX from 'xlsx';


const StudentsTable = ({ studentData , handleSubmit , handleDeleteClick , handleRestartSubmit, isDisabled, exportExcel}) => {
  const handleDelete = (studentId) =>{
    handleDeleteClick(studentId);
  }


  /*const exportExcel = () =>{
   // changeDisable(false);
    console.log("studentdata" , studentData)

    const newData = studentData.map((row) => {
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

   };*/
   const cellStyle={fontSize:'15pt'}

   const submitStyle = {backgroundColor:'rgba(0, 102, 255,0.8)', fontSize:'20px'}

  return (
    <Paper  sx={{ overflow: 'hidden' ,width: '100%'}}>
      <Stack direction="row" spacing={1} style={{ minWidth: '20vh' }}>
        <Stack direction="column" spacing={1}>
          <Button variant="success" disabled={isDisabled} size='lg' style={submitStyle} onClick={handleSubmit}>
              Submit
           </Button>
           <Button variant="success"  size='lg' style={{backgroundColor:'rgba(0, 102, 255,0.8)'}} onClick={handleRestartSubmit}>
             Restart before Submit
           </Button>
        </Stack>
           <Button className='m-2' variant="success" size='lg' style={submitStyle} onClick={exportExcel}> Export excel </Button>
      </Stack>
    <TableContainer  sx={{ maxHeight: 600 }}>
      <Table stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow >
              <TableCell style={cellStyle}>Student Number</TableCell>
              <TableCell style={cellStyle}>First Name</TableCell>
              <TableCell style={cellStyle}>Last Name</TableCell>
              <TableCell style={cellStyle}>Days</TableCell>
              <TableCell style={cellStyle}>Swimming Style</TableCell>
              <TableCell style={cellStyle}>Lesson Type</TableCell>
              <TableCell style={cellStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         <Fragment>
             {studentData && studentData.map((student , index) => (
                <StudentRow key={index} student={student} index={studentData.indexOf(student) + 1} handleDelete={handleDelete}/>  
             ))}
            </Fragment>
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  )
}

export default StudentsTable;

