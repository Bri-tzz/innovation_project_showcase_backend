const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./api/routes/authRoutes')
const projectRoutes = require('./api/routes/projectRoutes')
const commentRoutes = require('./api/routes/commentRoutes')
require("dotenv").config()

// Middleware to parse incoming JSON requests 
app.use(cors({
    origin: "*", // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      auth: req.headers.authorization
    });
    next();
  });


//app routes
app.use('/api/auth',authRoutes) 
app.use('/api/projects',projectRoutes)
app.use('/api/comments',commentRoutes)
const PORT = process.env.PORT || 3000

app.get('/', (req, res) =>{  
    res.send('Welcome to my API!') 
}) 

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})