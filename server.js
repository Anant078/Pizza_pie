require('dotenv').config()
const express = require('express');
const app = express()
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3001
const mongoose = require('mongoose')
const session = require('express-session');
const { Cookie } = require('express-session');
const flash=require('express-flash')
// to store session in database
const MongoDbStore = require('connect-mongo')(session)
//database connection
const passport =require('passport')
const url='mongodb://localhost/pizza';
mongoose.connect(url,{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('database connected....');
}).catch(err =>{
    console.log('connection error');
});
// passport config

// Session store
let mongoStore = new MongoDbStore({
                // to create a table in a database , to store session .
                mongooseConnection: connection,
                // to allot a name to the table named "sessions"
                collection:'sessions'

                })
// session config
app.use(session({
    //just see env file 
    secret:process.env.COOKIE_SECRET,
    resave:false,
    //all the session get store
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24} //24 hour 

}))
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//assests


app.use(express.static("public"))
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user = req.user
    next()
})

app.use(express.json()) 
app.use(express.urlencoded({extended:false}))
require('./routes/web')(app)
// global middleware



//set template engine
app.use(expresslayout)
app.set('views' ,path.join(__dirname , '/resources/views' ))// to tell the express where our template file or view file 
app.set('view engine', 'ejs')  // to tell the express which template engine we use 



app.listen(PORT , () =>{
    console.log(`listening on port ${PORT}`)
})