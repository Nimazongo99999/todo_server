// reguire("dotenv").config();
import dotenv from "dotenv";
import express from "express";
import  mongoose  from "mongoose";
import  cors from "cors";
import TodoModel from "./schema/todo_schema.js";
import { status } from "express/lib/response";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()

const port = 3000;

const db = process.env.DB_URL;
const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

// Connect to local DB
// mongoose
//  .connect ("mongodb':// localhost/todo_db", {
//     useNewUrlParser: true,
  //    useUnifiedTopology: true,
// })
// .then(()) => {
//   console.log("Connected to MongoDB");
// }
// .catch((err) => {
//    console.log(err);
// 
// });

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");  
})
.catch((err) =>{
    console.log(err);
});



///get all todos
app.get("/todos", async (reg,res) => {
 const  todoModel = await TodoModel.find({});
 if (todoModel) {
  return res.status (200). json({
  status: true,
  message: "Todos fetched seccesfully",   
  data: todoModel,

 });
} else {
    return res.status(400).json({
    status: false,
    message: "Todos not found",
    });
}
});    

/// get one todo (:id)
app.get("/todos/:id", async (reg,res) => {
    const{status} = reg.params;

    const todoModel = await TodoModel.find({}).where('status').equals(status);
     if (todoModel) {
      return res.status(200).json({
       status: true,
       message: "Todos fetched seccessfully",
       date: todoModel,
      });
     } else {
        return res.status(400).json({
         status: false,
         message: "Todos not found", 
        });  

    }
})

app.post("/todo", async (reg,res) => {
 const { title, description, date_time} = reg.body;

 const todoModel = await TodoModel.create({
  title,
  description,
  date_time,
 });

 if (todoModel) {
     return res.status(201).json({
      status: true,
      message: "Todos create",
      date: todoModel,
     });
} else {
      return res.status(400).json({   
        status: false,
        message: "Todos failed to create",
    });
}
});
app.patch("/todo/:id", async (req,res)=> {
    const { id}=req.params;
    const {status}= req.body;

    const todoModel = await TodoModel.updateOne({status: status}).where({
        _id: id,
    });
    if (todoModel){
        return res.status(200).json({
            status:true,
            message: "Todos marked as completed",
            date: todoModel,
        });
    }
    else{
        return res.status(400).json({
            status:false,
            message: "Todos failed to update",
        });
    }
})

app.delete("/todo/:id", async (req,res)=>{
    const todoModel = await TodoModel.FinalByIdAndDelete(reg.params.id);
    if(todoModel){
        return res. status(200).json({
              status: true,
              message: "Todo deleted",
              date: todoModel,
             });
            }
            else {
                return res.status(400).json({
                    status:false,
                    message: "Todos failed to delete",
                });
                }     

       });
       
       app.listen(port,()=>console.log('Example app Listening on port $}!'));



