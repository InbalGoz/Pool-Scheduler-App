import React, { useState , useEffect } from 'react';
import { Stack, Paper , Container} from '@mui/material';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { styled } from '@mui/material/styles';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
 // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
 // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize:'30px',
  marginTop:40,
  fontFamily: 'Nunito',
  backgroundColor:'rgba(220, 220, 220,0.8)'
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


const GuidesSchedulerScreen =  ({guideClasses}) => {

  const [guidesClassesData, setGuidesClassesData] = useState([]);
  
  const fetchGuidesClassesData = async () => {
    const { data } = await axios.get('http://localhost:3001/guidesclasses');
    console.log('guideclases' , data)

    let newData = [];
    data.forEach(element => {
      console.log("element", element.name)
        const index = data.indexOf(element);
        newData.push({
          classNumber: index +1,
          name: element.name,
          classType: element.classType,
          swimmingStyle: element.swimmingStyle,
          day: element.day,
          startTime: element.startTime,
          endTime: element.endTime,
          students: element.students,
        })
        console.log("element", element)
    });
    setGuidesClassesData(newData);//fetch all students
   }

  useEffect(()=>{
    fetchGuidesClassesData();
  },[]);/////[guidesClassesData]

  //const linkStyle ={ textDecoration: 'none', color:'#000000'};
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
  );

  return(
    <>
   <Container maxWidth="xl">
   <Stack direction="row" spacing={2}>
    <Item>All Classes:</Item>
    </Stack>
   <Paper>
    <Grid
      rows={guidesClassesData}
      columns={columns}
    >
        <SortingState />
        <IntegratedSorting
          columnExtensions={integratedSortingColumnExtensions}
        />
      <Table cellComponent={CellComponent}  columnExtensions={tableColumnExtensions}/>
      <TableHeaderRow  cellComponent={CellComponent} showSortingControls/>
      </Grid>
    </Paper>
   </Container>
    </> 
  )   
}

export default GuidesSchedulerScreen;



