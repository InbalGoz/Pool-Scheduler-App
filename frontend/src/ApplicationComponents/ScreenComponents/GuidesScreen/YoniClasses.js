import React, { useState , useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Stack , Container} from '@mui/material';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
 // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize:'30px',
  marginTop:40,
  fontFamily: 'Nunito',
  backgroundColor: '#6A5ACD'
}));


const priorityWeights = {
  Low: 0,
  Normal: 1,
  High: 2,
};

const comparePriority = (a, b) => {
  const priorityA = priorityWeights[a];
  const priorityB = priorityWeights[b];
  if (priorityA === priorityB) {
    return 0;
  }
  return (priorityA < priorityB) ? -1 : 1;
};

const YoniClasses = () => {
  const [yoniClassesData, setYoniClassesData] = useState([]);

  const fetchYoniClassesData = async () => {
    const { data } = await axios.get('http://localhost:3001/guidesclasses');
    console.log('guideclases' , data)

    let newData = [];
    data.forEach(element => {
      if(element.name === 'Yoni'){
        newData.push({
          classNumber:'',
          name: element.name,
          classType: element.classType,
          swimmingStyle: element.swimmingStyle,
          day: element.day,
          startTime: element.startTime,
          endTime: element.endTime,
          students: element.students,
        })
        console.log("element", element)
      }
    });

    newData.map((element,index) => (
      element.classNumber = index +1
    ))
    setYoniClassesData(newData);//fetch all students
   }

  useEffect(()=>{
    fetchYoniClassesData();
  },[]);/////[studentsData]

    const [columns] = useState([
      { name: 'classNumber', title: 'Class Number' },
      { name: 'name', title: 'Name' },
      { name: 'classType', title: 'Class Type' },
      { name: 'swimmingStyle', title: 'Swimming Style' },
      { name: 'day', title: 'Days' },
      { name: 'startTime', title: 'Start Time' },
      { name: 'endTime', title: 'End Time' },
      { name: 'students', title: 'Students' },
  ]);

  const [integratedSortingColumnExtensions] = useState([
    { columnName: 'priority', compare: comparePriority },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'subject', width: 300 },
  ]);

  const CellComponent = props => (
    <Table.Cell
      {...props}
      style={{
        padding: '1',
        fontSize: '18px',
      }}
    />
  )
  return (
    <>
    
    <Container maxWidth="xl">
    <Stack direction="row" spacing={2}>
    <Item>Yoni's Classes:</Item>
    </Stack>
    <Paper>
    <Grid
      rows={yoniClassesData}
      columns={columns}
    >
      <SortingState />
        <IntegratedSorting
          columnExtensions={integratedSortingColumnExtensions}
        />
      <Table cellComponent={CellComponent} columnExtensions={tableColumnExtensions}/>
      <TableHeaderRow cellComponent={CellComponent} showSortingControls/>
    </Grid>
    </Paper>
    </Container>
    </>
    
  )
}

export default YoniClasses;
