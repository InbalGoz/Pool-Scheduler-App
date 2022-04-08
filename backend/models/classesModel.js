import mongoose from "mongoose";

const classSchema = mongoose.Schema({
   startDate:{
      type: String
   },
   endDate:{
      type: String
   },
   title:{
      type: String
   },
   classType:{
      type: String
   },
   color:{
      type: String
   },
})




const Classes = mongoose.model('Classes' , classSchema);
export default Classes;
