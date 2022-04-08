import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path , { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import registrationRoute from './routes/registrationRoute.js';
import registrationModel from './models/registrationModel.js';
import classesRoute from './routes/classesRoute.js';
import classesModel from './models/classesModel.js';
import guidesClassesRoute from './routes/guidesClassesRoute.js';
import guidesClassesModel from './models/guidesClassesModel.js';

dotenv.config();

// Storing the url string into a varible
const mongoUrl = process.env.DB_URL;
// Storing the port number into a varible
const PORT = process.env.PORT || 3001;

const app = express();

//Midleware
app.use(cors());//Middleware 
app.use(express.json());//Middleware get data and convert to json obj.
//app.use(express.urlencoded({ extended: false }));// allows to parse nested objects, or generally any type.
app.use(bodyParser.json());//Middleware 
app.use(bodyParser.urlencoded(
    { extended: false }
));//Middleware , allows to parse nested objects, or generally any type. 

//conecting to database
mongoose.connect(process.env.DB_URL);//-------------
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', (callback) => {
    console.log("connection succeeded");
});


const __dirname = dirname(fileURLToPath(import.meta.url));
// Defined that static files will be served from the 'public' folder
app.use(express.static(
    path.join(__dirname, "public")
));

//create route
app.use('/', registrationRoute);

app.use('/', classesRoute);

app.use('/', guidesClassesRoute);

//read route and gets all students
app.get("/" , (req, res) => {
    registrationModel.find({})
    .then(
        items => res.json(items)
    ).catch(err => console.log(err));
});

//delete route
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log("hii delete")
    registrationModel.findByIdAndDelete({ _id: id }, (req, res, err) => {
      if (!err) {
        //registrationModel.remove({},true)
        console.log("Item deleted");
      } else {
        console.log(err);
      }
      
    });
  });

app.delete("/deleteall", async (req, res) => {
  console.log("in delete")
   await classesModel.deleteMany({});
   await guidesClassesModel.deleteMany({});
    /*,(req,res,err) => {
    if (!err) {
      //registrationModel.remove({},true)
      console.log("deleted");
    } else {
      console.log(err);
    }
  })*/
  
});

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});


