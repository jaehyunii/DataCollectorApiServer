const express = require('express')
const app = express()
const user = require('./routes/user');
const log = require('./routes/log');

const {sequelize} = require('./models');

sequelize
    .sync({force:true})
    .then(()=>{console.log("DB CONNECTED")})
    .catch((err)=>{console.log(err)});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/user',user)
app.use('/log',log)

app.use(function (err, req, res, next) {
    res.status(400).send({Error:err.message});
});


app.listen(3000, () => {
  console.log('listening on *:3000');
});