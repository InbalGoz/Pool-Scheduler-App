import mongoose from "mongoose";

const formSchema = mongoose.Schema({
   firstName: {
       type: String
   },
   lastName:{
       type: String
   },
   days:[String],
   swimmingStyle:{
       type: String
   },
   lessonType:{
       type: String
   }
})

const Registration = mongoose.model('Registration' , formSchema);
export default Registration;