const express=require('express');
const cors=require('cors');
const connectDB=require('./config/connectDB');
require('dotenv').config();
const router=require('./routes/index');
const cookiesParser=require('cookie-parser');
const {app,server}=require('./socket/index')


// const app=express();
const PORT=process.env.PORT || 8000;
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(cookiesParser());

app.get('/',(req,res)=>{
    res.json({
        message:'Server is running on this PORT'+PORT
    })
})

app.use('/api',router)
connectDB().then(()=>{
    server.listen(PORT,()=>console.log('Server is Started '+PORT));
})


 