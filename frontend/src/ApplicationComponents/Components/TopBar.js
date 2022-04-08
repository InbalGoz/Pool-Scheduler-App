import React from 'react';
import { AppBar , Toolbar ,Box , Typography , Button, MenuItem , Menu} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const TopBar = () => {
  
  const appbar = { fontFamily: 'Nunito', textDecorationLine:'none'};
  const linkStyle ={ textDecoration: 'none', color: '#ffffff' };

  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const handleAllClasses = () => {
    navigate('/shiftmanagement');
    setAnchorEl(null);
  };

  const handleYotamClasses =() => {
    navigate('/shiftmanagement/yotam');
    setAnchorEl(null);
  };

  const handleYoniClasses =() => {
    navigate('/shiftmanagement/yoni');
    setAnchorEl(null);
  };
  const handleJoniClasses =() => {
    navigate('/shiftmanagement/joni');
    setAnchorEl(null);
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appbar}>
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pool Classes Scheduler
        </Typography>
        <Link style={linkStyle} to='/register'>
          <Button color="inherit" sx={{fontSize:'15px'}}>
              <PersonIcon sx={{color:'#ffffff'}}/>
               Registration
              </Button>
        </Link>
 
        {auth && (
          <div>
            <Button
             sx={{fontSize:'15px'}}
             aria-label ='guides classes screen'
             aria-controls='menu-appbar'
             aria-haspopup='true'
             onClick={handleMenu}
             color='inherit'
            >
               <ListAltIcon sx={{color:'#ffffff'}}/>
                Guides Classes
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleAllClasses}>All Guides Classes</MenuItem>
              <MenuItem onClick={handleYotamClasses}>Yotam's Classes</MenuItem>
              <MenuItem onClick={handleYoniClasses}>Yoni's Classes</MenuItem>
              <MenuItem onClick={handleJoniClasses}>Joni's Classes</MenuItem>
            </Menu>
          </div>
        )}
        
        <Link  style={linkStyle} to='/scheduler'>
           <Button color="inherit" sx={{fontSize:'15px'}} >
             <CalendarMonthIcon sx={{color:'#ffffff'}}/>
               Scheduler
            </Button>
        </Link>
        
       </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar;