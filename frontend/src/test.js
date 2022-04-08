/*
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>*/

    generateRows({
        columnValues: {
          id: ({ index }) => index,
          parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
          ...defaultColumnValues,
        },
        length: 20,
      })
      

      //import 'devextreme/dist/css/dx.light.css';


/*const columns = [
  { name: 'name', title: 'Name' },
  { name: 'classType', title: 'Class Type' },
  { name: 'swimmingStyle', title: 'Swimming Style' },
  { name: 'day', title: 'Day' },
  { name: 'startTime', title: 'Start Time' },
  { name: 'endTime', title: 'End Time' },
  { name: 'students', title: 'Students' },
];





<Grid container
    spacing={2}
    direction="row"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}>
      <Grid item direction="row">
        
          <Grid item >
              <Card sx={{ maxWidth: 345 ,flexDirection: 'row' }} >
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                   <Button size="small">Share</Button>
                   <Button size="small">Learn More</Button>
                </CardActions>
             </Card>
          </Grid>
          <Grid>
          <Card sx={{ maxWidth: 345 , flexDirection: 'row'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                   <Button size="small">Share</Button>
                   <Button size="small">Learn More</Button>
                </CardActions>
             </Card>
          </Grid>
          <Grid>
          <Card sx={{ maxWidth: 345, flexDirection: 'row' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                   <Button size="small">Share</Button>
                   <Button size="small">Learn More</Button>
                </CardActions>
             </Card>
          </Grid>
        
      </Grid>
    </Grid>
</Grid>
*/


/*<Stack direction="row" spacing={2} alignItems="center" justifyContent="center" style={{ minHeight: '20vh' }} >
    <Link style={linkStyle} to='/shiftmanagement/yotam'><Button variant="outlined" size='large' style={{fontSize:'15pt' , backgroundColor: '#FFA500', color:'#000000'}}>Yotam's weekly meetings</Button></Link>
    <Link style={linkStyle} to='/shiftmanagement/yoni'><Button variant="outlined" size='large' style={{fontSize:'15pt',backgroundColor: '#6A5ACD', color:'#000000'}} >Yoni's weekly meetings</Button></Link>
    <Link style={linkStyle} to='/shiftmanagement/joni'><Button variant="outlined" size='large' style={{fontSize:'15pt', backgroundColor: '#008080', color:'#000000'}}>Joni's weekly meetings</Button></Link>
    </Stack>*/