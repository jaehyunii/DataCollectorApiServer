const express = require('express')
const app = express()
const user = require('./routes/user');
const log = require('./routes/log');
const detect = require('./routes/detect');
const shell = require('shelljs');
const {sequelize} = require('./models');

sequelize
    .sync({force:false})
    .then(()=>{
	    shell.exec('npx sequelize db:seed:undo:all');
	    shell.exec('npx sequelize db:seed:all');
	    console.log("DB CONNECTED")
    })
    .catch((err)=>{console.log(err)});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/user',user);
app.use('/log',log);
app.use('/detect',detect);

app.use(function (err, req, res, next) {
    res.status(400).send({Error:err.message});
});


app.listen(3000, () => {
  console.log('listening on *:3000');
});
