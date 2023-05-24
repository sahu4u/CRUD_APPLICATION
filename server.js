const express=require('express');
const dotenv= require('dotenv');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const path=require('path');

const connectDB=require('./server/database/connection')

const app=express();

dotenv.config({path:'config.env'})
// const PORT=process.env.PORT||8000

//log request

app.use(morgan('tiny'));

//mongodb connection

connectDB();

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))


//load assets
app.use('/css',express.static(path.resolve(__dirname,"assest/css")))
app.use('/img',express.static(path.resolve(__dirname,"assest/img")))
app.use('/js',express.static(path.resolve(__dirname,"assest/js")))

// app.get('/',(req,res)=>{
//     res.render('index');
// })

// app.get('/add_user',(req,res)=>{
//     res.render('add_user');
// })

// app.get('/update_user',(req,res)=>{
//     res.render('update_user');
// })

//load routers
app.use('/',require('./server/routes/router'));

app.listen(3000,()=>{console.log('Server is running on http://localhost:${3000}')});