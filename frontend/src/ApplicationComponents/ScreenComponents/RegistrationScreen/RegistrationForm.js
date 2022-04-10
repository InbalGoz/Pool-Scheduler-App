import React , { useState , useEffect } from 'react';
import { Button, CssBaseline ,FormControlLabel , TextField ,Checkbox ,MenuItem, Grid ,Box , Typography ,Container , InputLabel, FormControl, Select, Paper} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const days = ['Sunday', 'Monday' , 'Tuesday', 'Wednesday', 'Thursday'];
let newDays = [];

const swimmingStyle = [
 // {value: 'null' , label: 'Choose a Swimming style:'},
  {value: 'rowing', label: 'Rowing'},
  {value: 'chest', label: 'Chest'},
  {value: 'butterfly', label: 'Butterfly'},
  {value: 'back', label: 'Back'}
];
 
const lessonType = [
  //{value: 'null' , label: 'Choose a Lesson type:'},
  {value: 'private', label: 'Private'},
  {value: 'collective', label: 'Collective'},
  {value: 'both', label: 'Both'}
];

 

const RegistrationForm = ({ handleAddClick , func}) => {
   // Declare a new state variable , which we`ll call "values" 
  //First and last name
  const [values , setValues] = useState({
    // The initial state is an object with three values 
    firstName: '',
    lastName:'',
  });

  //Declare a new state variable, checkedstate for days
  const [daysState , setDays] = useState(
    new Array(days.length).fill(false)
  );

  //Declare a new state variable, for swimmingstyle
  const [swimmingState, setSwimmingStyle] = useState({ 
        swimmingStyle: ''  
  });

  const [lessonState, setLessonType] = useState({
       lessonType:''
  });

  const [isDisabled , setIsDisabled] = useState(true);

  const [formData , setFormData] = useState([{
    firstName: '', 
    lastName: '',
    days: '',
    swimmingStyle:'',
    lessonType: ''
  }]);


  // when we write to the first name input, we are updating this object and then saving it back to 
  //state.
  const handleInputChange = (event) => {
    const {name , value} = event.target;
   setValues(prevValues => {
     return{
        ...prevValues, // copies the old values
        [name]:value // get new value
     }
   });

   setFormData(prevData => {
     return{
      ...prevData,
      [name]:value
     }
   })
  }

  const handledaysChange = (position) => {
    const updatedCheckedState = daysState.map((item, index) =>
      index === position ? !item : item
    );

    console.log('posi',position)
  
    setDays(updatedCheckedState);
  
    if(updatedCheckedState[position]){
      addToDays(position);
    }else{
      let index = newDays.indexOf(days[position]);
      removeFromDays(index);
    }

    setFormData(prevData => {
      return{
        ...prevData,
        days:newDays
      }
    });
  }
  
  const addToDays = (position) => {
   newDays.push(days[position]);
  }
  
  const removeFromDays = (index) => {
    newDays.splice(index, 1);
  }

  const handleSwimmingStyleChange = (event) => {
    const selectedStyle = event.target.value;
      setSwimmingStyle(selectedStyle);

      console.log(selectedStyle)

      setFormData(prevData => {
        return{
          ...prevData,
          swimmingStyle: selectedStyle
        }
      });
  }
  
  const handleLessonTypeChange = (event) =>{
      const selectedType = event.target.value;
      setLessonType(selectedType);

      setFormData(prevData => {
        return{
          ...prevData,
          lessonType: selectedType
        }
      });
  }

  const disable = () =>{
    if(values.firstName !== '' && values.lastName !== '' && daysState.includes(true)  && swimmingState.swimmingStyle !== '' && lessonState.lessonType !== '')
    {
      setIsDisabled(false);
    }
    else
    {
       setIsDisabled(true);
    } 
  }

  useEffect(() => {
    disable();
    console.log("awimi" , swimmingStyle.swimmingState) 
  });

  const handleClick = (event) => {
    console.log({event});
    event.preventDefault();

    if(swimmingState === 'null' )
    {
      alert("Please choose a Swimming style");

    }else if(lessonState === 'null')
    {
      alert("Please choose a Lesoon type");
    }else{
      handleAddClick(formData);
      func(formData);

      setValues({
      // The initial state is an object with 2 values 
      firstName: '',
      lastName:'',
      });

      setDays(new Array(days.length).fill(false));
      newDays = [];
      setSwimmingStyle({swimmingStyle: ''});
      setLessonType({lessonType:''});
    }
  } 
  
  const theme = createTheme();

   //create all cities menuitems
  const menuItemsSwimmingStyle = swimmingStyle.map((style,index) => (
    <MenuItem key={index} value={style.value}>{style.label}</MenuItem>
   ));

  const menuItemsLessonType = lessonType.map((type,index) => (
    <MenuItem key={index} value={type.value}>{type.label}</MenuItem>
   ));

  return (
    <div>
     <ThemeProvider theme={theme}>
      <Container component="main"  sx={{maxWidth:500}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5" sx={{color:'#8A2BE2' , fontWeight:'bold'}}>
            Registration
          </Typography>

          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                  label="First Name"
                  autoFocus
                  required
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={values.lastName} 
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Grid container>
                    <Grid item>
                      <InputLabel>Choose lesson days:</InputLabel>
                   {days.map((day, index) => {
                      return(
                        <FormControlLabel
                           control={<Checkbox 
                           id={`custom-checkbox-${index}`} 
                           name={day} 
                           value={day} 
                           key={days[index]} 
                           checked={daysState[index]} 
                           onChange={() => handledaysChange(index)}
                           color="primary" />}
                           label={day}
                        />
                      )
                    })} 
                    </Grid>
                    </Grid>
               </Paper>
              </Grid>

              <Grid item xs={12} >
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Choose Swimming style:</InputLabel>
                     <Select
                        value={swimmingState} 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label='Choose Swimming style:'
                        onChange={handleSwimmingStyleChange}
                      >
                      {menuItemsSwimmingStyle}
                    </Select>
                </FormControl>
              </Grid>
            

            <Grid item xs={12} >
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Choose Lesson type:</InputLabel>
                     <Select
                        value={lessonState} 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label='Choose Lesson type:'
                        onChange={handleLessonTypeChange}
                      >
                      {menuItemsLessonType}
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isDisabled}
              onClick={handleClick}
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default RegistrationForm;


