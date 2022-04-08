import React from 'react';
import { Button, Box, TableCell , TableRow} from '@mui/material';

const StudentRow = ({ student , handleDelete , index}) => {
  const days = student.days && student.days.toString();
  const cellStyle={fontSize:'13pt'};

  return (
    <TableRow>
        <TableCell style={cellStyle}>{index}</TableCell>
        <TableCell style={cellStyle}>{student.firstName}</TableCell>
        <TableCell style={cellStyle}>{student.lastName}</TableCell>
        <TableCell style={cellStyle}>{days}</TableCell>
        <TableCell style={cellStyle}>{student.swimmingStyle}</TableCell>
        <TableCell style={cellStyle}>{student.lessonType}</TableCell>
        <TableCell>
        <Button type='button' size="sm" variant="primary" style={{backgroundColor:'rgba(220, 220, 220,0.8)'}}  onClick={() => handleDelete(student._id)}>Delete</Button>
        </TableCell>
    </TableRow>
  )
}

export default StudentRow;
