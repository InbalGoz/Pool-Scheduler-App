import mongoose from "mongoose";

const guidesClassSchema = mongoose.Schema({
   name:{
      type: String
   },
   classType:{
      type: String
   },
   swimmingStyle:{
    type: String
   },
   day:{
      type: String
   },
   startTime:{
      type: String
   },
   endTime:{
      type: String
   },
   students:{
    type: String
   },
})


const GuidesClasses = mongoose.model('GuidesClasses' , guidesClassSchema);
export default GuidesClasses;