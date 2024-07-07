const mongoose=require('mongoose');

async function connectDB(){
     try{
        await mongoose.connect('mongodb+srv://varshneyshivam:shivam10@mydb.kfz1rck.mongodb.net/?retryWrites=true&w=majority&appName=MyDB');
     const connection=mongoose.connection;
     
     connection.on('connected',()=>{
        console.log("MongoDB is connected");
     })
     connection.on('error',(error)=>{
        console.log('Something is Wrong',error)
     })

     }catch(error){
        console.log('Something is wrong',error);
     }
}
module.exports=connectDB
